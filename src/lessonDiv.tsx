import { Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { ILesson } from "./interfaces";
import { APIService } from './APIService/APIService';
import { RowDiv } from "./row";

interface LessonProps {
    lessonId: string;
}

export function LessonDiv(props: LessonProps) {
    let [lesson, setLesson] = useState<ILesson | null>(null);

    useEffect(() => {
        if (props.lessonId) {
            APIService.Lesson.getIncludingRows(props.lessonId)
                .then((item: ILesson) => {
                    if (item) setLesson(item)
                });
        }
    }, [props.lessonId])

    return (
        <Stack direction={"column"}>
            <Typography level="h1">{lesson?.name}</Typography>
            {lesson?.rows.map(r =>
                <RowDiv row={r}/>
            )}
        </Stack>
    )
}