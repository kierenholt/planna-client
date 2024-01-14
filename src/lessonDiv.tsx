import { Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { Lesson } from "./interfaces";
import { APIService } from "./APIService";
import { RowDiv } from "./row";

interface LessonProps {
    lessonId: string;
}

export function LessonDiv(props: LessonProps) {
    let [lesson, setLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        if (props.lessonId) {
            APIService.getLessonIncludingRows(props.lessonId)
                .then((item: Lesson) => {
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