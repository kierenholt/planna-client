import { ListItem, ListItemButton, Menu, MenuItem } from "@mui/joy";
import { ILesson } from "./interfaces";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRef, useState } from "react";
import { RenameModal } from "./renameModal";
import { APIService } from "./APIService/APIService";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface LessonListItemProps {
    lesson: ILesson;
    onClick: () => void;
    isSelected: boolean;
    onDelete: () => void;
}

export default function LessonListItem(props: LessonListItemProps) {
    const menuAnchor = useRef(null);
    var [menuIsOpen, setMenuIsOpen] = useState(false);
    var [renameModalIsOpen, setRenameModalIsOpen] = useState(false);

    const renameHandler = async (name: string) => {
        let renamed = await APIService.Lesson.rename(props.lesson._id, name);
        setRenameModalIsOpen(false);
        setMenuIsOpen(false);
        props.lesson.name = renamed.name;
    }

    return (
        <ListItem key={props.lesson._id}>
            <ListItemButton
                onClick={props.onClick}
                variant={props.isSelected ? 'solid' : 'outlined'}>
                <ListItemIcon>
                    <CoPresentIcon />
                </ListItemIcon>
                <ListItemText primary={props.lesson.name} />
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
            <RenameModal placeholder={props.lesson.name}
                onSubmit={renameHandler} isOpen={renameModalIsOpen} onCancel={() => setRenameModalIsOpen(false)} />

        </ListItem>)
}