import mongoose from "mongoose"

const { String, ObjectId } = mongoose.Schema.Types

const MapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    size: {
      x: {
        type: Number,
        required: true,
        default: 50
      },
      y: {
        type: Number,
        required: true,
        default: 50
      }
    } 
  }
)


export default mongoose.models.Map || mongoose.model("Map", MapSchema)