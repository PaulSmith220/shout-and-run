import config from "../config";

export default (volumeMeter) => {
    window.SideScroller = window.SideScroller || {};

    SideScroller.Game = function () {
    };

    SideScroller.Game.prototype = {

        preload: function () {
            // this.game.time.advancedTiming = true;
        },

        create: function () {
            this.initGameController();

            this.coinSound = this.game.add.audio('coin');
            this.jumpSound = this.game.add.audio('jump');
            this.deathSound = this.game.add.audio('death');
            this.duckSound = this.game.add.audio('duck');

            this.map = this.game.add.tilemap('level1');

            this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
            this.backgroundlayer = this.map.createLayer('backgroundLayer');
            this.blockedLayer = this.map.createLayer('blockedLayer');
            this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
            this.backgroundlayer.resizeWorld();
            this.createCoins();

            //create player
            this.player = this.game.add.sprite(100, 100, 'player');
            this.player.anchor.y = 1;
            this.player.frame = 1;
            var run = this.player.animations.add('right', [0, 1, 2, 3], 10, true);
            var run = this.player.animations.add('jump', [4], 1, true);
            var run = this.player.animations.add('duck', [5], 1, true);
            var run = this.player.animations.add('dead', [6], 1, true);
            run.enableUpdate = true;

            this.player.coins = 0;

            //enable physics on the player
            this.game.physics.arcade.enable(this.player);
            //player gravity
            this.player.body.gravity.y = 1000;

            this.player.duckedDimensions = {width: this.player.width * 0.9, height: this.player.height * 0.7};
            this.player.standDimensions = {width: this.player.width * 0.9, height: this.player.height};
            this.player.anchor.setTo(0.5, 1);


            //the camera will follow the player in the world
            this.game.camera.follow(this.player);

            this.cursors = this.game.input.keyboard.createCursorKeys();

        },

        update: function () {
            this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
            this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

            if (this.player.alive) {

                this.player.body.velocity.x = 200;

                let volume = volumeMeter.volume;
                let shoutLevel = window["shoutLevel"] || config.audio.shoutLevel;
                let whisperLevel = window["whisperLevel"] || config.audio.whisperLevel;

                if (this.cursors.up.isDown || volume >= shoutLevel) {
                    this.playerJump();
                }

                if (this.cursors.down.isDown || (volume >= whisperLevel && volume < shoutLevel)) {
                    this.playerDuck(true);
                }

                if (!this.cursors.down.isDown && this.player.isDucked && !this.pressingDown && (volume < whisperLevel || volume >= shoutLevel)) {
                    this.playerDuck(false);
                }

                //restart the game if reaching the edge
                if (this.player.x >= this.game.world.width) {
                    this.gameOver();
                }

                if (this.player.y > 420) {
                    this.player.alive = false;

                    //stop moving to the right
                    this.player.body.velocity.x = 0;

                    //change sprite image
                    //this.player.loadTexture('playerDead');
                    this.player.animations.play('dead');
                    this.player.animPlaying = false;

                    //go to gameover after a few miliseconds
                    this.deathSound.play();
                    if (navigator.vibrate) {
                        navigator.vibrate(1000);
                    }
                    this.game.time.events.add(1500, this.gameOver, this);
                }


                //  this.player.animPlaying = false;
                if (!this.player.isDucked) {
                    if (this.player.body.velocity.y != 0) {
                        //   this.player.loadTexture('playerJump');
                        this.player.animations.play('jump');
                        this.player.animPlaying = false;

                    } else {

                        //this.player.loadTexture('player');

                        this.player.animations.play('right', 10, true);


                    }
                }
            }


        },

        render: function () {

            this.game.debug.text(this.player.coins || '0', 20, 70, "#00ff00", "40px Courier");

        },

        gameOver: function () {
            this.game.state.start('Game');

        },

        playerHit: function (player, blockedLayer) {
            //if hits on the right side, die
            if (player.body.blocked.right) {
                //set to dead (this doesn't affect rendering)
                this.player.alive = false;

                //stop moving to the right
                this.player.body.velocity.x = 0;

                //change sprite image
                // this.player.loadTexture('playerDead');
                this.player.animations.play('dead');
                if (navigator.vibrate) {
                    navigator.vibrate(1000);
                }

                //go to gameover after a few miliseconds
                this.deathSound.play();
                this.game.time.events.add(1500, this.gameOver, this);
            }
        },
        playerJump: function () {
            if (this.player.body.blocked.down) {
                this.player.body.velocity.y -= 700;
                this.jumpSound.play();

            }

        },
        playerDuck: function (enable) {
            // this.player.loadTexture(enable? 'playerDuck' : 'player');
            this.player.animations.play(enable ? 'duck' : 'right');
            if (enable) {
                if (!this.player.isDucked) {
                    this.duckSound.play();
                }
                this.player.body.setSize(this.player.duckedDimensions.width, this.player.duckedDimensions.height);
            } else {
                this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
            }
            this.player.isDucked = enable;
        },

        //find objects in a Tiled layer that containt a property called "type" equal to a certain value

        findObjectsByType: function (type, map, layerName) {
            var result = new Array();
            map.objects[layerName].forEach(function (element) {
                if (element.type === type) {
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        },

        //create a sprite from an object
        createFromTiledObject: function (element, group) {
            var sprite = group.create(element.x, element.y, element.type);
            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });

        },

        createCoins: function () {
            this.coins = this.game.add.group();
            this.coins.enableBody = true;
            var result = this.findObjectsByType('coin', this.map, 'objectsLayer');
            result.forEach(function (element) {
                this.createFromTiledObject(element, this.coins);
            }, this);
        },

        collectCoin: function (player, collectable) {
            this.coinSound.play();
            if (navigator.vibrate) {
                navigator.vibrate(1000);
            }
            collectable.destroy();
            this.player.coins++;
        },

        initGameController: function () {
            if (!GameController.hasInitiated) {
                var that = this;
                //GameController.init({
                //    left: {
                //
                //        type: 'none',
                //
                //    },
                //
                //    right: {
                //
                //        type: 'buttons',
                //
                //        buttons: [
                //
                //            false,
                //
                //            {
                //
                //                label: 'J',
                //
                //                touchStart: function () {
                //
                //                    if (!that.player.alive) {
                //                        return;
                //                    }
                //                    that.playerJump();
                //                }
                //            },
                //            false,
                //            {
                //                label: 'D',
                //
                //                touchStart: function () {
                //
                //                    if (!that.player.alive) {
                //                        return;
                //                    }
                //                    that.pressingDown = true;
                //                    that.playerDuck(true);
                //                },
                //
                //                touchEnd: function () {
                //                    that.pressingDown = false;
                //                }
                //
                //            }
                //
                //        ]
                //
                //    },
                //
                //});
                //
                //GameController.hasInitiated = true;
            }
        }
    };
}