import React from 'react';
import Item from './Item';

const ListItemArr = ({ arrdoctors }) => {
  return (
    <>
      {arrdoctors?.map((item) => (
        <Item dataItem={item} />
      ))}
    </>
  );
};

export default ListItemArr;
