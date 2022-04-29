class BasePage
{
    constructor(i_name) 
    {      
        this.name = i_name;
        this.elements = new Array();
        this.visibility = true;
    }

    ShowAll(i_visibility)
    {
        if(this.visibility == i_visibility)
            return;        
        
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;

        this.visibility = i_visibility;
    }

    ChangeVisibility()
    {
        this.ShowAll(!this.visibility);
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
        if(this.visibility == i_visibility)
            return;        
        
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
        this.mulSelector.ShowAll(i_visibility);

        this.visibility = i_visibility;
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
    constructor() 
    {   
        super("QuestionPage");
        this.mulSelector = new MultiSelector(true);
    }

    ShowAll(i_visibility)
    {
        if(this.visibility == i_visibility)
            return;        
        
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
        this.mulSelector.ShowAll(i_visibility);

        this.visibility = i_visibility;
    }
}


class ConsultationPage extends BasePage
{
    constructor() 
    {   
        super("ConsultationPage");
        this.dialogueManager = undefined;
        this.textArea = undefined;
    }

    ShowAll(i_visibility)
    {
        if(this.visibility == i_visibility)
            return;      
            
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
        this.dialogueManager.ShowAll(i_visibility);
        if(i_visibility)
        {
            this.textArea.disabled = false;
            this.textArea.style.visibility = "visible";
        }
        else
        {
            this.textArea.disabled = true;
            this.textArea.style.visibility = "hidden";            
        }

        this.visibility = i_visibility;
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
        if(this.visibility == i_visibility)
            return;        
        
        for(let i = 0; i < this.elements.length; i++)
            this.elements[i].visible = i_visibility;
        for(let i = 0; i < this.solutions.length; i++)
            this.solutions[i].ShowAll(i_visibility);

        this.visibility = i_visibility;
    }
}