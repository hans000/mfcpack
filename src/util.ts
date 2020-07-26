import path from 'path'
import fs from 'fs'

export function parsePath(fileName: string) {
    const match = /datapack\\(.+?)\\(.+)/.exec(fileName)
    if (match) {
        const [, packName, restName] = match
        return [packName, restName]
    }
    return ['', '']
}
export function promisify(func: any) {
    return (...arg: any) => {
        return () => new Promise((resolve, reject) => {
            func(...arg, (err: any, arg: any) => {
                err ? reject(err) : resolve(arg)
            })
        })
    }
}
export function getPackName(fileName: string) {
    return parsePath(fileName)[0]
}
export function getRestName(fileName: string) {
    return parsePath(fileName)[1]
}

export function getPaths(dir: string, reg: RegExp | undefined = undefined, parent = '') {
    const list: string[] = []
    const files = fs.readdirSync(dir)
    files.forEach(file => {
        const p = `${dir}/${file}`
        const stats = fs.statSync(p)
        const full = `${parent}/${file}`
        if (stats.isFile()) {
            if (reg && reg.test(full)) {
                list.push(full)
            } else {
                list.push(full)
            }
        } else {
            list.push(...getPaths(p, reg, full))
        }
    })
    return list
}

export function mout(filename: string) {
    const [packName, restName] = parsePath(filename)
    const bareName = path.basename(restName, '.ts')
    return `function ${packName}:${bareName}`
}