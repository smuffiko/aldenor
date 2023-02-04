import mongoose from "mongoose"

const { String, Number, ObjectId, Boolean } = mongoose.Schema.Types

const CharacterSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectId,
      ref: "User"
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["ban", "user", "mod", "admin", "root"]
    }, 
    name: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: Number,
      required: true,
      enum: [0,1] // 0 = male, 1 = female
    },
    hair: {
      type: Number,
      required: true
    },
    skin: {
      type: String,
      enum: [
        // human
        "Desert",
        "Mountaineer", 
        "Plains",
        // elf
        "Forest",
        "Mountain",
        "Plains",
        // dwarf
        "Dark",
        "Deep",
        "Rock",
        // halfling
        "Hills",
        "Meadows",
        "Town"
      ]
    },
    race: {
      type: String,
      required: true,
      enum: ["Human","Elf","Dwarf","Halfling"]
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
        ref: "Item",
        default: null
      },
      shoulders: {
        type: ObjectId,
        ref: "Item",
        default: null
      },
      chest: {
        type: ObjectId,
        ref: "Item",
        default: null
      },
      legs: {
        type: ObjectId,
        ref: "Item",
        default: null
      },
      shoes: {
        type: ObjectId,
        ref: "Item",
        default: null
      },
      mainHand: {
        type: ObjectId,
        ref: "Item",
        default: null
      },
      offHand: {
        type: ObjectId,
        ref: "Item",
        default: null
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
    maxExp: {
      type: Number,
      required: true,
      default: 5
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
          required: true,
          default: 10
        },
        max: {
          type: Number,
          required: true,
          default: 10
        },
        regen: {
          type: Number,
          required: true,
          default: 5
        }
      },
      energy: {
        current: {
          type: Number,
          required: true,
          default: 10
        },
        max: {
          type: Number,
          required: true,
          default: 10
        },
        regen: {
          type: Number,
          required: true,
          default: 5
        }
      },
      combatEnergy: { // mana, ammo
        current: {
          type: Number
        },
        max: {
          type: Number
        },
        regen: {
          type: Number
        }
      },
      stamina: {
        type: Number,
        required: true,
        default: 10
      },
      strength: {
        type: Number,
        required: true,
        default: 10
      },
      agility: {
        type: Number,
        required: true,
        default: 10
      },
      wisdom: {
        type: Number,
        required: true,
        default: 10
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
        map: {
          type: ObjectId,
          ref: "Map"
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
        map: {
          type: ObjectId,
          ref: "Map"
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
    ],
    reputation: {
      tradesville: {
        type: Number,
        required: true,
        default: 0
      },
      gravestor: {
        type: Number,
        required: true,
        default: 0
      },
      wadle: {
        type: Number,
        required: true,
        default: 0
      },
      moonshire: {
        type: Number,
        required: true,
        default: 0
      },
      destenor: {
        type: Number,
        required: true,
        default: 0
      }
    }
    // talents
  }
)

export default mongoose.models.Character || mongoose.model("Character", CharacterSchema)