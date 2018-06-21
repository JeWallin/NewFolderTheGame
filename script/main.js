main();

var game;
var lastUpdate;

function main ()
{

    game = new NewFolderTheGame("screen");

    //game.Init();

    lastUpdate = Date.now();

    tick();
}

function loadMap(map)
{
	game.mapManager.LoadMap(map);
}

function MapIsloaded()
{
	game.mapManager.GenerateMap();
}

function InitGameNow()
{
	game.Init();
}

function KeyDown(event)
{
    game.Input(event.keyCode, true);
}

function KeyUp(event)
{
    game.Input(event.keyCode, false);
}

function tick()
{
    var updated = Date.now();
    var deltaTime =  (updated - lastUpdate)*0.001;

    lastUpdate = updated;

    game.Update(deltaTime);

    game.Render();

    requestAnimationFrame(tick);
}