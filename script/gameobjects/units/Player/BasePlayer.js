
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
        moveVector = moveVector.Mult(move);

        coliderSphere.position = coliderSphere.position.Add(moveVector);

        var colideResult = colideManager.ColidingWith(coliderSphere, this);

        var myPosition = new vector2d(this.position.x + moveVector.x, this.position.y + moveVector.y);
        if ( !colideResult.colide )
        {
            super.SetPosition(myPosition.x, myPosition.y);
        }
        else
        {
            var colidedObjects = [];
            colidedObjects.push(colideResult.with);
            var colidedWith = colideResult.with;
            var mycolider = this;
            var otherPosition = new vector2d(colidedWith.position.x, colidedWith.position.y);

            myPosition = myPosition.Add(new vector2d(this.size.x/2, this.size.y/2));
            otherPosition = otherPosition.Add(new vector2d(colidedWith.size.x/2, colidedWith.size.y/2));

            var difVector = myPosition.DiffVector(otherPosition);
            difVector.Normalize();
            difVector = difVector.Mult(colidedWith.size.x/2 + this.size.x/2 + 0.001);

            super.SetPosition(otherPosition.x - this.size.x/2 + difVector.x, otherPosition.y - this.size.x/2 + difVector.y);

            coliderSphere = super.SphereColider();
            colideResult = colideManager.ColidingWith(coliderSphere, this);
            
            if( colideResult.colide )
            {
                colidedObjects.push(colideResult.with);
                var colidedObject0 = colidedObjects[0].SphereColider();
                var colidedObject1 = colidedObjects[1].SphereColider();
                var mycolider = this.SphereColider();
                
                var distVector = colidedObject1.position.DiffVector(colidedObject0.position);
                var d = distVector.Length();   
                distVector.Normalize();

                var r0 = colidedObject0.radius + mycolider.radius;
                var r1 = colidedObject1.radius + mycolider.radius;
                var r02 = r0*r0;
                
                var a = ( r02 - (r1*r1) + (d*d) ) / (2*d);

                var h = Math.sqrt(Math.abs( r02 - (a*a) ));

                var newPos = new vector2d(colidedObject0.position.x, colidedObject0.position.y);
                newPos = newPos.Add(distVector.Mult(a));

                var potentialPos0 = new vector2d(-distVector.y, distVector.x).Mult(h).Add(newPos);
                var potentialPos1 = new vector2d(distVector.y, -distVector.x).Mult(h).Add(newPos);

                var potentialDist0 = mycolider.position.DistanceTo(potentialPos0);
                var potentialDist1 = mycolider.position.DistanceTo(potentialPos1);

                console.log(potentialDist0);
                console.log(potentialDist1);
                console.log(distVector);

                if (potentialDist0 >= potentialDist1)
                {
                    super.SetPosition(potentialPos1.x - this.size.x/2, potentialPos1.y - this.size.x/2);
                }
                else
                {
                    super.SetPosition(potentialPos0.x - this.size.x/2, potentialPos0.y - this.size.x/2);
                }
                
            }
        }
        
    }

    RenderObject()
    {
        return super.RenderObject();
    }

}