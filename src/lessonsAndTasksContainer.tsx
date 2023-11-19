import { Stack } from "@mui/joy";
import { Lesson, Task, Topic } from "./interfaces";
import React, { useEffect, useState } from "react";
import { LessonsAndTasksList } from "./lessonsAndTasksList";
import { APIService } from "./APIService";
import { CreateLessonOrTaskButton } from "./createLessonOrTaskButton";
import { FullLineParser } from "./parsers";

interface LessonsAndTasksContainerProps {
    selectedTopic: Topic;
}


export function LessonsAndTasksContainer(props: LessonsAndTasksContainerProps) {

    let [selectedLessonOrTask, setSelectedLessonOrTask] = useState<Lesson | Task | null>(null);
    let [lessons, setLessons] = useState<Lesson[]>([]);
    let [tasks, setTasks] = useState<Task[]>([]);

    //GET LESSONS
    useEffect(() => {
        if (props.selectedTopic) {
            APIService.getLessonNamesOfTopic(props.selectedTopic._id)
                .then((items: Lesson[]) => {
                    if (items) setLessons(items)
                });
        }
    }, [props.selectedTopic])

    //GET TASKS
    useEffect(() => {
        if (props.selectedTopic) {
            APIService.getTaskNamesOfTopic(props.selectedTopic._id)
                .then((items: Task[]) => {
                    if (items) setTasks(items)
                });
        }
    }, [props.selectedTopic])

    return (
        <Stack direction="row">
            {/* LESSON LIST */}
            <LessonsAndTasksList lessons={lessons} selectedLessonOrTask={selectedLessonOrTask}
                setSelectedLessonOrTask={setSelectedLessonOrTask} tasks={tasks} >
                <CreateLessonOrTaskButton topicId={props.selectedTopic._id} 
                setLessons={setLessons} Lessons={lessons} 
                setTasks={setTasks} Tasks={tasks} />
            </LessonsAndTasksList> 

            {/* LESSON OR TASK PREVIEW */}
            <Stack direction="column">
                {}
            </Stack>
        </Stack>
    )
}