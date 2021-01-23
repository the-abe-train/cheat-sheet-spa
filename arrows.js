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
        endNode = this;
        drawLink(startNode, endNode);
        clicks = 0;
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

function drawLink(startNode, endNode) {

    // w is width of the node group, h is height
    const w1 = startNode.width();
    const h1 = startNode.height();
    const w2 = endNode.width();
    const h2 = endNode.height();

    // c is the top left corner of the node group
    const c1x = startNode.x();
    const c1y = startNode.y();
    const c2x = endNode.x();
    const c2y = endNode.y();

    // m is the centre of the node group
    const m1x = c1x + w1 / 2;
    const m1y = c1y + h1 / 2;
    const m2x = c2x + w2 / 2;
    const m2y = c2y + h2 / 2;

    // r is the distance from the centre of the node group to a corner
    const r1 = Math.sqrt((w1 / 2) ^ 2 + (h1 / 2) ^ 2);
    const r2 = Math.sqrt((w2 / 2) ^ 2 + (h2 / 2) ^ 2);

    // theta is the angle from the centre of one node group to another
    // phi is the angle from the end node back to the first
    const theta = Math.atan2(m2y - m1y, m2x - m1x);
    // const phi = Math.PI + theta;

    // H is the vector from the centre of one node group to the centre of the 
    // next, stopping at the edge (it's like Hypotenous)
    let Hx, Hy;
    const piOver4 = Math.PI / 4;
    // const circleSection = Math.sin(theta - Math.PI / 4)
    if (theta < -3*piOver4) {
        H1x = -w1 / 2;
        H1y = H1x * Math.tan(theta);
    } else if (theta < -2 * piOver4) {
        H1y = -h1 / 2;
        H1x = H1y / Math.tan(theta);
    } else if (theta < -1 * piOver4) {
        H1y = -h1 / 2;
        H1x = H1y / Math.tan(theta);
    } else if (theta < 0) {
        H1x = w1 / 2;
        H1y = H1x * Math.tan(theta);
    } else if (theta < piOver4) {
        H1x = w1 / 2;
        H1y = H1x * Math.tan(theta);
    } else if (theta < 2 * piOver4) {
        H1y = h1 / 2;
        H1x = H1y / Math.tan(theta);
    } else if (theta < 3 * piOver4) {
        H1y = h1 / 2;
        H1x = H1y / Math.tan(theta);
    } else if (theta < 4 * Math.PI) {
        H1x = -w1 / 2;
        H1y = H1x * Math.tan(theta);
    }

    // Draw arrow
    const x = m1x;
    const y = m1y;
    const x1 = H1x;
    const y1 = H1y;
    const x2 = m2x - m1x - H1x;
    const y2 = m2y - m1y - H1y;

    console.log(x, y, x1, y1, x2, y2)

    const arrow = new Konva.Arrow({
        x: x,
        y: y,
        points: [x1, y1, x2, y2],
        tension: 0,
        pointerLength: 5,
        pointerWidth: 5,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4
    });
    layer.add(arrow);
    layer.draw();

    const guide = new Konva.Arrow({
        x: 0,
        y: 0,
        points: [m1x, m1y, m2x, m2y],
        tension: 0,
        pointerLength: 5,
        pointerWidth: 5,
        fill: 'blue',
        stroke: 'blue',
        opacity: 0.8,
        strokeWidth: 4
    });
    layer.add(arrow);
    // layer.add(guide, arrow);
    // layer.draw();

    // function updateLink() {
    //     arrow.points([])
    // }

    // startNode.on('dragmove', updateLink);
    // endNode.on('dragmove', updateLink);
}
