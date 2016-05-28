var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var IndexRoute = window.ReactRouter.IndexRoute;
var History = window.ReactRouter.browserHistory;
var Link = window.ReactRouter.Link;

var App = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.data
    }
  },
  componentWillReceiveProps: function (nextProps) {
    console.log('===', this.props.data, nextProps.data);
    this.setState({data: nextProps.data});
  },
  render: function () {
    return (
      <Router history={History}>
        <Route data={this.state.data} path="/" component={FleetIndex}/>

        <Route data={this.state.data} path="/fleets" component={FleetIndex}/>
        <Route data={this.state.data} path="/fleets/new" component={FleetNew}/>
        <Route data={this.state.data} path="/fleets/:id" component={FleetShow}/>
        <Route data={this.state.data} path="/fleets/:id/edit" component={FleetEdit}/>

        <Route data={this.state.data} path="/drivers" component={DriverIndex}/>
        <Route data={this.state.data} path="/drivers/new" component={DriverNew}/>
        <Route data={this.state.data} path="/drivers/:id" component={DriverShow}/>
        <Route data={this.state.data} path="/drivers/:id/edit" component={DriverEdit}/>

        <Route data={this.state.data} path="/vehicles" component={VehicleIndex}/>
        <Route data={this.state.data} path="/vehicles/new" component={VehicleNew}/>
        <Route data={this.state.data} path="/vehicles/:id" component={VehicleShow}/>
        <Route data={this.state.data} path="/vehicles/:id/edit" component={VehicleEdit}/>
      </Router>
    );
  }
});

