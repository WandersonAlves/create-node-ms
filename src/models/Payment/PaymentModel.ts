export default class PaymentModel {
  name: string;
  uuid: string;
  number: number;
  status: 'pending' | 'paid';

  constructor({ name, number, status }: PaymentModel) {
    this.name = name;
    this.status = 'pending';
    this.number = number;
    this.uuid = Date.now().toString();
  }
}