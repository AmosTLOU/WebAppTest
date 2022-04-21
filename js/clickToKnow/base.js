// creat a multi-select manager here

class MultiSelector
{
    constructor() 
    {      
        this.selector = new Array();
        this.visualOptions = new Array();
        this.maxCnt = 0;
        this.cnt = 0;
        this.visibility = true;        
    }

    ChangeVal(index)
    {
        if(this.cnt <= index)
            return;
        
        this.selector[index] = !this.selector[index];
        this.visualOptions[index][1].visible = !this.visualOptions[index][1].visible
    }

    GetVal(index)
    {
        if(cnt <= index)
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
