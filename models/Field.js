import mongoose from "mongoose"

const { String, Boolean, Number } = mongoose.Schema.Types

const FieldSchema = new mongoose.Schema(
  {
    imageSrc: {
      type: String,
      required: true
    },
    rotation: {
      type: Number,
      default: 0
    },
    flip: {
      type: Boolean,
      default: false
    }
  }
)


export default mongoose.models.Field || mongoose.model("Field", FieldSchema)