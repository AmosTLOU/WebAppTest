// "Statins can help lower the risk of heart attack \n\
// and stroke in people who are at increased risk.\n\
// (1) Reduce plaque build-up. \n\
// (2) Stabilize plaque in the arteries of the heart.\n\
// (3) Lower your cholesterol.\n\
// (4) Help protect your heart from future",


var b_Debug = false;

var w_avatarFrame = 448;
var h_avatarFrame = 770;

var phaserText_MousePosition;

// 1 shown in the conversation box, 3 in the related questions area
var MaxCntAnswers = 4;
var limitChInOneLine = undefined;

var Content_QuickQuestions = ["What are statins?", "Who should use?", "How and When?", "The side effects?"];
var Content_AnswersToQuickQuestions = 
[
"Statins can help lower the risk of heart attack and stroke in people who are at increased risk. Reduce plaque build-up. Help protect your heart from future.",

"You should take a statin if you have an increased risk of heart attack or stroke. Studies show that statins can reduce the risk of a heart attack or stroke\
 by 30\-45%, even if your cholesterol is normal.",

"It's best to take statins in the evening, because cholesterol is made while you sleep. However, you can take statins any time if it is easier for you\
 to remember to take it. Follow your doctor's instructions.",

"Common side effects may include: \n (1) Muscle aches (not severe pain) \n (2) Upset stomach"
];
// 上面的内容里： \n两侧都要留空格！ 不然maketextfit中 split函数不能把\n提取出来

var ListQuestions = ["What when are statins?", "What what what should use?", "what and When?", "what what side effects?"];
// var ListQuestions = Content_QuickQuestions;
var ListAnswers = Content_AnswersToQuickQuestions;
var dct_synonym = { "bad": "side", "benefits": "good", "benefit": "good", "help": "good", "helps": "good", "popular": "good", "effects": "effect", "statins": "statin" }
var dct_useless = { "is": 0, "it": 0, "to": 0 , "the": 0, "a": 0, "me": 0, "you": 0};



