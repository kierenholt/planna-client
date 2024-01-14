import { useState } from 'react';
import './App.css';
import '@fontsource/inter';

import { AuthWrapper } from './authWrapper';
import { JWT } from './accessToken';
import { AppContent } from './appContent';
import { LoggedInUser } from './user';

function App() {

  return (
    <div className="App">
      <AuthWrapper>
        <AppContent/>
      </AuthWrapper>
    </div>
  );
}

export default App;
