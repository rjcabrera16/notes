const noteID = location.hash.substring(1);
let notesData = getNotes();
let note = findNote();

const noteUpdateMessage = document.querySelector('.note-update-message');
const noteTitleInput = document.querySelector('.note-title-input');
const noteContent = document.querySelector('.note-content');

// display input value
noteUpdateMessage.textContent = generateLastEdited(note.updatedAt);
noteTitleInput.value = note.title;
noteContent.value = note.content;

// update note title using input event
noteTitleInput.addEventListener('input', function (e) {
    if (noteTitleInput.value !== '') {
        noteUpdateMessage.textContent = generateLastEdited(note.updatedAt);
        note.title = e.target.value;
        note.updatedAt = moment().valueOf();
        saveNotes();
    }
});

// update note content using input event
noteContent.addEventListener('input', function (e) {
    if (noteContent.value !== '') {
        noteUpdateMessage.textContent = generateLastEdited(note.updatedAt);
        note.content = e.target.value;
        note.updatedAt = moment().valueOf();
        saveNotes();
    }
});

// synct note input value
window.addEventListener('storage', function (e) {
    if (e.key === 'notes') {
        notesData = JSON.parse(e.newValue);
        note = findNote();
        noteUpdateMessage.textContent = generateLastEdited(note.updatedAt);
        noteTitleInput.value = note.title;
        noteContent.value = note.content;
    }
});
