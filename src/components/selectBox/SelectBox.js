import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

import { getNicknameFromGithubLink } from '../../constants/index';

class SelectBox extends Component {
  constructor(props) {
    super(props);
    const buildMentorsOptions = this.buildMentorsOptions();
    this.state = { mentors: buildMentorsOptions };
  }

  buildMentorsOptions() {
    const { mentors } = this.props;
    const options = [];

    mentors.forEach(mentor => {
      const nickname = getNicknameFromGithubLink(mentor.github).toLowerCase();

      options.push({
        value: nickname,
        label: nickname,
      });
    });

    options.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      return 1;
    });

    return options;
  }

  render() {
    const { mentors } = this.state;
    const { selected, onSelect } = this.props;

    const valueObj = {
      label: selected,
      value: selected,
    };

    return (
      <Fragment>
        <Select
          className="SelectBox"
          value={valueObj}
          isClearable={true}
          isSearchable={true}
          options={mentors}
          onChange={onSelect}
        />
      </Fragment>
    );
  }
}

SelectBox.propTypes = {
  mentors: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

SelectBox.defaultProps = {
  mentors: [],
  selected: '',
};

export default SelectBox;
