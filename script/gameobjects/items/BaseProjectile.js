
class BaseProjectile extends GameObject
{
    constructor()
    {
        super();
        //super.SetColidable(true);
        this.projectorBehavior  = undefined; // How will the behavior be, this will let us know when the effect will be taking effect
        this.projectorEffect    = undefined;
        this.direction          = new vector2d( 1, 1 );
        this.speed              = 50;        
        this.isDead             = new TimeKill(5);
        this.currentSpriteTime  = 0;
        this.changeSprite       = 0.5;

        
        super.SetSize(new vector2d( 20, 20 ));
        super.SetCurrentSprite(0);
        super.SetSpriteData(graphicAssets.ACIDBALL);
        super.SetRenderFunction(RenderSpriteSheet);
        
    }

    Init(behavior, effect)
    {
        this.projectorBehavior  = behavior;
        this.projectorEffect    = effect;
    }

    GetDirection()
    {
        return this.direction;
    }

    SetDirection(direction)
    {
        this.direction = direction;
    }

    SetBehaviour(behavior)
    {
        this.projectorBehavior = behavior;
    }

    SetEffect(effect)
    {
        this.projectorEffect = effect;
    }
    SetTimeToDie(killFunction)
    {
        this.isDead = killFunction;
    }
    SetSpeed(speed)
    {
        this.speed = speed;
    }

    SetChangeSpeed(cspeed)
    {
        this.changeSprite = cspeed;
    }

    

    Update(deltaTime)
    {
        super.Update(deltaTime);

        this.currentSpriteTime += deltaTime;

        if(this.currentSpriteTime >= this.changeSprite)
        {
            this.currentSpriteTime = 0;
            var currentSprite = super.GetCurrentSprite();
            var newSprite = ( currentSprite + 1 ) % ( super.GetMaximumSprite() );

            super.toDestroy = this.isDead.Update(deltaTime);

            super.SetCurrentSprite(newSprite);
        }
        
        if ( this.projectorBehavior != undefined )
        {
            this.projectorBehavior.Update(deltaTime, this);
        }
    }
}