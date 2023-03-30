import mongoose, { model, Schema, Document } from "mongoose";

export interface I_Like extends Document {
  owner: string;
  post_id: string;
}

const likeSchema = new Schema({
  owner: {
    type: String,
    require: true,
  },

  post_id: {
    type: String,
    require: true,
  }
});
likeSchema.pre<I_Like>("save", async function (next) {});

export default model<I_Like>("like", likeSchema);