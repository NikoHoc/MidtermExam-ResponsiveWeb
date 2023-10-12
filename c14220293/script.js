let noteCount = 0;
let titleNote = "";
let note = "";
let colorBg = "";
let titleID = "";
let noteID = "";
let colID = "";
let listNote = [];

function addMessage() {
  if ($("#titleInput").val() == "" || $("#noteText").val() == "") {
    alert("Please Type Something");
  } else {
    titleNote = $("#titleInput").val();
    note = $("#noteText").val();
    colorBg = $("#colorInput").val();
    titleID = "title" + noteCount;
    noteID = "note" + noteCount;
    colID = "newNote" + noteCount;

    $("#inputCol").append(
      `<div class="col-lg-2 col-md-3">
            <div class="card mb-3 text-bg-` + colorBg + `" style="max-width: 18rem;" id="` + colID + `">
                <div class="d-flex justify-content-between card-header">
                    <h5 class="fs-4" id="` + titleID + `">` + titleNote + `</h5>
                    <button type="button" class="btn-close" aria-label="Close" onclick="deleteNote(this)"></button>
                </div>
            <div class="card-body" style="cursor: pointer;" onclick="openEditModal(this)" data-bs-toggle="modal" data-bs-target="#editNotesModal">
                <p class="card-text" id="` + noteID + `">` + note + `</p>
            </div>
        </div>
    </div>`
    );

    listNote.push({ colID, titleID, titleNote, noteID, note, colorBg });
    noteCount++;
  }

  $("#titleInput").val("");
  $("#noteText").val("");
  $("#colorInput").val("warning");
}

//temp1, temp2 untuk menyimpan id titleNote dan noteText agar tau mana yg sedang di edit
let temp1 = "#";
let temp2 = "#";
let temp3 = "";

function openEditModal(val) {
  var selectedItem = val.closest(".card");
  var tempTitle = selectedItem.querySelector(".fs-4").innerText;
  var tempNote = selectedItem.querySelector(".card-text").innerHTML;

  $("#editTitleNote").val(tempTitle);
  $("#editNoteText").val(tempNote);

  //mengambil id yg sedang dipanggil
  for (var i = 0; i < noteCount; i++) {
    if (
      listNote[i].titleNote == $("#editTitleNote").val() &&
      listNote[i].note == $("#editNoteText").val()
    ) {
      temp1 += listNote[i].titleID;
      temp2 += listNote[i].noteID;
      $("#editColorInput").val(listNote[i].colorBg);
      temp3 = listNote[i].colID;
    }
  }
}

function editNote() {
  $(temp1).html($("#editTitleNote").val());
  $(temp2).html($("#editNoteText").val());

  var tempColor = $("#editColorInput").val();

  if (tempColor == "warning") {
    document
      .getElementById(temp3)
      .setAttribute("class", "card mb-3 text-bg-" + tempColor);
  } else if (tempColor == "success") {
    document
      .getElementById(temp3)
      .setAttribute("class", "card mb-3 text-bg-" + tempColor);
  } else if (tempColor == "info") {
    document
      .getElementById(temp3)
      .setAttribute("class", "card mb-3 text-bg-" + tempColor);
  } else if (tempColor == "danger") {
    document
      .getElementById(temp3)
      .setAttribute("class", "card mb-3 text-bg-" + tempColor);
  } else if (tempColor == "light") {
    document
      .getElementById(temp3)
      .setAttribute("class", "card mb-3 text-bg-" + tempColor);
  }

  for (var i = 0; i < noteCount; i++) {
    if (
      listNote[i].titleID == temp1.slice(1, 7) &&
      listNote[i].noteID == temp2.slice(1, 6)
    ) {
      listNote[i].titleNote = $("#editTitleNote").val();
      listNote[i].note = $("#editNoteText").val();
      listNote[i].colorBg = tempColor;
      console.log("aaa");
    }
  }
  temp1 = "#";
  temp2 = "#";
  temp3 = "";
}

function deleteNote(val) {
  val.closest(".col-lg-2").remove();
}