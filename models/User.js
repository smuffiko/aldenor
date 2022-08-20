import mongoose from "mongoose"

const { String } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: true,
      default: "unUser",
      enum: ["ban", "unUser", "user", "mod", "admin", "root"]
    },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)