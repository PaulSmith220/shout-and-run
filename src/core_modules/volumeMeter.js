
export default class VolumeMeter {
    constructor(context) {
        this.processor = context.createScriptProcessor(512);
        this.processor.onaudioprocess = this.calculateVolume;
        this.processor.clipping = false;
        this.processor.clipLevel = 0.98;
        this.processor.averaging = 0.95;
        this.processor.clipLag = 750;
        this.processor.lastClip = 0;
        this.processor.volume = 0;

        // only to fix a Chrome bug
        this.processor.connect(context.destination);

        this.processor.checkClipping = () => {
                if (!this.clipping)
                    return false;
                if ((this.lastClip + this.clipLag) < window.performance.now())
                    this.clipping = false;
                return this.clipping;
            };

        this.processor.shutdown = () => {
                this.disconnect();
                this.onaudioprocess = null;
            };

    }

    calculateVolume(e) {
        let buf = e.inputBuffer.getChannelData(0),
            bufLength = buf.length,
            sum = 0;
        let x;

        // Summing squares
        for (let i = 0; i < bufLength; i++) {
            x = buf[i];
            if (Math.abs(x) >= this.clipLevel) {
                this.clipping = true;
                this.lastClip = window.performance.now();
            }
            sum += x * x;
        }

        let rms =  Math.sqrt(sum / bufLength);

        //Smoothing
        this.volume = Math.max(rms, this.volume*this.averaging);
    }

    get volume() {
        return this.processor.volume;
    }

    get checkClipping() {
        return this.processor.checkClipping();
    }
}