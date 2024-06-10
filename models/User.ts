import {CallbackError, model, Model, models, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import {IUser} from "@/types/IUser";



const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  name: { type: String },
  surname: { type: String },
  city: { type: String },
  street: { type: String },
  house: { type: String },
  apartment: { type: String },
  postalCode: { type: String },
  novaPoshtaBranch: { type: String },
  meestBranch: { type: String },
});

UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
