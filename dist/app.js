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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const sendCustomResponse_1 = require("./shared/sendCustomResponse");
const notFoundRoute_1 = __importDefault(require("./app/routes/notFoundRoute"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Welcome Route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const responseData = {
        message: 'Welcome to the Server',
        data: null,
    };
    (0, sendCustomResponse_1.sendSuccessResponse)(res, responseData);
}));
// Application routes
app.use('/api/v1', routes_1.default);
//global error handler
app.use(globalErrorHandler_1.default);
// handle not found route
app.use(notFoundRoute_1.default);
exports.default = app;
