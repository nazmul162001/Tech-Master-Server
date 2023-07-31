"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcBuildService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pcBuild_model_1 = require("./pcBuild.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createPcBuild = (pcBuildData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(pcBuildData?.product)
    // console.log('pcBuild = ', pcBuildData?.userEmail)
    const existingProduct = yield pcBuild_model_1.PcBuild.findOne({
        $and: [
            { userEmail: pcBuildData === null || pcBuildData === void 0 ? void 0 : pcBuildData.userEmail },
            { product: pcBuildData === null || pcBuildData === void 0 ? void 0 : pcBuildData.product },
        ],
    });
    if (existingProduct) {
        // If a matching PC build already exists, throw an error
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already Added this product');
    }
    let pcBuildAllData = null;
    // Start the transaction
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const pcBuild = yield pcBuild_model_1.PcBuild.create([pcBuildData], { session });
        if (!pcBuild.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create pcBuildData');
        }
        pcBuildAllData = pcBuild[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return pcBuildAllData;
});
exports.PcBuildService = {
    createPcBuild,
};
