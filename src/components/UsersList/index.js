import React from 'react';
import PropTypes from 'prop-types';
import { getUsersListAsync } from '../../services/userService';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, list: []
        }
    }

    componentDidMount = async () => {
        const kv = await getUsersListAsync();
        this.setState({
            loading: false,
            list: Object.values(kv)
        })
    }

    render() {
        if(this.state.loading) {
            return 'Loading...';
        }
        return <ul>
            {this.state.list.map(x => <li key={x.uid}><img width={16} height={16} src={x.photoURL} alt={1}/> {x.displayName}</li>)}
        </ul>;
    }
}

UsersList.propTypes = {};

export default UsersList;
