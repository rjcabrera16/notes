// notes data coming from local storage
let notesData = getNotes();

// temporary data use for filtering
const tempData = {
    text: '',
    sort: '',
};

// render current notes
renderNotes();

// search notes
document.querySelector('.note-search').addEventListener('input', function (e) {
    // change tempData.text value
    tempData.text = e.target.value;
    // render filtered notes
    renderNotes();
});

// toggle sort menu
const noteSortMenu = document.querySelector('.note-sort-menu');
document.querySelector('.note-sort-btn').addEventListener('click', function () {
    noteSortMenu.classList.toggle('active');
});

// hide sort menu
document.addEventListener('click', function (e) {
    if (!e.target.matches('.note-sort-btn')) {
        if (noteSortMenu.classList.contains('active')) {
            noteSortMenu.classList.toggle('active');
        }
    }
});

// sort notes
document.querySelectorAll('.note-sort-item').forEach(function (item) {
    item.addEventListener('click', function () {
        // change tempData.sort value
        tempData.sort = item.textContent;
        document.querySelector('.note-sort-text').textContent = tempData.sort;
        renderNotes();
    });
});

// add note
document.querySelector('.note-add-btn').addEventListener('click', function (e) {
    // prevent from refreshing page
    e.preventDefault();
    // generate id
    const id = uuidv4();
    // get timestamp
    const timestamp = moment().valueOf();
    let num = notesData.length + 1;
    // push and save to local storage
    notesData.push({
        id: id,
        title: `Note ${num}`,
        content: '',
        createdAt: timestamp,
        updatedAt: timestamp,
    });
    saveNotes();
    // go to note.html
    location.assign(`note.html#${id}`);
});

// sync note title and note date
window.addEventListener('storage', function (e) {
    if (e.key === 'notes') {
        notesData = JSON.parse(e.newValue);
        renderNotes();
    }
});
