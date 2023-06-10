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
            console.log("case nav-serchById");
            handleOnSearchById();
            break;
         case "nav-searchByName":
            console.log("case nav-searchByName");
            handleOnSearchByName();
            break;
         default:
            $("#section-home").show();
      }
      console.log("#" + sectionId);
      $("#" + sectionId).show();
   }

   function handleOnDisplayAll() {
      console.log("Inside handleOnDisplayAll");
      hideStudentInfoDiv();
      hideStudentNotFound();

      // Fetch students data
      fetchAllStudents()
         .done(function (students) {
            console.log(students);
            if (students == null || students.length == 0) {
               showStudentNotFound();
               hideStudentInfoDiv();
            } else {
               hideStudentNotFound();
               showStudentInfoDiv(students, "section-displayAll");
            }
         })
         .fail(function (xhr, status, error) {
            hideStudentInfoDiv();
            showStudentNotFound();
            console.log(error);
         });
   }

   function handleOnAdd() {
      $(".form-add-info").submit(function (event) {
         event.preventDefault();
         //Get form data
         let formData = getStudentFromForm();
         console.log(formData);
         sendStudentDataToBackend(formData);
         // Reset the form
         $(this).trigger("reset");
      });
   }

   function handleOnUpdate() {}

   function handleOnDelete() {}

   function handleOnSearchById() {
      hideStudentInfoForm();
      hideStudentNotFound();

      $(".form-searchById").submit(function (event) {
         event.preventDefault();
         //get search input
         let searchId = getSearchInput("section-searchById");

         //fetch studentFromBackend
         fetchStudentById(searchId)
            .done(function (student) {
               console.log(student);
               displayOneStudentInfo(student);
               hideStudentNotFound();
            })
            .fail(function (xhr, status, error) {
               console.log(error);
               showStudentNotFound();
               hideStudentInfoForm();
            });
      });
   }
   function handleOnSearchByName() {
      hideStudentInfoDiv();
      hideStudentNotFound();

      $(".form-searchByName").submit(function (event) {
         event.preventDefault();
         //get search input
         let searchName = getSearchInput("section-searchByName");
         console.log(
            "Search name passing to fetchStudentByName : " + searchName
         );
         //fetch studentFromBackend
         fetchStudentByName(searchName)
            .done(function (students) {
               console.log(students);
               if (students == null || students.length == 0) {
                  showStudentNotFound(); // working
                  hideStudentInfoDiv();
               } else {
                  hideStudentNotFound(); // working
                  showStudentInfoDiv(students, "section-searchByName");
               }
            })
            .fail(function (xhr, status, error) {
               hideStudentInfoDiv();
               showStudentNotFound();
               console.log(error);
            });
      });
   }

   //--------Utitlity functions-----------------
   function constructStudentTableBody(students, sectionId) {
      console.log("inside constructStudentTableBody");
      // Render table head

      // Render table body
      const $tableBody = $(`#${sectionId} tbody`);
      $tableBody.empty();
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

   function displayOneStudentInfo(student) {
      const $divStudentInfo = $(".div-student-info");
      $divStudentInfo.empty();
      const $divBody = $("<div>");
      $divBody.html(
         `
         <form class="px-lg-4 px-2">
                     <fieldset disabled>
                        <p>Student details :</p>
                        <hr />
                        <div class="mb-3 pt-2">
                           <div class="row mb-lg-3 mb-md-2 mb-1">
                              <label
                                 for="stuid"
                                 class="col-sm-2 col-form-label text-start"
                                 >ID</label
                              >
                              <div class="col-sm-10">
                                 <input
                                    type="number"
                                    class="form-control bg-dark text-white"
                                    id="number" value= "${student.stuid}"
                                 />
                              </div>
                           </div>
                           <div class="row mb-lg-3 mb-md-2 mb-1">
                              <label
                                 for="name"
                                 class="col-sm-2 col-form-label text-start"
                                 >Name</label
                              >
                              <div class="col-sm-10">
                                 <input
                                    type="text"
                                    class="form-control bg-dark text-white"
                                    id="name"
                                    value= "${student.name}"
                                 />
                              </div>
                           </div>
                           <div class="row mb-lg-3 mb-md-2 mb-1">
                              <label
                                 for="name"
                                 class="col-sm-2 col-form-label text-start"
                                 >Age</label
                              >
                              <div class="col-sm-10">
                                 <input
                                    type="number"
                                    class="form-control bg-dark text-white"
                                    id="age"
                                    value= "${student.age}"
                                 />
                              </div>
                           </div>
                           <div class="row mb-lg-3 mb-md-2 mb-1">
                              <label
                                 for="name"
                                 class="col-sm-2 col-form-label text-start"
                                 >Mobile</label
                              >
                              <div class="col-sm-10">
                                 <input
                                    type="text"
                                    class="form-control bg-dark text-white"
                                    id="mob" value= "${student.mob}"
                                 />
                              </div>
                           </div>
                           <div class="row mb-lg-3 mb-md-2 mb-1">
                              <label
                                 for="addr"
                                 class="col-sm-2 col-form-label text-start"
                                 >Address</label
                              >
                              <div class="col-sm-10">
                                 <input
                                    type="text"
                                    class="form-control bg-dark text-white"
                                    id="addr" value= "${student.addr}"
                                 />
                              </div>
                           </div>
                        </div>
                     </fieldset>
                  </form>
   

      `
      );

      $divStudentInfo.append($divBody);
      showStudentInfoForm();
   }

   function getSearchInput(sectionId) {
      let searchInput = $(`#${sectionId} .searchField`).val();
      console.log("Search input function return: " + searchInput);
      return searchInput;
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

   function fetchAllStudents() {
      console.log("Inside getAllStudents");
      return $.ajax({
         type: "GET",
         url: "http://localhost:9900/students",
      });
   }

   function fetchStudentById(id) {
      const stuid = parseInt(id, 10);
      console.log("Student id send to backend : " + stuid);
      if (isNaN(stuid)) {
         console.error("Invalid student ID:", id);
         return; // or handle the error appropriately
      }
      console.log("Inside fetch student by id");
      return $.ajax({
         type: "GET",
         url: "http://localhost:9900/students/" + stuid,
      });
   }

   function fetchStudentByName(name) {
      console.log("Inside fetch student by name");
      return $.ajax({
         type: "GET",
         url: "http://localhost:9900/students/name/" + name,
      });
   }

   function hideStudentNotFound() {
      console.log("inside hideStudentNotFound");
      // $(".error").hide(); // this doesnt work. not sure why.
      $(".notFound").empty();
   }

   function showStudentNotFound() {
      console.log("Inside show studentNotFound");
      const $notFoundDiv = $(".notFound");
      $notFoundDiv.empty();
      $notFoundDiv.append(` <h4 class="error d-flex align-items-center">
      <i class="fa-solid fa-circle-exclamation me-2 fa-2x"></i>
      Ooop! Student not found
   </h4>
      `);
   }

   function hideStudentInfoForm() {
      $(".div-student-info").hide();
   }

   function showStudentInfoForm() {
      $(".div-student-info").show();
   }

   function hideStudentInfoDiv() {
      $(".studentInfoDiv").hide();
   }

   function showStudentInfoDiv(students, sectionId) {
      constructStudentTableBody(students, sectionId);
      $(".studentInfoDiv").show();
   }
}); //end of document.ready
