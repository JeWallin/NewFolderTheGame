class BaseUnit extends GameObject
{

    constructor()
    {
        super();

        this.health = 10;
        this.speed  = 200;
    }

    changePosition( x, y )
    {
        super.SetPosition( x, y );
    }

    SetImage(image)
    {
        super.SetImage(image);
    }

    Update(deltaTime)
    {
        super.Update(deltaTime);

    }

    RenderObject()
    {
        return super.RenderObject();
    }
}