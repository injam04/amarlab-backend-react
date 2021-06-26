import IbnSina from '../assets/img/ibnsina.png';
import moment from 'moment';

const SingleCartSummery = ({ singleItem }) => {
  return (
    <div className='single'>
      <div className='person'>
        <div className='name'>
          <span>Person: </span> {singleItem.patient.full_name},&nbsp;
        </div>
        {/* <div className='age'>28 Years</div> */}
        <div className='age'>
          {singleItem.patient.dob === null
            ? ''
            : moment().diff(`${singleItem.patient.dob}`, 'years') + ' Years'}
        </div>
      </div>
      <div className='details'>
        <h5>Complete Blood Count</h5>
        <p>
          <span className='font-semibold'>
            Preparations: <br />
          </span>
          Known as Complete Blood Count Automated Blood
        </p>
        <p className='price'>
          ৳ {singleItem.purchasable_order_item.sell_price}
        </p>
        <p className='type'>
          Type:{' '}
          <span className={`${singleItem.order_type}`}>
            {singleItem.order_type}
          </span>
        </p>
      </div>
      <div className='hospital'>
        <p className='font-semibold'>Ordered From:</p>
        <img src={IbnSina} alt='' />
      </div>
    </div>
  );
};

export default SingleCartSummery;
