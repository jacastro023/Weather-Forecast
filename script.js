$(document).ready(function () {
    // var user = $("#input");
    var searchBtn = $("#search");
    var current = $("#current");
    var history = $("#history");

    //  on click button for searching the city
    searchBtn.on("click", function () {
        event.preventDefault();
        
        user = $("#input").val();
        $("#input").val("");
        console.log($("#input").val());



        getWeather();
    });

    function getWeather() {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + user + "&units=imperial&cnt=6&appid=166a433c57516f51dfab1f7edaed8413";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);




            $("#5DayForecast")
                .html('<h4 class="mt-3">5-Day Forecast:</h4>')
                .append('<div class="row">');

            for (var i = 0; i < response.list.length; i++) {
                // only look at forecasts around 3:00pm
                console.log(response.list[i].dt);
                // if (response.list[i].dt.indexOf(list) !== -1) {
                // create html elements for a bootstrap card

                var col = $("<div>").addClass("col-md-2");
                var card = $("<div>").addClass("card bg-primary text-white");
                var body = $("<div>").addClass("card-body p-2");
                var title = $("<h5>")
                    .addClass("card-title")
                    .text(new Date((response.list[i].dt) * 1000).toLocaleDateString());
                var img = $("<img>").attr(
                    "src",
                    "http://openweathermap.org/img/w/" +
                    response.list[i].weather[0].icon +
                    ".png"
                );
                var p1 = $("<p>")
                    .addClass("card-text")
                    .text("Temp: " + response.list[i].temp.max + " °F");
                var p2 = $("<p>")
                    .addClass("card-text")
                    .text("Humidity: " + response.list[i].humidity + "%");
                // merge together and put on page
                col.append(card.append(body.append(title, img, p1, p2)));
                $("#5DayForecast .row").append(col);
            };
        });

    };

})