
class NewFolderTheGame
{
    constructor(canvasId)
    {
        console.log("NewFolderTheGame Constructed");

        this.keyManager     = new KeyManager();
        this.objectManager = new ObjectManager();
        this.canvas         = document.getElementById(canvasId);
        this.gameSize       = new vector2d(this.canvas.width, this.canvas.height);
        this.renderContext  = this.canvas.getContext('2d');
        this.gameRenderer   = new Renderer2d(this.canvas, RenderImage);
        
        this.CreateObjects();
    }


    CreateObjects()
    {
        var player = new BasePlayer();
        
        var player2 = new BasePlayer();
        var playerController = new PlayerController(this.objectManager, this.keyManager, 
            KEYS.W, KEYS.S, KEYS.A, KEYS.D, KEYS.SPACE, KEYS.Q, KEYS.E);
        var player2Controller = new PlayerController(this.objectManager, this.keyManager, 
            KEYS.I, KEYS.K, KEYS.J, KEYS.L, KEYS.RIGHT, KEYS.Q, KEYS.E);
        
        player.SetPosition(500, 500);
        player.SetPosition(500, 600);

        player.Init(playerController);
        player2.Init(player2Controller);
        
        this.objectManager.RegisterObject(player);
        this.objectManager.RegisterObject(player2);
        
        var lotsOfRocks = 40;
        for( var i = 0; i < lotsOfRocks; i++ )
        {
            while(true)
            {
                var pos = new vector2d( Math.random()*this.gameSize.x, Math.random()*this.gameSize.y);
                var sizeXY =   20 + Math.random()*100;
                var size = new vector2d( sizeXY, sizeXY);
                var toAdd = new Rock();
                
                toAdd.Init(pos, size, 0);

                var res = this.objectManager.IsColiding(toAdd.SphereColider(), []);

                if ( !res.colide )
                {
                    toAdd.IgnoreColideActor(player);
                    toAdd.IgnoreColideActor(player2);

                    this.objectManager.RegisterObject(toAdd);
                    
                    break;
                }
            }
        }
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
        var objects = this.objectManager.GetObjects();

        for ( var i = 0; i < objects.length; i++)
        {
            objects[i].Update(deltaTime);
        }


        for ( var i = 0; i < objects.length; i++)
        {
            if ( objects[i].ToBeRemoved() )
            {
                this.objectManager.DeregisterObject(objects[i]);
                i--;
            }
        }
    }

    Render()
    {
        this.gameRenderer.InitNewFrame();
        var objects = this.objectManager.GetObjects();

        for( var i = 0; i < objects.length; i++)
        {
            var object = objects[i].RenderObject();

            this.gameRenderer.SetTranslate(object.GetTranslateVector());
            this.gameRenderer.SetRotationRadians(object.GetRotationRadians());
            this.gameRenderer.SetRenderFunction(object.GetRenderFunction());

            this.gameRenderer.PreRender();
            this.gameRenderer.Render( object );
            this.gameRenderer.PostRender();
        }

    }
}