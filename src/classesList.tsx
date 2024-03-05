import { Button, DialogTitle, Sheet, Stack } from "@mui/joy";
import { IClas } from "./interfaces";
import { Helpers } from "./helpers";
import { APIService } from "./APIService/APIService";
import { ClassCard } from "./classCard";
import { useContext } from "react";
import { UserContext } from "./authWrapper";

interface ClassesListProps {
    handleClick: (c: IClas) => void;
    children: React.ReactNode;
    classes: IClas[];
    setClasses: (classes: IClas[]) => void;
}

export function ClassesList(props: ClassesListProps) {
    
    const deleteHandler = (c: IClas) => {
        if (c) {
            APIService.Clas.delete(c._id).then(
                () => {
                    let newClasses = Helpers.arrayWithout(props.classes, c, (a,b) => a._id == b._id);
                    props.setClasses(newClasses);
                }
            );
        }
    }

    return (
        <div>
            <h1>Your classes</h1>
            <Sheet sx={{
                display: "flex",
                maxWidth: "1200px",
                flexWrap: "wrap",
            }}>
                {props.classes.map(c =>
                    <ClassCard
                        onDelete={() => deleteHandler(c)}
                        handleOpen={props.handleClick}
                        clas={c}
                        key={c._id} />
                )}
                {props.children}
            </Sheet>

        </div>
    )
}