$(document).ready(function() {
  /* global moment */
  // responseContainer holds all of our posts
  var responseContainer = $(".response-container");
  var responseCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleResponseDelete);
  $(document).on("click", "button.edit", handleResponseEdit);
  responseCategorySelect.on("change", handleCategoryChange);
  var posts;

  // This function grabs responses from the database and updates the view
  function getResponses(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/responses" + categoryString, function(data) {
      console.log("Responses", data);
      responses = data;
      if (!responses || !responses.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete responses
  function deleteResponse(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/response/" + id
    })
    .done(function() {
      getResponses(responseCategorySelect.val());
    });
  }

  // Getting the initial list of responses
  getResponses();
  // InitializeRows handles appending all of our constructed response HTML inside
  // responseContainer
  function initializeRows() {
    responseContainer.empty();
    var responsesToAdd = [];
    for (var i = 0; i < responses.length; i++) {
      responsesToAdd.push(createNewRow(responses[i]));
    }
    responseContainer.append(responsesToAdd);
  }

  // This function constructs a response's HTML
  function createNewRow(response) {
    var newResponsePanel = $("<div>");
    newResponsePanel.addClass("panel panel-default");
    var newResponsePanelHeading = $("<div>");
    newResponsePanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newResponseSee = $("<h3>");
    var newResponseName = $("<h3>");
    var newResponseExpect = $("<h3>");
    var newResponseDate = $("<small>");

    var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");
    var newPostBody = $("<p>");

    newResponseSee.text(response.see + " ");
    newResponseName.text(response.name);
    newResponseExpect.text(response.expect);
    newResponseDate.text(response.date);
    newResponsePanelHeading.append(deleteBtn);
    newResponsePanelHeading.append(editBtn);
    newResponsePanelHeading.append(newResponseSee);
    newResponsePanelHeading.append(newResponseName);
    newResponsePanelHeading.append(newResponseExpect);
    newResponsePanelHeading.append(newResponseDate);
    newResponsePanel.append(newResponsePanelHeading);
    newResponsePanel.data("response", response);
    return newResponsePanel;
  }

  // This function figures out which response we want to delete and then calls
  // deleteResponse
  function handleResponseDelete() {
    var currentResponse = $(this)
      .parent()
      .parent()
      .data("response");
    deleteResponse(currentResponse.id);
  }

  // This function figures out which response we want to edit and takes it to the
  // Appropriate url
  function handleResponseEdit() {
    var currentResponse = $(this)
      .parent()
      .parent()
      .data("response");
    window.location.href = "/questionnaire?response_id=" + currentResponse.id;
  }

  // This function displays a messgae when there are no responses
  function displayEmpty() {
    responseContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No responses yet for this category, navigate <a href='/questionnaire'>here</a> in order to create a new response.");
    responseContainer.append(messageh2);
  }

  // This function handles reloading new responses when the category changes
  function handleCategoryChange() {
    var newResponseCategory = $(this).val();
    getResponses(newResponseCategory);
  }

});