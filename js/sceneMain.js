class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
        this.arrayAllObj = undefined;
        this.conManager = new ConManager();
        // window with and window height
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;
    }

    preload() 
    {
        this.load.image('bg', 'assets/Mockup/background.png');
        this.load.image('demoCharacter', 'assets/Mockup/democharacter.png');
        this.load.image('clipboard', 'assets/Mockup/clipboard.png');
        this.load.image('microphone', 'assets/Mockup/microphone.png');
        this.load.image('circle', 'assets/Mockup/circle1.png');
        this.load.image('profileIcon', 'assets/Mockup/Profile_Icon.png');
                
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() 
    {        
        let bg = this.add.image(this.ww * 0.5, this.wh * 0.5, 'bg').setDisplaySize(this.ww, this.wh);
        this.add.image(this.ww * 0.25, this.wh * 0.55, 'demoCharacter').setDisplaySize(this.ww * 0.25, this.wh * 0.9); 
        this.add.image(this.ww * 0.05, this.wh * 0.1, 'clipboard').setDisplaySize(this.ww * 0.035, this.wh * 0.1); 
        let img_mic = this.add.image(this.ww * 0.67, this.wh * 0.9, 'microphone').setDisplaySize(this.wh*0.1, this.wh * 0.1); 
        img_mic.setInteractive();
        img_mic.on('pointerup', () => { this.returnToQuickqQuestions() });
        this.add.text(this.ww * 0.028, this.wh * 0.17, "Profile", {
            fontFamily: 'open sans',
            color: '#F8F8FF',
            fontSize: '34px'            
        });
        
        this.createBubbles();

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

        var avatar = this.add.sprite(this.ww * 0.02, this.wh * 0.95, 'dude');
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

        // this.formUtil.scaleToGameW("area51", .4);
        // this.formUtil.scaleToGameH("area51", .4);
        // this.formUtil.placeElementAt(274, "area51", true, true);
        this.formUtil.addChangeCallback("area51", this.textAreaChanged, this);
        
        var el = document.getElementById("area51");
        el.style.position = "absolute"; 
        el.style.top = this.wh*0.65 + "px";
        el.style.left = this.ww*0.52 + "px";
        el.style.width = 600 + "px";
        el.style.height = 100 + "px";
        el.onchange = this.textAreaChanged;
        el.onfocus = () => el.value = "";
        // el.oninput = this.outputText;
        el.onmouseout = () => el.blur();

        // // not working currently
        // this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        //     // this.ConManager.scroll(deltaX * 0.5);
        //     // this.ConManager.scroll(deltaY * 0.5);
        //     console.log("wheel rotating");    
        // });
    }

    textAreaChanged() 
    {
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

    outputText() 
    {
        let el = document.getElementById("area51");
    	var text = el.value;
    	console.log(text);
    }

    createBubbles()
    {
        let circles = new Array();
        let texts = new Array();
        circles[0] = this.add.image(this.ww * 0.47, this.wh * 0.35, 'circle').setDisplaySize(this.wh * 0.3, this.wh * 0.3); 
        texts[0] = this.add.text(this.ww * 0.44, this.wh * 0.35, "Bubble_1", {
            color: '#F8F8FF',
            fontSize: '24px'      
        });
        
        circles[1] = this.add.image(this.ww * 0.58, this.wh * 0.15, 'circle').setDisplaySize(this.wh * 0.2, this.wh * 0.2); 
        circles[2] = this.add.image(this.ww * 0.71, this.wh * 0.35, 'circle').setDisplaySize(this.wh * 0.4, this.wh * 0.4); 
        circles[3] = this.add.image(this.ww * 0.88, this.wh * 0.20, 'circle').setDisplaySize(this.wh * 0.28, this.wh * 0.28); 

        this.arrayAllObj = [circles, texts];

        circles[0].setInteractive();
        circles[0].on('pointerover', () => { texts[0].setStyle({ color: '#F00000', }); });
        circles[0].on('pointerout', () => { texts[0].setStyle({ color: '#F8F8FF', }); });
        // circles[0].on('pointerup', () => { window.location.href = "index2.html";});
        circles[0].on('pointerup', () => { this.answerQuickQuestion(0) });
        circles[0].on('pointerdown', () => { console.log('pointerdown'); });
    }

    changeVisibility()
    {
        let arr = this.arrayAllObj;
        for (let i = 0; i < arr.length; i++)
        {
            for (let j = 0; j < arr[i].length; j++)
            {
                arr[i][j].visible = !arr[i][j].visible;
            }
        }
    }

    answerQuickQuestion(indexQuestion)
    {        
        this.changeVisibility();
        if(indexQuestion == 0)
        {
            let phaser_txt = this.createTxt("I got a muscle pain", 0.8, 0.5);
            let phaser_img = this.createImg('profileIcon', 0.8, 0.5, 0.1, 0.1);
            let msg = new ConMsg(phaser_txt, phaser_img, 1);
            this.conManager.addMsg(msg);
            phaser_txt = this.createTxt("Here is the solution", 0.55, 0.55);
            phaser_img = this.createImg('profileIcon', 0.55, 0.55, 0.1, 0.1);
            msg = new ConMsg(phaser_txt, phaser_img, 1);
            this.conManager.addMsg(msg);

            this.conManager.show();
        }
    }

    returnToQuickqQuestions()
    {
        this.changeVisibility();
        this.conManager.hide();
    }

    createTxt(text, per_x, per_y)
    {
        let txt = this.add.text(this.ww * per_x, this.wh * per_y, text, {
            color: '#F8F8FF',
            fontSize: '14px'      
        });
        return txt;
    }

    createImg(label, per_x, per_y, per_w, per_h)
    {
        let img = this.add.image(this.ww * per_x, this.wh * per_y, label).setDisplaySize(this.wh * per_w, this.wh * per_h); 
        return img;
    }

    update() 
    {
        let cursors = this.input.keyboard.createCursorKeys();
        let offset = 2;
        if (cursors.up.isDown)
        {
            console.log("Up");
            this.conManager.scroll(-offset);
        }
        else if (cursors.down.isDown)
        {
            console.log("Down");
            this.conManager.scroll(offset);
        }
    }
    
}



