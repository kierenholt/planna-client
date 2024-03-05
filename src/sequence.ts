import { Square } from "@mui/icons-material";

export interface IHasSequence {
    sequence: number;
}

export class Sequence {
    static INITIAL_STEP: number = 1048576; 

    static async insertBetween(a: IHasSequence, b: IHasSequence, c: IHasSequence) {
        b.sequence = 0.5*(a.sequence + c.sequence);
    }

    static async insertAtEnd(a:IHasSequence, b:IHasSequence) {
        b.sequence = a.sequence + this.INITIAL_STEP;
    }

    static async insertAtBeginning(a:IHasSequence, b:IHasSequence) {
        a.sequence = b.sequence - this.INITIAL_STEP;
    }
}