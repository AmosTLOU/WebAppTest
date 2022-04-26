// creat a multi-select manager here

class MultiSelector
{
    constructor(i_onlyOneChoice) 
    {      
        // made up of true and false
        this.selector = new Array();  
        // storage of titles. Might be multiple, like heading1, heading2, etc.
        this.titles = new Array();
        // storage of the 2 phaser images(pic_unselected, pic_selected) and 1 phaser text(content of the option)
        this.visualOptions = new Array();
        this.maxCnt = 0;
        this.cnt = 0;
        this.onlyOneChoice = i_onlyOneChoice;
        this.visibility = true;        
    }

    ChangeVal(index)
    {
        if(this.cnt <= index)
            return;
        
        if(this.onlyOneChoice)
        {
            if(this.selector[index])
                return;
            this.selector[index] = true;
            this.visualOptions[index][1].visible = true;
            for(let i = 0; i < this.cnt; i++)
            {
                if(i != index)
                {
                    this.selector[i] = false;
                    this.visualOptions[i][1].visible = false;
                }
            }
        }
        else
        {
            this.selector[index] = !this.selector[index];
            this.visualOptions[index][1].visible = !this.visualOptions[index][1].visible;
        }        
    }

    GetVal(index)
    {
        if(this.cnt <= index)
            return undefined;
        
        return this.selector[index];
    }

    GetAnswer()
    {
        let ret = new Array();
        for(let i = 0; i < this.cnt; i++)
        {
            ret.push(this.selector[i]);
        }
        return ret;
    }

    AddVisualOption(bg, fg, txt)
    {
        let el = new Array();
        el.push(bg);
        el.push(fg);
        el.push(txt);
        this.visualOptions.push(el);

        this.selector.push(false);
        this.maxCnt++;
        this.cnt++;
    }

    ShowAll(i_visibility)
    {
        if(this.visibility == i_visibility)
            return;        
        
        for(let i = 0; i < this.visualOptions.length; i++)
        {
            this.selector[i] = false;
            for(let j = 0; j < this.visualOptions[i].length; j++)
            {
                if(this.cnt <= i)
                {
                    this.visualOptions[i][j].visible = false;
                }
                else
                {
                    if(j == 1)
                        this.visualOptions[i][j].visible = false;
                    else
                        this.visualOptions[i][j].visible = i_visibility;
                }                    
            }            
        }
        this.visibility = i_visibility;
    }
}