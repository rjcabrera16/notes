// save notes to local storage
const saveNotes = function (notes = notesData) {
    // convert notes data to string\
    notes = JSON.stringify(notes);
    localStorage.setItem('notes', notes);
};

// get notes from local storage
const getNotes = function () {
    try {
        const notesData = JSON.parse(localStorage.getItem('notes'));
        return notesData ? notesData : [];
    } catch (error) {
        return [];
    }
};

// delete note by id
const deleteNote = function (id) {
    // get note index
    const index = notesData.findIndex(function (note) {
        return note.id === id;
    });

    // delete note if index is not -1
    if (index > -1) {
        notesData.splice(index, 1);
    }
};

// generate dom elements
const generateElements = function (note) {
    // create elements
    const noteItem = document.createElement('a');
    const noteTitle = document.createElement('a');
    const noteDate = document.createElement('small');
    const hr = document.createElement('hr');
    const textEnd = document.createElement('div');
    const noteEditBtn = document.createElement('a');
    const noteEditIcon = document.createElement('i');
    const noteDeleteBtn = document.createElement('button');
    const noteDeleteIcon = document.createElement('i');

    // appending child
    noteItem.appendChild(noteTitle);
    noteItem.appendChild(noteDate);
    noteItem.appendChild(hr);
    noteItem.appendChild(textEnd);
    textEnd.appendChild(noteEditBtn);
    textEnd.appendChild(noteDeleteBtn);
    noteEditBtn.appendChild(noteEditIcon);
    noteDeleteBtn.appendChild(noteDeleteIcon);

    // adding attributes
    noteItem.setAttribute('class', 'note-item');
    noteTitle.setAttribute('href', `note.html#${note.id}`);
    noteTitle.setAttribute('class', 'note-title');
    noteTitle.textContent = note.title;
    noteDate.setAttribute('class', 'note-date');
    noteDate.textContent = moment(note.createdAt).format('MMMM D, YYYY');
    textEnd.setAttribute('class', 'text-end');
    noteEditBtn.setAttribute('href', `note.html#${note.id}`);
    noteEditBtn.setAttribute('class', 'note-edit-btn');
    noteEditIcon.setAttribute('class', 'fa fa-edit');
    noteDeleteBtn.setAttribute('class', 'note-delete-btn');
    noteDeleteIcon.setAttribute('class', 'fa fa-trash');

    // delete note
    noteDeleteBtn.addEventListener('click', function () {
        deleteNote(note.id);
        renderNotes();
        saveNotes();
    });

    // return note item to append by note item container
    return noteItem;
};

// sort notes
const sortNotes = function (notes = notesData, temp = tempData) {
    if (temp.sort === 'Last Edited') {
        // sort by updated at
        notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (temp.sort === 'Recently Created') {
        // sort by created at
        notes.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (temp.sort === 'Alphabetically') {
        notes.sort(function (a, b) {
            // sort by alphabetically
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    return notes;
};

// render notes
const renderNotes = function (notes = notesData, temp = tempData) {
    notes = sortNotes();
    // filtered notes
    const filteredNotes = notes.filter(function (note) {
        let text = note.title.toLowerCase().includes(temp.text.toLowerCase());
        if (temp.sort === 'Last Edited') {
            console.log('asas');
        }
        return text;
    });

    // hide duplicate data
    document.querySelector('.note-item-container').innerHTML = '';

    // display notes
    filteredNotes.forEach(function (note) {
        document.querySelector('.note-item-container').appendChild(generateElements(note));
    });
};

// find note by id
const findNote = function (notes = notesData, id = noteID) {
    const noteData = notes.find(function (note) {
        return note.id === id;
    });

    // return note data if note data is found else go back to homepage
    if (noteData) {
        return noteData;
    } else {
        location.assign('index.html');
    }
};

const generateLastEdited = function (timestamp) {
    return `Last edited ${moment(timestamp).fromNow()}`;
};
