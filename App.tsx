
import React from 'react';

import { AppComponent } from './src/components/AppComponent';

//useContext
import { SQLiteProvider } from './src/context/SQLiteContext';

export const App = () => {

  return (
    <SQLiteProvider>
      <AppComponent/>
    </SQLiteProvider>
  )
}