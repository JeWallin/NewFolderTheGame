
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

        this.player = new BasePlayer();
        this.player.Init(this.keyManager, KEYS.W, KEYS.S, KEYS.A, KEYS.D, KEYS.SPACE, KEYS.Q, KEYS.E);
        
        var sizeEffect = new SizeEffect(25);
        var sizeEffect1 = new SizeEffect(50);
        var sizeEffect2 = new SizeEffect(-100);

        var bullet = new ProjectileStraight(DIRECTIONS.SOUTH);
        bullet.position.x = 500;

        var bullet2 = new ProjectileStraight(DIRECTIONS.NORTH);
        bullet2.position.x = 500;
        bullet2.position.y = 1000;

        var bullet3 = new ProjectileStraight(DIRECTIONS.WEST);
        bullet3.position.x = 1000;
        bullet3.position.y = 500;
        bullet3.speed = 100;

        var bulletBehavior = new BulletBehavior(this.coliderManager);

        bullet.SetBehaviour(bulletBehavior);
        bullet2.SetBehaviour(bulletBehavior);
        bullet3.SetBehaviour(bulletBehavior);

        bullet.SetEffect(sizeEffect);
        bullet2.SetEffect(sizeEffect1);
        bullet3.SetEffect(sizeEffect2);
        
        this.Objects.push(stone);
        this.Objects.push(stone2);
        this.Objects.push(stone3);
        this.Objects.push(stone4);
        this.Objects.push(bullet);
        this.Objects.push(bullet2);
        this.Objects.push(bullet3);
        //this.Objects.push(player);

        this.coliderManager.RegisterColidableObject(stone);
        this.coliderManager.RegisterColidableObject(stone2);
        this.coliderManager.RegisterColidableObject(stone3);
        this.coliderManager.RegisterColidableObject(stone4);
        this.coliderManager.RegisterColidableObject(bullet);
        this.coliderManager.RegisterColidableObject(bullet2);
        this.coliderManager.RegisterColidableObject(bullet3);
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
        for ( var i = 0; i < this.Objects.length; i++)
        {
            this.Objects[i].Update(deltaTime);
        }

        this.player.Update(deltaTime, this.coliderManager);

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

        var renderPlayer = this.player.RenderObject();
        this.gameRenderer.Render(renderPlayer);

        this.gameRenderer.RenderDebugCircle(renderPlayer);

        for ( var i = 0; i < this.Objects.length; i++)
        {
            var renderTime = this.Objects[i].RenderObject();
            this.gameRenderer.Render(renderTime);

            this.gameRenderer.RenderDebugCircle(renderTime);
        }



    }
}