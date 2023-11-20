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
    
    let funcStack = [
        InlineParser.outsideBold, InlineParser.outsideFraction, InlineParser.outsideSub,
        InlineParser.outsideSuper, InlineParser.outsideanchor, InlineParser.outsideimage                  
    ];

    return <div>
        {
        //BlockParser.insideList(BlockParser.toLines(str1))
        //FullLineParser.all(BlockParser.toLines(str1))
        funcStack[0](str1)
        };
    </div>
}