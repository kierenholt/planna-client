import { Stack } from "@mui/joy";
import { Lesson, Task, Topic } from "./interfaces";
import React, { useEffect, useState } from "react";
import { LessonsAndTasksList } from "./lessonsAndTasksList";
import { APIService } from "./APIService";
import { CreateLessonOrTaskButton } from "./createLessonOrTaskButton";
import { LessonDiv } from "./lessonDiv";
import { TaskDiv } from "./taskDiv";

interface LessonsAndTasksContainerProps {
    selectedTopicId: string;
}

export function LessonsAndTasksContainer(props: LessonsAndTasksContainerProps) {

    let [selectedLessonOrTask, setSelectedLessonOrTask] = useState<Lesson | Task | null>(null);
    let [lessons, setLessons] = useState<Lesson[]>([]);
    let [tasks, setTasks] = useState<Task[]>([]);
    let [selectedType, setSelectedType] = useState<string>("");

    //GET LESSONS
    useEffect(() => {
        APIService.getLessonNamesOfTopic(props.selectedTopicId)
            .then((items: Lesson[]) => {
                if (items) setLessons(items)
            });
    }, [props.selectedTopicId])

    //GET TASKS
    useEffect(() => {
        APIService.getTaskNamesOfTopic(props.selectedTopicId)
            .then((items: Task[]) => {
                if (items) setTasks(items)
            });
    }, [props.selectedTopicId])

    return (
        <Stack direction="row">
            {/* LESSON LIST */}
            <LessonsAndTasksList lessons={lessons} selectedLessonOrTask={selectedLessonOrTask}
                setSelectedLessonOrTask={setSelectedLessonOrTask} tasks={tasks}  
                setSelectedType={setSelectedType}>

                <CreateLessonOrTaskButton topicId={props.selectedTopicId} 
                setLessons={setLessons} Lessons={lessons} 
                setTasks={setTasks} Tasks={tasks}/>

            </LessonsAndTasksList> 

            {/* LESSON OR TASK PREVIEW */}
            <Stack direction="column">
                {
                    selectedLessonOrTask ? 
                        (selectedType == "lesson" ? <LessonDiv 
                            lessonId={(selectedLessonOrTask as Lesson)._id}
                        /> :
                        selectedType == "task" ? <TaskDiv ></TaskDiv> : <></>)
                    : <></>
                }
            </Stack>
        </Stack>
    )
}