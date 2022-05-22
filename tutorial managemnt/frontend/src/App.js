
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';

import {BrowserRouter as Router, Route} from 'react-router-dom'
//import Home from './components/home/Home'


 import AllBook from './components/AllETutes';
 import Addbook from './components/AddETute.js';
 import cusview from './components/customerview';


 
 
 import editbook from './components/editETutes';

function App() {
  return (
    
    <Router>
   <div>
     <Nav/>
     <Header/>
     
    

     <Route path = "/add" exact component={Addbook}/>
     <Route path = "/all" exact component={AllBook}/>
     <Route path = "/cus" exact component={cusview}/>
    

     <Route path = "/edit/:id" exact component={editbook}/>
      
   </div>
   </Router>
  );
}

export default App;
