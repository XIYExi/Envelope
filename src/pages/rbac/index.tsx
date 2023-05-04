import React, { useEffect, useState } from 'react';

import { IRouteComponentProps } from 'umi';

function Rbac({ children }: IRouteComponentProps) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapse) => {
    setCollapsed(collapse);
  };

  useEffect(() => {
    console.log(children);
  }, []);

  return (
    <React.Fragment>
      <div>{children}</div>
    </React.Fragment>
  );
}

export default Rbac;
