import { List, ListItem, ListItemButton, Stack } from "@mui/joy";
import { ILesson, ITask } from "./interfaces";
import AssignmentIcon from '@mui/icons-material/Assignment';
import LessonListItem from "./lessonListItem";
import TaskListItem from "./taskListItem";

interface LessonsAndTasksListProps {
    setSelectedLessonOrTask: (l: ILesson | ITask) => void;
    selectedLessonOrTask: ILesson | ITask | null;
    lessons: ILesson[];
    tasks: ITask[];
    children: React.ReactNode;
    setSelectedType: (s: string) => void;
    onDeleteLesson: (l: ILesson) => void;
    onDeleteTask: (t: ITask) => void;
}

export function LessonsAndTasksList(props: LessonsAndTasksListProps) {
    return (
        <Stack direction={"column"}>
            {props.children}

            <List>
                {props.lessons.map(l => <LessonListItem lesson={l}
                    onClick={() => {
                        props.setSelectedLessonOrTask(l);
                        props.setSelectedType("lesson");
                    }} 
                    isSelected={l == props.selectedLessonOrTask}
                    onDelete={() => props.onDeleteLesson(l)} />)
                }

                {props.tasks.map(t => <TaskListItem onClick={() => props.setSelectedLessonOrTask(t)} 
                    task={t} isSelected={props.selectedLessonOrTask == t} 
                    onDelete={() => props.onDeleteTask(t)} />)
                }
            </List>
        </Stack>
    )
}