import React, { Component } from "react";
import "./Style.css";
import axios from "axios";
import "../Loading/loading.css";
import "../Loading/loading-btn.css";
import { getLocation } from "../Location/Location";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class TakeInput extends Component {
  state = {
    form: {
      doc_name: "",
      place: "",
      quali: "",
      sample: "",
      chemist: [""],
      associate: "",
      misc: "",
      value: 0
    },
    options: [
      {
        name: "Select number of chemists",
        value: 0
      },
      { name: "1", value: 1 },
      { name: "2", value: 2 },
      { name: "3", value: 3 },
      { name: "4", value: 4 },
      { name: "5", value: 5 },
      { name: "6", value: 6 }
    ],
    isLoading: false
  };
  componentDidMount() {
    getLocation();
  }
  notify = arg => {
    if (arg === "submitted") {
      toast.info("Form Submitted Successfully !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else if (arg === "error") {
      toast.error("Check Your Internet Connection !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };
  handleChemist = e => {
    let updatedArray = [...this.state.form.chemist];
    // console.log(updatedArray);
    updatedArray[0] = e.target.value;
    // console.log(updatedArray, this.state.form.chemist);
    this.setState({
      form: {
        chemist: updatedArray
      }
    });
  };
  handleChange = e => {
    this.setState({
      form: { ...this.state.form, [e.target.id]: e.target.value }
    });
  };
  handleSubmit = e => {
    // console.log(this.state.form);
    this.setState({ isLoading: true });
    const url = "/react_eugenics_reporting/insert.php";
    const submit_form = {
      ...this.state.form,
      username: this.props.username
    };
    axios
      .post(url, { submit_form })
      .then(res => {
        this.setState({
          form: {
            doc_name: "",
            place: "",
            quali: "",
            sample: "",
            associate: "",
            misc: "",
            value: 0
          },
          isLoading: false
        });
        this.notify("submitted");
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
        this.notify("error");
      });
  };
  validateForm = () => {
    const validate = this.state.form;
    return (
      validate.doc_name.length > 1 &&
      validate.place.length > 1 &&
      validate.quali.length > 1 &&
      validate.associate.length > 1
    );
  };

  chemistno = () => {
    var indents = [];
    for (let i = 0; i < this.state.form.value; i++) {
      indents.push(
        <input
          id={`chemist${i}`}
          key={i}
          type="text"
          placeholder={` Chemist ${i + 1}`}
          onChange={this.handleChemist}
          value={this.state.form.chemist[0]}
        />
      );
    }
    return indents;
  };

  render() {
    return (
      <div>
        <div id="content">
          <input
            id="doc_name"
            type="text"
            placeholder=" Doctor's Name"
            onChange={this.handleChange}
            value={this.state.form.doc_name}
          />
          <input
            id="place"
            type="text"
            placeholder=" Place"
            onChange={this.handleChange}
            value={this.state.form.place}
          />
          <input
            id="quali"
            type="text"
            placeholder=" Qualification"
            onChange={this.handleChange}
            value={this.state.form.quali}
          />
          <input
            id="sample"
            type="text"
            placeholder=" Sample"
            onChange={this.handleChange}
            value={this.state.form.sample}
          />

          <select
            id="value"
            onChange={this.handleChange}
            value={this.state.form.value}
          >
            {this.state.options.map(items => (
              <option key={items.value} value={items.value}>
                {items.name}
              </option>
            ))}
          </select>
          {this.chemistno()}

          <input
            id="associate"
            type="text"
            placeholder=" Associate"
            onChange={this.handleChange}
            value={this.state.form.associate}
          />
          <input
            id="misc"
            type="text"
            placeholder=" Miscellaneous"
            onChange={this.handleChange}
            value={this.state.form.misc}
          />
          <button
            type="button"
            className="btn btn-success ld-ext-right running"
            onClick={this.handleSubmit}
            // disabled={!this.validateForm()}
          >
            <i className="fas fa-notes-medical pad-takeinput" />
            {this.state.isLoading === true ? (
              <div className="ld ld-ring ld-spin" />
            ) : null}

            <span>Submit</span>
          </button>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default TakeInput;
