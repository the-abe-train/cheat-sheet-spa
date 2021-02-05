// Build default stage
export let stage = new Konva.Stage({
    container: "konva-holder",
    height: 100,
    width: 100,
    draggable: true

});

// Create layer and add layer to stage
export let layer = new Konva.Layer();

// Create empty transformer (selection group)
export const tr = new Konva.Transformer({
    keepRatio: true,
    enabledAnchors: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
    ],
    rotateEnabled: false
});

// Create new group for future arrows
export const allArrows = new Konva.Group({
    x: 0,
    y: 0,
    visible: true
});

// Create new group for future nodes
export const allNodes = new Konva.Group({
    x: 0,
    y: 0,
    visible: true
});