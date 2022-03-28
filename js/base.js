class Coord
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
}


class ConMsg  // conversation message  includes phaser text and phaser image(bg)
{
    constructor(i_phaserText, i_phaserImg, i_side) 
    {
        this.txt = i_phaserText;
        this.txt.visible = false;
        this.bg = i_phaserImg;
        this.bg.visible = false;
        this.side = i_side;
        // this.coord = new Coord();   
        
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;
    }

    show(per_y) 
    {
        this.txt.visible = true;
        this.txt.setY(this.wh * per_y);
        this.bg.visible = true;
        this.bg.setY(this.wh * per_y);
    }

    hide()
    {
        this.txt.visible = false;
        this.bg.visible = false;
    }

    translate(offset)
    {
        let posY_txt = this.txt.y + offset;
        if(posY_txt/this.wh < 0.55)
            this.txt.setY(posY_txt);
        else
            return false;

        let posY_bg = this.bg.y + offset;
        if(posY_bg/this.wh < 0.55)
            this.bg.setY(posY_bg);
        else
            return false;
        
        return true;
    }
}


class ConManager // conversation manager
{
    constructor() 
    {
        this.MsgHistory = new Array();
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;
    }

    addMsg(conMsg)
    {
        this.MsgHistory[this.MsgHistory.length] = conMsg;
    }

    show()
    {
        let bottomY = 0.55;
        let per_y = bottomY;
        for(let i = this.MsgHistory.length-1; 0 <= i ; i--)
        {
            if(per_y < 0)
                break;            
            this.MsgHistory[i].show(per_y);
            per_y -= 0.075;
        }
    }

    hide()
    {
        for(let i = 0; i < this.MsgHistory.length; i++)
        {
            this.MsgHistory[i].hide();
        }
    }

    scroll(offset)
    {
        for(let i = this.MsgHistory.length-1; 0 <= i ; i--)
        {
            let success = this.MsgHistory[i].translate(offset);
            if(!success)
            {
                console.log("Dialogue can't move anymore!");
                break;
            }
                
        }
    }
}