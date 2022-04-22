var b_Debug = true;
var phaserText_MousePosition;

class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
        this.startPage = undefined;
        this.questionPage = undefined;
        this.solutionPage = undefined;
        this.startConversationPage = undefined;
        this.pages = new Array();
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

        // question page
        this.load.image('questionPage_bg', 'assets/MockUp2/QuestionPage/QuestionPage_BackGround.png');
        this.load.image('questionPage_b1', 'assets/MockUp2/QuestionPage/QuestionPage_QuestionBoard1.png');
        this.load.image('questionPage_b2', 'assets/MockUp2/QuestionPage/QuestionPage_QuestionBoard2.png');
        this.load.image('questionPage_b3', 'assets/MockUp2/QuestionPage/QuestionPage_ChoiceBoard.png');
        this.load.image('questionPage_b3_pressed', 'assets/MockUp2/QuestionPage/QuestionPage_ChoiceBoard_pressed.png');
        this.load.image('questionPage_submit', 'assets/MockUp2/QuestionPage/QuestionPage_NextButton.png');
        this.load.image('questionPage_doctorTextBG', 'assets/MockUp2/QuestionPage/QuestionPage_TextBoard.png');
        this.load.image('questionPage_userAvatar', 'assets/MockUp2/QuestionPage/QuestionPage_UserAvatar_PlaceHolder.png');
        this.load.image('questionPage_doctorAvatar', 'assets/MockUp2/QuestionPage/QuestionPage_DoctorAvatar_PlaceHolder.png');
        this.load.image('questionPage_back', 'assets/MockUp2/QuestionPage/back.png'); 

        // solution page
        this.load.image('solutionPage_bg1', 'assets/MockUp2/SolutionPage/SolutionPage_BackGround1.png');
        this.load.image('solutionPage_bg2', 'assets/MockUp2/SolutionPage/SolutionPage_BackGround2.png');
        this.load.image('solutionPage_b1', 'assets/MockUp2/SolutionPage/SolutionPage_ContentBoard.png');
        this.load.image('solutionPage_doctorAvatar', 'assets/MockUp2/SolutionPage/SolutionPage_DoctorAvatar_PlaceHolder.png');
        this.load.image('solutionPage_icon1', 'assets/MockUp2/SolutionPage/SolutionPage_Icon_placeholder1.png');
        this.load.image('solutionPage_icon2', 'assets/MockUp2/SolutionPage/SolutionPage_Icon_placeholder2.png');
        this.load.image('solutionPage_icon3', 'assets/MockUp2/SolutionPage/SolutionPage_Icon_placeholder3.png');
        this.load.image('solutionPage_back', 'assets/MockUp2/SolutionPage/SolutionPage_ReturnButton.png');
        this.load.image('solutionPage_doctorTextBG', 'assets/MockUp2/SolutionPage/SolutionPage_TextBoard.png');
        this.load.image('solutionPage_solutionBG', 'assets/MockUp2/SolutionPage/SolutionPage_SolutionBoard.png');
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

    // CreatePhaserText(text)
    // {
    //     let ret = this.make.text
    //     ({
    //         x: 0,
    //         y: 0,
    //         text: text,
    //         style: 
    //         {
    //             fill: '#000000',
    //         }
    //     })
    //     return ret;
    // }

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
        this.pages.push(this.startPage);
        // static content
        this.startPage.elements.push(this.add.image(ww * 0.5, wh * 0.5, 'startPage_bg').setDisplaySize(ww, wh));
        this.startPage.elements.push(this.add.image(ww * 0.1, wh * 0.02, 'startPage_back').setDisplaySize(wh*0.06, wh*0.06).setOrigin(0.5, 0));  
        this.startPage.elements.push(this.add.image(ww * 0.5, wh * 0.1, 'startPage_b1').setDisplaySize(ww*0.8, wh*0.7).setOrigin(0.5, 0));
        this.startPage.elements.push(this.add.image(ww * 0.5, wh * 0.1, 'startPage_b2').setDisplaySize(ww*0.8, wh*0.2).setOrigin(0.5, 0));
        this.startPage.elements.push(this.add.image(ww * 0.2, wh * 0.12, 'startPage_avatar').setDisplaySize(ww*0.1, ww*0.1).setOrigin(0.5, 0));
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
            let txt_option = this.CreatePhaserText(0.5, (rY_option + rH_option*0.5), "My doctor told me it was no longer needed.", 
                0.5, 0.5,  ww*0.0325+'px Arial', '#000000', 0.005);    
            this.startPage.mulSelector.AddVisualOption(bg_option, fg_option, txt_option);
        }
    }


    CreateQuestionPage()
    {
        this.questionPage = new QuestionPage();
        this.pages.push(this.questionPage);
        // static content
        this.questionPage.elements.push(this.add.image(ww * 0.5, wh * 0.5, 'questionPage_bg').setDisplaySize(ww, wh));
        this.questionPage.elements.push(this.add.image(ww * 0.1, wh * 0.02, 'questionPage_back').setDisplaySize(wh*0.06, wh*0.06).setOrigin(0.5, 0));  
        this.questionPage.elements.push(this.add.image(ww * 0.5, wh * 0.1, 'questionPage_b1').setDisplaySize(ww*0.8, wh*0.7).setOrigin(0.5, 0));
        this.questionPage.elements.push(this.add.image(ww * 0.5, wh * 0.1, 'questionPage_b2').setDisplaySize(ww*0.8, wh*0.2).setOrigin(0.5, 0));
        this.questionPage.elements.push(this.add.image(ww * 0.2, wh * 0.12, 'questionPage_userAvatar').setDisplaySize(ww*0.1, ww*0.1).setOrigin(0.5, 0));
        this.questionPage.elements.push( this.CreatePhaserText(0.3, 0.12, "Statin medications are effective in reducing the risk of heart disease and stroke.", 
            0, 0, 'bold '+ww*0.04+'px Arial', '#FFFFFF', 0.005, 0.58) );
        this.questionPage.elements.push( this.CreatePhaserText(0.5, 0.23, "Please indicate how you agree with the above statement.", 
            0.5, 0, ww*0.0325+'px Arial', '#FFFFFF', 0, 0.7) );
        this.questionPage.elements.push(this.add.image(ww * 0.02, wh * 0.9, 'questionPage_doctorAvatar').setDisplaySize(ww*0.2, ww*0.2).setOrigin(0, 0.5));
        this.questionPage.elements.push(this.add.image(ww * 0.25, wh * 0.9, 'questionPage_doctorTextBG').setDisplaySize(ww*0.4, wh*0.1).setOrigin(0, 0.5));
        this.questionPage.elements.push( this.CreatePhaserText(0.27, 0.87, "How are you today?", 
            0, 0, 'bold '+ww*0.03+'px Arial', '#000000', 0.005, 0.4) );
        let img_submit = this.add.image(ww * 0.9, wh * 0.9, 'questionPage_submit').setDisplaySize(ww*0.2, ww*0.2).setOrigin(1, 0.5).setInteractive();  
        img_submit.on('pointerup', () => { 
            let result = this.questionPage.mulSelector.GetAnswer();
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
        this.questionPage.elements.push(img_submit);   


        // dynamic content
        let rH_option = 0.075;
        let rH_gapOptions = 0.012;
        let rY_option = 0.33;
        let TextOfOptions = [
            "Totally agree",
            "Agree",
            "Neutral",
            "Disagree",
            "Totally disagree"
        ]
        for(let i = 0; i < TextOfOptions.length; i++)
        {            
            if(0 < i)
                rY_option += rH_option + rH_gapOptions;
            let bg_option = this.add.image(ww * 0.5, wh * rY_option, 'questionPage_b3').setDisplaySize(ww*0.7, wh*rH_option).setOrigin(0.5, 0).setInteractive();
            bg_option.on('pointerdown', () => { this.questionPage.mulSelector.ChangeVal(i); });  
            let fg_option = this.add.image(ww * 0.5, wh * rY_option, 'questionPage_b3_pressed').setDisplaySize(ww*0.7, wh*rH_option).setOrigin(0.5, 0).setInteractive();
            fg_option.visible = false;
            fg_option.on('pointerdown', () => { this.questionPage.mulSelector.ChangeVal(i); });    
            let txt_option = this.CreatePhaserText(0.5, (rY_option + rH_option*0.5), TextOfOptions[i], 
                0.5, 0.5,  ww*0.0325+'px Arial', '#000000', 0.005);    
            this.questionPage.mulSelector.AddVisualOption(bg_option, fg_option, txt_option);
        }
    }

    CreateSolutionPage()
    {
        this.solutionPage = new SolutionPage();
        this.pages.push(this.solutionPage);
        // static content
        this.solutionPage.elements.push(this.add.image(ww * 0.5, wh * 0.5, 'solutionPage_bg1').setDisplaySize(ww, wh));
        this.solutionPage.elements.push(this.add.image(ww * 0.98, wh * 0.02, 'solutionPage_doctorAvatar').setDisplaySize(ww*0.6, wh*0.8).setOrigin(1, 0));
        this.solutionPage.elements.push(this.add.image(ww * 0.5, wh * 1, 'solutionPage_bg2').setDisplaySize(ww, wh*0.6).setOrigin(0.5, 1));
        this.solutionPage.elements.push(this.add.image(ww * 0.45, wh * 0.95, 'solutionPage_b1').setDisplaySize(ww*0.8, wh*0.65).setOrigin(0.5, 1));
        this.solutionPage.elements.push(this.add.image(ww * 0.3, wh * 0.05, 'solutionPage_doctorTextBG').setDisplaySize(ww*0.5, wh*0.2).setOrigin(0.5, 0));
        this.solutionPage.elements.push( this.CreatePhaserText(0.1, 0.07, "Based on your prior statin experience and stated perferences. Here are your top treatment options.", 
            0, 0, 'bold '+ww*0.036+'px Arial', '#000000', 0.005, 0.4) );

        
        this.solutionPage.AddSolution(new BaseSolution(
            this.add.image(0, 0, 'solutionPage_solutionBG'),
            this.add.image(0, 0, 'solutionPage_icon1'),
            this.make.text({x: 0, y: 0, text: "LOWEST CARDIAC RISK", style:{ fill: '#000000'}}),
            this.make.text({x: 0, y: 0, text: "Rosuvastatin 40 mg", style:{ fill: '#000000'}}),
            this.make.text({x: 0, y: 0, text: "Switch from Atorvastatin to Rosuvastatin.", style:{ fill: '#000000'}}),
            0.1,
            0.32,
            0.7,
            0.18
        ));
        this.solutionPage.AddSolution(new BaseSolution(
            this.add.image(0, 0, 'solutionPage_solutionBG'),
            this.add.image(0, 0, 'solutionPage_icon2'),
            this.make.text({x: 0, y: 0, text: "LOWEST SIDE RISK", style:{ fill: '#000000'}}),
            this.make.text({x: 0, y: 0, text: "Rosuvastatin 20 mg every day", style:{ fill: '#000000'}}),
            this.make.text({x: 0, y: 0, text: "Switch to Rosuvastatin, lower the dose and decrease the frequency.", style:{ fill: '#000000'}}),
            0.1,
            0.52,
            0.7,
            0.18
        ));
        this.solutionPage.AddSolution(new BaseSolution(
            this.add.image(0, 0, 'solutionPage_solutionBG'),
            this.add.image(0, 0, 'solutionPage_icon3'),
            this.make.text({x: 0, y: 0, text: "LOWEST COST", style:{ fill: '#000000'}}),
            this.make.text({x: 0, y: 0, text: "Atorvastatin 20 mg", style:{ fill: '#000000'}}),
            this.make.text({x: 0, y: 0, text: "Continue to use Atorvastatin but cut the dose in half.\nUse one half a tabley every day.", style:{ fill: '#000000'}}),
            0.1,
            0.72,
            0.7,
            0.18
        ));

        this.solutionPage.elements.push(this.add.image(ww * 0.92, wh * 0.9, 'solutionPage_back').setDisplaySize(ww*0.12, ww*0.12).setOrigin(0.5, 1));
    }

    CreateStartConversationPage()
    {

    }

    ShowPage(index)
    {
        if(index == -1)
        {
            for(let i = 0; i < this.pages.length; i++)
                this.pages[i].ShowAll(false);
            return;
        }

        if(this.pages.length <= index)
            return;
        for(let i = 0; i < this.pages.length; i++)
        {
            if(i == index)
                this.pages[i].ShowAll(true);
            else
                this.pages[i].ShowAll(false);
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

            let img_startPage = this.add.image(ww * 0.3, wh * 0.07, 'startPage_b1').setDisplaySize(wh*0.025, wh*0.025).setInteractive(); 
            img_startPage.on('pointerup', () => { this.ShowPage(0); });  

            let img_questionPage = this.add.image(ww * 0.4, wh * 0.07, 'questionPage_b1').setDisplaySize(wh*0.025, wh*0.025).setInteractive();
            img_questionPage.on('pointerup', () => { this.ShowPage(1); });  

            let img_solutionPage = this.add.image(ww * 0.5, wh * 0.07, 'solutionPage_bg1').setDisplaySize(wh*0.025, wh*0.025).setInteractive();
            img_solutionPage.on('pointerup', () => { this.ShowPage(2); });  
        }    
         
    }    
    
    create() 
    {        
        this.GetQAFromJSON();
        this.CreateStartPage();
        this.CreateQuestionPage();
        this.CreateSolutionPage();
        this.CreateStartConversationPage();
        this.ExtraWork();
        
        this.ShowPage(0);
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
            if(window.innerHeight < window.innerWidth)
            {
                phaserText_MousePosition.text = "pX: " + this.input.mousePointer.x + 
                                "\t\tpY: " + this.input.mousePointer.y + "\n" +
                                "rX: " + (this.input.mousePointer.x/ww).toFixed(2) + 
                                "\t\trY: " + (this.input.mousePointer.y/wh).toFixed(2);
                this.ShowPage(-1);
                alert("Please access this website in potrait mode!");
            }
            else
            {
                phaserText_MousePosition.text = "pX: " + ww + 
                                "\t\tpY: " + wh + "\t\tres: " + window.devicePixelRatio;
            }
            
        }
    }


    
}