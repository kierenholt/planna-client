import { Add } from "@mui/icons-material"
import { Box, Button, DialogTitle, Modal, Stack } from "@mui/joy"
import { useEffect, useState } from "react";
import { Clas, Topic } from "./interfaces";
import { APIService } from "./APIService";
import { CreateTopicButton } from "./createTopicButton";

interface TopicsListProps {
    setSelectedTopic: (t: Topic) => void;
    selectedTopic: Topic | null;
    topics: Topic[];
}

export function TopicsList(props: TopicsListProps) {
  
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        p: 4,
      };

    return (
        <Stack style={{ padding: "20px" }} 
            direction="column" 
            justifyContent="flex-start" 
            alignItems="normal" spacing={2} >
        
            <div>
                {props.topics.map(t =>
                    <div>
                        <Button
                            key={t._id}
                            onClick={() => props.setSelectedTopic(t)}
                            variant={props.selectedTopic == t ? 'solid' : 'outlined'}>
                            {t.name}
                        </Button>
                    </div>
                )}
            </div>
        </Stack>
        
    )
}