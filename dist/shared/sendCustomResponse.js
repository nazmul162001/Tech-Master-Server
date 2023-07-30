"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessResponse = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendSuccessResponse = (res, data) => {
    const response = {
        statusCode: http_status_1.default.OK,
        success: true,
        meta: data.meta,
        data: data.data,
        message: data.message || 'Success',
    };
    res.status(http_status_1.default.OK).json(response);
};
exports.sendSuccessResponse = sendSuccessResponse;
