class StartPage
{
    constructor() 
    {      
        this.mulSelector = new MultiSelector(5);
        this.elements = new Array();
        this.visibility = true;
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

    ChangeVisibility(i_visibility)
    {
        this.ShowAll(!this.visibility);
    }

}