
class NewFolderTheGame
{
    constructor(canvasId)
    {
        console.log("NewFolderTheGame Constructed");

        this.canvas         = document.getElementById(canvasId);
		    this.gameSize       = new vector2d(this.canvas.width, this.canvas.height);
        this.renderContext  = this.canvas.getContext('2d');
        this.gameRenderer   = new Renderer2d();
      
        this.gameRenderer.ConnectContext(this.renderContext);
        this.gameRenderer.ConnectCanvas(this.canvas);
      
        this.obj = new Rock();
        this.obj.Init(new vector2d(100, 100), new vector2d(60, 60), 3.14/2);
    }

    Init()
    {
        console.log("NewFolderTheGame Init");

        /*
        1) CREATE MAP
        2) CREATE WALLS ETC.
        3) CREATE HERO SWAPN.
        4) CREATE ZOMBIE SPAWN.
        5) ja det andra också
         */
    }

    Update(deltaTime)
    {

    }

    Render()
    {
        this.gameRenderer.ClearScreen();
        var renderobj = this.obj.RenderObject();
        this.gameRenderer.Render(renderobj);
    }
}