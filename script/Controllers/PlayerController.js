class PlayerController extends BaseController
{
    constructor(objectManager, keyManager, up, down, left, right, offence, defence, util)
    {
        super();
        console.log("PlayerController constructed");

        this.objectManager  = objectManager;
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

        
        var moveVector = new vector2d(0, 0);
        var move = deltaTime*player.speed;

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
        player.SetDirection(moveVector);
        var bulletSpeed = 225;

        if ( moveVector.Length() > 0)
        {
            bulletSpeed += player.speed;
        }
        if( this.keyManager.IsKeyDown(this.offence) && this.cd > this.cdMax )
        {
            var bullet = new BaseProjectile();
            var behavior = new BouncingBehavior(this.objectManager, [player, bullet]);
            //var effect = new SizeEffect(10, this.objectManager);
            var effect = new DamageEffect(1, this.objectManager);

            bullet.Init(behavior, effect);
            bullet.SetPosition(player.position.x, player.position.y );
            bullet.SetDirection(player.GetFacingDirection());
            bullet.SetChangeSpeed(0.01);
            bullet.SetSpriteData(graphicAssets.FIREBALL);
            bullet.SetSize(40,40);
            bullet.SetSpeed(bulletSpeed);
            bullet.SetColidable(true);


            this.objectManager.RegisterObject(bullet);
            this.cd = 0;
        }

        if( this.keyManager.IsKeyDown(this.util) && this.cd > this.cdMax )
        {
            var bullet = new BaseProjectile();
            var behavior = new BulletBehavior(this.objectManager, [player, bullet]);
            var effect = new SizeEffect(1, this.objectManager);
            //var effect = new DamageEffect(1, this.objectManager);

            bullet.Init(behavior, effect);
            bullet.SetPosition(player.position.x, player.position.y );
            bullet.SetDirection(player.GetFacingDirection());
            bullet.SetChangeSpeed(0.01);
            bullet.SetSpriteData(graphicAssets.ACIDBALL);
            bullet.SetTimeToDie(new TimeKill(0.3));
            bullet.SetSize(40,40);
            bullet.SetSpeed(bulletSpeed);
            bullet.SetColidable(false);

            this.objectManager.RegisterObject(bullet);
            this.cd = 0;
        }

        var coliderSphere = player.SphereColider();

        moveVector = moveVector.Mult(move);

        coliderSphere.position = coliderSphere.position.Add(moveVector);

        var colideResult = this.objectManager.IsColiding(coliderSphere, [player]);

        var myPosition = new vector2d(player.position.x + moveVector.x, player.position.y + moveVector.y);
        if ( !colideResult.colide )
        {
            player.SetPosition(myPosition.x, myPosition.y);
        }
        else if ( colideResult.with.GetTag() == TAGS.NOTMOVABLE || colideResult.with.GetTag() == TAGS.BASEPLAYER )
        {
            var colidedObjects = [];
            colidedObjects.push(colideResult.with);
            var colidedWith = colideResult.with.SphereColider();
            var mycolider = player.SphereColider();
            var otherPosition = colidedWith.position;

            var difVector = myPosition.DiffVector(otherPosition);
            difVector.Normalize();
            difVector = difVector.Mult(colidedWith.radius + mycolider.radius + 0.001);
 

            player.SetPosition(otherPosition.x + difVector.x, otherPosition.y  + difVector.y);

            colideResult = this.objectManager.IsColiding(mycolider, [player, colideResult.with]);
            

            if( colideResult.colide )
            {
                colidedObjects.push(colideResult.with);
                var colidedObject0 = colidedObjects[0].SphereColider();
                var colidedObject1 = colidedObjects[1].SphereColider();
                
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
                    player.SetPosition(potentialPos1.x , potentialPos1.y );
                }
                else
                {
                    player.SetPosition(potentialPos0.x , potentialPos0.y );
                }
            }
        }
        else{
            player.SetPosition(myPosition.x, myPosition.y);
        }
    }
}