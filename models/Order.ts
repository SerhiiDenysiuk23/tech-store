import {Schema, Document, Model, Types, models, model} from 'mongoose';

interface IOrder extends Document {
  user?: Types.ObjectId; // Ссылка на пользователя, если заказ сделан зарегистрированным пользователем
  products: Array<{
    productId: Types.ObjectId;
    quantity: number;
  }>;
  deliveryMethod: 'pickup' | 'courier' | 'post';
  postalService: 'nova_poshta' | 'ukrposhta' | 'meest';
  recipientName: string;
  recipientSurname: string;
  recipientCity: string;
  recipientStreet?: string;
  recipientHouse?: string;
  recipientApartment?: string;
  recipientPostalCode?: string;
  recipientNovaPoshtaBranch?: string;
  recipientMeestBranch?: string;
  status: 'pending' | 'processed' | 'shipped' | 'delivered' | 'canceled';
}

const OrderSchema: Schema<IOrder> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  deliveryMethod: { type: String, enum: ['pickup', 'courier', 'post'], required: true },
  postalService: { type: String, enum: ['nova_poshta', 'ukrposhta', 'meest'], required: true },
  recipientName: { type: String, required: true },
  recipientSurname: { type: String, required: true },
  recipientCity: { type: String, required: true },
  recipientStreet: { type: String },
  recipientHouse: { type: String },
  recipientApartment: { type: String },
  recipientPostalCode: { type: String },
  recipientNovaPoshtaBranch: { type: String },
  recipientMeestBranch: { type: String },
  status: { type: String, enum: ['pending', 'processed', 'shipped', 'delivered', 'canceled'], default: 'pending' },
});

const Order: Model<IOrder> = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
