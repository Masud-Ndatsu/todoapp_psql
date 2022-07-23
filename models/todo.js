const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const todoSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);
todoSchema.plugin(require("mongoose-autopopulate"));
module.exports = { Todo: model("Todo", todoSchema) };
