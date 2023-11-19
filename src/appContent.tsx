import { ClassesCardList } from './classesList';
import { Clas, Topic } from './interfaces';
import { AccountMenu } from './accountMenu';
import { Button, Card, Stack } from '@mui/joy';

import { CreateClassCard } from './createClassButton';
import { LoggedInUser as LoggedInUser } from './user';
import { useEffect, useState } from 'react';
import { APIService } from './APIService';
import { TopicContainer } from './TopicContainer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface AppContentProps {
    user: LoggedInUser;
}

export function AppContent(props: AppContentProps) {

    let [selectedClass, setSelectedClass] = useState<Clas | null>(null);
    let [classes, setClasses] = useState<Clas[]>([]);

    useEffect(() => {
        if (props.user) APIService.getClassesOfUser(props.user._id)
            .then((items: Clas[]) => {
                if (items) setClasses(items)
            });
    }, [props.user]);

    return (<div>
        {/* TOP ROW */}
        <Stack direction="row" spacing={1} 
            justifyContent='space-between' alignItems="center" padding={2}>
            { selectedClass ? 
            <Button onClick={() => setSelectedClass(null)}>
                <ArrowBackIcon />
                Back to classes
            </Button> : <></> }
            <Card >
                {selectedClass?.name}
            </Card>
            <Stack style={{ padding: "20px" }} direction="row" justifyContent="flex-end" alignItems="center" spacing={2} >
                <AccountMenu user={props.user} />
            </Stack>
        </Stack>

        {selectedClass ?
            <div>
                {/* TOPIC LIST CONTAINER */}
                <TopicContainer selectedClass={selectedClass} />
            </div>

            : 
            <ClassesCardList handleClick={setSelectedClass}
                classes={classes}>
                <CreateClassCard userId={props.user._id} setClasses={setClasses}
                    classes={classes} setSelectedClas={setSelectedClass} />
            </ClassesCardList>
        }
    </div>)
}