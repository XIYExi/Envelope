import React, { FC, useState } from 'react';
import { IPaginationConfig } from '@/materials/absolute-semantic/control/Pagination/schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Image, Pagination, Icon } from 'semantic-ui-react';

/*begin to delete*/
interface IPaginationProps extends IPaginationConfig {
  isTpl: boolean;
  onPageChange?: any;
}
/*end to delete*/

const SPagination: FC<IPaginationProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    defaultActivePage,
    disabled,
    totalPages,
    firstItemIcon,
    lastItemIcon,
    prevItemIcon,
    nextItemIcon,
    ellipsisItemIcon,
  } = restProps;

  const [currentPage, setCurrentPage] = useState(defaultActivePage);

  const handleChange = (e: any, data: any) => {
    //console.log(e,data)
    const { activePage } = data;
    setCurrentPage(activePage);

    props.onPageChange && props.onPageChange(activePage);
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Pagination" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Pagination
            onPageChange={(e, data) => handleChange(e, data)}
            disabled={disabled}
            totalPages={totalPages}
            defaultActivePage={currentPage}
            ellipsisItem={{
              /*@ts-ignore*/
              content: <Icon name={ellipsisItemIcon} />,
              icon: true,
            }}
            firstItem={{
              /*@ts-ignore*/
              content: <Icon name={firstItemIcon} />,
              icon: true,
            }}
            lastItem={{
              /*@ts-ignore*/
              content: <Icon name={lastItemIcon} />,
              icon: true,
            }}
            prevItem={{
              /*@ts-ignore*/
              content: <Icon name={prevItemIcon} />,
              icon: true,
            }}
            nextItem={{
              /*@ts-ignore*/
              content: <Icon name={nextItemIcon} />,
              icon: true,
            }}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default SPagination;
