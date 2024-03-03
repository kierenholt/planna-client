import { Box, Button, Card, DialogContent, FormHelperText, FormLabel, Input, Modal, Stack, TextField, Typography } from "@mui/joy";
import { useState } from "react";
import { FocusTrap } from '@mui/base/FocusTrap';
import { FieldValues, useForm } from "react-hook-form";

interface RenameModalProps {
    onSubmit: (name: string) => void,
    onCancel: () => void,
    isOpen: boolean,
    placeholder: string
}

export function RenameModal(props: RenameModalProps) {

    const {register, handleSubmit, formState: { errors }, } = useForm();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        p: 4,
    };

    return (
        <Modal
            open={props.isOpen}
            onClose={() => { }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogContent>
                <Box sx={style}>

                    <form onSubmit={handleSubmit(
                        (data: FieldValues) => props.onSubmit(data.name)
                    )}>
                    <Input {...register('name', {value: props.placeholder})} autoFocus={true}/>
                    <Stack direction="row">
                        <Input type="submit" value={"Rename"}/>
                        <Input type="button" onClick={props.onCancel} value={"Cancel"}/>
                    </Stack>
                    </form>
                </Box>
            </DialogContent>
        </Modal >
    )
}