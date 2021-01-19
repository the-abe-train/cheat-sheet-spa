const {x, y} = stageCentre();
let centreRect = new Konva.Rect({
    x: x-5,
    y: y-5,
    width: 10,
    height: 10,
    fill: 'blue',
})

layer.add(centreRect).draw();