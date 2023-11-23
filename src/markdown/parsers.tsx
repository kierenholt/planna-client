import "../index.css";
import "./markdown.css";
import { IExpression } from "./expression";
import { MDRadio } from "./mdRadio";
import { Helpers } from "../helpers";
import { MDTextArea } from "./mdTextArea";
import { MDInput } from "./mdInput";
import { MDSelect } from "./mdSelect";

export interface FieldElementProps {
    index: number,
    UID: string,
    seed: number
}

export class MarkdownParser {
    expressions: IExpression[];
    currentExpressionIndex: number = 0;
    prevRadioLetter: string = "~"; //later than Z
    currentUID: string = crypto.randomUUID();
    
    constructor(expressions: IExpression[])  {
        this.expressions = expressions;
    }

    isNewRadioGroup(letter: string): boolean {
        if (letter == this.prevRadioLetter) throw(`repeated radio letter`);
        let ret = letter < this.prevRadioLetter; 
        console.log("new radio " + ret);
        this.prevRadioLetter = letter;
        return ret;
    }

    nextFieldProps(doIncrement: boolean = true): FieldElementProps {
        let i = doIncrement ? this.currentExpressionIndex++ : this.currentExpressionIndex;
        if (doIncrement) this.currentUID = crypto.randomUUID();
        return { 
            index: i,
            UID: this.currentUID,
            seed: this.expressions[0].seed()
        };
    }
    
    //used by dollars
    get nextExpressionValue(): string {
        return  this.expressions[this.currentExpressionIndex++].value
    }

    parse(markdown: string): any[] {
        return this.outside(this.toLines(markdown));
    }

    outside(lines: any[], lineNum: number = 0): any[] {
        if (lineNum >= lines.length) return [];
        if ((lines[lineNum] as string).startsWith("```")) return this.insideCode(lines, lineNum+1, []);
        if ((lines[lineNum] as string).startsWith("???")) return this.insideRollover(lines, lineNum+1, []);
        if ((lines[lineNum] as string).startsWith("|")) return this.insideTable(lines, lineNum+1, [lines[lineNum]]);
        if ((lines[lineNum] as string).startsWith("*")) return this.insideList(lines, lineNum);
        return [this.fullLine_Outside(lines[lineNum]),
            ...this.outside(lines, lineNum+1)];
    }

    insideCode(lines: any[], lineNum: number = 0, pending: string[] = []): any[] {
        if (lineNum < lines.length && !(lines[lineNum] as string).startsWith("```")) return this.insideCode(lines, lineNum+1, [...pending,lines[lineNum]]);
        return [<pre className="md-code">{
            pending.map(this.codeLine) //nothing else allowed
            }</pre>,...this.outside(lines, lineNum+1)];
    }

    insideRollover(lines: any[], lineNum: number = 0, pending: string[] = []): any[] {
        if (lineNum < lines.length && !(lines[lineNum] as string).startsWith("???")) return this.insideRollover(lines, lineNum+1, [...pending,lines[lineNum]]);
        return [<div className="md-rollover">{
            this.outside(pending)
            }</div>,...this.outside(lines, lineNum+1)];
    }

    insideTable(lines: any[], lineNum: number = 0, pending: string[] = []): any[] {
        if (lineNum < lines.length && (lines[lineNum] as string).startsWith("|")) return this.insideTable(lines, lineNum+1, [...pending,lines[lineNum]]);
        return [<table className="md-table"><tbody>{
            pending.map(s => this.tableLine(s as string)) 
            }</tbody></table>,...this.outside(lines, lineNum)];
    }

    insideList(lines: any[], lineNum: number = 0, pending: string[] = []): any[] {
        if (lineNum < lines.length && (lines[lineNum] as string).startsWith("*")) return this.insideList(lines, lineNum+1, [...pending,lines[lineNum]]);
        return [<ul className="md-list">{
            pending.map(this.bulletLine.bind(this))
            }</ul>
        ,...this.outside(lines, lineNum)];
    }

    toLines(block: string) {
        return block.split("\n");
    }

    //FULL LINES

    fullLine_Outside(line: any): any {
        if (line[0] == "#") return <h1>{this.inline_outside(line.substring(1))}</h1>;
        if (line[0] == "@" && line[1] == "[") return [this.insideRelativeDiv1(line)];
        return [this.inline_outside(line),<br></br>];
    }
            
