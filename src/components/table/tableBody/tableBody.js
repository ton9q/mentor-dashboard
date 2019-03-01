import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableRow from './tableRow';

class TableBody extends Component {
  render() {
    const { tasks } = this.props;

    return (
      <tbody>
        {tasks.map(task => (
          <TableRow key={task.name} task={task} />
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default TableBody;
