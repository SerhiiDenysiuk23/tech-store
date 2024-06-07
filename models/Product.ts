import {Model, Schema, models, model} from 'mongoose';
import {IProduct} from "@/types/IProduct";


const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  characteristics: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  stock: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Product: Model<IProduct> = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;