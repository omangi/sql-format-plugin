import React from 'react';
import './connection.css';
import Header from "../header/header";

const Connection = () => (
    // const connections = [
    //     {
    //         host: 'localhost',
    //         dbname: 'bob',
    //         user: 'root',
    //         password: 'root'
    //     }
    // ]

    <div className="connection-list">
        <div>
            <strong>Host: </strong>localhost <br />
            <strong>DB: </strong>bob <br />
            <strong>User: </strong>root <br />
            <strong>Password: </strong> <br />
        </div>
        <br />
        <br />
        <div>
            <strong>Host: </strong>localhost <br />
            <strong>DB: </strong>bob <br />
            <strong>User: </strong>root <br />
            <strong>Password: </strong> <br />
        </div>
    </div>
)

export default Connection;