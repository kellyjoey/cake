$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var responseId;
  // Sets a flag for whether or not we're updating a response to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the response id from the url
  // In localhost:8080/questionnaire?response_id=1, responseId is 1
  if (url.indexOf("?response_id=") !== -1) {
    responseId = url.split("=")[1];
    getResponseData(responseId);
  }

  // Getting jQuery references to the form inputs
  var questionnaireForm = $("#questionnaire");
  var seeInput = $("#see");
  var nameInput = $("#name");
  var expectInput = $("#expect");
  var dateInput = $("#date");
  // Adding an event listener for when the form is submitted
  $(questionnaireForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!seeInput.val().trim() || !nameInput.val().trim() || !expectInput.val().trim() || !dateInput.val().trim()) {
      return;
    }
    // Constructing a newResponse object to hand to the database
    var newResponse = {
      see: seeInput.val().trim(),
      name: nameInput.val().trim(),
      expect: expectInput.val().trim(),
      date: dateInput.val().trim()
    };

    console.log(newResponse)

    // If we're updating a response run updateResponse to update a response
    // Otherwise run submitResponse to create a whole new response
    if (updating) {
      newResponse.id = responseId;
      updateResponse(newResponse);
    }
    else {
      submitResponse(newResponse);
    }
  });

  // Submits a new response and brings user to response page upon completion
  function submitResponse(Response) {
    $.post("/api/responses/", Response, function() {
      window.location.href = "/responses";
    });
  }

  // Gets response data for a response if we're editing
  function getResponseData(id) {
    $.get("/api/responses/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our questionnaire forms with its data
        seeInput.val(data.see);
        nameInput.val(data.name);
        expectInput.val(data.expect);
        dateInput.val(data.date);
        // If we have a response with this id, set a flag for us to know to update the response
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given response, bring user to the responses page when done
  function updateResponse(response) {
    $.ajax({
      method: "PUT",
      url: "/api/responses",
      data: response
    })
    .done(function() {
      window.location.href = "/responses";
    });
  }
});