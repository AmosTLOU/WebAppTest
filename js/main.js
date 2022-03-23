var isMobile;
var game;
var testObj;

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
        var config = 
        {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            // width: 480,
            // height: 640,
            parent: 'phaser-game',
            scene: [SceneMain]
        };
    } 
    // mobile
    else 
    {
        var config = 
        {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [SceneMain]
        };
    }
    game = new Phaser.Game(config);
}
