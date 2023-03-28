import React, { FC, useState } from 'react';
import { IRatingConfig } from '@/materials/absolute-semantic/social/Rate/schema';
import logo from '../../../../assets/absolute/Rate.svg';
import { Image, Rating } from 'semantic-ui-react';

/*begin to delete*/
interface IRatingProps extends IRatingConfig {
  isTpl: boolean;
  onRate?: any;
}
/*end to delete*/

const SRating: FC<IRatingProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { defaultRating, disabled, maxRating, size, icon } = restProps;

  const [rate, setRate] = useState(defaultRating);

  const handleRate = (e: any, { rating, maxRating }: any) => {
    //console.log(e, rating, maxRating)
    setRate(rating);
    props.onRate &&
      props.onRate({
        rating: rating,
        maxRating: maxRating,
      });
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Rating" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Rating
            rating={rate}
            maxRating={maxRating}
            size={size}
            icon={icon}
            disabled={disabled}
            onRate={(e, { rating, maxRating }) =>
              handleRate(e, { rating, maxRating })
            }
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default SRating;
