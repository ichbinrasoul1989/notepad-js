// variables
const noteList = document.querySelector('#note-list')
const form =document.querySelector('form')

// eventlisteners
eventlisteners()
function eventlisteners() {
    form.addEventListener('submit', addNote)

    noteList.addEventListener('click', removeNote)

    document.addEventListener('DOMContentLoaded', loadLS)
};



// functions
function addNote(event) {
    event.preventDefault()

    // get text area value
    const textArea = document.querySelector('#text-area').value

    // creating li tag for to list notes in div tag
    const li = document.createElement('li')

    //  add text area value to the list
    li.appendChild(document.createTextNode(textArea))

    // create remove button
    const removeBtn = document.createElement('a')

    // adding remove button class
    removeBtn.classList = 'remove-note'

    // append remove button X
    removeBtn.appendChild(document.createTextNode('X'))

    li.appendChild(removeBtn)
    
    // append li tag to note list
    noteList.appendChild(li)

    // save note list to local storage
    saveTolS(textArea)

    // alert for adding new notes
    alert('یادداشت شما اضافه شد')

    // reset text area
    this.reset()

};

// define remove note function
function removeNote(event) {

    // delegation of remove button
    if (event.target.classList.contains('remove-note')) {
        event.target.parentElement.remove()
    }

    removeFromLS(event.target.parentElement.innerText)
};

// define save to local storage function
function saveTolS(notes) {
    let newNotes = getFromLS()
    newNotes.push(notes)

    localStorage.setItem('my-notes', JSON.stringify(newNotes))

};

// check if there's old notes in local storage function
function getFromLS() {
    let oldNotes;
    if (localStorage.getItem('my-notes') === null) {
        oldNotes = []
    } else {
        oldNotes = JSON.parse(localStorage.getItem('my-notes'))
    }
    return oldNotes
};

// define load local storage function
function loadLS() {
    const oldNotes = getFromLS()

    oldNotes.forEach(oldNote => {

        // create li tag
        const li = document.createElement('li')

        li.appendChild(document.createTextNode(oldNote))

        // create remove button
        const removeBtn = document.createElement('a')

        // adding class and text to remove button
        removeBtn.classList = 'remove-note'
        removeBtn.textContent = 'X'

        // append remove button to li tag
        li.appendChild(removeBtn)

        // append li tag to note list
        noteList.appendChild(li)
    });
};

// define function remove from local storage
function removeFromLS(noteContent) {

    // delete X from the content
    const noteDelete = noteContent.substring(0, noteContent.length - 1)

    // get notes from local storage
    const notesFromLS = getFromLS()

    notesFromLS.forEach((noteFromLS, index) => {
        if (noteFromLS === noteDelete) {
            notesFromLS.splice(index, 1)
            console.log(index)
        }
    });

    // set new array to local storage
    localStorage.setItem('my-notes', JSON.stringify(notesFromLS))
};