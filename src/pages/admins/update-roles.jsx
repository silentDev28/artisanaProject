import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
class UpdateRoles extends Component {
  state = {};
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/roles`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data.json().then((data) => {
        if (data.hasErrors) {
          return this.setState({
            totalRoles: "",
          });
        } else {
          this.setState({
            totalRoles: data.items,
          });
        }
      });
    });
  }
  handleRoles = (attr, value) => {
    this.props.getRolesId(value);
  };

  render() {
    const getAllRoles = this.state.totalRoles ? (
      this.state.totalRoles.map((role) => (
        <option value={role._id} key={role._id}>
          {role.name}
        </option>
      ))
    ) : (
      <div>Loading...</div>
    );
    console.log(this.state.roleId);
    return (
      <FormControl variant="outlined" className="col-10">
        <InputLabel>Select roles</InputLabel>
        <Select
          native
          value={this.state.roleId}
          label="Select roles"
          onChange={(evt) => this.handleRoles("roleId", evt.target.value)}
        >
          <option aria-label="None" value="" />
          {getAllRoles}
        </Select>
      </FormControl>
    );
  }
}
export default UpdateRoles;
