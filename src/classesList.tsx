import { Button, DialogTitle, Sheet, Stack } from "@mui/joy";
import { Clas } from "./interfaces";
import { ClassCard } from "./ClassCard";

interface ClassesListProps {
    handleClick: (c: Clas) => void;
    children: React.ReactNode;
    classes: Clas[];
}

export function ClassesCardList(props: ClassesListProps) {

    return (
        <div>
            <h1>Your classes</h1>
        <Sheet sx={{
            display:"flex",
            maxWidth:"1200px",
            flexWrap:"wrap",
    }}>
            {props.classes.map(c => <ClassCard 
                handleClick={props.handleClick} clas={c} ></ClassCard>            )}
            {props.children}
        </Sheet>

        </div>
    )
}