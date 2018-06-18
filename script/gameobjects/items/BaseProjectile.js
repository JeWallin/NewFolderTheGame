
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

        this.currentSpriteTime  = 0;
        this.changeSprite       = 0.5;

        super.SetSize(new vector2d( 20, 20 ));
        super.SetImage(graphicAssets.ACIDBALL.image);
        super.SetSpriteSheet(graphicAssets.ACIDBALL.spriteSheet);
        super.SetCurrentSprite(0);
        super.SetRenderFunction(RenderSpriteSheet);
        super.SetMaximumSprite(graphicAssets.ACIDBALL.numSprites);
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

    SetSpeed(speed)
    {
        this.speed = speed;
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

            if(newSprite === 0)
            {
                super.toDestroy =true;
            }
            super.SetCurrentSprite(newSprite);
        }
        
        if ( this.projectorBehavior != undefined )
        {
            this.projectorBehavior.Update(deltaTime, this);
        }
    }
}