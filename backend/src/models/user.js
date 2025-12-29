const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        lowercase:true,
        trim:true,
        unique:true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    searchHistory: [
        {
            query: {
                type: String,
                required: true
            },
            searchedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
    {

        timestamps: true

    }
);
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    
});
userSchema.methods.comparePasswords = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
};
module.exports = mongoose.model("User", userSchema);