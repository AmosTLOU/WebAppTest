var b_Debug = true;
var phaserText_MousePosition;

class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
        this.startPage = undefined;
        
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

    CreatePhaserText(rX, rY, text, oX, oY, i_font, i_fill, rH_linSpacing, rW_wordWrap=1)
    {
        let ret = this.make.text
        ({
            x: ww * rX,
            y: wh * rY,
            text: text,
            origin: { x: oX, y: oY },
            style: 
            {
                font: i_font,
                fill: i_fill,
                lineSpacing: wh * rH_linSpacing,
                wordWrap: { width: ww * rW_wordWrap }
            }
        })
        return ret;
    }

    CreateDOMText(rX, rY, text, oX, oY, i_font, i_fill, rH_linSpacing, rW_wordWrap=1)
    {
        let el = document.createElement("p");
        let textNode = document.createTextNode(text);
        el.appendChild(textNode);
        document.body.appendChild(el);
        el.style.position = "absolute"; 
        if(oX == 0)
            el.style.left = ww*rX + "px";
        if(oY == 0)
            el.style.top = wh*rY + "px";
        el.style.font = i_font;
        el.style.color = i_fill;
        el.style.width = 300 + "px";
        el.style.margin = 0 + "px";
        el.style.display = "initial";   // display
        // el.style.display = "none";      // don't display
    }

    CreateStartPage()
    {
        this.startPage = new StartPage();
        // static content
        this.startPage.elements.push(this.add.image(ww * 0.5, wh * 0.5, 'startPage_bg').setDisplaySize(ww, wh));
        this.startPage.elements.push(this.add.image(ww * 0.1, wh * 0.02, 'startPage_back').setDisplaySize(wh*0.06, wh*0.06).setOrigin(0.5, 0));  
        this.startPage.elements.push(this.add.image(ww * 0.5, wh * 0.1, 'startPage_b1').setDisplaySize(ww*0.8, wh*0.7).setOrigin(0.5, 0));
        this.startPage.elements.push(this.add.image(ww * 0.5, wh * 0.1, 'startPage_b2').setDisplaySize(ww*0.8, wh*0.2).setOrigin(0.5, 0));
        this.startPage.elements.push(this.add.image(ww * 0.2, wh * 0.12, 'startPage_avatar').setDisplaySize(wh*0.07, wh*0.07).setOrigin(0.5, 0));
        this.startPage.elements.push( this.CreatePhaserText(0.3, 0.12, "What was the reason for stopping your statin last time?", 
            0, 0, 'bold '+ww*0.047+'px Arial', '#FFFFFF', 0.005, 0.6) );

        // this.CreateDOMText(0.3, 0.12, "What was the reason for stopping your statin last time?", 
        //     0, 0, 'bold '+wh*0.028+'px Arial', '#FFFFFF', 0.005, 0.6);

        this.startPage.elements.push( this.CreatePhaserText(0.3, 0.24, "Please select all that apply", 
            0, 0, ww*0.0325+'px Arial', '#FFFFFF', 0) );
        let img_submit = this.add.image(ww * 0.5, wh * 0.83, 'startPage_submit').setDisplaySize(ww*0.6, wh*0.1).setOrigin(0.5, 0).setInteractive();  
        img_submit.on('pointerup', () => { 
            let result = this.startPage.mulSelector.GetAnswer();
            let str = "";
            for(let i = 0; i < result.length; i++)
            {
                if(0 < i)
                    str += " ";
                str += result[i];
            }
            console.log(str);
            alert(str);
        });  
        this.startPage.elements.push(img_submit);   
        
        // dynamic content
        let rH_option = 0.075;
        let rH_gapOptions = 0.012;
        let rY_option = 0.33;
        for(let i = 0; i < 5; i++)
        {            
            if(0 < i)
                rY_option += rH_option + rH_gapOptions;
            let bg_option = this.add.image(ww * 0.5, wh * rY_option, 'startPage_b3').setDisplaySize(ww*0.7, wh*rH_option).setOrigin(0.5, 0).setInteractive();
            bg_option.on('pointerdown', () => { this.startPage.mulSelector.ChangeVal(i); });  
            let fg_option = this.add.image(ww * 0.5, wh * rY_option, 'startPage_b3_pressed').setDisplaySize(ww*0.7, wh*rH_option).setOrigin(0.5, 0).setInteractive();
            fg_option.visible = false;
            fg_option.on('pointerdown', () => { this.startPage.mulSelector.ChangeVal(i); });    
            let txt_option = this.make.text( this.CreatePhaserText(0.5, (rY_option + rH_option*0.5), "My doctor told me it was no longer needed.", 
                0.5, 0.5,  ww*0.0325+'px Arial', '#000000', 0.005) );    
            this.startPage.mulSelector.AddVisualOption(bg_option, fg_option, txt_option);
        }
    }

    ExtraWork()
    {
        if(b_Debug)
        {
            /* display mouse position for debugging */
            phaserText_MousePosition = this.add.text(ww * 0.5, wh * 0.035, "0123456789\n0123456789\n0123456789\n0123456789", {
                color: '#000000',
                fontSize:  (ww * 0.03) + 'px'      
            }).setOrigin(0.5);

            let img_startPage = this.add.image(ww * 0.1, wh * 0.95, 'startPage_b1').setDisplaySize(wh*0.05, wh*0.05).setInteractive();
            img_startPage.on('pointerdown', () => {});     
            img_startPage.on('pointerup', () => { this.startPage.ChangeVisibility(); });  
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