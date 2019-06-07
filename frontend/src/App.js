import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
// import './App.css';
import Contacts from './components/contact/Contacts';
import AddContact from './components/contact/AddContact';
import Header from './components/layouts/Header';
import Provider from './context';



class App extends React.Component {
  render(){
  return (
    <Provider>
    <div className="App">
       <Header branding = "Quizdom"/>
      <div className="container">
      <AddContact/>
        <Contacts/>
      
    
      </div>
        
    </div>
    </Provider>
  );
}
}

export default App;
