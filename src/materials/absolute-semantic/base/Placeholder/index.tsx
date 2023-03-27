import React, { FC, useEffect, useState } from 'react';
import { IPlaceholderConfig } from '@/materials/absolute-semantic/base/Placeholder/schema';
import logo from '../../../../assets/absolute/empty.png';
import { Image, Placeholder } from 'semantic-ui-react';

/*begin to delete*/
interface IPlaceholderProps extends IPlaceholderConfig {
  isTpl: boolean;
}
/*end to delete*/

const SPlaceholder: FC<IPlaceholderProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { renderHeader, renderParagraph, fluid, inverted } = restProps;

  /*初始化的时候填充一个空标签，这样就可以避免给renderList写类型*/
  const [renderHeaderList, setRenderHeaderList] = useState([<></>]);
  const [renderParagraphList, setRenderParagraphList] = useState([<></>]);

  useEffect(() => {
    const tempListHeader = renderHeader.split(',');
    const nodeHeaderList = [];

    /* 必须使用for循环的写法，使用map或者forEach需要给子项赋类型，转换成js后会报错！*/
    for (let i = 0; i < tempListHeader.length; ++i) {
      switch (tempListHeader[i]) {
        case 'Header':
          nodeHeaderList.push(<Placeholder.Header />);
          break;
        case 'Image':
          nodeHeaderList.push(<Placeholder.Image />);
          break;
        case 'Line':
          nodeHeaderList.push(<Placeholder.Line />);
          break;
        case 'Paragraph':
          nodeHeaderList.push(<Placeholder.Paragraph />);
          break;
        default:
          break;
      }
    }

    setRenderHeaderList(nodeHeaderList);
  }, [renderHeader]);

  useEffect(() => {
    const tempListParagraph = renderParagraph.split(',');
    const nodeParagraphList = [];

    /* 必须使用for循环的写法，使用map或者forEach需要给子项赋类型，转换成js后会报错！*/
    for (let i = 0; i < tempListParagraph.length; ++i) {
      switch (tempListParagraph[i]) {
        case 'Header':
          nodeParagraphList.push(<Placeholder.Header />);
          break;
        case 'Image':
          nodeParagraphList.push(<Placeholder.Image />);
          break;
        case 'Line':
          nodeParagraphList.push(<Placeholder.Line />);
          break;
        case 'Paragraph':
          nodeParagraphList.push(<Placeholder.Paragraph />);
          break;
        default:
          break;
      }
    }

    setRenderParagraphList(nodeParagraphList);
  }, [renderParagraph]);

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Placeholder" />}
      {!isTpl && (
        <div>
          <Placeholder fluid={fluid} inverted={inverted}>
            <Placeholder.Header>{renderHeaderList}</Placeholder.Header>
            <Placeholder.Paragraph>{renderParagraphList}</Placeholder.Paragraph>
          </Placeholder>
        </div>
      )}
    </React.Fragment>
  );
};

export default SPlaceholder;
