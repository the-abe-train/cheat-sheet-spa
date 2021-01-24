const { x, y } = stageCentre();
let centreRect = new Konva.Rect({
    x: x - 5,
    y: y - 5,
    width: 10,
    height: 10,
    fill: 'blue',
})

layer.add(centreRect).draw();

const size = {
    width: 150,
    height: 75
}

const groupPosition = {
    x: (stage.width() - size.width) / 2,
    y: (stage.height() - size.height) / 2,
}

const nodePosition = {
    x: 0,
    y: 0
}

const group1 = new Konva.Group({
    x: 100,
    y: 100,
    draggable: true,
    name: 'blue',
    ...size,
})

// group1.on('click', function(e) {
//     console.log(`Clicked ${this.getAttr('name')}`)
// })
// document

// group1.on('contextmenu',function(e) {
//     console.log(e);
//     console.log(`Clicked ${this.getAttr('name')}`);
// })

const rect1 = new Konva.Rect({
    x: 0,
    y: 0,
    ...size,
    fill: 'white',
    stroke: 'black',
    cornerRadius: 5,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2
})

const group2 = new Konva.Group({
    x: 400,
    y: 500,
    draggable: true,
    name: 'green',
    ...size,
})

const rect2 = new Konva.Rect({
    x: 0,
    y: 0,
    ...size,
    fill: 'white',
    stroke: 'black',
    cornerRadius: 5,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2
})

// allNodes.add(rect1, rect2);
group1.add(rect1);
group2.add(rect2);
allNodes.add(group1, group2);


layer.draw();