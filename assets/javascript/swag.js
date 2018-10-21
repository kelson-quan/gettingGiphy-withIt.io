var animals = ["turtle","shark", "tuna", "salmon", "marlin","bluefin", "stingray", "swordfish", "lionfish", "catfish"];

function generateInitialButtons(){
    
        for (var i = 0; i < animals.length; i++) {
            var animalText = animals[i];
            
            var butt = $("<button>");
                butt.attr("data-animal", animalText);
                butt.text(animalText);
            console.log(butt.attr("data-animal"));
            $("#butt-holder").append(butt);
        }
}

function buttonEventHandler () {
$("button").on("click", function() {
    console.log("received");
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
            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#gifs-appear-here").prepend(animalDiv);
        }
    });
})
}

$(document).ready(function() {
    generateInitialButtons();
    buttonEventHandler();
})