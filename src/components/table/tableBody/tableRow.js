import React from 'react';
import PropTypes from 'prop-types';
// import TaskResultsContainer from '../containers/taskResults';

import TableItem from './tableItem';

import { STATUS_COLORS } from '../../../constants/index';

function getColor(name, mark) {
  let color;

  name = name.trim().toLowerCase();

  switch (name) {
    case 'checking': {
      color = STATUS_COLORS.checking;
      if (mark >= 0) color = STATUS_COLORS.checked;
      break;
    }
    case 'checked': {
      color = STATUS_COLORS.checked;
      if (mark === -1) color = STATUS_COLORS.notPassed;
      break;
    }
    case 'in progress': {
      color = STATUS_COLORS.inProgress;
      if (mark >= 0) color = STATUS_COLORS.checked;
      break;
    }
    case 'todo': {
      color = STATUS_COLORS.noStatus;
      break;
    }
    default: {
      color = STATUS_COLORS.noStatus;
    }
  }
  return color;
}

const TableRow = props => {
  const { task } = props;

  const colorTask = getColor(task.status);
  const colorMark = task.marks.map(mark => {
    return getColor(task.status, mark);
  });

  return (
    <tr>
      <td className={`table-item ${colorTask}`} key={task.name}>
        {task.link === '' ? (
          <a href="#">{task.name}</a>
        ) : (
          <a href={task.link} target="_blank" rel="noopener noreferrer">
            {task.name}
          </a>
        )}
      </td>
      {task.marks.map((mark, index) => (
        <TableItem key={task.name} mark={mark} color={colorMark[index]} />
      ))}
    </tr>
  );
};

TableRow.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableRow;
