import React, { FC, memo, useState } from 'react';
import { PlusOutlined, CheckCircleFilled } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import styled from 'styled-components';
import { UploadFile, UploadChangeParam, RcFile, UploadFileStatus } from 'antd/lib/upload/interface';
import { getBase64, isDev, uuid } from '../../../core-utils/tool';
import { message, Modal, Result, Tabs, Upload } from 'antd';

const { TabPane } = Tabs;

interface wallCateProps{
  photo: string[];
  bg: string[];
  chahua: string[];
}

interface PicturesWallType {
  fileList?: UploadFile<any>[];
  action?: string;
  headers?: any;
  withCredentials?: boolean;
  maxLen?: number;
  onChange?: (v: any) => void;
  cropRate?: number | boolean;
  isCrop?: boolean;
}


// 维护图片分类映射
const wallCateName = {
  photo: '照片',
  bg: '背景',
  chahua: '插画',
};

const defaultImgBed:wallCateProps = {
  photo:[],
  bg:[],
  chahua:[],
};


const UploadWrapper = styled(Upload)`
  display: inline-block;
  text-align: left;
`

const WallButton = styled.div`
  position: absolute;
  left: 140px;
  bottom: 56px;
  display: inline-block;
  color: #2f54eb;
  cursor: pointer;
  border-bottom: 1px solid #2f54eb;
`

const ImgBoxItemIconButton = styled.span`
  position: absolute;
  visibility: hidden;
  top: 6px;
  right: 10px;
  font-size: 18px;
  color: rgb(8, 156, 8);
`

const ImageBoxItem = styled.div<{selected: boolean}>`
  position: relative;
  margin-right: 16px;
  margin-bottom: 16px;
  width: 320px;
  max-height: 220px;
  overflow: hidden;
  cursor: pointer;

  & img{
    width: 100%;
  }

  &:hover{
    ${ImgBoxItemIconButton} {
      visibility: ${props => props.selected ? 'visible' : 'hidden'};
    }
  }
`

const ImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 520px;
  overflow: auto;
`

const PicturesWall:FC<PicturesWallType> = (props:PicturesWallType) => {

  const {
    action = isDev ? 'http://localhost:3000/api/v0/files/upload/free' : '你的服务器地址',
    headers,
    withCredentials = true,
    maxLen = 1,
    cropRate = 375 / 158,
    isCrop,
  } = props;

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>('');
  const [wallModalVisible, setWallModalVisible] = useState<boolean>(false);
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [imgBed, setImgBed] = useState<wallCateProps>(defaultImgBed);
  const [curSelectedImg, setCurSelectImg] = useState<string>('');
  const [fileLists, setFileLists] = useState<UploadFile<any>[]>(props.fileList || []);

  const handleCancel = () => {
    setPreviewVisible(false);
  }

  const handleModalCancel = () => {
    setWallModalVisible(false);
  }

  const handlePreview = async (file: UploadFile<any>) => {
    if (!file.url && !file.preview)
      file.preview = await getBase64(file.originFileObj!);
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  }


  const handleImgSelected = (url:string) => {
    setCurSelectImg(url);
  }

  const handleWallShow = () => {
    setWallModalVisible(true);
  }

  const handleModalOk = () => {
    const _fileList = [
      {
        uid: uuid(8, 16),
        name: 'h5-electron图片库',
        status: 'done' as UploadFileStatus,
        url: curSelectedImg,
      },
    ];

    props.onChange && props.onChange(_fileList);
    /*const copy = [...fileLists];
    copy.push(_fileList[0] as UploadFile);*/

    setFileLists(_fileList);
    setWallModalVisible(false);
  }

  const handleChange = ({file, fileList}:UploadChangeParam<UploadFile<any>>) => {
    /*const copy = [...fileLists];
    fileList.map(item => copy.push(item));*/
    setFileLists(fileList);

    if (file.status === 'done'){
      const files = fileList.map(item => {
        const {uid, name, status} = item;
        const url = item.url || item.response.result.url;
        return { uid, name, status, url};
      });
      props.onChange && props.onChange(files);
    }
  }

  const handleBeforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('只能上传格式为jpeg/png/gif的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  const cates = Object.keys(imgBed);

  return(
    <React.Fragment>
      {
        isCrop ? (
          <ImgCrop
            modalTitle="裁剪图片"
            modalOk="确定"
            modalCancel="取消"
            rotate={true}
            aspect={cropRate as number}
            >
            <UploadWrapper
              fileList={fileLists}
              onPreview={handlePreview}
              onChange={handleChange}
              name="file"
              listType="picture-card"
              action={action}
              withCredentials={withCredentials}
              headers={{
                'x-requested-with': localStorage.getItem('user') || '',
                authorization: localStorage.getItem('token') || '',
                ...headers,
              }}
              beforeUpload={handleBeforeUpload}
            >
              {fileLists.length >= maxLen ? null : uploadButton}
            </UploadWrapper>
          </ImgCrop>
        ) : (
          <UploadWrapper
            fileList={fileLists}
            onPreview={handlePreview}
            onChange={handleChange}
            name="file"
            listType="picture-card"
            action={action}
            withCredentials={withCredentials}
            headers={{
              'x-requested-with': localStorage.getItem('user') || '',
              authorization: localStorage.getItem('token') || '',
              ...headers,
            }}
            beforeUpload={handleBeforeUpload}
          >
            {fileLists.length >= maxLen ? null : uploadButton}
          </UploadWrapper>
        )
      }
      <WallButton onClick={handleWallShow}>图片库</WallButton>


      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="预览图片" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Modal
        open={wallModalVisible}
        title="图片库"
        okText="确定"
        cancelText="取消"
        width={860}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
      >
        <Tabs defaultActiveKey={cates[0]} tabPosition="left" style={{ height: 520 }}>
          {cates.map((item, i) => {

            return (
              // @ts-ignore
              <TabPane tab={wallCateName[item]} key={item}>
                <ImageBox>
                  {(imgBed as any)[item] &&
                  (imgBed as any)[item].map((item: string, i: number) => {
                    return (
                      <ImageBoxItem
                        selected={curSelectedImg === item}
                        key={i}
                        onClick={() => handleImgSelected(item)}
                      >
                        <img src={item} alt="趣谈前端-h5-dooring" />
                        <ImgBoxItemIconButton >
                          <CheckCircleFilled />
                        </ImgBoxItemIconButton>
                      </ImageBoxItem>
                    );
                  })}
                </ImageBox>
              </TabPane>
            );
          })}
          <TabPane tab="更多" key="more">
            <Result status="500" title="Dooring温馨提示" subTitle="更多素材, 正在筹备中..." />
          </TabPane>
        </Tabs>
      </Modal>

    </React.Fragment>
  )
}

export default memo(PicturesWall);

