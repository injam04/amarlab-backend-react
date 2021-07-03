import axios from 'axios';
import AsyncSelect from 'react-select/async';

const SearchTests = ({ testType, setAllLabs }) => {
  const handleChange = (e) => {
    // console.log(e);
    if (e.order_type === 'package') {
      const labs = e.packageitem
        .filter((item) => {
          return item.test_item.branch !== null;
        })
        .map((item) => {
          return {
            ...item,
            order_type: 'package',
          };
        });
      // console.log(labs);
      setAllLabs(labs);
    } else if (e.order_type === 'diagnostic') {
      const labs = e.testitem
        .filter((item) => {
          return item.branch !== null;
        })
        .map((item) => {
          return {
            ...item,
            order_type: 'diagnostic',
          };
        });
      // console.log(labs);
      setAllLabs(labs);
    }
    // setUserDetails(e);
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      // resolve(filterUsers(inputValue));
      if (testType === 'diagnostic') {
        var url = 'diagnostic-test-item';
      } else if (testType === 'package') {
        var url = 'diagnostic-package';
      }
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/diagnostic/${url}/?search=${inputValue}`
        )
        .then((resp) => {
          // console.log(resp.data.results);
          const tests = resp.data.results.map((test) => {
            return {
              ...test,
              value: test.name,
              label: test.name,
              order_type: testType === 'diagnostic' ? 'diagnostic' : 'package',
            };
          });
          resolve(tests);
          // console.log(tests);
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
