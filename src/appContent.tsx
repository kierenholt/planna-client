import { ClassesCardList } from './classesList';
import { Clas } from './interfaces';
import { AccountMenu } from './accountMenu';
import { Button, Card, Stack } from '@mui/joy';

import { CreateClassCard } from './createClassButton';
import { useContext, useEffect, useState } from 'react';
import { APIService } from './APIService';
import { TopicContainer } from './TopicContainer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserContext } from './authWrapper';


export function AppContent() {

    let [selectedClass, setSelectedClass] = useState<Clas | null>(null);
    let [classes, setClasses] = useState<Clas[]>([]);
    
    let user = useContext(UserContext);

    useEffect(() => {
        if (user) {
            APIService.getClassesOfUser(user._id)
                .then((items: Clas[]) => {
                    if (items) setClasses(items)
                });
        }
    }, [user]);

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
                <AccountMenu />
            </Stack>
        </Stack>

        {selectedClass ?
            <div>
                {/* TOPIC LIST CONTAINER */}
                <TopicContainer classId={selectedClass._id} />
            </div>

            : 
            <ClassesCardList handleClick={setSelectedClass}
                classes={classes} setClasses={setClasses}>
                <CreateClassCard setClasses={setClasses}
                    classes={classes} setSelectedClas={setSelectedClass} />
            </ClassesCardList>
        }
    </div>)
}