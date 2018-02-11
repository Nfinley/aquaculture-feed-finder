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
            location: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        fetchFeeds(fishLifeStage, fishType, location)
            .then(()=> changePage())
    }


    render() {
        return (
            <div className="">
                <Grid >
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                        </Col>
                    </Row>
                    {/*Content will live in this block*/}
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                            <form
                                onSubmit={this.handleSubmit}>
                                <FormGroup>
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
                                        <option value="Pacific White Shrimp">Pacific White Shrimp</option>
                                        <option value="Giant Tiger Shrimp">Giant Tiger Shrimp</option>
                                    </FormControl>
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
                                    <ControlLabel>Country of Origin</ControlLabel>
                                    <FormControl
                                        id="formControlsText"
                                        type="text"
                                        label="Location"
                                        placeholder="Enter Country of Origin"
                                        onChange={this.handleLocationChange}
                                    />
                                    <Button bsStyle="primary" type="submit">Search</Button>
                                </FormGroup>
                            </form>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                        </Col>
                    </Row>
                </Grid>
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
