import React, {Component} from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import seedData from '../../seedData';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// Using this for the table http://allenfang.github.io/react-bootstrap-table/example.html
export class FeedDashboard extends Component {
    render() {
        const {feedData}= this.props;
        return (
            <div className="table-margin">
            <BootstrapTable ref='table' data={ feedData } striped hover>
                <TableHeaderColumn dataField='feed_name' dataSort={ true }  width='200px'>Feed Name</TableHeaderColumn>
                <TableHeaderColumn dataField='supplier' isKey={ true } dataSort={ true }>Supplier</TableHeaderColumn>
                <TableHeaderColumn dataField='supported_species' dataSort={ true } width='150px'>Supported Species</TableHeaderColumn>
                <TableHeaderColumn dataField='lifestage' dataSort={ true }>Life Stage</TableHeaderColumn>
                <TableHeaderColumn dataField='cost' dataSort={ true }>Cost/kg</TableHeaderColumn>
                <TableHeaderColumn dataField='sustainability_rating' width='170px'>Sustainability Rating</TableHeaderColumn>
                <TableHeaderColumn dataField='certifications' dataSort={ true }>Certifications</TableHeaderColumn>
                <TableHeaderColumn dataField='location' dataSort={ true }>Location</TableHeaderColumn>
                <TableHeaderColumn dataField='protein_percentage' dataSort={ true }>Protein %</TableHeaderColumn>
                <TableHeaderColumn dataField='supplier-link' dataSort={ true }>Contact</TableHeaderColumn>
            </BootstrapTable>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    feedData: state.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/feed')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedDashboard)