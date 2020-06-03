export default interface IPaymentDTO {
  name: string;
  uuid: string;
  number: number;
  status: 'pending' | 'paid';
}