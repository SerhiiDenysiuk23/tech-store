import {Schema, Model, model, models} from 'mongoose';
import {IBrand} from "@/types/IBrand";


const BrandSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Brand: Model<IBrand> = models.Brand || model<IBrand>('Brand', BrandSchema);

export default Brand;