import { ListItem, ListItemButton, Menu, MenuItem } from "@mui/joy";
import { ITask } from "./interfaces";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { APIService } from "./APIService/APIService";
import { RenameModal } from "./renameModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRef, useState } from "react";

interface TaskListItemProps {
    task: ITask;
    onClick: () => void;
    isSelected: boolean;
    onDelete: () => void;
}

export default function TaskListItem(props: TaskListItemProps) {
    const menuAnchor = useRef(null);
    var [menuIsOpen, setMenuIsOpen] = useState(false);
    var [renameModalIsOpen, setRenameModalIsOpen] = useState(false);

    const renameHandler = async (name: string) => {
        let renamed = await APIService.Task.rename(props.task._id, name);
        setRenameModalIsOpen(false);
        setMenuIsOpen(false);
        props.task.name = renamed.name;
    }

    return (
        <ListItem key={props.task._id}>
            <ListItemButton
                onClick={props.onClick}
                variant={props.isSelected ? 'solid' : 'outlined'}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={props.task.name} />
                <ListItemIcon style={{ minWidth: "0" }} aria-label="" onClick={() => setMenuIsOpen(!menuIsOpen)} ref={menuAnchor}>
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
            <RenameModal placeholder={props.task.name}
                onSubmit={renameHandler} isOpen={renameModalIsOpen} onCancel={() => setRenameModalIsOpen(false)} />

        </ListItem>
        
    )
}