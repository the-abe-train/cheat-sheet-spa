let clicks = 0;
let startNode, endNode;

function makeLink() {
    if (clicks === 0) {
        console.log('Start node: ' + this.name());
        startNode = this;
        clicks++;
    } else if (clicks === 1) {
        console.log('End node: ' + this.name());
        allNodes.children.forEach(nodeGroup => {
            nodeGroup.removeEventListener('click tap', makeLink)
        })
        clicks = 0;

        // Draw arrow
        endNode = this;
        drawLink(startNode, endNode);
    }
}

document.querySelector('#links-button').addEventListener('click', e => {
    allNodes.children.forEach(nodeGroup => {
        nodeGroup.addEventListener('click tap', makeLink)
    })
})

function asDegrees(radians) {
    return `${radians * (180 / Math.PI)} degrees`
}

function linkPoints(startNode, endNode) {
    // c is the top left corner of the node group
    const {x:c1x, y:c1y} = startNode.position();
    const {x:c2x, y:c2y} = endNode.position();

    // w is width of the node group, h is height
    const w1 = startNode.width()*startNode.scaleX();
    const h1 = startNode.height()*startNode.scaleY();
    const w2 = endNode.width()*endNode.scaleX();
    const h2 = endNode.height()*endNode.scaleY();

    // m is the centre of the node group
    const m1x = c1x + (w1 / 2);
    const m1y = c1y + (h1 / 2);
    const m2x = c2x + (w2 / 2);
    const m2y = c2y + (h2 / 2);

    // r is the distance from the centre of the node group to a corner
    const r1 = Math.sqrt((w1 / 2) ^ 2 + (h1 / 2) ^ 2);
    const r2 = Math.sqrt((w2 / 2) ^ 2 + (h2 / 2) ^ 2);

    // theta is the angle from the centre of one node group to another
    const theta = Math.atan2(m2y - m1y, m2x - m1x);

    // phi is the angle of the corners
    const phi = Math.atan2(h1 / 2, w1 / 2);

    // H is the vector from the centre of one node group to the centre of the 
    // next, stopping at the edge (it's like H1ypotenous)
    // The size of H depends on the size of the nodes and the angles between them 
    let H1x, H1y;

    if (theta < -Math.PI + phi) {
        H1x = -w1 / 2;
        H1y = H1x * Math.tan(theta);
        H2x = -w2 / 2;
        H2y = H2x * Math.tan(theta);
    } else if (theta < -Math.PI / 2) {
        H1y = -h1 / 2;
        H1x = H1y / Math.tan(theta);
        H2y = -h2 / 2;
        H2x = H2y / Math.tan(theta);
    } else if (theta < -phi) {
        H1y = -h1 / 2;
        H1x = H1y / Math.tan(theta);
        H2y = -h2 / 2;
        H2x = H2y / Math.tan(theta);
    } else if (theta < 0) {
        H1x = w1 / 2;
        H1y = H1x * Math.tan(theta);
        H2x = w2 / 2;
        H2y = H2x * Math.tan(theta);
    } else if (theta < phi) {
        H1x = w1 / 2;
        H1y = H1x * Math.tan(theta);
        H2x = w2 / 2;
        H2y = H2x * Math.tan(theta);
    } else if (theta < Math.PI / 2) {
        H1y = h1 / 2;
        H1x = H1y / Math.tan(theta);
        H2y = h2 / 2;
        H2x = H2y / Math.tan(theta);
    } else if (theta < Math.PI - phi) {
        H1y = h1 / 2;
        H1x = H1y / Math.tan(theta);
        H2y = h2 / 2;
        H2x = H2y / Math.tan(theta);
    } else if (theta < Math.PI) {
        H1x = -w1 / 2;
        H1y = H1x * Math.tan(theta);
        H2x = -w2 / 2;
        H2y = H2x * Math.tan(theta);
    }

    // Final arrow points
    const points = {
        x: m1x,
        y: m1y,
        points: [H1x, H1y, m2x - m1x - H2x, m2y - m1y - H2y]
    }

    return points
}

function drawLink(startNode, endNode) {

    const arrow = new Konva.Arrow({
        ...linkPoints(startNode, endNode),
        tension: 0,
        pointerLength: 5,
        pointerWidth: 5,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4,
        start: startNode,
        end: endNode,
    });
    arrow.update = function() {this.setAttrs(linkPoints(startNode, endNode))}
    layer.add(arrow);
    layer.draw();

    // Adjust arrow upon moving or scaling either node
    startNode.on('dragmove', e => arrow.update());
    startNode.on('transform', e => arrow.update());
    endNode.on('dragmove', e => arrow.update());
    endNode.on('transform', e => arrow.update());
}
