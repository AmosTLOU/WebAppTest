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
    constructor(i_text, i_imgBG, i_imgAvatar, i_side) 
    {      
        this.txt = i_text;
        this.bg = i_imgBG;
        this.imgAvatar = i_imgAvatar;
        this.side = i_side;   
             
        this.pW = this.txt.width + padding_pX;
        this.pH = this.txt.height + padding_pY;
        this.rW = this.pW/ww;
        this.rH = this.pH/wh;
        this.bg.setDisplaySize(this.pW, this.pH); 

        this.rX_left = undefined;
        if(this.side == 0)
        {
            this.rX_left = rX_leftBnd + 0.03;
        }
        else if(this.side == 1)
        {
            this.rX_left = rX_rightBnd - this.rW  - 0.03;
        }   
        this.rY_Top = undefined;              
    }

    RY_Top()
    {
        return this.rY_Top;
    }    

    RY_Bottom()
    {
        return this.rY_Top + this.rH;
    }

    RH()
    {
        return this.rH;
    }

    Show(is_visible) 
    {
        this.txt.visible = is_visible;
        this.bg.visible = is_visible;    
        this.imgAvatar.visible = is_visible;    
    }

    UpdatePosByTopY(i_rY)
    {
        this.rY_Top = i_rY;
        
        let pX_center = this.rX_left * ww + this.pW * 0.5;
        let pY_center = this.rY_Top * wh + this.pH * 0.5;
        this.txt.setPosition(pX_center, pY_center).setOrigin(0.5);
        this.bg.setPosition(pX_center, pY_center);
        if(this.side == 0)
            this.imgAvatar.setPosition(ww * (rX_leftBnd + padding_rX), wh*(this.rY_Top + 0.025));
        else if(this.side == 1)
            this.imgAvatar.setPosition(ww * (rX_rightBnd - padding_rX), wh*(this.rY_Top + 0.025));

        // completely invisible in the box
        if(this.RY_Bottom() < rY_topBnd || rY_bottomBnd < this.rY_Top)
        {
            this.Show(false);
        }
        // visible in the box(at least partially)
        else
        {
            this.Show(true);

            let partOfTopInvisible = false;
            let partOfBottomInvisible = false;
            let rY_visible_Top = this.rY_Top;
            let rY_visible_Bottom = this.RY_Bottom();
            let pY_startingCropping = 0;
            // part of top is invisible
            if(this.rY_Top < rY_topBnd)
            {
                rY_visible_Top = rY_topBnd;
                pY_startingCropping = (rY_topBnd - this.rY_Top) * wh;
                partOfTopInvisible = true;
            }
            // part of bottom is invisible
            if(rY_bottomBnd < this.RY_Bottom())
            {                
                rY_visible_Bottom = rY_bottomBnd;
                partOfBottomInvisible = true;
            }
            
            if(partOfTopInvisible || partOfBottomInvisible)
            {
                let ratio_OrginialToDisplay = pH_OriginalMsgBg / this.pH;
                let pH_VisibleRange = wh * (rY_visible_Bottom - rY_visible_Top);
                this.bg.setCrop(0, pY_startingCropping * ratio_OrginialToDisplay, this.bg.width, pH_VisibleRange * ratio_OrginialToDisplay);
                this.txt.setCrop(0, pY_startingCropping, this.txt.width, pH_VisibleRange - padding_pY);
            }
            else{
                this.bg.setCrop(0, 0, this.bg.width, this.bg.height);
                this.txt.setCrop(0, 0, this.txt.width, this.txt.height);
            }

            if(!this.IsEntirelyVisibleInBox())
                this.imgAvatar.visible = false;
            
        }
        
        // console.log(pX_center + "  " + pY_center);
    }

    Translate(rOffset)
    {
        this.UpdatePosByTopY(this.rY_Top + rOffset);
    }

    IsVisibleInBox()
    {        
        return ((rY_topBnd < this.rY_Top) && (this.rY_Top < rY_bottomBnd)) ||
                ((rY_topBnd < this.RY_Bottom()) && (this.RY_Bottom() < rY_bottomBnd)) ||
                ((this.rY_Top <= rY_topBnd) && (rY_bottomBnd <= this.RY_Bottom()));
    }

    IsEntirelyVisibleInBox()
    {
        return (rY_topBnd <= this.rY_Top) && (this.RY_Bottom() <= rY_bottomBnd);
    }
}


// Conversation Manager, charge of Conversation Message
class ConManager 
{
    constructor(i_bg) 
    {
        this.ArrMsg = new Array();
        this.bg = i_bg;
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
        this.bg.visible = is_visible; 
        if(is_visible)
        {
            this.UpdateAllMsgPos();
        }     
        else
        {
            for(let i = this.ArrMsg.length-1; 0 <= i ; i--)
            {         
                this.ArrMsg[i].Show(is_visible);
            }  
        }             
    }

    UpdateAllMsgPos()
    {
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

    Scroll(rOffset)
    {
        if(this.ArrMsg.length <= 0)
        {            
            return;
        }            

        let IsEntireVisible_FirstOne = this.ArrMsg[0].IsEntirelyVisibleInBox();
        let IsEntireVisible_LastOne = this.ArrMsg[this.ArrMsg.length-1].IsEntirelyVisibleInBox();
        // no matter offset is positive or negative, if the first and the last one are both entirely visible, then don't allow scrolling
        if(IsEntireVisible_FirstOne && IsEntireVisible_LastOne)
            return;
        // when move up, the last one couldn't move above the bottom range
        if(rOffset < 0)
        {   
            let ind = this.ArrMsg.length-1;
            let prospective_rY_Bottom_lastOne = this.ArrMsg[ind].RY_Bottom() + rOffset;
            if(IsEntireVisible_LastOne || this.ArrMsg[ind].RY_Bottom() <= rY_bottomBnd)
            {
                console.log("Bottom msg cannot move up anymore");
                return;
            }
            else if(this.ArrMsg[ind].IsVisibleInBox() && prospective_rY_Bottom_lastOne < rY_bottomBnd)
            {
                rOffset = rY_bottomBnd - this.ArrMsg[ind].RY_Bottom();
            }       
        }
        // when move down, the first one couldn't move below the top range
        else if(0 < rOffset)
        {            
            let prospective_rY_Top_firstOne = this.ArrMsg[0].RY_Top() + rOffset;
            if(IsEntireVisible_FirstOne || rY_topBnd <= this.ArrMsg[0].RY_Top())
            {
                console.log("Top msg cannot move down anymore");
                return;
            }
            else if(this.ArrMsg[0].IsVisibleInBox() && rY_topBnd < prospective_rY_Top_firstOne)
            {
                rOffset = rY_topBnd - this.ArrMsg[0].RY_Top();
            }
        }

        for(let i = this.ArrMsg.length-1; 0 <= i ; i--)
        {
            this.ArrMsg[i].Translate(rOffset);
        }
    }
}