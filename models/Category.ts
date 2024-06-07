import {Schema, Model, model, models} from 'mongoose';
import {ICategory} from "@/types/ICategory";


const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Category: Model<ICategory> = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;