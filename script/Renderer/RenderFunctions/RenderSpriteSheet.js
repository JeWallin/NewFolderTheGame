
function RenderSpriteSheet(renderContext, renderObject)
{
    var image = renderObject.GetImage();
    var spriteSheetVector = renderObject.GetSpriteSheetVector();
    var scale = renderObject.GetScaleVector();

    var currentSprite = renderObject.GetCurrentSprite();

    var row = Math.floor( currentSprite / spriteSheetVector.x );
    var col = currentSprite - ( row * spriteSheetVector.x );

    var width = image.width / spriteSheetVector.x;
    var height = image.height / spriteSheetVector.y;

    console.log(renderObject);

    renderContext.drawImage(image, col*height, row*width, width, height, -scale.x/2, -scale.y/2, scale.x, scale.y);
}