let notes = [];

const form = document.getElementById("note-form");
const noteInput = document.getElementById("note");
const categorySelect = document.getElementById("category");
const notesList = document.getElementById("notes-list");
const errorMessage = document.getElementById("error-message");
const noteCount = document.getElementById("note-count");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Valid note: clear the error
  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  renderNotes();
  noteInput.value = "";
});

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  renderNotes();
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach(function (note) {
    const li = document.createElement("li");
    li.classList.add("note", "category-" + note.category.toLowerCase());

    const textEl = document.createElement("p");
    textEl.textContent = note.text;

    const label = document.createElement("small");
    label.textContent = note.category;

    const dateEl = document.createElement("small");
    dateEl.textContent = " · " + note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    li.append(textEl, label, dateEl, document.createElement("br"), deleteBtn);
    notesList.appendChild(li);
  });

  updateCount();
}

// Show the count when the page first loads
renderNotes();