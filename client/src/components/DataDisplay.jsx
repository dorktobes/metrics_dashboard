import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import httpQuery from '../queries/dataDisplay';
import stateQuery from '../queries/selectedClinician';

class DataDisplay extends Component {
  render() {
    const { Clinician } = this.props;
    if (!this.props.loading && Clinician) {
      return (
        <div>
          {`${Clinician.first_name} ${Clinician.last_name}`}
        </div>
      )
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
