export default () => {
    window.SideScroller = window.SideScroller || {};
    
    SideScroller.Preload = function () {
    };

    SideScroller.Preload.prototype = {

        preload: function () {

            //show loading screen
            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');

            this.preloadBar.anchor.setTo(0.5);

            this.preloadBar.scale.setTo(3);

            this.load.setPreloadSprite(this.preloadBar);

            //load game assets
            this.load.tilemap('level1', './assets/tilemaps/level1_my.json', null, Phaser.Tilemap.TILED_JSON);

            this.load.image('gameTiles', './assets/images/tiles_spritesheet.png');

            this.load.spritesheet('player', './assets/images/player_anim.png', 66, 92);

            this.load.image('coin', './assets/images/coin.png');

            this.load.audio('coin', './assets/audio/coin.wav');
            this.load.audio('jump', './assets/audio/jump.wav');
            this.load.audio('death', './assets/audio/death.wav');
            this.load.audio('duck', './assets/audio/duck.wav');

        },

        create: function () {
            this.state.start('Game');
        }

    };
}