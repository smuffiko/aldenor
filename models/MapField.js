import mongoose from "mongoose"

const { Number, ObjectId } = mongoose.Schema.Types

const MapFieldSchema = new mongoose.Schema(
  {
    field: {
      type: ObjectId,
      ref: "Field"
    },
    mapId: {
      type: ObjectId,
      ref: "Map"
    },
    coords: {
      x: Number, 
      y: Number
    },
    layer: {
      type: Number,
      required: true
    }
  } 
)


export default mongoose.models.MapField || mongoose.model("MapField", MapFieldSchema)