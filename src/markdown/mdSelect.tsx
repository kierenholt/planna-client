import { ReactNode, useContext } from "react";
import { FieldElementProps } from "./parsers";
import { Select, Option } from "@mui/joy";
import { UserContext } from "../authWrapper";

export interface MDSelectProps {
    fieldProps: FieldElementProps;
    options: string[]
}

export function MDSelect(props: MDSelectProps) {
   
   
    let user = useContext(UserContext);
    return (
        <Select >
            {props.options.map((o: string) => <Option value={o}>{o}</Option>)}
        </Select>
    )
}