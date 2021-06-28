import moment from 'moment';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

const TimeSelect = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        console.log(moment(date).format('hh:mm A'));
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption='Time'
      dateFormat='h:mm aa'
      className='last'
    />
  );
};

export default TimeSelect;
