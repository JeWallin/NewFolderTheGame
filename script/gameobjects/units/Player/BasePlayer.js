
class BasePlayer extends BaseUnit 
{
    constructor()
    {
        super();
        console.log("BasePlayer constructed");

        super.SetImage(imageList.SLIME);

        this.up         = undefined;
        this.down       = undefined;
        this.left       = undefined;
        this.right      = undefined;
        this.offence    = undefined;
        this.defence    = undefined;
        this.util       = undefined;
        this.keyManager = undefined;

    }

    Init(keyManager, up, down, left, right, offence, defence, util)
    {
        this.keyManager = keyManager;
        this.up         = up;
        this.down       = down;
        this.left       = left;
        this.right      = right;
        this.offence    = offence;
        this.defence    = defence;
        this.util       = util;

        super.SetSize(200, 100);
        super.SetPosition(500, 500);
    }

    Update(deltaTime)
    {
        super.Update(deltaTime);

        if(this.keyManager.IsKeyDown(this.up))
        {
            super.SetPosition(this.position.x, this.position.y-deltaTime*this.speed);
        }
        if(this.keyManager.IsKeyDown(this.down))
        {
            super.SetPosition(this.position.x, this.position.y+deltaTime*this.speed);

        }
        if(this.keyManager.IsKeyDown(this.left))
        {
            super.SetPosition(this.position.x - deltaTime*this.speed, this.position.y);

        }
        if(this.keyManager.IsKeyDown(this.right))
        {
            super.SetPosition(this.position.x + deltaTime*this.speed, this.position.y);
        }
    }

    RenderObject()
    {
        return super.RenderObject();
    }

}