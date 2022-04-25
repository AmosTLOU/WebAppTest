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