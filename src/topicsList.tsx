import { Box, Button, DialogTitle, List, ListItem, ListItemButton, Modal, Stack } from "@mui/joy"
import { Clas, Topic } from "./interfaces";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TopicIcon from '@mui/icons-material/Topic';

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
        <List>
            {props.topics.map(t =>
                <ListItem>
                    <ListItemButton
                        key={t._id}
                        onClick={() => props.setSelectedTopic(t)}
                        variant={props.selectedTopic == t ? 'solid' : 'outlined'}>

                        <ListItemIcon>
                            <TopicIcon />
                        </ListItemIcon>
                        <ListItemText primary={t.name} />
                    </ListItemButton>
                </ListItem>)
            }
        </List>
    )
}