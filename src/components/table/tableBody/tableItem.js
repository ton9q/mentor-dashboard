import React from 'react';
import PropTypes from 'prop-types';

const TableItem = ({ mark, color }) => (
  <td className={`table-item ${color}`}>{mark === -1 ? '' : mark}</td>
);

TableItem.propTypes = {
  color: PropTypes.string,
  mark: PropTypes.number,
};

TableItem.defaultProps = {
  color: 'grey',
  mark: 0,
};

export default TableItem;
