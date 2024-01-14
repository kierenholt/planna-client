import { Textarea } from "@mui/joy";
import { FieldElementProps } from "./parsers";
import { UserContext } from "../authWrapper";
import { useContext } from "react";



export function MDTextArea(props: FieldElementProps) {
    let user = useContext(UserContext);
    return (
        <Textarea style={{"width":"100%"}} />
    )
}