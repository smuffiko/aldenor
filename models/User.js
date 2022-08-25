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
      required: true,
      default: "unUser",
      enum: ["ban", "unUser", "user", "mod", "admin", "root"]
    },
    characters: {
      slot1: {
        character: {
          type: ObjectId,
          ref: "Character",
          default: null
        },
        available: {
          type: Boolean,
          default: true
        }
      },
      slot2: {
        character: {
          type: ObjectId,
          ref: "Character",
          default: null
        },
        available: {
          type: Boolean,
          default: true
        }
      },
      slot3: {
        character: {
          type: ObjectId,
          ref: "Character",
          default: null
        },
        available: {
          type: Boolean,
          default: true
        }
      },
      slot4: {
        character: {
          type: ObjectId,
          ref: "Character",
          default: null
        },
        available: {
          type: Boolean,
          default: false
        }
      },
      slot5: {
        character: {
          type: ObjectId,
          ref: "Character",
          default: null
        },
        available: {
          type: Boolean,
          default: false
        }
      }
    },
    emailHash: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)