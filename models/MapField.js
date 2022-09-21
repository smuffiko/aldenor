import mongoose from "mongoose"

const { String, Number, ObjectId } = mongoose.Schema.Types

const MapFieldSchema = new mongoose.Schema(
  {
    imageSrc: {
      type: String,
      required: true
    },
    rotation: {
      type: Number,
      default: 0
    },
    left: [{
      type: ObjectId
    }],
    top: [{
      type: ObjectId
    }],
    right: [{
      type: ObjectId
    }],
    bottom: [{
      type: ObjectId
    }],
    layer: {
      type: Number,
      default: 5
    }
  }
)


export default mongoose.models.MapField || mongoose.model("MapField", MapFieldSchema)