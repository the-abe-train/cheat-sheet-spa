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
        const uuid = Date.now();
        const element = {
            id: uuid,
            type: this.dataset.type,
            name: document.getElementById("varname").value,
            symbol: document.getElementById("varsymbol").value,
            desc: document.getElementById("vardesc").value
        }
        createElement(element);
        this.reset();
    })
})

function activateItem(li) {
    const list = li.parentElement;
    [...list.children].forEach(li => li.classList.remove('active'));
    li.classList.add('active');
}

function createElement(el) {
    const label = el.type === 'variable' ? `${el.name} (${el.symbol})` : `${el.symbol}`

    const listId = `${el.type}s-menu`;
    const list = document.getElementById(listId);
    const listItem = document.createElement('a');
    const listItemText = document.createTextNode(label);

    listItem.appendChild(listItemText);
    list.appendChild(listItem);

    activateItem(listItem)

    listItem.addEventListener('click', function (e) {
        activateItem(this);
    })

}
