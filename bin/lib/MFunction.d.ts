export default class MFunction {
    private list;
    private restName;
    private packName;
    private static config;
    constructor(filename: string);
    /**
     * 添加一条内容
     * @param text 内容
     */
    add(text: string): void;
    add(text: string[]): void;
    /**
     * 添加注释
     * @param comments 注释内容
     * @param spaceCount 空行数
     */
    addComments(comments: string, spaceCount?: number): void;
    addComments(comment: string[], spaceCount?: number): void;
    /**
     * 创建mcfunction文件
     */
    create(): void;
}
