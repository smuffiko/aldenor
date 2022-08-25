import mongoose from "mongoose"

const { String} = mongoose.Schema.Types

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String
    }
  }
)

export default mongoose.models.Item || mongoose.model("Item", ItemSchema)