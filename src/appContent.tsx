import { ClassesList } from './classesList';
import { AccountMenu } from './accountMenu';
import { Button, Card, Stack } from '@mui/joy';

import { useContext, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserContext } from './authWrapper';
import { APIService } from './APIService/APIService';
import { IClas } from './interfaces';
import { TopicList } from './topicList';
import { CreateButton } from './createButton';
import { Helpers } from './helpers';
import { CreateCard } from './createCard';


export function AppContent() {

    let [selectedClass, setSelectedClass] = useState<IClas | null>(null);
    let [classes, setClasses] = useState<IClas[]>([]);

    let user = useContext(UserContext);

    const createClassHandler = async() => {
        if (user) {
            let newClass = await APIService.Clas.createDefault(user._id)
            let newClasses = Helpers.arrayWith(classes, newClass);
            setClasses(newClasses);
            setSelectedClass(newClass);
        }
    }

    useEffect(() => {
        if (user) {
            APIService.Clas.getClassNamesOfUser(user._id)
                .then((items: IClas[]) => {
                    if (items) setClasses(items)
                });
        }
    }, [user]);

    return (<div>
        {/* TOP ROW */}
        <Stack direction="row" spacing={1}
            justifyContent='space-between' alignItems="center" padding={2}>
            {selectedClass ?
                <Button onClick={() => setSelectedClass(null)}>
                    <ArrowBackIcon />
                    Back to classes
                </Button> : <></>}
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
                <TopicList classId={selectedClass._id} />
            </div>

            :
            <ClassesList handleClick={setSelectedClass}
                classes={classes} setClasses={setClasses}>

                <CreateCard onClick={() => createClassHandler()} text='Add Class' key='0'/>
            </ClassesList>
        }
    </div>)
}