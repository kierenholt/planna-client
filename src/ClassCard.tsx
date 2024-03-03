import { Avatar, Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/joy";
import { IClas } from "./interfaces";
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useRef, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RenameModal } from "./renameModal";
import { APIService } from "./APIService/APIService";

interface ClassCardProps {
  handleOpen: (clas: IClas) => void;
  clas: IClas;
  onDelete: () => void;
}

export function ClassCard(props: ClassCardProps) {

  const menuAnchor = useRef(null);
  var [menuIsOpen, setMenuIsOpen] = useState(false);
  var [renameModalIsOpen, setRenameModalIsOpen] = useState(false);

  const renameHandler = async (name: string) => {
    let renamed = await APIService.Clas.rename(props.clas._id, name);
    setRenameModalIsOpen(false);
    setMenuIsOpen(false);
    props.clas.name = renamed.name;
  }

  return (
    <Card sx={{ width: 275, margin: "20px" }} key={props.clas._id}>

      <CardContent>
        <CardHeader action={
          <IconButton aria-label="" onClick={() => setMenuIsOpen(!menuIsOpen)} ref={menuAnchor}>
            <MoreVertIcon />
          </IconButton>
        }
          title={props.clas.name}>
        </CardHeader>
      </CardContent>
      <CardActions>
        <Button onClick={() => props.handleOpen(props.clas)}>Open</Button>
      </CardActions>

      <Menu anchorEl={menuAnchor.current} open={menuIsOpen} onClose={() => setMenuIsOpen(false)} >
        <MenuItem onClick={props.onDelete}>
          Delete
        </MenuItem>
        <MenuItem onClick={() => setRenameModalIsOpen(true)}>
          Rename
        </MenuItem>
      </Menu>
      <RenameModal placeholder={props.clas.name} onSubmit={renameHandler} isOpen={renameModalIsOpen} onCancel={() => setRenameModalIsOpen(false)} />

    </Card>

  )
}