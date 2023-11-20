import { BlockParser, FullLineParser, InlineParser } from "./parsers";


export function ParserPreview() {
    let inlineTest = `aaa*bold*bbb^super^ccc~sub~ddd![image](image)eee[link](link)`;
    let fullLineTest = `#heading with ![image](image)
*bbb*bold*
new lines
`
    let blockTest = `
???
* bullet1
* bullet2
#heading1
???

|a|b|c
|d|e|f

    `
    return <div>
        {
        BlockParser.outside(BlockParser.toLines(blockTest))
        //BlockParser.toLines(fullLineTest).map(FullLineParser.outside)
        //FullLineParser.outside(fullLineTest)
        //InlineParser.outside(inlineTest)
        //InlineParser.outside("")
        
        };
    </div>
}