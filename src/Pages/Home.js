import React, { Component } from "react"

export default class Home extends Component {
  render() {
    console.log("props", this.props)

    return <h1>This is your temporary Home!</h1>
  }
}
