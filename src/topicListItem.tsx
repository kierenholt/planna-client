import { ListItem, ListItemButton, Menu, MenuItem } from "@mui/joy";
import { ITopic } from "./interfaces";

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TopicIcon from '@mui/icons-material/Topic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { RenameModal } from "./renameModal";
import React, { useRef, useState } from "react";
import { APIService } from "./APIService/APIService";

interface TopicListItemProps {
    topic: ITopic;
    onClick: () => void;
    isSelected: boolean;
    onDelete: () => void;
    onDrag?: () => void;
    onDragEnter?: () => void;
    onDrop?: () => void;
}

export function TopicListItem(props: TopicListItemProps) {
    const menuAnchor = useRef(null);
    var [menuIsOpen, setMenuIsOpen] = useState(false);
    var [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
    let [isDragging, setIsDragging] = useState(false);

    const renameHandler = async (name: string) => {
        let renamed = await APIService.Topic.rename(props.topic._id, name);
        setRenameModalIsOpen(false);
        setMenuIsOpen(false);
        props.topic.name = renamed.name;
    }

    return (
        <ListItem draggable onDragStart={props.onDrag} 
            onDragEnter={props.onDragEnter} 
            onDrop={props.onDrop}
            onDragOver={(e) => e.preventDefault()}
            >
            <ListItemButton
                onClick={props.onClick}
                variant={props.isSelected ? 'solid' : 'outlined'}>

                <ListItemIcon>
                    <TopicIcon />
                </ListItemIcon>
                <ListItemText primary={props.topic.name} />

                <ListItemIcon style={{minWidth:"0"}} aria-label="" onClick={() => setMenuIsOpen(!menuIsOpen)} ref={menuAnchor}>
                    <MoreVertIcon />
                </ListItemIcon>
            </ListItemButton>

            <Menu anchorEl={menuAnchor.current} open={props.isSelected && menuIsOpen} onClose={() => setMenuIsOpen(false)} >
                <MenuItem onClick={props.onDelete}>
                    Delete
                </MenuItem>
                <MenuItem onClick={() => setRenameModalIsOpen(true)}>
                    Rename
                </MenuItem>
            </Menu>
            <RenameModal placeholder={props.topic.name} 
                onSubmit={renameHandler} isOpen={renameModalIsOpen} onCancel={() => setRenameModalIsOpen(false)} />

        </ListItem>
    )
}
