import React, { Component } from 'react';

class SessionsTable extends Component {

    render() {
        localStorage.setItem('reduxState', JSON.stringify({}));
        return (
            <div>
                SessionsTable
            </div>
        )
    }
}

export default SessionsTable;