import { BlockParser, FullLineParser, InlineParser } from "./parsers";


export function ParserPreview() {
    let str1 = `
    
aa
bb
*cc
*dd
ee
*ff

# heading
    
    `;
    return <div>
        {
        BlockParser.insideList(BlockParser.toLines(str1))
        //FullLineParser.all(BlockParser.toLines(str1))
        //InlineParser.all(str1)
        };
    </div>
}