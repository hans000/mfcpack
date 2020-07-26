import path from 'path'
import fse from 'fs-extra'
import initConfig from './initConfig'

export default class MFunction {
    private list: string[] = []
    private restName: string = ''
    private packName: string = ''
    private static config = initConfig()

    constructor(filename: string) {
        const match = /datapack\\(.+?)\\(.+)/.exec(filename)
        if (match) {
            const [, packName, restName] = match
            this.packName = packName
            this.restName = path.basename(restName, '.ts')
        } else {
            throw new Error('path invalid')
        }
    }
    /**
     * 添加一条内容
     * @param text 内容
     */
    public add(text: string): void;
    public add(text: string[]): void;
    public add(text: string | string[]) {
        if (Array.isArray(text)) {
            this.list.push(...text)
        } else {
            this.list.push(text)
        }
    }
    /**
     * 添加注释
     * @param comments 注释内容
     * @param spaceCount 空行数
     */
    public addComments(comments: string, spaceCount?: number): void;
    public addComments(comment: string[], spaceCount?: number): void;
    public addComments(comment: string | string[], spaceCount: number = 0) {
        this.list.push(...Array.from({ length: spaceCount }, () => ''))
        if (Array.isArray(comment)) {
            this.list.push(...comment.map(v => `# ${v}`))
        } else {
            this.list.push(`# ${comment}`)
        }
    }

    /**
     * 创建mcfunction文件
     */
    public create() {
        const p = path.join(MFunction.config.outDir, 'data', this.packName, 'functions',this.restName + '.mcfunction')
        fse.outputFile(p, this.list.join('\n'), (err) => {
            console.log(err);
        })
    }
}