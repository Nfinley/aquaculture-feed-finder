import React, {Component} from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    increment,
    incrementAsync,
    decrement,
    decrementAsync
} from '../../actions/counterAction'

import {
    ButtonToolbar,
    DropdownButton,
    MenuItem,
    Grid,
    Row,
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';

class FeedDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return (
            <div className="">
                Hello
            </div>
        );
    }
}

const mapStateToProps = state => ({
    feedData: state.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
    changePage: () => push('/about-us')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedDashboard)
