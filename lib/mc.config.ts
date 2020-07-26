import path from 'path'

export interface IConfig {
    outDir: string;
    mcmeta: {
        pack: {
            pack_format: number;
            description: string;
        };
    }
}

export default {
    outDir: path.resolve('./', 'dist'), // 输出目录,
    mcmeta: {
        pack: {
            pack_format: 4,
            description: 'datapack description'
        }
    }
} as IConfig