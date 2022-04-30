// The coordinates defing the box containing all dialogues.
// The origin is at top-left
var rX_box = 0.12;
var rY_box = 0.12;
var rW_box = 0.8;
var rH_box = 0.56;
var rW_avatar = 0.15;
var rW_bufferAroundAvatar = rW_avatar * 0.2;
var rH_gapDialogues = 0.02;
var rFontSize = 0.04;

// represents a dialogue
class Dialogue
{
    constructor(i_avatar, i_bg, i_text) 
    {      
        this.avatar = i_avatar;
        this.bg = i_bg;
        this.text = i_text;
    }

    ShowAll(i_visibility)
    {
        this.avatar.visible = i_visibility;
        this.bg.visible = i_visibility;
        this.text.visible = i_visibility;
    }


    SetPosRY(i_rY)
    {
        let old_pY_avatar = this.avatar.y;
        let new_pY_avatar = wh * i_rY;
        let offset_pY = new_pY_avatar - old_pY_avatar;

        this.avatar.setY(new_pY_avatar);
        this.bg.setY(this.bg.y + offset_pY);
        this.text.setY(this.text.y + offset_pY);        

        this.CropByRange(this.avatar);
        this.CropByRange(this.bg);
        // non-mobile
        if(isMobile == -1)
            this.CropByRange(this.text);
        // mobile
        // dont know why, setCrop would make the font size look wrong on mobile devices
        else
            // this.text.visible = this.IsEntirelyVisible();   
            this.CropByRange(this.text);     
    }

    // UpdatePosByTopY(i_rY)
    // {
    //     this.rY_Top = i_rY;
        
    //     let pX_center = this.rX_left * ww + this.pW * 0.5;
    //     let pY_center = this.rY_Top * wh + this.pH * 0.5;
    //     this.txt.setPosition(pX_center, pY_center).setOrigin(0.5);
    //     this.bg.setPosition(pX_center, pY_center);
    //     if(this.side == 0)
    //         this.imgAvatar.setPosition(ww * (rX_leftBnd + rX_ConAvatar*0.5 + padding_rX*0.5), wh*(this.rY_Top + rY_ConAvatar*0.5));
    //     else if(this.side == 1)
    //         this.imgAvatar.setPosition(ww * (rX_rightBnd - rX_ConAvatar*0.5 - padding_rX*0.5), wh*(this.rY_Top + rY_ConAvatar*0.5));

    //     // completely invisible in the box
    //     if(this.RY_Bottom() < rY_topBnd || rY_bottomBnd < this.rY_Top)
    //     {
    //         this.Show(false);
    //     }
    //     // visible in the box(at least partially)
    //     else
    //     {
    //         this.Show(true);

    //         let partOfTopInvisible = false;
    //         let partOfBottomInvisible = false;
    //         let rY_visible_Top = this.rY_Top;
    //         let rY_visible_Bottom = this.RY_Bottom();
    //         let pY_startingCropping = 0;
    //         // part of top is invisible
    //         if(this.rY_Top < rY_topBnd)
    //         {
    //             rY_visible_Top = rY_topBnd;
    //             pY_startingCropping = (rY_topBnd - this.rY_Top) * wh;
    //             partOfTopInvisible = true;
    //         }
    //         // part of bottom is invisible
    //         if(rY_bottomBnd < this.RY_Bottom())
    //         {                
    //             rY_visible_Bottom = rY_bottomBnd;
    //             partOfBottomInvisible = true;
    //         }

    //         let ratio_OrginialToDisplay = pH_OriginalMsgBg / this.pH;
    //         let pH_VisibleRange = wh * (rY_visible_Bottom - rY_visible_Top);
    //         if(partOfTopInvisible || partOfBottomInvisible)
    //         {                
    //             this.bg.setCrop(0, pY_startingCropping * ratio_OrginialToDisplay, this.bg.width, pH_VisibleRange * ratio_OrginialToDisplay);
    //             this.txt.setCrop(0, pY_startingCropping, this.txt.width, pH_VisibleRange - padding_pY);
    //         }
    //         else{
    //             this.bg.setCrop(0, 0, this.bg.width, this.bg.height);
    //             this.txt.setCrop(0, 0, this.txt.width, this.txt.height);
    //         }

