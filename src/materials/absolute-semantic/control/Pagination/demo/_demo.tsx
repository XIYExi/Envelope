import React from 'react';
import SPagination from '@/materials/absolute-semantic/control/Pagination';

const attr = {
  defaultActivePage: '1',
  disabled: false,
  totalPages: '20',
  firstItemIcon: 'angle double left',
  lastItemIcon: 'angle double right',
  prevItemIcon: 'angle left',
  nextItemIcon: 'angle right',
  ellipsisItemIcon: 'ellipsis horizontal',
};

export default () => <SPagination isTpl={false} {...attr} />;
