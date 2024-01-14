import { Radio } from "@mui/joy";
import { FieldElementProps } from "./parsers";
import { useContext } from "react";
import { UserContext } from "../authWrapper";

export interface RadioProps {
    fieldProps: FieldElementProps,
    letter: string
}

export function MDRadio(props: RadioProps) {
    let user = useContext(UserContext);
    return (
        <input type="radio" name={props.fieldProps.UID} value={props.letter}/>
    )
}