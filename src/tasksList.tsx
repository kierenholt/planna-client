import { List, ListItem, ListItemButton, Stack } from "@mui/joy";
import { Lesson, Task } from "./interfaces";

interface LessonsAndTasksListProps {
    setSelectedLessonOrTask: (l: Lesson | Task) => void;
    selectedLessonOrTask: Lesson | Task | null;
    lessons: Lesson[];
    tasks: Task[];
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