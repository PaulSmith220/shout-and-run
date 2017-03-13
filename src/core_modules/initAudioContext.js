/**
 * Created by paul on 13.03.2017.
 */
import VolumeMeter from "./volumeMeter";

export default (audioCtx, callback) => {
    let result = {
        volumeMeter: null,
        mediaStreamSource: null
    };
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
            {
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, (stream) => {
                result.mediaStreamSource = audioCtx.createMediaStreamSource(stream);
                result.volumeMeter = new VolumeMeter(audioCtx);
                result.mediaStreamSource.connect(result.volumeMeter.processor);

                if (callback) {
                    callback(result.volumeMeter);
                }

            }, () => alert("Stream generation error"));
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

    return result;
}