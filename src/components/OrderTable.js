import DateSelect from './DateSelect';
import TimeSelect from './TimeSelect';

const OrderTable = () => {
  return (
    <tr>
      <td className='py-5 pl-5'>
        <p className='mb-0 font-weight-bold'>#0065</p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>
          21 June 2021, <br />
          12:15 PM
        </p>
      </td>
      <td className='pl-3'>
        <select className=''>
          <option value=''>Order Confirmed</option>
        </select>
        {/* <p className='mb-0 font-weight-bold'>Processing</p> */}
      </td>
      <td className='pl-3'>
        <select className=''>
          <option value=''>Himika</option>
        </select>
        {/* <p className='mb-0 font-weight-bold'>Himika</p> */}
      </td>
      <td className='pl-3'>
        <select className=''>
          <option value=''>Nirob</option>
        </select>
        {/* <p className='mb-0 font-weight-bold'>Nirob</p> */}
      </td>
      <td className='pl-3'>
        <select className=''>
          <option value=''>COVID</option>
        </select>
        {/* <p className='mb-0 font-weight-bold'>COVID</p> */}
      </td>
      <td className='pl-3'>
        <textarea value='Basis'></textarea>
        {/* <p className='mb-0 font-weight-bold'>BASIS</p> */}
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold pr-3'>
          <input type='text' value='Injamamul Haque' />
          <input type='number' value='26' className='last' />
          <select className='last' style={{ width: '185px' }}>
            <option value=''>Male</option>
            <option value=''>Female</option>
          </select>
          <textarea
            value='72, Janata Housing, Ring road, Shyamoli'
            className='last'
          ></textarea>
        </p>
      </td>
      <td className='pl-3'>
        <select className=''>
          <option value=''>Cronic</option>
        </select>
        {/* <p className='mb-0 font-weight-bold'>Cronic</p> */}
      </td>
      <td className='pl-3'>
        <input type='number' value='01714505084' />
        <input type='email' value='injam.cse@gmail.com' className='last' />
        {/* <p className='mb-0 font-weight-bold pr-2'>
          01714505084 <br /> injam.cse@gmail.com
        </p> */}
      </td>
      <td className='pl-3'>
        <textarea value='Mohammadpur'></textarea>
        {/* <p className='mb-0 font-weight-bold'>Mohammadpur</p> */}
      </td>
      <td className='pl-3'>
        <div className='mb-0 font-weight-bold'>
          <div className='items'>
            &mdash; CBC <br /> <span className='text-dark-50'>৳ BDT 300</span>{' '}
            <br /> Popular
          </div>
          <div className='items mt-3'>
            &mdash; HbA1c <br /> <span className='text-dark-50'>৳ BDT 960</span>{' '}
            <br /> Dr. Lalpaths
          </div>
          <div className='items mt-3'>
            &mdash; Service Fee: <br />{' '}
            <span className='text-dark-50'>৳ BDT 960</span> <br />
          </div>
          <div className='items mt-3'>
            *{' '}
            <a href='?#' className='text-dark'>
              Test Add,
            </a>
            <br />*{' '}
            <a href='?#' className='text-dark'>
              Test Edit
            </a>{' '}
            <br />*{' '}
            <a href='?#' className='text-dark'>
              Test Remove
            </a>
          </div>
        </div>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>Popular</p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>
          <DateSelect />
          <TimeSelect />
          {/* <input type='text' value='10:20 Am' className='last' /> */}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>BDT 16700</p>
      </td>
      <td className='pl-3'>
        <input type='text' value='- BDT 700' />
        <p className='mb-0 font-weight-bold'>
          <br /> Reasons:{' '}
          <textarea
            value='Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Animi, fuga.'
            rows='5'
          ></textarea>
          <br /> - Himika
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>BDT 16000</p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>Unpaid</p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold pr-2'>
          <textarea
            value='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam,
          assumenda labore dolorem et consequuntur consectetur?'
            rows='6'
          ></textarea>
        </p>
      </td>
      <td className='pl-3'>
        <select>
          <option>Delivered (Hard Copy)</option>
        </select>
        {/* <p className='mb-0 font-weight-bold'>Delivered (Hard Copy)</p> */}
      </td>
    </tr>
  );
};

export default OrderTable;
