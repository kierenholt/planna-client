import { Add, Api, CheckBox } from "@mui/icons-material";
import { Box, Button, ButtonGroup, FormHelperText, FormLabel, Input, Modal, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { ITopic } from "./interfaces";
import { FieldErrors, FieldValues, useFieldArray, useForm } from "react-hook-form";
import { APIService } from './APIService/APIService';

interface CreateTopicButtonProps {
  clasId: string;
  setTopics: (topics: ITopic[]) => void;
  topics: ITopic[];
}

enum createTopicMode {
  new, fromLibrary
}

export function CreateTopicButton(props: CreateTopicButtonProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  let [mode, setMode] = useState<createTopicMode>(createTopicMode.new);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleError = (errors: FieldErrors<FieldValues>) => { };
  const registerOptions = { name: { required: true } };

  let [libraryTopics, setLibraryTopics] = useState<ITopic[]>([]);
  let [selectedLibraryTopic, setSelectedLibraryTopic] = useState<ITopic | null>(null);

  const handleRegistration = (data: any) => {
    if (data.name) {
      APIService.Topic.createDefault(props.clasId)
        .then((t) => {
          let newValue: ITopic[] = new Array<ITopic>();
          newValue.push(...props.topics);
          newValue.push(t);
          props.setTopics(newValue);
          handleClose();
        })
    }
  }

  useEffect(() => {
    APIService.Topic.getTopicNamesOfClass("000000000000000000000000")
      .then(topics => setLibraryTopics(topics));
  }, []);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
  };

  function ImportHandler(): void {
    if (selectedLibraryTopic) {
      //APIService.createNewTopic(selectedLibraryTopic.name, props.clasId, selectedLibraryTopic.lessons);
    }
  }

  return (

    <div>
      <Button
        onClick={handleOpen}
        startDecorator={<Add />}>
        New Topic
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1> Create Topic </h1>
          <ButtonGroup aria-label="outlined primary button group">
            <Button onClick={() => setMode(createTopicMode.new)}
                  variant={mode == createTopicMode.new ? 'solid' : 'outlined'} >
              Blank
            </Button>
            <Button onClick={() => setMode(createTopicMode.fromLibrary)}
                  variant={mode == createTopicMode.fromLibrary ? 'solid' : 'outlined'} >
              From Library
            </Button>
          </ButtonGroup>
          <br />
          {mode == createTopicMode.new ?
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
              <div>
                <FormLabel>Enter Topic Name</FormLabel>
                <Input type="text" {...register('name', registerOptions.name)} />
                {errors?.name && <FormHelperText>{errors.name.message?.toString()}</FormHelperText>}
              </div>
              <br />
              <Button type="submit">Submit</Button>
            </form>
            :
            <Stack direction='column'>
              {libraryTopics.map((t) => {
                return <Button id={t._id} value={t.name}
                  onClick={() => setSelectedLibraryTopic(t)} 
                  variant={selectedLibraryTopic == t ? 'solid' : 'outlined'} >
                    {t.name}
                </Button>
              })}
              <br />
              <br />
              <Button sx={{marginTop:2}} onClick={ImportHandler}>Import</Button>
            </Stack>
          }
        </Box>
      </Modal>
    </div>
  )
}