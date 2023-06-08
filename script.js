//FUNCTIONS------------------

//Display selected section
const showSection = (sectionId) => {
  // Hide all sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  //update studentable
  if (sectionId == "displayAll") {
    const fetchAndDisplayStudents = async () => {
      try {
        const students = await fetchAllStudents();
        displayStudentsTable(students);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndDisplayStudents();
  }

  // Show the selected section
  const selectedSection = document.getElementById(sectionId + "-section");
  selectedSection.style.display = "block";
};

//Save student
const saveStudent = async (student) => {
  console.log("invoked saveStudent()");
  try {
    const response = await fetch("http://localhost:9900/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      throw new Error("Error: " + response.status);
    }
  } catch (error) {
    console.error(error);
  }
};

//fetch all student
const fetchAllStudents = async () => {
  console.log("invoked fetchAllStudents()");
  try {
    const response = await fetch("http://localhost:9900/students", {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

//display student table
const displayStudentsTable = (students) => {
  console.log("All students" + students);
  console.log("Student[0] " + students[0]);
  const tableBody = document.querySelector("#displayAll-section tbody");
  tableBody.innerHTML = ""; // Clear the existing table rows
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <th scope="row">${student.stuid}</th>
            <td>${student.name}</td>
            <td>${student.mob}</td>
            <td>${student.addr}</td>`;
    tableBody.appendChild(row);
  });
};

//Main---------------------

// Hide all and show home page on page loaded
window.addEventListener("load", showSection("home"));
