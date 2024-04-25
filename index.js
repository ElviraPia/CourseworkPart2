//JavaScript for interactive features on Image Carousel & Interactive Weather API
//Particularly for the JavaScript of this feature, I used the resource highlighted below on W3Schools
//URL: https://www.w3schools.com/howto/howto_js_slideshow.asp 

//Image Carousel JavaScript
let carousel_index = 1;
carouselGo(carousel_index);

//Event Listeners for all buttons that user can interact with
document.querySelector(" .carousel_left_button").addEventListener("click", function() {
    plusSlides(-1); //Moving back to previous image
});

document.querySelector(" .carousel_right_button").addEventListener("click", function() {
    plusSlides(1); //Moving to next image in index
});

document.querySelectorAll(".dot").forEach((dot, dot_index) => {
    dot.addEventListener("click", function() {
        currentImage(dot_index + 1);
    });
});

//Function to handle carousel navigation by buttons
function plusSlides(number) {
   carouselGo(carousel_index += number);
}

//Function to display the current image with corressponding number in index
function currentImage(number) {
    carouselGo(carousel_index = number);
}

//Function to update carousel images
function carouselGo(number) {
    //Assigning the html classes to JavaScript variables 
    let index;
    const image_slide  = document.getElementsByClassName("carousel_image");
    const dot_number = document.getElementsByClassName("dot");
    //
    if (number > image_slide.length) {
        carousel_index = 1
    } else if (number < 1) {
        carousel_index = image_slide.length
    }
    //Hide all images
    for (index = 0; index < image_slide.length; index++) {
        image_slide[index].style.display = "none";
    }
    //Removing the active class from all dots which means it will only show corressponding image with users selected dot
    for (index = 0; index < dot_number.length; index++) {
        dot_number[index].className = dot_number[index].className.replace(" active", "");
    }
    //Show current image and corresponding dot made active
    image_slide[carousel_index-1].style.display = "block";
    /* dot_number[carousel_index-1].className += " active"; */
    dot_number[carousel_index-1].className += " active";
}

//Weather API JavaScript
//To learn how to carry this out, I watched a resourceful video which can be found using URL below:
//URL: https://youtu.be/MIYQR-Ybrn4?si=qM33Cyr8N7sgjDfS 

//Assigning api key and url to variables
const api_key = "80b299149f443ff75062c1f011d3891e";
const url_api = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//Creating variables and making connection with corressponding classes in html file (homepage.html)
const user_entered_search = document.querySelector(".search-bar input");
const enter_button = document.querySelector(".search-button");
const weatherIcon  = document.querySelector(".weather-icon");

//Function to handle if error & if not continue to process and get weather forecast
async function getWeather(city_name){
    const response = await fetch(url_api + city_name + `&appid=${api_key}`);

    //If error occurs, then weather forecast will not be updated and error message declared in html will appear
    if(response.status == 404){
        document.querySelector(".error_message").style.display = "block";
        document.querySelector(".weather-forecast").style.display = "none";
    }else {
        var weather_data = await response.json();

    //Fetching corresponding weather data to html class (to then be displayed)
    document.querySelector(".city-or-town").innerHTML = weather_data.name;
    document.querySelector(".temperature").innerHTML = Math.round(weather_data.main.temp) + "°C";
    document.querySelector(".humidity-text").innerHTML = weather_data.main.humidity + "%";
    document.querySelector(".wind-text").innerHTML = weather_data.wind.speed + "km/h";

    //Handles if weather icon needs to be changed dependent on weather data for user's chosen city
    if(weather_data.weather[0].main == 'Clouds'){
        weatherIcon.src = "Weather Images/clouds.png";
    }
    else if(weather_data.weather[0].main == 'Clear'){
        weatherIcon.src = "Weather Images/clear.png";
    }
    else if(weather_data.weather[0].main == 'Rain'){
        weatherIcon.src = "Weather Images/rain.png";
    }
    else if(weather_data.weather[0].main == 'Mist'){
        weatherIcon.src = "Weather Images/mist.png";
    }
    else if(weather_data.weather[0].main == 'Drizzle'){
        weatherIcon.src = "Weather Images/drizzle.png";
    }

//Weather forecast is displayed and error message from html is not, if steps run smoothly
document.querySelector(".weather-forecast").style.display = "block";
document.querySelector(".error_message").style.display = "none";
    }
}

//If user presses the button input will be processed to then be passed to function getWeather()
enter_button.addEventListener("click", ()=>{
    getWeather(user_entered_search.value);
});
