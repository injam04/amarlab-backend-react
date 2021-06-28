import DatePicker from 'react-datepicker';
import range from 'lodash/range';
import { getMonth, getYear } from 'date-fns';
import { useState } from 'react';

const DateSelect = () => {
  const [defaultDate, setDefaultDate] = useState(null);
  const years = range(getYear(new Date()), 2025, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            type='button'
            className='btn btn-primary btn-sm mr-2'
            style={{
              borderRadius: '0 !important',
              padding: '3px 10px',
            }}
          >
            {'<'}
          </button>

          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
            className='mr-2'
            style={{
              outline: 'none',
              border: '0px solid #777',
              background: '#fff',
              padding: '2px 8px',
              fontSize: '13px',
            }}
          >
            {years.map((option) => (
              <option
                key={option}
                value={option}
                style={{
                  fontSize: '15px',
                }}
              >
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            style={{
              outline: 'none',
              border: '0px solid #777',
              background: '#fff',
              padding: '2px 5px',
              fontSize: '13px',
            }}
          >
            {months.map((option) => (
              <option
                key={option}
                value={option}
                style={{
                  fontSize: '15px',
                }}
              >
                {option}
              </option>
            ))}
          </select>

          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            type='button'
            className='btn btn-primary btn-sm ml-2'
            style={{
              borderRadius: '0 !important',
              padding: '0 10px',
            }}
          >
            {'>'}
          </button>
        </div>
      )}
      selected={defaultDate}
      onChange={(e) => {
        setDefaultDate(e);
        // //console.log(e);
      }}
      className='form-control'
      placeholderText='01 Jan 2000'
      minDate={new Date()}
      dateFormat='dd MMM yyyy'
    />
  );
};

export default DateSelect;
