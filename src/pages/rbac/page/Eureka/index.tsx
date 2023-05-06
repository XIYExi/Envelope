import React, { useEffect, useRef } from 'react';

const Eureka = (props: any) => {
  const ifm = useRef(null);

  return (
    <>
      <iframe
        ref={ifm}
        src="http://localhost:8761"
        frameBorder="no"
        width={'100%'}
        height={'99%'}
        allowTransparency={false}
      />
    </>
  );
};

export default Eureka;
