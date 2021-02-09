import {stage, layer, tr, allArrows, allNodes} from './utils/canvasSetup.js'
import {selectNode, deleteNode} from './utils/transforms.js'
import {stageCentre, zoom, fitZoom, scrollZoom, recentreZoom} from './utils/zoom.js'
import {openForm, closeForm, newElement} from './utils/forms.js'
import {newLink} from './utils/arrows.js'



// Add main layer to stage
stage.add(layer);

// Create empty transformer and add to layer
tr.nodes([]);
layer.add(tr);

// Add group of all arrows to layer
layer.add(allArrows)

// Add gropu of all nodes to layer
// allNodes.add(rect1, rect2);
layer.add(allNodes);

// Draw layer
layer.draw();

// Transforms
// Set rule for selection shapes by clicking on them
stage.on('click tap', selectNode)

// Delete selected nodes
document.addEventListener('keydown', deleteNode)

// Zooms
fitZoom()
window.addEventListener('resize', fitZoom);
stage.on('wheel', scrollZoom);
document.querySelector('#centre').addEventListener('click', recentreZoom)

// Zoom buttons
document.querySelector('#zoomin').addEventListener('click', e => {
    zoom('in', stageCentre());
})
document.querySelector('#zoomout').addEventListener('click', e => {
    zoom('out', stageCentre());
})

// Forms
document.querySelectorAll('.add-element').forEach(openForm)
document.querySelectorAll('.close-button').forEach(closeForm)
document.querySelectorAll('.form-container').forEach(newElement)

// Arrows
document.querySelector('#links-button').addEventListener('click', newLink)