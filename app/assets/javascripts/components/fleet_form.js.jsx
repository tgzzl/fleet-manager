const MATCH_MOBILEPHONE = /^1\d{10}$/;
const MATCH_TELEPHONE = /^[0-9]+$/;

var FleetForm = React.createClass({
  propTypes: {
    setFleet: React.PropTypes.func.isRequired,
    saveFleet: React.PropTypes.func.isRequired,
  },
  handleChange: function () {
    var fleet = {
      name: this.refs.ref_fleet_name.value.trim(),
      contact: this.refs.ref_fleet_contact.value.trim(),
      mobilephone: this.refs.ref_fleet_mobilephone.value.trim(),
      telephone: this.refs.ref_fleet_telephone.value.trim(),
      address: this.refs.ref_fleet_address.value.trim(),
    };
    this.props.setFleet(fleet);
  },
  handleSubmit: function () {
    if (!MATCH_MOBILEPHONE.test(this.props.data.mobilephone)) {
      this.refs.ref_fleet_mobilephone.getDOMNode().focus();
      var data = this.props.data;
      data.mobilephone = '';
      this.props.setFleet(data);
      alert("请输入正确的手机号码");
      return;
    }
    if (!MATCH_TELEPHONE.test(this.props.data.telephone)) {
      this.refs.ref_fleet_telephone.getDOMNode().focus();
      var data = this.props.data;
      data.telephone = '';
      this.props.setFleet(data);
      alert("请输入正确的固定电话");
      return;
    }
    this.props.saveFleet();
  },
  render: function () {
    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">车队名称：</label>
          <div className="col-sm-11">
            <input type="text" className="form-control" placeholder="请输入车队名称" id="fleet_form_name"
                   ref="ref_fleet_name" value={this.props.data.name} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">联系人：</label>
          <div className="col-sm-11">
            <input type="text" className="form-control" placeholder="请输入联系人" id="fleet_form_contact"
                   ref="ref_fleet_contact" value={this.props.data.contact} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">手机号码：</label>
          <div className="col-sm-11">
            <input type="text" className="form-control" placeholder="请输入手机号码" id="fleet_form_mobilephone"
                   ref="ref_fleet_mobilephone" value={this.props.data.mobilephone} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">固定电话：</label>
          <div className="col-sm-11">
            <input type="text" className="form-control" placeholder="请输入固定电话" id="fleet_form_telephone"
                   ref="ref_fleet_telephone" value={this.props.data.telephone} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">车队驻地：</label>
          <div className="col-sm-11">
            <input type="text" className="form-control" placeholder="请输入车队驻地" id="fleet_form_address"
                   ref="ref_fleet_address" value={this.props.data.address} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-offset-1 col-sm-11">
            <button type="button" className="btn btn-default" onClick={this.handleSubmit} id="fleet_form_submit">保存
            </button>
          </div>
        </div>
      </div>
    );
  }
});

