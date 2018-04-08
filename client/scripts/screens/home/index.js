import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { css } from "aphrodite-jss";
import sheet from "./styles.js";

class Home extends Component {
  render() {
    return <div className={css(sheet.container)}>Home Screen</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
