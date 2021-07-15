import React from 'react';
import useStyles from './Style';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmployeeList from './components/Employee/EmployeeList';
import EmployeeAdd from './components/Employee/EmployeeAdd';
import EmployeeEdit from './components/Employee/EmployeeEdit';

function App() {

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Navbar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path={["/", "/employee"]} component={EmployeeList} />
            <Route exact path={"/employee/add"} component={EmployeeAdd} />
            <Route exact path={"/employee/edit"} component={EmployeeEdit} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}
export default App;
