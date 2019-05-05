//currently not in use

import React, { Component } from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.state = { name: props.name, open: false };
    }

    handleClick() {
        this.setState({open:true});
    }
    handleCloseClick() {
        this.setState({open:false});
    }
    
    render() {
        const open = this.state.open;
        
        // let pulldown = <>;
        <div>
            
        </div>
    }
};

export default Pulldown;
