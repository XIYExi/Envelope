import React, { FC, useState } from 'react';
import { IAccordionConfig } from '@/materials/absolute-semantic/social/Accordion/schema';
import logo from '../../../../assets/absolute/Collapse.svg';
import { Image, Accordion, Icon } from 'semantic-ui-react';

/*begin to delete*/
interface IAccordionProps extends IAccordionConfig {
  isTpl: boolean;
}
/*end to delete*/

const SAccordion: FC<IAccordionProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { exclusive, fluid, styled, dataSource } = restProps;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Accordion" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Accordion fluid={fluid} styled={styled} exclusive={exclusive}>
            {dataSource.map((item: any, index: number) => {
              const { title, content } = item;
              return (
                <React.Fragment>
                  {/*@ts-ignore*/}
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={(e, index) => handleClick(e, index)}
                  >
                    {/*@ts-ignore*/}
                    <Icon name="dropdown" />
                    {title}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    {content}
                  </Accordion.Content>
                </React.Fragment>
              );
            })}
          </Accordion>
        </div>
      )}
    </React.Fragment>
  );
};

export default SAccordion;
