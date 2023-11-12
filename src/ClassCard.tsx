import { Button, Card, CardActions, CardContent, Typography } from "@mui/joy";
import { Clas } from "./interfaces";

interface ClassCardProps {
    handleClick: (clas: Clas) => void;
    clas: Clas;
}

export function ClassCard(props: ClassCardProps) {
    return (
    <Card sx={{ width: 275, margin: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {props.clas.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => props.handleClick(props.clas)}>Open</Button>
      </CardActions>
    </Card>
    )    
}