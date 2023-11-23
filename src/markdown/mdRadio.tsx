import { Radio } from "@mui/joy";
import { FieldElementProps } from "./parsers";

export interface RadioProps {
    fieldProps: FieldElementProps,
    letter: string
}

export function MDRadio(props: RadioProps) {
    return (
        <input type="radio" name={props.fieldProps.UID} value={props.letter}/>
    )
}