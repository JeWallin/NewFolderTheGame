class PlayerController extends BaseController
{
    constructor(colideManager, keyManager, up, down, left, right, offence, defence, util)
    {
        super();
        console.log("PlayerController constructed");

        this.colideManager  = colideManager;
        this.keyManager     = keyManager;
        this.up             = up;
        this.down           = down;
        this.left           = left;
        this.right          = right;
        this.offence        = offence;
        this.defence        = defence;
        this.util           = util;
        this.cdMax          = 0.5;
        this.cd             = 0;
    }

    Update(deltaTime, player)
    {
        this.cd += deltaTime;

        var colidedObjects = [];

        var coliderSphere = player.SphereColider();
        var moveVector = new vector2d(0, 0);
        var move = deltaTime*player.speed;

        if(this.keyManager.IsKeyDown(this.up))
        {
            moveVector.y -= move;
            player.facingDirection = DIRECTIONS.NORTH;
        }
        else if(this.keyManager.IsKeyDown(this.down))
        {
            moveVector.y += move;
            player.facingDirection = DIRECTIONS.SOUTH;
        }
        if(this.keyManager.IsKeyDown(this.left))
        {
            moveVector.x -= move;
            player.facingDirection = DIRECTIONS.WEST;
        }
        else if(this.keyManager.IsKeyDown(this.right))
        {
            moveVector.x += move;
            player.facingDirection = DIRECTIONS.EAST;
        }
        
        if( this.keyManager.IsKeyDown(this.offence) && this.cd > this.cdMax )
        {
            var bullet = new ProjectileStraight(player.facingDirection);
            var behavior = new BulletBehavior(this.colideManager);
            var effect = new SizeEffect(1, this.colideManager);

            bullet.Init(behavior, effect);
            bullet.SetPosition(player.position.x, player.position.y);
            bullet.SetSize(5,5);

            this.colideManager.RegisterColidableObject(bullet, player);
            this.cd -= 0.5;
        }

        moveVector.Normalize();
        moveVector = moveVector.Mult(move);

        coliderSphere.position = coliderSphere.position.Add(moveVector);

        var colideResult = this.colideManager.IsColiding(coliderSphere, [player]);

        var myPosition = new vector2d(player.position.x + moveVector.x, player.position.y + moveVector.y);
        if ( !colideResult.colide )
        {
            player.SetPosition(myPosition.x, myPosition.y);
        }
        else
        {
            var colidedObjects = [];
            colidedObjects.push(colideResult.with);
            var colidedWith = colideResult.with;
            var mycolider = player;
            var otherPosition = new vector2d(colidedWith.position.x, colidedWith.position.y);

            myPosition = myPosition.Add(new vector2d(player.size.x/2, player.size.y/2));
            otherPosition = otherPosition.Add(new vector2d(colidedWith.size.x/2, colidedWith.size.y/2));

            var difVector = myPosition.DiffVector(otherPosition);
            difVector.Normalize();
            difVector = difVector.Mult(colidedWith.size.x/2 + player.size.x/2 + 0.001);

            player.SetPosition(otherPosition.x - player.size.x/2 + difVector.x, otherPosition.y - player.size.x/2 + difVector.y);

            coliderSphere = player.SphereColider();
            colideResult = this.colideManager.IsColiding(coliderSphere, [player]);
            
            if( colideResult.colide )
            {
                colidedObjects.push(colideResult.with);
                var colidedObject0 = colidedObjects[0].SphereColider();
                var colidedObject1 = colidedObjects[1].SphereColider();
                var mycolider = player.SphereColider();
                
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

                if (potentialDist0 >= potentialDist1)
                {
                    player.SetPosition(potentialPos1.x - player.size.x/2, potentialPos1.y - player.size.x/2);
                }
                else
                {
                    player.SetPosition(potentialPos0.x - player.size.x/2, potentialPos0.y - player.size.x/2);
                }
            }
        }
    }
}