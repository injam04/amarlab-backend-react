import moment from 'moment';
import DatePicker from 'react-datepicker';

const TimeSelect = ({ sampleTime, setSampleTime }) => {
  return (
    <DatePicker
      selected={sampleTime}
      onChange={(date) => {
        setSampleTime(date);
        console.log(moment(date).format('hh:mm:ss'));
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={60}
      timeCaption='Time'
      dateFormat='h:mm aa'
      className='last mt-2'
      placeholderText='select time'
    />
  );
};

export default TimeSelect;
