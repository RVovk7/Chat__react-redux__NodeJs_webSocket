import React, { Component } from 'react';
import { connect } from 'react-redux';
class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  
    render() {
        console.log(this.props.state.peopleReducer)
        return (

            <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search" />
                    <i className="fa fa-search"></i>
                </div>
                <ul className="list">
                    { this.props.state.peopleReducer.map(p => {
                        return <li key={p.name} className="clearfix">
                            <img src={p.avatar} alt="avatar" />
                            <div className="about">
                                <div className="name">{p.name}</div>
                                <div className="status">
                                    <i className="fa fa-circle online"></i> online
            </div>
                            </div>
                        </li>
                    }) }

                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.peopleReducer)
    return {
   state
    }
}
const mapDispatchToProps = dispatch => {
    return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);