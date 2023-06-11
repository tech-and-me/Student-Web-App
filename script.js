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

   // // Attach event listener to clear input field on click
   // $(".searchField").click(clearInputField);

   //---------MAIN FUNCTIONS--------------------

   function showOneSection(navId) {
      console.log("Inside showOneSection " + navId);
      hideSpinner();

      $("section").hide();
      let sectionId = "section-" + navId.replace("nav-", "");

      switch (navId) {
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
      const sectionId = "section-displayAll";
      console.log("Inside handleOnDisplayAll");
      hideStudentsInfoDiv(sectionId);
      hideStudentNotFoundOrNull();

      // Fetch students data
      fetchAllStudents()
         .done(function (students) {
            console.log(students);
            if (students == null || students.length == 0) {
               showStudentNotFoundOrNull("No student in record.");
               hideStudentsInfoDiv(sectionId);
            } else {
               hideStudentNotFoundOrNull();
               showStudentInfoDiv(students, "section-displayAll");
            }
         })
         .fail(function (xhr, status, error) {
            hideStudentsInfoDiv(sectionId);
            showStudentNotFoundOrNull(
               "Ooop!Something went wrong. Try again later!"
            );
            console.log(error);
         });
   }

   function handleOnAdd() {
      const sectionId = "section-add";
      hideSuccessMessage(sectionId);
      showFormAddInfo(sectionId, null);
   }

   function handleOnUpdate() {
      const sectionId = "section-update";
      hideStudentNotFoundOrNull();
      hideSuccessMessage(sectionId);
      setFocusOnSearchField(sectionId);
      //clear inputfield on clicked
      $(".searchField").click(function () {
         clearInputField(sectionId);
      });

      hideFormAddInfo(sectionId);

      $(`#${sectionId} .form-searchById`).submit(function (event) {
         event.preventDefault();
         //get search input
         let searchStudentId = getSearchInput(sectionId);
         if (searchStudentId == null) {
            return;
         }
         console.log("seachStudentId " + searchStudentId);

         //fetch studentFromBackend
         fetchStudentById(searchStudentId)
            .done(function (student) {
               console.log(student);
               showFormAddInfo(sectionId, student);
               hideStudentNotFoundOrNull();
            })
            .fail(function (xhr, status, error) {
               if (xhr.status === 404) {
                  showStudentNotFoundOrNull("Ooop! Student not found.");
               } else {
                  showStudentNotFoundOrNull(
                     "Ooop! Something went wrong. Try again later!"
                  );
               }
               console.log(error);
               console.log(
                  "sectionSearchByID passing to hideStudentnforForm: " +
                     sectionId
               );
               // hideFormAddInfo(sectionId);
            });
      });
   }

   function handleOnDelete() {
      console.log("Inside handle on Delete");
      const sectionId = "section-delete";
      hideStudentNotFoundOrNull();
      hideSuccessMessage(sectionId);
      setFocusOnSearchField(sectionId);
      //clear inputfield on clicked
      $(".searchField").click(function () {
         clearInputField(sectionId);
      });

      hideFormAddInfo(sectionId);

      $(`#${sectionId} .form-searchById`).submit(function (event) {
         event.preventDefault();
         //get search input
         let searchStudentId = getSearchInput(sectionId, sectionId);
         if (searchStudentId == null) {
            return;
         }
         console.log("seachStudentId " + searchStudentId);

         //fetch studentFromBackend
         fetchStudentById(searchStudentId)
            .done(function (student) {
               console.log(student);
               showFormAddInfo(sectionId, student, searchStudentId);
               hideStudentNotFoundOrNull();
            })
            .fail(function (xhr, status, error) {
               if (xhr.status === 404) {
                  showStudentNotFoundOrNull("Ooop! Student not found.");
               } else {
                  showStudentNotFoundOrNull(
                     "Ooop! Something went wrong. Try again later!"
                  );
               }
               console.log(error);
               console.log(
                  "sectionSearchByID passing to hideStudentnforForm: " +
                     sectionId
               );
               hideFormAddInfo(sectionId);
            });
      });
   }

   function handleOnSearchById() {
      const sectionSearchById = "section-searchById";
      hideStudentInfoForm(sectionSearchById);
      hideStudentNotFoundOrNull();
      setFocusOnSearchField(sectionSearchById);
      //clear inputfield on clicked
      $(".searchField").click(function () {
         clearInputField(sectionSearchById);
      });

      $(".form-searchById").submit(function (event) {
         event.preventDefault();
         //get search input
         let searchStudentId = getSearchInput(sectionSearchById);
         if (searchStudentId == null) {
            return;
         }

         //fetch studentFromBackend
         fetchStudentById(searchStudentId)
            .done(function (student) {
               console.log(student);
               displayOneStudentInfo(student, sectionSearchById);
               hideStudentNotFoundOrNull();
            })
            .fail(function (xhr, status, error) {
               if (xhr.status === 404) {
                  showStudentNotFoundOrNull("Ooop! Student not found.");
               } else {
                  showStudentNotFoundOrNull(
                     "Ooop! Something went wrong. Try again later!"
                  );
               }
               console.log(error);
               console.log(
                  "sectionSearchByID passing to hideStudentnforForm: " +
                     sectionSearchById
               );
               hideStudentInfoForm(sectionSearchById);
            });
      });
   }
   function handleOnSearchByName() {
      const sectionIdOfSearchByName = "section-searchByName";
      hideStudentsInfoDiv(sectionIdOfSearchByName);
      hideStudentNotFoundOrNull();
      // hideSuccessMessage(sectionId);

      //clear inputfield on clicked
      $(".searchField").click(function () {
         clearInputField(sectionIdOfSearchByName);
      });

      setFocusOnSearchField(sectionIdOfSearchByName);

      $(".form-searchByName").submit(function (event) {
         event.preventDefault();
         //get search input
         let searchName = getSearchInput(sectionIdOfSearchByName);
         if (searchName == null) {
            return;
         }
         console.log(
            "Search name passing to fetchStudentByName : " + searchName
         );
         //fetch studentFromBackend
         fetchStudentByName(searchName)
            .done(function (students) {
               console.log(students);
               if (students == null || students.length == 0) {
                  showStudentNotFoundOrNull("Ooop! Student not found !");
                  hideStudentsInfoDiv(sectionIdOfSearchByName);
               } else {
                  hideStudentNotFoundOrNull();
                  showStudentInfoDiv(students, "section-searchByName");
               }
            })
            .fail(function (xhr, status, error) {
               if (xhr.status === 404) {
                  showStudentNotFoundOrNull("Ooop! Student not found.");
               } else {
                  showStudentNotFoundOrNull(
                     "Ooop! Something went wrong. Try again later!"
                  );
               }
               console.log(error);
               hideStudentsInfoDiv(sectionIdOfSearchByName);
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
                  <td>${student.age}</td>
                  <td>${student.mob}</td>
                  <td>${student.addr}</td>
                  `);
         $tableBody.append($row);
      });
   }

   function displayOneStudentInfo(student, sectionId) {
      const $divStudentInfo = $(`#${sectionId} .div-student-info`);
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
      showStudentInfoForm(sectionId);
   }

   function getSearchInput(sectionId) {
      const searchInputSelector = `#${sectionId} .searchField`;
      let searchInput = $(searchInputSelector).val();
      console.log("Search input function return: " + searchInput);
      $(searchInputSelector).val("");

      // if (!searchInput) {
      //    displayNotificationMessage(sectionId, "Input cannot be empty");
      //    return null;
      // } else if (
      //    sectionId === "section-update" &&
      //    !Number.isInteger(Number(searchInput))
      // ) {
      //    displayNotificationMessage(sectionId, "Id must be an integer");
      //    return null;
      // } else if (
      //    sectionId === "section-delete" &&
      //    !Number.isInteger(Number(searchInput))
      // ) {
      //    displayNotificationMessage(sectionId, "Name must be text");
      //    return null;
      // } else {
      //    return searchInput;
      // }

      return searchInput;
   }

   function getStudentFromForm(formId) {
      console.log("Inside getStudentFromForm");
      let student = {
         stuid: $(`#${formId} #stuid`).val(),
         name: $(`#${formId} #name`).val(),
         age: $(`#${formId} #age`).val(),
         mob: $(`#${formId} #mob`).val(),
         addr: $(`#${formId} #addr`).val(),
      };

      return student;
   }

   function sendStudentDataToBackend(formData, method, sectionId, stuid) {
      console.log("Inside sendStudentDataToBackend");
      let msg = "Student details is successfully added to our records";
      let url = "http://localhost:9900/students";
      if (method == "DELETE") {
         url = `http://localhost:9900/students/${stuid}`;
         msg = "student details is successfully deleted from our records";
      } else if (method == "UPDATE") {
         msg = "student details is successfully updated in our records.";
      }

      // Disable the submit button
      const submitButton = $(`#${sectionId} input[type="submit"]`);
      submitButton.prop("disabled", true);

      $.ajax({
         type: method,
         url: url,
         data: JSON.stringify(formData),
         contentType: "application/json",
         success: function (response) {
            console.log(response);
            displayNotificationMessage(sectionId, msg);
         },
         error: function (xhr, status, error) {
            console.log(error);
         },
         complete: function () {
            //hideFormStudent
            if (method != "POST") {
               hideFormAddInfo(sectionId);
            }

            // Re-enable the submit button after the request is complete
            submitButton.prop("disabled", false);
         },
      });
   }

   function fetchAllStudents() {
      console.log("Inside getAllStudents");
      showSpinner();
      return $.ajax({
         type: "GET",
         url: "http://localhost:9900/students",
      }).always(function (response) {
         hideSpinner();
      });
   }

   function fetchStudentById(id) {
      showSpinner();
      const stuid = parseInt(id, 10);
      console.log("Student id send to backend : " + stuid);
      if (isNaN(stuid)) {
         console.error("Invalid student ID:", id);
         return;
      }
      console.log("Inside fetch student by id");
      return $.ajax({
         type: "GET",
         url: "http://localhost:9900/students/" + stuid,
      }).always(function (response) {
         hideSpinner();
      });
   }

   function fetchStudentByName(name) {
      console.log("Inside fetch student by name");
      showSpinner();
      return $.ajax({
         type: "GET",
         url: "http://localhost:9900/students/name/" + name,
      }).always(function (response) {
         hideSpinner();
      });
   }

   function hideStudentNotFoundOrNull() {
      console.log("inside hideStudentNotFoundOrNull");
      // $(".error").hide(); // this doesnt work. not sure why.
      $(".notFound").empty();
   }

   function showStudentNotFoundOrNull(msg) {
      console.log("Inside show studentNotFound");
      const $notFoundDiv = $(".notFound");
      $notFoundDiv.empty();
      $notFoundDiv.append(` <h4 class="error d-flex align-items-center my-5">
      <i class="fa-solid fa-circle-exclamation me-2 fa-2x"></i>
      ${msg}
   </h4>
      `);
   }

   function hideStudentInfoForm(sectionId) {
      $(`#${sectionId} .div-student-info`).hide();
   }

   function showStudentInfoForm(sectionId) {
      $(`#${sectionId} .div-student-info`).show();
   }

   function hideStudentsInfoDiv(sectionId) {
      const selectedDiv = "#" + sectionId + " " + ".studentInfoDiv";
      console.log("SelectedDiv is : " + selectedDiv);
      $(selectedDiv).hide();
   }

   function showStudentInfoDiv(students, sectionId) {
      constructStudentTableBody(students, sectionId);
      $(".studentInfoDiv").show();
   }

   function hideSpinner() {
      $(".spinner-border").hide();
   }

   function showSpinner() {
      $(".spinner-border").show();
   }

   function clearInputField(sectionId) {
      console.log("Inside clearInputField");
      $(".searchField").val("");
      hideSpinner();
      hideStudentsInfoDiv(sectionId);
      hideStudentInfoForm(sectionId);
      hideStudentNotFoundOrNull();
   }

   function setFocusOnSearchField(sectionId) {
      console.log("Inside setFocusOnSearchField");
      const selectedInputField = "#" + sectionId + " " + ".searchField";
      setTimeout(function () {
         $(selectedInputField).focus();
      }, 700);
   }

   function showFormAddInfo(sectionId, student, stuid) {
      const selectedFormId = `#${sectionId} .form-add-info`;
      console.log("Selected Form id : " + selectedFormId);
      let method = "POST"; //default method

      $(selectedFormId).closest("div").show();
      if (sectionId == "section-update") {
         setValueToAllFormFields(selectedFormId, student);
         disableIdField(selectedFormId);
         method = "PUT";
      } else if (sectionId == "section-delete") {
         setValueToAllFormFields(selectedFormId, student);
         disableAllFields(selectedFormId);
         method = "DELETE";
      }

      $(selectedFormId).submit(function (event) {
         event.preventDefault();
         //Get form data
         let formData = getStudentFromForm(sectionId);
         console.log("formData Send to backend" + formData);
         sendStudentDataToBackend(formData, method, sectionId, stuid);

         clearFormAddInfo(sectionId);
      });

      $(selectedFormId).on("reset", function (event) {
         cancelTransaction(sectionId);
      });
   }

   function hideFormAddInfo(sectionId) {
      $(`#${sectionId} .form-add-info`).closest("div").hide();
   }

   function setValueToAllFormFields(selectedFormId, student) {
      Object.keys(student).forEach((property) => {
         const fieldValue = student[property];
         console.log("fieldValue : " + fieldValue);
         $(selectedFormId).find(`[id="${property}"]`).val(fieldValue);
      });
   }

   function disableIdField(selectedFormId) {
      $(selectedFormId)
         .find("#stuid")
         .prop("disabled", true)
         .addClass("disableField bg-secondary text-light");
   }

   function disableAllFields(selectedFormId) {
      $(selectedFormId)
         .find(":input")
         .not(":submit, :reset, :button")
         .prop("disabled", true)
         .addClass("disableField bg-secondary text-light");
   }

   function displayNotificationMessage(sectionId, msg) {
      const successDivId = `#${sectionId} .success`;

      // Empty the successDivId
      $(successDivId).empty();

      // Create the h4 element with the desired content
      const pElement = $("<p>")
         .addClass("d-flex align-items-center py-3")
         .append(
            $("<i>").addClass("fa-solid fa-circle-exclamation me-2 fa-2x"),
            msg
         );

      // Append the h4 element to the successDivId
      $(successDivId).append(pElement);

      // Show the successDivId
      $(successDivId).show();

      // Set a timeout to hide the success message after the specified duration
      setTimeout(function () {
         hideSuccessMessage(sectionId);
      }, 3000);
   }

   function hideSuccessMessage(sectionId) {
      const successDivId = `#${sectionId} .success`;
      $(successDivId).empty();
   }

   function cancelTransaction(sectionId) {
      console.log("Inside cancelTransaction");

      // const cancelButton = `#${sectionId} button[type="reset"]`;

      if (sectionId == "section-update" || sectionId == "section-delete") {
         hideFormAddInfo(sectionId);
      }
      displayNotificationMessage(sectionId, "Transaction cancelled");
   }

   function clearFormAddInfo(sectionId) {
      const selectedFormId = `#${sectionId} .form-add-info`;
      $(selectedFormId).find("input[type=text], input[type=number]").val("");
   }
}); //end of document.ready
