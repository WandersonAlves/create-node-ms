import validator from 'validator';

export default class Validator {
  private errorList: string[] = [];

  isEmail(str: string, field: string) {
    if (!validator.isEmail(str)) {
      this.errorList.push(`${field}: Provided email is not valid`);
    }
    return this;
  }

  isLatLong({ lat, long }: { lat: string | number; long: string | number }, field: string) {
    if (!validator.isLatLong(`${lat},${long}`)) {
      this.errorList.push(`${field}: Isn't a valid latitude or longitude field. Maybe you forgot to send one of then`);
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
