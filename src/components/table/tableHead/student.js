import React from 'react';
import PropTypes from 'prop-types';

import { GITHUB_PREFIX } from '../../../constants/index';

const Student = ({ github }) => (
  <th key={github}>
    <a 
      href={GITHUB_PREFIX + github} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {github}
    </a>
  </th>
);

Student.propTypes = {
  github: PropTypes.string.isRequired,
};

export default Student;
