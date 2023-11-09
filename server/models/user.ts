import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  availableMoney: number;
  purchasedItems: string[]; // list of strings: list of id of items
  // list of IDs for the items that a user have previously purchased
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  availableMoney: { type: Number, default: 10000 },
  purchasedItems: [
    { type: Schema.Types.ObjectId, ref: "product", default: [] },
  ] /* list of IDs from MongoDB that is referencing another collection: the product collection. By default you have no purchased items. */,
});

export const UserModel = model<IUser>("user", UserSchema);
