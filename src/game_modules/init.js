export default () => {
    window.SideScroller = window.SideScroller || {};

    SideScroller.game = new Phaser.Game(568, 320, Phaser.AUTO, '');

    SideScroller.game.state.add('Boot', SideScroller.Boot);

    SideScroller.game.state.add('Preload', SideScroller.Preload);

    SideScroller.game.state.add('Game', SideScroller.Game);

    SideScroller.game.state.start('Boot');
}