    //         // deal with the occulusion of the avatar icon
    //         ratio_OrginialToDisplay = pH_OriginalAvatarIcon / (wh * rY_ConAvatar);            
    //         if(this.rY_Top < rY_topBnd)
    //         {
    //             pY_startingCropping = wh * (rY_topBnd - this.rY_Top);
    //             pH_VisibleRange = (wh * rY_ConAvatar) - pY_startingCropping;
    //             this.imgAvatar.setCrop(0, pY_startingCropping * ratio_OrginialToDisplay, this.imgAvatar.width, pH_VisibleRange * ratio_OrginialToDisplay);
    //         }
    //         else if(rY_bottomBnd < this.rY_Top + rY_ConAvatar)
    //         {
    //             pH_VisibleRange = wh * (rY_bottomBnd - this.rY_Top);
    //             this.imgAvatar.setCrop(0, 0, this.imgAvatar.width, pH_VisibleRange * ratio_OrginialToDisplay);
    //         }
    //         else
    //         {
    //             this.imgAvatar.setCrop(0, 0, this.imgAvatar.width, this.imgAvatar.height);
    //         }            
            
    //     }
    // }


    // phEl == phaser element
    CropByRange(phEl)
    {
        let pY_min_el = phEl.y - phEl.displayHeight * phEl.originY;
        let pY_max_el = phEl.y + phEl.displayHeight * (1-phEl.originY);
        let pY_min_visible = Math.max(pY_min_el, wh * rY_box);
        let pY_max_visible = Math.min(pY_max_el, wh * (rY_box + rH_box));
        if(pY_min_visible < pY_max_visible)
        {
            let pY_startingCropping = 0;
            if(pY_min_el < wh * rY_box)
                pY_startingCropping = (wh * rY_box - pY_min_el) * phEl.height/phEl.displayHeight;
            if(phEl.text != undefined)
            {
                console.log("exist");
                phEl.setCrop(0, wh * rY_box - pY_min_el, phEl.width, pY_max_visible - pY_min_visible);
            }
            else
                phEl.setCrop(0, pY_startingCropping, phEl.width, (pY_max_visible - pY_min_visible) * phEl.height/phEl.displayHeight);
        }
        else
        {
            phEl.setCrop(0,0,0,0);
        }                
    }

    Translate(rOffset)
    {
        this.SetPosRY(this.avatar.y/wh + rOffset);        
    }

    IsVisible()
    {
        let rY_min = (this.bg.y - this.bg.displayHeight/2) / wh;
        let rY_max = (this.bg.y + this.bg.displayHeight/2) / wh;
        return (rY_box <= rY_max && rY_min <= rY_box + rH_box)
    }


    IsEntirelyVisible()
    {
        let rY_min = (this.bg.y - this.bg.displayHeight/2) / wh;
        let rY_max = (this.bg.y + this.bg.displayHeight/2) / wh;
        return (rY_box <= rY_min && rY_max <= rY_box + rH_box);
    }
}



class DialogueManager 
{
    constructor(i_scene, i_KeyAvatar1, i_KeyAvatar2, i_KeyTextBG) 
    {        
        this.scene = i_scene;
        this.keyAvatar1 = i_KeyAvatar1;
        this.keyAvatar2 = i_KeyAvatar2;
        this.keyTextBG = i_KeyTextBG;
        this.dialogues = new Array();
    }


    Push(i_side, i_text)
    {
        let img_textBG = this.scene.add.image(0, 0, this.keyTextBG);
        // the value is not important
        let pY_avatar = wh*0.3;
        let img_avatar = undefined;
        let text = undefined;
        if(i_side == "l" || i_side == "L")
        {
            img_avatar = this.scene.add.image(ww * (rX_box + rW_bufferAroundAvatar + rW_avatar/2), pY_avatar,  this.keyAvatar1).setOrigin(0.5, 0).setDisplaySize(ww*rW_avatar, ww*rW_avatar);
            text = this.scene.CreatePhaserText(img_avatar.x/ww + rW_avatar/2 + rW_bufferAroundAvatar, img_avatar.y/wh, i_text, 
            0, 0, 'bold '+Math.round(ww*rFontSize)+'px Arial', '#000000', 0, rW_box * 0.5);
            img_textBG.setPosition(text.x + text.width/2, text.y + text.height/2).setDisplaySize(text.width + ww * rW_bufferAroundAvatar, text.height + ww * rW_bufferAroundAvatar);
        }            
        else if(i_side == "r" || i_side == "R")
        {
            img_avatar = this.scene.add.image(ww * (rX_box + rW_box - rW_bufferAroundAvatar - rW_avatar/2), pY_avatar,  this.keyAvatar2).setOrigin(0.5, 0).setDisplaySize(ww*rW_avatar, ww*rW_avatar);

            text = this.scene.CreatePhaserText(img_avatar.x/ww - rW_avatar/2 - rW_bufferAroundAvatar, img_avatar.y/wh, i_text, 
            1, 0, 'bold '+Math.round(ww*rFontSize)+'px Arial', '#000000', 0, rW_box * 0.5);
            img_textBG.setPosition(text.x - text.width/2, text.y + text.height/2).setDisplaySize(text.width + ww * rW_bufferAroundAvatar, text.height + ww * rW_bufferAroundAvatar);
        }
        else
            alert("The input i_side to DialogueManager.Push() funciton is invalid");

        if(img_textBG.displayHeight < ww*rW_avatar)
        {
            img_textBG.setDisplaySize(img_textBG.displayWidth, ww*rW_avatar);
            img_textBG.setY(text.y - ww * rW_bufferAroundAvatar * 0.5 + img_textBG.displayHeight*0.5);
        }
        img_avatar.y = img_textBG.y - img_textBG.displayHeight/2;
        // after the above setting, the relative distance and scale of avatar, text_bg and text would be correct.
        this.dialogues.push(new Dialogue(img_avatar, img_textBG, text));
    }

