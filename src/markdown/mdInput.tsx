import { Input } from "@mui/joy";
import { FieldElementProps } from "./parsers";
import { useContext } from "react";
import { UserContext } from "../authWrapper";



export function MDInput(props: FieldElementProps) {
    let user = useContext(UserContext);
    return (
        <Input style={{"width":"4em"}} />
    )
}