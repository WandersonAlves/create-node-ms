import validator from 'validator';

export default class Validator {
  private errorList: string[] = [];

  isEmail(str: string, field: string) {
    if (!validator.isEmail(str)) {
      this.errorList.push(`${field}: Provided email is not valid`);
    }
    return this;
  }

  isLatLong(str: string | number, field: string) {
    if (!validator.isLatLong(str.toString())) {
      this.errorList.push(`${field}: Isn't a valid latitude or longitude field`);
    }
    return this;
  }

  exists(str: string, field: string) {
    if (!str) {
      this.errorList.push(`${field}: Don't exists`);
    }
    return this;
  }

  hasErrors() {
    return this.errorList.length ? true : false;
  }

  get errors() {
    return this.errorList;
  }
}