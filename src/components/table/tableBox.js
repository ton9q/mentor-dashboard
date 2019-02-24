import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHead from './tableHead/tableHead';
import TableBody from './tableBody/tableBody';

import { compare, getNicknameFromGithubLink } from '../../constants/index';

// import './table.css';

class TableBox extends Component {
  render() {
    const { data, selected } = this.props;

    let selectedStudents = [];
    data.pairs.map(element => {
      const nickname = getNicknameFromGithubLink(element.mentor.github).toLowerCase();
      if (nickname === selected) {
        selectedStudents = element.students;
      }
    });

    let studentsNicknames = [];
    let studentsTasks = [];
    selectedStudents.map((student, indexStudent) => {
      studentsNicknames.push(student.github);

      student.tasks.map((task, indexTask) => {
        if (indexStudent === 0) {
          let link = '';
          let status = '';

          data.tasksInfo.map(taskInfo => {
            if (compare(task.name, taskInfo.name)) {
              link = taskInfo.link;
              status = taskInfo.status;
            }
          });

          studentsTasks[indexTask] = {
            name: task.name,
            marks: [],
            link: link,
            status: status,
          };
        }
        studentsTasks[indexTask].marks.push(task.mark);
      });
    });

    return (
      <div className="student-results">
        <table className="tableBox">
          <TableHead students={studentsNicknames} />
          <TableBody tasks={studentsTasks} />
        </table>
      </div>
    );
  }
}

TableBox.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.string,
};

TableBox.defaultProps = {
  selected: '',
};

export default TableBox;
