
class NewFolderTheGame
{
    constructor(canvasId)
    {
        console.log("NewFolderTheGame Constructed");

        this.keyManager     = new KeyManager();
        this.coliderManager = new ColideManager();
        this.canvas         = document.getElementById(canvasId);
        this.gameSize       = new vector2d(this.canvas.width, this.canvas.height);
        this.renderContext  = this.canvas.getContext('2d');
        this.gameRenderer   = new Renderer2d();
      
        this.gameRenderer.ConnectContext(this.renderContext);
        this.gameRenderer.ConnectCanvas(this.canvas);
        
        this.stone = new Rock();
        this.stone.Init( new vector2d(200, 200), new vector2d(50, 50), 0);
        this.stone2 = new Rock();
        this.stone2.Init( new vector2d(200, 260), new vector2d(50, 50), 0);

        this.player = new BasePlayer();
        this.player.Init(this.keyManager, KEYS.W, KEYS.S, KEYS.A, KEYS.D, KEYS.SPACE, KEYS.Q, KEYS.E);

        this.coliderManager.RegisterColidableObject(this.stone);
        this.coliderManager.RegisterColidableObject(this.stone2);
        this.coliderManager.RegisterColidableObject(this.player);

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
        this.stone.Update(deltaTime);
        this.player.Update(deltaTime, this.coliderManager);
    }

    Render()
    {
        this.gameRenderer.ClearScreen();

        var renderThis = this.stone.RenderObject();
        var renderAndThis = this.stone2.RenderObject();
        var renderPlayer = this.player.RenderObject();

        this.gameRenderer.Render(renderThis);
        this.gameRenderer.Render(renderAndThis);
        this.gameRenderer.Render(renderPlayer);

        this.gameRenderer.RenderDebugCircle(renderThis);
        this.gameRenderer.RenderDebugCircle(renderAndThis);
        this.gameRenderer.RenderDebugCircle(renderPlayer);



    }
}