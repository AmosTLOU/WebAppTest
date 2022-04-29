class BasePage
{
    constructor(i_name) 
    {      
        this.name = i_name;
        this.elements = new Array();
    }

    ShowAll(i_visibility)
    {  
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
    }
}


class StartPage extends BasePage
{
    constructor() 
    {   
        super("StartPage");
        this.mulSelector = new MultiSelector(false);
    }

    ShowAll(i_visibility)
    {   
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
        this.mulSelector.ShowAll(i_visibility);
    }
}


class StartConversationPage extends BasePage
{
    constructor() 
    {   
        super("StartConversationPage");
    }
}


class QuestionPage extends BasePage
{
    constructor(i_scene) 
    {   
        super("QuestionPage");
        this.scene = i_scene;
        this.mulSelector = new MultiSelector(true);
        this.jsonData = undefined;
        this.GetJSONData();
    }

    GetJSONData()
    {
        let self = this;
        $.ajaxSettings.async = false;
        $.getJSON(pathJSON_hierarchicalQuestions, function(json) 
        {
            self.jsonData = json;  
        });
        $.ajaxSettings.async = true;
    }

    ShowAll(i_visibility)
    {        
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
        if(i_visibility)
            this.SetContentByLayerName("FirstLayer");
        else
            this.mulSelector.ShowAll(i_visibility);
    }

    // i_ln == input layer name
    SetContentByLayerName(i_ln)
    {        
        let layerContent = this.jsonData[i_ln];  
        this.mulSelector.cnt = layerContent.length - 1;
        for(let i = 0; i < layerContent.length; i++)
        {
            if(i == 0)
            {
                for(let j = 0; j < 2; j++)
                {
                    if(j < layerContent[i].length)
                        this.mulSelector.titles[j].text = layerContent[i][j];
                    else
                        this.mulSelector.titles[j].text = "";
                }
            }
            else
            {
                this.mulSelector.visualOptions[i-1][2].text = layerContent[i];
            }                
        }
        this.mulSelector.ShowAll(true);  
    }

    SubmitChoice()
    {        
        let str_choice = undefined;
        let result = this.mulSelector.GetAnswer();
        for(let i = 0; i < result.length; i++)
        {
            if(result[i])
            {
                str_choice = this.mulSelector.visualOptions[i][2].text;
            }
        }
        if(str_choice === undefined)
        {
            alert("please choose a question!");
            return;
        }
        let nextLayerContent = this.jsonData[str_choice];
        if(nextLayerContent === undefined)
            return;
        if(nextLayerContent.length == 1)
            this.scene.ShowPage("SolutionPage");
        else
            this.SetContentByLayerName(str_choice);
    }
}


class ConsultationPage extends BasePage
{
    constructor() 
    {   
        super("ConsultationPage");
        this.dialogueManager = undefined;
        this.qaTypeIn_System = undefined;
        this.textArea = undefined;
    }

    ShowAll(i_visibility)
    {            
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
        this.dialogueManager.ShowAll(i_visibility);
        if(i_visibility)
        {
            this.textArea.disabled = false;
            this.textArea.style.visibility = "visible";
            this.textArea.value = "Type in your questions";
        }
        else
        {
            this.textArea.disabled = true;
            this.textArea.style.visibility = "hidden";            
        }
    }
}


class SolutionPage extends BasePage
{
    constructor() 
    {   
        super("SolutionPage");
        this.solutions = new Array();
    }

    AddSolution(sln)
    {
        this.solutions.push(sln);
    }

    ShowAll(i_visibility)
    {
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
        for(let i = 0; i < this.solutions.length; i++)
            this.solutions[i].ShowAll(i_visibility);
    }
}