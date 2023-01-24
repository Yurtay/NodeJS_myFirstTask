const fs = require('fs/promises')
const path = require('path')

const notesPath = path.join(__dirname, 'db.json')

async function addNote (title) {
    const notes = await getNote()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
}


async function getNote () {
    const notes =  await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse((notes))) ? JSON.parse(notes) : []
}

async  function deleteNote (_id) {
    const notes =  await fs.readFile(notesPath, {encoding: 'utf-8'})
    const notesArray = JSON.parse(notes)
    const newArray = notesArray.filter((note) => Number(note.id) !== Number(_id))
    await fs.writeFile(notesPath, JSON.stringify(newArray))
}

module.exports = {
    addNote, getNote, deleteNote
}
