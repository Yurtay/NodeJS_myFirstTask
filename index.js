const yargs = require('yargs')
const {addNote, getNote, deleteNote} = require('./notes.controller')

yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        }
    },
   handler ({ title }) {
        addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler () {
        const notes = await getNote()
        console.log("Here is the list of notes:")
        notes.map((note) => console.log(note.id + " " + note.title))


    }
})

yargs.command({
    command: 'remove',
    describe: 'Delete selected notes',
    builder: {
        id: {
            type: "string",
            describe: "id note",
            demandOption: true,
        }
    },
    handler ({ id }) {
        deleteNote(id)
    }
})

yargs.parse()