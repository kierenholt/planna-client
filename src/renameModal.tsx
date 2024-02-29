import { Box, Button, Card, FormHelperText, FormLabel, Input, Modal, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";

interface RenameModalProps {
    submitHandler: (a: any) => void,
    isOpen: boolean,
    defaultText: string
}

export function RenameModal(props: RenameModalProps) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleError = (errors: FieldErrors<FieldValues>) => { };

    const handleClose = () => {props.isOpen = false};

    const registerOptions = {
        name: { required: "Name is required" }
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        p: 4,
    };

    return (
        <Modal
            open={props.isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <form onSubmit={handleSubmit(props.submitHandler, handleError)}>
                    <div>
                        <FormLabel>
                            Rename
                        </FormLabel>
                        <Input type="text" {...register('name', registerOptions.name)} value={props.defaultText}/>
                        {errors?.name &&
                        <FormHelperText>
                            {errors.name.message?.toString()}
                        </FormHelperText>}
                    </div>
                    <Stack direction={"row"}>
                        <Button type="submit">
                            Rename
                        </Button>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    )
}