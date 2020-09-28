import React from 'react';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', request: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, event) {
    // this.state[key] = event.target.value;
    this.setState({ [key]: event.target.value });
  }

  handleSubmit(event) {
    alert('A json was submitted - check console');
    // console.log(this.state);
    var resp = fetch('/backend/requests', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    });

    resp.then((response) => {
      if (response.status != 200) {
        alert('Invalid POST request!');
        return;
      }
      response.json().then((responseJson) => {
        console.log(responseJson);
      })
    });

    resp.catch((msg) => alert("Post Failure" + msg));

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
            <input type="text" value={this.state.value} onChange={(event) => { this.handleChange('username', event) }} />
        </label>
        <label>
          Request:
            <input type="text" value={this.state.value} onChange={(event) => { this.handleChange('request', event) }} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;
