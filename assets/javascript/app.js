var topicArray = ['Chris Pratt', 'Keanu Rheaves', 'DJ Khaled', 'Video Games', 'Coding',
  'Kittens', 'Puppies', 'LOL', 'Dexter', 'Sons of Anarchy'
];

function makeButtons() {
  $("#buttons").empty();
  for (var b = 0; b < topicArray.length; b++) {
    var newButton = $("<button>");
    newButton.attr("data-person", topicArray[b]);
    newButton.text(topicArray[b]);
    $("#buttons").append(newButton);
  }
}
makeButtons();

$(".gif").on("click", function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

$("button").on("click", function() {
  var person = $(this).attr("data-person");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=91XhmzLNlpaoyhL0yVQwnMqP9yxd9u7O&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      console.log(response);


      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.addClass("gif");

        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});
