import { stage, layer, tr, allArrows, allNodes } from './canvasSetup'

// Open form
export const openForm = btn => {
  btn.addEventListener('click', function (e) {
    console.log(btn.id)
    const popupId = this.dataset.target;
    const popup = document.querySelector('#' + popupId)
    popup.style.display = 'block';
    popup.querySelector('input').focus();

  })
}

// Close form
export const closeForm = btn => {
  btn.addEventListener('click', function (e) {
    const popupId = this.parentElement.parentElement.id;
    document.querySelector('#' + popupId).style.display = 'none';
  })
}

// Submit form
export const newElement = form => {
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
}

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
  const listItem = document.createElement('p');
  const listItemText = document.createTextNode(listLabel);

  listItem.appendChild(listItemText);
  list.appendChild(listItem);

  activateItem(listItem)

  listItem.addEventListener('click', function (e) {
    activateItem(this);
  })

  // Making the node on the canvas
  const size = {
    width: 150,
    height: 75
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
    shadowOpacity: 0.2,
    zIndex: 1
  })

  const text = new Konva.Text({
    ...nodePosition,
    ...size,
    text: listLabel,
    fontSize: 18,
    fontFamily: 'Patrick Hand SC',
    fill: '#555',
    // padding: 20,
    align: 'center',
    verticalAlign: 'middle',
    zIndex: 2,
    transformsEnabled: 'none'  // need to fix these transforms
  })

  nodeGroup.add(rect, text);
  allNodes.add(nodeGroup);
  layer.draw();

}
