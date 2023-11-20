import React, { ReactNode } from "react";
import "./index.css";
import "./markdown.css";


function flattenAndExecute(array: any[], func: (s: any) => any[]) {
    let ret: any[] = [];
    array.forEach(s => ret.push(...func(s)));
    return ret;
}

export class BlockParser {
    static outsideCode(lines: any[], lineNum: number = 0): any[] {
        if (lineNum >= lines.length) return [];
        let isCodeLine = (lines[lineNum] as string).startsWith("```");
        if (isCodeLine) return this.insideCode(lines, lineNum+1, []);
        return [lines[lineNum]].concat(this.outsideCode(lines, lineNum+1));
    }

    static insideCode(lines: any[], lineNum: number = 0, inTablePending: string[] = []): any[] {
        if (lineNum >= lines.length) return inTablePending;
        let isCodeLine = (lines[lineNum] as string).startsWith("```");
        if (!isCodeLine) return this.insideCode(lines, lineNum+1, inTablePending.concat(lines[lineNum]));
        return [<pre className="md-code">{
            inTablePending.map(FullLineParser.codeLine) //nothing else allowed
            }</pre>].concat(this.outsideCode(lines, lineNum+1));
    }
    
    static outsideRollover(lines: any[], lineNum: number = 0): any[] {
        if (lineNum >= lines.length) return [];
        let isRolloverLine = (lines[lineNum] as string).startsWith("???");
        if (isRolloverLine) return this.insideRollover(lines, lineNum+1, []);
        return [lines[lineNum]].concat(this.outsideRollover(lines, lineNum+1));
    }

    static insideRollover(lines: any[], lineNum: number = 0, inTablePending: string[] = []): any[] {
        if (lineNum >= lines.length) return inTablePending;
        let isRolloverLine = (lines[lineNum] as string).startsWith("???");
        if (!isRolloverLine) return this.insideRollover(lines, lineNum+1, inTablePending.concat(lines[lineNum]));
        return [<div className="md-rollover">{
            inTablePending.join("\n") //needs all blocks
            }</div>].concat(this.outsideRollover(lines, lineNum+1));
    }

    static outsideTable(lines: any[], lineNum: number = 0): any[] {
        if (lineNum >= lines.length) return [];
        let isTableRow = (lines[lineNum] as string).startsWith("|");
        if (isTableRow) return this.insideTable(lines, lineNum+1, [lines[lineNum]]);
        return [lines[lineNum]].concat(this.outsideTable(lines, lineNum+1));
    }

    static insideTable(lines: string[], lineNum: number = 0, inTablePending: string[] = []): any[] {
        if (lineNum >= lines.length) return inTablePending;
        let isTableRow = (lines[lineNum] as string).startsWith("|");
        if (isTableRow) return this.insideTable(lines, lineNum+1, inTablePending.concat(lines[lineNum]));
        return [<table className="md-table"><tbody>{
                inTablePending.map(s => FullLineParser.tableLine(s as string)) 
                //needs all inline
            }</tbody></table>].concat(this.outsideTable(lines, lineNum));
    }
    
    static outsideList(lines: any[], lineNum: number = 0): any[] {
        if (lineNum >= lines.length) return [];
        let isListLine = (lines[lineNum] as string).startsWith("*");
        if (isListLine) return this.insideList(lines, lineNum+1, [lines[lineNum]]);
        return [lines[lineNum]].concat(this.outsideList(lines, lineNum+1));
    }

    static insideList(lines: any[], lineNum: number = 0, inListPending: string[] = []): any[] {
        if (lineNum >= lines.length) return inListPending;
        let isListLine = (lines[lineNum] as string).startsWith("*");
        if (isListLine) return this.insideList(lines, lineNum+1, inListPending.concat(lines[lineNum]));
        return [<ul className="md-list">{
            inListPending.map(FullLineParser.bulletLine)
            //needs all inline
            }</ul>
        ].concat(this.outsideList(lines, lineNum));
    }

    static toLines(block: string) {
        return block.split("\n");
    }
} 

export class FullLineParser {
    static all(lines: any[]): any[] {
        //do not let them intersect i.e. use map
        let ret = lines.map(FullLineParser.headingLine);
        ret = ret.map(FullLineParser.outsiderelativeDiv);        
        ret = ret.map(FullLineParser.newLines);        
        return ret;
    }

    static headingLine(line: any): any {
        if (typeof(line) != "string") return line;
        if (line[0] == "#") return [<h1>{line.substring(1)}</h1>];
        return line;
    }
    
    static newLines(line: any): any {
        if (typeof(line) != "string") return line;
        return [line,<br></br>]
    }
    
    static outsiderelativeDiv(line: any): any {
        if (typeof(line) != "string") return line;
        if (line[0] == "@" && line[1] == "[") return [FullLineParser.relativeDiv1(line)];
        return line;
    }
    
    static relativeDiv1(line: string, i: number = 2, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending];
        if (line[i] == "]" && line[i+1] == "(") return FullLineParser.relativeDiv2(line, i+2, pending, "");
        return FullLineParser.relativeDiv1(line, i+1, pending + line[i]);
    }
    
    static relativeDiv2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") {
            let [x,y] = pending.split(",");
            return [<div style={{position:"absolute",left:`calc(${x}% - 0.5em)`,top:`calc(${y}% - 0.5em)`}}>
                {pending2}
                </div>]}
        return FullLineParser.relativeDiv2(line, i+1, pending, pending2 + line[i]);
    }
    
    //USED FROM WITHIN BLOCK PARSERS
    static tableLine(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [<td>{pending}</td>];
        if (i == 0) return [<tr>{FullLineParser.tableLine(line, 1, "")}</tr>];
        if (line[i] == "|") return [<td>{pending}</td>].concat(FullLineParser.tableLine(line, i+1, ""));
        return FullLineParser.tableLine(line, i+1, pending+line[i]);
    }
    
    static bulletLine(line: string): any {
        return [<li className="md-bullet-list">{line.substring(1)}</li>];
    }
    
    static codeLine(line: string): any[] {
        return [<span className="tr">
                <span className="th"></span>
                <code>{line}</code>
            </span>];
    }
}

