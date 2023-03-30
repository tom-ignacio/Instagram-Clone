import mongoose, { model, Schema, Document } from "mongoose";

export interface I_Post extends Document {
  owner: string;
  description: string;
  picture: string;
  create_date: Date;
  deleted: boolean;
}

const postSchema = new Schema({
  owner: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  picture: {
    type: String
  },

  create_date: {
    type: Date,
    default: Date.now()
  },

  deleted: {
    type: Boolean,
    default: false
  },
});
postSchema.pre<I_Post>("save", async function (next) {});

export default model<I_Post>("post", postSchema);