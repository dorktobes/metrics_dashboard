import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import httpQuery from '../queries/metaDisplay';
import stateQuery from '../queries/selectedClinician';

class MetaDisplay extends Component {
  renderOnLoad() {
    if (!this.props.loading && this.props.Clinician) {
      return (
        <div>
          <h3>
            {`${this.props.Clinician.first_name} ${this.props.Clinician.last_name}`}
          </h3>
          <div>
            {this.renderSpecialties()}
            {this.renderPerWeekAverage()}
          </div>
        </div>
      );
    }
    return <div>Choose a clinician</div>;
  }

  renderSpecialties() {
    const {
      specialty_1,
      specialty_2,
      specialty_3,
    } = this.props.Clinician;
    const specialties = [specialty_1, specialty_2, specialty_3];
    return (
      <div>
        <h4>Specialties</h4>
        <ul>
          {specialties.filter(e => e).map(e => (
            <li key={e}>{e}</li>))}
        </ul>
      </div>
    );
  }

  renderPerWeekAverage() {
    const oneYearAgo = new Date('01/01/2017');
    let ytdAppointments = 0;
    this.props.Clinician.appointments.forEach((e) => {
      const scheduledDate = new Date(e.date_of_service);
      ytdAppointments += scheduledDate > oneYearAgo;
    });
    return (
      <div>
        <h4>2017 Appointments per Week</h4>
        <p>Goal: {this.props.Clinician.target_patients_per_day}</p>
        <p>Actual: {Math.round(ytdAppointments / 52)}</p>
      </div>);
  }

  render() {
    return (
      <div className="metaDisplay">
        {this.renderOnLoad()}
      </div>
    );
  }
}

MetaDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  Clinician: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    target_patients_per_day: PropTypes.int,
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
)(MetaDisplay);
