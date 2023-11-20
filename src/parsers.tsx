import "./index.css";
import "./markdown.css";



export class BlockParser {
    static outside(lines: any[], lineNum: number = 0): any[] {
        if (lineNum >= lines.length) return [];
        if ((lines[lineNum] as string).startsWith("```")) return this.insideCode(lines, lineNum+1, []);
        if ((lines[lineNum] as string).startsWith("???")) return this.insideRollover(lines, lineNum+1, []);
        if ((lines[lineNum] as string).startsWith("|")) return this.insideTable(lines, lineNum+1, [lines[lineNum]]);
        if ((lines[lineNum] as string).startsWith("*")) return this.insideList(lines, lineNum+1, [lines[lineNum]]);
        return [FullLineParser.outside(lines[lineNum])].concat(this.outside(lines, lineNum+1));
    }

    static insideCode(lines: any[], lineNum: number = 0, pending: string[] = []): any[] {
        if (lineNum < lines.length && !(lines[lineNum] as string).startsWith("```")) return this.insideCode(lines, lineNum+1, pending.concat(lines[lineNum]));
        return [<pre className="md-code">{
            pending.map(FullLineParser.codeLine) //nothing else allowed
            }</pre>].concat(this.outside(lines, lineNum+1));
    }

    static insideRollover(lines: any[], lineNum: number = 0, pending: string[] = []): any[] {
        if (lineNum < lines.length && !(lines[lineNum] as string).startsWith("???")) return this.insideRollover(lines, lineNum+1, pending.concat(lines[lineNum]));
        return [<div className="md-rollover">{
            pending.map(FullLineParser.outside)
            }</div>].concat(this.outside(lines, lineNum+1));
    }

    static insideTable(lines: any[], lineNum: number = 0, pending: string[] = []): any[] {
        if (lineNum < lines.length && (lines[lineNum] as string).startsWith("|")) return this.insideTable(lines, lineNum+1, pending.concat(lines[lineNum]));
        if (lineNum < lines.length) pending.push(lines[lineNum]);
        return [<table className="md-table"><tbody>{
            pending.map(s => FullLineParser.tableLine(s as string)) 
            }</tbody></table>].concat(this.outside(lines, lineNum));
    }

    static insideList(lines: any[], lineNum: number = 0, pending: string[] = []): any[] {
        if (lineNum < lines.length && (lines[lineNum] as string).startsWith("*")) return this.insideList(lines, lineNum+1, pending.concat(lines[lineNum]));
        if (lineNum < lines.length) pending.push(lines[lineNum]);
        return [<ul className="md-list">{
            pending.map(FullLineParser.bulletLine)
            }</ul>
        ].concat(this.outside(lines, lineNum));
    }

    static toLines(block: string) {
        return block.split("\n");
    }
} 

export class FullLineParser {

    static outside(line: any): any {
        if (line[0] == "#") return <h1>{InlineParser.outside(line.substring(1))}</h1>;
        if (line[0] == "@" && line[1] == "[") return [FullLineParser.insideRelativeDiv1(line)];
        return [InlineParser.outside(line),<br></br>];
    }
            
    static insideRelativeDiv1(line: string, i: number = 2, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending];
        if (line[i] == "]" && line[i+1] == "(") return FullLineParser.insideRelativeDiv2(line, i+2, pending, "");
        return FullLineParser.insideRelativeDiv1(line, i+1, pending + line[i]);
    }
    
    static insideRelativeDiv2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [InlineParser.outside(pending),InlineParser.outside(pending2)];
        if (line[i] == ")") {
            let [x,y] = pending.split(",");
            return [<div style={{position:"absolute",left:`calc(${x}% - 0.5em)`,top:`calc(${y}% - 0.5em)`}}>
                {InlineParser.outside(pending2)}
                </div>]}
        return FullLineParser.insideRelativeDiv2(line, i+1, pending, pending2 + line[i]);
    }
    
    //USED FROM WITHIN BLOCK PARSERS
    static tableLine(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [<td>{InlineParser.outside(pending)}</td>];
        if (i == 0) return [<tr>{FullLineParser.tableLine(line, 1, "")}</tr>];
        if (line[i] == "|") return [<td>{
            InlineParser.outside(pending)
            }</td>].concat(FullLineParser.tableLine(line, i+1, ""));
        return FullLineParser.tableLine(line, i+1, pending+line[i]);
    }
    
    static bulletLine(line: string): any {
        return [<li className="md-bullet-list">{
            InlineParser.outside(line.substring(1))
            }</li>];
    }
    
    static codeLine(line: string): any[] {
        return [<span className="tr">
                <span className="th"></span>
                <code>{line}</code>
            </span>];
    }
}

