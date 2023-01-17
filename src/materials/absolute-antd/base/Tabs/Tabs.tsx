import { ITabsConfig } from '@/materials/absolute-antd/base/Tabs/schema';
import React, { FC, memo, useRef } from 'react';
import { Image, Tabs } from 'antd';
import logo from '../../../../assets/absolute/tabs.png';
import styled from 'styled-components';


interface ITabsProConfig extends ITabsConfig {
  isTpl: boolean;
}

const TabsWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  position: relative;
`

const PanelTitle = styled.div`
  line-height: 2.4;
`

const PanelLink = styled.a`
  display: inline-block;
  width: 80%;
  img{
    border-radius: 6px;
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
`

const PanelItem = styled.div`
  padding: 20px 20px 0;
  width: 50%;
  text-align: center;
  justify-content: center;
`

const TabsPanelContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`


const ATabs:FC<ITabsProConfig> = (props) => {


  const {
    tabs = ['分类一', '分类二'],
    sourceData,
    isTpl,

    ...restProps
  } = props;

  return(
    <React.Fragment>
      {
        isTpl &&
          <div>
            <Image src={logo} alt={''}/>
          </div>
      }
      {
        !isTpl &&
          <TabsWrapper>
            <Tabs {...restProps}>
              {
                tabs.map((item, i) => {
                  return (
                    <Tabs.TabPane tab={item} key={i}>
                      <TabsPanelContent>
                        {
                          sourceData.filter(item => item.type === i)
                            .map((_item, _i)=>{
                              return (
                                <React.Fragment key={_i}>
                                  {
                                    _item.imgUrl.length >= 1 ?
                                      (
                                        <PanelItem key={_i}>
                                          <PanelLink href={_item.link} title={_item.desc}>
                                            <Image
                                              preview={false}
                                              src={
                                                _item.imgUrl[0]
                                                  ? _item.imgUrl[0].url
                                                  : 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png'
                                              }
                                              alt={_item.title}
                                            />
                                            <PanelTitle>{_item.title}</PanelTitle>
                                          </PanelLink>
                                        </PanelItem>
                                      )
                                      : (
                                        <div
                                          key={_i}
                                          dangerouslySetInnerHTML={{
                                            __html: _item.html
                                              ? _item.html
                                              : '<div></div>'}}
                                        />
                                      )
                                  }
                                </React.Fragment>
                              )
                            })
                        }
                      </TabsPanelContent>
                    </Tabs.TabPane>
                  )
                })
              }
            </Tabs>
          </TabsWrapper>
      }
    </React.Fragment>
  )
}


export default memo(ATabs);



