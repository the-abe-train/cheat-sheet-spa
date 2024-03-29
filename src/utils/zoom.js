import { stage, layer, tr, allArrows, allNodes } from './canvasSetup'

// Dynamic resize canvas when resizing window
export function fitZoom() {

  const pageHeight = window.innerHeight;
  const pageWidth = window.innerWidth;
  const sidebarWidth = document.querySelector(".sidenav").clientWidth;

  const containerWidth = pageWidth - sidebarWidth;
  const containerHeight = pageHeight;

  stage.width(containerWidth);
  stage.height(containerHeight);
  stage.draw();
}



// Zoom function
export function zoom(direction, point, scaleBy = 1.2) {
  const oldScale = stage.scaleX();

  const pointVector = {
    x: (point.x - stage.x()) / oldScale,
    y: (point.y - stage.y()) / oldScale,
  };

  const newScale = direction === 'in' ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scale({ x: newScale, y: newScale });

  const newPos = {
    x: point.x - pointVector.x * newScale,
    y: point.y - pointVector.y * newScale,
  };
  stage.position(newPos);
  stage.batchDraw();
}

// Zoom with scroll wheel
export const scrollZoom = e => {
  e.evt.preventDefault();
  const direction = e.evt.deltaY > 0 ? 'out' : 'in'
  zoom(direction, stage.getPointerPosition(), 1.03)
}


// Get centre of screen
export function stageCentre() {
  // Get the relative centre of the stage
  return {
    x: stage.width() / 2,
    y: stage.height() / 2,
  }
}

// Recentre screen
export const recentreZoom = (e) => {

  function recentre() {

    // Get midpoint of all shapes
    const midpoints = allNodes.getChildren().map(node => {
      const { x, y } = node.position();
      const { width, height } = node.size();
      return {
        x: x + (width / 2),
        y: y + (height / 2)
      }
    })

    // Get centre of mass of all shapes
    // Geometric median might be better here, but hard to implement
    const geoCentre = midpoints.reduce((acc, curr, idx, src) => {
      acc.x += curr.x / src.length;
      acc.y += curr.y / src.length;
      return acc
    }, { x: 0, y: 0 })

    // Find absolute centre of canvas
    const centre = stageCentre();

    // Get vector from geo centre -> screen centre
    const vector = {
      x: centre.x - geoCentre.x,
      y: centre.y - geoCentre.y
    }

    // Move all shapes by vector
    allNodes.getChildren().forEach(node => node.move(vector));
  }

  function checkBounds() {
    const scale = stage.scaleX();

    // Bounds of the visible stage
    const bounds = document.querySelector('#container').getBoundingClientRect();

    // Get absolute bounds of all nodes ()
    const edges = allNodes.getChildren().reduce((acc, node) => {
      return {
        top: Math.min(acc.top, bounds.top + stage.y() + scale * node.y()),
        right: Math.max(acc.right, bounds.left + stage.x() + scale * (node.x() + node.width())),
        bottom: Math.max(acc.bottom, bounds.top + scale * (node.y() + node.height())),
        left: Math.min(acc.left, bounds.left + stage.x() + scale * node.x())
      }
    }, {  // Start with middle of stage
      top: stageCentre().y,
      right: stageCentre().x,
      bottom: stageCentre().y,
      left: stageCentre().x
    })

    const outOfBounds = [
      edges.top < bounds.top,
      edges.right > bounds.right,
      edges.bottom > bounds.bottom,
      edges.left < bounds.left
    ].some(bound => bound === true)

    // console.log(JSON.stringify(edges));

    return outOfBounds
  }

  // Reset basic canvas positions and vectors
  stage.scale({ x: 1, y: 1 })
  stage.position({ x: 0, y: 0 })
  allNodes.position({ x: 0, y: 0 })

  // Initial recentre
  recentre();

  // Zoom until all shapes within bounds
  let outOfBounds = checkBounds();
  while (outOfBounds) {
    zoom('out', stageCentre());
    recentre();
    outOfBounds = checkBounds();
  }

  // Redraw arrows
  // const arrows = allArrows.getChildren(node => node.getClassName() === "Arrow")

  for (let arrow of allArrows.getChildren()) {
    arrow.update();
  }

  // Redraw layer
  layer.draw();
}
