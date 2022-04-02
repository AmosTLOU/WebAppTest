var rX_rightBnd = 0.9;
var rX_leftBnd = 0.5;
var rY_topBnd = 0.05;
var rY_bottomBnd = 0.64;
var padding_rX = 0.01;
var padding_rY = 0.01;
var padding_pX = padding_rX * ww;        
var padding_pY = padding_rY * wh;
var gapBetweenMsg_rY = 0.03;
var pW_OriginalMsgBg = undefined;
var pH_OriginalMsgBg = undefined;

// Conversation Message, including phaser text and phaser image(bg)
class ConMsg
{
    constructor(i_phaserText, i_phaserImg, i_side) 
    {      
        this.txt = i_phaserText;
        this.bg = i_phaserImg;
        this.side = i_side;   
             
        this.pW = this.txt.width + padding_pX;
        this.pH = this.txt.height + padding_pY;
        this.rW = this.pW/ww;
        this.rH = this.pH/wh;
        this.bg.setDisplaySize(this.pW, this.pH); 

        this.rX_left = undefined;
        if(this.side == 0)
        {
            this.rX_left = rX_leftBnd;
        }
        else if(this.side == 1)
        {
            this.rX_left = rX_rightBnd - this.rW;
        }   
        this.rY_Top = undefined;              
    }

    RY_Top()
    {
        return this.rY_Top;
    }    

    RH()
    {
        return this.rH;
    }

    Show(is_visible) 
    {
        this.txt.visible = is_visible;
        this.bg.visible = is_visible;        
    }

    UpdatePosByTopY(i_rY)
    {
        this.rY_Top = i_rY;
        
        let pX_center = this.rX_left * ww + this.pW * 0.5;
        let pY_center = this.rY_Top * wh + this.pH * 0.5;
        this.txt.setPosition(pX_center, pY_center).setOrigin(0.5);
        this.bg.setPosition(pX_center, pY_center);

        if(this.rY_Top + this.rH < rY_topBnd || rY_bottomBnd < this.rY_Top)
        {
            this.Show(false);
        }
        else
        {
            this.Show(true);
            let pH_remaining_bg = wh;
            let pH_remaining_txt = wh;
            let ratio_OrginialToDisplay = pH_OriginalMsgBg / this.pH;
            // if a part of the bottom is out of the box
            if(rY_bottomBnd < this.rY_Top + this.rH)
            {                
                let pH_intermediate = wh * (rY_bottomBnd - this.rY_Top);
                pH_remaining_bg = pH_intermediate * ratio_OrginialToDisplay;
                pH_remaining_txt = pH_intermediate - padding_pY;
            }
            this.bg.setCrop(0, 0, ww, pH_remaining_bg);
            this.txt.setCrop(0, 0, ww, pH_remaining_txt);
        }
        
        // console.log(pX_center + "  " + pY_center);
    }

    Translate(rOffset)
    {
        this.UpdatePosByTopY(this.rY_Top + rOffset);
    }

    IsVisibleInBox()
    {        
        return (rY_topBnd <= this.rY_Top) || (this.rY_Top + this.rH <= rY_bottomBnd);
    }

    IsEntirelyVisibleInBox()
    {
        return (rY_topBnd <= this.rY_Top) && (this.rY_Top + this.rH <= rY_bottomBnd);
    }
}


// Conversation Manager, charge of Conversation Message
class ConManager 
{
    constructor() 
    {
        this.ArrMsg = new Array();
    }

    MsgCount()
    {
        return this.ArrMsg.length;
    }

    AddMsg(conMsg)
    {
        this.ArrMsg[this.ArrMsg.length] = conMsg;
    }

    ShowAllMsg(is_visible)
    {
        this.UpdateAllMsgPos();
        for(let i = this.ArrMsg.length-1; 0 <= i ; i--)
        {         
            this.ArrMsg[i].Show(is_visible);
        }        
    }

    UpdateAllMsgPos()
    {
        console.log("Enter UpdateAllMsgPos function");
        // The purpose of adding gapBetweenMsg_rY here is to make the RY of the bottom Message correct
        let rY = rY_bottomBnd + gapBetweenMsg_rY;
        let StartPlacingByFirstOne = false;
        for(let i = this.ArrMsg.length-1; 0 <= i ; i--)
        {         
            rY = rY - gapBetweenMsg_rY - this.ArrMsg[i].RH();
            this.ArrMsg[i].UpdatePosByTopY(rY);
            if(i == 0 && this.ArrMsg[i].IsEntirelyVisibleInBox())
            {
                StartPlacingByFirstOne = true;
                break;
            }
        }

        if(StartPlacingByFirstOne)
        {
            // The purpose of substracting ... (same as the above one)
            rY = rY_topBnd - gapBetweenMsg_rY;
            for(let i = 0; i < this.ArrMsg.length ; i++)
            {         
                rY += gapBetweenMsg_rY;
                this.ArrMsg[i].UpdatePosByTopY(rY);
                rY += this.ArrMsg[i].RH();
            }
        }
    }


    CanScroll(rOffset)
    {        
        if(this.ArrMsg.length <= 0)
            return false;

        let IsEntireVisible_FirstOne = this.ArrMsg[0].IsEntirelyVisibleInBox();
        let IsEntireVisible_LastOne = this.ArrMsg[this.ArrMsg.length-1].IsEntirelyVisibleInBox();
        // no matter offset is positive or negative, if the first and the last one are both entirely visible, then don't allow scrolling
        if(IsEntireVisible_FirstOne && IsEntireVisible_LastOne)
            return false;
        // when move up, the last one couldn't move above the bottom range
        if(rOffset < 0)
        {      
            if(IsEntireVisible_LastOne)
            {
                console.log("Bottom msg cannot move up anymore");
                return false;
            }                
        }
        // when move down, the first one couldn't move below the top range
        else if(0 < rOffset)
        {            
            if(IsEntireVisible_FirstOne)
            {
                console.log("Top msg cannot move down anymore");
                return false;
            }
        }
        return true;
    }

    Scroll(rOffset)
    {
        if(this.ArrMsg.length <= 0 || !this.CanScroll(rOffset))
        {            
            return;
        }            

        for(let i = this.ArrMsg.length-1; 0 <= i ; i--)
        {
            this.ArrMsg[i].Translate(rOffset);
        }
    }
}