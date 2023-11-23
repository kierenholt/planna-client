import { IExpression, TemplateExpression } from "./expression";
import { MarkdownParser } from "./parsers";


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

|a|b|c ___
|d|e|f A. B. C. D.

    `;

    let fieldTest = `
A. option 1
B. option 2
C. option 3
D. option 4
A. option 1
B. option 2
    
    
    `

    let dollarTest = `
$$ __
A.
B.
`

    let comment = `add(b,4)
100,1000,10000`;
    let e: IExpression[] = TemplateExpression.fromComment(comment);

    return <div>
        {
            //e.map(e => <p>{e.value}</p>)
        new MarkdownParser(e).parse(dollarTest)
        
        };
    </div>
}