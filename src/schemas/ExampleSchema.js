const { Schema } = require("mongoose");

const Example = new Schema({
    guildId: {
        type: String,
        required: true
    }
})