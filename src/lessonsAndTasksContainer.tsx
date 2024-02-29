import { Stack } from "@mui/joy";
import { ILesson, ITask, ITopic } from "./interfaces";
import React, { useEffect, useState } from "react";
import { LessonsAndTasksList } from "./lessonsAndTasksList";
import { APIService } from './APIService/APIService';
import { CreateLessonOrTaskButton } from "./createLessonOrTaskButton";
import { LessonDiv } from "./lessonDiv";
import { TaskDiv } from "./taskDiv";

interface LessonsAndTasksContainerProps {
    selectedTopicId: string;
}

export function LessonsAndTasksContainer(props: LessonsAndTasksContainerProps) {

    let [selectedLessonOrTask, setSelectedLessonOrTask] = useState<ILesson | ITask | null>(null);
    let [lessons, setLessons] = useState<ILesson[]>([]);
    let [tasks, setTasks] = useState<ITask[]>([]);
    let [selectedType, setSelectedType] = useState<string>("");

    //GET LESSONS
    useEffect(() => {
        APIService.Lesson.getLessonNamesOfTopic(props.selectedTopicId)
            .then((items: ILesson[]) => {
                if (items) setLessons(items)
            });
    }, [props.selectedTopicId])

    //GET TASKS
    useEffect(() => {
        APIService.Task.getTaskNamesOfTopic(props.selectedTopicId)
            .then((items: ITask[]) => {
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
                            lessonId={(selectedLessonOrTask as ILesson)._id}
                        /> :
                        selectedType == "task" ? <TaskDiv ></TaskDiv> : <></>)
                    : <></>
                }
            </Stack>
        </Stack>
    )
}