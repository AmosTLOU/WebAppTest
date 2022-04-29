var isMobile;
var game;

// window with and window height
var prevWW_forDebug = undefined;
var prevWH_forDebug = undefined;
var ww = undefined;
var wh = undefined;

window.onload = function() 
{
    isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) 
    {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    // non-mobile
    if (isMobile == -1) 
    {
        ww = 550;
        wh = 900;
        var config = 
        {
            type: Phaser.AUTO,
            width: ww,
            height: wh,
            parent: 'phaser-game',
            scene: [SceneMain]
        };
    } 
    // mobile
    else 
    {
        ww = window.innerWidth;
        wh = window.innerHeight;
        var config = 
        {
            type: Phaser.AUTO,
            width: ww,
            height: wh,
            // need to add the resolution config below, otherwise things will be blurry on mobile devices
            resolution: window.devicePixelRatio,
            parent: 'phaser-game',
            scene: [SceneMain]
        };
    }
    game = new Phaser.Game(config);
}
