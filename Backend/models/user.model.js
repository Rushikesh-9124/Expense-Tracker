const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        fullName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        profileImageUrl: { type: String, default: "" },
    },{
        timestamps: true
    }
)

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)