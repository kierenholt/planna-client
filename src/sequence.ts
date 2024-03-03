
export interface IHasSequence {
    sequence: number;
}

export class Sequence {
    static INITIAL_STEP: number = 1048576; 

    static insertBetween(a: IHasSequence, b: IHasSequence, c: IHasSequence, setter: (item: IHasSequence) => void) {
        b.sequence = 0.5*(a.sequence + b.sequence);
        setter(b);
    }

    static insertAtEnd(a:IHasSequence, b:IHasSequence, setter: (item: IHasSequence) => void) {
        b.sequence = a.sequence + this.INITIAL_STEP;
        setter(b);
    }

    static insertAtBeginning(a:IHasSequence, b:IHasSequence, setter: (item: IHasSequence) => void) {
        a.sequence = b.sequence - this.INITIAL_STEP;
        setter(a);
    }
}