"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcBuild = void 0;
const mongoose_1 = require("mongoose");
const PCBuildSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Types.ObjectId, ref: 'products', required: true },
    userEmail: { type: String, required: true },
});
exports.PcBuild = (0, mongoose_1.model)('PcBuild', PCBuildSchema);
