import axios from 'axios';
import AsyncSelect from 'react-select/async';

const SearchTests = ({ testType, setAllLabs }) => {
  const handleChange = (e) => {
    console.log(e);
    // setUserDetails(e);
    setAllLabs(e.testitem);
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      // resolve(filterUsers(inputValue));
      //   if (testType === 'diagnostic') {
      //     let url = 'diagnostic-test-item';
      //   } else if (testType === 'diagnostic') {
      //     let url = 'diagnostic-package/';
      //   }
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/diagnostic/diagnostic-test-item/?search=${inputValue}`
        )
        .then((resp) => {
          // console.log(resp.data.results);
          const tests = resp.data.results.map((test) => {
            return {
              ...test,
              value: test.name,
              label: test.name,
            };
          });
          resolve(tests);
        });
    });

  return (
    <AsyncSelect
      onChange={handleChange}
      // defaultOptions={users}
      loadOptions={promiseOptions}
      placeholder={'Search tests'}
    />
  );
};

export default SearchTests;
