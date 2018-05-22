import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import httpQuery from '../queries/metaDisplay';
import stateQuery from '../queries/selectedClinician';

class MetaDisplay extends Component {
  renderClinicianName() {
    if (!this.props.loading && this.props.Clinician) {
      return (
        <div>
          <div>
            {`${this.props.Clinician.first_name} ${this.props.Clinician.last_name}`}
          </div>
          <div>
            {this.renderSpecialties()}
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
    return specialties.filter(e => e).map(e => (
      <div key={e}>{e}</div>));
  }

  render() {
    return (
      <div>
        {this.renderClinicianName()}
      </div>
    );
  }
}

MetaDisplay.propTypes = {
  
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
)(MetaDisplay);
