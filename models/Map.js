import mongoose from "mongoose"

const { Number, String, ObjectId } = mongoose.Schema.Types

const MapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    coords: [{
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      },
      field: {
        type: ObjectId,
        ref: "MapField"
      }
    }]
  }
)


export default mongoose.models.Map || mongoose.model("Map", MapSchema)