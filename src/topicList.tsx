import { List, Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { ITopic } from "./interfaces";
import { APIService } from './APIService/APIService';
import { useEffect, useRef, useState } from "react";
import { LessonsAndTasksContainer } from "./lessonsAndTasksContainer";
import { TopicListItem } from "./topicListItem";
import { Helpers } from "./helpers";
import { CreateButton } from "./createButton";
import { IHasSequence, Sequence } from "./sequence";

interface TopicListProps {
    classId: string;
}


export function TopicList(props: TopicListProps) {
    let [dragId, setDragId] = useState("");
    let [dragOverId, setDragOverId] = useState("");

    let [selectedTopic, setSelectedTopic] = useState<ITopic | null>(null);
    let [topics, setTopics] = useState<ITopic[]>([]);

    useEffect(() => {
        if (props.classId) {
            APIService.Topic.getTopicNamesOfClass(props.classId)
                .then((items: ITopic[]) => {
                    if (items) {
                        items.sort((a,b) => a.sequence - b.sequence);
                        setTopics(items);
                    }
                });
        }
    }, [props.classId])

    useEffect(() => {
        if (dragId.length) {
            if (dragOverId.length && dragId != dragOverId) {
                let ids = topics.map(t => t._id);
                let newTopicsOrdered: ITopic[] = [];
                let dragTopic = topics.find(t => t._id == dragId) as ITopic;
                let topicsWithoutDrag = Helpers.arrayWithout(topics, dragTopic, (a,b) => a?._id  == b?._id) as ITopic[];
                let dragOverIndex = topicsWithoutDrag.map(t => t?._id).indexOf(dragOverId);

                if (ids.indexOf(dragId) > ids.indexOf(dragOverId)) { //insert before
                    newTopicsOrdered.push(...topicsWithoutDrag.slice(0,dragOverIndex));
                    newTopicsOrdered.push(dragTopic);
                    newTopicsOrdered.push(...topicsWithoutDrag.slice(dragOverIndex))
                }
                else { //insert after
                    newTopicsOrdered.push(...topicsWithoutDrag.slice(0,dragOverIndex+1));
                    newTopicsOrdered.push(dragTopic);
                    newTopicsOrdered.push(...topicsWithoutDrag.slice(dragOverIndex+1))                    
                }
                setTopics(newTopicsOrdered);
            }
        }
    }, [dragId, dragOverId]);

    const updateSequenceAPI = async (t: ITopic): Promise<number> => {
        let updatedTopic = await APIService.Topic.updateSequence(t._id, t.sequence);
        return updatedTopic.sequence;
    }

    const dropHandler = async () => {
        if (dragId.length && dragOverId.length && dragId != dragOverId) {
            let ids = topics.map(t => t._id);
            let newTopicsOrdered: ITopic[] = [];
            let dragTopic = topics.find(t => t._id == dragId) as ITopic;
            let topicsWithoutDrag = Helpers.arrayWithout(topics, dragTopic, (a,b) => a?._id  == b?._id) as ITopic[];
            let dragOverIndex = topicsWithoutDrag.map(t => t?._id).indexOf(dragOverId);

            if (ids.indexOf(dragOverId) == 0) { //start
                Sequence.insertAtBeginning(dragTopic, topicsWithoutDrag[0]);
                updateSequenceAPI(dragTopic);
            }
            else if (ids.indexOf(dragOverId) == ids.length-1) { //end
                Sequence.insertAtEnd(topicsWithoutDrag[topicsWithoutDrag.length-1],dragTopic);
                updateSequenceAPI(dragTopic);
            }
            else if (ids.indexOf(dragId) > ids.indexOf(dragOverId)) { //insert before
                Sequence.insertBetween(topicsWithoutDrag[dragOverIndex-1],dragTopic,topicsWithoutDrag[dragOverIndex]);
                updateSequenceAPI(dragTopic);
            }
            else { //insert after
                Sequence.insertBetween(topicsWithoutDrag[dragOverIndex],dragTopic,topicsWithoutDrag[dragOverIndex+1]);
                updateSequenceAPI(dragTopic);
            }
        }
        setDragId("");
        setDragOverId("");
    }

    return (

        <Stack direction="row">
            <Stack direction="column">                
                <List>
                    {topics.map(t => 
                    <TopicListItem isSelected={selectedTopic == t} 
                        onClick={() => {setSelectedTopic(t)}} topic={t}
                        onDelete={() => {}}
                        onDrag={() => setDragId(t._id)}
                        onDragEnter={() => setDragOverId(t._id)}
                        onDrop={dropHandler}
                        key={t._id}
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