

function RenderImage(renderContext, renderObject)
{
    var scale = renderObject.GetScaleVector();

    /*                                              MAKE SURE WE RENDER IT IN THE MIDDLE     */
    renderContext.drawImage(renderObject.GetImage(), -scale.x/2, -scale.y/2, scale.x, scale.y);
}