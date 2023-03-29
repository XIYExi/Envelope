import React, { FC, useState } from 'react';
import { IDropdownConfig } from '@/materials/absolute-semantic/control/Dropdown/schema';
import logo from '../../../../assets/absolute/Select.svg';
import { Image, Dropdown } from 'semantic-ui-react';

/*begin to delete*/
interface IDropdownProps extends IDropdownConfig {
  isTpl: boolean;
  onChange?: any;
}
/*end to delete*/

const SDropdown: FC<IDropdownProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    header,
    text,
    basic,
    compact,
    deburr,
    defaultOpen,
    direction,
    disabled,
    error,
    floating,
    fluid,
    inline,
    item,
    icon,
    labeled,
    lazyLoad,
    selection,
    dataSource,
  } = restProps;

  const handleRenderTarget = (e: any) => {
    const { key, text, value, flag, icon, image, description } = e;

    if (flag.length === 0 && icon.length === 0 && image.length === 0)
      return (
        /*@ts-ignore*/
        <Dropdown.Item
          key={key}
          text={text}
          value={value}
          description={description}
          onClick={(e, data) => handleClick(e, data)}
        />
      );

    if (flag.length !== 0 && image.length === 0) {
      /*@ts-ignore*/
      return (
        <Dropdown.Item
          key={key}
          text={text}
          value={value}
          flag={flag}
          description={description}
          onClick={(e, data) => handleClick(e, data)}
        />
      );
    }

    if (flag.length === 0 && image.length !== 0) {
      return (
        /*@ts-ignore*/
        <Dropdown.Item
          key={key}
          text={text}
          value={value}
          image={image}
          description={description}
          onClick={(e, data) => handleClick(e, data)}
        />
      );
    } else {
      return (
        /*@ts-ignore*/
        <Dropdown.Item
          key={key}
          text={text}
          value={value}
          icon={icon}
          description={description}
          onClick={(e, data) => handleClick(e, data)}
        />
      );
    }
  };

  const [value, setValue] = useState();
  const handleClick = (e: any, data: any) => {
    //console.log(e, data);
    const { value } = data;
    setValue(value);

    props.onChange && props.onChange(value);
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Dropdown" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Dropdown
            value={value}
            placeholder={value ? value : text}
            basic={basic}
            selection={selection}
            compact={compact}
            deburr={deburr}
            defaultOpen={defaultOpen}
            direction={direction}
            disabled={disabled}
            error={error}
            floating={floating}
            fluid={fluid}
            inline={inline}
            item={item}
            labeled={labeled}
            lazyLoad={lazyLoad}
            multiple={false}
          >
            <Dropdown.Menu>
              {header.length !== 0 && (
                <React.Fragment>
                  {/*@ts-ignore*/}
                  <Dropdown.Header icon={icon} content={header} />
                  {/*@ts-ignore*/}
                  <Dropdown.Divider />
                </React.Fragment>
              )}
              {dataSource.map((e: any, index: number) => handleRenderTarget(e))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </React.Fragment>
  );
};

export default SDropdown;
