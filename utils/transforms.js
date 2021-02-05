import {stage, layer, tr} from './canvasSetup.js'

export const selectNode = e => {

    // if click on empty area - remove all selections
    if (e.target === stage) {
        tr.nodes([]);
        layer.draw();
        return;
    }

    // Was a special key pressed during click?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;

    // Change target to group
    const groupTarget = e.target.getParent();

    // Did you click on an object already in the transformer?
    const isSelected = tr.nodes().indexOf(groupTarget) >= 0;

    if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([groupTarget]);
    } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(groupTarget), 1);
        tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([groupTarget]);
        tr.nodes(nodes);
    }

    // Bring to front
    tr.zIndex(1);

    layer.draw();

}

export const deleteNode = e => {
    if (e.key === "Delete") {

        // IDs of deleted items
        const ids = []

        // Deletes nodes in transform
        tr.nodes().forEach(function (node) {
            node.destroy();
            ids.push(node._id);
        })
        tr.nodes([]);

        // Delete arrows adjacent to deleted nodes
        const arrows = layer.getChildren(node => node.getClassName() === "Arrow")
        for (let arrow of arrows) {
            start = arrow.getAttr('start');
            end = arrow.getAttr('end');
            if (ids.indexOf(start._id) >= 0 || ids.indexOf(end._id) >= 0) {
                arrow.destroy();
            }
        }
        layer.draw();
    }

}