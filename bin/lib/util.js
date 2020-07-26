"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mout = exports.getPaths = exports.getRestName = exports.getPackName = exports.promisify = exports.parsePath = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function parsePath(fileName) {
    const match = /datapack\\(.+?)\\(.+)/.exec(fileName);
    if (match) {
        const [, packName, restName] = match;
        return [packName, restName];
    }
    return ['', ''];
}
exports.parsePath = parsePath;
function promisify(func) {
    return (...arg) => {
        return () => new Promise((resolve, reject) => {
            func(...arg, (err, arg) => {
                err ? reject(err) : resolve(arg);
            });
        });
    };
}
exports.promisify = promisify;
function getPackName(fileName) {
    return parsePath(fileName)[0];
}
exports.getPackName = getPackName;
function getRestName(fileName) {
    return parsePath(fileName)[1];
}
exports.getRestName = getRestName;
function getPaths(dir, reg = undefined, parent = '') {
    const list = [];
    if (!parent && !fs_1.default.existsSync(dir)) {
        return list;
    }
    const files = fs_1.default.readdirSync(dir);
    files.forEach(file => {
        const p = `${dir}/${file}`;
        const stats = fs_1.default.statSync(p);
        const full = `${parent}/${file}`;
        if (stats.isFile()) {
            if (reg && reg.test(full)) {
                list.push(full);
            }
            else {
                list.push(full);
            }
        }
        else {
            list.push(...getPaths(p, reg, full));
        }
    });
    return list;
}
exports.getPaths = getPaths;
function mout(filename) {
    const [packName, restName] = parsePath(filename);
    const bareName = path_1.default.basename(restName, '.ts');
    return `function ${packName}:${bareName}`;
}
exports.mout = mout;
