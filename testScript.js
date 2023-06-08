//--------------- MAIN ---------------

//---add student
const form = document.getElementById("studentForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const student = Object.fromEntries(formData.entries());
  console.log(student);
  await saveStudent(student);
  form.reset();
});

//--display all




//FUNCTIONS------------------
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
