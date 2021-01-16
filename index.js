// Step 1: Build default stage
let stage = new Konva.Stage({
    container: "konva-holder",
    height: 100,
    width: 100,
    draggable: true

});

// Step 2: Create layer and add layer to stage
let layer = new Konva.Layer();
stage.add(layer);

// Create empty transformer (selection group)
const tr = new Konva.Transformer({
    keepRatio: true,
    enabledAnchors: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
    ],
    rotateEnabled: false
});
tr.nodes([]); // need a default in transformer, so empty array
layer.add(tr);

// Write helpful messages while testing!
// const text = new Konva.Text({
//     x: 10,
//     y: 10,
//     fontFamily: 'Calibri',
//     fontSize: 20,
//     text: '',
//     fill: 'black',
// });

// function writeMessage(message) {
//     text.text(message);
//     layer.draw();
// }
// function printCoords() {
//     const { x, y } = this.position();
//     writeMessage(`${this.name()} x: ${x}, y: ${y}`);
// }


// Step 3: Create shapes
let rect1 = new Konva.Rect({
    x: 100,
    y: 100,
    fill: 'blue',
    name: 'blue',
    width: 200,
    height: 100,
    stroke: 'orange',
    strokeWidth: 12,
    cornerRadius: 12,
    draggable: true
})
// rect1.on('mouseup', printCoords);

let rect2 = new Konva.Rect({
    x: 200,
    y: 200,
    fill: 'green',
    name: 'green',
    width: 200,
    height: 100,
    stroke: 'orange',
    strokeWidth: 12,
    cornerRadius: 12,
    draggable: true
})
// rect2.on('mouseup', printCoords);

// Create new group and add layers to group
const group = new Konva.Group({
    x: 0,
    y: 0,
    visible: true
});
group.add(rect1, rect2);
layer.add(group);

// Step 4: Draw layer
// layer.add(text);
layer.draw();







// Selecting shapes
// Selection rectangle
// const selectionRectangle = new Konva.Rect({
//     fill: 'rgba(0,0,255,0.5)',
// });
// layer.add(selectionRectangle);
stage.on('click tap', e => {
    // console.log(tr)
    // console.log(tr.nodes())

    // Selection rectangle not added yet!
    // if we are selecting with rect, do nothing
    // if (selectionRectangle.visible()) {
    //     return;
    // }

    // if click on empty area - remove all selections
    if (e.target === stage) {
        tr.nodes([]);
        layer.draw();
        return;
    }

    // Was a special key pressed during click?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;

    // Did you click on an object already in the transformer?
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target]);
        tr.nodes(nodes);
    }
    layer.draw();

})