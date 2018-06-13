
class Rock extends GameObject
{
    constructor()
    {
        super();
        console.log("Rock Constructed");
        var rock = document.getElementById("rockImage");
        super.SetImage(rock);
    }

    Init()
    {
        super.Init();
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