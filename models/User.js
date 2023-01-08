import mongoose from "mongoose"

const { String, Boolean, ObjectId } = mongoose.Schema.Types

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
      required: false,
      default: "unUser",
      enum: ["ban", "unUser", "user"]
    },
    characters: [
      {
        character: {
          type: ObjectId,
          ref: "Character"
        },
        available: {
          type: Boolean,
          required: true
        }
      }
    ],
    emailHash: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)