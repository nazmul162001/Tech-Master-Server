"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcBuild = void 0;
const express_1 = __importDefault(require("express"));
const pcBuild_controller_1 = require("./pcBuild.controller");
const router = express_1.default.Router();
router.post('/', pcBuild_controller_1.PcBuildController.createPcBuild);
router.get('/', pcBuild_controller_1.PcBuildController.getPcBuild);
exports.PcBuild = router;
