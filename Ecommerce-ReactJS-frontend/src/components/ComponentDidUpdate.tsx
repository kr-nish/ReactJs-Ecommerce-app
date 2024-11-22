import React, { Component } from "react";

interface UserProps {
  userId: number;
}

interface UserState {
  userData: object | null;
}

class UserProfile extends Component<UserProps, UserState> {
  state: UserState = {
    userData: null,
  };

  componentDidUpdate(prevProps: UserProps): void {
    console.log("Component did update has been called");
    
    // I will check if the 'userId' has changed
    if (this.props.userId !== prevProps.userId)
      this.fetchUserData(this.props.userId);
  }
  fetchUserData(userId: number) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => this.setState({ userData: data }));
  }

  render() {
    return (
      <div>
        {this.state.userData ? (
          <pre>{JSON.stringify(this.state.userData, null, 2)}</pre>
        ) : (
          <p>Loading user data.....</p>
        )}
      </div>
    );
  }
}

export default UserProfile
