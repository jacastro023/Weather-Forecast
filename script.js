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
        console.log(user);



        // calling the other functions
        getcurrent(user);
        getWeather(user);
        newDiv(user);
    });

    // current weather for the day
    function getcurrent(user) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + user + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var lat = response.coord.lat
            var lon = response.coord.lon
            // making sure the div is empty for the next search
            current.empty();

            // making second ajax call to get the uv index
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=166a433c57516f51dfab1f7edaed8413",
                method: "GET"
            }).then(function (response) {

                var uvIndex = $("<div>").text("UV Index: " + response.value).addClass("card-text");
                container.append(uvIndex);

            });
            // create elements to hold the info
            var city = $("<h2>")
                .text(response.name + " (" + new Date().toLocaleDateString() + ")")
                .addClass("card-title");
            var content = $("<div>").addClass("card");
            var temp = $("<div>")
                .text("Temperature: " + response.main.temp + " F")
                .addClass("card-text");
            var humidity = $("<div>")
                .text("Humidity: " + response.main.humidity + "%")
                .addClass("card-text");
            var windSpd = $("<div>")
                .text("Wind Speed: " + response.wind.speed + " MPH")
                .addClass("card-text");
            var container = $("<div>").addClass("card-body");
            var img = $("<img>").attr(
                "src",
                "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
            );
            // append html
            city.append(img);
            container.append(city, temp, humidity, windSpd);
            content.append(container);
            current.append(container);

        });
    }

    // weather data for the next 5 days
    function getWeather(user) {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + user + "&units=imperial&cnt=6&appid=166a433c57516f51dfab1f7edaed8413";

        // ajax call for multiple days
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#5DayForecast").html('<h4 class="mt-3">5-Day Forecast:</h4>').append('<div class="row">');

            for (var i = 1; i < response.list.length; i++) {
                // creating divs for all the info
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

    // on click to recall what is on the list
    history.on("click", "ul", function () {
        event.preventDefault();
        getcurrent(($(this).text()));
        getWeather(($(this).text()));
    });

    // appends the searched city to the list
    function newDiv() {
        var cityList = $("<ul>")
            .text(user)
            .addClass("list-group-item list-group-item-action");
        history.prepend(cityList);
    }

})