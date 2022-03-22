const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add("note", "card", "m-6", "cursor-pointer", "rounded-lg", "hover:shadow-md", "hover:border-opacity-0", "transform", "hover:-translate-y-1", "transition-all", "duration-200", "bg-white", "bg-opacity-80" ,"h-96", "overflow-y-scroll", "overflow-x-hidden", "no-scrollbar", "dark:bg-gray-800", "dark:bg-opacity-80", "dark:border-gray-700", "dark:text-white")

    note.innerHTML = `
    <div class="tools sticky top-0 z-10 text-lg text-slate-300 bg-stone-800 rounded-t-lg px-2 py-1 align-top flex justify-end space-x-2 shadow-lg dark:bg-gray-300 dark:text-slate-900">
        <button class="edit ${text ? "" : "bg-red-600 dark:bg-red-400"} rounded-md"><i class="fa-solid fa-pen-to-square px-1.5" title="Edit/Lock"></i></button>
        <button class="delete rounded-md" title="Delete"><i class="fa-solid fa-trash-can px-1.5"></i></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"} w-full h-full p-2"></div>
    <textarea class="${text ? "hidden" : ""} w-full h-full p-2 dark:bg-gray-800 dark:text-white" placeholder="Write here..."></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML =  marked.parse(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
        editBtn.classList.toggle('bg-red-600')
        editBtn.classList.toggle('dark:bg-red-400')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked.parse(value)

        updateLS()
    })

    document.getElementById('note-container').appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}