    insideRelativeDiv1(line: string, i: number = 2, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending];
        if (line[i] == "]" && line[i+1] == "(") return this.insideRelativeDiv2(line, i+2, pending, "");
        return this.insideRelativeDiv1(line, i+1, pending + line[i]);
    }
    
    insideRelativeDiv2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [this.inline_outside(pending),this.inline_outside(pending2)];
        if (line[i] == ")") {
            let [x,y] = pending.split(",");
            return [<div style={{position:"absolute",left:`calc(${x}% - 0.5em)`,top:`calc(${y}% - 0.5em)`}}>
                {this.inline_outside(pending2)}
                </div>]}
        return this.insideRelativeDiv2(line, i+1, pending, pending2 + line[i]);
    }
    
    //USED FROM WITHIN BLOCK PARSERS
    tableLine(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [<td>{this.inline_outside(pending)}</td>];
        if (i == 0) return [<tr>{this.tableLine(line, 1, "")}</tr>];
        if (line[i] == "|") return [<td>{
            this.inline_outside(pending)
            }</td>,...this.tableLine(line, i+1, "")];
        return this.tableLine(line, i+1, pending+line[i]);
    }
    
    bulletLine(line: string): any {
        return [<li className="md-bullet-list">{
            this.inline_outside(line.substring(1))
            }</li>];
    }
    
    codeLine(line: string): any[] {
        return [<span className="tr">
                <span className="th"></span>
                <code>{line}</code>
            </span>];
    }

    //INLINE

    inline_outside(line: any, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "*") return [pending,...this.insideBold(line, i+1)];
        if (line[i] == "^") return [pending,...this.insideSuper(line, i+1)];
        if (line[i] == "~") return [pending,...this.insideSub(line, i+1)];
        if (line[i] == "[") return [pending,...this.insideAnchor1(line, i+1)];
        if (i+1 < line.length && Helpers.isUpperAlpha(line[i]) && line[i+1] == ".") {
            let isNewRadioGroup = this.isNewRadioGroup(line[i]);
            return [pending,
                <MDRadio fieldProps={this.nextFieldProps(isNewRadioGroup)} letter={line[i]}/>,
                ...this.inline_outside(line, i+2)];
        }
        if (line[i] == "{") return [pending,...this.insideDropdown(line, i+1)];
        if (i+1 < line.length && line[i] == "_" && line[i+1] == "_") return [pending,...this.insideInput(line, i+2)];
        if (i+1 < line.length && line[i] == "$" && line[i+1] == "$") {
            return [pending,this.nextExpressionValue,...this.inline_outside(line, i+2)];
        }
        if (i+1 < line.length && line[i] == "~" && line[i+1] == "[") return [pending,...this.insideFraction1(line, i+2)];
        if (i+1 < line.length && line[i] == "!" && line[i+1] == "[") return [pending,...this.insideImage1(line, i+2)];
        return this.inline_outside(line, i+1, pending + line[i]);
    }

    insideBold(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "*") return [<b>{pending}</b>,...this.inline_outside(line, i+1, "")];
        return this.insideBold(line, i+1, pending + line[i]);
    }

    insideInput(line: string, i: number = 0, width: number = 3): any[] {
        if (i >= line.length || line[i] != "_") {
            return width > 10 ? 
                [<MDTextArea {...this.nextFieldProps()}/>,...this.inline_outside(line, i)] :
                [<MDInput {...this.nextFieldProps()}/>,...this.inline_outside(line, i)] 
        }
        return this.insideInput(line, i+1, width+1);
    }

    insideDropdown(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "}") {
            let options = pending.split("/");
            return [<MDSelect options={options} fieldProps={this.nextFieldProps()} />
                ,...this.inline_outside(line, i+1)]
        }
        return this.insideDropdown(line, i+1, pending + line[i]);
    }

    insideSuper(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "^") return [<sup>{pending}</sup>,...this.inline_outside(line, i+1, "")];
        if (line[i] == " ") return [<sup>{pending}</sup>,...this.inline_outside(line, i+1, " ")];
        return this.insideSuper(line, i+1, pending + line[i]);
    }
    
    insideSub(line: string, i: number = 0, pending: string = ""): any[] {
        if (i >= line.length) return [pending];
        if (line[i] == "~") return [<sub>{pending}</sub>,...this.inline_outside(line, i+1, "")];
        if (line[i] == " ") return [<sub>{pending}</sub>,...this.inline_outside(line, i+1, " ")];
        return this.insideSub(line, i+1, pending + line[i]);
    }

    insideFraction1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        if (line[i] == "]" && line[i+1] == "(") return this.insideFraction2(line, i+2, pending, "");
        return this.insideFraction1(line, i+1, pending + line[i]);
    }
    
    insideFraction2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") return [
            <table className="md-fraction">
            <tbody><tr><td>{pending}</td></tr><tr><td>{pending2}</td></tr></tbody>
            </table>
        ,...this.inline_outside(line, i+1, "")];
        return this.insideFraction2(line, i+1, pending, pending2 + line[i]);
    }

    insideImage1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        if (line[i] == "]" && line[i+1] == "(") return this.insideImage2(line, i+2, pending, "");
        return this.insideImage1(line, i+1, pending + line[i]);
    }
    
    insideImage2(line: string, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") {            
            let size = pending.split(",")[1];
            if (size) {
                return [<img width={size+"%"} src={pending2} />,...this.inline_outside(line, i+1, "")];
            }
            return [<img src={pending2} />,...this.inline_outside(line, i+1, "")];
        }
        return this.insideImage2(line, i+1, pending, pending2 + line[i]);
    }

    insideAnchor1(line: string, i: number = 0, pending: string = ""): any[] {
        if (i + 1 >= line.length) return [pending + line[i]];
        console.log(line[i]);
        if (line[i] == "]" && line[i+1] == "(") return this.insideAnchor2(line, i+2, pending, "");
        return this.insideAnchor1(line, i+1, pending + line[i]);
    }
    
    insideAnchor2(line: any, i: number = 0, pending: string = "", pending2: string = ""): any[] {
        if (i >= line.length) return [pending,pending2];
        if (line[i] == ")") {            
            return [<a href={pending2} target="_blank">{pending}</a>,...this.inline_outside(line, i+1, "")];
        }
        return this.insideAnchor2(line, i+1, pending, pending2 + line[i]);
    }
}