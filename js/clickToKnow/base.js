// creat a multi-select manager here

class MultiSelector
{
    constructor(i_maxCnt) 
    {      
        this.selector = new Array();
        this.maxCnt = i_maxCnt;
        for(let i = 0; i < this.maxCnt; i++)
        {
            this.selector.push(false);
        }   
        this.cnt = this.maxCnt;
        this.visibility = true;
        this.visualOptions = new Array();
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
    }

    ShowAll(i_visibility)
    {
        if(this.visibility == i_visibility)
            return;        
        
        for(let i = 0; i < this.visualOptions.length; i++)
        {
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
