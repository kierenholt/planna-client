import { Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { CreateTopicButton } from "./createTopicButton";
import { TopicsList } from "./topicsList";
import { Clas, Topic } from "./interfaces";
import { APIService } from "./APIService";
import { useEffect, useState } from "react";
import { LessonsAndTasksContainer } from "./lessonsAndTasksContainer";

interface TopicContainerProps {
    selectedClassId: string;
}


export function TopicContainer(props: TopicContainerProps) {

    let [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    let [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        if (props.selectedClassId) {
            APIService.getTopicNamesOfClass(props.selectedClassId)
                .then((items: Topic[]) => {
                    if (items) setTopics(items)
                });
        }
    }, [props.selectedClassId])

    return (

        <Stack direction="row">
            <Stack direction="column">
                {/* TOPIC TOOLBAR */}
                <Stack direction="row">
                    <CreateTopicButton clasId={props.selectedClassId} setTopics={setTopics}
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