
RenderCircle(renderContext, renderObject)
{
    renderContext.beginPath();
    renderContext.arc(renderObject.size.x / 2, renderObject.size.y / 2, (renderObject.size.x + renderObject.size.y )/4,0, 2*3.14 );
    renderContext.stroke();
}