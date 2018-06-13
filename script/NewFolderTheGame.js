
class NewFolderTheGame
{
    constructor(canvasId)
    {
        console.log("NewFolderTheGame Constructed");
        this.keyManager = new KeyManager();

        this.canvas         = document.getElementById(canvasId);
        this.gameSize       = new vector2d(this.canvas.width, this.canvas.height);
        this.renderContext  = this.canvas.getContext('2d');
        this.gameRenderer   = new Renderer2d();
      
        this.gameRenderer.ConnectContext(this.renderContext);
        this.gameRenderer.ConnectCanvas(this.canvas);
        
      
        this.obj = new Rock();
        this.obj.Init(new vector2d(100, 100), new vector2d(60, 60), 3.14/2);

        this.player = new BasePlayer();
        this.player.Init(this.keyManager, KEYS.W, KEYS.S, KEYS.A, KEYS.D, KEYS.SPACE, KEYS.E, KEYS.R);

        this.playerB = new BasePlayer();
        this.playerB.Init(this.keyManager, KEYS.I, KEYS.K, KEYS.J, KEYS.L, KEYS.LEFT, KEYS.U, KEYS.O);    
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

    Input(keyCode, isDown)
    {
        this.keyManager.Input(keyCode, isDown);
    }

    Update(deltaTime)
    {
        this.player.Update(deltaTime);
        this.playerB.Update(deltaTime);
    }

    Render()
    {
        this.gameRenderer.ClearScreen();
        var renderobj = this.obj.RenderObject();
        var renderPlayer = this.player.RenderObject();
        var renderPlayerB = this.playerB.RenderObject();
        this.gameRenderer.Render(renderobj);
        this.gameRenderer.Render(renderPlayer);
        this.gameRenderer.Render(renderPlayerB);
    }
}