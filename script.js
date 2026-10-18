let notes = [];

const form = document.getElementById("note-form");
const noteInput = document.getElementById("note");
const categorySelect = document.getElementById("category");
const notesList = document.getElementById("notes-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

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

    li.append(textEl, label, dateEl, document.createElement("br"), deleteBtn);
    notesList.appendChild(li);
  });
}