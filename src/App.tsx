import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import { JWT } from './accessToken';
import '@fontsource/inter';
import { AccountMenu } from './accountMenu';
import { Box, Button, DialogTitle, Drawer, IconButton, Stack, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import ModalClose from '@mui/joy/ModalClose';
import MenuIcon from '@mui/icons-material/Menu';
import { APIService } from './APIService';
import { ClassesList } from './classesList';
import { Clas, Topic } from './interfaces';

import { AssignedWorkPanel } from './assignedWorkPanel';
import { PeoplePanel } from './peoplePanel';
import { TopicsList } from './topicsList';
import { CreateTopicButton } from './createTopicButton';
import { CreateClassButton } from './createClassButton';

function App() {
  const KEY_FOR_GOOGLE_ACCESS_TOKEN = "googleAccessToken";
  const [open, setOpen] = React.useState(true);

  let [accessToken, setAccessToken] = useState<JWT | null>(getAccessTokenFromStorage());
  let [userId, setUserId] = useState<string>(accessToken ? "G"+accessToken?.sub : "");

  let [selectedClass, setSelectedClass] = useState<Clas | null>(null);
  let [classes, setClasses] = useState<Clas[]>([]);
  let [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  let [topics, setTopics] = useState<Topic[]>([]);


  useEffect(() => {
      if (userId) APIService.getClassesOfUser(userId)
          .then((items: Clas[]) => {
              if (items) setClasses(items)
          });
      }, [userId]);

  useEffect(() => {
    if (selectedClass) {
      APIService.getTopicNamesOfClass(selectedClass._id)
        .then((items: Topic[]) => {
          if (items) setTopics(items)
        });
    }
  }, [selectedClass])

  async function loginSuccessHandler(credentialResponse: CredentialResponse) {
    let decoded: JWT | null = credentialResponse.credential ? jwt_decode(credentialResponse.credential) as JWT : null;
    if (decoded) {
      console.log(decoded);
      await APIService.getOrCreateUser(decoded);
      setAccessToken(decoded);
      localStorage.setItem(KEY_FOR_GOOGLE_ACCESS_TOKEN, JSON.stringify(decoded));
      setUserId("G"+decoded.sub);
    }
    else {
      throw new Error("invalid jwt");
    }
  }

  function loginErrorHandler(): void {
    throw new Error('Function not implemented.');
  }

  function logout(): void {
    setAccessToken(null);
    localStorage.removeItem(KEY_FOR_GOOGLE_ACCESS_TOKEN);
  }

  function getAccessTokenFromStorage() {
    let json = localStorage.getItem(KEY_FOR_GOOGLE_ACCESS_TOKEN);
    let token: JWT | null = json ? JSON.parse(json) : null;
    if (token) {
      return token;
    }
    return null;
  }

  

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
        {accessToken ?
          <div>
            <Stack direction="row" spacing={1} justifyContent='space-between'>
              <Box>
                <IconButton color="neutral" onClick={() => setOpen(true)} size='lg'>
                  <MenuIcon />
                </IconButton>
              </Box>
              <Stack style={{ padding: "20px" }} direction="row" justifyContent="flex-end" alignItems="center" spacing={2} >
                <AccountMenu accessToken={accessToken} logoutHandler={logout} />
              </Stack>
            </Stack>

            <Drawer open={open} onClose={() => setOpen(false)} >
              <ModalClose />
                <ClassesList setSelectedClass={setSelectedClass}
                  selectedClass={selectedClass} classes={classes}>
                  <CreateClassButton userId={userId} setClasses={setClasses} 
                  classes={classes} setSelectedClas={setSelectedClass}/>
                </ClassesList>
            </Drawer>

            <Tabs>
              <TabList>
                <Tab>Scheme of work</Tab>
                <Tab>Assigned work</Tab>
                <Tab>People</Tab>
              </TabList>
              <TabPanel value={0}>
                {selectedClass ? 
                <div>
                <Stack direction="row">
                  <CreateTopicButton clasId={selectedClass._id} setTopics={setTopics} topics={topics} />
                </Stack>
                <TopicsList selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} topics={topics} />
                </div>
                : <></>}

              </TabPanel>
              <TabPanel value={1}>
                <AssignedWorkPanel />
              </TabPanel>
              <TabPanel value={2}>
                <PeoplePanel />
              </TabPanel>
            </Tabs>
          </div> :
          <GoogleLogin onSuccess={loginSuccessHandler} onError={loginErrorHandler} />}
      </GoogleOAuthProvider>
    </div >
  );
}

export default App;
