import DatePicker from 'react-datepicker';
import range from 'lodash/range';
import { getMonth, getYear } from 'date-fns';

const PatientDob = ({ patientDob, setPatientDob }) => {
  const years = range(1950, getYear(new Date()) + 1, 1);
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
              height: '28px',
              borderRadius: '5px',
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
              height: '28px',
              borderRadius: '5px',
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
      selected={patientDob}
      onChange={(e) => {
        setPatientDob(e);
        //e);
      }}
      className='patient-dob'
      placeholderText='Person date of birth'
      maxDate={new Date()}
      dateFormat='dd MMM yyyy'
      style={{
        padding: '33px 22px',
        borderRadius: '5px',
        fontSize: '18px',
        fontWeight: '400',
        border: '2px solid #f0f0f5',
      }}
    />
  );
};

export default PatientDob;
