import * as mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

export const PaymentMongooseSchema = new Schema(
  {
    name: String,
    uuid: String,
    number: Number,
    status: String,
  },
  {
    timestamps: true,
  },
);
export const PaymentMongooseModel = model('payment', PaymentMongooseSchema);
