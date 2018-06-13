
class Renderer2d extends Renderer
{
    constructor()
    {
        super();

    }

    ClearScreen()
    {
        this.renderContext.clearRect(0,0, this.canvas.width, this.canvas.height);
    }

    SetUpForRendering()
    {
        this.renderContext.translate( 0,0 );
        this.renderContext.rotate( 0 );
    }

    Render( object )
    {   
        this.SetUpForRendering();

        if ( this.renderContext != undefined )
        {
            object.Render(this.renderContext);
        }
        else
        {
            alert("No render context found");
        }
        
    }

    RenderAll( objects )
    {

    }
}