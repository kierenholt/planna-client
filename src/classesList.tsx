import { Button, DialogTitle, Stack } from "@mui/joy";
import { Clas } from "./interfaces";

interface ClassesListProps {
    setSelectedClass: (c: Clas) => void;
    selectedClass: Clas | null;
    children: React.ReactNode;
    classes: Clas[];
}

export function ClassesList(props: ClassesListProps) {

    return (
        <Stack style={{ padding: "20px" }} direction="column" justifyContent="flex-start" alignItems="normal" spacing={2} >
            <DialogTitle>Your classes</DialogTitle>
            {props.classes.map(c =>
                <div>
                    <Button
                        key={c._id}
                        onClick={() => props.setSelectedClass(c)}
                        variant={props.selectedClass == c ? 'solid' : 'outlined'}>
                        {c.name}
                    </Button>
                </div>
            )}
            {props.children}
        </Stack>
    )
}