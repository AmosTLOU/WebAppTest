class ConMsg  // conversation message  includes phaser text and phaser image(bg)
{
    constructor(i_phaserText, i_phaserImg, i_side) 
    {
        this.rX = undefined;
        this.rY = undefined;

        this.txt = i_phaserText;
        this.txt.visible = true;
        this.bg = i_phaserImg;
        this.bg.visible = false;
        this.side = i_side;        

        this.padding_rX = 0.01;
        this.padding_rY = 0.01;
        this.padding_pX = this.padding_rX * ww;        
        this.padding_pY = this.padding_rY * wh;

        this.rW_bg = 0.22;
        this.rH_bg = 0.1;
        if(this.side == 1)
            this.rH_bg = 0.05;
        this.pW_bg = this.rW_bg * ww;
        this.pH_bg = this.rH_bg * wh;

        this.rX_rightBoundary = 1;
        this.rX_leftBoundary = 0.5;
        this.rY_topBoundary = 0.1;
        this.rY_bottomBoundary = 0.55;

        this.bg.setDisplaySize(this.pW_bg, this.pH_bg); 
        

        this.per_TopY = 0.1;
        this.per_BottomY = 0.55;
    }

    RX()
    {
        return this.rX;
    }

    RY()
    {
        return this.rY;
    }    

    // return pixel height of background image
    pH()
    {
        return this.pH_bg;
    }

    // return ratio height of background image
    rH()
    {
        return this.rH_bg;
    }

    Enable() 
    {
        this.txt.visible = true;
        // this.bg.visible = true;        
    }

    // updatePosY(per_y)
    // {
    //     this.txt.setY(wh * per_y);
    //     this.bg.setY(wh * per_y);
    // }

    UpdatePos(i_rY)
    {
        this.rY = i_rY;
        if(this.side == 0)
        {
            this.rX = this.rX_leftBoundary * ww;
        }
        else if(this.side == 1)
        {
            this.rX = this.rX_rightBoundary * ww - this.pW_bg;
        }      
            
        let pY = this.rY * wh;
        this.txt.setX(this.rX + this.padding_pX);
        this.txt.setY(pY + this.padding_pY);        

        this.bg.setX(this.rX + this.pW_bg * 0.5);
        this.bg.setY(pY + this.pH_bg * 0.5);

        if(this.rY < 0 || 0.6 < this.rY)
            this.hide();
        else
            this.Enable();
    }

    hide()
    {
        this.txt.visible = false;
        // this.bg.visible = false;
    }

    // return -1 reach top;  1 reach bottom;  0 inbetween
    translate(rOffset)
    {
        this.UpdatePos(this.rY + rOffset);
        return 0;
    }

    inVisibleRange()
    {        
        let perY = this.txt.y/wh;
        if( this.per_TopY <= perY && perY <= this.per_BottomY )
            return true;
        else
            return false;
        
    }

    inTopRange()
    {
        let perY = this.txt.y/wh;
        let biasPercent = 0.2
        if( this.per_TopY*(1-biasPercent) <= perY && perY <= this.per_TopY*(1+biasPercent) )
            return true;
        else
            return false;
    }

    inBottomRange()
    {
        let perY = this.txt.y/wh;
        let biasPercent = 0.1
        if( this.per_BottomY*(1-biasPercent) <= perY && perY <= this.per_BottomY*(1+biasPercent) )
            return true;
        else
            return false;
    }
}

// conversation manager
class ConManager 
{
    constructor() 
    {
        this.MsgHistory = new Array();
        // ww = window.innerWidth;
        // wh = window.innerHeight;

        this.rX_rightBoundary = 0.8;
        this.rX_leftBoundary = 0.5;
        this.rY_topBoundary = 0.1;
        this.rY_bottomBoundary = 0.45;
    }

    CountMsg()
    {
        return this.MsgHistory.length;
    }

    addMsg(conMsg)
    {
        this.MsgHistory[this.MsgHistory.length] = conMsg;
        this.UpdateMsgPos();
    }

    EnableAllMsg()
    {
        for(let i = this.MsgHistory.length-1; 0 <= i ; i--)
        {         
            this.MsgHistory[i].Enable();
        }
    }

    UpdateMsgPos()
    {
        let bottomY = 0.55;
        let per_y = bottomY;
        for(let i = this.MsgHistory.length-1; 0 <= i ; i--)
        {         
            let rH = this.MsgHistory[i].rH();
            let rY = per_y - rH;
            this.MsgHistory[i].UpdatePos(rY);
            per_y -= 0.13;
        }

        // if(this.MsgHistory[0].inVisibleRange())
        // {
        //     per_y = 0.1;
        //     for(let i = 0; i < this.MsgHistory.length ; i++)
        //     {         
        //         this.MsgHistory[i].updatePosY(per_y);
        //         per_y += 0.075;
        //     }
        // }
    }

    hide()
    {
        for(let i = 0; i < this.MsgHistory.length; i++)
        {
            this.MsgHistory[i].hide();
        }
    }

    ableToScroll(rOffset)
    {        
        let indFinalMsg = this.MsgHistory.length-1;
        // no matter offset is positive or negative, if the first and the last one are both visible, then don't allow scrolling
        if(this.MsgHistory[0].inVisibleRange() && this.MsgHistory[indFinalMsg].inVisibleRange())
            return false;
        // when move up, the last one couldn't move above the bottom range
        if(rOffset < 0)
        {      
            let prospective_rY_lastOne = this.MsgHistory[indFinalMsg].RY() + rOffset;
            if(prospective_rY_lastOne < this.rY_bottomBoundary)
            {
                console.log("Bottom msg cannot move up anymore");
                return false;
            }                
        }
        // when move down, the first one couldn't move below the top range
        else if(0 < rOffset)
        {            
            if(this.MsgHistory[0].inTopRange())
            {
                console.log("Top msg cannot move down anymore");
                return false;
            }
                
        }
        return true;
    }

    scroll(rOffset)
    {
        if(this.MsgHistory.length <= 0 || !this.ableToScroll(rOffset))
        {            
            return;
        }            

        for(let i = this.MsgHistory.length-1; 0 <= i ; i--)
        {
            let result = this.MsgHistory[i].translate(rOffset);
            // if(result != 0)
            // {
            //     console.log("Dialogue can't move anymore!");
            //     break;
            // }
                
        }
    }

    test()
    {
        console.log("test");
    }
}