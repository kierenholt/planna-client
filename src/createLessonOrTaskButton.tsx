import { Add, Api, CheckBox } from "@mui/icons-material";
import { Box, Button, ButtonGroup, FormHelperText, FormLabel, Input, Modal, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { ILesson, ITask } from "./interfaces";
import { APIService } from './APIService/APIService';
import { FieldErrors, FieldValues, useForm } from "react-hook-form";

interface CreateLessonButtonProps {
  topicId: string;
  setLessons: (Lessons: ILesson[]) => void;
  Lessons: ILesson[];
  setTasks: (Tasks: ITask[]) => void;
  Tasks: ITask[];
}

enum createMode {
  lesson, task
}

export function CreateLessonOrTaskButton(props: CreateLessonButtonProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  let [mode, setMode] = useState<createMode>(createMode.lesson);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleError = (errors: FieldErrors<FieldValues>) => { };
  const registerOptions = { name: { required: true } }

  const handleRegistration = (data: any) => {
    if (data.name) {
      if (createMode.lesson) {
        APIService.Lesson.createDefault(props.topicId)
          .then((t) => {
            let newValue: ILesson[] = new Array<ILesson>();
            newValue.push(...props.Lessons);
            newValue.push(t);
            props.setLessons(newValue);
            handleClose();
          })
      }
      if (createMode.task) {
        APIService.Task.create(data.name, props.topicId)
          .then((t) => {
            let newValue: ITask[] = new Array<ITask>();
            newValue.push(...props.Tasks);
            newValue.push(t);
            props.setTasks(newValue);
            handleClose();
          })
      }
    }
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
      <Button
        onClick={handleOpen}
        startDecorator={<Add />}>
        New
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1> Create Lesson or Task </h1>
          <ButtonGroup aria-label="outlined primary button group">
            <Button onClick={() => setMode(createMode.lesson)}
                  variant={mode == createMode.lesson ? 'solid' : 'outlined'} >
              New Lesson
            </Button>
            <Button onClick={() => setMode(createMode.task)}
                  variant={mode == createMode.task ? 'solid' : 'outlined'} >
              New Task
            </Button>
          </ButtonGroup>
          <br />
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
              <div>
                <FormLabel>Enter Name</FormLabel>
                <Input type="text" {...register('name', registerOptions.name)} />
                {errors?.name && <FormHelperText>{errors.name.message?.toString()}</FormHelperText>}
              </div>
              <br />
              <Button type="submit">Submit</Button>
            </form>
        </Box>
      </Modal>
    </div>
  )
}