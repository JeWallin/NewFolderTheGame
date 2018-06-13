
class GameObject
{
    constructor()
    {
        console.log("GameObject constructed");

        this.position   = new vector2d(0, 0);
        this.size       = new vector2d(10, 10);
        this.image      = undefined;
        this.rotation   = 0;
        this.colidable  = false;
    }

    Init()
    {

    }

    Update(deltaTime)
    {

    }

    Render(renderContext)
    {
        renderContext.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    SetPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    SetSize( width, height )
    {
        this.size.x = width;
        this.size.y = height;
    }

    SetImage(image)
    {
        this.image = image;
    }

    SetRotation(rotation)
    {
        this.rotation = rotation;
    }

    SetColidable(colidable)
    {
        this.colidable = colidable;
    }

    RenderObject()
    {
        var renderObj = new RenderObj();
        renderObj.SetPosition( this.position.x, this.position.y );
        renderObj.SetSize( this.size.x, this.size.y);
        renderObj.SetImage( this.image );
        renderObj.SetRotation( this.rotation );
        return renderObj;
    }
}