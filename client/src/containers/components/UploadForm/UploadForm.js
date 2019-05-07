//import React from "react"
import React, { Component } from "react";

//styles
import './UploadForm.css';

class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          helper: props.helper,
          accounts: props.accounts,
          title: null,
          location: null,
          tags: null,
          authorName: null,
          previousId: null,
          verify: false
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
        this.handleChangePrevId = this.handleChangePrevId.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleVerify = this.handleVerify.bind(this);
    }

    //event handlers for form data
    handleChangeName(event) {
        this.setState({authorName: event.target.value});
    }
    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }
    handleChangeTags(event) {
        this.setState({tags: event.target.value.split(",")});
    }
    handleChangePrevId(event) {
        this.setState({previousId: event.target.value});
    }
    handleChangeLocation(event) {
        this.setState({location: event.target.value});
    }
    handleVerify(event) {
        this.setState({verify: event.target.value});
    }

    render() {
        // if (this.state.storageValue == null) {
        //   return <div>Loading ...</div>;
        // }
        return (
          <div className="bodyContainer">
            <h1 id="uploadTitle">Upload</h1>
            <div id="form">
                <form onSubmit={this.handleSubmit}>
                    <label>
                      Name
                      <input type="text" value = {this.state.authorName} onChange = {this.handleChangeName}/>
                    </label>
                    <label>
                        Title
                      <input type="text" value = {this.state.title} onChange = {this.handleChangeTitle} />
                    </label>
                    <label>
                        Tags (comma seperated list)
                      <input type="text" value = {this.state.tags} onChange = {this.handleChangeTags} />
                    </label>
                    <label>
                        Previous Paper ID (0 if none)
                      <input type="text"  value = {this.state.previousId} onChange = {this.handleChangePrevId} />
                    </label>
                    <label>
                        Upload PDF
                        <input id="file" type="file" value = {this.state.location} onChange = {this.handleChangeLocation}/>
                    </label>
                    <label>
                        I verify that the above information is correct
                        <input type="checkbox" value = {this.state.verify} onChange = {this.handleVerify}/>
                    </label>
                  </form>
                  <div className="rightAnchor">
                    <button id="subButton" onClick = {() => handleSubmit(this.state)}>Submit</button>
                    {/* <input id="subButton" type="submit" value="CONTINUE"/> */}
                  </div>
            </div>
          </div>

        )
    }
}
async function handleSubmit(state) {
    if (state.authorName == null || state.title == null ||
        state.tags == null || state.previousId == null ||
        state.location == null) {
        alert("No fields can be left blank!");
        return;
    }

    if (state.verify == false) {
        alert("please verify that the information below is correct")
        return
    }

    await state.helper.addPaper(state.title, state.location, state.tags, state.authorName, state.previousId);
    alert("Paper Uploaded" + state.helper.getPaper(1).title)

}
export default UploadForm;
