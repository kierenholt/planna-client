import { Add } from "@mui/icons-material";
import { Box, Button, Card, FormHelperText, FormLabel, Input, Modal, Typography } from "@mui/joy";
import { useState } from "react";
import { Clas, Topic } from "./interfaces";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { APIService } from "./APIService";
import { ClasFactory } from "./factory";

interface CreateClassCardProps {
  userId: string;
  setClasses: (c: Clas[]) => void;
  classes: Clas[];
  setSelectedClas: (c: Clas) => void;
}

export function CreateClassCard(props: CreateClassCardProps) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleError = (errors: FieldErrors<FieldValues>) => { };

  const registerOptions = {
    name: { required: "Name is required" }
  };

  const handleRegistration = (data: any) => {
    ClasFactory.createDefault(data.name, props.userId)
      .then((c) => {
        let newValue: Clas[] = new Array<Clas>();
        newValue.push(...props.classes);
        newValue.push(c);
        props.setClasses(newValue);
        props.setSelectedClas(c);
        handleClose();
      })

  }


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
  };

  return (
    <div>
      <Card sx={{margin:"20px", width: 275, }}>
        <Button
          onClick={handleOpen}
          startDecorator={<Add />}>
          New Class
        </Button>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            <div>
              <FormLabel>Class Name</FormLabel>
              <Input type="text" {...register('name', registerOptions.name)} />
              {errors?.name && <FormHelperText>{errors.name.message?.toString()}</FormHelperText>}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}