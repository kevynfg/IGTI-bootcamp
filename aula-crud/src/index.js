window.addEventListener('load', start)

var globalNames = []
var currentIndex
var isEditing = false

function start() {
    PreventFormSubmit()
    let focusAndclear = document.querySelector('#inputNome')
    focusAndclear.focus()
    focusAndclear.value = ''
    render()
    activateInput()
}

function PreventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault()
    }

    var form = document.querySelector('form')
    form.addEventListener('submit', handleFormSubmit)
}


function activateInput() {
    function insertName(newName) {
        globalNames.push(newName)
        inputName.value = ''
        render()
    }

    function updateName(newName) {
        globalNames[currentIndex] = newName
    }

    function handleTyping(event) {

        let hasText = !!event.target.value && event.target.value.trim() !== '' 

        if(!hasText) {
            return
        }
        
        if (event.key === 'Enter') {
            if (isEditing) {
                updateName(event.target.value)
            } else {
                insertName(event.target.value)
            }
            render()
            isEditing = false
            let inputClear = document.querySelector('input#inputNome')
            inputClear.focus()
            inputClear.value = ''
        }
    }
    let inputName = document.querySelector('input#inputNome')
    inputName.addEventListener('keyup', handleTyping)
}


function render() {
    function createDeleteButton(index) {
        function deleteName() {
            globalNames.splice(index, 1)
            let focarInput = document.querySelector('input#inputNome')
            focarInput.focus()
            focarInput.value = ''
            render()
        }

        let button = document.createElement('button')
        button.classList.add('deleteButton')
        button.textContent = 'x'
        button.addEventListener('click', deleteName)
        return button

    }

    function createSpan(name, index) {
        function editItem() {
            let inputName = document.querySelector('input#inputNome')
            inputName.value = name
            inputName.focus()
            isEditing = true
            currentIndex = index
        }
        let span = document.createElement('span')
        span.classList.add('clickable')
        span.textContent = currentName

        span.addEventListener('click', editItem)
        return span
    }

    var divNames = document.querySelector('div#divNames')
    divNames.innerHTML = ''
    let ul = document.createElement('ul')

    for (let i = 0; i < globalNames.length; i++) {
        var currentName = globalNames[i]
        let li = document.createElement('li')
        let button = createDeleteButton(i)
        let span = createSpan(currentName, i)
        li.appendChild(button)
        li.appendChild(span)

        ul.appendChild(li)
        button.addEventListener('click', createDeleteButton)
    }
    divNames.appendChild(ul)
}

