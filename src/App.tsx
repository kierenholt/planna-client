import { useState } from 'react';
import './App.css';
import '@fontsource/inter';

import { AuthWrapper } from './authWrapper';
import { AppContent } from './appContent';

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
