var b_Debug = false;
var phaserText_MousePosition;

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
        // start page
        this.load.image('startPage_bg', 'assets/MockUp2/StartPage/StartPage_BackGround.png');
        this.load.image('startPage_b1', 'assets/MockUp2/StartPage/StartPage_board1.png');
        this.load.image('startPage_b2', 'assets/MockUp2/StartPage/StartPage_board2.png');
        this.load.image('startPage_b3', 'assets/MockUp2/StartPage/StartPage_board3.png');
        this.load.image('startPage_b3_pressed', 'assets/MockUp2/StartPage/StartPage_board3_pressed.png');
        this.load.image('startPage_submit', 'assets/MockUp2/StartPage/StartPage_SubmitButton.png');
        this.load.image('startPage_avatar', 'assets/MockUp2/StartPage/StartPage_UserAvatar.png');
        this.load.image('startPage_back', 'assets/MockUp2/StartPage/back.png'); 
    }

    GetQAFromJSON()
    {     
        let formatQA = 1;
        let pathJSON = undefined;

        // Get json from online resources
        // pathJSON = "https://amostlou.github.io/WebAppTest/data_V0.json";
        // Get json from files
        // pathJSON = "JSON/data_V0.json";
        pathJSON = "JSON/data_V1.json";
        
        if(formatQA == 0)
        {
            $.getJSON(pathJSON, function(json) {
                // console.log(json);
                // console.log(json.name);

                
            });
        }
        else if(formatQA == 1)
        {
            $.getJSON(pathJSON, function(json) {
                
            });
        }       
        
    }

    CreateStartPage()
    {
        this.add.image(ww * 0.5, wh * 0.5, 'startPage_bg').setDisplaySize(ww, wh);
        this.add.image(ww * 0.1, wh * 0.02, 'startPage_back').setDisplaySize(wh*0.06, wh*0.06).setOrigin(0.5, 0);  
        this.add.image(ww * 0.5, wh * 0.1, 'startPage_b1').setDisplaySize(ww*0.8, wh*0.7).setOrigin(0.5, 0);
        this.add.image(ww * 0.5, wh * 0.1, 'startPage_b2').setDisplaySize(ww*0.8, wh*0.2).setOrigin(0.5, 0);
        this.add.image(ww * 0.2, wh * 0.12, 'startPage_avatar').setDisplaySize(wh*0.07, wh*0.07).setOrigin(0.5, 0);
        this.make.text({
            x: ww * 0.3,
            y: wh * 0.12,
            text: "What was the reason for stopping your statin last time?",
            origin: { x: 0, y: 0 },
            style: {
                font: 'bold 26px Arial',
                fill: '#FFFFFF',
                lineSpacing: wh*0.005,
                wordWrap: { width: 300 }
            }
        });
        this.make.text({
            x: ww * 0.3,
            y: wh * 0.24,
            text: "Please select all that apply",
            origin: { x: 0, y: 0 },
            style: {
                font: '18px Arial',
                fill: '#FFFFFF',
            }
        });

        let rH_option = 0.075;
        let rH_gapOptions = 0.012;
        let rY_option = 0.33;
        for(let i = 0; i < 5; i++)
        {            
            if(0 < i)
                rY_option += rH_option + rH_gapOptions;
            this.add.image(ww * 0.5, wh * rY_option, 'startPage_b3').setDisplaySize(ww*0.7, wh*rH_option).setOrigin(0.5, 0);
            this.add.image(ww * 0.5, wh * rY_option, 'startPage_b3_pressed').setDisplaySize(ww*0.7, wh*rH_option).setOrigin(0.5, 0);
            this.make.text({
                x: ww * 0.5,
                y: wh * (rY_option + rH_option*0.5),
                text: "My doctor told me it was no longer needed.",
                origin: { x: 0.5, y: 0.5 },
                style: {
                    font: '18px Arial',
                    fill: '#000000',
                }
            });
        }
        let img_submit = this.add.image(ww * 0.5, wh * 0.83, 'startPage_submit').setDisplaySize(ww*0.6, wh*0.1).setOrigin(0.5, 0).setInteractive();     
        img_submit.on('pointerdown', () => { console.log('pointerdown'); });     
        img_submit.on('pointerup', () => { console.log('pointerup'); });     
    }

    ExtraWork()
    {
         /* display mouse position for debugging */
         if(b_Debug)
         {
             phaserText_MousePosition = this.add.text(ww * 0.2, wh * 0.1, "0123456789\n0123456789\n0123456789\n0123456789", {
                 color: '#000000',
                 fontSize:  (ww * 0.03) + 'px'      
             }).setOrigin(0);
 
         }    
    }    
    
    create() 
    {        
        this.GetQAFromJSON();
        this.CreateStartPage();

        this.ExtraWork();
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

    CreateDOMText(str_text, rX, rY)
    {
        let el = document.createElement("div");
        let textNode = document.createTextNode(str_text);
        el.appendChild(textNode);
        document.body.appendChild(el);
        el.style.position = "absolute"; 
        el.style.left = ww * rX + "px";
        el.style.top = wh * rY + "px";
        el.style.width = 200 + "px";
        el.style.height = 100 + "px";
        // el.style.fontSize = 20 + "px";
        // el.style.overflow = "scroll";
    }

    update() 
    {
        if(b_Debug)
        {
            if(wh < ww)
            {
                phaserText_MousePosition.text = "pX: " + this.input.mousePointer.x + 
                                "\t\tpY: " + this.input.mousePointer.y + "\n" +
                                "rX: " + (this.input.mousePointer.x/ww).toFixed(2) + 
                                "\t\trY: " + (this.input.mousePointer.y/wh).toFixed(2);
            }
            else
            {
                phaserText_MousePosition.text = "pX: " + ww + 
                                "\t\tpY: " + wh + "\t\tres: " + window.devicePixelRatio;
            }
            
        }
    }


    
}