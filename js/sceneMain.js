var b_Debug = true;

var w_avatarFrame = 448;
var h_avatarFrame = 770;

var phaserText_MousePosition;


var Content_QuickQuestions = ["What are statins?", "Who should use?", "How and When?", "The side effects?"];
var Content_AnswersToQuickQuestions = 
[
"Statins can help lower the risk of heart attack \n\
and stroke in people who are at increased risk.\n\
(1) Reduce plaque build-up. \n\
(2) Stabilize plaque in the arteries of the heart.\n\
(3) Lower your cholesterol.\n\
(4) Help protect your heart from future\n" + 
"Statins can help lower the risk of heart attack \n\
and stroke in people who are at increased risk.\n\
(1) Reduce plaque build-up. \n\
(2) Stabilize plaque in the arteries of the heart.\n\
(3) Lower your cholesterol.\n\
(4) Help protect your heart from future\n" +
"Statins can help lower the risk of heart attack \n\
and stroke in people who are at increased risk.\n\
(1) Reduce plaque build-up. \n\
(2) Stabilize plaque in the arteries of the heart.\n\
(3) Lower your cholesterol.",

"You should take a statin if you have an increased risk \n\
of heart attack or stroke.Studies show that statins  \n\
can reduce the risk of a heart attack or stroke by 30\-45%, \n\
even if your cholesterol is norma",

"It's best to take statins in the evening, because \n\
cholesterol is made while you sleep.\n\
However, you can take statins any time\n\
if it is easier for you to remember to take it.\n\
Follow your doctor's instructions",

"have side effects. Common side effects may include:\n\
(1) Muscle aches (not severe pain)\n\
(2) Upset stomach"
];



