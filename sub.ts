// console.log("hello")

// class Note {
//     id: number
//     note: string
//     constructor (note: string, id: number = Date.now() * Math.random()) {
//         this.note = note
//         this.id = id
//     }
// }

// class NoteManager {
//     notes: Note[] = [];
//     constructor () {
//         let notesLocal = JSON.parse((localStorage.getItem("notes")) ?? "[]");

//         let notesTemp = []

//         for (let i in notesLocal) {
//             notesTemp.push(new Note(notesLocal[i].note, notesLocal[i].id))
//         }

//         this.notes = notesTemp 
//         this.render();
//     }

//     createNote(newNote: Note ) {
//         this.notes.push(newNote);
//         localStorage.setItem("notes", JSON.stringify(this.notes));
//         this.render();
//     }

//     deleteNote(id: number) {
//         this.notes = this.notes.filter(note => note.id != id);
//         localStorage.setItem("notes", JSON.stringify(this.notes));
//         this.render();
//     }
 
//     render(): void {
//         let renderEl = document.getElementById("list-notes") as HTMLElement;
//         let noteString = ``;
//         this.notes.map((note, index) => {
//             noteString += `
//                 <div>
//                     <p>${note.note}</p>
//                     <button>
//                         <span class="material-symbols-outlined" onclick="handleDeleteNote(${note.id})">
//                             delete
//                         </span>
//                     </button>
//                 </div>
//             `
//         })
//         renderEl.innerHTML = noteString;
//     }
// }


// const notes = new NoteManager();

// function addNewNote() {
//     let noteValue = (document.getElementById("note") as HTMLInputElement).value
//     let newNote = new Note(noteValue);
//     notes.createNote(newNote);
//     alert("Note added successfully!");
// }

// function handleDeleteNote(id: number) {
//     if (confirm("Do you want to delete note")) {
//         notes.deleteNote(id);
//         alert("Delete note successfully!");
//     }
// }
