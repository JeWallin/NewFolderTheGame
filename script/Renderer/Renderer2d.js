
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

    RenderDebugBox(object)
    {
        this.renderContext.fillRect(object.position.x, object.position.y, object.size.x, object.size.y );
    }

    RenderDebugCircle(object)
    {
        this.renderContext.beginPath();
        this.renderContext.arc(object.position.x + object.size.x / 2, object.position.y + object.size.y / 2, (object.size.x+object.size.y)/4,0, 2*3.14 );
        this.renderContext.stroke();
    }
}