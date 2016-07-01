import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import App from './containers/App';
import FleetIndex from './components/fleets/fleet_index';
import FleetNew from './components/fleets/fleet_new';
import FleetShow from './components/fleets/fleet_show';
import FleetEdit from './components/fleets/fleet_edit';
import DriverIndex from './components/drivers/driver_index';
import DriverNew from './components/drivers/driver_new';
import DriverShow from './components/drivers/driver_show';
import DriverEdit from './components/drivers/driver_edit';
import VehicleIndex from './components/vehicles/vehicle_index';
import VehicleNew from './components/vehicles/vehicle_new';
import VehicleShow from './components/vehicles/vehicle_show';
import VehicleEdit from './components/vehicles/vehicle_edit';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={FleetIndex} />

        <Route component={FleetIndex} path='fleets'/>
        <Route component={FleetNew} path='fleets/new'/>
        <Route component={FleetShow} path='fleets/:id'/>
        <Route component={FleetEdit} path='fleets/:id/edit'/>

        <Route component={DriverIndex} path='drivers'/>
        <Route component={DriverNew} path='drivers/new'/>
        <Route component={DriverShow} path='drivers/:id'/>
        <Route component={DriverEdit} path='drivers/:id/edit'/>

        <Route component={VehicleIndex} path='vehicles'/>
        <Route component={VehicleNew} path='vehicles/new'/>
        <Route component={VehicleShow} path='vehicles/:id'/>
        <Route component={VehicleEdit} path='vehicles/:id/edit'/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
