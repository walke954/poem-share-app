import React from 'react';

import './loading.css';

export default function Loading(props){
    return (<div className="loadingElement">
        <div className="loading-container">
            <div className="left-circle" />
            <div className="right-circle" />
            <div className="center-circle" />
        </div>
    </div>)
}