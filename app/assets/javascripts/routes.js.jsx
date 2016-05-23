var Route = ReactRouter.Route;

this.AppRoutes = (
  <Route>
    <Route handler={FleetIndex} path='/'/>

    <Route handler={FleetIndex} path='/fleets'/>
    <Route handler={FleetNew} path='/fleets/new'/>
    <Route handler={FleetShow} path='/fleets/:id'/>
    <Route handler={FleetEdit} path='/fleets/:id/edit'/>

    <Route handler={DriverIndex} path='/drivers'/>
    <Route handler={DriverNew} path='/drivers/new'/>
    <Route handler={DriverShow} path='/drivers/:id'/>
    <Route handler={DriverEdit} path='/drivers/:id/edit'/>

    <Route handler={VehicleIndex} path='/vehicles'/>
    <Route handler={VehicleNew} path='/vehicles/new'/>
    <Route handler={VehicleShow} path='/vehicles/:id'/>
    <Route handler={VehicleEdit} path='/vehicles/:id/edit'/>
  </Route>
);
