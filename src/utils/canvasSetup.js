// Build default stage
export let stage = new Konva.Stage({
  container: "container",
  height: 100,
  width: 100,
  draggable: true
});

// Create layer and add layer to stage
export let layer = new Konva.Layer();

// DONT EXPORT GROUPS
// WHEN NEEDED, FIND GROUPS IN LAYER
// THIS WILL MAKE SAVING AND LOADING DATA EASIER

// Create empty transformer (selection group)
export const tr = new Konva.Transformer({
  name: 'transformer',
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
  name: 'arrows',
  x: 0,
  y: 0,
  visible: true
});

// Create new group for future nodes
export const allNodes = new Konva.Group({
  name: 'nodes',
  x: 0,
  y: 0,
  visible: true
});