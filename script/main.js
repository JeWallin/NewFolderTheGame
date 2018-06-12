main();

var game;
var lastUpdate;

function main ()
{
    game = new NewFolderTheGame("screen");

    game.Init();

    lastUpdate = Date.now();

    tick();
}

function tick()
{
    var updated = Date.now();
    var deltaTime =  updated - lastUpdate;

    lastUpdate = updated;

    game.Update(deltaTime);

    game.Render();

    requestAnimationFrame(tick);
}