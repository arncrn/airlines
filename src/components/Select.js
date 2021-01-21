import React from 'react';

const Select = ({options, valueKey, titleKey, allTitle, value, onSelect}) => {
  const keyGenerator = () => {
    return Math.ceil(Math.random() * 100000000);
  }
  // console.log(options)
  return (
    <select onChange={onSelect}>
      <option value="" selected={value === ''}>{allTitle}</option>
      {options.map(option => 
        <option 
          key={keyGenerator()} 
          value={option.name}
          selected={value === option.name}
        >
          {option.name}
        </option>
      )}
    </select>
  )
}

export default Select;