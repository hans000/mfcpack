#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const util_1 = require("./util");
const child_process_1 = __importDefault(require("child_process"));
const fs_extra_1 = require("fs-extra");
const initConfig_1 = __importDefault(require("./initConfig"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
let spinner = ora_1.default('开始编译').start();
const domain = path_1.default.resolve('./');
const config = initConfig_1.default();
const datapackDir = path_1.default.join(domain, './src/datapack');
const assetsDir = path_1.default.join(domain, './src/assets');
const fnPaths = util_1.getPaths(datapackDir, /\.(t|j)s$/);
const assetsPaths = util_1.getPaths(assetsDir);
const outDir = config.outDir;
const entryPath = path_1.default.join(domain, './src/index.ts');
const chain = [];
let handle = Promise.resolve();
chain.push(util_1.promisify((handle) => {
    spinner.text = '清理输入目录';
    rimraf_1.default(outDir, handle);
})());
chain.push(util_1.promisify((handle) => {
    spinner.text = '生成meta文件';
    fs_extra_1.outputFile(path_1.default.join(outDir, 'pack.mcmeta'), JSON.stringify(config.mcmeta, null, 4), handle);
})());
assetsPaths.forEach((p, i) => {
    chain.push(util_1.promisify((p, i, callback) => {
        spinner.text = `拷贝json资源文件, ${i + 1}/${assetsPaths.length}`;
        fs_extra_1.copy(path_1.default.join(assetsDir, p), path_1.default.join(outDir, 'data', p), callback);
    })(p, i));
});
chain.push(util_1.promisify((callback) => {
    let data = '// 此文件内容自动生成，请勿修改\n';
    for (let i = 0; i < fnPaths.length; i++) {
        const p = fnPaths[i];
        if (p.includes(' ')) {
            callback(`路径不能有空格，${p}`);
            return;
        }
        data += `import "./datapack${p}"\n`;
    }
    fs_extra_1.outputFile(entryPath, data, callback);
})());
chain.push(util_1.promisify((callback) => {
    spinner.text = `编译mcfunction文件`;
    child_process_1.default.exec(`npx ts-node ./src/index.ts`, callback);
})());
chain.push(util_1.promisify((callback) => {
    spinner.succeed(`${chalk_1.default.greenBright('编译完成！')}`);
    spinner.stop();
    callback();
})());
function build() {
    while (chain.length) {
        handle = handle.then(chain.shift(), (err) => {
            spinner.stop();
            return Promise.reject(err);
        });
    }
}
build();
