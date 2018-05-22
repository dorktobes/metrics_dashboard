import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import query from '../queries/cliniciansDropdown';

import mutation from '../queries/updateSelectedClinician';

class Dropdown extends Component {
  renderOptions() {
    if (!this.props.data.loading) {
      return this.props.data.Clinicians.map(e => (
        <option key={e.id} value={e.id}>
          {`${e.last_name}, ${e.first_name}`}
        </option>
      ));
    }
    return [];
  }
  render() {
    return (
      <select onChange={(e) => {
        this.props.updateSelectedClinician({
          variables: {
            id: e.target.value,
          },
        });
      }}>
        <option value={null}>Choose a clinician</option>
        {this.renderOptions()}
      </select>
    );
  }
}

Dropdown.propTypes = {
  
};

export default compose(
  graphql(mutation, { name: 'updateSelectedClinician' }),
  graphql(query),
)(Dropdown);
