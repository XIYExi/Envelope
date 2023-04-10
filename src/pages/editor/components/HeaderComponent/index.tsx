import React, { useRef, memo, useMemo, useState, useEffect } from 'react';
import { Button, Input, Modal, Upload, Tooltip, Badge, Image } from 'antd';
import type { InputRef } from 'antd';
import styles from './index.less';
import {
  ArrowLeftOutlined,
  MobileOutlined,
  DownloadOutlined,
  CopyOutlined,
  DeleteOutlined,
  UndoOutlined,
  RedoOutlined,
  FileAddOutlined,
  CodeOutlined,
  SketchOutlined,
  UploadOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
/*@ts-ignore*/
import { history } from 'umi';
import MyPopover from 'yh-react-popover';
import { saveAs } from 'file-saver';
import { uuid } from '@/engine-lib-absolute/core-utils/tool';
import logo from '@/assets/absolute/Card.svg';

const { confirm } = Modal;
// TODO 测试用
const isDev = true;

interface HeaderComponentProps {
  pointData: any;
  location: any;
  clearData: any;
  undohandler: any;
  redohandler: any;
  importTpl: any;
}

const HeaderComponent = memo((props: HeaderComponentProps) => {
  const {
    pointData,
    location,
    clearData,
    undohandler,
    redohandler,
    importTpl,
  } = props;

  const [faceUrl, setFaceUrl] = useState('');
  const iptRef = useRef<InputRef>(null);
  const [showModalIframe, setShowModalIframe] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);

  const savePreview = () => {
    const { tid } = props.location.query || '';
    //req.post('/visible/preview', { tid, tpl: pointData });
    console.log('savePreview', { tid, tpl: pointData });
  };

  const toPreview = () => {
    localStorage.setItem('pointData', JSON.stringify(pointData));
    savePreview();
    setTimeout(() => {
      window.open(
        isDev
          ? `/preview?tid=${props.location.query.tid}`
          : `/preview?tid=${props.location.query.tid}`,
      );
    }, 600);
  };

  const toCodeDownLoading = () => {
    console.log(pointData);

    //window.open('/ide');
  };

  const toVipLogin = () => {
    window.open('/login');
  };

  const generateFace = (type: number) => {
    // 自定义生成封面逻辑, 可以采用html2canvas 或 dom-to-image
  };

  const handleSaveTpl = () => {
    confirm({
      title: '确定要保存吗？',
      content: (
        <div className={styles.saveForm}>
          <div className={styles.formIpt}>
            <span>模版名称：</span>
            <Input ref={iptRef} />
          </div>
          <div className={styles.formIpt}>
            <span>封面设置：</span>
            <Button
              type="primary"
              size="small"
              style={{ marginRight: '20px' }}
              onClick={() => generateFace(1)}
            >
              一键生成封面
            </Button>
            <Button size="small" onClick={() => generateFace(0)}>
              使用默认封面
            </Button>
          </div>
          <div className={styles.formIpt}>
            <span>访问链接：</span>
            <Input disabled value="暂未开放，保存之后可以在模版库中访问" />
          </div>
        </div>
      ),
      okText: '保存',
      cancelText: '取消',
      onOk() {
        // @ts-ignore
        let name = iptRef.current.value;
        // TODO 存数据库
        console.log('生成封面', { name, tpl: pointData });
        /*req.post('/visible/tpl/save', { name, tpl: pointData }).then(res => {
          console.log(res);
        });*/
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 下载数据
  const downLoadJson = () => {
    const jsonStr = JSON.stringify(pointData);
    const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'template.json');
  };

  const deleteAll = () => {
    Modal.confirm({
      title: '确认清空画布?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        clearData();
      },
    });
  };

  const toHelp = () => {
    window.open('/help');
  };

  const toBack = () => {
    history.push('/inner');
  };

  const newPage = () => {
    clearData();
    history.push(`/inner/editor?tid=${uuid(8, 16)}`);
  };

  const handleSaveCode = () => {
    Modal.confirm({
      title: '确定要下载吗? 每人每天只能下载2次哦~',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 未来的下载代码逻辑
      },
    });
  };

  useEffect(() => {
    // 定义截图子页面句柄函数
    // @ts-ignore
    window.getFaceUrl = (url: string) => {
      setFaceUrl(url);
      setShowModalIframe(false);
    };
  }, []);

  const uploadprops = useMemo(
    () => ({
      name: 'file',
      showUploadList: false,
      beforeUpload(file: File) {
        // 解析并提取excel数据
        let reader = new FileReader();
        reader.onload = function (e: Event) {
          let data = (e as any).target.result;
          importTpl && importTpl(JSON.parse(data));
        };
        reader.readAsText(file);
      },
    }),
    [],
  );

  const generatePoster = () => {
    localStorage.setItem('pointData', JSON.stringify(pointData));
    setShowModalIframe(true);
    setTimeout(() => {
      setShowFaceModal(true);
    }, 3600);
  };

  const handleReloadPage = () => {
    // @ts-ignore
    document.getElementById('previewPage')?.contentWindow.location.reload();
  };

  const useTemplate = () => {
    Modal.info({
      title: '该功能正在升级，可以关注下方公众号实时查看动态',
      content: (
        <div style={{ textAlign: 'center' }}>
          <Image
            preview={false}
            src={logo}
            alt="趣谈前端"
            style={{ width: '180px' }}
          />
        </div>
      ),
      okText: '客官知道啦',
    });
  };

  const content = () => {
    const { tid } = location.query || '';
    return <div>Test</div>;
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.backBtn} onClick={toBack}>
          <ArrowLeftOutlined />
        </div>
        <div className={styles.logo}></div>
      </div>
      <div className={styles.controlArea}>
        <Button
          type="primary"
          style={{ marginRight: '9px' }}
          onClick={useTemplate}
        >
          模版库
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          onClick={handleSaveTpl}
          disabled={!pointData.length}
        >
          保存模版
        </Button>
        <Upload {...uploadprops}>
          <Button type="link" style={{ marginRight: '8px' }}>
            <UploadOutlined />
          </Button>
        </Upload>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          onClick={handleSaveCode}
          disabled={!pointData.length}
        >
          <DownloadOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="下载json文件"
          onClick={downLoadJson}
          disabled={!pointData.length}
        >
          <CopyOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="新建页面"
          onClick={newPage}
          disabled={!pointData.length}
        >
          <FileAddOutlined />
        </Button>
        <MyPopover content={content()} directions="BOTTOM">
          <Button
            type="link"
            style={{ marginRight: '9px' }}
            onClick={savePreview}
            disabled={!pointData.length}
          >
            <MobileOutlined />
          </Button>
        </MyPopover>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="清空"
          onClick={deleteAll}
          disabled={!pointData.length}
        >
          <DeleteOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="撤销"
          onClick={undohandler}
          disabled={!pointData.length}
        >
          <UndoOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="重做"
          onClick={redohandler}
        >
          <RedoOutlined />
        </Button>
        <Tooltip placement="bottom" title="一键生成海报分享图">
          <Badge dot offset={[-18, 10]}>
            <Button
              type="link"
              style={{ marginRight: '6px' }}
              onClick={generatePoster}
              disabled={!pointData.length}
            >
              <InstagramOutlined />
            </Button>
          </Badge>
        </Tooltip>
        <Button type="link" onClick={toPreview} disabled={!pointData.length}>
          预览
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          onClick={toHelp}
          disabled={!pointData.length}
          title="使用帮助"
        >
          帮助
        </Button>
      </div>
      <div className={styles.btnArea}>
        <Button
          type="primary"
          onClick={toCodeDownLoading}
          style={{ marginRight: '12px' }}
        >
          <CodeOutlined />
          代码导出
        </Button>
        <Button
          type="primary"
          onClick={toVipLogin}
          style={{ marginRight: '12px' }}
        >
          <SketchOutlined />
          会员登录
        </Button>
      </div>
      <Modal
        title="生成封面中...(长时间未反应请点右侧按钮重试)"
        visible={showModalIframe}
        footer={null}
        width={414}
        closeIcon={<RedoOutlined />}
        destroyOnClose={true}
        onCancel={handleReloadPage}
        maskClosable={false}
      >
        <iframe
          id="previewPage"
          src={`/preview?tid=${props.location.query.tid}&gf=1`}
          style={{ width: '100%', border: 'none', height: '600px' }}
        ></iframe>
      </Modal>
      <Modal
        title="封面图(右键复制图片)"
        visible={showFaceModal}
        footer={null}
        width={414}
        destroyOnClose={true}
        onCancel={() => setShowFaceModal(false)}
      >
        <Image preview={false} src={faceUrl} style={{ width: '100%' }} />
      </Modal>
    </div>
  );
});

export default HeaderComponent;
