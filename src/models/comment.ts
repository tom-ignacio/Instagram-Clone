import mongoose, { model, Schema, Document } from "mongoose";

export interface I_Comment extends Document {
  owner: string;
  description: string;
  post_id: string;
  create_date: Date;
  deleted: boolean;
}

const commentSchema = new Schema({
  owner: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  post_id: {
    type: String,
    require: true,
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
commentSchema.pre<I_Comment>("save", async function (next) {});

export default model<I_Comment>("comment", commentSchema);