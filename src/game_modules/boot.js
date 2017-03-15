export default () => {
    window.SideScroller = window.SideScroller || {};

    SideScroller.Boot = function () {
    };


    SideScroller.Boot.prototype = {

        preload: function () {
            //assets for the loading screen
            this.load.image('preloadbar', './assets/images/preloader-bar.png');
        },

        create: function () {

            this.game.stage.backgroundColor = '#fff';

            //scaling options
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            //have the game centered horizontally
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceLandscape = true;
            this.scale.refresh();

            //physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.state.start('Preload');

        }

    };
}