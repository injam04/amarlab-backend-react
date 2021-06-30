import axios from 'axios';
import AsyncSelect from 'react-select/async';

const SelectUser = ({ setUserDetails, setUserPatients }) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/user_management/user/`)
  //     .then((resp) => {
  //       const users = resp.data.results.map((user) => {
  //         return {
  //           value: user.username,
  //           label: user.username,
  //           username: user.username,
  //           id: user.id,
  //         };
  //       });
  //       console.log(users);
  //     });
  // }, []);

  const handleChange = (e) => {
    // console.log(e);
    setUserDetails(e);

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user_management/patient/?user=${e.id}`
      )
      .then((resp) => {
        const results = resp.data.results;
        // console.log(results);
        setUserPatients(results);
      });
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      // resolve(filterUsers(inputValue));
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/user_management/user/?search=${inputValue}`
        )
        .then((resp) => {
          // console.log(resp.data);
          const users = resp.data.results.map((user) => {
            return {
              value: user.username,
              label: user.username,
              username: user.username,
              id: user.id,
            };
          });
          resolve(users);
        });
    });

  return (
    <AsyncSelect
      onChange={handleChange}
      // defaultOptions={users}
      loadOptions={promiseOptions}
      placeholder={'Search user'}
    />
  );
};

export default SelectUser;
