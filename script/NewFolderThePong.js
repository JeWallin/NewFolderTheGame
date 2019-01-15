
class NewFolderThePong
{
    constructor(canvasId)
    {
        console.log("NewFolderThePong Constructed");

        this.keyManager     = new KeyManager();
        this.objectManager  = new ObjectManager();
        this.mapManager     = new MapManager();

        this.canvas         = document.getElementById(canvasId);

        this.gameSize       = new vector2d(this.canvas.width, this.canvas.height);
        this.mapManager     = new MapManager(this.gameSize);

        this.renderContext  = this.canvas.getContext('2d');
        this.gameRenderer   = new Renderer2d(this.canvas, RenderImage);
        
        this.players        = [];

        this.particles = new SimpleParticleSystem(new vector2d(500, 500), 10000, 5, 0.001);
    }

    Init()
    {
        console.log("NewFolderThePong Init");

        var rockLocations = this.mapManager.GetWorldObjects();
        console.log(rockLocations);
        var scale = this.mapManager.GetScale();

        for( var i = 0; i < rockLocations.length; i++ )
        {
            var sizeXY = scale.y;
            var size = new vector2d( sizeXY, sizeXY);
            var rock = new Rock();

            rock.Init(rockLocations[i], size, 0);
            console.log();

            this.objectManager.RegisterObject(rock);
        }

        var player = new BasePlayer();
        
        var player2 = new BasePlayer();
        var playerController = new PlayerController(this.objectManager, this.keyManager, 
            KEYS.W, KEYS.S, KEYS.A, KEYS.D, KEYS.SPACE, KEYS.Q, KEYS.E);
        var player2Controller = new PlayerController(this.objectManager, this.keyManager, 
            KEYS.I, KEYS.K, KEYS.J, KEYS.L, KEYS.RIGHT, KEYS.Q, KEYS.P);
        
        var playerLocations = this.mapManager.GetPlayerLocations();

        console.log(playerLocations);
        // hard coded for 2 players atm

        player.SetPosition(playerLocations[0].x, playerLocations[0].y);
        player2.SetPosition(playerLocations[1].x, playerLocations[1].y);

        player.Init(playerController);
        player2.Init(player2Controller);
        
        this.objectManager.RegisterObject(player);
        this.objectManager.RegisterObject(player2);
    }

    Input(keyCode, isDown)
    {
        this.keyManager.Input(keyCode, isDown);
    }

    Update(deltaTime)
    {
        this.particles.Update(deltaTime);
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

        if(this.keyManager.IsKeyDown(KEYS.A))
        {
            this.particles.position.x -= 100*deltaTime;
        }
        if( this.keyManager.IsKeyDown(KEYS.D) )
        {
            this.particles.position.x += 100*deltaTime;
        }
        if(this.keyManager.IsKeyDown(KEYS.W))
        {
            this.particles.position.y -= 100*deltaTime;
        }
        if( this.keyManager.IsKeyDown(KEYS.S) )
        {
            this.particles.position.y += 100*deltaTime;
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

        this.particles.Render(this.canvas);
    }
}