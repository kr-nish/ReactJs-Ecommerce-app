import React, { Component} from 'react';

interface UserProfile {
    id: number;
    name: string;
    email: string;
}

interface  AppState {
    users: UserProfile[];
    isLoading: boolean;
}

class UserList extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            users :[],
            isLoading: true
        }
    };

    // call the ComponentDidMount method because I want to perform my fetch operation before the component is rendered to the DOM
    componentDidMount(): void {
        console.log("Component did mount has been executed after the component has been loaded into the DOM");
        
        // fetching data from an API and setting the state
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then( data => {
            this.setState({users: data, isLoading:false});
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            this.setState({isLoading:false})
        })
    }

    render() {
        const {users, isLoading} = this.state;
        return (
            <div>
                <h1>User List</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{ user.name} - {user.email}</li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }
}

export default UserList