
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Addfeedback from './components/Addfeedback';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Allfeedback from './components/Allfeedback';
import editfeedback from './components/editfeedback';


function App() {
  return (

    <Router>
   <div>
  
     <Nav/>
     <Header/>
     
     <Route path = "/addfeed" exact component={Addfeedback}/>
     <Route path = "/allfeed" exaxt component={Allfeedback}/>
     <Route path = "/edit/:id" exact component={editfeedback}/>
    
  </div>


   </Router>

  );
}

export default App;


 
