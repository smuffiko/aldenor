import mongoose from "mongoose"

const { String, Number, ObjectId } = mongoose.Schema.Types

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    skin: {
      head: {
        type: Number,
        enum: [1,2,3,4],
        default: 1
      },
      body: {
        type: Number,
        enum: [1,2,3,4],
        default: 1
      },
      hands: {
        type: Number,
        enum: [1,2,3,4],
        default: 1
      },
      legs: {
        type: Number,
        enum: [1,2,3,4],
        default: 1
      }
    },
    race: {
      type: String,
      required: true,
      enum: ["human","elf","dwarf","halfling"]
    },
    class: {
      type: String,
      required: true,
      default: "adventurer",
      enum: ["adventurer", "sawbones", "mercenary", "trickster"]
    },
    gear: {
      head: {
        type: ObjectId,
        ref: "Item"
      },
      shoulders: {
        type: ObjectId,
        ref: "Item"
      },
      chest: {
        type: ObjectId,
        ref: "Item"
      },
      legs: {
        type: ObjectId,
        ref: "Item"
      },
      shoes: {
        type: ObjectId,
        ref: "Item"
      },
      mainHand: {
        type: ObjectId,
        ref: "Item"
      },
      offHand: {
        type: ObjectId,
        ref: "Item"
      }
    },
    lvl: {
      type: Number,
      required: true,
      default: 1
    },
    exp: {
      type: Number,
      required: true,
      default: 0
    },
    paragonLvl: {
      type: Number,
      required: false
    },
    paragonExp: {
      type: Number,
      required: false
    },
    stats: {
      HP: {
        current: {
          type: Number,
          required: true
        },
        max: {
          type: Number,
          required: true
        },
        regen: {
          type: Number,
          required: true
        }
      },
      energy: {
        current: {
          type: Number,
          required: true
        },
        max: {
          type: Number,
          required: true
        },
        regen: {
          type: Number,
          required: true
        }
      },
      strength: {
        type: Number,
        required: true
      },
      accuracy: {
        type: Number,
        required: true
      },
      wisdom: {
        type: Number,
        required: true
      },
      armor: {
        type: Number,
        required: true,
        default: 0
      }
    },
    coords: {
      current: {
        x: {
          type: Number,
          required: true,
          default: 0
        },
        y: {
          type: Number,
          required: true,
          default: 0
        },
        z: {
          type: Number,
          required: true,
          default: 0
        }
      },
      camp: {
        x: {
          type: Number,
          required: true,
          default: 0
        },
        y: {
          type: Number,
          required: true,
          default: 0
        },
        z: {
          type: Number,
          required: true,
          default: 0
        }
      }
    },
    money: {
      copper: {
        type: Number,
        default: 0
      },
      silver: {
        type: Number,
        default: 0
      },
      gold: {
        type: Number,
        default: 0
      }
    },
    inventory: [
      {
        item: {
          type: ObjectId,
          ref: "Item"
        },
        count: {
          type: Number
        }
      }
    ]
    // reputation
    // talents
  }
)

export default mongoose.models.Character || mongoose.model("Character", CharacterSchema)