import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const PhonebookLoader = () => {
  return (
    <>
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="26"
        visible={true}
      />
    </>
  );
};

export default PhonebookLoader;
