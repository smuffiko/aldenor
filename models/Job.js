import mongoose from "mongoose"

const { String, ObjectId, Number } = mongoose.Schema.Types

const JobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      default: "description of job"
    },
    requirements: {
      type: Number,
      required: true
    },
    reward: {
      bronze: {
        type: Number
      },
      exp: {
        type: Number
      },
      items: [{
        item: {
          type: ObjectId,
          ref: "Item"
        },
        probability: {
          type: Number,
          required: true
        }
      }]
    },
    times: [{
      time: { // time in seconds
        type: Number,
        required: true
      }
    }]
  }
)

export default mongoose.models.Job || mongoose.model("Job", JobSchema)