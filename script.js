//FUNCTIONS------------------

// Display selected section Using JQUERY AND AJAX
function showSection(sectionId) {
  // Hide all sections
  $("section").hide();

  // Update student table
  if (sectionId == "displayAll") {
    $.ajax({
      url: "http://localhost:9900/students",
      method: "GET",
      success: function (students) {
        displayStudentsTable(students);
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
  // Show the section with the specified ID
  $("#" + sectionId + "-section").show();
}

function displayStudentsTable(students) {
  console.log("All students", students);
  console.log("Student[0]", students[0]);

  const $tableBody = $("#displayAll-section tbody");
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

//Main---------------------

// Hide all and show home page on page loaded
// window.addEventListener("load", showSection("home"));
$(document).ready(function () {
  showSection("home");
});
