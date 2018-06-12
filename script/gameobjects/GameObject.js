
class GameObject
{
    constructor()
    {
        console.log("GameObject constructed");

        this.position   = new vector2d(0, 0);
        this.size       = new vector2d(10, 10);
    }

    SetPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    SetSize(x, y)
    {
        this.size.x = x;
        this.size.y = y;
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
}