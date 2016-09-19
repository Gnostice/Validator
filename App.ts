/* Helper Methods */ 
function getTextWidth(text) {
    // re-use canvas object for better performance
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = "15px Arial";
    var metrics = context.measureText(text);
    return metrics.width;
}

/* You can write plain JavaScript code in TypeScript */
function showErrorMessages(listofMessages, errorId) {
    var errorDiv = document.getElementById(errorId);
    errorDiv.innerHTML = "";
    errorDiv.style.visibility = "hidden";
    if (listofMessages.length > 0) {
        errorDiv.innerHTML = listofMessages[0];
        errorDiv.style.visibility = "visible";
        errorDiv.style.width = getTextWidth(listofMessages[0]) + "px";
    }
}


window.onload = function () {

    var firstname: any = document.getElementById('firstName');
    var firstnameValidator = new Basta.Utility.LettersOnlyValidator("First name");
    firstname.onblur = function () {
        firstnameValidator.isValid(this.value);
        showErrorMessages(firstnameValidator.getErrorMessages(), "firstNameErrors");
    };

    var lastname: any = document.getElementById('lastName');
    var lastnameValidator = new Basta.Utility.LettersOnlyValidator("Last name");
    lastname.onblur = function () {
        lastnameValidator.isValid(this.value);
        showErrorMessages(lastnameValidator.getErrorMessages(), "lastNameErrors");
    };

    var age: any = document.getElementById('age');
    var ageValidator = new Basta.Utility.NumbersOnlyValidator("Age");
    age.onblur = function () {
        ageValidator.isValid(this.value);
        showErrorMessages(ageValidator.getErrorMessages(), "ageErrors");
    };

    var ssnname: any = document.getElementById('ssn');
    var ssnValidator = new Basta.Utility.SSNValidator("Ssn");
    ssnname.onblur = function () {
        ssnValidator.isValid(this.value);
        showErrorMessages(ssnValidator.getErrorMessages(), "ssnErrors");
    };

    var email: any = document.getElementById('email');
    var emailValidator = new Basta.Utility.EMailValidator("Email address");
    email.onblur = function () {
        emailValidator.isValid(this.value);
        showErrorMessages(emailValidator.getErrorMessages(), "emailErrors");
    };

    var password: any = document.getElementById('password');
    var passwordValidator = new Basta.Utility.PasswordValidator("Password");
    password.onblur = function () {
        passwordValidator.isValid(this.value);
        showErrorMessages(passwordValidator.getErrorMessages(), "passwordErrors");
    };


}