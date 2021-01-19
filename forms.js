// Open form
document.querySelectorAll('.add-element').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const popupId = this.dataset.target;
        document.querySelector('#' + popupId).style.display = 'block';
    })
})

// Close form
document.querySelectorAll('.close-button').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const popupId = this.parentElement.parentElement.id;
        document.querySelector('#' + popupId).style.display = 'none';
    })
})

// Drag and drop form?

// Submit form
document.querySelectorAll('.form-container').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        this.parentElement.style.display = 'none';
        const formElements = [...this.elements];
        const uuid = Date.now();
        const element = {
            id: uuid,
            type: this.dataset.type,
            name: formElements.find(el => el.name === 'name').value,
            symbol: formElements.find(el => el.name === 'symbol').value,
            desc: formElements.find(el => el.name === 'desc').value
        }
        createElement(element);
        this.reset();
    })
})

function activateItem(li) {

    // Remove active selection from both lists
    const lists = document.querySelectorAll('.vertical-menu');
    lists.forEach(list => {
        [...list.children].forEach(li => li.classList.remove('active'))
    })

    // Add active class to selection
    li.classList.add('active');
}

function createElement(el) {
    const listLabel = el.type === 'variable' ? `${el.name} (${el.symbol})` : `${el.symbol}`

    const listId = `${el.type}s-menu`;
    const list = document.getElementById(listId);
    const listItem = document.createElement('a');
    const listItemText = document.createTextNode(listLabel);

    listItem.appendChild(listItemText);
    list.appendChild(listItem);

    activateItem(listItem)

    listItem.addEventListener('click', function (e) {
        activateItem(this);
    })

    // Making the node on the canvas
    const size = {
        width: 200,
        height: 100
    }

    const groupPosition = {
        x: (stage.width() - size.width) / 2,
        y: (stage.height() - size.height) / 2,
    }

    const nodePosition = {
        x: 0,
        y: 0
    }

    const nodeGroup = new Konva.Group({
        ...groupPosition,
        ...size,
        name: listLabel,
        draggable: true
    })

    const rect = new Konva.Rect({
        ...nodePosition,
        ...size,
        fill: 'white',
        stroke: 'black',
        cornerRadius: 5,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.2
    })

    const text = new Konva.Text({
        ...nodePosition,
        ...size,
        text: listLabel,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#555',
        padding: 20,
        align: 'center',
        verticalAlign: 'middle',
        transformsEnabled: 'none'  // need to fix these transforms
    })

    nodeGroup.add(rect, text);
    allNodes.add(nodeGroup);
    // layer.add(nodeGroup);


    layer.draw();

}
