import mongoose from "mongoose"

const { String } = mongoose.Schema.Types

const PublicFileSchema = new mongoose.Schema(
  {
    src: {
      type: String
    }
  }
)

export default mongoose.models.PublicFile || mongoose.model("PublicFile", PublicFileSchema)