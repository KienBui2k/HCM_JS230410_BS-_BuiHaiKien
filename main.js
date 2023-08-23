"use strict";
class Note {
    constructor(note, id = Date.now() * Math.random()) {
        this.note = note;
        this.id = id;
    }
}
class NoteManager {
    constructor() {
        var _a;
        this.listNote = [];
        let listNoteLocal = JSON.parse((_a = (localStorage.getItem("listNote"))) !== null && _a !== void 0 ? _a : "[]");
        let listNoteTemp = [];
        for (let i in listNoteLocal) {
            listNoteTemp.push(new Note(listNoteLocal[i].note, listNoteLocal[i].id));
        }
        this.listNote = listNoteTemp;
        this.renderNote();
    }
    createNote(newNote) {
        this.listNote.push(newNote);
        localStorage.setItem("listNote", JSON.stringify(this.listNote));
        this.renderNote();
    }
    renderNote() {
        let renderEl = document.querySelector(".note_body");
        let noteEl = ``;
        this.listNote.map((note, index) => {
            noteEl += `
                <div class="item_note">
                    <p>${note.note}</p>
                    <i onclick="handleDeleteNote(${note.id})" class="fa-solid fa-trash-can"></i>
                </div>
            `;
        });
        renderEl.innerHTML = noteEl;
    }
    deleteNote(id) {
        this.listNote = this.listNote.filter(note => note.id != id);
        localStorage.setItem("listNote", JSON.stringify(this.listNote));
        this.renderNote();
    }
}
const listNote = new NoteManager();
function addNewNote() {
    let noteValue = document.getElementById("note_value").value;
    if (noteValue.trim() === "") {
        const toastElement = document.getElementById("toastError");
        toastElement.innerText = "Note add failed!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000);
        return;
    }
    let newNote = new Note(noteValue);
    listNote.createNote(newNote);
    // Hiển thị thông báo toast
    const toastElement = document.getElementById("toastSuccess");
    toastElement.innerText = "Note added successfully!";
    toastElement.style.visibility = "visible";
    setTimeout(() => {
        toastElement.style.visibility = "hidden";
    }, 2000);
    document.getElementById("note_value").value = "";
}
function handleDeleteNote(id) {
    if (confirm("Do you want to delete note")) {
        listNote.deleteNote(id);
        const toastElement = document.getElementById("toastSuccess");
        toastElement.innerText = "Delete note successfully!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000);
    }
}
