//JavaScript handling the Sign Up Form data
//Initialise variables with the value of id in the html form
const signUp_fullName = document.getElementById('full-name').value;
const signUp_email = document.getElementById('email-address').value;
const signUp_username = document.getElementById('user-username').value;
const signUp_password = document.getElementById('user-password').value;
const signUp_pwd_repeat = document.getElementById('password-repeat').value;

//When sign up form has been submitted/button pressed
document.getElementById('sign-up-form').addEventListener('submit', function(userSubmit) {
    //Ensuring submit is not the default form
    userSubmit.preventDefault();

    //Store users' data input from sign-up form in localStorage
    localStorage.setItem('full-name', signUp_fullName);
    localStorage.setItem('email-address', signUp_email);
    localStorage.setItem('user-username', signUp_username);
    localStorage.setItem('user-password', signUp_password);
    localStorage.setItem('password-repeat', signUp_pwd_repeat);

    alert('Account has been created successfully! You will now be logged in.');
});
    //JavaScript handling the Login Form data
    //Initialise variables with the value of id in the html form
    const log_in_username = document.getElementById('username').value;
    const log_in_password = document.getElementById('password').value;

    //When login form has been submitted/pressed
    document.getElementById('login-form').addEventListener('submit', function(userSubmit) {
        userSubmit.preventDefault();

        //Fetch previously stored data (registered users)
        const stored_username = localStorage.getItem('user-username');
        const stored_password = localStorage.getItem('user-password');

        //Validate if user exists within stored data(registered users)
        if (log_in_username === stored_username && log_in_password === stored_password) {
            //Send a message to user that log in worked
            alert('You have been logged in successfully.');
            //Redirect user to their logged in account on myProfile
            window.location.replace("./myProfile.html");
        } else {
            //Send a message to user that log in failed
            alert('This account does not exist. Please try login again or create a new account.');
            return;
        }
    });