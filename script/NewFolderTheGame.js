
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
        this.Objects        = [];

        this.gameRenderer.ConnectContext(this.renderContext);
        this.gameRenderer.ConnectCanvas(this.canvas);
        
        this.CreateObjects();
    }


    CreateObjects()
    {
        var stone = new Rock();
        stone.Init( new vector2d(200, 200), new vector2d(50, 50), 0);
        var stone2 = new Rock();
        stone2.Init( new vector2d(200, 260), new vector2d(50, 50), 0);
        var stone3 = new Rock();
        stone3.Init( new vector2d(300, 300), new vector2d(50, 50), 0);
        var stone4 = new Rock();
        stone4.Init( new vector2d(390, 300), new vector2d(50, 50), 0);

        var player = new BasePlayer();
        var playerController = new PlayerController(this.coliderManager, this.keyManager, KEYS.W, KEYS.S, KEYS.A, KEYS.D, KEYS.SPACE, KEYS.Q, KEYS.E);
        player.Init(playerController);
        
        
        
        this.Objects.push(stone);
        this.Objects.push(stone2);
        this.Objects.push(stone3);
        this.Objects.push(stone4);
        this.Objects.push(player);

        this.coliderManager.RegisterColidableObject(stone);
        this.coliderManager.RegisterColidableObject(stone2);
        this.coliderManager.RegisterColidableObject(stone3);
        this.coliderManager.RegisterColidableObject(stone4);
        this.coliderManager.RegisterColidableObject(player);
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
        for ( var i = 0; i < this.Objects.length; i++)
        {
            this.Objects[i].Update(deltaTime);
        }


        for ( var i = 0; i < this.Objects.length; i++)
        {
            if ( this.Objects[i].ToBeRemoved() )
            {
                this.coliderManager.DeregisterColidableObject(this.Objects[i]);
                this.Objects.splice(i, 1);
                i--;
            }
        }
    }

    Render()
    {
        this.gameRenderer.ClearScreen();

        for ( var i = 0; i < this.Objects.length; i++)
        {
            var renderTime = this.Objects[i].RenderObject();
            this.gameRenderer.Render(renderTime);

            this.gameRenderer.RenderDebugCircle(renderTime);
        }



    }
}