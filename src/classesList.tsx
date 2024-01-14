import { Button, DialogTitle, Sheet, Stack } from "@mui/joy";
import { Clas } from "./interfaces";
import { ClassCard } from "./ClassCard";
import { APIService } from "./APIService";
import { Helpers } from "./helpers";

interface ClassesListProps {
    handleClick: (c: Clas) => void;
    children: React.ReactNode;
    classes: Clas[];
    setClasses: (classes: Clas[]) => void;
}

export function ClassesCardList(props: ClassesListProps) {

    function deleteClass(c: Clas) {
        if (c) {
            APIService.deleteClass(c._id).then(
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