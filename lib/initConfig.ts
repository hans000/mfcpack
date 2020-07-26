import path from 'path'
import fs from 'fs'
import { IConfig } from './mc.config'
import defaultConfig from './mc.config'

export default function initConfig(): IConfig {
    const domain = path.resolve('./')
    const dist = path.join(domain, './mc.config.ts')

    if (fs.existsSync(dist)) {
        const relativePath = path.relative(__dirname, dist)
        const config = require(relativePath).default
        if (config) {
            return Object.assign({}, defaultConfig, config)
        }
    }
    return defaultConfig
}

