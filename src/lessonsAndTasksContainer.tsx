import { Stack } from "@mui/joy";
import { ILesson, ITask, ITopic } from "./interfaces";
import React, { useEffect, useState } from "react";
import { LessonsAndTasksList } from "./lessonsAndTasksList";
import { APIService } from './APIService/APIService';
import { LessonDiv } from "./lessonDiv";
import { TaskDiv } from "./taskDiv";
import { Helpers } from "./helpers";
import { CreateButton } from "./createButton";

interface LessonsAndTasksContainerProps {
    topicId: string;
}

export function LessonsAndTasksContainer(props: LessonsAndTasksContainerProps) {

    let [selectedLessonOrTask, setSelectedLessonOrTask] = useState<ILesson | ITask | null>(null);
    let [lessons, setLessons] = useState<ILesson[]>([]);
    let [tasks, setTasks] = useState<ITask[]>([]);
    let [selectedType, setSelectedType] = useState<string>("");

    //GET LESSONS
    useEffect(() => {
        APIService.Lesson.getLessonNamesOfTopic(props.topicId)
            .then((items: ILesson[]) => {
                if (items) setLessons(items)
            });
    }, [props.topicId])

    //GET TASKS
    useEffect(() => {
        APIService.Task.getTaskNamesOfTopic(props.topicId)
            .then((items: ITask[]) => {
                if (items) setTasks(items)
            });
    }, [props.topicId])

    const deleteLessonHandler = async (lesson: ILesson) => {
        let deleted = await APIService.Lesson.delete(lesson._id);
        let newLessons = Helpers.arrayWithout(lessons, deleted, (a,b) => a._id == b._id);
        setLessons(newLessons);
        setSelectedLessonOrTask(null);
    }

    const deleteTaskHandler = async (task: ITask) => {
        let deleted = await APIService.Task.delete(task._id);
        let newTasks = Helpers.arrayWithout(tasks, deleted, (a,b) => a._id == b._id);
        setTasks(newTasks);
        setSelectedLessonOrTask(null);
    }

    const CreateNewLessonHandler = async() => {
        let newLesson = await APIService.Lesson.createDefault(props.topicId);
        let newLessons = Helpers.arrayWith(lessons, newLesson);
        setLessons(newLessons);
        setSelectedLessonOrTask(newLesson);
    }

    const CreateNewTaskHandler = async() => {
        let newTask = await APIService.Task.create(props.topicId);
        let newTasks = Helpers.arrayWith(tasks, newTask);
        setTasks(newTasks);
        setSelectedLessonOrTask(newTask);
    }

    return (
        <Stack direction="row">
            {/* LESSON LIST */}
            <LessonsAndTasksList lessons={lessons} selectedLessonOrTask={selectedLessonOrTask}
                setSelectedLessonOrTask={setSelectedLessonOrTask} tasks={tasks}  
                setSelectedType={setSelectedType}
                onDeleteLesson={deleteLessonHandler}
                onDeleteTask={deleteTaskHandler}>

                <CreateButton text="Add New Lesson" onClick={CreateNewLessonHandler} />
                <CreateButton text="Add New Task" onClick={CreateNewTaskHandler} />

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