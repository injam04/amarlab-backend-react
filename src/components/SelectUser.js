import { useState } from 'react';
import Select from 'react-select';

const SelectUser = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleChange = (e) => {
    console.log(`Option selected:`, e);
  };

  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  );
};

export default SelectUser;
