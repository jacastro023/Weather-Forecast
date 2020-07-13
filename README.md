# Weather-Forecast
* Used open Weather api to get the data needed

## Description
* In this weather application I used the weather from the open weather api to give the user a 5 day forecast for the city which the user would type into the textbox.

* It would also give the current weather for the day.

* A list of the past searched cities would also appear below the search box.

## functionality
* The only input box is the search box in which the user can type in the city for which they want to see the weather forecast for.

* Also the list of already searched cities should be clickable so that the user can go back and see the weather forecast for previously searched cities.

## ajax-calls
* The only api from which we were getting out data was the open weather api

* Inside the js file multiple ajax calls were made to the same api

* One call was made to retrive the 5 day forecast, another for the weather for the current day, and the third one was nested inside the current day ajax call to retrieve the uv index.

## ScreenShots
* ![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")
* ![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")
* ![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")

## Reocurring-erros
* Making the api urls, sometimes i would not type them out right and the data would not be retrieved.

* Other times I was not placing the api keys in the right place or the user input right and so errors would appear in the console.

* calling the functions would sometimes not work because I would not place them in the right place or not run the right info through them

## Resources
* Bootstrap, bootstrap classes were used in the js file.
* Openweather api, this is where we retrieved the forecast from.
* We used jQuery to write the js file.