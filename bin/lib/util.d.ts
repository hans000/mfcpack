export declare function parsePath(fileName: string): string[];
export declare function promisify(func: any): (...arg: any) => () => Promise<unknown>;
export declare function getPackName(fileName: string): string;
export declare function getRestName(fileName: string): string;
export declare function getPaths(dir: string, reg?: RegExp | undefined, parent?: string): string[];
export declare function mout(filename: string): string;
