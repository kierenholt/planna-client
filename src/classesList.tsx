import { Button, DialogTitle, Sheet, Stack } from "@mui/joy";
import { IClas } from "./interfaces";
import { ClassCard } from "./ClassCard";
import { Helpers } from "./helpers";
import { APIService } from "./APIService/APIService";

interface ClassesListProps {
    handleClick: (c: IClas) => void;
    children: React.ReactNode;
    classes: IClas[];
    setClasses: (classes: IClas[]) => void;
}

export function ClassesCardList(props: ClassesListProps) {

    function deleteClass(c: IClas) {
        if (c) {
            APIService.Clas.delete(c._id).then(
                () => {
                    let newClasses = Helpers.arrayWithout(props.classes, c);
                    props.setClasses(newClasses);
                }                
            );
        }
    }

    return (
        <div>
            <h1>Your classes</h1>
            <Sheet sx={{
                display:"flex",
                maxWidth:"1200px",
                flexWrap:"wrap",
            }}>
            {props.classes.map(c => <ClassCard key={c._id} 
                deleteClassHandler={() => deleteClass(c)}
                handleClick={props.handleClick} 
                clas={c} ></ClassCard>            )}
            {props.children}
        </Sheet>

        </div>
    )
}