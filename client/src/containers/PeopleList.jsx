import React, { Component} from 'react';
import PropTypes from 'prop-types';
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
                    {this.props.clientsList.map(p => {
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
      clientsList : state.peopleReducer
    }
}
PeopleList.propTypes = {
    clientsList: PropTypes.array.isRequired
}
export default connect(mapStateToProps)(PeopleList);