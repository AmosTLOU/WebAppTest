var b_Debug = true;
var phaserText_MousePosition;

var prevPage = undefined;
var curPage = undefined;

var nameInputField = "inputField_v2";

class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
        this.startPage = undefined;
        this.questionPage = undefined;
        this.solutionPage = undefined;
        this.startConversationPage = undefined;
        this.consultationPage = undefined;
        this.qaSystem = undefined;
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

        // start conversation page
        this.load.image('startConversationPage_bg1', 'assets/MockUp2/StartConverstationPage/StartConverstationPage_BackGround1.png');
        this.load.image('startConversationPage_bg2', 'assets/MockUp2/StartConverstationPage/StartConverstationPage_BackGround2.png');
        this.load.image('startConversationPage_doctorAvatar', 'assets/MockUp2/StartConverstationPage/StartConverstationPage_DoctorPlaceHolder.png');
        this.load.image('startConversationPage_doctorTextBG', 'assets/MockUp2/StartConverstationPage/StartConverstationPage_TextBoard.png');
        this.load.image('startConversationPage_back', 'assets/MockUp2/StartConverstationPage/StartConverstationPage_Back.png');
        this.load.image('startConversationPage_toQuestionPage', 'assets/MockUp2/StartConverstationPage/StartConverstationPage_FindSolutionButton.png');
        this.load.image('startConversationPage_toConsultationPage', 'assets/MockUp2/StartConverstationPage/StartConverstationPage_ConsultationButton.png');

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

        // consultation page
        this.load.image('consultationPage_bg', 'assets/MockUp2/ConsultationPage/ConsultationPage_BackGround.png');
        this.load.image('consultationPage_doctorAvatar', 'assets/MockUp2/ConsultationPage/ConsultationPage_DoctarAvatar_PlaceHolder.png');
        this.load.image('consultationPage_userAvatar', 'assets/MockUp2/ConsultationPage/ConsultationPage_UserAvatar_PlaceHolder.png');
        this.load.image('consultationPage_textBG', 'assets/MockUp2/ConsultationPage/ConsultationPage_TextBoard.png');
        this.load.image('consultationPage_inputFieldBG', 'assets/MockUp2/ConsultationPage/ConsultationPage_InputBoard.png');
        this.load.image('consultationPage_back', 'assets/MockUp2/ConsultationPage/back.png');

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
                wordWrap: { width: ww * rW_wordWrap, useAdvancedWrap: true }
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
            let hasSelected = false;
            for(let i = 0; i < this.startPage.mulSelector.cnt; i++)
            {
                let res = this.startPage.mulSelector.GetVal(i);
                if(res != undefined && res == true)
                    hasSelected  = true;
            }                
            if(hasSelected)
                this.ShowPage("StartConversationPage");
            else
                alert("Please select one or more options that fits!");
        });  
        this.startPage.elements.push(img_submit);   
        
        // dynamic content
        let options = ["My doctor told me it was no longer needed.", "I found some alternatives.",
        "I suffered side effects.", "I was worried about potential side effects.", "Personal reason"]
        let rH_option = 0.075;
        let rH_gapOptions = 0.012;
        let rY_option = 0.33;
        for(let i = 0; i < options.length; i++)
        {            
            if(0 < i)
                rY_option += rH_option + rH_gapOptions;
            let bg_option = this.add.image(ww * 0.5, wh * rY_option, 'startPage_b3').setDisplaySize(ww*0.7, wh*rH_option).setOrigin(0.5, 0).setInteractive();
            bg_option.on('pointerdown', () => { this.startPage.mulSelector.ChangeVal(i); });  
            let fg_option = this.add.image(ww * 0.5, wh * rY_option, 'startPage_b3_pressed').setDisplaySize(ww*0.7, wh*rH_option).setOrigin(0.5, 0).setInteractive();
            fg_option.visible = false;
            fg_option.on('pointerdown', () => { this.startPage.mulSelector.ChangeVal(i); });    
            let txt_option = this.CreatePhaserText(0.5, (rY_option + rH_option*0.5), options[i], 
                0.5, 0.5,  ww*0.0325+'px Arial', '#000000', 0.005);    
            this.startPage.mulSelector.AddVisualOption(bg_option, fg_option, txt_option);
        }
    }

    CreateStartConversationPage()
    {
        this.startConversationPage = new StartConversationPage();
        this.pages.push(this.startConversationPage);
        // static content
        this.startConversationPage.elements.push(this.add.image(ww * 0.5, wh * 0.5, 'startConversationPage_bg1').setDisplaySize(ww, wh));
        this.startConversationPage.elements.push(this.add.image(ww * 0.7, wh * 0.45, 'startConversationPage_doctorAvatar').setDisplaySize(ww*0.5, wh*0.7));
        this.startConversationPage.elements.push(this.add.image(ww * 0.5, wh * 1, 'startConversationPage_bg2').setDisplaySize(ww, wh*0.6).setOrigin(0.5, 1));
        this.startConversationPage.elements.push(this.add.image(ww * 0.05, wh * 0.1, 'startConversationPage_doctorTextBG').setDisplaySize(ww*0.5, wh*0.6).setOrigin(0));
        this.startConversationPage.elements.push( this.CreatePhaserText(0.1, 0.15, "Hi [First Name]! I am Sam, a virtual cardiac risk coach. I am sorry to hear that... The good news is ...", 0, 0, ww*0.04+'px Arial', '#000000', 0.01, 0.42) );
        // back button
        let img_back = this.add.image(ww * 0.05, wh * 0.02, 'startConversationPage_back').setDisplaySize(ww*0.1, ww*0.1).setOrigin(0).setInteractive();
        this.startConversationPage.elements.push(img_back);
        img_back.on('pointerup', () => { this.ShowPage("StartPage"); }); 
        // toQuestionPage button
        let img_toQuestonPage = this.add.image(ww * 0.5, wh * 0.78, 'startConversationPage_toQuestionPage').setDisplaySize(ww*0.6, ww*0.15).setInteractive();
        this.startConversationPage.elements.push(img_toQuestonPage);
        img_toQuestonPage.on('pointerup', () => { this.ShowPage("QuestionPage"); }); 
        // toConsultationPage button
        let img_toConsultationPage = this.add.image(ww * 0.5, wh * 0.9, 'startConversationPage_toConsultationPage').setDisplaySize(ww*0.6, ww*0.15).setInteractive();
        this.startConversationPage.elements.push(img_toConsultationPage);
        img_toConsultationPage.on('pointerup', () => { this.ShowPage("ConsultationPage"); }); 
    }

    CreateQuestionPage()
    {
        this.questionPage = new QuestionPage();
        this.pages.push(this.questionPage);
        // static content
        this.questionPage.elements.push(this.add.image(ww * 0.5, wh * 0.5, 'questionPage_bg').setDisplaySize(ww, wh));    
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
        // back button
        let img_back = this.add.image(ww * 0.1, wh * 0.02, 'questionPage_back').setDisplaySize(wh*0.06, wh*0.06).setOrigin(0.5, 0).setInteractive();
        this.questionPage.elements.push(img_back);  
        img_back.on('pointerup', () => { this.ShowPage("StartConversationPage"); });
        // submit buttion
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
            // alert(str);
            this.ShowPage("SolutionPage");
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

    WheelResponse(event) 
    {
        if(curPage == "ConsultationPage")
        {
            let rOffset = 0.02;
            if(0 < event.deltaY)
                rOffset = -rOffset;
            this.consultationPage.dialogueManager.Scroll(rOffset); 
        }           
    }

    CreateDOMInputField()
    {
        let text_prompt = "Type in your questions";
        let el = document.getElementById(nameInputField);

        el.style.position = "absolute"
        el.style.top = wh * 0.82 + "px";
        el.style.left = ww * 0.28 + "px";
        // Padding is used to create buffer area between the text and the edge.
        // But after adding padding, the actual w and h of the text area would become the sum of width and padding/height of padding,
        // So we need to substract the padding from width and height first.
        let p_padding = 10;
        el.style.width = ww * rW_box*0.8 - 2*p_padding + "px";
        el.style.height = 50 - 2*p_padding + "px";
        
        el.style.paddingTop =  p_padding + "px";
        el.style.paddingBottom =  p_padding + "px";
        el.style.paddingLeft =  p_padding + "px";
        el.style.paddingRight =  p_padding + "px";

        el.style.borderRadius = wh * 0.015 + "px";
        el.style.fontSize = wh * 0.03 + "px";
        el.style.lineHeight = wh * 0.03 + "px";        
        el.value = text_prompt;

        // el.onchange = function(){ scene_self.RaiseQuestion(nameInputField); };
        el.onfocus = function()
        { 
            if(el.value === text_prompt)
                el.value = ""; 
        };
        // el.oninput = () => console.log(el.value);
        // el.onmouseout = () => el.blur();
        let scene = this;
        el.onkeydown = function(event)
        {             
            // console.log(event.key);
            if(event.key == "Enter")
            {                    
                event.preventDefault();
                scene.qaSystem.RaiseQuestion();
            }
        };
        return el;
    }

    CreateConsultationPage()
    {
        this.consultationPage = new ConsultationPage();
        this.qaSystem = new QASystem(this);
        this.consultationPage.dialogueManager = new DialogueManager(this, 'consultationPage_doctorAvatar', 'consultationPage_userAvatar', 'consultationPage_textBG');
        this.pages.push(this.consultationPage);
        // static
        this.consultationPage.elements.push(this.add.image(ww * 0.5, wh * 0.5, 'consultationPage_bg').setDisplaySize(ww, wh));
        this.consultationPage.elements.push(this.add.image(ww * 0.5, wh * 0.85, 'consultationPage_inputFieldBG').setDisplaySize(ww*0.6, ww*0.1));
        // this.consultationPage.elements.push(this.CreatePhaserText(0.5, 0.85, "Type in your questions", 
        // 0.5, 0.5, ww*0.035+'px Arial', '#000000', 0.005, 0.4));

        // back button
        let img_back = this.add.image(ww * 0.05, wh * 0.02, 'consultationPage_back').setDisplaySize(ww*0.1, ww*0.1).setOrigin(0).setInteractive();
        this.consultationPage.elements.push(img_back);
        img_back.on('pointerup', () => { this.ShowPage("StartConversationPage"); });
        // submit button
        let img_submit = this.add.image(ww * 0.92, wh * 0.89, 'questionPage_submit').setDisplaySize(ww*0.12, ww*0.12).setOrigin(0.5, 1).setInteractive();
        this.consultationPage.elements.push(img_submit);
        img_submit.on('pointerup', () => { this.ShowPage("SolutionPage"); });
        

        // for(let i = 1; i <= 7; i++)
        // {
        //     let side = (i&1) == 1 ? 'L' : 'R';
        //     this.consultationPage.dialogueManager.Push(side, "Dialogue" + i);
        // }
        this.consultationPage.dialogueManager.Push("l", "Do you have any question about Statins?");
        this.consultationPage.dialogueManager.ResetDlgPos();

        // phaser built-in wheel is not working, have to use js built-in wheel instead
        let scene = this;
        window.onwheel = function(event){ scene.WheelResponse(event); };

        this.consultationPage.textArea = this.CreateDOMInputField();
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
        this.solutionPage.elements.push(this.CreatePhaserText(0.1, 0.07, "Based on your prior statin experience and stated perferences. Here are your top treatment options.", 
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

        let img_back = this.add.image(ww * 0.92, wh * 0.89, 'solutionPage_back').setDisplaySize(ww*0.12, ww*0.12).setOrigin(0.5, 1).setInteractive();
        this.solutionPage.elements.push(img_back);
        img_back.on('pointerup', () => {
            if(prevPage != undefined)
                this.ShowPage(prevPage); 
        });
    }
    

    // ShowPage(index)
    // {
    //     if(index == -1)
    //     {
    //         for(let i = 0; i < this.pages.length; i++)
    //             this.pages[i].ShowAll(false);
    //         return;
    //     }

    //     if(this.pages.length <= index)
    //         return;
    //     for(let i = 0; i < this.pages.length; i++)
    //     {
    //         if(i == index)
    //             this.pages[i].ShowAll(true);
    //         else
    //             this.pages[i].ShowAll(false);
    //     }
    // }

    ShowPage(i_name)
    {
        prevPage = curPage;
        curPage = undefined;
        for(let i = 0; i < this.pages.length; i++)
        {
            if(this.pages[i].name == i_name)
            {
                this.pages[i].ShowAll(true);
                curPage = i_name;
            }                
            else
            {
                this.pages[i].ShowAll(false);
            }                
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

            // let img_startPage = this.add.image(ww * 0.3, wh * 0.07, 'startPage_b1').setDisplaySize(wh*0.025, wh*0.025).setInteractive(); 
            // img_startPage.on('pointerup', () => { this.ShowPage(0); });  

            // let img_questionPage = this.add.image(ww * 0.4, wh * 0.07, 'questionPage_b1').setDisplaySize(wh*0.025, wh*0.025).setInteractive();
            // img_questionPage.on('pointerup', () => { this.ShowPage(1); });  

            // let img_solutionPage = this.add.image(ww * 0.5, wh * 0.07, 'solutionPage_bg1').setDisplaySize(wh*0.025, wh*0.025).setInteractive();
            // img_solutionPage.on('pointerup', () => { this.ShowPage(2); });  
        }    
         
    }    
    
    create() 
    {                
        this.CreateStartPage();
        this.CreateStartConversationPage();
        this.CreateQuestionPage();
        this.CreateConsultationPage();
        this.CreateSolutionPage();        
        this.ExtraWork();

        this.ShowPage("StartPage");
        // this.ShowPage("QuestionPage");
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
        if(window.innerHeight < window.innerWidth)
        {
            if(b_Debug)
            {
                phaserText_MousePosition.text = "pX: " + this.input.mousePointer.x + 
                            "\t\tpY: " + this.input.mousePointer.y + "\n" +
                            "rX: " + (this.input.mousePointer.x/ww).toFixed(2) + 
                            "\t\trY: " + (this.input.mousePointer.y/wh).toFixed(2);
            }
            this.ShowPage("nothing");
            alert("Please access this website in potrait mode!");
        }
        else
        {
            if(b_Debug)
            {
                // phaserText_MousePosition.text = "pX: " + ww + 
                //             "\t\tpY: " + wh + "\t\tres: " + window.devicePixelRatio;
                phaserText_MousePosition.text = "pX: " + this.input.mousePointer.x + 
                            "\t\tpY: " + this.input.mousePointer.y + "\n" +
                            "rX: " + (this.input.mousePointer.x/ww).toFixed(2) + 
                            "\t\trY: " + (this.input.mousePointer.y/wh).toFixed(2);
            }            
        }
    }


    
}