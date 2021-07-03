import Select from 'react-select';

const SelectLab = ({ allLabs, setLabDetails }) => {
  const labs = allLabs.map((lab) => {
    // console.log({
    //   ...lab,
    //   value: lab.branch.lab.name,
    //   label:
    //     lab.order_type === 'diagnostic'
    //       ? `${lab.branch.lab.name} — ${lab.branch.location.name} — ${lab.purchasable_order_item.sell_price}`
    //       : `${lab.test_item.branch.lab.name} — ${lab.test_item.branch.location.name} — ${lab.test_item.purchasable_order_item.sell_price}`,
    // });
    return {
      ...lab,
      value:
        lab.order_type === 'diagnostic'
          ? `${lab.branch.lab.name} — ${lab.branch.location.name} — ${lab.purchasable_order_item.sell_price}`
          : `${lab.test_item.branch.lab.name} — ${lab.test_item.branch.location.name} — ${lab.test_item.purchasable_order_item.sell_price}`,
      label:
        lab.order_type === 'diagnostic'
          ? `${lab.branch.lab.name} — ${lab.branch.location.name} — ${lab.purchasable_order_item.sell_price}`
          : `${lab.test_item.branch.lab.name} — ${lab.test_item.branch.location.name} — ${lab.test_item.purchasable_order_item.sell_price}`,
    };
  });

  const handleChange = (e) => {
    // console.log(e);
    setLabDetails(e);
  };

  return <Select options={labs} onChange={handleChange} />;
};

export default SelectLab;
