const mongoose = require("mongoose");

const constactSchema = mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please add the contact name"],
        },
        email: {
            type: String,
            required: [true, "Please add the contact email address"],
        },
        phone: {
            type: String,
            required: [true, "Please add the contact phone number"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", constactSchema);