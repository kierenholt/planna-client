import { Textarea } from "@mui/joy";
import { FieldElementProps } from "./parsers";



export function MDTextArea(props: FieldElementProps) {
    return (
        <Textarea style={{"width":"100%"}} />
    )
}