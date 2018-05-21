import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import query from '../queries/cliniciansDropdown';

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
      <select>
        {this.renderOptions()}
      </select>
    );
  }
}

Dropdown.propTypes = {
  
};

export default graphql(query)(Dropdown);
