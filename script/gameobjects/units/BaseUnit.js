class BaseUnit extends GameObject
{

    constructor()
    {
        super();

        this.maxHealth          = 10;
        this.health             = 10;
        this.speed              = 200;
        this.dirVector          = new vector2d( 0, 0 );
        this.faceingDirection   = new vector2d( 1, 1 );
    }

    Init(maxHealth)
    {
        this.maxHealth  = maxHealth;
        this.health     = maxHealth;
    }

    changePosition( x, y )
    {
        super.SetPosition( x, y );
    }

    SetImage(image)
    {
        super.SetImage(image);
    }

    GetDirection()
    {
        return this.dirVector;
    }

    SetDirection(direction)
    {
        this.dirVector = direction;
    }

    GetHealth()
    {
        return this.health;
    }

    GetFacingDirection()
    {
        return this.faceingDirection;
    }

    ChangeHealth(health)
    {
        this.health += health;
        this.health = Math.min(this.maxHealth, this.health);
        this.health = Math.max(0, this.health);

        if(this.health === 0)
        {
            super.toDestroy = true;
        }
    }



    Update(deltaTime)
    {
        super.Update(deltaTime);

        if(this.dirVector.Length() !== 0)
        {
            this.faceingDirection = this.dirVector;
        }
    }

    RenderObject()
    {
        return super.RenderObject();
    }
}