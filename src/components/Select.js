import React from 'react';

const Select = ({options = [], valueKey, titleKey, allTitle, value, onSelect, rawOptions}) => {
  const keyGenerator = () => {
    return Math.ceil(Math.random() * 100000000);
  }

  const disableOption = (option) => {
    if (options.includes(option)) {
      return false
    }
    return true
  }

  return (
    <select onChange={onSelect}>
      <option value="" selected={value === ''}>{allTitle}</option>
      {rawOptions.map(option => 
        <option 
          key={keyGenerator()} 
          value={option.name}
          selected={value === option.name}
          disabled={disableOption(option)}
        >
          {option.name}
        </option>
      )}
    </select>
  )
}

export default Select;