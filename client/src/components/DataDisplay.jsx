import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import MonthDropDown from './MonthDropDown';
import Histogram from './Histogram';
import httpQuery from '../queries/dataDisplay';
import stateQuery from '../queries/selectedClinician';
import helpers from '../utils/helpers';

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      year: 2016,
    };

    this.changeMonth = this.changeMonth.bind(this);
    this.filterAppointmentsByMonth = helpers.memoize(helpers.filterAppointmentsByMonth);
  }

  changeMonth(e) {
    this.setState({
      month: parseInt(e.target.value),
    })
  }

  

  renderAppointments() {
    if (!this.props.loading && this.props.Clinician) {
      return this.filterAppointmentsByMonth(this.state.month, this.props.Clinician.appointments)
        .map(e => (
          <div key={e.date_of_service + e.patient.last_name + e.patient.first_name}>{`on ${e.date_of_service} with ${e.patient.first_name} ${e.patient.last_name}`}</div>
        ));
    }
    return [];
  }
  render() {
    const { Clinician } = this.props;
    if (!this.props.loading && Clinician) {
      return (
        <div className="dataDisplay">
          <MonthDropDown handleChange={this.changeMonth} />
          {this.renderAppointments()}
          <Histogram data={
            this.filterAppointmentsByMonth(this.state.month, this.props.Clinician.appointments)
          }
          />
        </div>
      );
    }
    return (
      <div>
        {'loading'}
      </div>
    );
  }
}

DataDisplay.propTypes = {
  
};

export default compose(
  graphql(stateQuery, {
    name: 'stateQuery',
    props: (props) => {
      return { selectedClinician: props.stateQuery.selectedClinician.id, };
    },
  }),
  graphql(httpQuery, {
    name: 'httpQuery',
    props: (props) => {
      return {
        ...props.ownProps,
        loading: props.httpQuery.loading,
        errors: props.httpQuery.errors,
        Clinician: props.httpQuery.Clinician,
      };
    },
  }),
)(DataDisplay);
