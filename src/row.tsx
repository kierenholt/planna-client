import { Stack, Typography } from "@mui/joy";
import { Row } from "./interfaces";
import { useEffect } from "react";
import { IExpression, QuestionExpression, TemplateExpression } from "./markdown/expression";
import { MarkdownParser } from "./markdown/parsers";

interface RowDivProps {
    row: Row;
}

export function RowDiv(props: RowDivProps) {
    
    let e: IExpression[] = props.row.purpose == "template" ? 
        TemplateExpression.fromComment(props.row.comment):
        QuestionExpression.fromComment(props.row.comment);
    let parser = new MarkdownParser(e);

    return (
        <div>
            <Typography level="h1">props.row.title</Typography>
            <Stack direction={"row"}>
                <div> 
                    { parser.parse(props.row.leftRight[0]) }
                </div>
                <div>
                    { parser.parse(props.row.leftRight[1]) }
                </div>
            </Stack>
        </div>
    )
}