import React, { Component } from "react";
import Loader from "react-loader-spinner";
export default class PageLoader extends React.Component {
  //other logic
  render() {
    return <Loader type="Oval" color="#974578" height={30} width={30} />;
  }
}
