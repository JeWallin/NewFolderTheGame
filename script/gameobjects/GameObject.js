
class GameObject
{
    constructor()
    {
        console.log("GameObject constructed");

        this.position   = new vector2d(0, 0);
        this.size       = new vector2d(10, 10);
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