import React from 'react';

const MATCH_MOBILEPHONE = /^1\d{10}$/;

var DriverForm = React.createClass({
  propTypes: {
    setDriver: React.PropTypes.func.isRequired,
    saveDriver: React.PropTypes.func.isRequired,
  },
  handleChange: function () {
    var driver = {
      name: this.refs.ref_driver_name.value.trim(),
      mobilephone: this.refs.ref_driver_mobilephone.value.trim(),
    };
    this.props.setDriver(driver);
  },
  handleSubmit: function () {
    if (!MATCH_MOBILEPHONE.test(this.props.data.mobilephone)) {
      this.refs.ref_driver_mobilephone.focus();
      var data = this.props.data;
      data.mobilephone = '';
      this.props.setDriver(data);
      alert("请输入正确的手机号码");
      return;
    }
    this.props.saveDriver();
  },
  render: function () {
    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">名称：</label>
          <div className="col-sm-11">
            <input type="text" className="form-control" placeholder="请输入司机名称" id="driver_form_name"
                   ref="ref_driver_name" value={this.props.data.name} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 control-label text-right">手机号码：</label>
          <div className="col-sm-11">
            <input type="text" className="form-control" placeholder="请输入手机号码" id="driver_form_mobilephone"
                   ref="ref_driver_mobilephone" value={this.props.data.mobilephone} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-offset-1 col-sm-11">
            <button type="button" className="btn btn-default" onClick={this.handleSubmit} id="driver_form_submit">保存
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default DriverForm;
