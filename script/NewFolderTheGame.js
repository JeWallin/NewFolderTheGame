
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


        this.stone3 = new Rock();
        this.stone3.Init( new vector2d(300, 300), new vector2d(50, 50), 0);
        this.stone4 = new Rock();
        this.stone4.Init( new vector2d(390, 300), new vector2d(50, 50), 0);
        
        this.renderthis = [];
        this.renderthis.push(this.stone);
        this.renderthis.push(this.stone2);
        this.renderthis.push(this.stone3);
        this.renderthis.push(this.stone4);

        this.player = new BasePlayer();
        var playerController = new PlayerController(this.coliderManager, this.keyManager, KEYS.W, KEYS.S, KEYS.A, KEYS.D, KEYS.SPACE, KEYS.Q, KEYS.E);
        this.player.Init(playerController);

        this.coliderManager.RegisterColidableObject(this.stone);
        this.coliderManager.RegisterColidableObject(this.stone2);
        this.coliderManager.RegisterColidableObject(this.stone3);
        this.coliderManager.RegisterColidableObject(this.stone4);

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
        this.player.Update(deltaTime);
    }

    Render()
    {
        this.gameRenderer.ClearScreen();

        var renderPlayer = this.player.RenderObject();
        this.gameRenderer.Render(renderPlayer);

        this.gameRenderer.RenderDebugCircle(renderPlayer);

        for ( var i = 0; i < this.renderthis.length; i++)
        {
            var renderTime = this.renderthis[i].RenderObject();
            this.gameRenderer.Render(renderTime);

            this.gameRenderer.RenderDebugCircle(renderTime);
        }



    }
}