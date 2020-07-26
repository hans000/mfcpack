"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mc_config_1 = __importDefault(require("./mc.config"));
function initConfig() {
    const domain = path_1.default.resolve('./');
    const dist = path_1.default.join(domain, './mc.config.ts');
    if (fs_1.default.existsSync(dist)) {
        const relativePath = path_1.default.relative(__dirname, dist);
        const config = require(relativePath).default;
        if (config) {
            return Object.assign({}, mc_config_1.default, config);
        }
    }
    return mc_config_1.default;
}
exports.default = initConfig;
