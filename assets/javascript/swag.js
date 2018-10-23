var animals = ["turtle","shark", "tuna", "salmon", "marlin","bluefin", "stingray", "swordfish", "lionfish", "catfish"];

function generateInitialButtons(){
    
        for (var i = 0; i < animals.length; i++) {
            var animalText = animals[i];
            
            var butt = $("<button>");
                butt.attr("data-animal", animalText);
                butt.attr("class","button-entry");
                butt.text(animalText);
            $("#butt-holder").append(butt);
        }
}

$("#find-giph").on("click", function(){
    console.log("received");
    var userInput = $("#search").val();
    var butt = $("<button>");
        butt.attr("data-animal", userInput);
        butt.attr("class","button-entry");
        butt.text(userInput);
    $("#butt-holder").append(butt);
    $("#search").val("");
    buttonEventHandler();
})

function buttonEventHandler () {

$(".button-entry").on("click", function() {
      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        $("#gifs-appear-here").empty();
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div>");
          var p = $("<p>");
          p.text("Rating: " + results[i].rating)
          var animalImage = $("<img>"); 
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("data-still", results[i].images.original_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("class", "gif");
            animalImage.attr("data-state","animate");
            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#gifs-appear-here").prepend(animalDiv);
        }
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
        
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
    });

})
}


$(document).ready(function() {
    generateInitialButtons();
    buttonEventHandler();

})
