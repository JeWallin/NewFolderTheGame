
class ProjectileStraight extends GameObject
{
    constructor(direction)
    {
        super();
        this.projectorBehavior  = undefined; // How will the behavior be, this will let us know when the effect will be taking effect
        this.projectorEffect    = undefined;
        this.image              = imageList.ROCK;
        this.size.x             = 20;
        this.size.y             = 20;
        this.speed              = 50;
        this.direction          = direction;
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

    Update(deltaTime)
    {
        super.Update(deltaTime);
        if ( this.projectorBehavior != undefined )
        {
            this.projectorBehavior.Update(deltaTime, this);
        }
    }
}