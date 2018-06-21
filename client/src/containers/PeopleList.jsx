import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserItem from '../components/UserItem.jsx';
import PeopleSearch from '../components/PeopleSearch.jsx';
class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='wolf7'>
                <PeopleSearch />
                <ul className="list">
                    {this.props.state.peopleReducer.map(p => {
                        return (
                            <UserItem key={p.userID} userName={p.userName} avatar={p.avatar} />
                        )
                    })}

                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}
const mapDispatchToProps = dispatch => {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);