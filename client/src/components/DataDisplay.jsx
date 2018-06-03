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
    };

    this.changeMonth = this.changeMonth.bind(this);
    this.filterAppointmentsByMonth = helpers.memoize(helpers.filterAppointmentsByMonth);
  }

  changeMonth(e) {
    this.setState({
      month: parseInt(e.target.value, 10),
    });
  }
  render() {
    const { Clinician } = this.props;
    if (!this.props.loading && Clinician) {
      return (
        <div className="dataDisplay">
          <MonthDropDown handleChange={this.changeMonth} />
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
  loading: PropTypes.bool.isRequired,
  Clinician: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    appointments: PropTypes.arrayOf(PropTypes.shape({
      canceled: PropTypes.bool.isRequired,
      no_show: PropTypes.bool.isRequired,
      date_of_service: PropTypes.string.isRequired,
      patient: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
      }),
    })),
  }),
};

export default compose(
  graphql(stateQuery, {
    name: 'stateQuery',
    props: props => ({ selectedClinician: props.stateQuery.selectedClinician.id }),
  }),
  graphql(httpQuery, {
    name: 'httpQuery',
    props: props => ({
      ...props.ownProps,
      loading: props.httpQuery.loading,
      errors: props.httpQuery.errors,
      Clinician: props.httpQuery.Clinician,
    }),
  }),
)(DataDisplay);
