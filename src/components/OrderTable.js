import moment from 'moment';

const OrderTable = ({ order }) => {
  return (
    <tr>
      <td className='py-3 pl-5'>
        <p className='mb-0 font-weight-bold'>#{order.order_id}</p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>{order.user.username}</p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>
          {moment(order.created_at).format('DD MMM YYYY,')}
          <br />
          {moment(order.created_at).format('hh:mm A')}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold text-capitalize'>
          {order.orderdetail ? (
            order.orderdetail.order_status
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>
          {order.orderdetail && order.orderdetail.cs_agent ? (
            order.orderdetail.cs_agent.first_name
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>
          {order.orderdetail && order.orderdetail.mt ? (
            order.orderdetail.mt.first_name
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold text-capitalize'>
          {/* {order.orderdetail && order.orderdetail.order_type === 'non_covid'
            ? 'NON COVID'
            : 'COVID'} */}
          {order.orderdetail && order.orderdetail.order_type ? (
            order.orderdetail.order_type
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold text-capitalize'>
          {order.orderdetail ? (
            order.orderdetail.references
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </td>
      {/* <td className='pl-3'>
        <p className='mb-0 font-weight-bold pr-3'>
          Injamamul Haque <br />
          Age: 26 <br />
          Sex: Male <br />
          Address: 72, Janata Housing, Ring road, Shyamoli
        </p>
      </td> */}
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold text-capitalize'>
          {order.orderdetail ? order.orderdetail.persona : <span>&mdash;</span>}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold pr-2'>
          {order.orderitem[0].address.mobile || ''}
          <br /> {order.orderitem[0].address.email || ''}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>
          {order.orderitem[0].address.address
            ? `${order.orderitem[0].address.address}, `
            : ''}
          {`${order.orderitem[0].address.thana}, `}
          {order.orderitem[0].address.district}
        </p>
      </td>
      <td className='pl-3'>
        <div className='mb-0 font-weight-bold'>
          {order.orderitem.map((item, i) => (
            <div key={i} className='mb-2'>
              <div className='items'>
                &mdash;{' '}
                {
                  item.purchasable_order_item.testitem_purchasable_oi
                    .diagnostic_test.name
                }{' '}
                <br />{' '}
                <span className='text-dark-50'>
                  Price: ৳ BDT {item.purchasable_order_item.sell_price}
                </span>{' '}
                <br />
                Lab:{' '}
                {
                  item.purchasable_order_item.testitem_purchasable_oi.branch.lab
                    .name
                }{' '}
                <br /> Patient: {item.patient.full_name}
              </div>
            </div>
          ))}
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
              Test Remove
            </a>
          </div>
        </div>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>
          {moment(order.date).format('DD MMM YYYY')}, <br />
          {/* 05:15 PM */}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>BDT {order.total_price}</p>
      </td>
      <td className='pl-3'>
        <div className='mb-0 font-weight-bold'>
          {order.orderdiscount ? (
            <>
              <p className='m-0'>
                &mdash; BDT {order.orderdiscount.discount_price} <br />
              </p>
              <p className='my-2'>
                Reasons: <br /> {order.orderdiscount.discount_note}
              </p>
              &mdash; Himika
            </>
          ) : (
            <p>&mdash;</p>
          )}
        </div>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold'>BDT {order.total_price}</p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold text-capitalize'>
          {order.orderdetail ? (
            order.orderdetail.payment_status
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </td>
      <td className='pl-3'>
        <p className='mb-0 font-weight-bold pr-2'>
          {order.orderdetail ? (
            order.orderdetail.order_note
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </td>
      <td className='pl-3'>
        {order.orderdelivery.length !== 0 ? (
          <>
            {order.orderdelivery.map((orderdelivery, i) => (
              <p className='mb-0 font-weight-bold' key={i}>
                {orderdelivery.name}
              </p>
            ))}
          </>
        ) : (
          <p className='mb-0 font-weight-bold'>No report</p>
        )}
      </td>
    </tr>
  );
};

export default OrderTable;