class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
        this.quickQuestions = undefined;
        this.conManager = new ConManager();
        this.avatar = undefined;
        
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
                
        this.load.spritesheet('dude', 'assets/at.jpg', { frameWidth: 124, frameHeight: 179 });
        this.load.spritesheet('avatar_idle', 'assets/Mockup/Idel_sprite_sheet.png', { frameWidth: w_avatarFrame, frameHeight: h_avatarFrame });
        this.load.spritesheet('avatar_speak', 'assets/Mockup/speak_sprite_sheet.png', { frameWidth: w_avatarFrame, frameHeight: h_avatarFrame });
        
    }

    CreateMainElements()
    {
        this.add.image(ww * 0.5, wh * 0.5, 'bg').setDisplaySize(ww, wh);
        // this.add.image(ww * 0.25, wh * 0.55, 'demoCharacter').setDisplaySize(ww * 0.25, wh * 0.9); 
        this.add.image(ww * 0.05, wh * 0.1, 'clipboard').setDisplaySize(ww * 0.035, wh * 0.1); 
        let img_mic = this.add.image(ww * 0.67, wh * 0.9, 'microphone').setDisplaySize(wh*0.1, wh * 0.1); 
        img_mic.setInteractive();
        img_mic.on('pointerup', () => { this.ReturnToQuickQuestions() });
        this.add.text(ww * 0.05, wh * 0.2, "Profile", {
            fontFamily: 'open sans',
            color: '#F8F8FF',
            fontSize: (ww * 0.02) + 'px'            
        }).setOrigin(0.5);
    }

    CreateQuickQuestions()
    {
        let bubbles = new Array();
        let texts = new Array();
        let coord_bubbles = [[0.47, 0.35], [0.57, 0.15], [0.70, 0.35], [0.87, 0.20]];
        let scale_bubbles = [0.3, 0.2, 0.37, 0.27];
        let text_bubbles = ["What are \nstatins?", "Target\n User", "How and when\n do I take?", "Side effects"];
        let r_font_text = [0.015, 0.0137, 0.0187, 0.015];
        for(let i = 0; i < coord_bubbles.length; i++)
        {
            let pX = ww * coord_bubbles[i][0];
            let pY = wh * coord_bubbles[i][1];
            bubbles[i] = this.add.image(pX, pY, 'bubble').setDisplaySize(wh * scale_bubbles[i], wh * scale_bubbles[i]); 
            texts[i] = this.add.text(pX, pY, text_bubbles[i], {
                color: '#F8F8FF',
                fontSize: (ww * r_font_text[i]) + "px"      
            }).setOrigin(0.5);    

            bubbles[i].setInteractive();
            bubbles[i].on('pointerover', () => { texts[i].setStyle({ color: '#F00000', }); });
            bubbles[i].on('pointerout', () => { texts[i].setStyle({ color: '#F8F8FF', }); });
            bubbles[i].on('pointerup', () => { this.AnswerQuickQuestion(i) });
            // bubbles[i].on('pointerdown', () => { console.log('pointerdown'); });    
        }

        this.quickQuestions = [bubbles, texts];
    
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

    CreateAvatar()
    {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('avatar_idle', { start: 0, end: 284 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.create({
            key: 'speak',
            frames: this.anims.generateFrameNumbers('avatar_speak', { start: 0, end: 280 }),
            frameRate: 30,
            repeat: 0
        });

        this.avatar = this.add.sprite(ww * 0.25, wh * 1, 'avatar_idle').setScale(1.5 * wh/h_avatarFrame);
        this.avatar.anims.play('idle', true);
        // this.avatar.setInteractive();
    }

    SetInputField()
    {
        let scene_self = this;
        let nameInputField = "inputField_v0";
        let el = document.getElementById(nameInputField);
        el.style.position = "absolute"; 
        el.style.top = wh * (rY_bottomBnd + 0.03) + "px";
        el.style.left = ww * rX_leftBnd + "px";
        el.style.width = ww * (rX_rightBnd - rX_leftBnd) + "px";
        el.style.height = wh * 0.1 + "px";
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

    ExtraWork()
    {
        let tmpIMG = this.add.image(ww*0.5, wh*0.5, "msgBG");
        pW_OriginalMsgBg = tmpIMG.width;
        pH_OriginalMsgBg = tmpIMG.height;
        tmpIMG.visible = false;
        // console.log("Before Set Display Size: " + tmpIMG.width + "  " + tmpIMG.height);
        // tmpIMG.setDisplaySize(ww*0.1, wh*0.2);
        // console.log("After Set Display Size: " + tmpIMG.width + "  " + tmpIMG.height);
        // tmpIMG.setCrop(0,0,ww*0.05,wh*0.1);

        phaserText_MousePosition = this.add.text(ww * 0.2, wh * 0.1, "0123456789\n0123456789\n0123456789\n0123456789", {
            color: '#000000',
            fontSize:  (ww * 0.0137) + 'px'      
        }).setOrigin(0.5);
    }
    

    create() 
    {        
        this.CreateMainElements();
        this.CreateQuickQuestions();
        this.CreateAvatar();

        this.SetInputField();
        this.ExtraWork();
        

        // this.formUtil = new FormUtil({scene: this, rows: 20, cols: 20});
        
        // var r0 = this.add.line(800, 100, 0, 0, 600, 0, 0x6666ff);
        // var r1 = this.add.line(0, 0, 400, 400, 140, 0, 0x6666ff);
        // var r2 = this.add.line(0, 0, 400, 400, 140, 0, 0x6666ff);
        // var r3 = this.add.line(200, 200, 400, 400, 140, 0, 0x6666ff);
        // r2.setLineWidth(10, 40);


        // var test_bg = this.add.image(ww * 0.2, wh * 0.3, 'msgBG');
        // var test_txt = this.add.text(ww * 0.2, wh * 0.3, "0123456789\n0123456789\n0123456789\n0123456789", {
        //     color: '#000000',
        //     fontSize: '22px'      
        // }).setOrigin(0.5).setCrop(0, 0, ww, 44);
        // test_bg.setDisplaySize(test_txt.width, test_txt.height); 
        
    }    
    
    ShowQuickQuestions(isVisible)
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
                this.conManager.Scroll(rOffset);
            else if(0 < event.deltaY)
                this.conManager.Scroll(-rOffset);   
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

        
        let img = this.CreateImg('msgBG');
        let txt = this.CreateTxt(text);
        let msg = new ConMsg(txt, img, 1);
        this.conManager.AddMsg(msg);
        
        img = this.CreateImg('msgBG');
        txt = this.CreateTxt("Here is the solution:\nXXXXXXXXXXXX");
        msg = new ConMsg(txt, img, 0);
        this.conManager.AddMsg(msg);   
        

        this.ShowQuickQuestions(false);
        this.conManager.ShowAllMsg(true);
        this.avatar.anims.play('speak', true);
        this.state = 1;
    }
    

    AnswerQuickQuestion(indexQuestion)
    {        
                
        let img = this.CreateImg('msgBG');
        let txt = this.CreateTxt(Content_QuickQuestions[indexQuestion]);            
        let msg = new ConMsg(txt, img, 1);
        this.conManager.AddMsg(msg);
        
        img = this.CreateImg('msgBG');
        txt = this.CreateTxt(Content_AnswersToQuickQuestions[indexQuestion]);
        msg = new ConMsg(txt, img, 0);
        this.conManager.AddMsg(msg);  


        this.ShowQuickQuestions(false);
        this.conManager.ShowAllMsg(true);
        this.avatar.anims.play('speak', true);
        this.state = 1;
    }

    ReturnToQuickQuestions()
    {
        if(this.state != 0)
        {
            this.ShowQuickQuestions(true);
            this.conManager.ShowAllMsg(false);
            this.avatar.anims.play('idle', true);
            this.state = 0;
        }        
    }

    CreateTxt(text, rX=0, rY=0)
    {
        let txt = this.add.text(ww * rX, wh * rY, text, {
            color: '#F8F8FF',
            fontSize: (ww * 0.01) + 'px'      
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

    CreateText_ByJS()
    {
        let el = document.createElement("p");
        let textNode = document.createTextNode("0123456789");
        el.appendChild(textNode);
        document.body.appendChild(el);
        el.style.position = "absolute"; 
        el.style.top = ww * 0.2 + "px";
        el.style.left = wh * 0.3 + "px";
        el.style.width = ww * 0.1 + "px";
        el.style.height = wh * 0.1 + "px";
    }

    update() 
    {
        // let cursors = this.input.keyboard.createCursorKeys();
        // let offset = 2;
        // if (cursors.up.isDown)
        // {
        //     console.log("Up");
        //     this.conManager.Scroll(-offset);
        // }
        // else if (cursors.down.isDown)
        // {
        //     console.log("Down");
        //     this.conManager.Scroll(offset);
        // }
        // console.log(this.conManager.MsgCount());

        if(!this.avatar.anims.isPlaying)
        {
            console.log("No animation is playing right now");
            this.avatar.anims.play('idle', true);
        }

        if(b_Debug)
        {
            phaserText_MousePosition.text = "pX: " + this.input.mousePointer.x + 
                                "\t\tpY: " + this.input.mousePointer.y + "\n" +
                                "rX: " + (this.input.mousePointer.x/ww).toFixed(2) + 
                                "\t\trY: " + (this.input.mousePointer.y/wh).toFixed(2);
        }
        
            
    }
    
}



