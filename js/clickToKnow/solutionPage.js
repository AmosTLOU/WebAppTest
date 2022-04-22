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