const path = require('path')
const fs = require('fs')

function getPaths(dir, parent = '') {
    const list = []
    const files = fs.readdirSync(dir)
    files.forEach(file => {
        const p = `${dir}/${file}`
        const stats = fs.statSync(p)
        const full = `${parent}/${file}`
        if (stats.isFile()) {
            if (/\.(t|j)s$/.test(full)) {
                list.push(full)
            }
        } else {
            list.push(...getPaths(p, full))
        }
    })
    return list
}

const data = getPaths(path.resolve(__dirname, 'src/datapack'))
const entry = data.reduce((s, v) => {
    const name = path.basename(v, '.ts')
    s[name] = './src/datapack' + v
    return s
}, {})

module.exports = {
    mode: 'development',
    entry: {
        foo: path.resolve(__dirname, './src/datapack/test/foo.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            }
        ]
    }
}