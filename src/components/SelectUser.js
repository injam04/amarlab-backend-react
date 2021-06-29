import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';

const SelectUser = ({ setUserDetails }) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user_management/user/`)
      .then((resp) => {
        const users = resp.data.results.map((user) => {
          return {
            value: user.username,
            label: user.username,
            username: user.username,
            id: user.id,
          };
        });
        console.log(users);
        setUsers(users);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e);
    setUserDetails(e);
  };

  return (
    <Select
      onChange={handleChange}
      options={users}
      placeholder={'Search user'}
    />
  );
};

export default SelectUser;
