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

    let [selectedTopic, setSelectedTopic] = useState<ITopic | null>(null);
    let [topics, setTopics] = useState<ITopic[]>([]);

    useEffect(() => {
        if (props.classId) {
            APIService.Topic.getTopicsOfClass(props.classId)
                .then((items: ITopic[]) => {
                    if (items) {
                        items.sort((a,b) => a.sequence - b.sequence);
                        setTopics(items);
                    }
                });
        }
    }, [props.classId])

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

    /*** DRAG AND DROP  ***/
    let [dragId, setDragId] = useState("");
    let [dragOverId, setDragOverId] = useState("");

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
        console.log(t);
        let updatedTopic = await APIService.Topic.updateSequence(t._id, t.sequence);
        return updatedTopic.sequence;
    }

    const dropHandler = async () => {        
        if (dragId.length && dragOverId.length && dragId != dragOverId) {
            let ids = topics.map(t => t._id);
            let dragTopic = topics.find(t => t._id == dragId) as ITopic;
            let topicsWithoutDrag = Helpers.arrayWithout(topics, dragTopic, (a,b) => a?._id  == b?._id) as ITopic[];
            let dragOverIndex = topicsWithoutDrag.map(t => t?._id).indexOf(dragOverId);

            if (ids.indexOf(dragId) == 0) { //start
                Sequence.insertAtBeginning(dragTopic, topicsWithoutDrag[0]);
                updateSequenceAPI(dragTopic);
            }
            else if (ids.indexOf(dragId) == ids.length-1) { //end
                Sequence.insertAtEnd(topicsWithoutDrag[topicsWithoutDrag.length-1],dragTopic);
                updateSequenceAPI(dragTopic);
            }
            else if (ids.indexOf(dragId) > ids.indexOf(dragOverId)) { //insert after
                Sequence.insertBetween(topicsWithoutDrag[dragOverIndex],dragTopic,topicsWithoutDrag[dragOverIndex+1]);
                updateSequenceAPI(dragTopic);
            }
            else { //insert before
                Sequence.insertBetween(topicsWithoutDrag[dragOverIndex-1],dragTopic,topicsWithoutDrag[dragOverIndex]);
                updateSequenceAPI(dragTopic);
            }
        }
        setDragId("");
        setDragOverId("");
    }

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
                        onDrag={() => setDragId(t._id)}
                        onDragEnter={() => {
                            if (t._id != dragId) {
                                setDragOverId(t._id)  
                        } } }
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