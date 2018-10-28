var topics =["cat","Scooby-Doo","dog"].map(v => v.toLowerCase());   
  // Grabbing and storing the data-topic property value from the button
function displayInfo() {
    var apiKey="q8Mum5C6Ns9xPFsYOxcD7K30HG5Cckzp";
    var topic = $(this).attr("data-name");
     var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key="+apiKey+"&limit=10";
    // Creating an AJAX call for the specific topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      // Creating a div to hold the topic

      var result = response.data;

    for (var i = 0; i < result.length; i++) {
        var topicDiv = $("<div class='topic'>");

        // Storing the rating data
        var rating = result[i].rating;

        //   if (rating !== "r" || rating !== "N/A"){
        console.log("rating" + rating);
        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        topicDiv.append(pOne);

        // Storing the release year
        var released = result[i].trending_datetime;

        // Creating an element to hold the release year
        var pTwo = $("<p>").text("Released: " + released);

        // Displaying the release year
        topicDiv.append(pTwo);

        // Storing the plot
        var title = result[i].title;

        // Creating an element to hold the plot
        var pThree = $("<p>").text("Title: " + title);

        // Appending the plot
        topicDiv.append(pThree);

        // Retrieving the URL for the image
    
        var imgURL = result[i].images;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL.fixed_height_still.url);
            image.attr("data-still", imgURL.fixed_height_still.url);
            image.attr("data-animate", imgURL.fixed_height.url);
            image.attr("data-state", "still");
            image.addClass("gif");


        // Creating an element to hold the image
        //   var image = $("<img>").attr("src", imgURL);

        // Appending the image
        topicDiv.append(image);

        // Putting the entire topic above the previous topics
        $("#topics-view").prepend(topicDiv);
    }

    });

  }

$("#topics-view").on("click",".gif",function (event) {
    event.preventDefault();

    // gets the current state of the clicked gif 
    var state = $(this).attr("data-state");

    // according to the current state gifs toggle between animate and still 
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function renderButtons() {

// Deleting the topics prior to adding new topics
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-view").empty();

// Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of topic-btn to our button
        a.addClass("topic-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
  
    var topic = $("#topic-input").val().toLowerCase().trim();
    if (topic.length < 1 || topics.includes(topic)){
        return;
    }
    // Adding topic from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "topic-btn"
  $(document).on("click", ".topic-btn", displayInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
