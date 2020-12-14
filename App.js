import React from 'react';
import StackNav from './app/navigations/StackNav'
import { UserProvider } from './app/contexts/UserContext'

export default function App() {
  return (
    <UserProvider>
      <StackNav />
    </UserProvider>
  );
}