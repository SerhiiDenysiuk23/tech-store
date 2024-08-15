import {Schema, Model, models, model} from 'mongoose';
import {IOrder} from "@/types/IOrder";

const OrderSchema: Schema<IOrder> = new Schema({
  products: [
    {
      product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
      quantity: {type: Number, required: true},
    },
  ],
  phoneNumber: {type: String, required: true},
  total: {type: Number, required: true},
  deliveryMethod: {type: String, enum: ['pickup', 'courier', 'post'], required: true},
  postalService: {type: String, enum: ['nova_poshta', 'ukrposhta', 'meest']},
  recipientName: {type: String, required: true},
  recipientSurname: {type: String, required: true},
  recipientCity: {type: String, required: true},
  recipientStreet: {type: String},
  recipientHouse: {type: String},
  recipientApartment: {type: String},
  recipientPostalCode: {type: String},
  recipientNovaPoshtaBranch: {type: String},
  recipientMeestBranch: {type: String},
  status: {type: String, enum: ['pending', 'processed', 'shipped', 'delivered', 'canceled'], default: 'pending'},
},{ timestamps: true });

const Order: Model<IOrder> = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
