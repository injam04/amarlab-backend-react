import Select from 'react-select';

const SelectLab = ({ allLabs, setLabDetails }) => {
  const labs = allLabs.map((lab) => {
    // console.log({
    //   ...lab,
    //   value: lab.branch.lab.name,
    //   label: lab.branch.lab.name,
    // });
    return {
      ...lab,
      value: lab.branch.lab.name,
      label: `${lab.branch.lab.name} — ${lab.branch.location.name} — ${lab.purchasable_order_item.sell_price}`,
    };
  });

  const handleChange = (e) => {
    console.log(e);
    setLabDetails(e);
  };

  return <Select options={labs} onChange={handleChange} />;
};

export default SelectLab;
