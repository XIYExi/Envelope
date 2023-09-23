import React, { FC, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Grid,
  Icon,
  Image,
  Search,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Typography } from 'antd';
import _ from 'lodash';

const CardHeaderFirst = styled(Card.Header)`
  margin-bottom: 16px !important;
`;

const CardHeaderSecond = styled(Card.Header)`
  margin-bottom: 8px !important;
`;

const ButtonIcon = styled(
  /*@ts-ignore*/
  Button,
)`
  border-radius: 1rem !important;
`;

const CardItem = styled(
  /*@ts-ignore*/
  Card,
)`
  width: 330px !important;
  margin: 10px !important;
`;

const SearchBar = styled(
  /*@ts-ignore*/
  Search,
)`
  margin-top: 15px !important;
  margin-bottom: 10px !important;
  & .ui.icon.input {
    width: 30rem !important;
  }
  & .results.transition.visible {
    width: 30rem !important;
  }
`;

const ButtonAction = styled(
  /*@ts-ignore*/
  Button,
)`
  width: 47% !important;
`;

const renderMsg = [
  {
    type: 'lowcode',
    color: 'teal',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: 'Ant Design 风格模板',
    description:
      '基于Antd框架的H5静态布局低代码框架，在antd的基础上封装30套组件，其风格简约干练，适合于管理系统构建',
    tags: ['Antd', 'H5', '静态布局'],
    msgs: [
      {
        name: 'edit',
        tags: 'React.js',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
  {
    type: 'lowcode',
    color: 'teal',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: 'Semantic UI 风格模板',
    description:
      '封装Semantic UI中26套精选组件，聚焦于社交以及交互组件，添加了更多用户交互的自定义组件，适用于制作社交App',
    tags: ['Semantic', 'H5', '静态布局', '社交'],
    msgs: [
      {
        name: 'edit',
        tags: 'React.js',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
  {
    type: 'lowcode',
    color: 'teal',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: 'Lowcode Engine',
    description:
      '使用阿里开源lowcode-engine为核心，编写解析插件以及物料，构建基于Fushion以及Next的低代码编辑器，适用于编辑PC网页以及栅格布局应用',
    tags: ['lowcode engine', '栅格布局'],
    msgs: [
      {
        name: 'edit',
        tags: 'React.js',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
  {
    type: 'lowcode',
    color: 'teal',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: '模板网页构建',
    description:
      '基于提供的模板网页，通过拓展以及自定义参数，轻松实现动效官网的构建',
    tags: ['template', '低代码', '动效'],
    msgs: [
      {
        name: 'edit',
        tags: 'React.js',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
  {
    type: 'lowcode',
    color: 'teal',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: 'AntV 可视化开发',
    description:
      '基于AntV，使用json schema自定义可视化图标，实现快速构建可视化应用',
    tags: ['AntV', '可视化', 'json'],
    msgs: [
      {
        name: 'edit',
        tags: 'React.js',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
  {
    type: 'ui',
    color: 'yellow',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: '封装组件展示文档',
    description: '对二次封装组件进行展示，让用户可以快速预览组件效果以及样式',
    tags: ['Antd', 'Semantic', 'dumi'],
    msgs: [
      {
        name: 'edit',
        tags: 'dumi',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
  {
    type: 'ui',
    color: 'yellow',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: 'Love Letter UI',
    description:
      'Ink Engine自带的默认样式，开箱即用的樱花风格React元件库，基于React Hook和TypeScript构造。',
    tags: ['UI框架', 'TypeScript', 'React Hook'],
    msgs: [
      {
        name: 'edit',
        tags: 'dumi',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
  {
    type: 'doc',
    color: 'pink',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: '使用手册',
    description:
      'Ink Engine自带的默认样式，开箱即用的樱花风格React元件库，基于React Hook和TypeScript构造。',
    tags: ['UI框架', 'TypeScript', 'React Hook'],
    msgs: [
      {
        name: 'edit',
        tags: 'dumi',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
  {
    type: 'doc',
    color: 'pink',
    image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
    title: '设计手册',
    description:
      'Ink Engine是开源项目，将提供设计手册对项目中部分重点进行讲解，并以dumi文档的形式展示',
    tags: ['design', 'doc'],
    msgs: [
      {
        name: 'edit',
        tags: 'dumi',
      },
      {
        name: 'user',
        tags: 'Anyone',
      },
    ],
    actionUrl: '',
    designUrl: '',
  },
];

const initialState = {
  loading: false,
  results: [],
  value: '',
};

function homeReducer(state: any, action: any) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

const HomeIndex: FC<any> = (props) => {
  const [maps, setMaps] = useState(renderMsg);
  const [state, dispatch] = React.useReducer(homeReducer, initialState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });
    /*@ts-ignore*/
    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        setMaps(renderMsg);
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result: any) => re.test(result.title);

      /*console.log(_.filter(renderMsg, isMatch))*/
      setMaps(_.filter(renderMsg, isMatch));

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(renderMsg, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const renderButtonIcon = (tags: string[]) => {
    return (
      <>
        {tags.map((v) => {
          return (
            /*@ts-ignore*/
            <ButtonIcon size="small" compact>
              {v}
            </ButtonIcon>
          );
        })}
      </>
    );
  };

  const renderIconMsg = (msgs: { name: string; tags: string }[]) => {
    return (
      <>
        {msgs.map((v) => {
          return (
            <>
              {/*@ts-ignore*/}
              <Icon name={v.name}></Icon>
              <span style={{ marginRight: '10px', color: 'rgba(0,0,0,.4)' }}>
                {v.tags}
              </span>
            </>
          );
        })}
      </>
    );
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          marginTop: '25px',
        }}
      >
        <Typography.Title level={3}>欢迎使用 Ink Engine</Typography.Title>
        <Typography.Paragraph style={{ color: 'gray' }}>
          简单易上手的低代码整合平台
        </Typography.Paragraph>
        <Divider />
      </div>

      <Grid>
        <Grid.Column width={10} />
        <Grid.Column width={6}>
          <SearchBar
            loading={loading}
            placeholder="Search..."
            onResultSelect={(e: any, data: any) => {
              dispatch({
                type: 'UPDATE_SELECTION',
                selection: data.result.title,
              });
              /*@ts-ignore*/
              setMaps([data.result]);
            }}
            onSearchChange={handleSearchChange}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>

      <Segment basic>
        <Card.Group>
          {maps.map((v, _) => {
            const {
              tags,
              msgs,
              image,
              title,
              description,
              actionUrl,
              designUrl,
              type,
              color,
            } = v;

            return (
              <CardItem raised key={_} color={color}>
                <Card.Content>
                  <CardHeaderFirst>
                    <Image
                      size="massive"
                      avatar={true}
                      src={image}
                      alt={`HomeIndex页面CardItem${_}-缺失图片`}
                    />
                  </CardHeaderFirst>
                  <CardHeaderSecond>{title}</CardHeaderSecond>
                  <Card.Meta>{description}</Card.Meta>
                  <div style={{ marginBottom: '12px' }} />
                  <Card.Description>
                    {renderButtonIcon(tags)}
                    <div style={{ marginTop: '10px' }}>
                      {renderIconMsg(msgs)}
                    </div>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra={true}>
                  <ButtonAction
                    color="teal"
                    icon
                    labelPosition="right"
                    floated={'left'}
                  >
                    立刻使用
                    {/*@ts-ignore*/}
                    <Icon name="right arrow" />
                  </ButtonAction>
                  <ButtonAction floated={'right'}>设计理念</ButtonAction>
                </Card.Content>
              </CardItem>
            );
          })}
        </Card.Group>
      </Segment>
    </React.Fragment>
  );
};

export default HomeIndex;
