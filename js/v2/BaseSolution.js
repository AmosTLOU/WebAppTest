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
    }

    ArrangePos()
    {
        let phEl = undefined;

        this.bg.setOrigin(0).setPosition(ww * this.rX, wh * this.rY).setDisplaySize(ww * this.rW, wh * this.rH);
        phEl = this.icon;
        this.icon.setPosition(ww * (this.rX + this.rW*0.15), wh * (this.rY*2 + this.rH)*0.5).setDisplaySize(ww*this.rW*0.2, ww*this.rW*0.2 * phEl.height/phEl.width);

        let gap_rY = this.rH * 0.05;
        this.title1.setFontSize(Math.round(ww*this.rW*0.055) + "px");
        this.title1.setPosition(ww * (this.rX + this.rW*0.3), wh * (this.rY + this.rH*0.1));
        this.title1.setWordWrapWidth(Math.round(ww*this.rW*0.75));

        this.title2.setFontSize(Math.round(ww*this.rW*0.055) + "px");
        this.title2.setFontStyle('bold');
        this.title2.setPosition(ww * (this.rX + this.rW*0.3), wh * ((this.title1.y + this.title1.height)/wh + gap_rY));
        this.title2.setWordWrapWidth(ww*this.rW*0.75);
        
        this.dsp.setFontSize(Math.round(ww*this.rW*0.04) + "px");
        this.dsp.setLineSpacing(Math.round(ww*this.rW*0.015));
        this.dsp.setPosition(ww * (this.rX + this.rW*0.3), wh * ((this.title2.y + this.title2.height)/wh + gap_rY));
        this.dsp.setWordWrapWidth(Math.round(ww*this.rW*0.72));
    }

    ShowAll(i_visibility)
    { 
        this.bg.visible = i_visibility; 
        this.icon.visible = i_visibility; 
        this.title1.visible = i_visibility; 
        this.title2.visible = i_visibility; 
        this.dsp.visible = i_visibility; 
    }
}