
class Rock extends GameObject
{
    constructor()
    {
        super();
        console.log("Rock Constructed");

        var rock = document.getElementById("rockImage");
        super.SetImage(rock);
        
    }

    Init( position, size, rotation )
    {
        super.Init();
        super.SetPosition( position.x, position.y);
        super.SetSize(size.x, size.y);
        super.SetRotation(rotation);
        super.SetColidable(true);
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