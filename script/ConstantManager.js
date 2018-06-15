
const graphicAssets = 
{
    ROCK: { image: document.getElementById("rockImage"), spriteSheet: new vector2d( 1 , 1 ), numSprites: 1},
    PLAYER: { image: document.getElementById("playerImage"), spriteSheet: new vector2d( 1 , 1 ), numSprites: 1},
    SLIMERAIN: { image: document.getElementById("slimeRainImage"), spriteSheet: new vector2d( 6 , 4 ), numSprites: 24},
    FIREBALL: { image: document.getElementById("fireSpriteImage"), spriteSheet: new vector2d( 5 , 4 ), numSprites: 18},
};

const DIRECTIONS = {NORTH: 1, WEST: 2, SOUTH: 3, EAST: 4 };
const KEYS = {UP:38, DOWN:40, RIGHT:39, LEFT:37, W:87, A:65, S:83, D:68, SPACE:32, Q:81, E:69, R:82, K:75, L:76, J:74, O:79, I:73, P:80, U:85};

