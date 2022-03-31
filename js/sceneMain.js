// window with and window height
var ww = window.innerWidth;
var wh = window.innerHeight;

class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
        this.quickQuestions = undefined;
        this.conManager = new ConManager();
        
        // 0 Bubbles of Quick Questions; 1 Conversation
        this.state = 0;  
    }

    preload() 
    {
        this.load.image('msgBG', 'assets/BlueBG.png');

        this.load.image('bg', 'assets/Mockup/background.png');        
        this.load.image('demoCharacter', 'assets/Mockup/democharacter.png');
        this.load.image('clipboard', 'assets/Mockup/clipboard.png');
        this.load.image('microphone', 'assets/Mockup/microphone.png');
        this.load.image('bubble', 'assets/Mockup/bubble.png');
        this.load.image('profileIcon', 'assets/Mockup/Profile_Icon.png');
                
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    CreateMainElements()
    {
        this.add.image(ww * 0.5, wh * 0.5, 'bg').setDisplaySize(ww, wh);
        this.add.image(ww * 0.25, wh * 0.55, 'demoCharacter').setDisplaySize(ww * 0.25, wh * 0.9); 
        this.add.image(ww * 0.05, wh * 0.1, 'clipboard').setDisplaySize(ww * 0.035, wh * 0.1); 
        let img_mic = this.add.image(ww * 0.67, wh * 0.9, 'microphone').setDisplaySize(wh*0.1, wh * 0.1); 
        img_mic.setInteractive();
        img_mic.on('pointerup', () => { this.ReturnToQuickQuestions() });
        this.add.text(ww * 0.028, wh * 0.17, "Profile", {
            fontFamily: 'open sans',
            color: '#F8F8FF',
            fontSize: '34px'            
        });
    }

    CreateQuickQuestions()
    {
        let bubbles = new Array();
        let texts = new Array();
        bubbles[0] = this.add.image(ww * 0.47, wh * 0.35, 'bubble').setDisplaySize(wh * 0.3, wh * 0.3); 
        texts[0] = this.add.text(ww * 0.44, wh * 0.35, "Bubble_1", {
            color: '#F8F8FF',
            fontSize: '24px'      
        });
        
        bubbles[1] = this.add.image(ww * 0.58, wh * 0.15, 'bubble').setDisplaySize(wh * 0.2, wh * 0.2); 
        bubbles[2] = this.add.image(ww * 0.71, wh * 0.35, 'bubble').setDisplaySize(wh * 0.4, wh * 0.4); 
        bubbles[3] = this.add.image(ww * 0.88, wh * 0.20, 'bubble').setDisplaySize(wh * 0.28, wh * 0.28); 

        this.quickQuestions = [bubbles, texts];

        bubbles[0].setInteractive();
        bubbles[0].on('pointerover', () => { texts[0].setStyle({ color: '#F00000', }); });
        bubbles[0].on('pointerout', () => { texts[0].setStyle({ color: '#F8F8FF', }); });
        // bubbles[0].on('pointerup', () => { window.location.href = "index2.html";});
        bubbles[0].on('pointerup', () => { this.AnswerQuickQuestion(0) });
        bubbles[0].on('pointerdown', () => { console.log('pointerdown'); });
    }

    CreateTestAnim()
    {
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

        let avatar = this.add.sprite(ww * 0.02, wh * 0.95, 'dude');
        avatar.anims.play('left', true);
        avatar.setInteractive();
        avatar.on('pointerover', () => 
        { 
            if(avatar.anims.currentAnim.key === 'left')
                avatar.anims.play('right', true);
            else if(avatar.anims.currentAnim.key === 'right')
                avatar.anims.play('left', true);
        });
        avatar.on('pointerdown', () => 
        { 
            if(avatar.anims.currentAnim.key != 'turn')
                avatar.anims.play('turn', true);
            else if(avatar.anims.currentAnim.key === 'turn')
                avatar.anims.play('left', true);
            
        });
    }

    SetInputField()
    {
        let scene_self = this;
        let nameInputField = "area51";
        let el = document.getElementById(nameInputField);
        el.style.position = "absolute"; 
        el.style.top = wh*0.65 + "px";
        el.style.left = ww*0.52 + "px";
        el.style.width = 600 + "px";
        el.style.height = 100 + "px";
        el.onchange = function(){ scene_self.InputFieldChanged(nameInputField); };
        el.onfocus = function()
            { 
                if(el.value === "What question do you have?")
                    el.value = ""; 
            };
        // el.oninput = () => console.log(el.value);
        el.onmouseout = () => el.blur();

        // phaser built-in wheel is not working, have to use js built-in wheel instead
        window.onwheel = function(event){ scene_self.WheelResponse(event); };
    }

    create() 
    {        
        this.CreateMainElements();
        this.CreateQuickQuestions();
        this.CreateTestAnim();   
        
        this.SetInputField();

        // this.formUtil = new FormUtil({scene: this, rows: 20, cols: 20});
        
        // var r0 = this.add.line(800, 100, 0, 0, 600, 0, 0x6666ff);
        // var r1 = this.add.line(0, 0, 400, 400, 140, 0, 0x6666ff);
        // var r2 = this.add.line(0, 0, 400, 400, 140, 0, 0x6666ff);
        // var r3 = this.add.line(200, 200, 400, 400, 140, 0, 0x6666ff);
        // r2.setLineWidth(10, 40);
    }    
    
    SetVisibilityOfQuickQuestions(isVisible)
    {
        for (let i = 0; i < this.quickQuestions.length; i++)
        {
            for (let j = 0; j < this.quickQuestions[i].length; j++)
            {
                this.quickQuestions[i][j].visible = isVisible;
            }
        }
    }

    WheelResponse(event) 
    {
        if(this.state == 1)
        {
            let rOffset = 0.02;
            if(event.deltaY < 0)
                this.conManager.scroll(rOffset);
            else if(0 < event.deltaY)
                this.conManager.scroll(-rOffset);   
        }           
    }


    InputFieldChanged(i_nameInputField) 
    {
        let el = document.getElementById(i_nameInputField);
    	var text = el.value;

        // var dct = {};
        // const arrayWord = text.split(' ');
        // for(let i = 0; i < arrayWord.length; i++)
        // {
        //     if(dct[arrayWord[i]] === undefined)
        //         dct[arrayWord[i]] = 1;
        //     else
        //         dct[arrayWord[i]]++;
        // }
        
        // let s1 = "possible side effect";
        // const arraryS1 = s1.split(' ');
        // let cnt = 0;
        // for(let i = 0; i < arraryS1.length; i++)
        // {
        //     if(dct[arraryS1[i]] === undefined)
        //         continue;
        //     else
        //         cnt++;
        // }
        // console.log(text);
    	// console.log(cnt);

        if(this.state != 1)
        {
            this.SetVisibilityOfQuickQuestions(false);
            this.state = 1;
        }  
        
        let img = this.CreateImg('msgBG', 0.1, 0.1);
        let txt = this.CreateTxt(text);
        let msg = new ConMsg(txt, img, 1);
        this.conManager.addMsg(msg);
        
        img = this.CreateImg('msgBG', 0.1, 0.1);
        txt = this.CreateTxt("Here is the solution");
        msg = new ConMsg(txt, img, 0);
        this.conManager.addMsg(msg);        
    }
    

    AnswerQuickQuestion(indexQuestion)
    {        
        if(this.state != 1)
        {
            this.SetVisibilityOfQuickQuestions(false);
            this.state = 1;
        }            
        if(indexQuestion == 0)
        {
            for(let i = 0; i < 8; i++)
            {                
                let img = this.CreateImg('msgBG', 0.1, 0.1);
                let txt = this.CreateTxt("I got a muscle pain " + i);
                let msg = new ConMsg(txt, img, 1);
                this.conManager.addMsg(msg);
                
                img = this.CreateImg('msgBG', 0.1, 0.1);
                txt = this.CreateTxt("Here is the solution " + i);
                msg = new ConMsg(txt, img, 0);
                this.conManager.addMsg(msg);   
            }         
        }
    }

    ReturnToQuickQuestions()
    {
        if(this.state != 0)
        {
            this.SetVisibilityOfQuickQuestions(true);
            this.conManager.hide();
        }        
    }

    CreateTxt(text, rX=0, rY=0)
    {
        let txt = this.add.text(ww * rX, wh * rY, text, {
            color: '#F8F8FF',
            fontSize: '14px'      
        });
        return txt;
    }

    CreateImg(label, rW=-1, rH=-1, rX=0, rY=0)
    {
        let img = this.add.image(ww * rX, wh * rY, label);
        if(rW != -1 && rH != -1)
            img.setDisplaySize(wh * rW, wh * rH); 
        return img;
    }


    update() 
    {
        // let cursors = this.input.keyboard.createCursorKeys();
        // let offset = 2;
        // if (cursors.up.isDown)
        // {
        //     console.log("Up");
        //     this.conManager.scroll(-offset);
        // }
        // else if (cursors.down.isDown)
        // {
        //     console.log("Down");
        //     this.conManager.scroll(offset);
        // }
        // console.log(this.conManager.CountMsg());
    }
    
}



