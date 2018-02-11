import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchFeeds} from '../../actions/feedTableAction';
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fishType: '',
            fishLifeStage: '',
            location: '',
            error: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
    }

    handleClick(event) {
        const {value, id} = event.target;
        this.setState({[id]: value});
    }

    handleLocationChange(event) {
        const {value} = event.target;
        this.setState({location: value});
    }

    handleSubmit(event) {
        const {fetchFeeds, changePage} = this.props;
        const {fishType, fishLifeStage, location} = this.state;
        event.preventDefault();
        //    Will take all data from state and submit the information to the api call
        if(this.state.error === null){
            fetchFeeds(fishType, fishLifeStage, location)
                .then(()=> changePage())
        }

    }
    getValidationState() {
        const length = this.state.location.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }


    render() {
        return (
            <div className="container">
                            <form
                                onSubmit={this.handleSubmit}>
                                <FormGroup
                                    validationState={this.state.error}
                                >
                                    <div className="fishTypeForm">
                                    {/*1st Select Box for Type of fish farmed*/}
                                    <ControlLabel>What are you farming?</ControlLabel>
                                    <FormControl
                                        id="fishType"
                                        componentClass="select"
                                        onChange={this.handleClick}
                                    >
                                        <option value="">Please Select...</option>
                                        <option value="Carp">Carp</option>
                                        <option value="Salmon">Salmon</option>
                                        <option value="Tilapia">Tilapia</option>
                                        <option value="Catfish">Catfish</option>
                                        <option value="Shrimp">Shrimp</option>
                                        <option value="Trout">Trout</option>
                                    </FormControl>
                                 </div>
                                 <div className="lifeStageTypeForm">
                                    <ControlLabel>Select a lifestage</ControlLabel>
                                    <FormControl
                                        id="fishLifeStage"
                                        componentClass="select"
                                        onChange={this.handleClick}
                                    >
                                        <option value="">Please Select...</option>
                                        <option value="Larval">Larval</option>
                                        <option value="Post-Larval">Post-Larval</option>
                                        <option value="Broodstock">Broodstock</option>
                                        <option value="Fry">Fry</option>
                                        <option value="Fingerling">Fingerling</option>
                                        <option value="Production">Production</option>
                                    </FormControl>
                              </div>
                              <div className="locationForm">
                                    <ControlLabel>Country of Origin</ControlLabel>
                                    <FormControl
                                        id="formControlsText"
                                        type="text"
                                        label="Location"
                                        placeholder="Enter Country of Origin"
                                        onChange={this.handleLocationChange}
                                    />
                                    </div>
                                    <Button bsStyle="primary" type="submit">Search</Button>
                                </FormGroup>
                            </form>
               
                
            </div>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchFeeds,
    changePage: () => push('/feed')
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
