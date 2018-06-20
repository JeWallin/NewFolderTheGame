
class Rock extends GameObject
{
    constructor()
    {
        super();
        console.log("Rock Constructed");

        
        super.SetRenderFunction(RenderImage);
        super.SetSpriteData(graphicAssets.ROCK);
        super.SetTag(TAGS.NOTMOVABLE);
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

        if ( super.GetSize().x <= 1 )
        {
            super.toDestroy = true;
        }
    }

    RenderObject()
    {
        return super.RenderObject();
    }
}