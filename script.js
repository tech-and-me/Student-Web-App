$(document).ready(function () {
  // Hide all sections except for the home section
  $("section").hide();
  $("#section-home").show();

  // Binding click event to specific navigation links
  $("nav li a")
    .unbind()
    .click(function (event) {
      event.preventDefault();
      var id = $(this).attr("id");
      showOneSection(id);
    });

  //---------MAIN FUNCTIONS--------------------

  function showOneSection(navId) {
    console.log("Inside showOneSection " + navId);

    $("section").hide();
    let sectionId = "section-" + navId.replace("nav-", "");

    switch (navId) {
      case "nav-about":
        $("#" + sectionId).show();
        break;
      case "nav-displayAll":
        handleOnDisplayAll();
        break;
      case "nav-add":
        handleOnAdd();
        break;
      case "nav-update":
        handleOnUpdate();
        break;
      case "nav-delete":
        handleOnDelete();
        break;
      case "nav-searchById":
        handleOnSearchById();
        break;
      case "nav-searchByName":
        handleOnSearchByName();
      default:
        $("#section-home").show();
    }

    $("#" + sectionId).show();
  }

  function handleOnDisplayAll() {
    console.log("Inside handleOnDisplayAll");
    // Fetch students data
    getAllStudents()
      .done(function (students) {
        console.log(students);
        // Display student data
        displayStudentsTable(students);
      })
      .fail(function (xhr, status, error) {
        console.log(error);
      });
  }

  function handleOnAdd() {
    $("#section-add form").submit(function (event) {
      event.preventDefault();
      //Get form data
      var formData = getStudentFromForm();
      console.log(formData);
      sendStudentDataToBackend(formData);
      // Reset the form
      $(this).trigger("reset");
    });
  }

  function handleOnUpdate() {}

  function handleOnDelete() {}

  //--------Utitlity functions-----------------
  function displayStudentsTable(students) {
    // console.log("All students", students);
    // console.log("Student[0]", students[0]);
    console.log("inside displayStudentsTable");
    const $tableBody = $("#section-displayAll tbody");
    $tableBody.empty(); // Clear the existing table rows

    students.forEach((student) => {
      const $row = $("<tr>");
      $row.html(`
      <th scope="row">${student.stuid}</th>
      <td>${student.name}</td>
      <td>${student.mob}</td>
      <td>${student.addr}</td>
    `);
      $tableBody.append($row);
    });
  }

  function getStudentFromForm() {
    console.log("Inside getStudentFromForm");
    let student = {
      stuid: $("#stuid").val(),
      name: $("#name").val(),
      age: $("#age").val(),
      mob: $("#mob").val(),
      addr: $("#addr").val(),
    };

    return student;
  }

  function sendStudentDataToBackend(formData) {
    console.log("Inside sendStudentDataToBackend");
    $.ajax({
      type: "POST",
      url: "http://localhost:9900/students",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  }

  function getAllStudents() {
    console.log("Inside getAllStudents");
    return $.ajax({
      type: "GET",
      url: "http://localhost:9900/students",
    });
  }
}); //end of document.ready
