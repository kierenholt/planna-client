import { Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { CreateTopicButton } from "./createTopicButton";
import { TopicsList } from "./topicsList";
import { IClas, ITopic } from "./interfaces";
import { APIService } from './APIService/APIService';
import { useEffect, useState } from "react";
import { LessonsAndTasksContainer } from "./lessonsAndTasksContainer";

interface TopicContainerProps {
    classId: string;
}


export function TopicContainer(props: TopicContainerProps) {

    let [selectedTopic, setSelectedTopic] = useState<ITopic | null>(null);
    let [topics, setTopics] = useState<ITopic[]>([]);

    useEffect(() => {
        if (props.classId) {
            APIService.Topic.getTopicNamesOfClass(props.classId)
                .then((items: ITopic[]) => {
                    if (items) setTopics(items)
                });
        }
    }, [props.classId])

    return (

        <Stack direction="row">
            <Stack direction="column">
                {/* TOPIC TOOLBAR */}
                <Stack direction="row">
                    <CreateTopicButton clasId={props.classId} setTopics={setTopics}
                        topics={topics} />
                </Stack>
                {/* TOPIC LIST */}
                <TopicsList selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}
                    topics={topics} />
            </Stack>

            {/* LESSONS AND TASKS */}
            {
                selectedTopic ?
                    <LessonsAndTasksContainer selectedTopicId={selectedTopic._id} /> :
                    <></>
            }
        </Stack>
    )
}