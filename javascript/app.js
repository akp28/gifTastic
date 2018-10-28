var movies =["Flapjack","Scooby-Doo"].map(v => v.toLowerCase());   
  // Grabbing and storing the data-topic property value from the button
function displayInfo() {
    var apiKey="q8Mum5C6Ns9xPFsYOxcD7K30HG5Cckzp";
    var movie = $(this).attr("data-name");
     var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key="+apiKey+"&limit=10";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      // Creating a div to hold the movie

      var result = response.data;

      for (var i = 0; i < result.length; i++) {
      var movieDiv = $("<div class='movie'>");

      // Storing the rating data
      var rating = result[i].rating;

    //   if (rating !== "r" || rating !== "N/A"){
      console.log("rating" + rating);
      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      movieDiv.append(pOne);

      // Storing the release year
      var released = result[i].trending_datetime;

      // Creating an element to hold the release year
      var pTwo = $("<p>").text("Released: " + released);

      // Displaying the release year
      movieDiv.append(pTwo);

      // Storing the plot
      var title = result[i].title;

      // Creating an element to hold the plot
      var pThree = $("<p>").text("Title: " + title);

      // Appending the plot
      movieDiv.append(pThree);

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
      movieDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#movies-view").prepend(movieDiv);
      }

    });

  }

$("#movies-view").on("click",".gif",function (event) {
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

// Deleting the movies prior to adding new movies
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-view").empty();

// Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}
// function buttonGenerator(){
//     $("#buttons-view").empty();
// 	// loops through the array and creates buttons
// 	for(i = 0; i < dataArray.length; i++) {
// 		button = $("<button type=" + "button" + ">" + dataArray[i] + "</button>").addClass("btn btn-warning").attr("data-name",dataArray[i]);
// 		$("#buttons-view").append(button);
// 	};
// }
$("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
  
    var movie = $("#movie-input").val().toLowerCase().trim();
    if (movie.length < 1 || movies.includes(movie)){
        return;
    }
    // Adding movie from the textbox to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".movie-btn", displayInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
// $(".submit").on("click", function(event){
    
//     event.preventDefault();
//     // $("#buttons-view").empty();

// 	console.log("submit");
// 	// sets inputted value to newTopic 
// 	newTopic = $("#topic-input").val();
//     // new topic is added to the dataArray array 
//     if (newTopic != null){
// 	dataArray.push(newTopic);
// 	console.log(dataArray);
// 	// call the function that creates the new button
//     renderButtons();
//     }else {
//         console.log("empty string");
//     }
// });

// $(document).on("click",".btn",displayInfo);
// renderButtons();

// $("img").on("click", function() {
    
//     event.preventDefault();
//     var state = $(this).attr("data-state");
//         if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });
// buttonGenerator();