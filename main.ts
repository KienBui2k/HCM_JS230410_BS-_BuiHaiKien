

class Note {
    id: number;
    note: string

    constructor (note:string,id: number = Date.now() * Math.random()) {
        this.note=note;
        this.id=id;
    }
}
class NoteManager{
    listNote: Note[] = [];
    constructor(){
        let listNoteLocal = JSON.parse((localStorage.getItem("listNote")) ?? "[]");
        let listNoteTemp = []
        for(let i in listNoteLocal){
            listNoteTemp.push(new Note(listNoteLocal[i].note,listNoteLocal[i].id))
        }
        this.listNote = listNoteTemp
    
        this.renderNote();
    }
    createNote(newNote:Note){
        this.listNote.push(newNote);
        localStorage.setItem("listNote", JSON.stringify(this.listNote));
        this.renderNote();
    }
    renderNote():void{
        let renderEl = document.querySelector(".note_body") as HTMLElement;
        let noteEl = ``;
        this.listNote.map((note,index) => {
            noteEl += `
                <div class="item_note">
                    <p>${note.note}</p>
                    <i onclick="handleDeleteNote(${note.id})" class="fa-solid fa-trash-can"></i>
                </div>
            `
        });
        renderEl.innerHTML = noteEl
    }
    deleteNote(id:number){
        this.listNote = this.listNote.filter(note => note.id != id);
        localStorage.setItem("listNote", JSON.stringify(this.listNote));
        this.renderNote();
    }
}
const listNote = new NoteManager();
function addNewNote(){
    let noteValue = (document.getElementById("note_value") as HTMLInputElement).value;
        if (noteValue.trim() === "") {
               const toastElement = document.getElementById("toastError") as HTMLElement;
        toastElement.innerText = "Note add failed!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000); 
        return; 
    }
    let newNote =  new Note(noteValue);
    listNote.createNote(newNote);
    // Hiển thị thông báo toast
        const toastElement = document.getElementById("toastSuccess") as HTMLElement;
        toastElement.innerText = "Note added successfully!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000); 

        
    (document.getElementById("note_value") as HTMLInputElement).value =""
}

function handleDeleteNote(id:number) {
    if(confirm("Do you want to delete note")){
        listNote.deleteNote(id);
        const toastElement = document.getElementById("toastSuccess") as HTMLElement;
        toastElement.innerText = "Delete note successfully!";
        toastElement.style.visibility = "visible";
        setTimeout(() => {
            toastElement.style.visibility = "hidden";
        }, 2000); 
    }
}