"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const zoneSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 32,
    },
    totalRoutes: {
        type: Number,
        required: true
    },
    totalBetas: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Zone', zoneSchema);
//# sourceMappingURL=zoneModel.js.map