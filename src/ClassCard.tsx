import { Avatar, Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/joy";
import { IClas } from "./interfaces";
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RenameModal } from "./renameModal";

interface ClassCardProps {
  handleClick: (clas: IClas) => void;
  clas: IClas;
  deleteClassHandler: () => void;
}

export function ClassCard(props: ClassCardProps) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renameHandler = () => {}

  return (
    <Card sx={{ width: 275, margin: "20px" }}>

      <CardContent>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings"
              onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={props.clas.name}
          subheader="September 14, 2016">

        </CardHeader>
      </CardContent>
      <CardActions>
        <Button onClick={() => props.handleClick(props.clas)}>Open</Button>
      </CardActions>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose} >
        <MenuItem onClick={props.deleteClassHandler}>
          Delete
        </MenuItem>
      </Menu>
      <RenameModal defaultText="" submitHandler={renameHandler} isOpen={false}/>
      
    </Card>

  )
}