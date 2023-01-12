import mongoose from "mongoose"

const { String, ObjectId } = mongoose.Schema.Types

const MapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    coords: [
      [
        { 
          field: {
            type: ObjectId,
            ref: "MapField"
          }
        }
      ]
    ]
  }
)


export default mongoose.models.Map || mongoose.model("Map", MapSchema)