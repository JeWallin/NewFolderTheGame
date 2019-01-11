
class NewFolderThePong
{
    constructor(canvasId)
    {
        console.log("NewFolderThePong Constructed");

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
        this.CreatePlayers();
        this.CreateBoarders();
    }

    Init()
    {
        console.log("NewFolderThePong Init");
    }

    Input(keyCode, isDown)
    {

    }

    Update(deltaTime)
    {

    }

    Render()
    {

    }

    CreatePlayers()
    {
        var player = new BasePlayer();
        
        var player2 = new BasePlayer();
        var playerController = new PlayerController(this.objectManager, this.keyManager, 
            KEYS.W, KEYS.S, KEYS.A, KEYS.D, KEYS.SPACE, KEYS.Q, KEYS.E);
        var player2Controller = new PlayerController(this.objectManager, this.keyManager, 
            KEYS.I, KEYS.K, KEYS.J, KEYS.L, KEYS.RIGHT, KEYS.Q, KEYS.P);
        
        player.SetPosition(500, 100);
        player.SetPosition(500, 1000);

        player.Init(playerController);
        player2.Init(player2Controller);
        
        this.objectManager.RegisterObject(player);
        this.objectManager.RegisterObject(player2);
    }

    CreateBoarders()
    {

    }
}