function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
} 

document.querySelector('#variables-button').addEventListener('click', e => {
    document.querySelector('#variables-form').style.display = 'block'
})

document.querySelector('#close').addEventListener('click', e => {
    document.querySelector('#variables-form').style.display = 'none'
})