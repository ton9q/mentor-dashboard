import React from 'react';
import PropTypes from 'prop-types';

import Student from './student';

const TableHeadRow = ({ students }) => (
  <thead>
    <tr>
      <th />
      {students.map(student => (
        <Student key={student} github={student} />
      ))}
    </tr>
  </thead>
);

TableHeadRow.propTypes = {
  students: PropTypes.arrayOf(PropTypes.any),
};

TableHeadRow.defaultProps = {
  students: [],
};

export default TableHeadRow;
