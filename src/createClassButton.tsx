import { Add } from "@mui/icons-material";
import { useContext, useState } from "react";
import { IClas, ITopic } from "./interfaces";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { UserContext } from "./authWrapper";
import { APIService } from "./APIService/APIService";
import { RenameModal } from "./renameModal";
import { Button, Card } from "@mui/joy";

interface CreateClassCardProps {
  setClasses: (c: IClas[]) => void;
  classes: IClas[];
  setSelectedClas: (c: IClas) => void;
}

export function CreateClassCard(props: CreateClassCardProps) {

  let user = useContext(UserContext);

  const createHandler = (data: any) => {
    if (user) {
      APIService.Clas.createDefault(user._id)
        .then(async (c) => {
          await APIService.Topic.createDefault(c._id);
          let newValue: IClas[] = new Array<IClas>();
          newValue.push(...props.classes);
          newValue.push(c);
          props.setClasses(newValue);
          props.setSelectedClas(c);
        })
    }
  }

  const renameHandler = () => {}

  return (
    <div>
      <Card sx={{margin:"20px", width: 275, }}>
        <Button
          onClick={createHandler}
          startDecorator={<Add />}>
          Create new class
        </Button>
      </Card>
    </div>
  )
}