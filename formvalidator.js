var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Basta;
(function (Basta) {
    var Utility;
    (function (Utility) {
        var Validator = (function () {
            function Validator(fieldName) {
                this.errorMessages = new Array();
                this.allowEmpty = false;
                this.fieldName = fieldName;
            }
            Validator.prototype.isValid = function (text) {
                this.errorMessages.length = 0;
                if (!this.allowEmpty && text.length <= 0) {
                    this.errorMessages.push(this.fieldName + ' should not be empty.');
                    return false;
                }
                return true;
            };
            return Validator;
        }());
        var LettersOnlyValidator = (function (_super) {
            __extends(LettersOnlyValidator, _super);
            function LettersOnlyValidator(fieldName) {
                _super.call(this, fieldName);
            }
            LettersOnlyValidator.prototype.isValid = function (text) {
                if (!_super.prototype.isValid.call(this, text))
                    return false;
                var pattern = new RegExp('^[A-Za-z]+$');
                if (!text.match(pattern)) {
                    this.errorMessages.push(this.fieldName + " should have text only.");
                    return false;
                }
                return true;
            };
            LettersOnlyValidator.prototype.getErrorMessages = function () {
                return this.errorMessages;
            };
            return LettersOnlyValidator;
        }(Validator));
        Utility.LettersOnlyValidator = LettersOnlyValidator;
        var NumbersOnlyValidator = (function (_super) {
            __extends(NumbersOnlyValidator, _super);
            function NumbersOnlyValidator(fieldName) {
                _super.call(this, fieldName);
            }
            NumbersOnlyValidator.prototype.isValid = function (text) {
                if (!_super.prototype.isValid.call(this, text))
                    return false;
                var pattern = new RegExp('^[0-9]+$');
                if (!text.match(pattern)) {
                    this.errorMessages.push(this.fieldName + ' should have number only.');
                    return false;
                }
                return true;
            };
            NumbersOnlyValidator.prototype.getErrorMessages = function () {
                return this.errorMessages;
            };
            return NumbersOnlyValidator;
        }(Validator));
        Utility.NumbersOnlyValidator = NumbersOnlyValidator;
        var SSNValidator = (function (_super) {
            __extends(SSNValidator, _super);
            function SSNValidator(fieldName) {
                _super.call(this, fieldName);
            }
            SSNValidator.prototype.isValid = function (text) {
                if (!_super.prototype.isValid.call(this, text))
                    return false;
                var pattern = new RegExp('^[0-9]{3}-[0-9]{2}-[0-9]{4}$');
                if (!text.match(pattern)) {
                    this.errorMessages.push(this.fieldName + ' value is not in correct format. ex: 123-45-6789');
                    return false;
                }
                return true;
            };
            SSNValidator.prototype.getErrorMessages = function () {
                return this.errorMessages;
            };
            return SSNValidator;
        }(Validator));
        Utility.SSNValidator = SSNValidator;
        var EMailValidator = (function (_super) {
            __extends(EMailValidator, _super);
            function EMailValidator(fieldName) {
                _super.call(this, fieldName);
            }
            EMailValidator.prototype.isValid = function (text) {
                if (!_super.prototype.isValid.call(this, text))
                    return false;
                var atpos = text.indexOf('@');
                var dotpos = text.lastIndexOf('.');
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= text.length) {
                    this.errorMessages.push(this.fieldName + ' is not in correct format.');
                    return false;
                }
                return true;
            };
            EMailValidator.prototype.getErrorMessages = function () {
                return this.errorMessages;
            };
            return EMailValidator;
        }(Validator));
        Utility.EMailValidator = EMailValidator;
        var PasswordValidator = (function (_super) {
            __extends(PasswordValidator, _super);
            function PasswordValidator(fieldName) {
                _super.call(this, fieldName);
                this.charCount = 8;
                this.maxCharCount = 16;
                this.atLeastOneLetter = true;
                this.atLeastOneDigit = true;
                this.atLeastOneSpecialChar = true;
            }
            PasswordValidator.prototype.isValid = function (text) {
                if (!_super.prototype.isValid.call(this, text))
                    return false;
                if (text.length < this.charCount) {
                    this.errorMessages.push('Your password must be at least 8 characters');
                }
                if (this.atLeastOneLetter && (text.search(/[a-zA-Z]/)) < 0) {
                    this.errorMessages.push('Your password must contain at least one letter.');
                }
                if (this.atLeastOneDigit && (text.search(/[0-9]/) < 0)) {
                    this.errorMessages.push('Your password must contain at least one digit.');
                }
                if (this.atLeastOneSpecialChar && (text.search(/[#@$%^&*!()~]/) < 0)) {
                    this.errorMessages.push('Your password must contain at least one special character.');
                }
                if (this.errorMessages.length > 0) {
                    return false;
                }
                return true;
            };
            PasswordValidator.prototype.getErrorMessages = function () {
                return this.errorMessages;
            };
            return PasswordValidator;
        }(Validator));
        Utility.PasswordValidator = PasswordValidator;
    })(Utility = Basta.Utility || (Basta.Utility = {}));
})(Basta || (Basta = {}));
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
    var firstname = document.getElementById('firstName');
    var firstnameValidator = new Basta.Utility.LettersOnlyValidator("First name");
    firstname.onblur = function () {
        firstnameValidator.isValid(this.value);
        showErrorMessages(firstnameValidator.getErrorMessages(), "firstNameErrors");
    };
    var lastname = document.getElementById('lastName');
    var lastnameValidator = new Basta.Utility.LettersOnlyValidator("Last name");
    lastname.onblur = function () {
        lastnameValidator.isValid(this.value);
        showErrorMessages(lastnameValidator.getErrorMessages(), "lastNameErrors");
    };
    var age = document.getElementById('age');
    var ageValidator = new Basta.Utility.NumbersOnlyValidator("Age");
    age.onblur = function () {
        ageValidator.isValid(this.value);
        showErrorMessages(ageValidator.getErrorMessages(), "ageErrors");
    };
    var ssnname = document.getElementById('ssn');
    var ssnValidator = new Basta.Utility.SSNValidator("Ssn");
    ssnname.onblur = function () {
        ssnValidator.isValid(this.value);
        showErrorMessages(ssnValidator.getErrorMessages(), "ssnErrors");
    };
    var email = document.getElementById('email');
    var emailValidator = new Basta.Utility.EMailValidator("Email address");
    email.onblur = function () {
        emailValidator.isValid(this.value);
        showErrorMessages(emailValidator.getErrorMessages(), "emailErrors");
    };
    var password = document.getElementById('password');
    var passwordValidator = new Basta.Utility.PasswordValidator("Password");
    password.onblur = function () {
        passwordValidator.isValid(this.value);
        showErrorMessages(passwordValidator.getErrorMessages(), "passwordErrors");
    };
};
