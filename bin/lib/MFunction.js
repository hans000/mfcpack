"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const initConfig_1 = __importDefault(require("./initConfig"));
class MFunction {
    constructor(filename) {
        this.list = [];
        this.restName = '';
        this.packName = '';
        const match = /datapack\\(.+?)\\(.+)/.exec(filename);
        if (match) {
            const [, packName, restName] = match;
            this.packName = packName;
            this.restName = path_1.default.basename(restName, '.ts');
        }
        else {
            throw new Error(`path parse error, the namespace maybe missing, ${filename}`);
        }
    }
    add(text) {
        if (Array.isArray(text)) {
            this.list.push(...text);
        }
        else {
            this.list.push(text);
        }
    }
    addComments(comment, spaceCount = 0) {
        this.list.push(...Array.from({ length: spaceCount }, () => ''));
        if (Array.isArray(comment)) {
            this.list.push(...comment.map(v => `# ${v}`));
        }
        else {
            this.list.push(`# ${comment}`);
        }
    }
    /**
     * 创建mcfunction文件
     */
    create() {
        const p = path_1.default.join(MFunction.config.outDir, 'data', this.packName, 'functions', this.restName + '.mcfunction');
        fs_extra_1.default.outputFile(p, this.list.join('\n'), (err) => {
            console.log(err);
        });
    }
}
exports.default = MFunction;
MFunction.config = initConfig_1.default();
