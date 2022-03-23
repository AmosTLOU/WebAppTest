class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
    }
    preload() 
    {
        this.load.image('bg', 'assets/Mockup/background.png');
        this.load.image('demoCharacter', 'assets/Mockup/democharacter.png');
        this.load.image('clipboard', 'assets/Mockup/clipboard.png');
        this.load.image('microphone', 'assets/Mockup/microphone.png');
        this.load.image('circle', 'assets/Mockup/circle1.png');
                
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create() {
        // window with and window height
        var ww = window.innerWidth;
        var wh = window.innerHeight;
        
        this.add.image(ww * 0.5, wh * 0.5, 'bg').setDisplaySize(ww, wh);
        this.add.image(ww * 0.25, wh * 0.55, 'demoCharacter').setDisplaySize(ww * 0.25, wh * 0.9); 
        this.add.image(ww * 0.05, wh * 0.1, 'clipboard').setDisplaySize(ww * 0.035, wh * 0.1); 
        this.add.image(ww * 0.67, wh * 0.9, 'microphone').setDisplaySize(wh*0.1, wh * 0.1); 
        this.add.text(ww * 0.028, wh * 0.17, "Profile", {
            fontFamily: 'open sans',
            color: '#F8F8FF',
            fontSize: '34px'            
        });
        let circle1 = this.add.image(ww * 0.47, wh * 0.35, 'circle').setDisplaySize(wh * 0.3, wh * 0.3); 
        let text_circle1 = this.add.text(ww * 0.44, wh * 0.35, "Bubble_1", {
            color: '#F8F8FF',
            fontSize: '24px'      
        });
        this.add.image(ww * 0.58, wh * 0.15, 'circle').setDisplaySize(wh * 0.2, wh * 0.2); 
        this.add.image(ww * 0.71, wh * 0.35, 'circle').setDisplaySize(wh * 0.4, wh * 0.4); 
        this.add.image(ww * 0.88, wh * 0.20, 'circle').setDisplaySize(wh * 0.28, wh * 0.28); 


        circle1.setInteractive();
        circle1.on('pointerover', () => { text_circle1.setStyle({ color: '#F00000', }); });
        circle1.on('pointerout', () => { text_circle1.setStyle({ color: '#F8F8FF', }); });
        circle1.on('pointerup', () => { window.location.href = "part10.html";});
        circle1.on('pointerdown', () => { console.log('pointerdown'); });


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        var avatar = this.add.sprite(ww * 0.02, wh * 0.95, 'dude');
        avatar.anims.play('left', true);
        avatar.setInteractive();
        avatar.on('pointerover', () => 
        { 
            if(avatar.anims.currentAnim.key === 'left')
                avatar.anims.play('right', true);
            else if(avatar.anims.currentAnim.key === 'right')
                avatar.anims.play('left', true);
        }
        );
        avatar.on('pointerdown', () => 
        { 
            if(avatar.anims.currentAnim.key != 'turn')
                avatar.anims.play('turn', true);
            else if(avatar.anims.currentAnim.key === 'turn')
                avatar.anims.play('left', true);
            
        }
        );
     

        this.formUtil = new FormUtil({
            scene: this,
            rows: 20,
            cols: 20
        });

        // this.formUtil.showNumbers();

        // var el = document.getElementById("JumpButton");
        // el.style.position = "absolute"; 
        // let dst_left = ww*0.52;
        // el.style.top = 650 + "px";
        // el.style.left = dst_left + "px";
        // el.style.width = 5 + "%";
        // el.style.height = 5 + "%";
        
        // this.formUtil.scaleToGameW("myText", .3);
        // this.formUtil.placeElementAt(16, 'myText', true);

        // this.formUtil.scaleToGameW("area51", .4);
        // this.formUtil.scaleToGameH("area51", .4);
        // this.formUtil.placeElementAt(274, "area51", true, true);
        this.formUtil.addChangeCallback("area51", this.textAreaChanged, this);
        
        var el = document.getElementById("area51");
        el.style.position = "absolute"; 
        el.style.top = 650 + "px";
        el.style.left = ww*0.52 + "px";
        el.style.width = 600 + "px";
        el.style.height = 100 + "px";
        el.onchange = this.textAreaChanged;
        el.onfocus = () => el.value = "";
        // el.oninput = this.outputText;
        el.onmouseout = () => el.blur();
    }

    textAreaChanged() {
        let el = document.getElementById("area51");
    	var text = el.value;

        var dct = {};
        const arrayWord = text.split(' ');
        for(let i = 0; i < arrayWord.length; i++)
        {
            if(dct[arrayWord[i]] === undefined)
                dct[arrayWord[i]] = 1;
            else
                dct[arrayWord[i]]++;
        }
        
        let s1 = "possible side effect";
        const arraryS1 = s1.split(' ');
        let cnt = 0;
        for(let i = 0; i < arraryS1.length; i++)
        {
            if(dct[arraryS1[i]] === undefined)
                continue;
            else
                cnt++;
        }
        console.log(cnt);
    	
    }

    outputText() {
        let el = document.getElementById("area51");
    	var text = el.value;
    	console.log(text);
    }

    update() 
    {
        
    }
    
}