    ShowAll(i_visibility)
    {
        for(let i = 0; i < this.dialogues.length ; i++)
        {         
            this.dialogues[i].ShowAll(i_visibility);
        }  
        if(i_visibility)      
            this.ResetDlgPos(); 
    }

    // reset dialogue positions
    ResetDlgPos()
    {
        let rY = rY_box + rH_box;
        let Placing_StartByFirstOne = false;
        for(let i = this.dialogues.length-1; 0 <= i ; i--)
        {        
            rY -= rH_gapDialogues + this.dialogues[i].bg.displayHeight/wh;
            this.dialogues[i].SetPosRY(rY);
            if(i == 0 && this.dialogues[i].IsEntirelyVisible())
            {
                Placing_StartByFirstOne = true;
                break;
            }
        }

        if(Placing_StartByFirstOne)
        {
            rY = rY_box;
            for(let i = 0; i < this.dialogues.length ; i++)
            {         
                rY += rH_gapDialogues;
                this.dialogues[i].SetPosRY(rY);
                rY += this.dialogues[i].bg.displayHeight/wh;
            }
        }
    }

    Scroll(rOffset)
    {
        if(this.dialogues.length <= 0)
        {            
            return;
        }            

        let IsEntireVisible_FirstOne = this.dialogues[0].IsEntirelyVisible();
        let IsEntireVisible_LastOne = this.dialogues[this.dialogues.length-1].IsEntirelyVisible();
        // no matter offset is positive or negative, if the first and the last one are both entirely visible, then don't allow scrolling
        if(IsEntireVisible_FirstOne && IsEntireVisible_LastOne)
        {
            console.log("All dialogues are visible, scrolling is not allowed.");
            return;
        }
            
        // when move up, the last one couldn't move above the bottom range
        if(rOffset < 0)
        {   
            let ind = this.dialogues.length-1;
            let rY_bottom_lastOne = (this.dialogues[ind].bg.y + this.dialogues[ind].bg.displayHeight*0.5)/wh;
            let prospective_rY_bottom_lastOne = rY_bottom_lastOne + rOffset;
            if(IsEntireVisible_LastOne || rY_bottom_lastOne <= rY_box + rH_box)
            {
                console.log("Bottom msg cannot move up anymore");
                return;
            }
            else if(this.dialogues[ind].IsVisible() && prospective_rY_bottom_lastOne < rY_box + rH_box)
            {
                rOffset = rY_box + rH_box - rY_bottom_lastOne;
            }       
        }
        // when move down, the first one couldn't move below the top range
        else if(0 < rOffset)
        {            
            let ind = 0;
            let rY_top_firstOne = (this.dialogues[ind].bg.y - this.dialogues[ind].bg.displayHeight*0.5)/wh;
            let prospective_rY_top_firstOne = rY_top_firstOne + rOffset;
            if(IsEntireVisible_FirstOne || rY_box <= rY_top_firstOne)
            {
                console.log("Top msg cannot move down anymore");
                return;
            }
            else if(this.dialogues[ind].IsVisible() && rY_box < prospective_rY_top_firstOne)
            {
                rOffset = rY_box - rY_top_firstOne;
            }
        }

        for(let i = 0; i < this.dialogues.length ; i++)
        {
            this.dialogues[i].Translate(rOffset);
        }
    }
}