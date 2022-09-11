//Intializing variables
const APIgender = "https://api.genderize.io?name=";
const APIage ="https://api.agify.io/?name=";
const APInationality = "https://api.nationalize.io/?name=";
const dogImage = "https://dog.ceo/api/breeds/image/random";
const APIip = "https://api.ipify.org/?format=json";
const inputButton = document.getElementById("submit");
const signinModal = document.getElementById("signin_modal");
const signinButton = document.getElementById("signin");
const signupModal = document.getElementById("signup_modal");
const signupButton = document.getElementById("signup");
const closeSignin = document.getElementById("close_signin");
const closeSignup = document.getElementById("close_signup");
const login = document.getElementById("login");
const register = document.getElementById("register");
const loginError = document.getElementById("login_error");
const regError = document.getElementById("reg_error");
const IPAddress = document.getElementById("ip_address");
const boredButton = document.getElementById("bored");

//When the user clicks on the button, open the modal
signinButton.onclick = function() {
    signinModal.style.display = "block";
}

//When the user clicks on x, close the modal
closeSignin.onclick = function() {
    signinModal.style.display = "none";
}

//When the user clicks on the button, open the modal
signupButton.onclick = function() {
    signupModal.style.display = "block";
}

//When the user clicks on x, close the modal
closeSignup.onclick = function() {
    signupModal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == signinModal){
      signinModal.style.display = "none";
    }
  
    if (event.target == signupModal) {
      signupModal.style.display = "none";
    }
}

//When the user clicks, a new account is made
register.addEventListener('click', (event) => {
    //Getting the values the user has inserted
    let newUser = document.getElementById("new_username").value.trim().toLowerCase();
    let newPass= document.getElementById("new_password").value;

    //Validating the username and sending error messages
    if(newUser == "" || newPass == ""){
        regError.textContent = "Error: Missing field"
    }
    else if(typeof newUser !== "string"){
        regError.textContent = "Error: Invalid username"
    }
    else if(localStorage.getItem(newUser)){
        regError.textContent = "Error: Username taken"
    }
    else{
        //Add username&password to local storage and open the main page
        localStorage.setItem(newUser, newPass);
        document.querySelectorAll(".startup_container").forEach(a=>a.style.display = "none");
        document.querySelectorAll(".main_container").forEach(a=>a.style.display = "flex");
        signupModal.style.display = "none";
    }
})

login.addEventListener('click', (event) => {
    //Getting the values the user has inserted
    let user = document.getElementById("username").value.trim().toLowerCase();
    let password = document.getElementById("password").value;

    //Check if user exists
    if(localStorage.getItem(user)){
        //Compare passwords
        if(localStorage.getItem(user) == password){
            document.querySelectorAll(".startup_container").forEach(a=>a.style.display = "none");
            document.querySelectorAll(".main_container").forEach(a=>a.style.display = "flex");
            signinModal.style.display = "none";
        }
        else{
            loginError.textContent = "Error: Invalid password"
        }
    }
    else{
        loginError.textContent = "Error: Invalid username"
    }
})

//Changing the random image on refresh
getRandomImage();

//Reaveal IP Address
getIPAddress();

//Reveal results on click
inputButton.addEventListener('click', (event) => {
    let input = document.querySelector('[name="input"]').value.trim()

    //Validate name
    if(typeof input !== "string" || /[^A-Za-z]+/g.test(input) || input == ""){
        document.getElementById("status").textContent = "Invalid Input"
        document.getElementById("result").style.visibility = "hidden"
    }else{
        //Show results
        document.getElementById("result").style.visibility = "visible"
        document.getElementById("status").textContent = "Hello, " + input + "!"

        getGenderPrediction(input);
        getNationalityPrediction(input);
        getAgePrediction(input);
    }
})

boredButton.addEventListener('click', (event) => {
    document.getElementById("activity_section").style.visibility = "visible"

    getRandomActivity();
})

function getRandomImage(){
    //Fetching image link from the API after converting the response to a JSON object
    fetch(dogImage)
    .then(response => response.json())
    .then(image => document.getElementById("dog_image").src = image.message);
}

function getGenderPrediction(input){
    console.log(APIgender + input)
    /*Fetching gender result from API after converting the response to a JSON object
    As well as making sure the result isn't null*/
    fetch(APIgender + input)
    .then(response => response.json())
    .then(results => document.getElementById("gender_prediction").textContent = results.gender ? results.gender : "No results founds!");
}

function getAgePrediction(input){
    /*Fetching age result from API after converting the response to a JSON object
    As well as making sure the result isn't null*/
    fetch(APIage + input)
    .then(response => response.json())
    .then(results => document.getElementById("age_prediction").textContent = results.age ? results.age : "No results found!");
}

function getNationalityPrediction(input){
    //Fetching nationality result from API after converting the response to a JSON object
    fetch(APInationality + input)
    .then(response => response.json())
    .then(results => {
        //Fetching one or two nationalities depending on the length of country array
        if(results.country.length > 1){
            document.getElementById("nationality_prediction").textContent = results.country[0].country_id + 
            " with probability of " + results.country[0].probability.toFixed(2) + " and " + results.country[1].country_id + 
            " with probability of " + results.country[1].probability.toFixed(2);
        }
        else if(results.country.length == 1){
            document.getElementById("nationality_prediction").textContent = results.country[0].country_id + 
            " with probability of " + results.country[0].probability.toFixed(2)
        }
        else{
            document.getElementById("nationality_prediction").textContent = "No results found!"
        }
    });
}

function getIPAddress(){
    //Fetching IP address using Axios
    axios(APIip)
    .then(response => {
        IPAddress.textContent = response.data.ip
    })
}