import React from 'react';
import './App.css';

import NavBar from './components/navbar';
import MembersForm from './components/members/MembersForm';
import MembersList from './components/list';

function App() {
  return (
    <div className='app'>
      <NavBar />
      <div className="app__content">
        <MembersForm />
        <MembersList />
      </div>
    </div>
  );
}

export default App;
