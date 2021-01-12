function recentre() {

    // Recentre stage
    stage.position({
        x: 0,
        y: 0
    })

    // Recentre group at centre of stage
    group.position({
        x: stage.width() / 2,
        y: stage.height() / 2
    })

    // Cycle through objects and add to transform
    group.getChildren().forEach(node => {
        node.position({
            x: node.x() / 2,
            y: node.y() / 2
        })
    })

    layer.draw();

}

// recenter();