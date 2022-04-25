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

class BaseSolution
{
    constructor(i_bg, i_icon, i_title1, i_title2, i_dsp, i_rX, i_rY, i_rW, i_rH) 
    {             
        this.bg = i_bg; 
        this.icon = i_icon;
        this.title1 = i_title1;
        this.title2 = i_title2;
        this.dsp = i_dsp;
        this.rX = i_rX;
        this.rY = i_rY;
        this.rW = i_rW;
        this.rH = i_rH;
        this.ArrangePos();
        this.visibility = true;
    }

    ArrangePos()
    {
        this.bg.setOrigin(0).setPosition(ww * this.rX, wh * this.rY).setDisplaySize(ww * this.rW, wh * this.rH);
        this.icon.setPosition(ww * (this.rX + this.rW*0.15), wh * (this.rY*2 + this.rH)*0.5).setDisplaySize(ww * this.rW * 0.2, ww * this.rW * 0.2);

        let gap_rY = this.rH * 0.05;
        this.title1.setFontSize(ww*this.rW*0.055 + "px");
        this.title1.setPosition(ww * (this.rX + this.rW*0.3), wh * (this.rY + this.rH*0.1));
        this.title1.setWordWrapWidth(ww*this.rW*0.75);

        this.title2.setFontSize(ww*this.rW*0.055 + "px");
        this.title2.setFontStyle('bold');
        this.title2.setPosition(ww * (this.rX + this.rW*0.3), wh * ((this.title1.y + this.title1.height)/wh + gap_rY));
        this.title2.setWordWrapWidth(ww*this.rW*0.75);
        
        this.dsp.setFontSize(ww*this.rW*0.04 + "px");
        this.dsp.setPosition(ww * (this.rX + this.rW*0.3), wh * ((this.title2.y + this.title2.height)/wh + gap_rY));
        this.dsp.setWordWrapWidth(ww*this.rW*0.75);
    }

    ShowAll(i_visibility)
    {
        if(this.visibility == i_visibility)
            return;        
        
        this.bg.visible = i_visibility; 
        this.icon.visible = i_visibility; 
        this.title1.visible = i_visibility; 
        this.title2.visible = i_visibility; 
        this.dsp.visible = i_visibility; 

        this.visibility = i_visibility;
    }
}