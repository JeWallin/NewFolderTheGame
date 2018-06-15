
class ProjectileStraight extends GameObject
{
    constructor(direction)
    {
        super();
        this.projectorBehavior  = undefined; // How will the behavior be, this will let us know when the effect will be taking effect
        this.projectorEffect    = undefined;
        this.direction          = direction;
        this.speed              = 50;

        this.currentSpriteTime  = 0;
        this.changeSprite       = 0.05;

        super.SetSize(new vector2d( 20, 20 ));
        super.SetImage(graphicAssets.FIREBALL.image);
        super.SetSpriteSheet(graphicAssets.FIREBALL.spriteSheet);
        super.SetCurrentSprite(0);
        super.SetRenderFunction(RenderSpriteSheet);
        super.SetMaximumSprite(graphicAssets.FIREBALL.numSprites);
    }

    Init(behavior, effect)
    {
        this.projectorBehavior  = behavior;
        this.projectorEffect    = effect;
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

            super.SetCurrentSprite(newSprite);
        }
        
        if ( this.projectorBehavior != undefined )
        {
            this.projectorBehavior.Update(deltaTime, this);
        }
    }
}