class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
        this.quickQuestions = undefined;
        this.relatedQuestions = undefined;
        this.conManager = undefined;
        this.avatar = undefined;
        
        // 0 Bubbles of Quick Questions; 1 Conversation
        this.state = 0;  
    }

    preload() 
    {
        // this.load.image('msgBG', 'assets/BlueBG.png');
        this.load.image('msgBG', 'assets/Mockup/textbackground.png');
        this.load.image('ConBoxBG', 'assets/Mockup/dialog_bg2.png');        
        this.load.image('patientAvatar', 'assets/Mockup/patient_avatar.png');        
        this.load.image('doctorAvatar', 'assets/Mockup/doctor_avatar.png');        

        this.load.image('bg', 'assets/Mockup/background.png');        
        this.load.image('demoCharacter', 'assets/Mockup/democharacter.png');
        this.load.image('clipboard', 'assets/Mockup/clipboard.png');
        this.load.image('microphone', 'assets/Mockup/microphone.png');
        this.load.image('bubble', 'assets/Mockup/bubble.png');
        this.load.image('profile', 'assets/Mockup/profile.png');
        this.load.image('profileIcon', 'assets/Mockup/Profile_Icon.png');
                
        this.load.spritesheet('dude', 'assets/at.jpg', { frameWidth: 124, frameHeight: 179 });
        this.load.spritesheet('avatar_idle', 'assets/Mockup/Idel_sprite_sheet.png', { frameWidth: w_avatarFrame, frameHeight: h_avatarFrame });
        this.load.spritesheet('avatar_speak', 'assets/Mockup/speak_sprite_sheet.png', { frameWidth: w_avatarFrame, frameHeight: h_avatarFrame });
        
    }

    CreateMainElements()
    {        
        this.add.image(ww * 0.5, wh * 0.5, 'bg').setDisplaySize(ww, wh);
        
        // let img_profile = this.add.image(ww * 0.7, wh * 0.33, 'profile').setDisplaySize(ww * 0.30, wh * 0.6);
        // img_profile.visible = false;
        // let img_profileIcon = this.add.image(ww * 0.05, wh * 0.1, 'clipboard').setDisplaySize(ww * 0.035, wh * 0.1); 
        // img_profileIcon.setInteractive();
        // img_profileIcon.on('pointerup', () => 
        // { 
        //     if(this.state == 0)
        //     {
        //         img_profile.visible = !img_profile.visible;  
        //         this.ShowQuickQuestions(!img_profile.visible);
        //     }            
        // });
        // this.add.text(ww * 0.05, wh * 0.2, "Profile", 
        // {
        //     fontFamily: 'open sans',
        //     color: '#F8F8FF',
        //     fontSize: (ww * 0.02) + 'px'            
        // }).setOrigin(0.5);

        let img_mic = this.add.image(ww * 0.67, wh * 0.9, 'microphone').setDisplaySize(wh * 0.1, wh * 0.1); 
        img_mic.setInteractive();
        img_mic.on('pointerup', () => { this.ReturnToQuickQuestions() });
        

        let img_ConBG = this.add.image(ww * (rX_rightBnd + rX_leftBnd) * 0.5, wh * (rY_bottomBnd + rY_topBnd)* 0.5, 'ConBoxBG');
        if(b_Debug)
            img_ConBG.setDisplaySize(ww * (rX_rightBnd - rX_leftBnd), wh * (rY_bottomBnd - rY_topBnd));
        else
            img_ConBG.setDisplaySize(ww * (rX_rightBnd - rX_leftBnd), wh * (rY_bottomBnd - rY_topBnd + 2 * padding_rY));
        img_ConBG.visible = false;
        this.conManager = new ConManager(img_ConBG);
    }

    CreateQuickQuestions()
    {
        let bubbles = new Array();
        let texts = new Array();
        let coord_bubbles = [[0.47, 0.35], [0.57, 0.15], [0.70, 0.35], [0.87, 0.20]];
        let rRadius_bubbles = [0.3, 0.2, 0.37, 0.27];
        let text_bubbles = ["What are \n statins?", "Target\n User", "How and when\n  do I take?", "Side effects"];
        let r_font_text = [0.017, 0.015, 0.0187, 0.015];
        for(let i = 0; i < coord_bubbles.length; i++)
        {
            let pX = ww * coord_bubbles[i][0];
            let pY = wh * coord_bubbles[i][1];
            bubbles[i] = this.add.image(pX, pY, 'bubble').setDisplaySize(wh * rRadius_bubbles[i], wh * rRadius_bubbles[i]); 
            texts[i] = this.add.text(pX, pY, text_bubbles[i], {
                fontFamily: 'open sans',
                color: '#F8F8FF',
                fontSize: (ww * r_font_text[i]) + "px"      
            }).setOrigin(0.5);    

            bubbles[i].setInteractive();
            bubbles[i].on('pointerover', () => { texts[i].setStyle({ color: '#F00000', }); });
            bubbles[i].on('pointerout', () => { texts[i].setStyle({ color: '#F8F8FF', }); });
            bubbles[i].on('pointerup', () => { this.AnswerQuickQuestion(i) });
            // bubbles[i].on('pointerdown', () => { console.log('pointerdown'); });  
            
            let tweensScale = 0.9;
            if((i&1) == 1)
            tweensScale = 1.1;
            this.tweens.add({
                targets: bubbles[i],
                scaleX: rRadius_bubbles[i]*wh / bubbles[i].height * tweensScale,
                scaleY: rRadius_bubbles[i]*wh / bubbles[i].height * tweensScale,
                duration: 1500,
                ease: 'Sine.easeInOut',
                delay: 0,
                yoyo: true,
                repeat: -1
            });
        }

        this.quickQuestions = [bubbles, texts];    
    }

    CreateRelatedQuestions()
    {
        let rX = 0.1;
        let rY = 0.1;
        let rOffsetY = 0.05; 
        this.relatedQuestions = new Array();
        for(let i = 0; i < MaxCntAnswers-1; i++)
        {
            let txt = this.add.text(ww * rX, wh * rY, "Related Question No." + (i+1), {
                fontFamily: 'open sans',
                color: '#F8F8FF',
                fontSize: (ww * 0.013) + 'px'      
            });
            txt.setInteractive();
            txt.on('pointerover', () => { txt.setStyle({ color: '#F00000', }); });
            txt.on('pointerout', () => { txt.setStyle({ color: '#F8F8FF', }); });
            txt.visible = false;
            this.relatedQuestions.push(txt);

            rY += rOffsetY;
        }
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
        el.style.fontSize = wh * 0.02 + "px";
        el.style.lineHeight = wh * 0.03 + "px";
        el.style.paddingTop =  wh * 0.012 + "px";
        el.style.paddingBottom =  wh * 0.012 + "px";
        el.style.paddingLeft =  wh * 0.012 + "px";
        el.style.paddingRight =  wh * 0.012 + "px";
        el.style.borderRadius = wh * 0.015 + "px";

        // el.onchange = function(){ scene_self.RaiseQuestion(nameInputField); };
        el.onfocus = function()
            { 
                if(el.value === "What question do you have?")
                    el.value = ""; 
            };
        // el.oninput = () => console.log(el.value);
        // el.onmouseout = () => el.blur();
        el.onkeydown = function(event)
        {             
            // console.log(event.key);
            if(event.key == "Enter")
            {
                event.preventDefault();
                scene_self.RaiseQuestion(nameInputField);
            }
        };

        // phaser built-in wheel is not working, have to use js built-in wheel instead
        window.onwheel = function(event){ scene_self.WheelResponse(event); };
    }

    ExtraWork()
    {
        let tmpIMG = this.add.image(0, 0, "msgBG");
        // pW_OriginalMsgBg = tmpIMG.width;
        pH_OriginalMsgBg = tmpIMG.height;
        tmpIMG.visible = false;

        tmpIMG = this.add.image(0, 0, "patientAvatar");
        pH_OriginalAvatarIcon = tmpIMG.height;
        tmpIMG.visible = false;


        let txtUsedToDecideOneLineLimit = this.CreateMessageText("");
        for(let i = 0; i < 200; i++)
        {            
            // Capital W is the English letter that takes up most space width-wise
            txtUsedToDecideOneLineLimit.text += 'W';
            if( (rX_rightBnd - rX_leftBnd) < (txtUsedToDecideOneLineLimit.width / ww) )
            {
                limitChInOneLine = i;
                txtUsedToDecideOneLineLimit.visible = false;
                break;
            }
        }
        

        if(b_Debug)
        {
            phaserText_MousePosition = this.add.text(ww * 0.2, wh * 0.1, "0123456789\n0123456789\n0123456789\n0123456789", {
                color: '#000000',
                fontSize:  (ww * 0.0137) + 'px'      
            }).setOrigin(0.5);
        }        
    }
    

    create() 
    {        
        this.CreateMainElements();
        this.CreateQuickQuestions();
        this.CreateRelatedQuestions();
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

    ShowRelatedQuestions(IndexRelatedQuestions)
    {
        let sz = Math.min(IndexRelatedQuestions.length, MaxCntAnswers-1);
        for(let i = 0; i < MaxCntAnswers-1; i++)
        {
            if(i < sz)
            {
                this.relatedQuestions[i].visible = true;
                this.relatedQuestions[i].text = ListQuestions[IndexRelatedQuestions[i]];
                this.relatedQuestions[i].on('pointerup', () => { this.AnswerQuickQuestion(IndexRelatedQuestions[i]) });
            }
            else
            {
                this.relatedQuestions[i].visible = false;
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

    Create2MsgAndShow(msg_LeftSide, msg_RightSide)
    {
        msg_RightSide = this.MakeTextFit(msg_RightSide);
        msg_LeftSide = this.MakeTextFit(msg_LeftSide);
        if(msg_RightSide === undefined)
        {
            alert("please input a question that makes sense!");
            return;
        }  
        if(msg_LeftSide === undefined)
        {
            alert("Something is wrong with our system. Sry!");
            return;
        }

        let img_PatientAvatar = this.CreateImg('patientAvatar');
        let img_bg = this.CreateImg('msgBG');
        let txt = this.CreateMessageText(msg_RightSide);
        let msg = new ConMsg(txt, img_bg, img_PatientAvatar, 1);
        this.conManager.AddMsg(msg);
        
        let img_DoctorAvatar = this.CreateImg('doctorAvatar');
        img_bg = this.CreateImg('msgBG');
        txt = this.CreateMessageText(msg_LeftSide);
        msg = new ConMsg(txt, img_bg, img_DoctorAvatar, 0);
        this.conManager.AddMsg(msg);  

        this.ShowQuickQuestions(false);
        this.conManager.ShowAllMsg(true);
        this.avatar.anims.play('speak', true);
        this.state = 1;
    }

    // to lowercase, no sign, no punctuation, to synonym, remove useless
    ConvertWordToStandardWord(word)
    {
        // converts to lowercase at the first place
        word = word.toLowerCase();
        // remove any non-letter character
        let tmp = "";
        for(let j = 0; j < word.length; j++)
        {
            let c = word[j];
            if(('a' <= c && c <='z') || ('A' <= c && c <='Z'))
                tmp += c;
            else
                break;
        }
        word = tmp;
        // exists in the dct_synonym
        if(dct_synonym[word] != undefined)
        {
            word = dct_synonym[word]
        }
        // exists in the dct_useless
        if(dct_useless[word] != undefined)
        {
            return "";
        }
        return word;
    }

    SelectAnswer(str_question)
    {        
        let dct = {};
        let arrayWord = str_question.split(' ');
        for(let i = 0; i < arrayWord.length; i++)
        {                 
            let word = this.ConvertWordToStandardWord(arrayWord[i]);
            if(word.length <= 0)
                continue;
            // first appear
            if(dct[word] === undefined)
                dct[word] = 1;
            // appear again
            else
                dct[word]++;
        }
        
        let result = new Array();
        for(let k = 0; k < ListQuestions.length; k++)
        {
            let q = ListQuestions[k];
            let arrayWord = q.split(' ');
            let matchScore = 0;
            for(let i = 0; i < arrayWord.length; i++)
            {
                let word = this.ConvertWordToStandardWord(arrayWord[i]);
                if(word.length <= 0)
                    continue;

                if(dct[word] === undefined)
                {
                    continue;
                }
                else
                {
                    matchScore += dct[word];
                }
            }

            if(matchScore <= 0)
                continue;
            if(result.length < MaxCntAnswers)
            {
                // k: index of the qustion, matchScore: matching score of this question
                result.push([k, matchScore]);
            }
            else if(result.length == MaxCntAnswers)
            {
                let minScore = 9999;
                let indReplaced = -1;
                for(let j = 0; j < MaxCntAnswers; j++)
                {
                    if(result[j][1] < minScore)
                    {
                        minScore = result[j][1];
                        indReplaced = j;
                    }
                }
                if(minScore < matchScore)
                {
                    result[indReplaced] = [k, matchScore];
                }
            }
            else
            {
                alert("something is wrong");
            }
        }   
        // if return value < 0, then a is in front of b. Otherwise, b is in front of a
        result.sort(function(a, b){return b[1] - a[1]});
        let ret = new Array();
        for(let i = 0; i < result.length; i++)
        {
            ret.push(result[i][0]);
            // console.log(result[i][1]);
        }
        return ret;
    }

    RaiseQuestion(i_nameInputField) 
    {
        let el = document.getElementById(i_nameInputField);
    	let text = el.value;      
        
        let IndexRelatedQuestions = new Array();
        let IndexAnswers = this.SelectAnswer(text);
        let msg_LeftSide = "Sorry, we couldn't find an answer for your question.";
        if(0 < IndexAnswers.length)
        {
            msg_LeftSide = ListQuestions[IndexAnswers[0]] +" \n " + ListAnswers[IndexAnswers[0]];
            if(1 < IndexAnswers.length)
            {                
                for(let i = 1; i < IndexAnswers.length; i++)
                {
                    IndexRelatedQuestions.push(IndexAnswers[i]);
                }
            }
        }   
        this.ShowRelatedQuestions(IndexRelatedQuestions);         
        let msg_RightSide = text;
        
        this.Create2MsgAndShow(msg_LeftSide, msg_RightSide);
        el.value = "";
    }
    

    AnswerQuickQuestion(indexQuestion)
    {        
        let msg_RightSide = Content_QuickQuestions[indexQuestion];
        let msg_LeftSide = Content_AnswersToQuickQuestions[indexQuestion];
        this.Create2MsgAndShow(msg_LeftSide, msg_RightSide);
    }

    ReturnToQuickQuestions()
    {
        if(this.state != 0)
        {
            this.ShowQuickQuestions(true);
            this.ShowRelatedQuestions([]);
            this.conManager.ShowAllMsg(false);
            this.avatar.anims.play('idle', true);
            this.state = 0;
        }        
    }

    MakeTextFit(text)
    {
        // todo better write a new split function to extract \n, remove blank space, etc.
        let arrayWord = text.split(' ');
        // for(let i = 0; i < arrayWord.length; i++)
        //     console.log("[" + arrayWord[i] + "]");
        let lines = new Array();
        let oneLine = "";
        for(let i = 0; i < arrayWord.length; )
        {            
            if(limitChInOneLine < arrayWord[i].length)
                return undefined;
            // This situation may happen if there are multiple blank spaces between 2 words
            if(arrayWord[i].length <= 0)
            {
                i++;
                continue;
            }
            if(arrayWord[i] == '\n')
            {
                if(0 < oneLine.length)
                {
                    oneLine += '\n';
                    lines[lines.length] = oneLine;
                    oneLine = "";
                }
                i++;
                continue;
            }

            let oneLine_prospective = oneLine;
            if(oneLine.length <= 0)
                oneLine_prospective = arrayWord[i];
            else
                oneLine_prospective = oneLine + " " + arrayWord[i];
            if(oneLine_prospective.length <= limitChInOneLine)
            {
                oneLine = oneLine_prospective;
                if(i+1 == arrayWord.length)
                {
                    lines[lines.length] = oneLine;
                    break;
                }
                i++;                
            }
            else
            {
                oneLine += '\n';
                lines[lines.length] = oneLine;
                oneLine = "";
            }
        }
        let content = "";
        for(let i = 0; i < lines.length; i++)
            content += lines[i];
        if(content.length <= 0)
            return undefined;
        else
            return content;
    }

    CreateMessageText(content, rX=0, rY=0)
    {
        let txt = this.add.text(ww * rX, wh * rY, content, {
            fontFamily: 'open sans',
            color: '#000000',
            fontSize: (ww * 0.013) + 'px'      
        });
        return txt;
    }

    CreateImg(label, rW=-1, rH=-1, rX=0, rY=0)
    {
        let img = this.add.image(ww * rX, wh * rY, label);
        if(rW != -1 && rH != -1)
            img.setDisplaySize(ww * rW, wh * rH); 
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
            // console.log("No animation is playing right now");
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



