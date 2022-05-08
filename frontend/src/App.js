import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import StudentDetails from "./Components/StudentDetails/index";
import SideBar from "./Components/Common/SideBar/SideBar"
import StudentList from "./Components/StudentList/index";

const App = () =>{
  return (
    <>
    <Router>
      <div className="container-fluid m-0 p-0" style={{ userSelect: "none" }}>
        <div className="row m-0 p-0">
          <div className="col-md-2 m-0 p-0">
            <SideBar />
          </div>
          <div className="col-md-10 m-0 p-0">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route exact path="/studentDetails">
                <StudentDetails />
              </Route>
              <Route exact path="/studentList">
                <StudentList />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
