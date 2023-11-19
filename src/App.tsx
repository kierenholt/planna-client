import { useState } from 'react';
import './App.css';
import '@fontsource/inter';

import { AuthWrapper } from './authWrapper';
import { JWT } from './accessToken';
import { AppContent } from './appContent';
import { LoggedInUser } from './user';

function App() {

  let [user, setUser] = useState<LoggedInUser | null>(null);

  return (
    <div className="App">
      <AuthWrapper onAuthenticated={(s: JWT) => {
        setUser(new LoggedInUser(s));
      }}>
        {user ? <AppContent user={user}/> : <></>}
      </AuthWrapper>
    </div>
  );
}

export default App;
