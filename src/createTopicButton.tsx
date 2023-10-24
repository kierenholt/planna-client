import { Add, Api, CheckBox } from "@mui/icons-material";
import { Box, Button, FormHelperText, FormLabel, Input, Modal } from "@mui/joy";
import { useEffect, useState } from "react";
import { Topic } from "./interfaces";
import { APIService } from "./APIService";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";

interface CreateTopicButtonProps {
    clasId: string;
    setTopics: (topics: Topic[]) => void;
    topics: Topic[];
}

export function CreateTopicButton(props: CreateTopicButtonProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
    };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleError = (errors: FieldErrors<FieldValues>) => { };
  
    const registerOptions = {
      name: {  },
      libraryTopic: {  }
    };

    let [libraryTopics, setLibraryTopics] = useState<Topic[]>([]);
    let [selectedLibraryTopic, setSelectedLibraryTopic] = useState<Topic | null>(null);
  
    const handleRegistration = (data: any) => {
      if (data.name) {
        APIService.createNewTopicInClas(data.name, props.clasId)
          .then((t) => {
            let newValue: Topic[] = new Array<Topic>();
            newValue.push(...props.topics);
            newValue.push(t);
            props.setTopics(newValue);
            handleClose();
          })
      }
      else if (data.libraryTopic) {
        console.log(data.libraryTopic);
      }
    }

    useEffect(() => {
      APIService.getTopicsOfClass("000000000000000000000000")
      .then(topics => setLibraryTopics(topics));
    },[]);

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
                New Topic
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                    <div>
                      <h2>Create new topic</h2>
                        <FormLabel>Topic Name</FormLabel>
                        <Input type="text" {...register('name', registerOptions.name)} />
                        {errors?.name && <FormHelperText>{errors.name.message?.toString()}</FormHelperText>}

                      <h2>Import topic from library</h2>
                      {libraryTopics.map(l => <div><CheckBox 
                        {...register('libraryTopic', registerOptions.libraryTopic)}>
                        </CheckBox>{l.name}</div>) 
                      }
                    </div>
                    <Button type="submit">Submit</Button>
                    </form>
                </Box>
            </Modal>
        </div>
        )
}