//Intializing variables
const APIgender = "https://api.genderize.io?name=";
const APIage ="https://api.agify.io/?name=";
const APInationality = "https://api.nationalize.io/?name=";
const dogImage = "https://dog.ceo/api/breeds/image/random";
const inputButton = document.getElementById("submit");
const startupButton = document.getElementById("start");

//Changing the dog image
getRandomImage();

//Hide startup container and view the main page
startupButton.addEventListener('click', (event) => {
    document.querySelectorAll(".startup_container").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".main_container").forEach(a=>a.style.display = "flex");
})

//Reveal results on click
inputButton.addEventListener('click', (event) => {
    let input = document.querySelector('[name="input"]').value.trim()

    if(typeof input !== "string" || /[^A-Za-z]+/g.test(input) || input == ""){
        document.getElementById("status").textContent = "Invalid Input"
    }else{
        document.getElementById("result").style.visibility = "visible"
        document.getElementById("status").textContent = "Hello, " + input + "!"

        getGenderPrediction(input);
        getNationalityPrediction(input);
        getAgePrediction(input);
    }
})

function getRandomImage(){
    //Fetching image link from the API after converting the response to a JSON response
    fetch(dogImage)
    .then(response => response.json())
    .then(image => document.getElementById("dog_image").src = image.message);
}

function getGenderPrediction(input){
    console.log(APIgender + input)
    /*Fetching gender result from API after converting the response to a JSON response
    As well as making sure the result isn't null*/
    fetch(APIgender + input)
    .then(response => response.json())
    .then(results => document.getElementById("gender_prediction").textContent = results.gender ? results.gender : "No results founds!");
}

function getAgePrediction(input){
    /*Fetching age result from API after converting the response to a JSON response
    As well as making sure the result isn't null*/
    fetch(APIage + input)
    .then(response => response.json())
    .then(results => document.getElementById("age_prediction").textContent = results.age ? results.age : "No results found!");
}

function getNationalityPrediction(input){
    //Fetching nationality result from API after converting the response to a JSON response
    fetch(APInationality + input)
    .then(response => response.json())
    .then(results => {
        //Fetching one or two nationalities depending on the length of the country array
        if(results.country.length > 1){
            document.getElementById("nationality_prediction").textContent = results.country[0].country_id + " and " + results.country[1].country_id
        }
        else if(results.country.length == 1){
            document.getElementById("nationality_prediction").textContent = results.country[0].country_id
        }
        else{
            document.getElementById("nationality_prediction").textContent = "No results found!"
        }
    });
}