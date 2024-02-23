import React from 'react';
import Item from './Item';

const ListItemArr = ({ arrDoctors }) => {
  return (
    <>
      {arrDoctors?.map((item) => (
        <Item dataItem={item} />
      ))}
    </>
  );
};

export default ListItemArr;
