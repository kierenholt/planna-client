import { List, ListItem, ListItemButton, Stack } from "@mui/joy";
import { ILesson, ITask } from "./interfaces";

interface LessonsAndTasksListProps {
    setSelectedLessonOrTask: (l: ILesson | ITask) => void;
    selectedLessonOrTask: ILesson | ITask | null;
    lessons: ILesson[];
    tasks: ITask[];
    children: React.ReactNode;
}

export function LessonsAndTasksList(props: LessonsAndTasksListProps) {
    return (
        <Stack direction={"column"}>
            {props.children}

            <List>
                {props.lessons.map(t =>
                    <ListItem>
                        <ListItemButton
                            key={t._id}
                            onClick={() => props.setSelectedLessonOrTask(t)}
                            variant={props.selectedLessonOrTask == t ? 'solid' : 'outlined'}>
                            {t.name}
                        </ListItemButton>
                    </ListItem>)
                }

                {props.tasks.map(t =>
                    <ListItem>
                        <ListItemButton
                            key={t._id}
                            onClick={() => props.setSelectedLessonOrTask(t)}
                            variant={props.selectedLessonOrTask == t ? 'solid' : 'outlined'}>
                            {t.name}
                        </ListItemButton>
                    </ListItem>)
                }
            </List>
        </Stack>
    )
}