export class InlineParser {

    static outsideBold(line: any, i: number = 0, pending: string = ""): any[] {
        if (typeof(line) != "string") return [line];
        if (i >= line.length) return [pending];
        if (line[i] == "*") return [pending,...InlineParser.insideBold(line, i+1, "")];
        return InlineParser.outsideBold(line, i+1, pending + line[i]);
    }

    static insideBold(line: string, i: number = 0, pending: string = ""): any[] {
        if (line[i] == "*") return [<b>{pending}</b>].concat(InlineParser.outsideBold(line, i+1, ""));
        return InlineParser.insideBold(line, i+1, pending + line[i]);
    }

    static outsideSuper(line: any, i: number = 0, pending: string = ""): any[] {
        if (typeof(line) != "string") return [line];
        if (i >= line.length) return [pending];
        if (line[i] == "^") return [pending,...InlineParser.insideSuper(line, i+1, "")];
        return InlineParser.outsideSuper(line, i+1, pending + line[i]);
    }

    static insideSuper(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "^") return [<sup>{pending}</sup>].concat(InlineParser.outsideSuper(line, i+1, ""));
        if (line[i] == " ") return [<sup>{pending}</sup>].concat(InlineParser.outsideSuper(line, i+1, " "));
        return InlineParser.insideSuper(line, i+1, pending + line[i]);
    }
    
    static outsideSub(line: any, i: number = 0, pending: string = ""): any[] {
        if (typeof(line) != "string") return [line];
        if (i >= line.length) return [pending];
        if (line[i] == "~") return [pending,...InlineParser.insideSub(line, i+1, "")];
        return InlineParser.outsideSub(line, i+1, pending + line[i]);
    }

    static insideSub(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "~") return [<sub>{pending}</sub>].concat(InlineParser.outsideSub(line, i+1, ""));
        if (line[i] == " ") return [<sub>{pending}</sub>].concat(InlineParser.outsideSub(line, i+1, " "));
        return InlineParser.insideSub(line, i+1, pending + line[i]);
    }

    static outsideFraction(line: any, i: number = 0, pending: string = ""): any[] {
        if (typeof(line) != "string") return [line];
        if (i + 1 >= line.length) return [pending + line[i]];
        if (line[i] == "~" && line[i+1] == "[") return [pending,...InlineParser.fraction1(line, i+2, "")];
        return InlineParser.outsideFraction(line, i+1, pending + line[i]);
    }

    static fraction1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        if (line[i] == "]" && line[i+1] == "(") return InlineParser.fraction2(line, i+2, pending, "");
        return InlineParser.fraction1(line, i+1, pending + line[i]);
    }
    
    static fraction2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") return [
            <table className="md-fraction">
            <tbody><tr><td>{pending}</td></tr><tr><td>{pending2}</td></tr></tbody>
            </table>
        ].concat(InlineParser.outsideFraction(line, i+1, ""));
        return InlineParser.fraction2(line, i+1, pending, pending2 + line[i]);
    }
    
    static outsideimage(line: any, i: number = 0, pending: string = ""): any[] {
        if (typeof(line) != "string") return [line];
        if (i + 1 >= line.length) return [pending + line[i]];
        if (line[i] == "!" && line[i+1] == "[") return [pending,...InlineParser.image1(line, i+2, "")];
        return InlineParser.outsideimage(line, i+1, pending + line[i]);
    }

    static image1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        if (line[i] == "]" && line[i+1] == "(") return InlineParser.image2(line, i+2, pending, "");
        return InlineParser.image1(line, i+1, pending + line[i]);
    }
    
    static image2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") {            
            let size = pending.split(",")[1];
            if (size) {
                return [<img width={size+"%"} src={pending2} />].concat(InlineParser.outsideimage(line, i+1, ""));
            }
            return [<img src={pending2} />].concat(InlineParser.outsideimage(line, i+1, ""));
        }
        return InlineParser.image2(line, i+1, pending, pending2 + line[i]);
    }
    
    static outsideanchor(line: any, i: number = 0, pending: string = ""): any[] {
        if (typeof(line) != "string") return [line];
        if (i >= line.length) return [pending];
        if (line[i] == "[") return [pending,...InlineParser.anchor1(line, i+1, "")];
        return InlineParser.outsideanchor(line, i+1, pending + line[i]);
    }

    static anchor1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        console.log(line[i]);
        if (line[i] == "]" && line[i+1] == "(") return InlineParser.anchor2(line, i+2, pending, "");
        return InlineParser.anchor1(line, i+1, pending + line[i]);
    }
    
    static anchor2(line: any, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") {            
            return [<a href={pending2} target="_blank">{pending}</a>].concat(InlineParser.outsideanchor(line, i+1, ""));
        }
        return InlineParser.anchor2(line, i+1, pending, pending2 + line[i]);
    }
} 

export class FuncStack {
    inlineStack: any[];
    constructor(stack: any[]) {
        this.inlineStack = stack;
    }

    nextInline(value: any): (s: any) => any {
        if (this.inlineStack) { 
            return this.inlineStack[0];
        }
        return (s: any) => s;
    }

    innerStack() {
        if (this.inlineStack.length > 1) {
            return new FuncStack(this.inlineStack.slice(1));
        }
        return new FuncStack([(s: any) => s]);
    }
}