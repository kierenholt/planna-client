import { List, ListItem, ListItemButton, Stack } from "@mui/joy";
import { ILesson, ITask } from "./interfaces";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface LessonsAndTasksListProps {
    setSelectedLessonOrTask: (l: ILesson | ITask) => void;
    selectedLessonOrTask: ILesson | ITask | null;
    lessons: ILesson[];
    tasks: ITask[];
    children: React.ReactNode;
    setSelectedType: (s: string) => void;
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
                            onClick={() => { 
                                props.setSelectedLessonOrTask(t);
                                props.setSelectedType("lesson");
                            }}
                            variant={props.selectedLessonOrTask == t ? 'solid' : 'outlined'}>
                            <ListItemIcon>
                              <CoPresentIcon />
                            </ListItemIcon>
                            <ListItemText primary={t.name} />
                        </ListItemButton>
                    </ListItem>)
                }

                {props.tasks.map(t =>
                    <ListItem>
                        <ListItemButton
                            key={t._id}
                            onClick={() => {
                                props.setSelectedLessonOrTask(t);
                                props.setSelectedType("task");
                            }}
                            variant={props.selectedLessonOrTask == t ? 'solid' : 'outlined'}>
                            <ListItemIcon>
                              <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary={t.name} />
                        </ListItemButton>
                    </ListItem>)
                }
            </List>
        </Stack>
    )
}