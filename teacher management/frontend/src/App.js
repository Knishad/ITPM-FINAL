
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Allteacher from './components/Allteacher';
 import Addteacher from './components/Addteacher';
 import Editteacher from './components/editteacher';
import {BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  return (
    <Router>
   <div>
     <Nav/>
     <Header/>
     
     <Route path = "/addteacher" exact component={Addteacher}/>
     <Route path = "/allteacher" exact component={Allteacher}/>
     <Route path = "/editteacher/:id" exact component={Editteacher}/>

     
   </div>
   </Router>
  );
}

export default App;
