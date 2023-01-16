import React, { FC, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../../../assets/list.png';
import {IListConfig} from '@/materials/absolute-antd/base/List/schema';
import { Avatar, Divider, Image, List } from 'antd';
import { PaginationConfig } from 'antd/es/pagination';


const SourceItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`



const ListWrapper = styled.div<{
  props: IListConfig
}>`
  margin: 10px auto;
  width: 100%;
  overflow: hidden;
  position: absolute;
  width: ${props=>props.props.baseWidth};
  height: ${props=>props.props.baseHeight};
  border-radius: ${props=>props.props.baseRadius};
  transform:
    translate(${props=>props.props.baseLeft}px, ${props=>props.props.baseTop}px)
    scale(${props=>props.props.baseScale / 100})
    rotate(${props=>props.props.baseRotate}deg);
`


const AList:FC<IListConfig> = (props) => {

  const {
    isTpl,
    bordered,
    header='',
    footer='',
    sourceData,
    itemLayout,
    loading,
    size,
    split,
    pagination,
    grid
  } = props;

  const [gridCol, setGridCol] = useState<any>({})

  useEffect(()=>{
    let copy: any = {};
    grid.map((item, i) => {
      if(item.type === 'Number'){
        if(item.id === 'column')
          copy['column'] = Number(item.placeholder);
        if(item.id === 'gutter')
          copy['gutter'] = Number(item.placeholder);
        if(item.id === 'xs')
          copy['xs'] = Number(item.placeholder);
        if(item.id === 'sm')
          copy['sm'] = Number(item.placeholder);
        if(item.id === 'md')
          copy['md'] = Number(item.placeholder);
        if(item.id === 'lg')
          copy['lg'] = Number(item.placeholder);
        if(item.id === 'xl')
          copy['xl'] = Number(item.placeholder);
        if(item.id === 'xxl')
          copy['xxl'] = Number(item.placeholder);
      }
    })
    console.log(copy)
    setGridCol(copy);
  },[grid])


  return(
    <React.Fragment>
      {
        isTpl &&
          <div>
            <Image preview={false} src={logo} alt=''/>
          </div>
      }
      {
        !isTpl &&
          <ListWrapper props={props}>
            <List
              bordered={bordered}
              header={header.length>0?header:<></>}
              footer={footer.length>0?footer:<></>}
              itemLayout={itemLayout}
              loading={loading}
              size={size}
              split={split}
              pagination={pagination as false | PaginationConfig | undefined}
              grid={gridCol}
            >
              {
                sourceData.map((item, i) => {
                  return(
                    <List.Item key={i}>
                        {
                          item.imgUrl.length > 0 ? (
                            <React.Fragment>
                              <List.Item.Meta
                                avatar={
                                  <Avatar src={item.imgUrl[0].url} />
                                }
                                title={<a href={item.link}>{item.title}</a>}
                                description={item.desc}
                                />
                              {item.content}
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <List.Item.Meta
                                title={<a href={item.link}>{item.title}</a>}
                                description={item.desc}
                              />
                              {item.content}
                            </React.Fragment>
                          )
                        }
                      { split && <Divider /> }
                    </List.Item>
                  )
                })
              }
            </List>
          </ListWrapper>
      }

    </React.Fragment>
  )

}

export default memo(AList);
