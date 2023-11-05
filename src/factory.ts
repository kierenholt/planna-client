import { APIService } from "./APIService";
import { Clas, Lesson, Row, Topic } from "./interfaces";


export class ClasFactory {
    static createDefault(className: string, clasId: string): Promise<Clas> {
        return APIService.createClass(className, clasId).then(
            clas => { 
                TopicFactory.createDefault(clas._id);
                return clas;
            }
        )
    }
}

export class TopicFactory {
    static createDefault(clasId: string): Promise<Topic> {
        return LessonFactory.createDefault().then(
            lesson => APIService.createNewTopic(
                "Sample Topic", clasId, [lesson]
            )
        )
    }
}

class LessonFactory {
    static createDefault(): Promise<Lesson> {
        return RowFactory.createDefault().then(
            row => {
                return {
                    rows: [row],
                    name: "Sample lesson",
                    assignedNotes: [],
                };
            }
        );
    }
}


class RowFactory {
    static createDefault(): Promise<Row> {
        return Promise.resolve({
            _id: "65441f653bfbf117153c2316", //matching db element
            comment: "",
            title: "Sample question",
            purpose: "question",
            leftRight: ["This is a sample question", ""]
        });
    }
}