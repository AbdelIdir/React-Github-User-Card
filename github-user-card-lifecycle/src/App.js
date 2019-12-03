import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      followers: []
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/AbdelIdir")
      .then(response => {
        // console.log(response.data);
        this.setState({
          users: response.data
        });
      })

      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://api.github.com/users/AbdelIdir/followers")
      .then(response => {
        console.log(response.data);
        this.setState({
          followers: response.data
        });
      })

      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={this.state.users.avatar_url} />
          <Card.Body>
            <Card.Title>{this.state.users.name}</Card.Title>
            <Card.Text>Bio: {this.state.users.bio}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Location: {this.state.users.location}</ListGroupItem>
            <ListGroupItem>
              Created: {this.state.users.created_at}
            </ListGroupItem>
            <ListGroupItem>
              Followers: {this.state.users.followers}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href={this.state.users.html_url}>Card Link</Card.Link>
            <Card.Link href={this.state.users.organizations_url}>
              Organizations
            </Card.Link>
          </Card.Body>
        </Card>

        {this.state.followers.map((data, id) => (
          <Card style={{ width: "18rem", margin: "40px" }} key={id}>
            <Card.Img variant="top" src={data.avatar_url} />
            <Card.Body>
              <Card.Title>{data.login}</Card.Title>
            </Card.Body>

            <Card.Body>
              <Card.Link href={data.html_url}>Card Link</Card.Link>
              <Card.Link href={data.organizations_url}>Organizations</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default App;
