// Dynamic resize canvas when resizing window
function fitStageIntoParentContainer() {

    const pageHeight = window.innerHeight;
    const pageWidth = window.innerWidth;
    const sidebarWidth = document.querySelector(".sidenav").clientWidth;

    const containerWidth = pageWidth - sidebarWidth;
    const containerHeight = pageHeight;

    stage.width(containerWidth);
    stage.height(containerHeight);
    stage.draw();
}

fitStageIntoParentContainer()
window.addEventListener('resize', fitStageIntoParentContainer);

// Zoom function
function zoom(direction, point, scaleBy) {
    const oldScale = stage.scaleX();

    const pointVector = {
        x: (point.x - stage.x()) / oldScale,
        y: (point.y - stage.y()) / oldScale,
    };

    const newScale = direction === 'out' ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
        x: point.x - pointVector.x * newScale,
        y: point.y - pointVector.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
}

// Zoom with scroll wheel
const scaleBy = 1.03;
stage.on('wheel', (e) => {
    e.evt.preventDefault();
    const direction = e.evt.deltaY > 0 ? 'out' : 'in'
    zoom(direction, stage.getPointerPosition(), scaleBy)
})

// Get centre of screen
function stageCentre() {
    // Get the relative centre of the stage
    return {
        x: stage.x() + stage.width() / 2,
        y: stage.y() + stage.height() / 2,
    }
}

// Recentre screen
document.querySelector('#centre').addEventListener('click', (e) => {

    function recentre() {

        // Get midpoint of all shapes
        const midpoints = group.getChildren().map(node => {
            const { x, y } = node.position();
            const { width, height } = node.size();
            return {
                x: x + (width / 2),
                y: y + (height / 2)
            }
        })

        // Get geometric centre of all shapes
        const geoCentre = midpoints.reduce((acc, curr, idx, src) => {
            acc.x += curr.x / src.length;
            acc.y += curr.y / src.length;
            return acc
        }, { x: 0, y: 0 })

        // Find absolute centre of canvas
        const leftBound = document.querySelector(".sidenav").clientWidth;
        const centre = {
            x: (window.innerWidth - leftBound) / 2,
            y: window.innerHeight / 2
        };

        // Get vector from geo centre -> screen centre
        const vector = {
            x: centre.x - geoCentre.x,
            y: centre.y - geoCentre.y
        }

        // Move all shapes by vector
        group.getChildren().forEach(node => node.move(vector));
    }

    function checkBounds() {
        const scale = stage.scaleX();
        const leftBound = document.querySelector(".sidenav").clientWidth;

        // Get absolute bounds of all nodes ()
        const edges = group.getChildren().reduce((acc, node) => {
            return {
                top: Math.min(acc.top, stage.y() + scale * node.y()),
                right: Math.max(acc.right, leftBound + stage.x() + scale * (node.x() + node.width())),
                bottom: Math.max(acc.bottom, stage.y() + scale * (node.y() + node.height())),
                left: Math.min(acc.left, leftBound + stage.x() + scale * node.x())
            }
        }, {  // Start with middle of stage
            top: this.stageCentre()['y'],
            right: this.stageCentre()['x'],
            bottom: this.stageCentre()['y'],
            left: this.stageCentre()['x']
        })
        const outOfBounds = [  // Bounds of the visible stage
            edges.top < 0,
            edges.right > window.innerWidth,
            edges.bottom > window.innerHeight,
            edges.left < leftBound
        ].some(bound => bound === true)

        // console.log(JSON.stringify(edges));
        
        return outOfBounds
    }

    // Reset basic canvas positions and vectors
    stage.scale({ x: 1, y: 1 })
    stage.position({ x: 0, y: 0 })
    group.position({ x: 0, y: 0 })

    // Initial recentre
    recentre();

    // Zoom until all shapes within bounds
    let outOfBounds = checkBounds();
    while (outOfBounds) {
        zoom('out', stageCentre(), 0.9);
        recentre();
        outOfBounds = checkBounds();
    }

    // Redraw layer
    layer.draw();
})

// Zoom buttons
document.querySelector('#zoomin').addEventListener('click', e => {
    zoom('in', stageCentre(), 1.01);
})
document.querySelector('#zoomout').addEventListener('click', e => {
    zoom('out', stageCentre(), 1.01);
})