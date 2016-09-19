namespace Basta {

    export namespace Utility {

        abstract class Validator {
            allowEmpty: boolean;
            fieldName: string;
            constructor(fieldName: string) {
                this.allowEmpty = false;
                this.fieldName = fieldName;
            }
            isValid(text: string): boolean {
                this.errorMessages.length = 0;
                if (!this.allowEmpty && text.length <= 0) {
                    this.errorMessages.push(this.fieldName + ' should not be empty.');
                    return false;
                }
                return true;
            }
            abstract getErrorMessages(): Array<string>;
            protected errorMessages: Array<string> = new Array();
        }

        export class LettersOnlyValidator extends Validator {
            constructor(fieldName: string) {
                super(fieldName);
            }
            isValid(text: string) {
                if (!super.isValid(text))
                    return false;
                var pattern: RegExp = new RegExp('^[A-Za-z]+$');
                if (!text.match(pattern)) {
                    this.errorMessages.push(this.fieldName + " should have text only.");
                    return false;
                }
                return true;
            }
            getErrorMessages(): Array<string> {
                return this.errorMessages;
            }
        }


        export class NumbersOnlyValidator extends Validator {
            constructor(fieldName: string) {
                super(fieldName);
            }
            isValid(text: string) {
                if (!super.isValid(text))
                    return false;
                var pattern: RegExp = new RegExp('^[0-9]+$');
                if (!text.match(pattern)) {
                    this.errorMessages.push(this.fieldName+ ' should have number only.');
                    return false;
                }
                return true;
            }
            getErrorMessages(): Array<string> {
                return this.errorMessages;
            }
        }

        export class SSNValidator extends Validator {

            constructor(fieldName: string) {
                super(fieldName);
            }
            isValid(text: string): boolean {
                if (!super.isValid(text))
                    return false;
                var pattern: RegExp = new RegExp('^[0-9]{3}-[0-9]{2}-[0-9]{4}$');
                if (!text.match(pattern)) {
                    this.errorMessages.push(this.fieldName+ ' value is not in correct format. ex: 123-45-6789');
                    return false;
                }
                return true;
            }
            getErrorMessages(): Array<string> {
                return this.errorMessages;
            }
        }
        
        export class EMailValidator extends Validator {

            constructor(fieldName: string) {
                super(fieldName);
            }

            isValid(text: string): boolean {
                if (!super.isValid(text))
                    return false;
                var atpos = text.indexOf('@');
                var dotpos = text.lastIndexOf('.');
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= text.length) {
                    this.errorMessages.push(this.fieldName+ ' is not in correct format.');
                    return false;
                }
                return true;
            }

            getErrorMessages(): Array<string> {
                return this.errorMessages;
            }
        }

        export class PasswordValidator extends Validator {
            public charCount: number = 8;
            public maxCharCount: number = 16;
            public atLeastOneLetter: boolean = true;
            public atLeastOneDigit: boolean = true;
            public atLeastOneSpecialChar: boolean = true;

            constructor(fieldName: string) {
                super(fieldName);
            }

            isValid(text: string): boolean {
                if (!super.isValid(text))
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
            }
            getErrorMessages(): Array<string> {
                return this.errorMessages;
            }
        }
    }
}