export class InlineParser {

    static outside(line: any, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "*") return [pending,...InlineParser.insideBold(line, i+1, "")];
        if (line[i] == "^") return [pending,...InlineParser.insideSuper(line, i+1, "")];
        if (line[i] == "~") return [pending,...InlineParser.insideSub(line, i+1, "")];
        if (line[i] == "[") return [pending,...InlineParser.insideAnchor1(line, i+1, "")];
        if (i+1 <= line.length && line[i] == "~" && line[i+1] == "[") return [pending,...InlineParser.insideFraction1(line, i+2, "")];
        if (i+1 <= line.length && line[i] == "!" && line[i+1] == "[") return [pending,...InlineParser.insideImage1(line, i+2, "")];
        return InlineParser.outside(line, i+1, pending + line[i]);
    }

    static insideBold(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "*") return [<b>{pending}</b>].concat(InlineParser.outside(line, i+1, ""));
        return InlineParser.insideBold(line, i+1, pending + line[i]);
    }

    static insideSuper(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "^") return [<sup>{pending}</sup>].concat(InlineParser.outside(line, i+1, ""));
        if (line[i] == " ") return [<sup>{pending}</sup>].concat(InlineParser.outside(line, i+1, " "));
        return InlineParser.insideSuper(line, i+1, pending + line[i]);
    }
    
    static insideSub(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "~") return [<sub>{pending}</sub>].concat(InlineParser.outside(line, i+1, ""));
        if (line[i] == " ") return [<sub>{pending}</sub>].concat(InlineParser.outside(line, i+1, " "));
        return InlineParser.insideSub(line, i+1, pending + line[i]);
    }

    static insideFraction1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        if (line[i] == "]" && line[i+1] == "(") return InlineParser.insideFraction2(line, i+2, pending, "");
        return InlineParser.insideFraction1(line, i+1, pending + line[i]);
    }
    
    static insideFraction2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") return [
            <table className="md-fraction">
            <tbody><tr><td>{pending}</td></tr><tr><td>{pending2}</td></tr></tbody>
            </table>
        ].concat(InlineParser.outside(line, i+1, ""));
        return InlineParser.insideFraction2(line, i+1, pending, pending2 + line[i]);
    }

    static insideImage1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        if (line[i] == "]" && line[i+1] == "(") return InlineParser.insideImage2(line, i+2, pending, "");
        return InlineParser.insideImage1(line, i+1, pending + line[i]);
    }
    
    static insideImage2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") {            
            let size = pending.split(",")[1];
            if (size) {
                return [<img width={size+"%"} src={pending2} />].concat(InlineParser.outside(line, i+1, ""));
            }
            return [<img src={pending2} />].concat(InlineParser.outside(line, i+1, ""));
        }
        return InlineParser.insideImage2(line, i+1, pending, pending2 + line[i]);
    }

    static insideAnchor1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        console.log(line[i]);
        if (line[i] == "]" && line[i+1] == "(") return InlineParser.insideAnchor2(line, i+2, pending, "");
        return InlineParser.insideAnchor1(line, i+1, pending + line[i]);
    }
    
    static insideAnchor2(line: any, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") {            
            return [<a href={pending2} target="_blank">{pending}</a>].concat(InlineParser.outside(line, i+1, ""));
        }
        return InlineParser.insideAnchor2(line, i+1, pending, pending2 + line[i]);
    }
}