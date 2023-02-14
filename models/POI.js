import mongoose from "mongoose"

const { String, ObjectId } = mongoose.Schema.Types

const POISchema = new mongoose.Schema(
  {
    fields: [{  // because 1 poi can be at more coords
      type: ObjectId,
      ref: "MapField"
    }],
    name: { // name it for better future
      type: String,
      required: true
    },
    jobs: [{ // there can be more jobs at one poi
      job: {
        type: ObjectId,
        ref: "Job"
      }
    }]
  }
)

export default mongoose.models.POI || mongoose.model("POI", POISchema)