
class Renderer
{
    constructor()
    {
        console.log("Renderer Constructed");
        this.renderContext = undefined;
        this.canvas = undefined;
    }

    ConnectContext(renderContext)
    {
        this.renderContext = renderContext;
    }
    ConnectCanvas(canvas)
    {
        this.canvas = canvas;
    }
}