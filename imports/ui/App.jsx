import React from 'react';
import { UserTable } from './UserTable.jsx';
import InputField from './InputField.jsx';

export const App = () => (
  <div>
    <h1>CRUD Operations</h1>
    <InputField/>
    <UserTable/>
  </div>
);
