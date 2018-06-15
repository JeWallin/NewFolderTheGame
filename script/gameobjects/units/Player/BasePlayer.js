
class BasePlayer extends BaseUnit 
{
    constructor()
    {
        super();
        console.log("BasePlayer constructed");

        super.SetImage(graphicAssets.PLAYER.image);
        
        super.SetSize( 50, 50 );
        super.SetPosition( 500, 500);

        this.controller         = undefined;
        this.facingDirection    = DIRECTIONS.NORTH;
        this.colidable          = true;
        super.SetRenderFunction(RenderImage);
    }

    Init(controller)
    {
        this.controller = controller;
    }

    Update(deltaTime)
    {
        super.Update(deltaTime);
        this.controller.Update(deltaTime, this);
    }

    RenderObject()
    {
        return super.RenderObject();
    }

}