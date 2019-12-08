import React, { PropTypes } from 'react';
import './search.scss';

const Search = (props) => {
  const { value, onChange } = props;

  return (
    <div className="search">
      <div className="search__input">
        <div
          className="search__icon"
        />
        <input
          type="text"
          placeholder="Search using War Planets"
          onChange={e => onChange(e.target.value)}
          value={value}
          autoFocus
        />
      </div>
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Search;
