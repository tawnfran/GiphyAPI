// Initial array of animals
var animals = ["penguin", "dog", "bear", "elephant", "lion", "monkey", "camel", "rabbit", "giraffe", "shark", "whale", "peacock"];

// displayAnimalsInfo function re-renders the HTML to display the appropriate content
function displayAnimalsInfo() {

    var userinput = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userinput + "&apikey=q5z135buPZLz6ptuBOwirE0Uqk2XUznc&limit=10";

    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + userinput;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // After the data from the AJAX request comes back
        .then(function (response) {
            console.log(response);
            console.log("AJAX Then")

            // Loop for URL 
            for (var i = 0; i < response.data.length; i++) {
                console.log("In the for loop")
                // // Make div to hold animals 
                var animalDiv = $("<div class='animal'>");
                // console.log(data.data[i].rating)
                // console.log(data.data[i].images.fixed_height_small_still.url);
                // console.log(data.data[i].images.fixed_height_small.url);



                // Saving the image_original_url property
                var imageUrl = response.data[i].images.fixed_height_small_still.url;
                var stillImage = response.data[i].images.fixed_height_small_still.url;
                var animateImage = response.data[i].images.fixed_height_small.url;
                var rating = response.data[i].rating;

                // Creating and storing an image tag
                var Image = $("<img>");

                // Setting the Image src attribute to imageUrl
                Image.attr("src", imageUrl);
                Image.addClass("gif");
                Image.attr("data-state", "still");
                Image.attr("data-animate", animateImage);
                Image.attr("data-still", stillImage);
                console.log(Image);

                // rating for images:
                var picRating = $("<p>").text("Rating: " + rating).addClass("rating");
                



                // Prepending the Image to the images div
                animalDiv.append(Image);
                animalDiv.append(picRating); 

                $("#animals-view").prepend(animalDiv);
            }

            //function to switch aimate and still images 

           
            });


            
}
$(document).on("click", ".gif", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        var animatePic = $(this).attr("data-animate");
        var stillPic = $(this).attr("data-still");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", animatePic);
            $(this).attr("data-state", "animate");
        } else if (state === "animate") { 
            $(this).attr("src", stillPic); 
            $(this).attr("data-state", "still");
        }
    });
// Function for displaying animals data
function renderButtons() {

    // Deleting the animals prior to adding new animals
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animals in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of animals-btn to our button
        a.addClass("animals-btn");
        // Adding a data-attribute
        a.attr("data-name", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a animals button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding animals from the textbox to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our animals array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "animals-btn"
$(document).on("click", ".animals-btn", displayAnimalsInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();