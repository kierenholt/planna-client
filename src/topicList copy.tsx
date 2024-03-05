import { List, Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { ITopic } from "./interfaces";
import { APIService } from './APIService/APIService';
import { useEffect, useState } from "react";
import { LessonsAndTasksContainer } from "./lessonsAndTasksContainer";
import { TopicListItem } from "./topicListItem";
import { Helpers } from "./helpers";
import { CreateButton } from "./createButton";

interface TopicListProps {
    classId: string;
}


export function TopicListBackup(props: TopicListProps) {

    let [selectedTopic, setSelectedTopic] = useState<ITopic | null>(null);
    let [topics, setTopics] = useState<ITopic[]>([]);

    const deleteHandler = async (t: ITopic) => {
        await APIService.Topic.delete(t._id);
        let newTopics = Helpers.arrayWithout(topics, t, (a,b) => a._id == b._id);
        setTopics(newTopics);
        setSelectedTopic(null);
    }

    const createHandler = async() => {
        let newTopic = await APIService.Topic.createDefault(props.classId);
        let newTopics = Helpers.arrayWith(topics, newTopic);
        setTopics(newTopics);
        setSelectedTopic(newTopic);
    }

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
                    <CreateButton text={"Add New Topic"} onClick={createHandler}  />
                </Stack>
                {/* TOPIC LIST */}                    
                <List>
                    {topics.map(t => 
                    <TopicListItem isSelected={selectedTopic == t} 
                        onClick={() => setSelectedTopic(t)} topic={t}
                        onDelete={() => deleteHandler(t)}
                        />)}
                </List>
            </Stack>

            {/* LESSONS AND TASKS */}
            {
                selectedTopic ?
                    <LessonsAndTasksContainer topicId={selectedTopic._id} /> :
                    <></>
            }
        </Stack>
    )
}