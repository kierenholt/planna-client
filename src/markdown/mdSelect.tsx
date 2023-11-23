import { ReactNode } from "react";
import { FieldElementProps } from "./parsers";
import { Select, Option } from "@mui/joy";

export interface MDSelectProps {
    fieldProps: FieldElementProps;
    options: string[]
}

export function MDSelect(props: MDSelectProps) {
    return (
        <Select >
            {props.options.map((o: string) => <Option value={o}>{o}</Option>)}
        </Select>
    )
}