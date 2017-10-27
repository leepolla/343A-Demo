var button = document.getElementById('button');
var datePicker = document.getElementById('date-picker');

datePicker.max = getTodayDate();
datePicker.value = getTodayDate();

// Event listener for the button's click even
// button.addEventListener('click', function (e) {
datePicker.addEventListener('input', function (e) {
    console.log('requesting location...');

    var date = datePicker.value;

    console.log(date);

    // Request the users current position from the geolocation API
    navigator.geolocation.getCurrentPosition(function(position) {
        // When the browser has completed determining the user's location,
        // It will call the provided callback function with a Javascript object
        // containing the location information.
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Construct the URL that will work with the sunrise-sunset.org API,
        // API Documentation: https://sunrise-sunset.org/api
        var url = 'https://api.sunrise-sunset.org/json?lat=' + latitude + '&lng=' + longitude + '&formatted=0&date=' + date;

        // Call our function defined below to make the AJAX request,
        // passing in a callback function that will be called when the API request
        // has been completed successfully.
        makeApiRequest(url, function (response) {
            console.log(response.results.sunrise);

            // Construct a new Date object with the DateTime string
            // returned from the sunrise-sunset API.
            var sunriseDate = new Date(response.results.sunrise);

            // Hours and minutes of the sunrise timestamp,
            // in the users timezone (original timestamp is in UTC)
            console.log(sunriseDate.getHours());
            console.log(sunriseDate.getMinutes());
        });
    });

    console.log('Hello, world');
});

// Function to make an AJAX request with a given url,
// and call the provided callback function with parsed JavaScript object
// when the request has been completed successfully
function makeApiRequest(url, callback) {
    var httpRequest = new XMLHttpRequest();

    // Adds an event handler that will be called during
    // different stages of the request's lifecycle.
    httpRequest.onreadystatechange = function() {
        // Check that the request has completed
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            // Check that the request has completed successfully
            if (httpRequest.status === 200) {
                // responseText is the raw response from the server
                // the AJAX request was made against
                var responseText = httpRequest.responseText;
                console.log(responseText);

                // To be able to use it like a JavaScript object,
                // pass it to JSON.parse, which will return a JavaScript object
                var responseJson = JSON.parse(responseText);

                console.log(responseJson);

                // Call the callback fuction,
                // passing in the parsed JavaScript object
                // See line 13 above.
                callback(responseJson);
            }
        }
    };

    // Executes the AJAX request
    httpRequest.open('GET', url, true);
    httpRequest.send();
}

function getTodayDate() {
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    return year + '-' + month + '-' + day;
}