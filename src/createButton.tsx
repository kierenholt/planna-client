import { Add } from "@mui/icons-material";
import { useContext, useState } from "react";
import { IClas, ITopic } from "./interfaces";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { UserContext } from "./authWrapper";
import { APIService } from "./APIService/APIService";
import { RenameModal } from "./renameModal";
import { Button, Card } from "@mui/joy";

interface CreateButtonProps {
  text: string;
  onClick: () => void;
}

export function CreateButton(props: CreateButtonProps) {

  return (
    <Button
      onClick={props.onClick}
      startDecorator={<Add />}>
      {props.text}
    </Button>
  )
}