
class BasePlayer extends BaseUnit 
{
    constructor()
    {
        super();
        console.log("BasePlayer constructed");

        super.SetImage(imageList.SLIME);

        this.up             = undefined;
        this.down           = undefined;
        this.left           = undefined;
        this.right          = undefined;
        this.offence        = undefined;
        this.defence        = undefined;
        this.util           = undefined;
        this.keyManager     = undefined;

    }

    Init(keyManager, up, down, left, right, offence, defence, util)
    {
        this.keyManager     = keyManager;
        this.up             = up;
        this.down           = down;
        this.left           = left;
        this.right          = right;
        this.offence        = offence;
        this.defence        = defence;
        this.util           = util;

        super.SetSize(50, 50);
        super.SetPosition(500, 500);
    }

    Update(deltaTime, colideManager)
    {
        var colidedObjects = [];
        super.Update(deltaTime);

        var coliderSphere = super.SphereColider();
        var moveVector = new vector2d(0, 0);
        var move = deltaTime*this.speed;

        if(this.keyManager.IsKeyDown(this.up))
        {
            moveVector.y -= move;
        }
        else if(this.keyManager.IsKeyDown(this.down))
        {
            moveVector.y += move;
        }
        if(this.keyManager.IsKeyDown(this.left))
        {
            moveVector.x -= move;
        }
        else if(this.keyManager.IsKeyDown(this.right))
        {
            moveVector.x += move;
        }

        moveVector.Normalize();
        moveVector.Mult(move);

        coliderSphere.position.Add(moveVector);

        var colideResult = colideManager.ColidingWith(coliderSphere, this);

        var myPosition = new vector2d(this.position.x + moveVector.x, this.position.y + moveVector.y);
        if ( !colideResult.colide )
        {
            super.SetPosition(myPosition.x, myPosition.y);
        }
        else
        {
            var colidedObjects = [];
            do
            {
                colidedObjects.push(colideResult.with);
                var colidedWith = colideResult.with;
                var mycolider = this;
                var otherPosition = new vector2d(colidedWith.position.x, colidedWith.position.y);
    
                myPosition.Add(new vector2d(this.size.x/2, this.size.y/2));
                otherPosition.Add(new vector2d(colidedWith.size.x/2, colidedWith.size.y/2));
    
                var difVector = myPosition.DiffVector(otherPosition);
                difVector.Normalize();
                difVector.Mult(colidedWith.size.x/2 + this.size.x/2 + 0.001);

                super.SetPosition(otherPosition.x - this.size.x/2 + difVector.x, otherPosition.y - this.size.x/2 + difVector.y);

                coliderSphere = super.SphereColider();
                colideResult = colideManager.ColidingWith(coliderSphere, this);
               
            } while (colideResult.colide)
            
            if( colidedObjects.length > 1 )
            {
                
            }
           

        }
        
    }

    RenderObject()
    {
        return super.RenderObject();
    }

}