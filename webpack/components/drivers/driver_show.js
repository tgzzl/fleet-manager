import React from 'react';

var DriverShow = React.createClass({
  getDefaultProps: function () {
    return {
      title: '司机详情'
    };
  },
  getInitialState: function () {
    return {
      driver:{},
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData:function(){
    $.ajax({
      url: '/drivers/' + this.props.params.id,
      method: 'GET',
      dataType: 'JSON',
      success: function (data) {
        this.setState({driver:data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
        <div>
          <p>姓名：{this.state.driver.name}</p>
          <p>手机：{this.state.driver.mobilephone}</p>
        </div>
    );
  }
});
export default DriverShow;