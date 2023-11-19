import { APIService } from "./APIService";
import { Clas, Lesson, Row, Topic } from "./interfaces";


export class ClasFactory {
    static createDefault(className: string, userId: string): Promise<Clas> {
        return APIService.createClass(className, userId).then(
            clas => { 
                TopicFactory.createDefault(clas._id);
                return clas;
            }
        )
    }
}

export class TopicFactory {
    static createDefault(clasId: string): Promise<Topic> {
        return APIService.createNewTopic("Sample Topic", clasId).then(
            topic => {
                LessonFactory.createDefault(topic._id);
                return topic;
            }
        )
    }
}

export class LessonFactory {
    static createDefault(topicId: string): Promise<Lesson> {
        return APIService.createNewLesson(
            "Sample Lesson", 
            topicId,
            [RowFactory.getDefault()])
    }
}

export class RowFactory {
    static getDefault(): Row {
        return {
            _id: "65441f653bfbf117153c2316", //matching db element
            comment: "",
            title: "Sample question",
            purpose: "question",
            leftRight: ["This is a sample question", ""]
        };
    }
}