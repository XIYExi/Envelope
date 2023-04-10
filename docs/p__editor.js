(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1997],
  {
    88980: function (e) {
      e.exports = { calibration: 'calibration___11U1Q' };
    },
    89069: function (e) {
      e.exports = {
        dataList: 'dataList___3gH6d',
        listItem: 'listItem___2yKY1',
        actionBar: 'actionBar___UCFGs',
        tit: 'tit___1QGc7',
        desc: 'desc___1RZJP',
        action: 'action___1YdDD',
      };
    },
    16517: function (e) {
      e.exports = {
        layout: 'layout___2VLMn',
        editorWrap: 'editorWrap___18EfT',
        container: 'container___298Wh',
        list: 'list___3SheH',
        ctitle: 'ctitle___bSo5_',
        collapsed: 'collapsed___1VnT7',
        searchBar: 'searchBar___2ZnhB',
        listWrap: 'listWrap___380SH',
        module: 'module___P48bI',
        tickMark: 'tickMark___1CzWF',
        tickMarkTop: 'tickMarkTop___38jCG',
        tickMarkLeft: 'tickMarkLeft___3Jg37',
        canvasBox: 'canvasBox___-7B5I',
        canvas: 'canvas___20ZAu',
        dragItem: 'dragItem___37hrx',
        selected: 'selected___2225v',
        tooltip: 'tooltip___1ZZFx',
        canvasBox2: 'canvasBox2___pHEEu',
        canvas2: 'canvas2___Tw18F',
        resetBall: 'resetBall___tcMVZ',
        controllBall: 'controllBall___3W9n-',
        attrSetting: 'attrSetting___29hZs',
        tit: 'tit___3J_E9',
        posWrap: 'posWrap___xwLjd',
        posItem: 'posItem___CczL_',
        posTit: 'posTit___6Kvz6',
        pos: 'pos___38P2d',
        graphWrap: 'graphWrap___1m3Wf',
        graphTable: 'graphTable___13qKW',
        iptControl: 'iptControl___3MGNn',
        iptLabel: 'iptLabel___3N04x',
        cpSelector: 'cpSelector___2cCNB',
        colorSelector: 'colorSelector___2gAOp',
        rightcolla: 'rightcolla___38mwB',
        saveForm: 'saveForm___14D9q',
        formIpt: 'formIpt___3yKGu',
      };
    },
    25542: function (e) {
      e.exports = {
        sliderWrap: 'sliderWrap___3OjPX',
        slider: 'slider___3kpQG',
        showTip: 'showTip___2PVoc',
        sliderBtn: 'sliderBtn___5lJW-',
        backSize: 'backSize___3n558',
        fastMenu: 'fastMenu___3mncI',
        boardTit: 'boardTit___1pwOa',
        keyRow: 'keyRow___QLPPc',
        key: 'key___13H3a',
        text: 'text___2x__S',
      };
    },
    25046: function (e) {
      e.exports = {
        header: 'header___1zIBB',
        logoArea: 'logoArea___Q8qV6',
        backBtn: 'backBtn___3tJYE',
        logo: 'logo___13Qfe',
        controlArea: 'controlArea___f25En',
        btnArea: 'btnArea___1RMM5',
        saveForm: 'saveForm___3Zewr',
        formIpt: 'formIpt___3Nf1v',
      };
    },
    6350: function (e, t, n) {
      'use strict';
      n(43358);
      var a,
        o,
        r,
        l,
        i = n(9e3),
        s = (n(14965), n(11448)),
        c = n(57337),
        d = (n(63185), n(9676)),
        m = (n(77883), n(85986)),
        p = (n(47673), n(4107)),
        u = (n(54421), n(38272)),
        g = (n(88983), n(55742)),
        b = n(20310),
        y = n(12924),
        f = n.n(y),
        h = n(12788),
        x = n(41275),
        k = (0, h.ZP)(g.ZP)(a || (a = (0, b.Z)(['\n  margin-top: 10px;\n']))),
        v = h.ZP.div(o || (o = (0, b.Z)(['\n  padding: 19px 14px;\n']))),
        C = h.ZP.div(r || (r = (0, b.Z)(['\n  margin-bottom: 10px;\n']))),
        S = (0, h.ZP)(u.ZP.Item)(
          l || (l = (0, b.Z)(['\n  color: ', ';\n  font-size: ', ';\n'])),
          (e) => e.color,
          (e) => e.fontSize,
        ),
        T = {
          Text: (e) => {
            var t = e.label,
              n = e.placeholder,
              a = e.onChange;
            return f().createElement(
              f().Fragment,
              null,
              f().createElement(
                u.ZP.Item,
                { title: t },
                f().createElement(p.Z, {
                  allowClear: !0,
                  type: 'text',
                  placeholder: n,
                  onChange: a,
                }),
              ),
            );
          },
          Textarea: (e) => {
            var t = e.label,
              n = e.placeholder,
              a = e.onChange;
            return f().createElement(
              f().Fragment,
              null,
              f().createElement(
                u.ZP.Item,
                { title: t },
                f().createElement(p.Z.TextArea, {
                  placeholder: n,
                  onChange: a,
                  autoSize: !0,
                  showCount: !0,
                }),
              ),
            );
          },
          Number: (function (e) {
            function t(t) {
              return e.apply(this, arguments);
            }
            return (
              (t.toString = function () {
                return e.toString();
              }),
              t
            );
          })((e) => {
            var t = e.label,
              n = e.placeholder,
              a = e.onChange;
            return f().createElement(
              u.ZP.Item,
              { title: t },
              f().createElement(m.Z, {
                placeholder: n,
                defaultValue: Number(n),
                onChange: a,
                keyboard: !0,
                style: { width: '40%' },
              }),
            );
          }),
          MyRadio: (e) => {
            var t = e.label,
              n = e.options,
              a = e.onChange;
            return f().createElement(
              f().Fragment,
              null,
              f().createElement(
                C,
                null,
                f().createElement(v, null, t),
                f().createElement(
                  u.ZP.Item,
                  null,
                  f().createElement(
                    g.ZP.Group,
                    { onChange: a },
                    n.map((e, t) =>
                      f().createElement(k, { value: e.value, key: t }, e.label),
                    ),
                  ),
                ),
              ),
            );
          },
          MyCheckbox: (e) => {
            var t = e.label,
              n = e.options,
              a = e.onChange;
            return f().createElement(
              C,
              null,
              f().createElement(v, null, t),
              f().createElement(
                u.ZP.Item,
                null,
                f().createElement(
                  d.Z.Group,
                  { onChange: a },
                  n.map((e, t) =>
                    f().createElement(k, { value: e.value, key: t }, e.label),
                  ),
                ),
              ),
            );
          },
          Date: (e) => {
            var t = e.label,
              n = e.placeholder,
              a = e.onChange,
              o = (0, y.useState)(''),
              r = (0, c.Z)(o, 2),
              l = r[0],
              i = r[1],
              d = (e) => {
                i(e), a && a((0, x.mr)('yyyy-MM-dd', e));
              },
              m = () => {
                a && a(l);
              };
            return f().createElement(
              f().Fragment,
              null,
              f().createElement(
                u.ZP.Item,
                { title: t },
                f().createElement(s.Z, {
                  placeholder: n,
                  mode: 'date',
                  value: l,
                  onChange: d,
                  onOk: m,
                }),
              ),
            );
          },
          MySelect: (e) => {
            var t = e.label,
              n = e.options,
              a = e.onChange;
            return f().createElement(
              f().Fragment,
              null,
              f().createElement(
                u.ZP.Item,
                { title: t },
                f().createElement(i.Z, {
                  options: n,
                  onChange: a,
                  style: { width: '40%' },
                }),
              ),
            );
          },
          MyTextTip: (e) => {
            var t = e.label,
              n = e.color,
              a = e.fontSize;
            return f().createElement(
              f().Fragment,
              null,
              f().createElement(S, { color: n, fontSize: a, title: t }),
            );
          },
        };
      t['Z'] = T;
    },
    92183: function (e, t, n) {
      'use strict';
      n.d(t, {
        u: function () {
          return a;
        },
        d: function () {
          return o;
        },
      });
      var a = [
          { key: 'baseTop', name: '\u7eb5\u5411\u4f4d\u79fb', type: 'Number' },
          { key: 'baseLeft', name: '\u6a2a\u5411\u4f4d\u79fb', type: 'Number' },
          { key: 'baseRadius', name: '\u5706\u89d2', type: 'Number' },
          { key: 'baseRotate', name: '\u65cb\u8f6c', type: 'Number' },
          { key: 'baseScale', name: '\u7f29\u653e', type: 'Number' },
          {
            key: 'baseHeight',
            name: '\u5bb9\u5668\u9ad8\u5ea6%',
            type: 'Number',
          },
          {
            key: 'baseWidth',
            name: '\u5bb9\u5668\u5bbd\u5ea6%',
            type: 'Number',
          },
        ],
        o = {
          baseTop: 0,
          baseLeft: 0,
          baseRadius: 0,
          baseRotate: 0,
          baseScale: 100,
          baseHeight: 100,
          baseWidth: 100,
        };
    },
    84466: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport { IAlertConfig } from '@/materials/absolute-antd/base/Alert/schema';\nimport { Alert, Image } from 'antd';\nimport logo from '../../../../assets/absolute/Logo.png';\n\n/*begin to delete*/\nexport type IAlertPrpConfig = IAlertConfig & {\n  isTpl: boolean;\n};\n/*end to delete*/\n\nconst AAlert: FC<IAlertPrpConfig> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { message } = props;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image src={logo} alt=\"\" />\n        </div>\n      )}\n      {!isTpl && (\n        // @ts-ignore\n        <Alert message={message} {...restProps} />\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AAlert);\n",
        o = {
          editData: [
            {
              key: 'message',
              name: '\u8b66\u544a\u63d0\u793a\u5185\u5bb9',
              type: 'Text',
            },
            {
              key: 'type',
              name: '\u8b66\u544a\u7c7b\u578b',
              type: 'Select',
              range: [
                { key: 'success', text: '\u6210\u529f' },
                { key: 'info', text: '\u901a\u77e5' },
                { key: 'warning', text: '\u8b66\u544a' },
                { key: 'error', text: '\u9519\u8bef' },
              ],
            },
            {
              key: 'closable',
              name: '\u662f\u5426\u53ef\u5173\u95ed',
              type: 'Switch',
            },
            {
              key: 'banner',
              name: '\u662f\u5426\u7528\u4f5c\u9876\u90e8\u516c\u544a',
              type: 'Switch',
            },
            {
              key: 'showIcon',
              name: '\u662f\u5426\u663e\u793a\u56fe\u6807',
              type: 'Switch',
            },
          ],
          config: {
            message: 'Alert',
            type: 'success',
            closable: !0,
            banner: !1,
            showIcon: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    77347: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Alert', h: 20, displayName: '\u901a\u77e5\u7ec4\u4ef6' };
      t['default'] = a;
    },
    18006: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import { Carousel } from 'antd';\nimport React, { FC, memo, PropsWithChildren } from 'react';\nimport styled from 'styled-components';\nimport { ICarouselConfig } from './schema';\nimport logo from '../../../../assets/absolute/banner.png';\n\n/*begin to delete*/\ninterface CarouselTypes extends ICarouselConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst PicItem = styled.div`\n  display: inline-block;\n  width: 100%;\n  max-height: 220px;\n  overflow: hidden;\n  vertical-align: top;\n  img {\n    width: 100%;\n  }\n`;\n\nconst ACarouselWrapper = styled.div`\n  width: 100%;\n  overflow: hidden;\n`;\n\nconst ACarousel: FC<CarouselTypes> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { direction, effect, autoPlay, imgList, round } = restProps;\n\n  const contentRender = () => {\n    return imgList.map((item, i) => {\n      return (\n        <PicItem key={+i} style={{ borderRadius: round + 'px' }}>\n          <a href={item.link}>\n            <img\n              src={item.imgUrl.length > 0 ? item.imgUrl[0].url : ''}\n              alt=\"\"\n            />\n          </a>\n        </PicItem>\n      );\n    });\n  };\n\n  return (\n    <ACarouselWrapper>\n      {isTpl ? (\n        <PicItem>\n          <img src={logo} alt=\"?\" />\n        </PicItem>\n      ) : (\n        <Carousel dotPosition={direction} effect={effect} autoplay={autoPlay}>\n          {contentRender()}\n        </Carousel>\n      )}\n    </ACarouselWrapper>\n  );\n};\n\nexport default memo(ACarousel);\n",
        o = {
          editData: [
            {
              key: 'direction',
              name: '\u6ed1\u52a8\u6761\u4f4d\u7f6e',
              type: 'Radio',
              range: [
                { key: 'bottom', text: '\u5e95\u90e8' },
                { key: 'top', text: '\u9876\u90e8' },
                { key: 'right', text: '\u53f3\u4fa7' },
                { key: 'left', text: '\u5de6\u4fa7' },
              ],
            },
            {
              key: 'effect',
              name: '\u52a8\u753b\u6548\u679c',
              type: 'Radio',
              range: [
                { key: 'scrollx', text: '\u6ed1\u52a8' },
                { key: 'fade', text: '\u6d88\u5931' },
              ],
            },
            { key: 'round', name: '\u5706\u89d2', type: 'Number' },
            {
              key: 'autoPlay',
              name: '\u662f\u5426\u81ea\u52a8\u5207\u6362',
              type: 'Switch',
            },
            {
              key: 'imgList',
              name: '\u56fe\u7247\u5217\u8868',
              type: 'DataList',
            },
          ],
          config: {
            direction: 'bottom',
            effect: 'scrollx',
            round: 0,
            autoPlay: !0,
            imgList: [
              {
                id: '1',
                title: '\u8da3\u8c08\u5c0f\u8bfe1',
                desc: '\u81f4\u529b\u4e8e\u6253\u9020\u4f18\u8d28\u5c0f\u8bfe\u7a0b',
                link: 'xxxxx',
                imgUrl: [
                  {
                    uid: '001',
                    name: 'image.png',
                    status: 'done',
                    url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
                  },
                ],
              },
              {
                id: '2',
                title: '\u8da3\u8c08\u5c0f\u8bfe1',
                desc: '\u81f4\u529b\u4e8e\u6253\u9020\u4f18\u8d28\u5c0f\u8bfe\u7a0b',
                link: 'xxxxx',
                imgUrl: [
                  {
                    uid: '001',
                    name: 'image.png',
                    status: 'done',
                    url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
                  },
                ],
              },
            ],
            tplImg: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
          },
          templateStr: a,
        },
        r = o;
    },
    79302: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Carousel',
        h: 82,
        displayName: '\u8f6e\u64ad\u56fe\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    86425: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport { IDividerConfig } from '@/materials/absolute-antd/base/Divider/schema';\nimport { Divider, Image } from 'antd';\nimport logo from '../../../../assets/absolute/Divider.svg';\n\n/*begin to delete*/\ninterface IDividerPropProps extends IDividerConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst ADivider: FC<IDividerPropProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { orientation, title, dashed, plain } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && title.length === 0 && (\n        <div>\n          <Divider plain={plain} orientation={orientation} dashed={dashed} />\n        </div>\n      )}\n      {!isTpl && title.length > 0 && (\n        <div>\n          <Divider plain={plain} orientation={orientation} dashed={dashed}>\n            {title}\n          </Divider>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ADivider);\n",
        o = {
          editData: [
            {
              key: 'title',
              name: '\u5d4c\u5957\u7684\u6807\u9898',
              type: 'Text',
            },
            {
              key: 'dashed',
              name: '\u662f\u5426\u4e3a\u865a\u7ebf',
              type: 'Switch',
            },
            {
              key: 'orientation',
              name: '\u6807\u9898\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u4fa7' },
                { key: 'center', text: '\u5c45\u4e2d' },
                { key: 'right', text: '\u53f3\u4fa7' },
              ],
            },
            {
              key: 'plain',
              name: '\u6587\u5b57\u662f\u5426\u4e3a\u666e\u901a\u6b63\u6587\u6837\u5f0f',
              type: 'Switch',
            },
          ],
          config: {
            title: '\u5d4c\u5957\u7684\u6807\u9898',
            dashed: !1,
            orientation: 'center',
            plain: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    80423: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Divider',
        h: 15,
        displayName: '\u5206\u5272\u7ebf\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    11799: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, Fragment, memo } from 'react';\nimport { Empty, Image } from 'antd';\nimport { IEmptyConfig } from '@/materials/absolute-antd/base/Empty/schema';\nimport logo from '../../../../assets/absolute/empty.png';\n\n/*begin to delete*/\nexport type IEmptyProConfig = IEmptyConfig & {\n  isTpl: boolean;\n};\n/*end to delete*/\n\nconst AEmpty: FC<IEmptyProConfig> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  return (\n    <Fragment>\n      {isTpl && (\n        <div>\n          <Image src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && <Empty {...restProps} />}\n    </Fragment>\n  );\n};\n\nexport default memo(AEmpty);\n",
        o = {
          editData: [
            {
              key: 'description',
              name: '\u5185\u5bb9\u63cf\u8ff0',
              type: 'Text',
            },
            {
              key: 'image',
              name: '\u8bbe\u7f6e\u663e\u793a\u56fe\u7247',
              type: 'Text',
            },
          ],
          config: {
            description: '\u6682\u65e0\u6570\u636e',
            image: 'https://s1.ax1x.com/2023/01/15/pSQdf8U.png',
          },
          templateStr: a,
        },
        r = o;
    },
    43906: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Empty', h: 20, displayName: '\u7a7a\u767d\u7ec4\u4ef6' };
      t['default'] = a;
    },
    14196: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useCallback } from 'react';\nimport { Button } from 'antd';\nimport BaseForm from '@/engine-lib-absolute/core-component/antd-base-assembly/base-form/base-form';\nimport styled from 'styled-components';\nimport { IFormConfig } from './schema';\nimport {\n  TColorDefaultType,\n  TTextDefaultType,\n} from '@/engine-lib-absolute/core-component/type';\nimport logo from '../../../../assets/absolute/form.png';\n\n/*begin to delete*/\nexport interface IFormConfigProps extends IFormConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AFormTitle = styled.div`\n  padding-bottom: 20px;\n  text-align: center;\n`;\n\nconst AFormWrapper = styled.div<{\n  $bgColor: TColorDefaultType;\n  $pointer: boolean;\n}>`\n  margin: 10px;\n  padding: 20px 16px;\n  border-radius: 6px;\n  box-shadow: 0 2px 6px #f0f0f0;\n  width: calc(100% - 20px);\n  overflow: hidden;\n  position: absolute;\n  background-color: ${(props) => props.$bgColor};\n  pointer-events: ${(props) => (props.$pointer ? 'none' : 'initial')};\n`;\n\nconst AButton = styled(Button)<{\n  $bgColor: TColorDefaultType;\n  $bdColor: TColorDefaultType;\n  $textCol: TTextDefaultType;\n}>`\n  background-color: ${(props) => props.$bgColor};\n  border-color: ${(props) => props.$bdColor};\n  color: ${(props) => props.$textCol};\n`;\n\nconst AForm: FC<IFormConfigProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    title,\n    bgColor,\n    fontSize,\n    titColor,\n    btnColor,\n    titWeight,\n    btnTextColor,\n    api,\n    formControls,\n  } = restProps;\n\n  const formData: Record<string, any> = {};\n\n  const handleChange = useCallback(\n    (item, v) => {\n      formData[item.label] = v;\n    },\n    [formData],\n  );\n\n  const handleSubmit = () => {\n    if (api) {\n      fetch(api, {\n        body: JSON.stringify(formData),\n        cache: 'no-cache',\n        headers: {\n          'content-type': 'application/json',\n        },\n        method: 'POST',\n        mode: 'cors',\n      });\n    }\n  };\n\n  const isEditorPage = window.location.pathname.indexOf('editor') > -1;\n\n  return (\n    <React.Fragment>\n      {props.isTpl && (\n        <div>\n          <img src={logo} alt=\"\" />\n        </div>\n      )}\n      {!props.isTpl && (\n        <AFormWrapper $bgColor={bgColor} $pointer={isEditorPage}>\n          {title && (\n            <AFormTitle\n              style={{ fontSize, fontWeight: +titWeight, color: titColor }}\n            >\n              {title}\n            </AFormTitle>\n          )}\n          <div>\n            {formControls.map((item) => {\n              const FormItem = BaseForm[item.type];\n              return (\n                <FormItem\n                  onChange={(v: string) => handleChange(item, v)}\n                  {...item}\n                  key={item.id}\n                />\n              );\n            })}\n            <div style={{ textAlign: 'center', padding: '16px 0' }}>\n              <AButton\n                type=\"primary\"\n                size=\"small\"\n                block\n                onClick={handleSubmit}\n                $bgColor={btnColor}\n                $bdColor={btnColor}\n                $textCol={btnTextColor}\n              >\n                \u63d0\u4ea4\n              </AButton>\n            </div>\n          </div>\n        </AFormWrapper>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AForm);\n",
        o = {
          editData: [
            { key: 'title', name: '\u6807\u9898', type: 'Text' },
            {
              key: 'fontSize',
              name: '\u6807\u9898\u5927\u5c0f',
              type: 'Number',
            },
            {
              key: 'titColor',
              name: '\u6807\u9898\u989c\u8272',
              type: 'Color',
            },
            {
              key: 'titWeight',
              name: '\u6807\u9898\u7c97\u7ec6',
              type: 'Select',
              range: [
                { key: '300', text: '300 x 300' },
                { key: '400', text: '400 x 400' },
                { key: '500', text: '500 x 500' },
                { key: '600', text: '600 x 600' },
              ],
            },
            { key: 'bgColor', name: '\u80cc\u666f\u8272', type: 'Color' },
            {
              key: 'btnColor',
              name: '\u6309\u94ae\u989c\u8272',
              type: 'Color',
            },
            {
              key: 'btnTextColor',
              name: '\u6309\u94ae\u6587\u672c\u989c\u8272',
              type: 'Color',
            },
            { key: 'api', name: '\u8868\u5355Api\u5730\u5740', type: 'Text' },
            {
              key: 'formControls',
              name: '\u8868\u5355\u63a7\u4ef6',
              type: 'FormItems',
            },
          ],
          config: {
            title: '\u8868\u5355\u5b9a\u5236\u7ec4\u4ef6',
            fontSize: 18,
            titColor: 'rgba(60, 60, 60, 1)',
            titWeight: '400',
            bgColor: 'rgba(255, 255, 255, 1)',
            btnColor: 'rgba(20, 54, 226, 100)',
            btnTextColor: 'rgba(255, 255, 255, 1)',
            api: '',
            formControls: [
              {
                id: '1',
                type: 'Text',
                label: '\u59d3\u540d',
                placeholder: '\u8bf7\u8f93\u5165\u59d3\u540d',
              },
              {
                id: '2',
                type: 'Number',
                label: '\u5e74\u9f84',
                placeholder: ' \u8bf7\u8f93\u5165\u5e74\u9f84',
              },
              {
                id: '4',
                type: 'MySelect',
                label: '\u7231\u597d',
                options: [
                  { label: '\u7bee\u7403', value: '1' },
                  { label: '\u4e52\u4e53\u7403', value: '2' },
                  { label: '\u5065\u8eab', value: '3' },
                ],
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    19023: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Form', h: 172, displayName: '\u8868\u683c\u7ec4\u4ef6' };
      t['default'] = a;
    },
    86326: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return i;
          },
        });
      var a = n(8870),
        o = n(92183),
        r =
          "import React, { FC, memo, useState } from 'react';\nimport Logo from '../../../../assets/absolute/Logo.png';\nimport { Avatar, Button, Image } from 'antd';\nimport styled from 'styled-components';\nimport { IHeaderConfig } from '@/materials/absolute-antd/base/Header/schema';\n\nconst HeaderWrapper = styled.div`\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 15px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  & button + button {\n    margin-left: 10px;\n  }\n`;\n\nconst WelcomeWrapper = styled.div`\n  color: #333;\n  font-size: 14px;\n  margin-right: 10px;\n`;\n\nconst Svg = styled.div`\n  margin-right: 10px;\n  max-width: 160px;\n  max-height: 46px;\n  height: 46px;\n  overflow: hidden;\n  img {\n    height: 100%;\n    object-fit: contain;\n  }\n`;\n\nconst H1 = styled.h1<{\n  $color: string;\n  $fontSize: number;\n}>`\n  font-weight: 900;\n  line-height: 1;\n  margin: 6px 0 6px 10px;\n  display: inline-block;\n  vertical-align: top;\n  color: ${(props) => props.$color};\n  font-size: ${(props) => props.$fontSize};\n`;\n\nconst Index = styled.header<{ props: IHeaderConfig }>`\n  box-sizing: content-box;\n  padding: 3px 12px;\n  display: flex;\n  align-items: center;\n  height: 50px;\n  overflow: hidden;\n  position: absolute;\n  background-color: ${(props) => props.props.bgColor};\n  width: ${(props) => props.props.baseWidth}%;\n  height: ${(props) => props.props.baseHeight}%;\n  border-radius: ${(props) => props.props.baseRadius};\n  transform: translate(\n      ${(props) => props.props.baseLeft}px,\n      ${(props) => props.props.baseTop}\n    )\n    scale(${(props) => props.props.baseScale / 100})\n    rotate(${(props) => props.props.baseRadius}deg);\n`;\n\n/*begin to delete*/\nexport interface IHeaderProProps extends IHeaderConfig {\n  onLogin?: () => void;\n  onLogout?: () => void;\n  onCreateAccount?: () => void;\n}\n/*end to delete*/\n\nexport const AHeader: FC<IHeaderProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    user,\n    title,\n    logo,\n    fontSize,\n    color,\n    size,\n    shape,\n    onLogin,\n    onLogout,\n    onCreateAccount,\n  } = restProps;\n\n  const [name, setName] = useState(user);\n\n  const handleOnLogout = () => {\n    setName('');\n    onLogout && onLogout();\n  };\n\n  const handleOnLogin = () => {\n    //TODO... \u4f7f\u7528redux\u7b49\u7ec4\u4ef6\uff0c\u52a8\u6001\u66f4\u65b0\u7528\u6237\u540d\n    setName('xiye');\n    onLogin && onLogin();\n  };\n\n  const handleOnCreateAccount = () => {\n    //TODO... \u4f7f\u7528redux\u7b49\u7ec4\u4ef6\uff0c\u52a8\u6001\u66f4\u65b0\u7528\u6237\u540d\n    setName('xiye');\n    onCreateAccount && onCreateAccount();\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={Logo} alt=\"\" />\n        </div>\n      )}\n      {!isTpl && (\n        <Index props={props}>\n          <HeaderWrapper>\n            <div style={{ display: 'flex' }}>\n              <Svg>\n                <Avatar\n                  shape={shape}\n                  size={size}\n                  src={logo && logo[0].url}\n                  alt={title}\n                />\n              </Svg>\n              <H1 $fontSize={fontSize} $color={color}>\n                {title}\n              </H1>\n            </div>\n            <div>\n              {name.length > 0 ? (\n                <>\n                  <WelcomeWrapper>\n                    Welcome, <b>{name}</b>!\n                  </WelcomeWrapper>\n                  <Button size=\"small\" onClick={handleOnLogout}>\n                    Log out\n                  </Button>\n                </>\n              ) : (\n                <>\n                  <Button size=\"small\" onClick={handleOnLogin}>\n                    Log in\n                  </Button>\n                  <Button\n                    type={'primary'}\n                    size=\"small\"\n                    onClick={handleOnCreateAccount}\n                  >\n                    Sign up\n                  </Button>\n                </>\n              )}\n            </div>\n          </HeaderWrapper>\n        </Index>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AHeader);\n",
        l = {
          editData: [
            { key: 'bgColor', name: '\u80cc\u666f\u8272', type: 'Color' },
            {
              key: 'size',
              name: '\u56fe\u6807\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'small', text: '\u5c0f\u53f7' },
                { key: 'default', text: '\u9ed8\u8ba4' },
                { key: 'large', text: '\u5927\u53f7' },
              ],
            },
            {
              key: 'shape',
              name: '\u56fe\u6807\u5f62\u72b6',
              type: 'Select',
              range: [
                { key: 'circle', text: '\u5706\u89d2' },
                { key: 'square', text: '\u65b9\u89d2' },
              ],
            },
            { key: 'height', name: '\u9ad8\u5ea6', type: 'Number' },
            {
              key: 'logo',
              name: 'logo',
              type: 'Upload',
              isCrop: !0,
              cropRate: 1e3 / 618,
            },
            { key: 'title', name: '\u7f51\u7ad9\u540d\u79f0', type: 'Text' },
            { key: 'user', name: '\u7528\u6237\u540d\u79f0', type: 'Text' },
            { key: 'color', name: '\u6587\u5b57\u989c\u8272', type: 'Color' },
            {
              key: 'fontSize',
              name: '\u6587\u5b57\u5927\u5c0f',
              type: 'Number',
            },
            ...o.u,
          ],
          config: (0, a.Z)(
            {
              bgColor: 'rgba(0,0,0,1)',
              size: 'large',
              shape: 'square',
              logo: [
                {
                  uid: '001',
                  name: 'image.png',
                  status: 'done',
                  url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
                },
              ],
              fontSize: 20,
              color: 'rgba(255,255,255,1',
              height: 58,
              title: 'Envelope',
              user: 'xiye',
            },
            o.d,
          ),
          templateStr: r,
        },
        i = l;
    },
    90470: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Header',
        h: 28,
        displayName: '\u9875\u5934\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    438: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return i;
          },
        });
      var a = n(8870),
        o = n(92183),
        r =
          "import React, { FC, memo, useState } from 'react';\nimport styled from 'styled-components';\nimport { Image } from 'antd';\nimport logo from '../../../../assets/absolute/img.png';\nimport { TTextSelectKeyType } from '@/materials/absolute-antd/base/Text/schema';\nimport { IImageConfig } from '@/materials/absolute-antd/base/Image/schema';\n\nconst AImageWrapper = styled.div<{\n  $baseWidth: number;\n  $baseHeight: number;\n  $borderRadius: number;\n  $baseLeft: number;\n  $baseTop: number;\n  $baseScale: number;\n  $baseRotate: number;\n}>`\n  overflow: hidden;\n  position: absolute;\n  width: ${(props) => props.$baseWidth + '%'};\n  height: ${(props) => props.$baseHeight + '%'};\n  border-radius: ${(props) => props.$borderRadius};\n  transform: ${(props) => `translate(${props.$baseLeft}px,${props.$baseTop}px)\n      scale(${props.$baseScale / 100})\n      rotate(${props.$baseRotate}deg)`};\n`;\n\nconst AImageContainer = styled.div<{ round: number }>`\n  border-radius: ${(props) => props.round};\n  width: 100%;\n  text-align: center;\n  overflow: hidden;\n  position: relative;\n`;\n\ntype TSelectDefaultType<KeyType> = KeyType;\nconst ASubTextWrapper = styled.div<{\n  $translate: [number | undefined, number | undefined];\n  $textAlign: TSelectDefaultType<TTextSelectKeyType>;\n}>`\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin-left: ${(props) => props.translate && props.translate[0]};\n  margin-top: ${(props) => props.translate && props.translate[1]};\n  text-align: ${(props) => props.$textAlign};\n`;\n\n/*begin to delete*/\ninterface IImageProps extends IImageConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AImage: FC<IImageProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    imgUrl,\n    round = 0,\n    translate,\n    align,\n    titText,\n    titFontSize,\n    titColor,\n    titFontWeight,\n    subTitText,\n    subTitFontSize,\n    subTitColor,\n    subTitFontWeight,\n  } = restProps;\n\n  const [visible, setVisible] = useState<boolean>(false);\n\n  return (\n    <React.Fragment>\n      {props.isTpl && (\n        <div>\n          <img src={logo} alt=\"\" />\n        </div>\n      )}\n      {!props.isTpl && (\n        <AImageWrapper\n          $baseWidth={props.baseWidth}\n          $baseHeight={props.baseHeight}\n          $borderRadius={props.baseRadius}\n          $baseLeft={props.baseLeft}\n          $baseRotate={props.baseLeft}\n          $baseScale={props.baseScale}\n          $baseTop={props.baseTop}\n        >\n          <AImageContainer round={round}>\n            <ASubTextWrapper $textAlign={align} $translate={translate}>\n              <div\n                style={{\n                  fontSize: titFontSize,\n                  color: titColor,\n                  fontWeight: +titFontWeight,\n                }}\n              >\n                {titText}\n              </div>\n              <div\n                style={{\n                  fontSize: subTitFontSize,\n                  color: subTitColor,\n                  fontWeight: +subTitFontWeight,\n                  lineHeight: 2.6,\n                }}\n              >\n                {subTitText}\n              </div>\n            </ASubTextWrapper>\n            {imgUrl.length <= 1 ? (\n              <Image\n                src={imgUrl && imgUrl[0].url}\n                alt=\"\"\n                style={{ width: '100%' }}\n              />\n            ) : (\n              <React.Fragment>\n                <Image\n                  preview={{ visible: false }}\n                  style={{ width: '100%' }}\n                  src={imgUrl && imgUrl[0].url}\n                  onClick={() => setVisible(true)}\n                />\n                <div style={{ display: 'none' }}>\n                  <Image.PreviewGroup\n                    preview={{\n                      visible,\n                      onVisibleChange: (vis) => setVisible(vis),\n                    }}\n                  >\n                    {imgUrl.map((item, i) => (\n                      <Image src={item.url} key={i} style={{ width: '100%' }} />\n                    ))}\n                  </Image.PreviewGroup>\n                </div>\n              </React.Fragment>\n            )}\n          </AImageContainer>\n        </AImageWrapper>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AImage);\n",
        l = {
          editData: [
            { key: 'translate', name: '\u6587\u5b57\u504f\u79fb', type: 'Pos' },
            {
              key: 'align',
              name: '\u5bf9\u9f50\u65b9\u5f0f',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'center', text: '\u5c45\u4e2d\u5bf9\u9f50' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
              ],
            },
            { key: 'titText', name: '\u6807\u9898\u6587\u5b57', type: 'Text' },
            {
              key: 'titFontSize',
              name: '\u6807\u9898\u5927\u5c0f',
              type: 'Number',
            },
            {
              key: 'titColor',
              name: '\u6807\u9898\u989c\u8272',
              type: 'Color',
            },
            {
              key: 'titFontWeight',
              name: '\u6807\u9898\u7c97\u7ec6',
              type: 'Select',
              range: [
                { key: '300', text: '300 x 300' },
                { key: '400', text: '400 x 400' },
                { key: '500', text: '500 x 500' },
                { key: '600', text: '600 x 600' },
              ],
            },
            {
              key: 'subTitText',
              name: '\u526f\u6807\u9898\u6587\u5b57',
              type: 'Text',
            },
            {
              key: 'subTitFontSize',
              name: '\u526f\u6807\u9898\u5927\u5c0f',
              type: 'Number',
            },
            {
              key: 'subTitColor',
              name: '\u526f\u6807\u9898\u989c\u8272',
              type: 'Color',
            },
            {
              key: 'subTitFontWeight',
              name: '\u526f\u6807\u9898\u7c97\u7ec6',
              type: 'Select',
              range: [
                { key: '300', text: '300 x 300' },
                { key: '400', text: '400 x 400' },
                { key: '500', text: '500 x 500' },
                { key: '600', text: '600 x 600' },
              ],
            },
            {
              key: 'imgUrl',
              name: '\u4e0a\u4f20\u56fe\u7247',
              type: 'Upload',
              isCrop: !1,
            },
            { key: 'round', name: '\u5706\u89d2', type: 'Number' },
            ...o.u,
          ],
          config: (0, a.Z)(
            {
              translate: [0, 0],
              align: 'center',
              titText: '',
              titFontSize: 20,
              titColor: 'rgba(0,0,0,1)',
              titFontWeight: '400',
              subTitText: '',
              subTitFontSize: 16,
              subTitColor: 'rgba(0,0,0,1)',
              subTitFontWeight: '400',
              imgUrl: [
                {
                  uid: '001',
                  name: 'image.png',
                  status: 'done',
                  url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
                },
                {
                  uid: '002',
                  name: 'image.png2',
                  status: 'done',
                  url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
                },
                {
                  uid: '003',
                  name: 'image.png3',
                  status: 'done',
                  url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
                },
                {
                  uid: '004',
                  name: 'image.png4',
                  status: 'done',
                  url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
                },
              ],
              round: 0,
            },
            o.d,
          ),
          templateStr: r,
        },
        i = l;
    },
    80100: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Image', h: 80, displayName: '\u56fe\u7247\u7ec4\u4ef6' };
      t['default'] = a;
    },
    60793: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return i;
          },
        });
      var a = n(8870),
        o = n(92183),
        r =
          "import React, { FC, memo, useEffect, useState } from 'react';\nimport styled from 'styled-components';\nimport logo from '../../../../assets/absolute/list.png';\nimport { IListConfig } from '@/materials/absolute-antd/base/List/schema';\nimport { Avatar, Divider, Image, List } from 'antd';\nimport { PaginationConfig } from 'antd/es/pagination';\n\nconst SourceItem = styled.div`\n  display: flex;\n  align-items: center;\n  margin-bottom: 16px;\n`;\n\nconst ListWrapper = styled.div<{\n  props: any;\n}>`\n  margin: 10px auto;\n  width: 100%;\n  overflow: hidden;\n  position: absolute;\n  width: ${(props) => props.props.baseWidth};\n  height: ${(props) => props.props.baseHeight};\n  border-radius: ${(props) => props.props.baseRadius};\n  transform: translate(\n      ${(props) => props.props.baseLeft}px,\n      ${(props) => props.props.baseTop}px\n    )\n    scale(${(props) => props.props.baseScale / 100})\n    rotate(${(props) => props.props.baseRotate}deg);\n`;\n\n/*begin to delete*/\ninterface IListProps extends IListConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AList: FC<IListProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    bordered,\n    header = '',\n    footer = '',\n    sourceData,\n    itemLayout,\n    loading,\n    size,\n    split,\n    pagination,\n    grid,\n  } = restProps;\n\n  const [gridCol, setGridCol] = useState<any>({});\n\n  useEffect(() => {\n    let copy: any = {};\n    grid.map((item, i) => {\n      if (item.type === 'Number') {\n        if (item.id === 'column') copy['column'] = Number(item.placeholder);\n        if (item.id === 'gutter') copy['gutter'] = Number(item.placeholder);\n        if (item.id === 'xs') copy['xs'] = Number(item.placeholder);\n        if (item.id === 'sm') copy['sm'] = Number(item.placeholder);\n        if (item.id === 'md') copy['md'] = Number(item.placeholder);\n        if (item.id === 'lg') copy['lg'] = Number(item.placeholder);\n        if (item.id === 'xl') copy['xl'] = Number(item.placeholder);\n        if (item.id === 'xxl') copy['xxl'] = Number(item.placeholder);\n      }\n    });\n    console.log(copy);\n    setGridCol(copy);\n  }, [grid]);\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt=\"\" />\n        </div>\n      )}\n      {!isTpl && (\n        <ListWrapper props={props}>\n          <List\n            bordered={bordered}\n            header={header.length > 0 ? header : <></>}\n            footer={footer.length > 0 ? footer : <></>}\n            itemLayout={itemLayout}\n            loading={loading}\n            size={size}\n            split={split}\n            pagination={pagination as false | PaginationConfig | undefined}\n            grid={gridCol}\n          >\n            {sourceData.map((item, i) => {\n              return (\n                <List.Item key={i}>\n                  {item.imgUrl.length > 0 ? (\n                    <React.Fragment>\n                      <List.Item.Meta\n                        avatar={<Avatar src={item.imgUrl[0].url} />}\n                        title={<a href={item.link}>{item.title}</a>}\n                        description={item.desc}\n                      />\n                      {item.content}\n                    </React.Fragment>\n                  ) : (\n                    <React.Fragment>\n                      <List.Item.Meta\n                        title={<a href={item.link}>{item.title}</a>}\n                        description={item.desc}\n                      />\n                      {item.content}\n                    </React.Fragment>\n                  )}\n                  {split && <Divider />}\n                </List.Item>\n              );\n            })}\n          </List>\n        </ListWrapper>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AList);\n",
        l = {
          editData: [
            {
              key: 'bordered',
              name: '\u662f\u5426\u5c55\u793a\u8fb9\u6846',
              type: 'Switch',
            },
            { key: 'header', name: '\u5217\u8868\u9876\u90e8', type: 'Text' },
            { key: 'footer', name: '\u5217\u8868\u5e95\u90e8', type: 'Text' },
            {
              key: 'itemLayout',
              name: '\u5217\u8868\u5e03\u5c40',
              type: 'Select',
              range: [
                { key: 'horizontal', text: '\u6c34\u5e73\u5e03\u5c40' },
                { key: 'vertical', text: '\u5782\u76f4\u5e03\u5c40' },
              ],
            },
            {
              key: 'loading',
              name: '\u52a0\u8f7d\u65f6\u662f\u5426\u5c55\u4f4d',
              type: 'Switch',
            },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'default', text: '\u9ed8\u8ba4' },
                { key: 'small', text: '\u5c0f\u53f7' },
                { key: 'large', text: '\u5927\u53f7' },
              ],
            },
            {
              key: 'split',
              name: '\u662f\u5426\u663e\u793a\u5206\u5272\u7ebf',
              type: 'Switch',
            },
            {
              key: 'pagination',
              name: '\u662f\u5426\u663e\u793a\u5206\u9875',
              type: 'Switch',
            },
            {
              key: 'position',
              name: '\u5206\u9875\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'bottom', text: '\u5e95\u90e8' },
                { key: 'top', text: '\u9876\u90e8' },
                { key: 'both', text: '\u4e24\u4fa7' },
              ],
            },
            {
              key: 'grid',
              name: '\u5217\u8868\u6805\u683c\u914d\u7f6e',
              type: 'FormItems',
            },
            {
              key: 'sourceData',
              name: '\u6570\u636e\u6e90',
              type: 'DataList',
              cropRate: 1,
            },
            ...o.u,
          ],
          config: (0, a.Z)(
            {
              bordered: !0,
              header: 'Header',
              footer: '',
              itemLayout: 'vertical',
              loading: !1,
              size: 'default',
              split: !1,
              pagination: !1,
              position: 'bottom',
              grid: [
                {
                  id: 'column',
                  type: 'Number',
                  label: '\u6805\u683c\u5217\u6570column',
                  placeholder: '0',
                },
                {
                  id: 'gutter',
                  type: 'Number',
                  label: '\u6805\u683c\u95f4\u9694gutter',
                  placeholder: '16',
                },
                {
                  id: 'xs',
                  type: 'Number',
                  label: '<576px \u5c55\u793a\u7684\u5217\u6570[xs]',
                  placeholder: '1',
                },
                {
                  id: 'sm',
                  type: 'Number',
                  label: '\u2265576px \u5c55\u793a\u7684\u5217\u6570[sm]',
                  placeholder: '2',
                },
                {
                  id: 'md',
                  type: 'Number',
                  label: '\u2265768px \u5c55\u793a\u7684\u5217\u6570',
                  placeholder: '4',
                },
                {
                  id: 'lg',
                  label: '\u2265992px \u5c55\u793a\u7684\u5217\u6570',
                  type: 'Number',
                  placeholder: '4',
                },
                {
                  id: 'xl',
                  label: '\u22651200px \u5c55\u793a\u7684\u5217\u6570',
                  type: 'Number',
                  placeholder: '6',
                },
                {
                  id: 'xxl',
                  type: 'Number',
                  label: '\u22651600px \u5c55\u793a\u7684\u5217\u6570',
                  placeholder: '3',
                },
              ],
              sourceData: [
                {
                  id: '1',
                  title: '\u8da3\u8c08\u5c0f\u8bfe',
                  desc: '\u81f4\u529b\u4e8e\u6253\u9020\u4f18\u8d28\u5c0f\u8bfe\u7a0b',
                  link: 'xxxxx',
                  imgUrl: [
                    {
                      uid: '001',
                      name: 'image.png',
                      status: 'done',
                      url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
                    },
                  ],
                  content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                },
                {
                  id: '2',
                  title: '\u8da3\u8c08\u5c0f\u8bfe',
                  desc: '\u81f4\u529b\u4e8e\u6253\u9020\u4f18\u8d28\u5c0f\u8bfe\u7a0b',
                  link: 'xxxxx',
                  imgUrl: [],
                  content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                },
              ],
            },
            o.d,
          ),
          templateStr: r,
        },
        i = l;
    },
    7862: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'List', h: 110, displayName: '\u5217\u8868\u7ec4\u4ef6' };
      t['default'] = a;
    },
    47544: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { memo, FC } from 'react';\nimport { Image, Typography } from 'antd';\nimport styled from 'styled-components';\nimport logo from '../../../../assets/absolute/paragraph.png';\nimport { ILongTextConfig } from '@/materials/absolute-antd/base/Paragraph/schema';\n\n/*begin to delete*/\nexport interface ILongTextProps extends ILongTextConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\ntype TLongTextSelectKeyType = 'left' | 'right' | 'center';\ntype TSelectDefaultType<KeyType> = KeyType;\n\nconst LongTextWrapper = styled(Typography.Paragraph)<{\n  $color: string;\n  indent: number;\n  $fontSize: number;\n  $lineHeight: number;\n  $textAlign: TSelectDefaultType<TLongTextSelectKeyType>;\n  $bgColor: string;\n  $padding: number;\n  radius: number;\n}>`\n  color: ${(props) => props.$color};\n  text-indent: ${(props) => props.indent + 'px'};\n  font-size: ${(props) => props.$fontSize};\n  line-height: ${(props) => props.$lineHeight};\n  text-align: ${(props) => props.$textAlign};\n  background-color: ${(props) => props.$bgColor};\n  padding: ${(props) => props.$padding};\n  border-radius: ${(props) => props.radius};\n`;\n\nconst AParagraph: FC<ILongTextProps> = (props) => {\n  const {\n    isTpl,\n\n    ...restProps\n  } = props;\n\n  // code, delete, mark\u7b49antd\u914d\u7f6e\n  const {\n    text,\n    fontSize,\n    color,\n    indent,\n    lineHeight,\n    textAlign,\n    bgColor,\n    padding,\n    radius,\n    rows,\n    expendable,\n    symbol,\n    ...rest\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image src={logo} alt=\"\" />\n        </div>\n      )}\n      {!isTpl && (\n        <LongTextWrapper\n          $color={color}\n          indent={indent}\n          $fontSize={fontSize}\n          $lineHeight={lineHeight}\n          $textAlign={textAlign}\n          $bgColor={bgColor}\n          $padding={padding}\n          radius={radius}\n          ellipsis={{\n            rows: rows,\n            expandable: expendable,\n            symbol: symbol,\n          }}\n          {...rest}\n        >\n          {text}\n        </LongTextWrapper>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AParagraph);\n",
        o = {
          editData: [
            { key: 'text', name: '\u6587\u5b57', type: 'TextArea' },
            {
              key: 'disabled',
              name: '\u7981\u7528\u6587\u672c',
              type: 'Switch',
            },
            {
              key: 'code',
              name: '\u6dfb\u52a0\u4ee3\u7801\u6837\u5f0f',
              type: 'Switch',
            },
            {
              key: 'delete',
              name: '\u5220\u9664\u7ebf\u6837\u5f0f',
              type: 'Switch',
            },
            { key: 'strong', name: '\u52a0\u7c97', type: 'Switch' },
            { key: 'italic', name: '\u659c\u4f53', type: 'Switch' },
            { key: 'mark', name: '\u6dfb\u52a0\u6807\u8bb0', type: 'Switch' },
            { key: 'underline', name: '\u4e0b\u5212\u7ebf', type: 'Switch' },
            { key: 'color', name: '\u989c\u8272', type: 'Color' },
            {
              key: 'fontSize',
              name: '\u5b57\u4f53\u5927\u5c0f',
              type: 'Number',
            },
            { key: 'indent', name: '\u9996\u884c\u7f29\u8fdb', type: 'Number' },
            { key: 'lineHeight', name: '\u884c\u9ad8', type: 'Number' },
            {
              key: 'textAlign',
              name: '\u5bf9\u9f50\u65b9\u5f0f',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
                { key: 'center', text: '\u5c45\u4e2d' },
              ],
            },
            { key: 'bgColor', name: '\u80cc\u666f\u989c\u8272', type: 'Color' },
            {
              key: 'padding',
              name: '\u586b\u5145\u95f4\u8ddd',
              type: 'Number',
            },
            { key: 'radius', name: '\u80cc\u666f\u5706\u89d2', type: 'Number' },
            { key: 'rows', name: '\u6700\u5927\u884c\u6570', type: 'Number' },
            {
              key: 'expendable',
              name: '\u662f\u5426\u53ef\u5c55\u5f00',
              type: 'Switch',
            },
            { key: 'symbol', name: '\u5c55\u5f00\u6807\u5fd7', type: 'Text' },
          ],
          config: {
            text: 'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant\n        Design, a design language for background applications, is refined by Ant UED Team. Ant\n        Design, a design language for background applications, is refined by Ant UED Team. Ant\n        Design, a design language for background applications, is refined by Ant UED Team. Ant\n        Design, a design language for background applications, is refined by Ant UED Team. Ant\n        Design, a design language for background applications, is refined by Ant UED Team.',
            disabled: !1,
            code: !1,
            delete: !1,
            strong: !1,
            italic: !1,
            underline: !1,
            mark: !1,
            color: 'rgba(60, 60, 60, 1)',
            fontSize: 14,
            indent: 20,
            lineHeight: 1.8,
            textAlign: 'left',
            bgColor: 'rgba(255, 255, 255, 0)',
            padding: 0,
            radius: 0,
            rows: 2,
            expendable: !0,
            symbol: 'more',
          },
          templateStr: a,
        },
        r = o;
    },
    69112: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Paragraph',
        h: 36,
        displayName: '\u957f\u6587\u672c\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    85777: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Image } from 'antd';\nimport styled from 'styled-components';\nimport { IQrcodeConfig } from '@/materials/absolute-antd/base/Qrcode/schema';\n\nconst QrCodeWrapper = styled.div`\n  width: 100%;\n  max-width: 220px;\n  margin: 16px auto;\n`;\n\nconst QrCodeTextWrapper = styled.div<{\n  $color: string;\n  $fontSize: number;\n}>`\n  text-align: center;\n  color: ${(props) => props.$color};\n  font-size: ${(props) => props.$fontSize};\n  padding: 8px;\n`;\n\n/*begin to delete*/\ninterface IQrcodeProps extends IQrcodeConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AQrcode: FC<IQrcodeProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { qrcode, text, color, fontSize = 14 } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl ? (\n        <div>\n          <Image preview={false} src={logo} alt=\"\" />\n        </div>\n      ) : (\n        <QrCodeWrapper>\n          <Image\n            preview={false}\n            src={qrcode && qrcode[0].url}\n            alt={text}\n            style={{ width: '100%' }}\n          />\n          <QrCodeTextWrapper $color={color} $fontSize={fontSize}>\n            {text}\n          </QrCodeTextWrapper>\n        </QrCodeWrapper>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AQrcode);\n",
        o = {
          editData: [
            {
              key: 'qrcode',
              name: '\u4e8c\u7ef4\u7801',
              type: 'Upload',
              isCrop: !0,
              cropRate: 1,
            },
            { key: 'text', name: '\u6587\u5b57', type: 'Text' },
            { key: 'color', name: '\u6587\u5b57\u989c\u8272', type: 'Color' },
            {
              key: 'fontSize',
              name: '\u6587\u5b57\u5927\u5c0f',
              type: 'Number',
            },
          ],
          config: {
            qrcode: [
              {
                uid: '001',
                name: 'image.png',
                status: 'done',
                url: 'http://49.234.61.19/uploads/code_173e1705e0c.png',
              },
            ],
            text: '\u4e8c\u7ef4\u7801',
            color: 'rgba(153,153,153,1)',
            fontSize: 14,
          },
          templateStr: a,
        },
        r = o;
    },
    30108: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Qrcode',
        h: 150,
        displayName: '\u4e8c\u7ef4\u7801\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    69825: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport styled from 'styled-components';\nimport logo from '../../../../assets/absolute/richText.png';\nimport { Image } from 'antd';\nimport { IRichTextConfig } from '@/materials/absolute-antd/base/RichText/schema';\n\n/*begin to delete*/\ninterface IProps extends IRichTextConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst RichTextWrapper = styled.div`\n  :global(p) {\n    margin-bottom: 0;\n  }\n  :global(img) {\n    max-width: 100%;\n    text-align: center;\n  }\n  :global(blockquote) {\n    margin: 0 0 10px;\n    padding: 12px 20px;\n    background-color: #f1f2f3;\n    border-left: 5px solid #ccc;\n    color: #666;\n    font-style: italic;\n  }\n`;\n\nconst ARichText: FC<IProps> = (props: IProps) => {\n  const { isTpl, ...restProps } = props;\n\n  const { borderColor, borderWidth, round, padding, content } = restProps;\n\n  return isTpl ? (\n    <div>\n      <Image preview={false} style={{ width: '100%' }} src={logo} alt=\"\" />\n    </div>\n  ) : (\n    <RichTextWrapper\n      style={{\n        border: `${borderWidth}px solid ${borderColor}`,\n        borderRadius: round + 'px',\n        padding: padding + 'px',\n      }}\n    >\n      <div dangerouslySetInnerHTML={{ __html: content }}></div>\n    </RichTextWrapper>\n  );\n};\nexport default memo(ARichText);\n",
        o = {
          editData: [
            { key: 'round', name: '\u8fb9\u6846\u5706\u89d2', type: 'Number' },
            {
              key: 'borderWidth',
              name: '\u8fb9\u6846\u5bbd\u5ea6',
              type: 'Number',
            },
            {
              key: 'borderColor',
              name: '\u8fb9\u6846\u989c\u8272',
              type: 'Color',
            },
            { key: 'padding', name: '\u5185\u8fb9\u8ddd', type: 'Number' },
            { key: 'content', name: '\u5185\u5bb9', type: 'RichText' },
          ],
          config: {
            round: 0,
            borderWidth: 0,
            borderColor: 'rgba(255,255,255,1)',
            padding: 0,
            content: '',
          },
          templateStr: a,
        },
        r = o;
    },
    79163: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'RichText',
        h: 120,
        displayName: '\u5bcc\u6587\u672c\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    82232: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import { ITabsConfig } from '@/materials/absolute-antd/base/Tabs/schema';\nimport React, { FC, memo, useRef } from 'react';\nimport { Image, Tabs } from 'antd';\nimport logo from '../../../../assets/absolute/tabs.png';\nimport styled from 'styled-components';\n\n/*begin to delete*/\ninterface ITabsProConfig extends ITabsConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst TabsWrapper = styled.div`\n  padding-top: 16px;\n  padding-bottom: 16px;\n  position: relative;\n`;\n\nconst PanelTitle = styled.div`\n  line-height: 2.4;\n`;\n\nconst PanelLink = styled.a`\n  display: inline-block;\n  width: 80%;\n  img {\n    border-radius: 6px;\n    width: 120px;\n    height: 120px;\n    object-fit: cover;\n  }\n`;\n\nconst PanelItem = styled.div`\n  padding: 20px 20px 0;\n  width: 50%;\n  text-align: center;\n  justify-content: center;\n`;\n\nconst TabsPanelContent = styled.div`\n  display: flex;\n  flex-wrap: wrap;\n`;\n\nconst ATabs: FC<ITabsProConfig> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { tabs = ['\u5206\u7c7b\u4e00', '\u5206\u7c7b\u4e8c'], sourceData, ...rest } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <TabsWrapper>\n          <Tabs {...rest}>\n            {tabs.map((item, i) => {\n              return (\n                <Tabs.TabPane tab={item} key={i}>\n                  <TabsPanelContent>\n                    {sourceData\n                      .filter((item) => item.type === i)\n                      .map((_item, _i) => {\n                        return (\n                          <React.Fragment key={_i}>\n                            {_item.imgUrl.length >= 1 ? (\n                              <PanelItem key={_i}>\n                                <PanelLink href={_item.link} title={_item.desc}>\n                                  <Image\n                                    preview={false}\n                                    src={\n                                      _item.imgUrl[0]\n                                        ? _item.imgUrl[0].url\n                                        : 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png'\n                                    }\n                                    alt={_item.title}\n                                  />\n                                  <PanelTitle>{_item.title}</PanelTitle>\n                                </PanelLink>\n                              </PanelItem>\n                            ) : (\n                              <div\n                                key={_i}\n                                dangerouslySetInnerHTML={{\n                                  __html: _item.html\n                                    ? _item.html\n                                    : '<div></div>',\n                                }}\n                              />\n                            )}\n                          </React.Fragment>\n                        );\n                      })}\n                  </TabsPanelContent>\n                </Tabs.TabPane>\n              );\n            })}\n          </Tabs>\n        </TabsWrapper>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ATabs);\n",
        o = {
          editData: [
            { key: 'tabs', name: '\u9879\u76ee\u7c7b\u522b', type: 'MutiText' },
            {
              key: 'centered',
              name: '\u6807\u7b7e\u5c45\u4e2d\u5c55\u793a',
              type: 'Switch',
            },
            {
              key: 'size',
              name: '\u5927\u5c0f',
              type: 'Select',
              range: [
                { key: 'small', text: '\u5c0f\u53f7' },
                { key: 'middle', text: '\u4e2d\u7b49' },
                { key: 'large', text: '\u5927\u53f7' },
              ],
            },
            {
              key: 'tabBarGutter',
              name: 'tabs \u4e4b\u95f4\u7684\u95f4\u9699',
              type: 'Number',
            },
            {
              key: 'tabPosition',
              name: '\u9875\u7b7e\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'top', text: '\u9876\u90e8' },
                { key: 'right', text: '\u53f3\u4fa7' },
                { key: 'left', text: '\u5de6\u4fa7' },
                { key: 'bottom', text: '\u5e95\u90e8' },
              ],
            },
            {
              key: 'destroyInactiveTabPane',
              name: '\u88ab\u9690\u85cf\u65f6\u662f\u5426\u9500\u6bc1 DOM \u7ed3\u6784',
              type: 'Switch',
            },
            {
              key: 'type',
              name: '\u9875\u7b7e\u7684\u57fa\u672c\u6837\u5f0f',
              type: 'Select',
              range: [
                { key: 'line', text: 'line' },
                { key: 'card', text: 'card' },
                { key: 'editable-card', text: 'editable-card' },
              ],
            },
            {
              key: 'hideAdd',
              name: 'type="editable-card"\u4e0b\u662f\u5426\u9690\u85cf\u52a0\u53f7\u56fe\u6807',
              type: 'Switch',
            },
            { key: 'sourceData', name: '\u6570\u636e\u6e90', type: 'DataList' },
          ],
          config: {
            tabs: ['Tab 1', 'Tab 2'],
            centered: !1,
            size: 'middle',
            tabBarGutter: 30,
            tabPosition: 'top',
            destroyInactiveTabPane: !1,
            type: 'line',
            hideAdd: !1,
            sourceData: [
              {
                id: '1',
                title: 'Panel 1',
                desc: 'Panel Desc 1',
                link: 'xxxxx',
                type: 0,
                imgUrl: [
                  {
                    uid: '001',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
                  },
                ],
              },
              {
                id: '2',
                title: 'Panel 2',
                desc: 'Panel Desc 2',
                link: 'xxxxx',
                type: 0,
                imgUrl: [
                  {
                    uid: '001',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
                  },
                ],
              },
              {
                id: '3',
                title: 'Panel 3',
                desc: 'Panel Desc 3',
                link: 'xxxxx',
                type: 1,
                imgUrl: [
                  {
                    uid: '001',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://s1.ax1x.com/2023/01/15/pSQdf8U.png',
                  },
                ],
                html: '<button>Button</button>',
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    27439: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Tabs',
        h: 130,
        displayName: '\u5207\u6362\u9875\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    1765: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport { ITextConfig } from '@/materials/absolute-antd/base/Text/schema';\nimport styled from 'styled-components';\nimport { Image, Typography } from 'antd';\nimport logo from '../../../../assets/absolute/text.png';\n\n/*begin to delete*/\nexport interface ITextConfigProps extends ITextConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\ntype TTextSelectKeyType = 'left' | 'right' | 'center';\ntype TSelectDefaultType<KeyType> = KeyType;\n\nconst ATextWrapper = styled(Typography.Text)<{\n  $color: string;\n  $textAlign: TSelectDefaultType<TTextSelectKeyType>;\n  $fontSize: number;\n  $lineHeight: number;\n}>`\n  color: ${(props) => props.$color};\n  text-align: ${(props) => props.$textAlign};\n  font-size: ${(props) => props.$fontSize};\n  line-height: ${(props) => props.$lineHeight};\n`;\n\nconst AText: FC<ITextConfigProps> = (props: ITextConfigProps) => {\n  const { isTpl, ...restProps } = props;\n\n  const { textAlign, text, fontSize, color, lineHeight, ...rest } = restProps;\n\n  return (\n    <>\n      {isTpl ? (\n        <div>\n          <Image src={logo} alt=\"\" />\n        </div>\n      ) : (\n        <ATextWrapper\n          $color={color}\n          $lineHeight={lineHeight}\n          $fontSize={fontSize}\n          $textAlign={textAlign}\n          {...rest}\n        >\n          {text}\n        </ATextWrapper>\n      )}\n    </>\n  );\n};\n\nexport default memo(AText);\n",
        o = {
          editData: [
            { key: 'text', name: '\u6587\u5b57', type: 'Text' },
            {
              key: 'disabled',
              name: '\u7981\u7528\u6587\u672c',
              type: 'Switch',
            },
            {
              key: 'code',
              name: '\u6dfb\u52a0\u4ee3\u7801\u6837\u5f0f',
              type: 'Switch',
            },
            {
              key: 'delete',
              name: '\u5220\u9664\u7ebf\u6837\u5f0f',
              type: 'Switch',
            },
            { key: 'strong', name: '\u52a0\u7c97', type: 'Switch' },
            { key: 'italic', name: '\u659c\u4f53', type: 'Switch' },
            { key: 'mark', name: '\u6dfb\u52a0\u6807\u8bb0', type: 'Switch' },
            { key: 'underline', name: '\u4e0b\u5212\u7ebf', type: 'Switch' },
            { key: 'color', name: '\u989c\u8272', type: 'Color' },
            {
              key: 'fontSize',
              name: '\u5b57\u4f53\u5927\u5c0f',
              type: 'Number',
            },
            { key: 'indent', name: '\u9996\u884c\u7f29\u8fdb', type: 'Number' },
            { key: 'lineHeight', name: '\u884c\u9ad8', type: 'Number' },
            {
              key: 'textAlign',
              name: '\u5bf9\u9f50\u65b9\u5f0f',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
                { key: 'center', text: '\u5c45\u4e2d' },
              ],
            },
            { key: 'bgColor', name: '\u80cc\u666f\u989c\u8272', type: 'Color' },
            {
              key: 'padding',
              name: '\u586b\u5145\u95f4\u8ddd',
              type: 'Number',
            },
            { key: 'radius', name: '\u80cc\u666f\u5706\u89d2', type: 'Number' },
          ],
          config: {
            text: 'Hello World',
            disabled: !1,
            code: !1,
            delete: !1,
            strong: !0,
            italic: !1,
            underline: !1,
            mark: !0,
            color: 'rgba(60, 60, 60, 1)',
            fontSize: 14,
            indent: 20,
            lineHeight: 1.8,
            textAlign: 'left',
            bgColor: 'rgba(255, 255, 255, 0)',
            padding: 0,
            radius: 0,
          },
          templateStr: a,
        },
        r = o;
    },
    44053: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Text', h: 20, displayName: '\u6587\u672c\u7ec4\u4ef6' };
      t['default'] = a;
    },
    29677: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(84466),
        o = n(18006),
        r = n(86425),
        l = n(11799),
        i = n(14196),
        s = n(86326),
        c = n(438),
        d = n(60793),
        m = n(47544),
        p = n(85777),
        u = n(69825),
        g = n(82232),
        b = n(1765),
        y = {
          Alert: a.default,
          Carousel: o.default,
          Divider: r.default,
          Empty: l.default,
          Form: i.default,
          Header: s.default,
          Image: c.default,
          List: d.default,
          Paragraph: m.default,
          Qrcode: p.default,
          RichText: u.default,
          Tabs: g.default,
          Text: b.default,
        };
      t['default'] = y;
    },
    71894: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(77347),
        r = n(79302),
        l = n(80423),
        i = n(43906),
        s = n(19023),
        c = n(90470),
        d = n(80100),
        m = n(7862),
        p = n(69112),
        u = n(30108),
        g = n(79163),
        b = n(27439),
        y = n(44053),
        f = [
          o.default,
          r.default,
          l.default,
          i.default,
          s.default,
          c.default,
          d.default,
          m.default,
          p.default,
          u.default,
          g.default,
          b.default,
          y.default,
        ],
        h = f.map((e) => (0, a.Z)((0, a.Z)({}, e), {}, { category: 'base' }));
      t['default'] = h;
    },
    26984: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport { IButtonConfig } from '@/materials/absolute-antd/control/Button/schema';\nimport logo from '../../../../assets/absolute/Button.svg';\nimport { Button, Image } from 'antd';\nimport * as Icon from '@ant-design/icons';\n\n/*begin to delete*/\ninterface IButtonProProp extends IButtonConfig {\n  isTpl: boolean;\n  onClick?: (e: any) => void;\n}\n/*end to delete*/\n\nconst AButton: FC<IButtonProProp> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    text,\n    block,\n    danger,\n    disabled,\n    ghost,\n    href,\n    iconLocation,\n    icon,\n    loading,\n    shape,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={'Antd Button'} />\n        </div>\n      )}\n      {!isTpl && (\n        <Button\n          id='antd button'\n          block={block}\n          ghost={ghost}\n          danger={danger}\n          disabled={disabled}\n          loading={loading}\n          shape={shape}\n          onClick={props.onClick}\n        >\n          {icon.length > 0 &&\n            iconLocation === 'left' &&\n            /*<div dangerouslySetInnerHTML={{__html: icon}}/>*/\n            // @ts-ignore\n            React.createElement(Icon[icon])}\n          {text}\n          {icon.length > 0 &&\n            iconLocation === 'right' &&\n            // @ts-ignore\n            React.createElement(Icon[icon])}\n        </Button>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AButton);\n",
        o = {
          editData: [
            { key: 'text', name: '\u6587\u672c', type: 'Text' },
            {
              key: 'block',
              name: '\u5c06\u6309\u94ae\u5bbd\u5ea6\u8c03\u6574\u4e3a\u5176\u7236\u5bbd\u5ea6',
              type: 'Switch',
            },
            { key: 'danger', name: '\u5371\u9669\u6309\u94ae', type: 'Switch' },
            {
              key: 'disabled',
              name: '\u8bbe\u7f6e\u7981\u7528',
              type: 'Switch',
            },
            {
              key: 'ghost',
              name: '\u8bbe\u7f6e\u80cc\u666f\u900f\u660e',
              type: 'Switch',
            },
            { key: 'href', name: '\u8df3\u8f6c\u94fe\u63a5', type: 'Text' },
            { key: 'icon', name: '\u56fe\u6807', type: 'Text' },
            {
              key: 'iconLocation',
              name: 'icon\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u4fa7' },
                { key: 'right', text: '\u53f3\u4fa7' },
              ],
            },
            {
              key: 'loading',
              name: '\u8bbe\u7f6e\u6309\u94ae\u8f7d\u5165\u72b6\u6001',
              type: 'Switch',
            },
            {
              key: 'shape',
              name: '\u5f62\u72b6',
              type: 'Select',
              range: [
                { key: 'default', text: '\u9ed8\u8ba4' },
                { key: 'circle', text: '\u5706\u89d2' },
                { key: 'round', text: '\u534a\u5706' },
              ],
            },
          ],
          config: {
            text: 'Button',
            block: !1,
            danger: !1,
            disabled: !1,
            ghost: !1,
            href: 'xxxx',
            icon: 'SearchOutlined',
            iconLocation: 'left',
            loading: !1,
            shape: 'default',
          },
          templateStr: a,
        },
        r = o;
    },
    87422: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Button',
        h: 20,
        displayName: '\u6309\u94ae\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    2196: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useState } from 'react';\nimport { Checkbox, Image } from 'antd';\nimport logo from '../../../../assets/absolute/CheckBox.svg';\nimport { ICheckBoxConfig } from '@/materials/absolute-antd/control/CheckBox/schema';\n\n/*begin to delete*/\ninterface ICheckBoxProProps extends ICheckBoxConfig {\n  isTpl: boolean;\n  onChange?: (e: any) => void;\n}\n/*end to delete*/\n\nconst ACheckBox: FC<ICheckBoxProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { text, autoFocus, defaultChecked, disabled } = restProps;\n\n  const [checked, setChecked] = useState<boolean>(defaultChecked);\n\n  const handleChange = (e: any) => {\n    const check = e.target.checked;\n    setChecked(check);\n\n    props.onChange && props.onChange(check);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image src={logo} preview={false} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Checkbox\n            autoFocus={autoFocus}\n            checked={checked}\n            disabled={disabled}\n            onChange={(e) => handleChange(e)}\n          >\n            {text}\n          </Checkbox>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ACheckBox);\n",
        o = {
          editData: [
            { key: 'text', name: '\u6587\u672c', type: 'Text' },
            {
              key: 'autoFocus',
              name: '\u81ea\u52a8\u83b7\u5f97\u7126\u70b9',
              type: 'Switch',
            },
            {
              key: 'defaultChecked',
              name: '\u9ed8\u8ba4\u72b6\u6001',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
          ],
          config: {
            text: 'checkbox',
            autoFocus: !1,
            defaultChecked: !1,
            disabled: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    64975: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'CheckBox', h: 20, displayName: '' };
      t['default'] = a;
    },
    10309: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useEffect, useState } from 'react';\nimport logo from '../../../../assets/absolute/Radio.svg';\nimport { IRadioConfig } from '@/materials/absolute-antd/control/Radio/schema';\nimport { Image, Radio, RadioChangeEvent } from 'antd';\n\n/*begin to delete*/\ninterface IRadioProProps extends IRadioConfig {\n  isTpl: boolean;\n  onChange?: (e: Event) => void;\n}\n/*end to delete*/\n\nconst ARadio: FC<IRadioProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { type, buttonStyle, disabled, options, autoFocus } = restProps;\n\n  const [arr, setArr] = useState<string[]>([]);\n  const [value, setValue] = useState(0);\n\n  useEffect(() => {\n    const arr: string[] = options.split('-');\n    setArr(arr);\n  }, [options]);\n\n  const handleChange = ({ target: { value } }: RadioChangeEvent) => {\n    setValue(value);\n    props.onChange && props.onChange(value);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Radio.Group\n            buttonStyle={buttonStyle}\n            disabled={disabled}\n            onChange={(e) => handleChange(e)}\n            value={value}\n          >\n            {type === 'default'\n              ? arr.map((item, i) => (\n                  <Radio value={i} key={i} autoFocus={autoFocus}>\n                    {item}\n                  </Radio>\n                ))\n              : arr.map((item, j) => (\n                  <Radio.Button value={j} key={j} autoFocus={autoFocus}>\n                    {item}\n                  </Radio.Button>\n                ))}\n          </Radio.Group>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ARadio);\n",
        o = {
          editData: [
            {
              key: 'type',
              name: '\u9009\u9879\u7c7b\u578b',
              type: 'Select',
              range: [
                { key: 'default', text: '\u9ed8\u8ba4' },
                { key: 'button', text: '\u6309\u94ae' },
              ],
            },
            {
              key: 'buttonStyle',
              name: 'RadioButton \u7684\u98ce\u683c\u6837\u5f0f',
              type: 'Select',
              range: [
                { key: 'outline', text: '\u8fb9\u6846' },
                { key: 'solid', text: '\u6d41\u7ebf' },
              ],
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'options', name: '\u9009\u9879', type: 'TextArea' },
            {
              key: 'autoFocus',
              name: '\u81ea\u52a8\u805a\u7126',
              type: 'Switch',
            },
          ],
          config: {
            type: 'default',
            buttonStyle: 'outline',
            disabled: !1,
            options: 'a-b-c-d-e',
            autoFocus: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    42845: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Radio',
        h: 20,
        displayName: '\u5355\u9009\u6846\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    3567: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useEffect, useState } from 'react';\nimport { Image, Segmented } from 'antd';\nimport { ISegmentedConfig } from '@/materials/absolute-antd/control/Segmented/schema';\nimport logo from '../../../../assets/absolute/Segmented.svg';\nimport * as Icon from '@ant-design/icons';\n\n/*begin to delete*/\ninterface ISegmentedProProps extends ISegmentedConfig {\n  isTpl: boolean;\n  onChange?: (e: any) => void;\n}\n/*end to delete*/\n\nconst ASegmented: FC<ISegmentedProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { onlyIcon, block, disabled, label, icon } = restProps;\n\n  const [arr, setArr] = useState<any[]>([]);\n  const [icons, setIcons] = useState<any[]>([]);\n  const [value, setValue] = useState<string | number>();\n\n  useEffect(() => {\n    const labelArr = label.split('-');\n    const iconArr = icon.split('-');\n    //setIcons(iconArr);\n\n    const arr: any[] = [];\n    labelArr.map((item, i) => {\n      if (i + 1 <= iconArr.length) {\n        console.log(iconArr[i]);\n\n        const json = {\n          label: item,\n          value: item,\n          // @ts-ignore\n          icon: React.createElement(Icon[iconArr[i]]),\n        };\n        arr.push(json);\n      } else {\n        const json = {\n          label: item,\n          value: item,\n        };\n        arr.push(json);\n      }\n    });\n    //console.log(arr);\n    setArr(arr);\n  }, [label, icon]);\n\n  useEffect(() => {\n    const arr: any[] = [];\n    const iconArr = icon.split('-');\n    iconArr.map((item, i) => {\n      const json = {\n        value: item,\n        // @ts-ignore\n        icon: React.createElement(Icon[item]),\n      };\n      arr.push(json);\n    });\n    console.log(arr);\n    setIcons(arr);\n  }, [icon]);\n\n  const handleChange = (e: string | number) => {\n    //console.log(e)\n    setValue(e);\n\n    props.onChange && props.onChange(e);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          {onlyIcon && (\n            //@ts-ignore\n            <Segmented\n              options={icons}\n              block={block}\n              disabled={disabled}\n              onChange={(e) => handleChange(e)}\n              value={value}\n            />\n          )}\n          {!onlyIcon && (\n            //@ts-ignore\n            <Segmented\n              options={arr}\n              block={block}\n              disabled={disabled}\n              onChange={(e) => handleChange(e)}\n              value={value}\n            />\n          )}\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ASegmented);\n",
        o = {
          editData: [
            {
              key: 'onlyIcon',
              name: '\u53ea\u663e\u793a\u56fe\u6807',
              type: 'Switch',
            },
            {
              key: 'block',
              name: '\u5bbd\u5ea6\u8c03\u6574\u4e3a\u7236\u5143\u7d20\u5bbd\u5ea6',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'label', name: '\u5185\u5bb9', type: 'TextArea' },
            { key: 'icon', name: '\u56fe\u6807', type: 'TextArea' },
          ],
          config: {
            onlyIcon: !1,
            block: !1,
            disabled: !1,
            label: 'a-b-c-d',
            icon: 'BarsOutlined-AppstoreOutlined',
          },
          templateStr: a,
        },
        r = o;
    },
    6443: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Segmented',
        h: 25,
        displayName: '\u5206\u6bb5\u63a7\u5236\u5668\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    42457: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useEffect, useState } from 'react';\nimport { Select, Image, Tag } from 'antd';\nimport type { CustomTagProps } from 'rc-select/lib/BaseSelect';\nimport * as Icon from '@ant-design/icons';\nimport logo from '../../../../assets/absolute/Select.svg';\nimport { ISelectConfig } from '@/materials/absolute-antd/control/Select/schema';\n\nconst { Option } = Select;\n\n/*begin to delete*/\ninterface ISelectProProps extends ISelectConfig {\n  isTpl: boolean;\n  onChange?: (e: any) => void;\n}\n/*end to delete*/\n\nconst tagRender = (props: CustomTagProps) => {\n  const { label, closable, onClose } = props;\n  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {\n    event.preventDefault();\n    event.stopPropagation();\n  };\n\n  const colors = [\n    { value: 'gold' },\n    { value: 'lime' },\n    { value: 'green' },\n    { value: 'cyan' },\n  ];\n  const [color, setColor] = useState(\n    Math.floor(Math.random() * (3 - 0 + 1)) + 0,\n  );\n\n  return (\n    <Tag\n      color={colors[color].value}\n      onMouseDown={onPreventMouseDown}\n      closable={closable}\n      onClose={onClose}\n      style={{ marginRight: 3 }}\n    >\n      {label}\n    </Tag>\n  );\n};\n\nconst ASelect: FC<ISelectProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    options,\n    allowClear,\n    autoFocus,\n    bordered,\n    clearIcon,\n    defaultActiveFirstOption,\n    defaultOpen,\n    disabled,\n    listHeight,\n    loading,\n    maxTagCount,\n    maxTagPlaceholder,\n    maxTagTextLength,\n    mode,\n    placeholder,\n    placement,\n    showArrow,\n    showSearch,\n    suffixIcon,\n    virtual,\n  } = restProps;\n\n  const [option, setOption] = useState<string[]>([]);\n  const [value, setValue] = useState<any>();\n\n  useEffect(() => {\n    const arr = options.split('-');\n    setOption(arr);\n    console.log(arr);\n  }, [options]);\n\n  const handleChange = (e: string[]) => {\n    // console.log(`selected ${e}`);\n    setValue(e);\n    props.onChange && props.onChange(e);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Select\n            value={value}\n            tagRender={tagRender}\n            style={{ width: '100%' }}\n            placeholder={placeholder}\n            placement={placement}\n            mode={mode}\n            allowClear={allowClear}\n            autoFocus={autoFocus}\n            // @ts-ignore\n            clearIcon={React.createElement(Icon[clearIcon])}\n            bordered={bordered}\n            defaultActiveFirstOption={defaultActiveFirstOption}\n            defaultOpen={defaultOpen}\n            disabled={disabled}\n            listHeight={listHeight}\n            loading={loading}\n            maxTagTextLength={maxTagTextLength}\n            maxTagCount={maxTagCount}\n            maxTagPlaceholder={maxTagPlaceholder}\n            showArrow={showArrow}\n            showSearch={showSearch}\n            // @ts-ignore\n            suffixIcon={React.createElement(Icon[suffixIcon])}\n            virtual={virtual}\n            onChange={handleChange}\n          >\n            {option.map((item, i) => (\n              <Option value={item} label={item} key={i}>\n                {item}\n              </Option>\n            ))}\n          </Select>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\nexport default memo(ASelect);\n",
        o = {
          editData: [
            { key: 'options', name: '\u5185\u5bb9', type: 'TextArea' },
            {
              key: 'allowClear',
              name: '\u652f\u6301\u6e05\u9664',
              type: 'Switch',
            },
            {
              key: 'autoFocus',
              name: '\u9ed8\u8ba4\u83b7\u53d6\u7126\u70b9',
              type: 'Switch',
            },
            { key: 'bordered', name: '\u8fb9\u6846', type: 'Switch' },
            {
              key: 'clearIcon',
              name: '\u591a\u9009\u6846\u6e05\u7a7a\u56fe\u6807',
              type: 'Text',
            },
            {
              key: 'defaultActiveFirstOption',
              name: '\u9ed8\u8ba4\u9ad8\u4eae\u7b2c\u4e00\u4e2a\u9009\u9879',
              type: 'Switch',
            },
            {
              key: 'defaultOpen',
              name: '\u9ed8\u8ba4\u5c55\u5f00\u4e0b\u62c9\u83dc\u5355',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            {
              key: 'listHeight',
              name: '\u5f39\u7a97\u6eda\u52a8\u9ad8\u5ea6',
              type: 'Number',
            },
            {
              key: 'loading',
              name: '\u52a0\u8f7d\u4e2d\u72b6\u6001',
              type: 'Switch',
            },
            {
              key: 'maxTagCount',
              name: '\u6700\u591a\u663e\u793a\u591a\u5c11\u4e2a tag',
              type: 'Number',
            },
            {
              key: 'maxTagPlaceholder',
              name: '\u9690\u85cf tag \u65f6\u663e\u793a\u7684\u5185\u5bb9',
              type: 'Text',
            },
            {
              key: 'maxTagTextLength',
              name: '\u6700\u5927\u663e\u793a\u7684 tag \u6587\u672c\u957f\u5ea6',
              type: 'Number',
            },
            {
              key: 'mode',
              name: '\u6a21\u5f0f',
              type: 'Select',
              range: [
                { key: 'multiple', text: '\u591a\u9009' },
                { key: 'tags', text: '\u6807\u7b7e' },
              ],
            },
            {
              key: 'placeholder',
              name: '\u9ed8\u8ba4\u6587\u672c',
              type: 'Text',
            },
            {
              key: 'placement',
              name: '\u9009\u62e9\u6846\u5f39\u51fa\u7684\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'bottomLeft', text: '\u5de6\u4e0b' },
                { key: 'bottomRight', text: '\u53f3\u4e0b' },
                { key: 'topLeft', text: '\u5de6\u4e0a' },
                { key: 'topRight', text: '\u53f3\u4e0a' },
              ],
            },
            {
              key: 'showArrow',
              name: '\u662f\u5426\u663e\u793a\u4e0b\u62c9\u5c0f\u7bad\u5934',
              type: 'Switch',
            },
            {
              key: 'showSearch',
              name: '\u914d\u7f6e\u662f\u5426\u53ef\u641c\u7d22',
              type: 'Switch',
            },
            {
              key: 'suffixIcon',
              name: '\u81ea\u5b9a\u4e49\u7684\u9009\u62e9\u6846\u540e\u7f00\u56fe\u6807',
              type: 'Text',
            },
            {
              key: 'virtual',
              name: '\u865a\u62df\u6eda\u52a8',
              type: 'Switch',
            },
          ],
          config: {
            options: 'aaaa-bbbb-cccc-d-e-f-g',
            allowClear: !0,
            autoFocus: !1,
            bordered: !0,
            clearIcon: 'MinusCircleOutlined',
            defaultActiveFirstOption: !0,
            defaultOpen: !1,
            disabled: !1,
            listHeight: 256,
            loading: !1,
            maxTagCount: 5,
            maxTagPlaceholder: '...',
            maxTagTextLength: 3,
            mode: 'multiple',
            placeholder: '\u8bf7\u9009\u62e9...',
            placement: 'bottomLeft',
            showArrow: !0,
            showSearch: !0,
            suffixIcon: 'MinusCircleOutlined',
            virtual: !0,
          },
          templateStr: a,
        },
        r = o;
    },
    2654: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Select',
        h: 25,
        displayName: '\u9009\u62e9\u5668\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    12300: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useCallback, useEffect, useState } from 'react';\nimport logo from '../../../../assets/absolute/Silder.svg';\nimport { ISlideConfig } from '@/materials/absolute-antd/control/Slider/schema';\nimport { Image, Slider } from 'antd';\n\n/*begin to delete*/\ninterface ISlideProProps extends ISlideConfig {\n  isTpl: boolean;\n  onChange?: (e: any) => void;\n}\n/*end to delete*/\n\nconst ASlider: FC<ISlideProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    allowClear,\n    defaultValue,\n    disabled,\n    dots,\n    included,\n    marks = '0-26-37-80',\n    min,\n    max,\n    range,\n    reverse,\n    step,\n  } = restProps;\n\n  const [value, setValue] = useState<number | [number, number]>();\n  const [mark, setMark] = useState<{ [key: number]: string }>();\n\n  useEffect(() => {\n    if (!range) {\n      setValue(defaultValue[0]);\n    } else {\n      // @ts-ignore\n      setValue([defaultValue[0], defaultValue[1]]);\n    }\n  }, [range, defaultValue]);\n\n  const handleChange = useCallback((e: any) => {\n    //console.log(e)\n    setValue(e);\n    props.onChange && props.onChange(e);\n  }, []);\n\n  useEffect(() => {\n    const arr = marks.split('-');\n    let json: { [key: number]: string } = {};\n\n    arr.map((item, i) => {\n      json[Number(item)] = item;\n    });\n\n    //console.log(json)\n    setMark(json);\n  }, [marks]);\n\n  // @ts-ignore\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Slider\n            value={value}\n            disabled={disabled}\n            dots={dots}\n            included={included}\n            marks={mark}\n            min={min}\n            max={max}\n            range={range}\n            reverse={reverse}\n            step={step === 0 ? null : step}\n            onChange={handleChange}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ASlider);\n",
        o = {
          editData: [
            {
              key: 'allowClear',
              name: '\u652f\u6301\u6e05\u9664',
              type: 'Switch',
            },
            { key: 'defaultValue', name: '\u9ed8\u8ba4\u503c', type: 'Pos' },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            {
              key: 'dots',
              name: '\u662f\u5426\u53ea\u80fd\u62d6\u62fd\u5230\u523b\u5ea6\u4e0a',
              type: 'Switch',
            },
            {
              key: 'included',
              name: '\u662f\u5426\u4e3a\u5305\u542b\u5173\u7cfb',
              type: 'Switch',
            },
            { key: 'min', name: '\u6700\u5c0f\u503c', type: 'Number' },
            { key: 'max', name: '\u6700\u5927\u503c', type: 'Number' },
            {
              key: 'range',
              name: '\u53cc\u6ed1\u5757\u6a21\u5f0f',
              type: 'Switch',
            },
            {
              key: 'reverse',
              name: '\u53cd\u8f6c\u5750\u6807\u7cfb',
              type: 'Switch',
            },
            { key: 'step', name: '\u6b65\u957f', type: 'Number' },
          ],
          config: {
            allowClear: !0,
            defaultValue: [20, 50],
            disabled: !1,
            dots: !0,
            included: !0,
            marks: '0-26-37-80',
            min: 0,
            max: 100,
            range: !0,
            reverse: !1,
            step: 0,
          },
          templateStr: a,
        },
        r = o;
    },
    14769: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Slider',
        h: 20,
        displayName: '\u6ed1\u52a8\u8f93\u5165\u6761\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    2927: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useCallback, useEffect, useState } from 'react';\nimport logo from '../../../../assets/absolute/Switch.svg';\nimport { Image, Switch } from 'antd';\nimport { ISwitchConfig } from '@/materials/absolute-antd/control/Switch/schema';\n\n/*begin to delete*/\ninterface ISwitchProProps extends ISwitchConfig {\n  isTpl: boolean;\n  onChange?: (e: any) => void;\n}\n/*end to delete*/\n\nconst ASwitch: FC<ISwitchProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { autoFocus, defaultChecked, disabled, loading } = restProps;\n\n  const [checked, setChecked] = useState<boolean>(defaultChecked);\n\n  const handleChange = useCallback((e: any) => {\n    setChecked(e);\n\n    props.onChange && props.onChange(e);\n  }, []);\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Switch\n            autoFocus={autoFocus}\n            disabled={disabled}\n            loading={loading}\n            checked={checked}\n            onChange={handleChange}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ASwitch);\n",
        o = {
          editData: [
            {
              key: 'autoFocus',
              name: '\u81ea\u52a8\u83b7\u53d6\u7126\u70b9',
              type: 'Switch',
            },
            {
              key: 'defaultChecked',
              name: '\u9ed8\u8ba4\u9009\u4e2d',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            {
              key: 'loading',
              name: '\u52a0\u8f7d\u4e2d\u7684\u5f00\u5173',
              type: 'Switch',
            },
          ],
          config: {
            autoFocus: !1,
            defaultChecked: !1,
            disabled: !1,
            loading: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    48170: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Switch',
        h: 20,
        displayName: '\u5f00\u5173\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    13446: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(26984),
        o = n(2196),
        r = n(10309),
        l = n(3567),
        i = n(42457),
        s = n(12300),
        c = n(2927),
        d = {
          Button: a.default,
          CheckBox: o.default,
          Radio: r.default,
          Segmented: l.default,
          Select: i.default,
          Slider: s.default,
          Switch: c.default,
        };
      t['default'] = d;
    },
    47143: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(87422),
        r = n(64975),
        l = n(42845),
        i = n(6443),
        s = n(2654),
        c = n(14769),
        d = n(48170),
        m = [
          o.default,
          r.default,
          l.default,
          i.default,
          s.default,
          c.default,
          d.default,
        ],
        p = m.map((e) =>
          (0, a.Z)((0, a.Z)({}, e), {}, { category: 'control' }),
        );
      t['default'] = p;
    },
    72195: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport ReactAudioPlayer from 'react-audio-player';\nimport logo from '../../../../assets/absolute/music@2x.png';\nimport { Image } from 'antd';\nimport styled from 'styled-components';\nimport { IAudioConfig } from '@/materials/absolute-antd/media/Audio/schema';\n\nconst AudioWrapper = styled.div`\n  height: 100%;\n  display: flex;\n  align-items: center;\n`;\n\n/*begin to delete*/\ninterface IAudioProps extends IAudioConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AAudio: FC<IAudioProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { height, url } = restProps;\n\n  return (\n    <>\n      {isTpl ? (\n        <div>\n          <Image\n            src={logo}\n            style={{ width: '100%' }}\n            alt=\"h5-dooring\u97f3\u9891\u64ad\u653e\u7ec4\u4ef6\"\n            preview={false}\n          />\n        </div>\n      ) : (\n        <AudioWrapper>\n          <ReactAudioPlayer\n            src={url}\n            autoPlay={false}\n            controls\n            style={{\n              width: '100%',\n              height: height + 'px',\n            }}\n          />\n        </AudioWrapper>\n      )}\n    </>\n  );\n};\n\nexport default memo(AAudio);\n",
        o = {
          editData: [
            { key: 'height', name: '\u97f3\u9891\u9ad8\u5ea6', type: 'Number' },
            { key: 'url', name: '\u97f3\u9891\u94fe\u63a5', type: 'Text' },
          ],
          config: { height: 32, url: 'http://io.nainor.com/audio.mp3' },
          templateStr: a,
        },
        r = o;
    },
    1952: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Audio', h: 48, displayName: '\u97f3\u9891\u7ec4\u4ef6' };
      t['default'] = a;
    },
    64829: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useEffect, useRef, useState } from 'react';\nimport { Calendar, Image } from 'antd';\nimport styled from 'styled-components';\nimport { ICalendarConfig } from '@/materials/absolute-antd/media/Calendar/schema';\nimport logo from '../../../../assets/absolute/calend.png';\nimport moment, { Moment } from 'moment';\n\n/*begin to delete*/\ninterface ICalendarPropProps extends ICalendarConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst CalendarWrapper = styled.div`\n  position: relative;\n  // height: 100%;\n  overflow: hidden;\n  background-color: #fff;\n  :global(.za-calendar__month) {\n    color: var(--color) !important;\n  }\n  :global(.za-calendar__day--today .za-calendar__day__content) {\n    color: var(--selectColor);\n    background-color: rgba(255, 255, 255, 0.3);\n  }\n  :global(.za-calendar__day--selected .za-calendar__day__content) {\n    background-color: var(--selectColor) !important;\n  }\n  :global(.za-calendar__day--range .za-calendar__day__content),\n  :global(.za-calendar__day--range),\n  :global(.za-calendar__day--selected .za-calendar__day__content) {\n    background-color: var(--selectBgColor) !important;\n    background-image: linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0) 0,\n      rgba(0, 0, 0, 0) 50%,\n      var(--selectBgColor) 0\n    ) !important;\n  }\n  :global(.za-calendar__day--range) {\n    color: rgba(255, 255, 255, 0.7) !important;\n    :global(.za-calendar__day__content) {\n      color: rgba(255, 255, 255, 0.7) !important;\n    }\n  }\n  :global(.za-calendar__day.range-start),\n  :global(.za-calendar__day.range-end) {\n    :global(.za-calendar__day__content) {\n      color: rgba(255, 255, 255, 1) !important;\n    }\n  }\n  :global(\n      .za-calendar__day.range-start:not(.range-end):not(.d6):not(:last-child)\n    ) {\n    background-image: linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0) 0,\n      rgba(0, 0, 0, 0) 50%,\n      var(--selectBgColor) 0\n    ) !important;\n  }\n  :global(\n      .za-calendar__day.range-end:not(.range-start):not(.d7):not(:first-child)\n    ) {\n    background-image: linear-gradient(\n      -90deg,\n      rgba(0, 0, 0, 0) 0,\n      rgba(0, 0, 0, 0) 50%,\n      var(--selectBgColor) 0\n    ) !important;\n  }\n`;\n\nconst ACalendar: FC<ICalendarPropProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { time, range, color, fullscreen, selectedColor, round, width } =\n    restProps;\n\n  const [value, setValue] = useState<Moment>(() => moment(time));\n  const [dRange, setDRange] = useState<[Moment, Moment]>();\n  const boxRef = useRef<any>(null);\n\n  useEffect(() => {\n    const realRange: string[] = range.split(',');\n    const min: Moment = moment(realRange[0]);\n    const max: Moment = moment(realRange[1]);\n    setDRange([min, max]);\n  }, [range]);\n\n  useEffect(() => {\n    if (boxRef.current) {\n      boxRef.current.style.setProperty('--color', color);\n      boxRef.current.style.setProperty('--selectColor', selectedColor);\n      boxRef.current.style.setProperty('--selectBgColor', selectedColor);\n    }\n  }, []);\n\n  const isEditorPage = window.location.pathname.indexOf('editor') > -1;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <CalendarWrapper\n          style={{\n            pointerEvents: isEditorPage ? 'none' : 'initial',\n            width: width === 0 ? '100%' : width + 'px',\n            border: '1px solid #f0f0f0',\n            borderRadius: round + 'px',\n          }}\n          ref={boxRef}\n        >\n          <Calendar\n            value={value}\n            validRange={dRange}\n            fullscreen={fullscreen}\n            onChange={(value: Moment) => {\n              setValue(value);\n            }}\n          />\n        </CalendarWrapper>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ACalendar);\n",
        o = {
          editData: [
            {
              key: 'time',
              name: '\u65e5\u5386\u65f6\u95f4',
              type: 'Text',
              placeholder: '\u683c\u5f0f\u4e3a2023-01-01 \u6216 2023-12-30',
            },
            {
              key: 'range',
              name: '\u65e5\u5386\u9009\u4e2d\u8303\u56f4',
              type: 'Text',
              placeholder:
                '\u683c\u5f0f\u598201-12(\u51e0\u53f7\u5230\u51e0\u53f7)',
            },
            { key: 'width', name: '\u5bbd\u5ea6', type: 'Number' },
            { key: 'color', name: '\u6587\u672c\u989c\u8272', type: 'Color' },
            {
              key: 'selectedColor',
              name: '\u9009\u4e2d\u989c\u8272',
              type: 'Color',
            },
            {
              key: 'fullscreen',
              name: '\u5168\u5c4f\u663e\u793a',
              type: 'Switch',
            },
            { key: 'round', name: '\u5706\u89d2', type: 'Number' },
          ],
          config: {
            time: '2023-01-21',
            range: '2022-01-01,2023-12-30',
            width: 300,
            color: 'rgba(0,0,0,1)',
            selectedColor: 'rgba(22,40,212,1)',
            fullscreen: !1,
            round: 10,
          },
          templateStr: a,
        },
        r = o;
    },
    50796: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Calendar',
        h: 185,
        displayName: '\u65e5\u5386\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    63666: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport { Map, Marker, Label, APILoader } from '@uiw/react-baidu-map';\nimport styled from 'styled-components';\nimport logo from '../../../../assets/absolute/map@2x.png';\nimport { Image } from 'antd';\nimport { IMapConfig } from '@/materials/absolute-antd/media/Map/schema';\n\n/*begin to delete*/\nexport interface IMapProProps extends IMapConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst MapWrapper = styled.div`\n  height: 100%;\n  display: flex;\n  align-items: center;\n  & > div {\n    width: 100%;\n  }\n`;\n\nconst MapLabel = styled(Label)`\n  color: #000;\n  border-color: #06c;\n  padding: 3px 10px;\n  border-radius: 6px;\n`;\n\nconst AMap: FC<IMapProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { ak, location, position } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image\n            preview={false}\n            src={logo}\n            style={{ width: '100%' }}\n            alt=\"\u5730\u56fe\u7ec4\u4ef6\"\n          />\n        </div>\n      )}\n      {!isTpl && (\n        <MapWrapper>\n          {/*@ts-ignore*/}\n          <APILoader akay={ak}>\n            <Map widget={['NavigationControl']} zoom={13}>\n              <Marker\n                animation={2}\n                position={{\n                  lng: Number(position[0]),\n                  lat: Number(position[1]),\n                }}\n              />\n              <MapLabel\n                content={location}\n                position={{\n                  lng: Number(position[0]),\n                  lat: Number(position[1]),\n                }}\n              />\n            </Map>\n          </APILoader>\n        </MapWrapper>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AMap);\n",
        o = {
          editData: [
            { key: 'ak', name: '\u767e\u5ea6\u5730\u56feAK', type: 'Text' },
            {
              key: 'position',
              name: '\u7ecf\u7eac\u5ea6',
              type: 'Pos',
              placeObj: {
                text: '\u4f7f\u7528\u767e\u5ea6\u62fe\u53d6\u5750\u6807\u7cfb\u83b7\u53d6\u5750\u6807',
                link: 'http://api.map.baidu.com/lbsapi/getpoint/index.html',
              },
            },
            { key: 'location', name: '\u5730\u5740', type: 'TextArea' },
          ],
          config: {
            ak: '\u4f60\u7684\u767e\u5ea6\u5730\u56feak',
            position: [121.444017, 31.237787],
            location: '\u4e0a\u6d77\u5e02',
          },
          templateStr: a,
        },
        r = o;
    },
    62991: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Map', h: 120, displayName: '\u5730\u56fe\u7ec4\u4ef6' };
      t['default'] = a;
    },
    13333: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useCallback, useState } from 'react';\nimport logo from '../../../../assets/absolute/Progress.svg';\nimport { Image, Progress } from 'antd';\nimport { IProgressConfig } from '@/materials/absolute-antd/media/Progress/schema';\n\n/*begin to delete*/\ninterface IProgressProProps extends IProgressConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AProgress: FC<IProgressProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    percent,\n    text,\n    showInfo,\n    type,\n    status,\n    strokeColor,\n    strokeLinecap,\n    trailColor,\n    steps,\n    strokeWidth,\n    circleWidth,\n    gapDegree,\n    gapPosition,\n    dashboardWidth,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && type === 'line' && (\n        <div>\n          <Progress\n            percent={percent}\n            type=\"line\"\n            format={(percent) => `${percent} ${text}`}\n            showInfo={showInfo}\n            status={status}\n            strokeLinecap={strokeLinecap}\n            strokeColor={strokeColor}\n            trailColor={trailColor}\n            steps={steps}\n            strokeWidth={strokeWidth}\n          />\n        </div>\n      )}\n      {!isTpl && type === 'circle' && (\n        <div>\n          <Progress\n            percent={percent}\n            type=\"circle\"\n            format={(percent) => `${percent} ${text}`}\n            showInfo={showInfo}\n            strokeLinecap={strokeLinecap}\n            strokeColor={strokeColor}\n            trailColor={trailColor}\n            strokeWidth={strokeWidth}\n            width={circleWidth}\n          />\n        </div>\n      )}\n      {!isTpl && type === 'dashboard' && (\n        <div>\n          <Progress\n            percent={percent}\n            type=\"dashboard\"\n            format={(percent) => `${percent} ${text}`}\n            showInfo={showInfo}\n            strokeLinecap={strokeLinecap}\n            strokeColor={strokeColor}\n            trailColor={trailColor}\n            strokeWidth={strokeWidth}\n            gapDegree={gapDegree}\n            gapPosition={gapPosition}\n            width={dashboardWidth}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AProgress);\n",
        o = {
          editData: [
            { key: 'text', name: '\u6587\u672c', type: 'Text' },
            {
              key: 'percent',
              name: '\u5f53\u524d\u767e\u5206\u6bd4',
              type: 'Number',
            },
            {
              key: 'showInfo',
              name: '\u662f\u5426\u663e\u793a\u8fdb\u5ea6\u6570\u503c\u6216\u72b6\u6001\u56fe\u6807',
              type: 'Switch',
            },
            {
              key: 'type',
              name: '\u8fdb\u5ea6\u6761\u7c7b\u578b',
              type: 'Select',
              range: [
                { key: 'line', text: '\u7ebf\u6761' },
                { key: 'circle', text: '\u5706\u5f62' },
                { key: 'dashboard', text: '\u4eea\u8868\u76d8' },
              ],
            },
            {
              key: 'status',
              name: '\u72b6\u6001',
              type: 'Select',
              range: [
                { key: 'success', text: 'success' },
                { key: 'exception', text: 'exception' },
                { key: 'normal', text: 'normal' },
                { key: 'active', text: 'active' },
              ],
            },
            {
              key: 'strokeColor',
              name: '\u8fdb\u5ea6\u6761\u7684\u8272\u5f69',
              type: 'Color',
            },
            {
              key: 'strokeLinecap',
              name: '\u8fdb\u5ea6\u6761\u7684\u6837\u5f0f',
              type: 'Select',
              range: [
                { key: 'round', text: 'round' },
                { key: 'butt', text: 'butt' },
                { key: 'square', text: 'square' },
              ],
            },
            {
              key: 'trailColor',
              name: '\u672a\u5b8c\u6210\u7684\u5206\u6bb5\u7684\u989c\u8272',
              type: 'Color',
            },
            {
              key: 'strokeWidth',
              name: '\u8fdb\u5ea6\u6761\u7ebf\u7684\u5bbd\u5ea6',
              type: 'Number',
            },
            {
              key: 'steps',
              name: 'line\u72b6\u6001\u4e0b\u8fdb\u5ea6\u6761\u603b\u5171\u6b65\u6570',
              type: 'Number',
            },
            {
              key: 'circleWidth',
              name: 'circle\u72b6\u6001\u4e0b\u753b\u5e03\u5bbd\u5ea6',
              type: 'Number',
            },
            {
              key: 'gapDegree',
              name: 'dashboard\u8fdb\u5ea6\u6761\u7f3a\u53e3\u89d2\u5ea6',
              type: 'Number',
            },
            {
              key: 'gapPosition',
              name: 'dashboard\u7f3a\u53e3\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'top', text: '\u9876\u90e8' },
                { key: 'bottom', text: '\u5e95\u90e8' },
                { key: 'left', text: '\u5de6\u4fa7' },
                { key: 'right', text: '\u53f3\u4fa7' },
              ],
            },
            {
              key: 'dashboardWidth',
              name: 'dashboard\u72b6\u6001\u4e0b\u753b\u5e03\u5bbd\u5ea6',
              type: 'Number',
            },
          ],
          config: {
            text: '%',
            percent: 20,
            showInfo: !0,
            type: 'line',
            status: 'success',
            strokeColor: 'rgb(60,129,239)',
            strokeLinecap: 'round',
            trailColor: 'rgb(201,199,199)',
            steps: 0,
            strokeWidth: 6,
            circleWidth: 132,
            gapDegree: 75,
            gapPosition: 'bottom',
            dashboardWidth: 132,
          },
          templateStr: a,
        },
        r = o;
    },
    32457: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Progress',
        h: 102,
        displayName: '\u8fdb\u5ea6\u6761\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    6556: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport './index.css';\nimport { Player, BigPlayButton } from 'video-react';\nimport logo from '../../../../assets/absolute/video.png';\nimport { Image } from 'antd';\nimport { IVideoConfig } from '@/materials/absolute-antd/media/Video/schema';\n\n/*begin to delete*/\ninterface IVideoProProps extends IVideoConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AVideo: FC<IVideoProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { poster, url } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image src={logo} alt={''} preview={false} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Player\n            playsInline\n            poster={poster[0].url}\n            src={\n              url ||\n              'https://gossv.vcg.com/cmsUploadVideo/creative/1\u79fb\u8f74/7\u6708\u79fb\u8f74.mp4'\n            }\n          >\n            <BigPlayButton position=\"center\" />\n          </Player>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AVideo);\n",
        o = {
          editData: [
            { key: 'poster', name: '\u89c6\u9891\u5c01\u9762', type: 'Upload' },
            { key: 'url', name: '\u89c6\u9891\u94fe\u63a5', type: 'Text' },
          ],
          config: {
            poster: [
              {
                uid: '001',
                name: 'image.png',
                status: 'done',
                url: 'http://49.234.61.19/uploads/1_1740c6fbcd9.png',
              },
            ],
            url: '',
          },
          templateStr: a,
        },
        r = o;
    },
    10482: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Video',
        h: 107,
        displayName: '\u89c6\u9891\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    80823: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(72195),
        o = n(64829),
        r = n(63666),
        l = n(13333),
        i = n(6556),
        s = {
          Audio: a.default,
          Calendar: o.default,
          Map: r.default,
          Progress: l.default,
          Video: i.default,
        };
      t['default'] = s;
    },
    48848: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(1952),
        r = n(50796),
        l = n(62991),
        i = n(32457),
        s = n(10482),
        c = [o.default, r.default, l.default, i.default, s.default],
        d = c.map((e) => (0, a.Z)((0, a.Z)({}, e), {}, { category: 'media' }));
      t['default'] = d;
    },
    97016: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(29677),
        r = n(13446),
        l = n(80823),
        i = n(86759),
        s = (0, a.Z)(
          (0, a.Z)((0, a.Z)((0, a.Z)({}, o.default), r.default), l.default),
          i.default,
        );
      t['default'] = s;
    },
    17349: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, ReactNode, useEffect, useState } from 'react';\nimport logo from '../../../../assets/absolute/Card.svg';\nimport { Image, Card, Avatar } from 'antd';\nimport { ICardConfig } from '@/materials/absolute-antd/social/Card/schema';\nimport * as Icon from '@ant-design/icons';\n\nconst { Meta } = Card;\n\n/*begin to delete*/\ninterface ICardProProps extends ICardConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst ACard: FC<ICardProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    actions,\n    width,\n    bordered,\n    coverUrl,\n    hoverable,\n    loading,\n    title,\n    avatarUrl,\n    description,\n  } = restProps;\n\n  const [action, setAction] = useState<ReactNode[]>();\n\n  useEffect(() => {\n    const arr = actions.split('-');\n    const icons: ReactNode[] = [];\n\n    arr.map((item) => {\n      // @ts-ignore\n      icons.push(React.createElement(Icon[item]));\n    });\n    setAction(icons);\n  }, []);\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Card\n            actions={action}\n            hoverable={hoverable}\n            loading={loading}\n            bordered={bordered}\n            style={{ width: width }}\n            cover={<img alt={''} src={coverUrl} />}\n          >\n            <Meta\n              title={title}\n              description={description}\n              avatar={<Avatar src={avatarUrl} />}\n            />\n          </Card>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ACard);\n",
        o = {
          editData: [
            {
              key: 'actions',
              name: '\u4f4d\u4e8e\u5e95\u90e8\u7684\u5361\u7247\u64cd\u4f5c\u7ec4',
              type: 'TextArea',
            },
            { key: 'width', name: '\u5bbd\u5ea6', type: 'Number' },
            {
              key: 'bordered',
              name: '\u662f\u5426\u6709\u8fb9\u6846',
              type: 'Switch',
            },
            { key: 'coverUrl', name: '\u5c01\u9762url', type: 'Text' },
            {
              key: 'hoverable',
              name: '\u9f20\u6807\u79fb\u8fc7\u65f6\u53ef\u6d6e\u8d77',
              type: 'Switch',
            },
            {
              key: 'loading',
              name: '\u52a0\u8f7d\u4e2d\u662f\u5426\u5360\u4f4d',
              type: 'Switch',
            },
            { key: 'title', name: '\u6807\u9898', type: 'Text' },
            { key: 'avatarUrl', name: '\u5934\u50cfurl', type: 'Text' },
            {
              key: 'description',
              name: '\u5361\u7247\u63cf\u8ff0',
              type: 'TextArea',
            },
          ],
          config: {
            actions: 'SettingOutlined-EditOutlined-EllipsisOutlined',
            width: 300,
            bordered: !0,
            coverUrl:
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            hoverable: !1,
            loading: !1,
            title: 'Card Title',
            avatarUrl: 'https://joeschmoe.io/api/v1/random',
            description: 'This is the description',
          },
          templateStr: a,
        },
        r = o;
    },
    11146: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Card', h: 185, displayName: '\u5361\u7247\u7ec4\u4ef6' };
      t['default'] = a;
    },
    56894: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo } from 'react';\nimport logo from '../../../../assets/absolute/Collapse.svg';\nimport { Collapse, Image } from 'antd';\nimport { ICollapseConfig } from '@/materials/absolute-antd/social/Collapse/schema';\n\nconst { Panel } = Collapse;\n\n/*begin to delete*/\ninterface ICollapseProProps extends ICollapseConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst ACollapse: FC<ICollapseProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    accordion,\n    bordered,\n    collapsible,\n    destroyInactivePanel,\n    expandIconPosition,\n    ghost,\n    forceRender,\n    showArrow,\n    panelList,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Collapse\n            accordion={accordion}\n            bordered={bordered}\n            collapsible={collapsible}\n            destroyInactivePanel={destroyInactivePanel}\n            expandIconPosition={expandIconPosition}\n            ghost={ghost}\n          >\n            {panelList.map((item, i) => {\n              return (\n                <Panel\n                  header={item.title}\n                  key={i}\n                  forceRender={forceRender}\n                  showArrow={showArrow}\n                >\n                  {item.desc}\n                </Panel>\n              );\n            })}\n          </Collapse>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ACollapse);\n",
        o = {
          editData: [
            {
              key: 'accordion',
              name: '\u624b\u98ce\u7434\u6a21\u5f0f',
              type: 'Switch',
            },
            {
              key: 'bordered',
              name: '\u662f\u5426\u6709\u8fb9\u6846',
              type: 'Switch',
            },
            {
              key: 'collapsible',
              name: '\u6240\u6709\u5b50\u9762\u677f\u662f\u5426\u53ef\u6298\u53e0\u7684\u533a\u57df',
              type: 'Select',
              range: [
                { key: 'header', text: '\u9876\u90e8' },
                { key: 'icon', text: '\u56fe\u6807' },
                { key: 'disabled', text: '\u4e0d\u53ef\u5c55\u5f00' },
              ],
            },
            {
              key: 'destroyInactivePanel',
              name: '\u9500\u6bc1\u6298\u53e0\u9690\u85cf\u7684\u9762\u677f',
              type: 'Switch',
            },
            {
              key: 'expandIconPosition',
              name: '\u8bbe\u7f6e\u56fe\u6807\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'start', text: '\u524d\u9762' },
                { key: 'end', text: '\u540e\u9762' },
              ],
            },
            {
              key: 'ghost',
              name: '\u80cc\u666f\u900f\u660e\u65e0\u8fb9\u6846',
              type: 'Switch',
            },
            {
              key: 'forceRender',
              name: '\u63cf\u8ff0\u88ab\u9690\u85cf\u65f6\u662f\u5426\u9500\u6bc1dom\u7ed3\u6784',
              type: 'Switch',
            },
            {
              key: 'showArrow',
              name: '\u662f\u5426\u5c55\u793a\u5f53\u524d\u9762\u677f\u4e0a\u7684\u7bad\u5934',
              type: 'Switch',
            },
            {
              key: 'panelList',
              name: '\u6298\u53e0\u5217\u8868',
              type: 'DataList',
            },
          ],
          config: {
            accordion: !1,
            bordered: !0,
            collapsible: 'icon',
            destroyInactivePanel: !1,
            expandIconPosition: 'start',
            ghost: !1,
            forceRender: !1,
            showArrow: !0,
            panelList: [
              {
                id: '1',
                title: 'This panel can only be collapsed by clicking text',
                desc: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
                link: 'xxxxx',
                imgUrl: [
                  {
                    uid: '001',
                    name: 'image.png',
                    status: 'done',
                    url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
                  },
                ],
              },
              {
                id: '2',
                title: 'This panel can only be collapsed by clicking icon',
                desc: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
                link: 'xxxxx',
                imgUrl: [
                  {
                    uid: '001',
                    name: 'image.png',
                    status: 'done',
                    url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
                  },
                ],
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    96932: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Collapse',
        h: 250,
        displayName: '\u6298\u53e0\u9762\u677f\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    36562: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, ReactNode, useEffect, useState } from 'react';\nimport logo from '../../../../assets/absolute/Comment.svg';\nimport { Image, Comment, Avatar } from 'antd';\nimport { ICommentConfig } from '@/materials/absolute-antd/social/Comment/schema';\nimport * as Icon from '@ant-design/icons';\n\n/*begin to delete*/\ninterface ICommentProProps extends ICommentConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AComment: FC<ICommentProProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { actions, author, avatar, content, datetime } = restProps;\n\n  const [action, setAction] = useState<ReactNode[]>();\n\n  useEffect(() => {\n    const arr = actions.split('-');\n    const icons: ReactNode[] = [];\n    arr.map((item) => {\n      // @ts-ignore\n      icons.push(React.createElement(Icon[item]));\n    });\n    //console.log(icons)\n    setAction(icons);\n  }, [actions]);\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Comment\n            content={<p>{content}</p>}\n            actions={action}\n            author={author}\n            avatar={<Avatar src={avatar} />}\n            datetime={datetime}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AComment);\n",
        o = {
          editData: [
            {
              key: 'actions',
              name: '\u64cd\u4f5c\u56fe\u6807',
              type: 'TextArea',
            },
            { key: 'author', name: '\u4f5c\u8005', type: 'Text' },
            { key: 'avatar', name: '\u5934\u50cfurl', type: 'Text' },
            { key: 'content', name: '\u5185\u5bb9', type: 'TextArea' },
            { key: 'datetime', name: '\u65f6\u95f4', type: 'Text' },
          ],
          config: {
            actions: 'LikeFilled-DislikeFilled',
            author: 'xiye',
            avatar: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
            datetime: '8 hours ago',
          },
          templateStr: a,
        },
        r = o;
    },
    59840: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Comment',
        h: 250,
        displayName: '\u8bc4\u8bba\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    87937: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useState } from 'react';\nimport { Image, Rate } from 'antd';\nimport { IRateConfig } from '@/materials/absolute-antd/social/Rate/schema';\nimport * as Icon from '@ant-design/icons';\nimport logo from '../../../../assets/absolute/Rate.svg';\n\n/*begin to delete*/\ninterface IRateProps extends IRateConfig {\n  isTpl: boolean;\n  onChange?: (e: any) => void;\n}\n/*end to delete*/\n\nconst ARate: FC<IRateProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    onChange,\n    allowClear,\n    allowHalf,\n    autoFocus,\n    character,\n    count,\n    defaultValue,\n    disabled,\n  } = restProps;\n\n  const [value, setValue] = useState<number>(defaultValue);\n\n  const handleChange = (e: any) => {\n    //console.log(e)\n    setValue(e);\n\n    onChange && onChange(e);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Rate\n            allowClear={allowClear}\n            allowHalf={allowHalf}\n            autoFocus={autoFocus}\n            // @ts-ignore\n            character={React.createElement(Icon[character])}\n            count={count}\n            value={value}\n            disabled={disabled}\n            onChange={(e) => handleChange(e)}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(ARate);\n",
        o = {
          editData: [
            {
              key: 'allowClear',
              name: '\u518d\u6b21\u70b9\u51fb\u5141\u8bb8\u6e05\u9664',
              type: 'Switch',
            },
            {
              key: 'allowHalf',
              name: '\u5141\u8bb8\u534a\u9009',
              type: 'Switch',
            },
            {
              key: 'autoFocus',
              name: '\u81ea\u52a8\u805a\u7126',
              type: 'Switch',
            },
            {
              key: 'character',
              name: '\u81ea\u5b9a\u4e49\u5b57\u7b26',
              type: 'Text',
            },
            { key: 'count', name: '\u6570\u91cf', type: 'Number' },
            {
              key: 'defaultValue',
              name: '\u9ed8\u8ba4\u5206\u6570',
              type: 'Number',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
          ],
          config: {
            allowClear: !1,
            allowHalf: !1,
            autoFocus: !1,
            character: 'StarFilled',
            count: 5,
            defaultValue: 0,
            disabled: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    83192: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Rate', h: 15, displayName: '\u8bc4\u5206\u7ec4\u4ef6' };
      t['default'] = a;
    },
    62677: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, memo, useEffect, useState } from 'react';\nimport logo from '../../../../assets/absolute/Statistic.svg';\nimport { Image, Statistic } from 'antd';\nimport { IStatisticConfig } from '@/materials/absolute-antd/social/Statistic/schema';\nimport * as Icon from '@ant-design/icons';\n\n/*begin to delete*/\ninterface IStatisticProps extends IStatisticConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst AStatistic: FC<IStatisticProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    title,\n    valueType,\n    value,\n    decimalSeparator,\n    groupSeparator,\n    loading,\n    precision,\n    prefix,\n  } = restProps;\n\n  const [tValue, setTValue] = useState<string | number>();\n\n  useEffect(() => {\n    if (valueType === 'number') {\n      setTValue(Number(value));\n    } else {\n      setTValue(value);\n    }\n  }, [value, valueType]);\n\n  return (\n    <React.Fragment>\n      {isTpl && (\n        <div>\n          <Image preview={false} src={logo} alt={''} />\n        </div>\n      )}\n      {!isTpl && (\n        <div>\n          <Statistic\n            title={title}\n            value={tValue}\n            decimalSeparator={decimalSeparator}\n            groupSeparator={groupSeparator}\n            loading={loading}\n            precision={precision}\n            // @ts-ignore\n            prefix={React.createElement(Icon[prefix])}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default memo(AStatistic);\n",
        o = {
          editData: [
            { key: 'title', name: '\u6807\u9898', type: 'Text' },
            {
              key: 'valueType',
              name: '\u8f93\u5165\u7c7b\u578b',
              type: 'Radio',
              range: [
                { key: 'string', text: 'string' },
                { key: 'number', text: 'number' },
              ],
            },
            { key: 'value', name: '\u6570\u503c\u5185\u5bb9', type: 'Text' },
            {
              key: 'decimalSeparator',
              name: '\u8bbe\u7f6e\u5c0f\u6570\u70b9',
              type: 'Text',
            },
            {
              key: 'groupSeparator',
              name: '\u8bbe\u7f6e\u5343\u5206\u4f4d\u6807\u8bc6\u7b26',
              type: 'Text',
            },
            {
              key: 'loading',
              name: '\u6570\u503c\u662f\u5426\u52a0\u8f7d',
              type: 'Switch',
            },
            {
              key: 'precision',
              name: '\u6570\u503c\u7cbe\u5ea6',
              type: 'Number',
            },
            { key: 'prefix', name: '\u524d\u7f00', type: 'Text' },
          ],
          config: {
            title: 'Feedback',
            valueType: 'number',
            value: '99999.9',
            decimalSeparator: '.',
            groupSeparator: ',',
            loading: !1,
            precision: 4,
            prefix: 'LikeOutlined',
          },
          templateStr: a,
        },
        r = o;
    },
    90688: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Statistic',
        h: 15,
        displayName: '\u9759\u6001\u7edf\u8ba1\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    86759: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(17349),
        o = n(56894),
        r = n(36562),
        l = n(87937),
        i = n(62677),
        s = {
          Card: a.default,
          Collapse: o.default,
          Comment: r.default,
          Rate: l.default,
          Statistic: i.default,
        };
      t['default'] = s;
    },
    70285: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(11146),
        r = n(96932),
        l = n(59840),
        i = n(83192),
        s = n(90688),
        c = [o.default, r.default, l.default, i.default, s.default],
        d = c.map((e) => (0, a.Z)((0, a.Z)({}, e), {}, { category: 'social' }));
      t['default'] = d;
    },
    61170: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IAdvertisementConfig } from '@/materials/absolute-semantic/base/Ad/schema';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Advertisement, Image } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IAdvertisementProps extends IAdvertisementConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SAdvertisement: FC<IAdvertisementProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { centered, src, test, unit = 'medium rectangle' } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Advertisement\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Advertisement unit={unit} centered={centered} test={test}>\n            {src.length !== 0 && <img src={src} alt=\"\" />}\n            {/*TODO you master add it by yourself*/}\n          </Advertisement>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SAdvertisement;\n",
        o = {
          editData: [
            { key: 'centered', name: '\u5c45\u4e2d', type: 'Switch' },
            { key: 'src', name: '\u56fe\u7247\u94fe\u63a5', type: 'Text' },
            { key: 'test', name: '\u663e\u793a\u6587\u672c', type: 'RichText' },
            {
              key: 'unit',
              name: '\u5e7f\u544a\u79cd\u7c7b',
              type: 'Select',
              range: [
                { key: 'medium rectangle', text: 'medium rectangle' },
                { key: 'large rectangle', text: 'large rectangle' },
                { key: 'vertical rectangle', text: 'vertical rectangle' },
                { key: 'small rectangle', text: 'small rectangle' },
                { key: 'mobile rectangle', text: 'mobile rectangle' },
                { key: 'banner', text: 'banner' },
                { key: 'vertical banner', text: 'vertical banner' },
                { key: 'top banner', text: 'top banner' },
                { key: 'half banner', text: 'half banner' },
                { key: 'button', text: 'button' },
                { key: 'square button', text: 'square button' },
                { key: 'small button', text: 'small button' },
                { key: 'skyscraper', text: 'skyscraper' },
                { key: 'wide skyscraper', text: 'wide skyscraper' },
                { key: 'leaderboard', text: 'leaderboard' },
                { key: 'large leaderboard', text: 'large leaderboard' },
                { key: 'mobile leaderboard', text: 'mobile leaderboard' },
                { key: 'billboard', text: 'billboard' },
                { key: 'panorama', text: 'panorama' },
                { key: 'netboard', text: 'netboard' },
                { key: 'half page', text: 'half page' },
                { key: 'square', text: 'square' },
                { key: 'small square', text: 'small square' },
              ],
            },
          ],
          config: {
            centered: !1,
            src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
            test: '\u8fd9\u662f\u4e00\u4e2a\u5e7f\u544a',
            unit: 'medium rectangle',
          },
          templateStr: a,
        },
        r = o;
    },
    86491: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Ad', h: 60, displayName: '\u5e7f\u544a\u7ec4\u4ef6' };
      t['default'] = a;
    },
    46128: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IDividerConfig } from '@/materials/absolute-semantic/base/Divider/schema';\nimport { Divider, Image, Segment } from 'semantic-ui-react';\nimport logo from '../../../../assets/absolute/Divider.svg';\n\n/*begin to delete*/\ninterface IDividerProps extends IDividerConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SDivider: FC<IDividerProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { text, fitted, hidden, inverted, section } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Divider\" />}\n      {!isTpl && (\n        <Segment basic>\n          {text.length === 0 ? (\n            <Divider\n              fitted={fitted}\n              hidden={hidden}\n              inverted={inverted}\n              section={section}\n            />\n          ) : (\n            <Divider\n              horizontal\n              fitted={fitted}\n              hidden={hidden}\n              inverted={inverted}\n              section={section}\n            >\n              {text}\n            </Divider>\n          )}\n        </Segment>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SDivider;\n",
        o = {
          editData: [
            { key: 'text', name: '\u6587\u672c', type: 'Text' },
            { key: 'fitted', name: '\u7d27\u51d1\u578b', type: 'Switch' },
            {
              key: 'hidden',
              name: '\u9690\u85cf\u5206\u5272\u7ebf',
              type: 'Switch',
            },
            { key: 'inverted', name: '\u53cd\u8272', type: 'Switch' },
            {
              key: 'section',
              name: '\u6bb5\u843d\u5206\u5272',
              type: 'Switch',
            },
          ],
          config: {
            text: 'Divider',
            fitted: !1,
            hidden: !1,
            inverted: !1,
            section: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    93671: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Divider',
        h: 30,
        displayName: '\u5206\u5272\u7ebf\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    93475: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IHeaderConfig } from '@/materials/absolute-semantic/base/Header/schema';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Header, Image } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IHeaderProps extends IHeaderConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SHeader: FC<IHeaderProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    title,\n    block,\n    color,\n    disabled,\n    dividing,\n    inverted,\n    subHeader,\n    size,\n    textAlign,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Header\" />}\n      {!isTpl && (\n        <div>\n          <Header\n            block={block}\n            color={color}\n            disabled={disabled}\n            dividing={dividing}\n            inverted={inverted}\n            size={size}\n            textAlign={textAlign}\n          >\n            <Header.Content>{title}</Header.Content>\n            {subHeader.length !== 0 && (\n              <Header.Subheader>{subHeader}</Header.Subheader>\n            )}\n          </Header>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SHeader;\n",
        o = {
          editData: [
            { key: 'title', name: '\u6807\u9898', type: 'Text' },
            {
              key: 'block',
              name: '\u5185\u5bb9\u5757\u663e\u793a',
              type: 'Switch',
            },
            {
              key: 'color',
              name: '\u989c\u8272',
              type: 'Select',
              range: [
                { key: 'red', text: 'red' },
                { key: 'orange', text: 'orange' },
                { key: 'yellow', text: 'yellow' },
                { key: 'olive', text: 'olive' },
                { key: 'green', text: 'green' },
                { key: 'teal', text: 'teal' },
                { key: 'blue', text: 'blue' },
                { key: 'violet', text: 'violet' },
                { key: 'purple', text: 'purple' },
                { key: 'pink', text: 'pink' },
                { key: 'brown', text: 'brown' },
                { key: 'grey', text: 'grey' },
                { key: 'black', text: 'black' },
              ],
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'dividing', name: '\u5206\u5272', type: 'Switch' },
            { key: 'inverted', name: '\u53cd\u8272', type: 'Switch' },
            { key: 'subHeader', name: 'SubHeader', type: 'Text' },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'medium', text: 'medium' },
                { key: 'large', text: 'large' },
                { key: 'huge', text: 'huge' },
              ],
            },
            {
              key: 'textAlign',
              name: '\u5bf9\u9f50\u65b9\u5f0f',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'center', text: '\u5c45\u4e2d' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
                { key: 'justified', text: '\u4e24\u7aef\u5bf9\u9f50' },
              ],
            },
          ],
          config: {
            title: '\u8fd9\u662f\u4e00\u4e2a\u6807\u9898',
            block: !1,
            color: 'black',
            disabled: !1,
            dividing: !1,
            inverted: !1,
            subHeader: '\u8fd9\u662f\u5bf9\u5e94\u7684\u526f\u6807\u9898',
            size: 'medium',
            textAlign: 'left',
          },
          templateStr: a,
        },
        r = o;
    },
    75590: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Header',
        h: 50,
        displayName: '\u6807\u9898\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    53068: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useState } from 'react';\nimport { IInputConfig } from '@/materials/absolute-semantic/base/Input/schema';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Image, Input } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IInputProps extends IInputConfig {\n  isTpl: boolean;\n  onChange?: any;\n}\n/*end to delete*/\n\nconst SInput: FC<IInputProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    placeholder,\n    disabled,\n    error,\n    fluid,\n    focus,\n    icon,\n    iconPosition,\n    action,\n    inverted,\n    label,\n    tag,\n    labelPosition,\n    loading,\n    size,\n  } = restProps;\n\n  const [value, setValue] = useState('');\n  const handleChange = (e: any, data: any) => {\n    //console.log(e,data);\n    const { value } = data;\n    setValue(value);\n\n    props.onChange && props.onChange(value);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Input\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Input\n            value={value}\n            onChange={(e, data) => handleChange(e, data)}\n            placeholder={placeholder}\n            disabled={disabled}\n            error={error}\n            fluid={fluid}\n            focus={focus}\n            icon={icon.length === 0 && action.length !== 0 ? undefined : icon}\n            iconPosition={iconPosition === 'right' ? undefined : iconPosition}\n            action={action.length === 0 ? undefined : action}\n            inverted={inverted}\n            label={{\n              tag: tag,\n              content: label.length === 0 ? undefined : label,\n            }}\n            labelPosition={labelPosition}\n            loading={loading}\n            size={size}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SInput;\n",
        o = {
          editData: [
            {
              key: 'placeholder',
              name: '\u9ed8\u8ba4\u663e\u793a',
              type: 'Text',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'error', name: '\u9519\u8bef\u7c7b\u578b', type: 'Switch' },
            {
              key: 'fluid',
              name: '\u4e0e\u7236\u5143\u7d20\u540c\u5bbd',
              type: 'Switch',
            },
            {
              key: 'focus',
              name: '\u6301\u7eed\u83b7\u5f97\u7126\u70b9',
              type: 'Switch',
            },
            { key: 'icon', name: '\u56fe\u6807\u540d\u79f0', type: 'Text' },
            {
              key: 'iconPosition',
              name: '\u56fe\u6807\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: 'left' },
                { key: 'right', text: 'right' },
              ],
            },
            { key: 'action', name: '\u64cd\u4f5c', type: 'Text' },
            { key: 'inverted', name: '\u53cd\u8272', type: 'Switch' },
            { key: 'label', name: '\u6807\u7b7e', type: 'Text' },
            {
              key: 'tag',
              name: 'label\u662f\u5426\u4e3a\u6807\u7b7e',
              type: 'Switch',
            },
            {
              key: 'labelPosition',
              name: '\u6807\u7b7e\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: 'left' },
                { key: 'right', text: 'right' },
              ],
            },
            { key: 'loading', name: '\u52a0\u8f7d\u4e2d', type: 'Switch' },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'small', text: 'small' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
          ],
          config: {
            placeholder: 'Input...',
            disabled: !1,
            error: !1,
            fluid: !0,
            focus: !0,
            icon: 'search',
            iconPosition: 'right',
            action: 'Search',
            inverted: !1,
            label: 'http://',
            tag: !1,
            labelPosition: 'left',
            loading: !1,
            size: 'small',
          },
          templateStr: a,
        },
        r = o;
    },
    58575: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Input',
        h: 40,
        displayName: '\u8f93\u5165\u6846\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    52704: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { ILabelConfig } from '@/materials/absolute-semantic/base/Label/schema';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Icon, Image, Label } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface ILabelProps extends ILabelConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SLabel: FC<ILabelProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    title,\n    active,\n    basic,\n    circular,\n    color,\n    empty,\n    floating,\n    horizontal,\n    icon,\n    size,\n    tag,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Label\" />}\n      {!isTpl && (\n        <div>\n          {icon.length !== 0 ? (\n            /*@ts-ignore*/\n            <Label\n              active={active}\n              basic={basic}\n              circular={circular}\n              color={color}\n              empty={empty}\n              floating={floating}\n              horizontal={horizontal}\n              size={size}\n              tag={tag}\n            >\n              {/*@ts-ignore*/}\n              <Icon name={icon} />\n              {title}\n            </Label>\n          ) : (\n            /*@ts-ignore*/\n            <Label\n              active={active}\n              basic={basic}\n              circular={circular}\n              color={color}\n              empty={empty}\n              floating={floating}\n              horizontal={horizontal}\n              size={size}\n              tag={tag}\n            >\n              {title}\n            </Label>\n          )}\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SLabel;\n",
        o = {
          editData: [
            { key: 'title', name: '\u6807\u7b7e\u5185\u5bb9', type: 'Text' },
            { key: 'active', name: '\u6fc0\u6d3b', type: 'Switch' },
            { key: 'basic', name: '\u57fa\u7840\u6837\u5f0f', type: 'Switch' },
            { key: 'circular', name: '\u5706\u5f62', type: 'Switch' },
            {
              key: 'color',
              name: '\u989c\u8272',
              type: 'Select',
              range: [
                { key: 'red', text: 'red' },
                { key: 'orange', text: 'orange' },
                { key: 'yellow', text: 'yellow' },
                { key: 'olive', text: 'olive' },
                { key: 'green', text: 'green' },
                { key: 'teal', text: 'teal' },
                { key: 'blue', text: 'blue' },
                { key: 'violet', text: 'violet' },
                { key: 'purple', text: 'purple' },
                { key: 'pink', text: 'pink' },
                { key: 'brown', text: 'brown' },
                { key: 'grey', text: 'grey' },
                { key: 'black', text: 'black' },
              ],
            },
            { key: 'empty', name: '\u8bbe\u7f6e\u4e3a\u70b9', type: 'Switch' },
            { key: 'floating', name: '\u6d6e\u52a8', type: 'Switch' },
            {
              key: 'horizontal',
              name: '\u6c34\u5e73\u6807\u7b7e',
              type: 'Switch',
            },
            { key: 'icon', name: '\u56fe\u6807', type: 'Text' },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'medium', text: 'medium' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
            {
              key: 'tag',
              name: '\u663e\u793a\u4e3a\u6807\u7b7e',
              type: 'Switch',
            },
          ],
          config: {
            title: '\u6807\u7b7e',
            active: !0,
            basic: !1,
            circular: !1,
            color: 'teal',
            empty: !1,
            floating: !1,
            horizontal: !1,
            icon: 'mail',
            size: 'medium',
            tag: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    3111: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Label', h: 50, displayName: '\u6807\u7b7e\u7ec4\u4ef6' };
      t['default'] = a;
    },
    48446: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IMessageConfig } from '@/materials/absolute-semantic/base/Message/schema';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Icon, Image, Message } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IMessageProps extends IMessageConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SMessage: FC<IMessageProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    header,\n    content,\n    color,\n    compact,\n    error,\n    floating,\n    hidden,\n    icon,\n    info,\n    negative,\n    positive,\n    success,\n    visible,\n    warning,\n    size,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Message\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Message\n            color={color}\n            compact={compact}\n            error={error}\n            floating={floating}\n            hidden={hidden}\n            info={info}\n            negative={negative}\n            positive={positive}\n            success={success}\n            visible={visible}\n            warning={warning}\n            size={size}\n          >\n            <Message.Header>\n              {icon.length !== 0 && (\n                /*@ts-ignore*/\n                <Icon name={icon} />\n              )}\n              {header}\n            </Message.Header>\n            <Message.Content>{content}</Message.Content>\n          </Message>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SMessage;\n",
        o = {
          editData: [
            { key: 'header', name: '\u6807\u9898', type: 'Text' },
            {
              key: 'content',
              name: '\u901a\u77e5\u5185\u5bb9',
              type: 'RichText',
            },
            {
              key: 'color',
              name: '\u989c\u8272',
              type: 'Select',
              range: [
                { key: 'red', text: 'red' },
                { key: 'orange', text: 'orange' },
                { key: 'yellow', text: 'yellow' },
                { key: 'olive', text: 'olive' },
                { key: 'green', text: 'green' },
                { key: 'teal', text: 'teal' },
                { key: 'blue', text: 'blue' },
                { key: 'violet', text: 'violet' },
                { key: 'purple', text: 'purple' },
                { key: 'pink', text: 'pink' },
                { key: 'brown', text: 'brown' },
                { key: 'grey', text: 'grey' },
                { key: 'black', text: 'black' },
              ],
            },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
            { key: 'compact', name: '\u7d27\u51d1\u578b', type: 'Switch' },
            { key: 'error', name: '\u9519\u8bef\u7c7b\u578b', type: 'Switch' },
            { key: 'floating', name: '\u6d6e\u52a8', type: 'Switch' },
            { key: 'hidden', name: '\u9690\u85cf', type: 'Switch' },
            { key: 'icon', name: '\u56fe\u6807', type: 'Text' },
            { key: 'info', name: '\u63d0\u793a\u7c7b\u578b', type: 'Switch' },
            {
              key: 'negative',
              name: '\u6d88\u6781\u7c7b\u578b\u6d88\u606f',
              type: 'Switch',
            },
            {
              key: 'positive',
              name: '\u79ef\u6781\u7c7b\u578b\u6d88\u606f',
              type: 'Switch',
            },
            {
              key: 'success',
              name: '\u6210\u529f\u901a\u77e5',
              type: 'Switch',
            },
            {
              key: 'visible',
              name: '\u662f\u5426\u53ef\u89c1',
              type: 'Switch',
            },
            {
              key: 'warning',
              name: '\u8b66\u544a\u901a\u77e5',
              type: 'Switch',
            },
          ],
          config: {
            header: '\u6d88\u606f\u901a\u77e5',
            content:
              '\u8fd9\u662f\u4e00\u6761\u91cd\u8981\u901a\u77e5\uff0c\u8bf7\u52a1\u5fc5\u8ba4\u771f\u9605\u8bfb',
            color: 'black',
            compact: !1,
            error: !1,
            floating: !1,
            hidden: !1,
            icon: 'inbox',
            info: !1,
            negative: !1,
            positive: !1,
            success: !1,
            visible: !0,
            warning: !1,
            size: 'small',
          },
          templateStr: a,
        },
        r = o;
    },
    66236: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Message',
        h: 50,
        displayName: '\u6d88\u606f\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    89251: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useEffect, useState } from 'react';\nimport { IPlaceholderConfig } from '@/materials/absolute-semantic/base/Placeholder/schema';\nimport logo from '../../../../assets/absolute/empty.png';\nimport { Image, Placeholder } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IPlaceholderProps extends IPlaceholderConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SPlaceholder: FC<IPlaceholderProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { renderHeader, renderParagraph, fluid, inverted } = restProps;\n\n  /*\u521d\u59cb\u5316\u7684\u65f6\u5019\u586b\u5145\u4e00\u4e2a\u7a7a\u6807\u7b7e\uff0c\u8fd9\u6837\u5c31\u53ef\u4ee5\u907f\u514d\u7ed9renderList\u5199\u7c7b\u578b*/\n  const [renderHeaderList, setRenderHeaderList] = useState([<></>]);\n  const [renderParagraphList, setRenderParagraphList] = useState([<></>]);\n\n  useEffect(() => {\n    const tempListHeader = renderHeader.split(',');\n    const nodeHeaderList = [];\n\n    /* \u5fc5\u987b\u4f7f\u7528for\u5faa\u73af\u7684\u5199\u6cd5\uff0c\u4f7f\u7528map\u6216\u8005forEach\u9700\u8981\u7ed9\u5b50\u9879\u8d4b\u7c7b\u578b\uff0c\u8f6c\u6362\u6210js\u540e\u4f1a\u62a5\u9519\uff01*/\n    for (let i = 0; i < tempListHeader.length; ++i) {\n      switch (tempListHeader[i]) {\n        case 'Header':\n          nodeHeaderList.push(<Placeholder.Header />);\n          break;\n        case 'Image':\n          nodeHeaderList.push(<Placeholder.Image />);\n          break;\n        case 'Line':\n          nodeHeaderList.push(<Placeholder.Line />);\n          break;\n        case 'Paragraph':\n          nodeHeaderList.push(<Placeholder.Paragraph />);\n          break;\n        default:\n          break;\n      }\n    }\n\n    setRenderHeaderList(nodeHeaderList);\n  }, [renderHeader]);\n\n  useEffect(() => {\n    const tempListParagraph = renderParagraph.split(',');\n    const nodeParagraphList = [];\n\n    /* \u5fc5\u987b\u4f7f\u7528for\u5faa\u73af\u7684\u5199\u6cd5\uff0c\u4f7f\u7528map\u6216\u8005forEach\u9700\u8981\u7ed9\u5b50\u9879\u8d4b\u7c7b\u578b\uff0c\u8f6c\u6362\u6210js\u540e\u4f1a\u62a5\u9519\uff01*/\n    for (let i = 0; i < tempListParagraph.length; ++i) {\n      switch (tempListParagraph[i]) {\n        case 'Header':\n          nodeParagraphList.push(<Placeholder.Header />);\n          break;\n        case 'Image':\n          nodeParagraphList.push(<Placeholder.Image />);\n          break;\n        case 'Line':\n          nodeParagraphList.push(<Placeholder.Line />);\n          break;\n        case 'Paragraph':\n          nodeParagraphList.push(<Placeholder.Paragraph />);\n          break;\n        default:\n          break;\n      }\n    }\n\n    setRenderParagraphList(nodeParagraphList);\n  }, [renderParagraph]);\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Placeholder\" />}\n      {!isTpl && (\n        <div>\n          <Placeholder fluid={fluid} inverted={inverted}>\n            <Placeholder.Header>{renderHeaderList}</Placeholder.Header>\n            <Placeholder.Paragraph>{renderParagraphList}</Placeholder.Paragraph>\n          </Placeholder>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SPlaceholder;\n",
        o = {
          editData: [
            {
              key: 'renderHeader',
              name: '\u5934\u90e8\u5185\u5bb9\uff0c\u4f7f\u7528\u82f1\u6587\u9017\u53f7\u5206\u5272',
              type: 'RichText',
            },
            {
              key: 'renderParagraph',
              name: '\u6e32\u67d3\u5185\u5bb9\uff0c\u4f7f\u7528\u82f1\u6587\u9017\u53f7\u5206\u5272',
              type: 'RichText',
            },
            {
              key: 'fluid',
              name: '\u4e0e\u7236\u5bb9\u5668\u540c\u5bbd',
              type: 'Switch',
            },
            { key: 'inverted', name: '\u53cd\u8272', type: 'Switch' },
          ],
          config: {
            renderHeader: 'Line,Line,Line',
            renderParagraph: 'Line,Image,Line',
            fluid: !1,
            inverted: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    96096: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Placeholder',
        h: 50,
        displayName: '\u7a7a\u767d\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    56919: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useState } from 'react';\nimport { ISearchConfig } from '@/materials/absolute-semantic/base/Search/schema';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Image, Search } from 'semantic-ui-react';\nimport _ from 'lodash';\n\n/*begin to delete*/\ninterface ISearchProps extends ISearchConfig {\n  isTpl: boolean;\n  onResultSelect?: any;\n}\n/*end to delete*/\n\nconst initialState = {\n  loading: false,\n  results: [],\n  value: '',\n};\n\nfunction searchReducer(state: any, action: any) {\n  switch (action.type) {\n    case 'CLEAN_QUERY':\n      return initialState;\n    case 'START_SEARCH':\n      return { ...state, loading: true, value: action.query };\n    case 'FINISH_SEARCH':\n      return { ...state, loading: false, results: action.results };\n    case 'UPDATE_SELECTION':\n      return { ...state, value: action.selection };\n\n    default:\n      throw new Error();\n  }\n}\n\nconst SSearch: FC<ISearchProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { dataSource, placeholder, fluid, size } = restProps;\n\n  const [state, dispatch] = React.useReducer(searchReducer, initialState);\n  const { loading, results, value } = state;\n  const timeoutRef = React.useRef();\n  const handleSearchChange = React.useCallback((e, data) => {\n    clearTimeout(timeoutRef.current);\n    dispatch({ type: 'START_SEARCH', query: data.value });\n    /*@ts-ignore*/\n    timeoutRef.current = setTimeout(() => {\n      if (data.value.length === 0) {\n        dispatch({ type: 'CLEAN_QUERY' });\n        return;\n      }\n\n      const re = new RegExp(_.escapeRegExp(data.value), 'i');\n      const isMatch = (result: any) => re.test(result.title);\n\n      dispatch({\n        type: 'FINISH_SEARCH',\n        results: _.filter(dataSource, isMatch),\n      });\n    }, 300);\n  }, []);\n  React.useEffect(() => {\n    return () => {\n      clearTimeout(timeoutRef.current);\n    };\n  }, []);\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Search\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Search\n            loading={loading}\n            fluid={fluid}\n            size={size}\n            placeholder={placeholder}\n            onResultSelect={(e, data) => {\n              dispatch({\n                type: 'UPDATE_SELECTION',\n                selection: data.result.title,\n              });\n              //console.log(data.result);\n              props.onResultSelect && props.onResultSelect(data.result);\n            }}\n            onSearchChange={handleSearchChange}\n            results={results}\n            value={value}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SSearch;\n",
        o = {
          editData: [
            {
              key: 'placeholder',
              name: '\u9ed8\u8ba4\u663e\u793a',
              type: 'Text',
            },
            {
              key: 'fluid',
              name: '\u4e0e\u7236\u5143\u7d20\u540c\u5bbd',
              type: 'Switch',
            },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
            { key: 'dataSource', name: '\u6570\u636e\u6e90', type: 'DataList' },
          ],
          config: {
            placeholder: 'Search...',
            fluid: !0,
            size: 'small',
            dataSource: [
              {
                id: '1',
                title: 'xiye',
                description: '\u8fd9\u662f\u5173\u4e8exiye\u7684\u63cf\u8ff0',
                image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                price: '100',
              },
              {
                id: '2',
                title: 'Cayon',
                description: '\u8fd9\u662f\u5173\u4e8eCayon\u7684\u63cf\u8ff0',
                image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                price: '200',
              },
              {
                id: '3',
                title: 'Test',
                description: '\u8fd9\u662f\u5173\u4e8eTest\u7684\u63cf\u8ff0',
                image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                price: '300',
              },
              {
                id: '4',
                title: 'Ellus Thus',
                description:
                  '\u8fd9\u662f\u5173\u4e8eEllus Thus\u7684\u63cf\u8ff0',
                image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                price: '400',
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    34205: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Search',
        h: 40,
        displayName: '\u67e5\u8be2\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    5503: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IStatisticConfig } from '@/materials/absolute-semantic/base/Staistic/schema';\nimport { Image, Statistic } from 'semantic-ui-react';\nimport logo from '../../../../assets/absolute/Statistic.svg';\n\n/*begin to delete*/\ninterface IStatisticProps extends IStatisticConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SStatistic: FC<IStatisticProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { label, value, color, horizontal, inverted, size } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Statistic\" />}\n      {!isTpl && (\n        <div>\n          <Statistic\n            color={color}\n            size={size}\n            horizontal={horizontal}\n            inverted={inverted}\n          >\n            <Statistic.Value>{value}</Statistic.Value>\n            <Statistic.Label>{label}</Statistic.Label>\n          </Statistic>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SStatistic;\n",
        o = {
          editData: [
            { key: 'label', name: '\u6807\u7b7e', type: 'Text' },
            {
              key: 'value',
              name: '\u9759\u6001\u7edf\u8ba1\u503c',
              type: 'Text',
            },
            {
              key: 'color',
              name: '\u989c\u8272',
              type: 'Select',
              range: [
                { key: 'red', text: 'red' },
                { key: 'orange', text: 'orange' },
                { key: 'yellow', text: 'yellow' },
                { key: 'olive', text: 'olive' },
                { key: 'green', text: 'green' },
                { key: 'teal', text: 'teal' },
                { key: 'blue', text: 'blue' },
                { key: 'violet', text: 'violet' },
                { key: 'purple', text: 'purple' },
                { key: 'pink', text: 'pink' },
                { key: 'brown', text: 'brown' },
                { key: 'grey', text: 'grey' },
                { key: 'black', text: 'black' },
              ],
            },
            {
              key: 'horizontal',
              name: '\u6c34\u5e73\u6392\u5217',
              type: 'Switch',
            },
            { key: 'inverted', name: '\u53cd\u8272', type: 'Switch' },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'large', text: 'large' },
                { key: 'huge', text: 'huge' },
              ],
            },
          ],
          config: {
            label: 'Label',
            value: '50,000',
            color: 'black',
            horizontal: !1,
            inverted: !1,
            size: 'small',
          },
          templateStr: a,
        },
        r = o;
    },
    60357: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Statistic',
        h: 50,
        displayName: '\u7edf\u8ba1\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    39794: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useState } from 'react';\nimport { ITextAreaConfig } from '@/materials/absolute-semantic/base/TextArea/schema';\nimport logo from '../../../../assets/absolute/richText.png';\nimport { Form, Image, TextArea } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface ITextAreaProps extends ITextAreaConfig {\n  isTpl: boolean;\n  onChange?: any;\n}\n/*end to delete*/\n\nconst STextArea: FC<ITextAreaProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { placeholder, rows } = restProps;\n\n  const [value, setValue] = useState(placeholder);\n  const handleChange = (e: any, data: any) => {\n    const value = data;\n    setValue(value);\n\n    props.onChange && props.onChange(value);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"TextArea\" />}\n      {!isTpl && (\n        <div>\n          <Form>\n            {/*@ts-ignore*/}\n            <TextArea\n              rows={rows}\n              placeholder={placeholder}\n              value={value}\n              onChange={(e, data) => handleChange(e, data)}\n            />\n          </Form>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default STextArea;\n",
        o = {
          editData: [
            { key: 'rows', name: '\u8f93\u5165\u884c\u6570', type: 'Text' },
            {
              key: 'placeholder',
              name: '\u9ed8\u8ba4\u663e\u793a',
              type: 'Text',
            },
          ],
          config: { rows: '3', placeholder: 'Tell use more.' },
          templateStr: a,
        },
        r = o;
    },
    29529: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'TextArea',
        h: 80,
        displayName: '\u6587\u672c\u57df\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    53851: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { ITextConfig } from '@/materials/absolute-semantic/base/Text/schema';\nimport logo from '../../../../assets/absolute/text.png';\nimport { Image, Segment } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface ITextProps extends ITextConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SText: FC<ITextProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    text,\n    basic,\n    circular,\n    color,\n    compact,\n    disabled,\n    inverted,\n    piled,\n    placeholder,\n    raised,\n    size,\n    stacked,\n    textAlign,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Text\" />}\n      {!isTpl && (\n        <div>\n          <Segment\n            basic={basic}\n            circular={circular}\n            color={color}\n            compact={compact}\n            disabled={disabled}\n            inverted={inverted}\n            piled={piled}\n            placeholder={placeholder}\n            raised={raised}\n            size={size}\n            stacked={stacked}\n            textAlign={textAlign}\n          >\n            {text}\n          </Segment>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SText;\n",
        o = {
          editData: [
            { key: 'text', name: '\u6587\u672c', type: 'Text' },
            { key: 'basic', name: '\u6781\u7b80\u98ce\u683c', type: 'Switch' },
            { key: 'circular', name: '\u5706\u89d2', type: 'Switch' },
            {
              key: 'color',
              name: '\u989c\u8272',
              type: 'Select',
              range: [
                { key: 'red', text: 'red' },
                { key: 'orange', text: 'orange' },
                { key: 'yellow', text: 'yellow' },
                { key: 'olive', text: 'olive' },
                { key: 'green', text: 'green' },
                { key: 'teal', text: 'teal' },
                { key: 'blue', text: 'blue' },
                { key: 'violet', text: 'violet' },
                { key: 'purple', text: 'purple' },
                { key: 'pink', text: 'pink' },
                { key: 'brown', text: 'brown' },
                { key: 'grey', text: 'grey' },
                { key: 'black', text: 'black' },
              ],
            },
            {
              key: 'compact',
              name: '\u7d27\u51d1\u98ce\u683c',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'inverted', name: '\u53cd\u8272', type: 'Switch' },
            { key: 'piled', name: '\u7eb8\u5f20\u98ce\u683c', type: 'Switch' },
            {
              key: 'placeholder',
              name: '\u7528\u4e8e\u5360\u4f4d',
              type: 'Switch',
            },
            { key: 'raised', name: '\u6d6e\u52a8\u98ce\u683c', type: 'Switch' },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
            {
              key: 'stacked',
              name: '\u5806\u53e0\u98ce\u683c',
              type: 'Switch',
            },
            {
              key: 'textAlign',
              name: '\u6587\u672c\u5bf9\u9f50',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'center', text: '\u5c45\u4e2d' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
              ],
            },
          ],
          config: {
            text: 'Pellentesque habitant morbi tristique senectus.',
            basic: !1,
            circular: !1,
            color: 'teal',
            compact: !1,
            disabled: !1,
            inverted: !1,
            piled: !1,
            placeholder: !1,
            raised: !1,
            size: 'large',
            stacked: !1,
            textAlign: 'left',
          },
          templateStr: a,
        },
        r = o;
    },
    43180: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Text', h: 80, displayName: '\u6587\u672c\u7ec4\u4ef6' };
      t['default'] = a;
    },
    82984: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(61170),
        o = n(46128),
        r = n(93475),
        l = n(53068),
        i = n(52704),
        s = n(48446),
        c = n(89251),
        d = n(56919),
        m = n(5503),
        p = n(53851),
        u = n(39794),
        g = {
          Ad: a.default,
          Divider: o.default,
          Header: r.default,
          Input: l.default,
          Label: i.default,
          Message: s.default,
          Placeholder: c.default,
          Search: d.default,
          Statistic: m.default,
          Text: p.default,
          TextArea: u.default,
        };
      t['default'] = g;
    },
    6: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(86491),
        r = n(93671),
        l = n(75590),
        i = n(58575),
        s = n(3111),
        c = n(66236),
        d = n(96096),
        m = n(34205),
        p = n(60357),
        u = n(43180),
        g = n(29529),
        b = [
          o.default,
          r.default,
          l.default,
          i.default,
          s.default,
          c.default,
          d.default,
          m.default,
          p.default,
          u.default,
          g.default,
        ],
        y = b.map((e) => (0, a.Z)((0, a.Z)({}, e), {}, { category: 'base' }));
      t['default'] = y;
    },
    15117: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { ISButtonConfig } from '@/materials/absolute-semantic/control/Button/schema';\nimport { Button, Image, Label } from 'semantic-ui-react';\nimport logo from '../../../../assets/absolute/Button.svg';\n\n/*begin to delete*/\ninterface IButtonProps extends ISButtonConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SButton: FC<IButtonProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    text,\n    basic,\n    circular,\n    color,\n    compact,\n    disabled,\n    fluid,\n    inverted,\n    label,\n    labelPosition,\n    loading,\n    negative,\n    positive,\n    size,\n    toggle,\n    type,\n    pointing,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} size=\"small\" />}\n      {!isTpl && (\n        <div>\n          {label.length === 0 && (\n            // @ts-ignore\n            <Button\n              basic={basic}\n              circular={circular}\n              color={color}\n              compact={compact}\n              disabled={disabled}\n              fluid={fluid}\n              inverted={inverted}\n              loading={loading}\n              negative={negative}\n              positive={positive}\n              size={size}\n              toggle={toggle}\n              type={type}\n            >\n              {text}\n            </Button>\n          )}\n          {label.length !== 0 && (\n            // @ts-ignore\n            <Button as=\"div\" labelPosition={labelPosition}>\n              {/*@ts-ignore*/}\n              <Label pointing={pointing}>{label}</Label>\n              {/*@ts-ignore*/}\n              <Button\n                basic={basic}\n                circular={circular}\n                color={color}\n                compact={compact}\n                disabled={disabled}\n                fluid={fluid}\n                inverted={inverted}\n                loading={loading}\n                negative={negative}\n                positive={positive}\n                size={size}\n                toggle={toggle}\n                type={type}\n              >\n                {text}\n              </Button>\n            </Button>\n          )}\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SButton;\n",
        o = {
          editData: [
            { key: 'text', name: '\u6587\u672c', type: 'Text' },
            { key: 'basic', name: '\u57fa\u672c\u6309\u94ae', type: 'Switch' },
            { key: 'circular', name: '\u5706\u89d2', type: 'Switch' },
            {
              key: 'color',
              name: '\u80cc\u666f\u8272',
              type: 'Select',
              range: [
                { key: 'red', text: 'red' },
                { key: 'orange', text: 'orange' },
                { key: 'yellow', text: 'yellow' },
                { key: 'olive', text: 'olive' },
                { key: 'green', text: 'green' },
                { key: 'teal', text: 'teal' },
                { key: 'blue', text: 'blue' },
                { key: 'violet', text: 'violet' },
                { key: 'purple', text: 'purple' },
                { key: 'pink', text: 'pink' },
                { key: 'brown', text: 'brown' },
                { key: 'grey', text: 'grey' },
                { key: 'black', text: 'black' },
                { key: 'facebook', text: 'facebook' },
                { key: 'google plus', text: 'google plus' },
                { key: 'instagram', text: 'instagram' },
                { key: 'linkedin', text: 'linkedin' },
                { key: 'twitter', text: 'twitter' },
                { key: 'vk', text: 'vk' },
                { key: 'youtube', text: 'youtube' },
              ],
            },
            {
              key: 'compact',
              name: '\u7d27\u51d1\u6a21\u5f0f',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            {
              key: 'fluid',
              name: '\u4e0e\u7236\u5bb9\u5668\u7b49\u5bbd',
              type: 'Switch',
            },
            { key: 'inverted', name: '\u53cd\u8272', type: 'Switch' },
            { key: 'label', name: '\u6807\u7b7e', type: 'Text' },
            {
              key: 'labelPosition',
              name: 'label\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
              ],
            },
            {
              key: 'pointing',
              name: 'label\u5f00\u53e3\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u4fa7' },
                { key: 'right', text: '\u53f3\u4fa7' },
              ],
            },
            { key: 'loading', name: '\u8f7d\u5165', type: 'Switch' },
            {
              key: 'negative',
              name: '\u6d88\u6781\u7c7b\u578b\u6309\u94ae',
              type: 'Switch',
            },
            {
              key: 'positive',
              name: '\u79ef\u6781\u7c7b\u578b\u6309\u94ae',
              type: 'Switch',
            },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'medium', text: 'medium' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
            { key: 'toggle', name: '\u5f00\u5173\u6a21\u5f0f', type: 'Switch' },
            {
              key: 'type',
              name: '\u6309\u94ae\u7c7b\u578b',
              type: 'Select',
              range: [
                { key: 'button', text: 'button' },
                { key: 'submit', text: 'submit' },
                { key: 'reset', text: 'reset' },
              ],
            },
          ],
          config: {
            text: 'Button',
            basic: !0,
            circular: !1,
            color: 'teal',
            compact: !1,
            disabled: !1,
            fluid: !1,
            inverted: !1,
            label: 'Label',
            labelPosition: 'right',
            pointing: 'right',
            loading: !1,
            negative: !1,
            positive: !1,
            size: 'medium',
            toggle: !1,
            type: 'button',
          },
          templateStr: a,
        },
        r = o;
    },
    57861: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Button',
        h: 20,
        displayName: '\u6309\u94ae\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    38690: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useEffect, useState } from 'react';\nimport { ICheckBoxConfig } from '@/materials/absolute-semantic/control/CheckBox/schema';\nimport logo from '../../../../assets/absolute/CheckBox.svg';\nimport { Checkbox, Image } from 'semantic-ui-react';\n\ninterface ICheckBoxProps extends ICheckBoxConfig {\n  isTpl: boolean;\n  onChange?: (e: any) => void;\n}\n\nconst SCheckBox: FC<ICheckBoxProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { label, defaultChecked, disabled, fitted, readOnly, type } = restProps;\n\n  const [checked, setChecked] = useState<boolean>(defaultChecked);\n\n  const handleChange = (e: any) => {\n    const check = e.target.checked;\n    setChecked(check);\n\n    props.onChange && props.onChange(e);\n  };\n\n  useEffect(() => {\n    setChecked(defaultChecked);\n  }, [defaultChecked]);\n\n  const renderType = () => {\n    switch (type) {\n      case 'checkbox':\n        return (\n          /*@ts-ignore*/\n          <Checkbox\n            type=\"checkbox\"\n            label={label}\n            checked={checked}\n            disabled={disabled}\n            fitted={fitted}\n            readOnly={readOnly}\n            onChange={(e) => handleChange(e)}\n          />\n        );\n      case 'toggle':\n        return (\n          /*@ts-ignore*/\n          <Checkbox\n            toggle\n            label={label}\n            checked={checked}\n            disabled={disabled}\n            fitted={fitted}\n            readOnly={readOnly}\n            onChange={(e) => handleChange(e)}\n          />\n        );\n      case 'slider':\n        return (\n          /*@ts-ignore*/\n          <Checkbox\n            slider\n            label={label}\n            checked={checked}\n            disabled={disabled}\n            fitted={fitted}\n            readOnly={readOnly}\n            onChange={(e) => handleChange(e)}\n          />\n        );\n      default:\n        return (\n          /*@ts-ignore*/\n          <Checkbox\n            type=\"checkbox\"\n            label={label}\n            checked={checked}\n            disabled={disabled}\n            fitted={fitted}\n            readOnly={readOnly}\n            onChange={(e) => handleChange(e)}\n          />\n        );\n    }\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"CheckBox\" />}\n      {!isTpl && <div>{renderType()}</div>}\n    </React.Fragment>\n  );\n};\n\nexport default SCheckBox;\n",
        o = {
          editData: [
            { key: 'label', name: '\u6807\u7b7e', type: 'Text' },
            {
              key: 'defaultChecked',
              name: '\u9ed8\u8ba4\u9009\u62e9',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'fitted', name: '\u7d27\u51d1\u578b', type: 'Switch' },
            { key: 'readOnly', name: '\u53ea\u8bfb', type: 'Switch' },
            {
              key: 'type',
              name: '\u6e32\u67d3\u7c7b\u578b',
              type: 'Select',
              range: [
                { key: 'checkbox', text: 'checkbox' },
                { key: 'toggle', text: 'toggle' },
                { key: 'slider', text: 'slider' },
              ],
            },
          ],
          config: {
            label: 'CheckBox',
            defaultChecked: !1,
            disabled: !1,
            fitted: !1,
            readOnly: !1,
            type: 'checkbox',
          },
          templateStr: a,
        },
        r = o;
    },
    54910: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'CheckBox',
        h: 40,
        displayName: '\u591a\u9009\u6846\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    71401: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useState } from 'react';\nimport { IDropdownConfig } from '@/materials/absolute-semantic/control/Dropdown/schema';\nimport logo from '../../../../assets/absolute/Select.svg';\nimport { Image, Dropdown } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IDropdownProps extends IDropdownConfig {\n  isTpl: boolean;\n  onChange?: any;\n}\n/*end to delete*/\n\nconst SDropdown: FC<IDropdownProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    header,\n    text,\n    basic,\n    compact,\n    deburr,\n    defaultOpen,\n    direction,\n    disabled,\n    error,\n    floating,\n    fluid,\n    inline,\n    item,\n    icon,\n    labeled,\n    lazyLoad,\n    selection,\n    dataSource,\n  } = restProps;\n\n  const handleRenderTarget = (e: any) => {\n    const { key, text, value, flag, icon, image, description } = e;\n\n    if (flag.length === 0 && icon.length === 0 && image.length === 0)\n      return (\n        /*@ts-ignore*/\n        <Dropdown.Item\n          key={key}\n          text={text}\n          value={value}\n          description={description}\n          onClick={(e, data) => handleClick(e, data)}\n        />\n      );\n\n    if (flag.length !== 0 && image.length === 0) {\n      /*@ts-ignore*/\n      return (\n        <Dropdown.Item\n          key={key}\n          text={text}\n          value={value}\n          flag={flag}\n          description={description}\n          onClick={(e, data) => handleClick(e, data)}\n        />\n      );\n    }\n\n    if (flag.length === 0 && image.length !== 0) {\n      return (\n        /*@ts-ignore*/\n        <Dropdown.Item\n          key={key}\n          text={text}\n          value={value}\n          image={image}\n          description={description}\n          onClick={(e, data) => handleClick(e, data)}\n        />\n      );\n    } else {\n      return (\n        /*@ts-ignore*/\n        <Dropdown.Item\n          key={key}\n          text={text}\n          value={value}\n          icon={icon}\n          description={description}\n          onClick={(e, data) => handleClick(e, data)}\n        />\n      );\n    }\n  };\n\n  const [value, setValue] = useState();\n  const handleClick = (e: any, data: any) => {\n    //console.log(e, data);\n    const { value } = data;\n    setValue(value);\n\n    props.onChange && props.onChange(value);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Dropdown\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Dropdown\n            value={value}\n            placeholder={value ? value : text}\n            basic={basic}\n            selection={selection}\n            compact={compact}\n            deburr={deburr}\n            defaultOpen={defaultOpen}\n            direction={direction}\n            disabled={disabled}\n            error={error}\n            floating={floating}\n            fluid={fluid}\n            inline={inline}\n            item={item}\n            labeled={labeled}\n            lazyLoad={lazyLoad}\n            multiple={false}\n          >\n            <Dropdown.Menu>\n              {header.length !== 0 && (\n                <React.Fragment>\n                  {/*@ts-ignore*/}\n                  <Dropdown.Header icon={icon} content={header} />\n                  {/*@ts-ignore*/}\n                  <Dropdown.Divider />\n                </React.Fragment>\n              )}\n              {dataSource.map((e: any, index: number) => handleRenderTarget(e))}\n            </Dropdown.Menu>\n          </Dropdown>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SDropdown;\n",
        o = {
          editData: [
            { key: 'header', name: '\u4e0b\u62c9\u6807\u9898', type: 'Text' },
            {
              key: 'icon',
              name: '\u4e0b\u62c9\u6807\u9898\u56fe\u6807',
              type: 'Text',
            },
            {
              key: 'text',
              name: '\u4e0b\u62c9\u6846\u9ed8\u8ba4\u6587\u5b57',
              type: 'Text',
            },
            { key: 'basic', name: '\u57fa\u672c\u6837\u5f0f', type: 'Switch' },
            {
              key: 'selection',
              name: '\u9009\u62e9\u6846\u6837\u5f0f',
              type: 'Switch',
            },
            {
              key: 'compact',
              name: '\u7d27\u51d1\u6a21\u5f0f',
              type: 'Switch',
            },
            {
              key: 'deburr',
              name: '\u662f\u5426\u5220\u9664\u97f3\u8c03',
              type: 'Switch',
            },
            {
              key: 'defaultOpen',
              name: '\u9ed8\u8ba4\u6253\u5f00',
              type: 'Switch',
            },
            {
              key: 'direction',
              name: '\u65b9\u5411',
              type: 'Select',
              range: [
                { key: 'right', text: '\u53f3\u4fa7' },
                { key: 'left', text: '\u5de6\u4fa7' },
              ],
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'error', name: '\u9519\u8bef\u6a21\u5f0f', type: 'Switch' },
            { key: 'floating', name: '\u6d6e\u52a8', type: 'Switch' },
            {
              key: 'fluid',
              name: '\u4e0e\u7236\u5143\u7d20\u540c\u5bbd',
              type: 'Switch',
            },
            { key: 'inline', name: '\u9009\u62e9\u5185\u8fde', type: 'Switch' },
            {
              key: 'item',
              name: '\u5b50\u9879\u683c\u5f0f\u5316\u4e3a\u83dc\u5355\u9879',
              type: 'Switch',
            },
            {
              key: 'labeled',
              name: '\u6807\u8bb0\u4e3a\u4e0b\u62c9\u5217\u8868',
              type: 'Switch',
            },
            { key: 'lazyLoad', name: '\u61d2\u52a0\u8f7d', type: 'Switch' },
            { key: 'dataSource', name: '\u6570\u636e\u6e90', type: 'DataList' },
          ],
          config: {
            header: 'Select Header',
            icon: ' home',
            text: 'Select',
            basic: !0,
            selection: !1,
            compact: !1,
            deburr: !1,
            defaultOpen: !1,
            direction: 'right',
            disabled: !1,
            error: !1,
            floating: !1,
            fluid: !1,
            inline: !0,
            item: !0,
            labeled: !0,
            lazyLoad: !0,
            dataSource: [
              {
                id: '1',
                key: 'Jenny Hess',
                text: 'Jenny Hess',
                value: 'Jenny Hess',
                flag: '',
                icon: '',
                image: '',
                description: 'ctrl + o',
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    68414: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Dropdown',
        h: 40,
        displayName: '\u4e0b\u62c9\u6846\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    49145: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useState } from 'react';\nimport { IPaginationConfig } from '@/materials/absolute-semantic/control/Pagination/schema';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Image, Pagination, Icon } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IPaginationProps extends IPaginationConfig {\n  isTpl: boolean;\n  onPageChange?: any;\n}\n/*end to delete*/\n\nconst SPagination: FC<IPaginationProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    defaultActivePage,\n    disabled,\n    totalPages,\n    firstItemIcon,\n    lastItemIcon,\n    prevItemIcon,\n    nextItemIcon,\n    ellipsisItemIcon,\n  } = restProps;\n\n  const [currentPage, setCurrentPage] = useState(defaultActivePage);\n\n  const handleChange = (e: any, data: any) => {\n    //console.log(e,data)\n    const { activePage } = data;\n    setCurrentPage(activePage);\n\n    props.onPageChange && props.onPageChange(activePage);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Pagination\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Pagination\n            onPageChange={(e, data) => handleChange(e, data)}\n            disabled={disabled}\n            totalPages={totalPages}\n            defaultActivePage={currentPage}\n            ellipsisItem={{\n              /*@ts-ignore*/\n              content: <Icon name={ellipsisItemIcon} />,\n              icon: true,\n            }}\n            firstItem={{\n              /*@ts-ignore*/\n              content: <Icon name={firstItemIcon} />,\n              icon: true,\n            }}\n            lastItem={{\n              /*@ts-ignore*/\n              content: <Icon name={lastItemIcon} />,\n              icon: true,\n            }}\n            prevItem={{\n              /*@ts-ignore*/\n              content: <Icon name={prevItemIcon} />,\n              icon: true,\n            }}\n            nextItem={{\n              /*@ts-ignore*/\n              content: <Icon name={nextItemIcon} />,\n              icon: true,\n            }}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SPagination;\n",
        o = {
          editData: [
            {
              key: 'defaultActivePage',
              name: '\u9ed8\u8ba4\u9009\u4e2d',
              type: 'Text',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'totalPages', name: '\u603b\u9875\u6570', type: 'Text' },
            {
              key: 'firstItemIcon',
              name: '\u7b2c\u4e00\u4e2a\u5143\u7d20\u7d22\u5f15Icon',
              type: 'Text',
            },
            {
              key: 'lastItemIcon',
              name: '\u6700\u540e\u4e00\u4e2a\u5143\u7d20\u7d22\u5f15Icon',
              type: 'Text',
            },
            {
              key: 'prevItemIcon',
              name: '\u4e0a\u4e00\u4e2a\u5143\u7d20\u7d22\u5f15Icon',
              type: 'Text',
            },
            {
              key: 'nextItemIcon',
              name: '\u4e0b\u4e00\u4e2a\u5143\u7d20\u7d22\u5f15Icon',
              type: 'Text',
            },
            {
              key: 'ellipsisItemIcon',
              name: '\u7701\u7565\u7d22\u5f15Icon',
              type: 'Text',
            },
          ],
          config: {
            defaultActivePage: '1',
            disabled: !1,
            totalPages: '5',
            firstItemIcon: 'angle double left',
            lastItemIcon: 'angle double right',
            prevItemIcon: 'angle left',
            nextItemIcon: 'angle right',
            ellipsisItemIcon: 'ellipsis horizontal',
          },
          templateStr: a,
        },
        r = o;
    },
    24973: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Pagination',
        h: 40,
        displayName: '\u5206\u9875\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    21244: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IProgressConfig } from '@/materials/absolute-semantic/control/Progress/schema';\nimport logo from '../../../../assets/absolute/Progress.svg';\nimport { Image, Progress } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IProgressProps extends IProgressConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SProgress: FC<IProgressProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    defaultValue,\n    total,\n    color,\n    disabled,\n    indicating,\n    inverted,\n    label,\n    progress,\n    size,\n    error,\n    success,\n    warning,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Progress\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Progress\n            percent={defaultValue}\n            value={defaultValue}\n            total={total}\n            indicating={indicating}\n            color={color}\n            disabled={disabled}\n            inverted={inverted}\n            label={label}\n            progress={progress}\n            size={size}\n            error={error}\n            success={success}\n            warning={warning}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SProgress;\n",
        o = {
          editData: [
            {
              key: 'defaultValue',
              name: '\u9ed8\u8ba4\u6570\u503c',
              type: 'Text',
            },
            {
              key: 'total',
              name: '\u8fdb\u5ea6\u6761\u603b\u503c',
              type: 'Text',
            },
            {
              key: 'color',
              name: '\u989c\u8272',
              type: 'Select',
              range: [
                { key: 'red', text: 'red' },
                { key: 'orange', text: 'orange' },
                { key: 'yellow', text: 'yellow' },
                { key: 'olive', text: 'olive' },
                { key: 'green', text: 'green' },
                { key: 'teal', text: 'teal' },
                { key: 'blue', text: 'blue' },
                { key: 'violet', text: 'violet' },
                { key: 'purple', text: 'purple' },
                { key: 'pink', text: 'pink' },
                { key: 'brown', text: 'brown' },
                { key: 'grey', text: 'grey' },
                { key: 'black', text: 'black' },
              ],
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            {
              key: 'indicating',
              name: '\u663e\u793a\u7ea7\u522b',
              type: 'Switch',
            },
            { key: 'inverted', name: '\u53cd\u8272', type: 'Switch' },
            {
              key: 'label',
              name: '\u8fdb\u5ea6\u6761\u8bf4\u660e',
              type: 'Text',
            },
            {
              key: 'progress',
              name: '\u8fdb\u5ea6\u6761\u683c\u5f0f',
              type: 'Select',
              range: [
                { key: 'percent', text: 'percent' },
                { key: 'ratio', text: 'radio' },
                { key: 'value', text: 'value' },
              ],
            },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'medium', text: 'medium' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
              ],
            },
            { key: 'error', name: '\u9519\u8bef\u683c\u5f0f', type: 'Switch' },
            {
              key: 'success',
              name: '\u6210\u529f\u683c\u5f0f',
              type: 'Switch',
            },
            {
              key: 'warning',
              name: '\u8b66\u544a\u683c\u5f0f',
              type: 'Switch',
            },
          ],
          config: {
            defaultValue: '50',
            total: '100',
            color: 'teal',
            disabled: !1,
            indicating: !1,
            inverted: !1,
            label: '\u8fd9\u662f\u4e00\u4e2a\u8fdb\u5ea6\u6761',
            progress: 'percent',
            size: 'medium',
            error: !1,
            success: !1,
            warning: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    29269: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Progress',
        h: 50,
        displayName: '\u8fdb\u5ea6\u6761\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    14949: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useEffect, useState } from 'react';\nimport { IRadioConfig } from '@/materials/absolute-semantic/control/Radio/schema';\nimport logo from '../../../../assets/absolute/Radio.svg';\nimport { Image, Radio } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IRadioProps extends IRadioConfig {\n  isTpl: boolean;\n  onChange?: any;\n}\n/*end to delete*/\n\nconst SRadio: FC<IRadioProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { label, defaultChecked, disabled, readOnly, fitted } = restProps;\n\n  const [checked, setChecked] = useState(defaultChecked);\n\n  const handleChange = (e: any) => {\n    const check = !checked;\n    setChecked(check);\n\n    props.onChange && props.onChange(check);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Radio\" />}\n      {!isTpl && (\n        <div>\n          <Radio\n            label={label}\n            checked={checked}\n            onChange={(e) => handleChange(e)}\n            disabled={disabled}\n            readOnly={readOnly}\n            fitted={fitted}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SRadio;\n",
        o = {
          editData: [
            { key: 'label', name: '\u6807\u7b7e', type: 'Text' },
            {
              key: 'defaultChecked',
              name: '\u662f\u5426\u9ed8\u8ba4\u9009\u4e2d',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'readOnly', name: '\u53ea\u8bfb', type: 'Switch' },
            { key: 'fitted', name: '\u7d27\u51d1\u578b', type: 'Switch' },
          ],
          config: {
            label: 'Radio',
            defaultChecked: !1,
            disabled: !1,
            readOnly: !1,
            fitted: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    61736: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Radio',
        h: 30,
        displayName: '\u5355\u9009\u6846\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    76324: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(15117),
        o = n(38690),
        r = n(71401),
        l = n(49145),
        i = n(21244),
        s = n(14949),
        c = {
          Button: a.default,
          CheckBox: o.default,
          Dropdown: r.default,
          Pagination: l.default,
          Progress: i.default,
          Radio: s.default,
        };
      t['default'] = c;
    },
    19177: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(57861),
        r = n(54910),
        l = n(68414),
        i = n(24973),
        s = n(29269),
        c = n(61736),
        d = [o.default, r.default, l.default, i.default, s.default, c.default],
        m = d.map((e) =>
          (0, a.Z)((0, a.Z)({}, e), {}, { category: 'control' }),
        );
      t['default'] = m;
    },
    94220: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IEmbedConfig } from '@/materials/absolute-semantic/media/Embed/schema';\nimport logo from '../../../../assets/absolute/video.png';\nimport { Image, Embed } from 'semantic-ui-react';\nimport { uuid } from '@/engine-lib-absolute/core-utils/tool';\n\n/*begin to delete*/\ninterface IEmbedProps extends IEmbedConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SEmbed: FC<IEmbedProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    placeholder,\n    source,\n    url,\n    aspectRatio,\n    autoplay,\n    brandedUI,\n    defaultActive,\n    hd,\n  } = restProps;\n\n  /*\n   * Embed\u7ec4\u4ef6\u4e2did\u5b58\u653e\u7684\u662fvimeo\u6216\u8005youtube\u89c6\u9891\u4e2d\u7684id\u5e8f\u53f7\uff0c\n   * \u5982youtube\u89c6\u9891 https://www.youtube.com/watch?v=O6Xo21L0ybE&ab_channel=homefry815\uff0c\n   * \u5219id\u5bf9\u5e94\u4e3a O6Xo21L0ybE\n   * */\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Embed\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Embed\n            id={url}\n            placeholder={placeholder}\n            source={source}\n            aspectRatio={aspectRatio}\n            autoplay={autoplay}\n            brandedUI={brandedUI}\n            defaultActive={defaultActive}\n            hd={hd}\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SEmbed;\n",
        o = {
          editData: [
            {
              key: 'placeholder',
              name: '\u7f3a\u7701\u6587\u672c',
              type: 'Text',
            },
            {
              key: 'source',
              name: '\u8d44\u6e90\u7c7b\u578b',
              type: 'Select',
              range: [
                { key: 'youtube', text: 'youtube' },
                { key: 'vimeo', text: 'vimeo' },
              ],
            },
            { key: 'url', name: '\u8d44\u6e90\u94fe\u63a5', type: 'Text' },
            {
              key: 'aspectRatio',
              name: '\u6bd4\u7387',
              type: 'Select',
              range: [
                { key: '4:3', text: '4:3' },
                { key: '16:9', text: '16:9' },
                { key: '21:9', text: '21:9' },
              ],
            },
            {
              key: 'autoplay',
              name: '\u662f\u5426\u81ea\u52a8\u64ad\u653e',
              type: 'Switch',
            },
            {
              key: 'brandedUI',
              name: '\u663e\u793a\u5e73\u53f0UI',
              type: 'Switch',
            },
            {
              key: 'defaultActive',
              name: '\u662f\u5426\u9ed8\u8ba4\u64ad\u653e',
              type: 'Switch',
            },
            { key: 'hd', name: 'HD\u5185\u5bb9', type: 'Switch' },
          ],
          config: {
            placeholder: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
            source: 'youtube',
            url: 'O6Xo21L0ybE',
            aspectRatio: '4:3',
            autoplay: !1,
            brandedUI: !1,
            defaultActive: !1,
            hd: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    54717: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Embed',
        h: 150,
        displayName: '\u5a92\u4f53\u5d4c\u5165\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    46810: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IImageConfig } from '@/materials/absolute-semantic/media/Image/schema';\nimport logo from '../../../../assets/absolute/img.png';\nimport { Image } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IImageProps extends IImageConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SImage: FC<IImageProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    src,\n    alt,\n    avatar,\n    bordered,\n    centered,\n    circular,\n    disabled,\n    fluid,\n    hidden,\n    inline,\n    rounded,\n    size,\n    verticalAlign,\n    wrapper,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl ? (\n        <Image src={logo} alt=\"Image\" />\n      ) : (\n        <Image\n          src={src}\n          alt={alt}\n          avatar={avatar}\n          bordered={bordered}\n          centered={centered}\n          circular={circular}\n          disabled={disabled}\n          fluid={fluid}\n          hidden={hidden}\n          inline={inline}\n          rounded={rounded}\n          size={size}\n          verticalAlign={verticalAlign}\n          wrapped={wrapper}\n        />\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SImage;\n",
        o = {
          editData: [
            { key: 'src', name: '\u56fe\u7247\u94fe\u63a5', type: 'Text' },
            { key: 'alt', name: '\u63cf\u8ff0\u6587\u672c', type: 'Text' },
            {
              key: 'avatar',
              name: '\u6e32\u67d3\u4e3a\u5934\u50cf',
              type: 'Switch',
            },
            { key: 'bordered', name: '\u8fb9\u6846', type: 'Switch' },
            {
              key: 'circular',
              name: '\u5706\u5f62\u56fe\u7247',
              type: 'Switch',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            {
              key: 'fluid',
              name: '\u4e0e\u7236\u5bb9\u5668\u7b49\u5bbd',
              type: 'Switch',
            },
            { key: 'hidden', name: '\u9690\u85cf', type: 'Switch' },
            { key: 'inline', name: '\u5185\u8054', type: 'Switch' },
            { key: 'rounded', name: '\u5706\u89d2', type: 'Switch' },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'medium', text: 'medium' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
            {
              key: 'verticalAlign',
              name: '\u5bf9\u9f50\u65b9\u5f0f',
              type: 'Select',
              range: [
                { key: 'bottom', text: '\u5e95\u90e8\u5bf9\u9f50' },
                { key: 'middle', text: '\u4e2d\u7ebf\u5bf9\u9f50' },
                { key: 'top', text: '\u9876\u90e8\u5bf9\u9f50' },
              ],
            },
            {
              key: 'wrapper',
              name: '\u4f7f\u7528div\u5305\u88f9',
              type: 'Switch',
            },
          ],
          config: {
            src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
            alt: '\u8fd9\u662f\u4e00\u4e2aImage',
            avatar: !1,
            bordered: !1,
            centered: !1,
            circular: !1,
            disabled: !1,
            fluid: !1,
            hidden: !1,
            inline: !1,
            rounded: !1,
            size: 'medium',
            verticalAlign: 'middle',
            wrapper: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    63072: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Image', h: 50, displayName: '\u56fe\u7247\u7ec4\u4ef6' };
      t['default'] = a;
    },
    81536: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(94220),
        o = n(46810),
        r = { Embed: a.default, Image: o.default };
      t['default'] = r;
    },
    38679: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(54717),
        r = n(63072),
        l = [o.default, r.default],
        i = l.map((e) => (0, a.Z)((0, a.Z)({}, e), {}, { category: 'media' }));
      t['default'] = i;
    },
    48803: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(80170),
        r = n(82984),
        l = n(76324),
        i = n(81536),
        s = (0, a.Z)(
          (0, a.Z)((0, a.Z)((0, a.Z)({}, r.default), l.default), i.default),
          o.default,
        );
      t['default'] = s;
    },
    88647: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useState } from 'react';\nimport { IAccordionConfig } from '@/materials/absolute-semantic/social/Accordion/schema';\nimport logo from '../../../../assets/absolute/Collapse.svg';\nimport { Image, Accordion, Icon } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IAccordionProps extends IAccordionConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SAccordion: FC<IAccordionProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { exclusive, fluid, styled, dataSource } = restProps;\n\n  const [activeIndex, setActiveIndex] = useState(0);\n\n  const handleClick = (e: any, titleProps: any) => {\n    const { index } = titleProps;\n    const newIndex = activeIndex === index ? -1 : index;\n    setActiveIndex(newIndex);\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Accordion\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Accordion fluid={fluid} styled={styled} exclusive={exclusive}>\n            {dataSource.map((item: any, index: number) => {\n              const { title, content } = item;\n              return (\n                <React.Fragment>\n                  {/*@ts-ignore*/}\n                  <Accordion.Title\n                    active={activeIndex === index}\n                    index={index}\n                    onClick={(e, index) => handleClick(e, index)}\n                  >\n                    {/*@ts-ignore*/}\n                    <Icon name=\"dropdown\" />\n                    {title}\n                  </Accordion.Title>\n                  <Accordion.Content active={activeIndex === index}>\n                    {content}\n                  </Accordion.Content>\n                </React.Fragment>\n              );\n            })}\n          </Accordion>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SAccordion;\n",
        o = {
          editData: [
            {
              key: 'exclusive',
              name: '\u53ea\u5141\u8bb8\u5c55\u5f00\u4e00\u4e2a\u9879\u76ee',
              type: 'Switch',
            },
            {
              key: 'fluid',
              name: '\u4e0e\u7236\u5143\u7d20\u540c\u5bbd',
              type: 'Switch',
            },
            { key: 'styled', name: '\u6dfb\u52a0\u8fb9\u6846', type: 'Switch' },
            { key: 'dataSource', name: '\u6570\u636e\u6e90', type: 'DataList' },
          ],
          config: {
            exclusive: !0,
            fluid: !1,
            styled: !1,
            dataSource: [
              {
                id: '100',
                title: 'What is a dog?',
                content:
                  'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
              },
              {
                id: '101',
                title: 'What kinds of dogs are there?',
                content:
                  'There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.',
              },
              {
                id: '102',
                title: 'How do you acquire a dog?',
                content:
                  'Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n\nA pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.',
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    16458: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Accordion',
        h: 150,
        displayName: '\u6298\u53e0\u8bf4\u660e\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    30384: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { ICardConfig } from '@/materials/absolute-semantic/social/Card/schema';\nimport logo from '../../../../assets/absolute/Card.svg';\nimport { Image, Card } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface ICardProps extends ICardConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SCard: FC<ICardProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const {\n    src,\n    color,\n    title,\n    titleTextAlign,\n    meta,\n    metaTextAlign,\n    desc,\n    descTextAlign,\n    extra,\n    fluid,\n    raised,\n  } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Card\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Card fluid={fluid} raised={raised} color={color}>\n            <Image src={src} alt=\"Card-Image\" ui={false} wrapped />\n            <Card.Content>\n              <Card.Header textAlign={titleTextAlign}>{title}</Card.Header>\n              <Card.Meta textAlign={metaTextAlign}>{meta}</Card.Meta>\n              <Card.Description textAlign={descTextAlign}>\n                {desc}\n              </Card.Description>\n              <Card.Content extra>{extra}</Card.Content>\n            </Card.Content>\n          </Card>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SCard;\n",
        o = {
          editData: [
            { key: 'src', name: '\u56fe\u7247\u94fe\u63a5', type: 'Text' },
            {
              key: 'color',
              name: '\u989c\u8272',
              type: 'Select',
              range: [
                { key: 'red', text: 'red' },
                { key: 'orange', text: 'orange' },
                { key: 'yellow', text: 'yellow' },
                { key: 'olive', text: 'olive' },
                { key: 'green', text: 'green' },
                { key: 'teal', text: 'teal' },
                { key: 'blue', text: 'blue' },
                { key: 'violet', text: 'violet' },
                { key: 'purple', text: 'purple' },
                { key: 'pink', text: 'pink' },
                { key: 'brown', text: 'brown' },
                { key: 'grey', text: 'grey' },
                { key: 'black', text: 'black' },
              ],
            },
            { key: 'title', name: '\u6807\u9898', type: 'Text' },
            {
              key: 'titleTextAlign',
              name: '\u6807\u9898\u5bf9\u9f50\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'center', text: '\u5c45\u4e2d' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
              ],
            },
            { key: 'meta', name: '\u5143\u6570\u636e', type: 'Text' },
            {
              key: 'metaTextAlign',
              name: '\u5143\u6570\u636e\u5bf9\u9f50\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'center', text: '\u5c45\u4e2d' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
              ],
            },
            { key: 'desc', name: '\u63cf\u8ff0', type: 'RichText' },
            {
              key: 'descTextAlign',
              name: '\u63cf\u8ff0\u5bf9\u9f50\u4f4d\u7f6e',
              type: 'Select',
              range: [
                { key: 'left', text: '\u5de6\u5bf9\u9f50' },
                { key: 'center', text: '\u5c45\u4e2d' },
                { key: 'right', text: '\u53f3\u5bf9\u9f50' },
              ],
            },
            { key: 'extra', name: '\u989d\u5916\u5185\u5bb9', type: 'Text' },
            {
              key: 'fluid',
              name: '\u540c\u7236\u5143\u7d20\u7b49\u5bbd',
              type: 'Switch',
            },
            { key: 'raised', name: '\u6d6e\u52a8', type: 'Switch' },
          ],
          config: {
            src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
            color: 'grey',
            title: '\u5361\u7247\u6807\u9898',
            titleTextAlign: 'left',
            meta: '\u7b80\u5355\u63cf\u8ff0',
            metaTextAlign: 'left',
            desc: '\u5173\u4e8e\u5361\u7247\u5185\u5bb9\u7684\u8be6\u7ec6\u8868\u8ff0',
            descTextAlign: 'left',
            extra: '\u989d\u5916\u5185\u5bb9',
            fluid: !1,
            raised: !1,
          },
          templateStr: a,
        },
        r = o;
    },
    22438: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Card', h: 100, displayName: '\u5361\u7247\u7ec4\u4ef6' };
      t['default'] = a;
    },
    58993: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { ICommentConfig } from '@/materials/absolute-semantic/social/Comment/schema';\nimport logo from '../../../../assets/absolute/Comment.svg';\nimport { Image, Comment } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface ICommentProps extends ICommentConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SComment: FC<ICommentProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { collapsed, minimal, size, threaded, dataSource } = restProps;\n\n  const handleActions = (actions: string) => {\n    const actionList = actions.split('-');\n    return actionList;\n  };\n\n  const handleChildToRender = (e: any) => {\n    const { avatar, author, meta, content, actions, child } = e;\n\n    return (\n      <Comment>\n        <Comment.Avatar src={avatar} alt=\"Comment-Avatar\" />\n        <Comment.Content>\n          <Comment.Author as=\"a\">{author}</Comment.Author>\n          <Comment.Metadata>\n            <div>{meta}</div>\n          </Comment.Metadata>\n          <Comment.Text>{content}</Comment.Text>\n          <Comment.Actions>\n            {actions.split('-').map((e: string, _: number) => (\n              /*@ts-ignore*/\n              <Comment.Action key={_}>{e}</Comment.Action>\n            ))}\n          </Comment.Actions>\n\n          {child.length !== 0 && (\n            <Comment.Group>\n              {child.map((e: any) => handleChildToRender(e))}\n            </Comment.Group>\n          )}\n        </Comment.Content>\n      </Comment>\n    );\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Comment\" />}\n      {!isTpl && (\n        <div>\n          <Comment.Group\n            collapsed={collapsed}\n            minimal={minimal}\n            size={size}\n            threaded={threaded}\n          >\n            {dataSource.map((item: any, index: number) => {\n              const { avatar, author, meta, content, actions, child } = item;\n\n              return (\n                <Comment key={index}>\n                  <Comment.Avatar src={avatar} alt=\"Comment-Avatar\" />\n                  <Comment.Content>\n                    <Comment.Author as=\"a\">{author}</Comment.Author>\n                    <Comment.Metadata>\n                      <div>{meta}</div>\n                    </Comment.Metadata>\n                    <Comment.Text>{content}</Comment.Text>\n                    <Comment.Actions>\n                      {handleActions(actions).map((e, _) => (\n                        /*@ts-ignore*/\n                        <Comment.Action key={_}>{e}</Comment.Action>\n                      ))}\n                    </Comment.Actions>\n\n                    {child.length !== 0 && (\n                      <Comment.Group>\n                        {child.map((e: any) => handleChildToRender(e))}\n                      </Comment.Group>\n                    )}\n                  </Comment.Content>\n                </Comment>\n              );\n            })}\n          </Comment.Group>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SComment;\n",
        o = {
          editData: [
            {
              key: 'collapsed',
              name: '\u662f\u5426\u53ef\u6298\u53e0',
              type: 'Switch',
            },
            {
              key: 'minimal',
              name: '\u9690\u85cf\u989d\u5916\u4fe1\u606f',
              type: 'Switch',
            },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'large', text: 'large' },
                { key: 'big', text: 'big' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
            {
              key: 'threaded',
              name: '\u4e32\u63a5\u5217\u8868',
              type: 'Switch',
            },
            { key: 'dataSource', name: '\u6570\u636e\u6e90', type: 'DataList' },
          ],
          config: {
            collapsed: !1,
            minimal: !1,
            size: 'large',
            threaded: !1,
            dataSource: [
              {
                id: '1000',
                avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                author: 'Matt',
                meta: 'Today at 5:42PM',
                content: 'How artistic!',
                actions: 'Reply-Open',
                child: [],
              },
              {
                id: '1001',
                avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                author: 'Elliot Fu',
                meta: 'Yesterday at 12:30AM',
                content:
                  'This has been very useful for my research. Thanks as well!',
                actions: 'Reply-Open',
                child: [
                  {
                    id: '1002',
                    avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                    author: 'Jenny Hess',
                    meta: 'Just now',
                    content: 'Elliot you are always so right :)',
                    actions: 'Reply-Open',
                    child: [],
                  },
                ],
              },
              {
                id: '1003',
                avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                author: 'Joe Henderson',
                meta: '5 days ago',
                content: 'Dude, this is awesome. Thanks so much',
                actions: 'Reply-Open',
                child: [],
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    51425: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Comment',
        h: 120,
        displayName: '\u8bc4\u8bba\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    30405: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IFeedConfig } from '@/materials/absolute-semantic/social/Feed/schema';\nimport logo from '../../../../assets/absolute/Logo.png';\nimport { Image, Feed, Icon } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IFeedProps extends IFeedConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SFeed: FC<IFeedProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { size, dataSource } = restProps;\n\n  const handleRenderImages = (e: any) => {\n    const list = e.split('-');\n    const renderList: any = [];\n    list.map((item: any, _: number) => {\n      const html = (\n        <a>\n          <img src={item} />\n        </a>\n      );\n      renderList.push(html);\n    });\n    return <React.Fragment>{renderList}</React.Fragment>;\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Feed\" />}\n      {!isTpl && (\n        <div>\n          <Feed size={size}>\n            {dataSource.map((e: any, index: number) => {\n              const {\n                src,\n                user,\n                action,\n                date,\n                like,\n                extraText,\n                extraImages,\n                icon = 'like',\n              } = e;\n              return (\n                <Feed.Event key={index}>\n                  <Feed.Label image={src} />\n                  <Feed.Content>\n                    <Feed.Summary>\n                      <Feed.User>{user}</Feed.User> {action}\n                      <Feed.Date>{date}</Feed.Date>\n                    </Feed.Summary>\n                    {extraText.length !== 0 && (\n                      <Feed.Extra text>{extraText}</Feed.Extra>\n                    )}\n                    {extraImages.length !== 0 && (\n                      <Feed.Extra images>\n                        {handleRenderImages(extraImages)}\n                      </Feed.Extra>\n                    )}\n                    <Feed.Meta>\n                      <Feed.Like>\n                        {/*@ts-ignore*/}\n                        <Icon name={icon} />\n                        {like}\n                      </Feed.Like>\n                    </Feed.Meta>\n                  </Feed.Content>\n                </Feed.Event>\n              );\n            })}\n          </Feed>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SFeed;\n",
        o = {
          editData: [
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'small', text: '\u5c0f\u53f7' },
                { key: 'large', text: '\u5927\u53f7' },
              ],
            },
            { key: 'dataSource', name: '\u6570\u636e\u6e90', type: 'DataList' },
          ],
          config: {
            size: 'small',
            dataSource: [
              {
                id: '100',
                src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                user: 'Elliot Fu',
                action: 'added you as a friend',
                date: '1 Hour Ago',
                like: '4 Likes',
                extraText: '',
                extraImages: '',
                icon: 'like',
              },
              {
                id: '101',
                src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                user: 'Cayon',
                action: 'posted on his page',
                date: '1 Hour Ago',
                like: '4 Likes',
                extraText:
                  "Ours is a life of constant reruns. We're always circling back to where\n          we'd we started, then starting all over again. Even if we don't run\n          extra laps that day, we surely will come back for more of the same\n          another day soon.",
                extraImages: '',
                icon: 'like',
              },
              {
                id: '102',
                src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                user: 'Xiye',
                action: 'Publish a group of pictures',
                date: '1 Hour Ago',
                like: '14 Likes',
                extraText: 'Pictures is beautiful~',
                extraImages:
                  'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                icon: 'like',
              },
              {
                id: '102',
                src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                user: 'Xiye',
                action: 'added 2 new illustrations',
                date: '1 Hour Ago',
                like: '14 Likes',
                extraText:
                  "Ours is a life of constant reruns. We're always circling back to where we'd we started.",
                extraImages:
                  'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                icon: 'like',
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    74838: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Feed', h: 120, displayName: '\u63d0\u8981\u7ec4\u4ef6' };
      t['default'] = a;
    },
    57267: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC } from 'react';\nimport { IItemConfig } from '@/materials/absolute-semantic/social/Item/schema';\nimport { Image, Item } from 'semantic-ui-react';\nimport logo from '../../../../assets/absolute/Logo.png';\n\n/*begin to delete*/\ninterface IItemProps extends IItemConfig {\n  isTpl: boolean;\n}\n/*end to delete*/\n\nconst SItem: FC<IItemProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { dataSource, divided, unstackable } = restProps;\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Item\" />}\n      {!isTpl && (\n        <div>\n          <Item.Group divided={divided} unstackable={unstackable}>\n            {dataSource.map((item: any) => {\n              const { src, imageSize, title, meta, desc, extra } = item;\n              return (\n                <Item>\n                  {src.length !== 0 && (\n                    <Item.Image size={imageSize} src={src} alt=\"Item-Image\" />\n                  )}\n                  {/*@ts-ignore*/}\n                  <Item.Content>\n                    <Item.Header>{title}</Item.Header>\n                    <Item.Meta>{meta}</Item.Meta>\n                    <Item.Description>{desc}</Item.Description>\n                    <Item.Extra>{extra}</Item.Extra>\n                  </Item.Content>\n                </Item>\n              );\n            })}\n          </Item.Group>\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SItem;\n",
        o = {
          editData: [
            {
              key: 'divided',
              name: '\u662f\u5426\u5206\u5272',
              type: 'Switch',
            },
            {
              key: 'unstackable',
              name: '\u79fb\u52a8\u8bbe\u5907\u4e0d\u5806\u53e0',
              type: 'Switch',
            },
            { key: 'dataSource', name: '\u6570\u636e\u6e90', type: 'DataList' },
          ],
          config: {
            divided: !0,
            unstackable: !1,
            dataSource: [
              {
                id: '12345',
                src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                imageSize: 'tiny',
                title: 'Item\u6807\u9898 1',
                meta: 'Meta-Data,\u5173\u4e8eItem 1\u5185\u5bb9\u7684\u7b80\u77ed\u63cf\u8ff0',
                desc: '\u8fd9\u662fItem\u9700\u8981\u6e32\u67d3\u7684\u5177\u4f53\u5185\u5bb9\uff0c\u867d\u7136\u662f\u957f\u6587\u672c\uff0c\u4f46\u662f\u4e0d\u5efa\u8bae\u8fc7\u957f\u3002',
                extra: '\u5176\u4f59\u4fe1\u606f',
              },
              {
                id: '12346',
                src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                imageSize: 'tiny',
                title: 'Item\u6807\u9898 2',
                meta: 'Meta-Data,\u5173\u4e8eItem 2\u5185\u5bb9\u7684\u7b80\u77ed\u63cf\u8ff0',
                desc: '\u8fd9\u662fItem\u9700\u8981\u6e32\u67d3\u7684\u5177\u4f53\u5185\u5bb9\uff0c\u867d\u7136\u662f\u957f\u6587\u672c\uff0c\u4f46\u662f\u4e0d\u5efa\u8bae\u8fc7\u957f\u3002',
                extra: '\u5176\u4f59\u4fe1\u606f',
              },
            ],
          },
          templateStr: a,
        },
        r = o;
    },
    22089: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = { type: 'Item', h: 50, displayName: '\u7b80\u4ecb\u7ec4\u4ef6' };
      t['default'] = a;
    },
    64110: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return r;
          },
        });
      var a =
          "import React, { FC, useState } from 'react';\nimport { IRatingConfig } from '@/materials/absolute-semantic/social/Rate/schema';\nimport logo from '../../../../assets/absolute/Rate.svg';\nimport { Image, Rating } from 'semantic-ui-react';\n\n/*begin to delete*/\ninterface IRatingProps extends IRatingConfig {\n  isTpl: boolean;\n  onRate?: any;\n}\n/*end to delete*/\n\nconst SRating: FC<IRatingProps> = (props) => {\n  const { isTpl, ...restProps } = props;\n\n  const { defaultRating, disabled, maxRating, size, icon } = restProps;\n\n  const [rate, setRate] = useState(defaultRating);\n\n  const handleRate = (e: any, { rating, maxRating }: any) => {\n    //console.log(e, rating, maxRating)\n    setRate(rating);\n    props.onRate &&\n      props.onRate({\n        rating: rating,\n        maxRating: maxRating,\n      });\n  };\n\n  return (\n    <React.Fragment>\n      {isTpl && <Image src={logo} alt=\"Rating\" />}\n      {!isTpl && (\n        <div>\n          {/*@ts-ignore*/}\n          <Rating\n            rating={rate}\n            maxRating={maxRating}\n            size={size}\n            icon={icon}\n            disabled={disabled}\n            onRate={(e, { rating, maxRating }) =>\n              handleRate(e, { rating, maxRating })\n            }\n          />\n        </div>\n      )}\n    </React.Fragment>\n  );\n};\n\nexport default SRating;\n",
        o = {
          editData: [
            {
              key: 'defaultRating',
              name: '\u9ed8\u8ba4\u661f\u6570',
              type: 'Text',
            },
            { key: 'disabled', name: '\u7981\u7528', type: 'Switch' },
            { key: 'maxRating', name: '\u6700\u5927\u6570', type: 'Text' },
            {
              key: 'size',
              name: '\u5c3a\u5bf8',
              type: 'Select',
              range: [
                { key: 'mini', text: 'mini' },
                { key: 'tiny', text: 'tiny' },
                { key: 'small', text: 'small' },
                { key: 'large', text: 'large' },
                { key: 'huge', text: 'huge' },
                { key: 'massive', text: 'massive' },
              ],
            },
            {
              key: 'icon',
              name: 'icon\u5f62\u72b6',
              type: 'Select',
              range: [
                { key: 'star', text: '\u661f\u578b' },
                { key: 'heart', text: '\u5fc3\u578b' },
              ],
            },
          ],
          config: {
            defaultRating: '3',
            disabled: !1,
            maxRating: '5',
            size: 'large',
            icon: 'star',
          },
          templateStr: a,
        },
        r = o;
    },
    94477: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = {
        type: 'Rating',
        h: 30,
        displayName: '\u8bc4\u5206\u7ec4\u4ef6',
      };
      t['default'] = a;
    },
    80170: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(88647),
        o = n(30384),
        r = n(58993),
        l = n(30405),
        i = n(57267),
        s = n(64110),
        c = {
          Accordion: a.default,
          Card: o.default,
          Comment: r.default,
          Feed: l.default,
          Item: i.default,
          Rating: s.default,
        };
      t['default'] = c;
    },
    44014: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(8870),
        o = n(16458),
        r = n(22438),
        l = n(51425),
        i = n(74838),
        s = n(22089),
        c = n(94477),
        d = [o.default, r.default, l.default, i.default, s.default, c.default],
        m = d.map((e) => (0, a.Z)((0, a.Z)({}, e), {}, { category: 'social' }));
      t['default'] = m;
    },
    26419: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return Xa;
          },
        });
      var a,
        o,
        r,
        l,
        i,
        s,
        c,
        d,
        m,
        p,
        u,
        g,
        b,
        y,
        f,
        h,
        x,
        k,
        v,
        C,
        S,
        T,
        I,
        w,
        P,
        E,
        R,
        F,
        A,
        Z,
        _,
        D,
        L,
        N,
        z,
        M,
        B,
        H,
        W,
        $,
        O = n(12924),
        V = n.n(O),
        j = n(57865),
        U = n(35288),
        q = n(91896),
        Q = (n(57106), n(6129)),
        K = n(8870),
        G = n(57337),
        J = (n(18106), n(86629)),
        Y = n(99889),
        X = n(29934),
        ee = n(2223),
        te = n(5405),
        ne = n(98244),
        ae = n(65425),
        oe = n(90636),
        re = n(3182),
        le = n(33761),
        ie = n(40849),
        se = (e, t, a) =>
          (0, le.dynamic)({
            loader: (function () {
              var o = (0, re.Z)(
                (0, oe.Z)().mark(function o() {
                  var r, l, i;
                  return (0, oe.Z)().wrap(function (o) {
                    while (1)
                      switch ((o.prev = o.next)) {
                        case 0:
                          return (
                            (o.next = 2),
                            n(5629)(
                              './absolute-'
                                .concat(a, '/')
                                .concat(t, '/')
                                .concat(e),
                            )
                          );
                        case 2:
                          return (
                            (r = o.sent),
                            (l = r.default),
                            (i = l),
                            o.abrupt('return', (e) => {
                              var t = e.config,
                                n = e.isTpl;
                              return V().createElement(
                                i,
                                (0, q.Z)({}, t, { isTpl: n }),
                              );
                            })
                          );
                        case 6:
                        case 'end':
                          return o.stop();
                      }
                  }, o);
                }),
              );
              function r() {
                return o.apply(this, arguments);
              }
              return r;
            })(),
            loading: () =>
              V().createElement(
                'div',
                null,
                V().createElement(
                  ie.Z,
                  { active: !0, inline: 'centered' },
                  '\u7ec4\u4ef6\u8f7d\u5165\u4e2d\uff0c\u8bf7\u7a0d\u7b49...',
                ),
              ),
          }),
        ce = (0, O.memo)((e) => {
          var t = e.type,
            n = e.config,
            a = e.category,
            o = e.ui,
            r = (0, O.useMemo)(() => se(t, a, o), [n]);
          return V().createElement(r, e);
        }),
        de = ce,
        me = n(20310),
        pe = n(69968),
        ue = n.n(pe),
        ge = n(12788),
        be = ge.ZP.div(
          a ||
            (a = (0, me.Z)([
              '\n  display: inline-block;\n  position: absolute;\n  z-index: 2;\n  border: 2px solid transparent;\n  cursor: move;\n  &:hover {\n    border: 2px solid #06c;\n  }\n  :global(a) {\n    display: block;\n    pointer-events: none;\n  }\n',
            ])),
        ),
        ye = (0, ge.ZP)(ue())(
          o ||
            (o = (0, me.Z)([
              '\n  min-height: 100vh;\n  background-size: 100%;\n  background-repeat: no-repeat;\n',
            ])),
        ),
        fe = (0, O.memo)((e) => {
          var t = e.pointData,
            n = e.pageData,
            a = e.width,
            o = e.dragStop,
            r = e.onDragStart,
            l = e.onResizeStop,
            i = e.ui;
          return V().createElement(
            ye,
            {
              cols: 24,
              rowHeight: 2,
              width: a,
              margin: [0, 0],
              onDragStart: r,
              onDragStop: o,
              onResizeStop: l,
              pageData: n,
              style: {
                backgroundColor: n && n.bgColor,
                backgroundImage:
                  n && n.bgImage
                    ? 'url('.concat(n.bgImage[0].url, ')')
                    : 'initial',
              },
            },
            t.map((e) =>
              V().createElement(
                be,
                { key: e.id, 'data-grid': e.point },
                V().createElement(
                  de,
                  (0, q.Z)({ isTpl: !1 }, e.item, { ui: i }),
                ),
              ),
            ),
          );
        }),
        he = fe,
        xe = (n(77576), n(12028)),
        ke = (n(88983), n(55742)),
        ve = (n(9715), n(55843)),
        Ce = (n(77883), n(85986)),
        Se = (n(47673), n(4107)),
        Te = (n(43358), n(9e3)),
        Ie = n(50963),
        we = (n(57663), n(71577)),
        Pe = (n(62350), n(24565)),
        Ee = n(54121),
        Re = ge.ZP.div(
          r ||
            (r = (0, me.Z)(['\n  margin-bottom: 12px;\n  display: flex;\n'])),
        ),
        Fe = ge.ZP.span(
          l ||
            (l = (0, me.Z)([
              '\n  margin-left: 12px;\n  cursor: pointer;\n  align-self: center;\n',
            ])),
        ),
        Ae = ge.ZP.div(
          i ||
            (i = (0, me.Z)([
              '\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  margin: 0;\n  padding: 0;\n  position: relative;\n',
            ])),
        ),
        Ze = (e) => {
          var t = e.value,
            n = e.onChange,
            a = () => {
              n && n([...t, '\u65b0\u589e\u9879\u76ee']);
            },
            o = (e) => {
              var a = t.filter((t, n) => n !== e);
              n && n(a);
            },
            r = (e, a) => {
              var o = t.map((t, n) => (n === e ? a.target.value : t));
              n && n(o);
            };
          return (
            (0, O.useEffect)(
              () => (
                (window['currentCates'] = t),
                () => {
                  window['currentCates'] = null;
                }
              ),
              [t],
            ),
            V().createElement(
              Ae,
              null,
              t && t.length
                ? t.map((e, t) =>
                    V().createElement(
                      Re,
                      { key: t },
                      V().createElement(Se.Z, {
                        defaultValue: e,
                        onChange: (e) => r(t, e),
                      }),
                      V().createElement(
                        Pe.Z,
                        {
                          title: '\u786e\u5b9a\u8981\u5220\u9664\u5417?',
                          onConfirm: () => o(t),
                          placement: 'leftTop',
                          okText: '\u786e\u5b9a',
                          cancelText: '\u53d6\u6d88',
                        },
                        V().createElement(
                          Fe,
                          null,
                          V().createElement(Ee.Z, null),
                        ),
                      ),
                    ),
                  )
                : V().createElement(Re, null, V().createElement(Se.Z, null)),
              t &&
                t.length < 3 &&
                V().createElement(
                  Re,
                  null,
                  V().createElement(
                    we.Z,
                    { block: !0, onClick: a },
                    '\u6dfb\u52a0\u9879\u76ee',
                  ),
                ),
            )
          );
        },
        _e = (0, O.memo)(Ze),
        De = (n(71194), n(50146)),
        Le = (n(34792), n(48086)),
        Ne = (n(43185), n(14125)),
        ze = n(49101),
        Me = n(38819),
        Be = n(59918),
        He = n(41275),
        We = J.Z.TabPane,
        $e = {
          photo: '\u7167\u7247',
          bg: '\u80cc\u666f',
          chahua: '\u63d2\u753b',
        },
        Oe = { photo: [], bg: [], chahua: [] },
        Ve = (0, ge.ZP)(Ne.Z)(
          s ||
            (s = (0, me.Z)([
              '\n  display: inline-block;\n  text-align: left;\n',
            ])),
        ),
        je = ge.ZP.div(
          c ||
            (c = (0, me.Z)([
              '\n  position: absolute;\n  left: 140px;\n  bottom: 56px;\n  display: inline-block;\n  color: #2f54eb;\n  cursor: pointer;\n  border-bottom: 1px solid #2f54eb;\n',
            ])),
        ),
        Ue = ge.ZP.span(
          d ||
            (d = (0, me.Z)([
              '\n  position: absolute;\n  visibility: hidden;\n  top: 6px;\n  right: 10px;\n  font-size: 18px;\n  color: rgb(8, 156, 8);\n',
            ])),
        ),
        qe = ge.ZP.div(
          m ||
            (m = (0, me.Z)([
              '\n  position: relative;\n  margin-right: 16px;\n  margin-bottom: 16px;\n  width: 320px;\n  max-height: 220px;\n  overflow: hidden;\n  cursor: pointer;\n\n  & img{\n    width: 100%;\n  }\n\n  &:hover{\n    ',
              ' {\n      visibility: ',
              ';\n    }\n  }\n',
            ])),
          Ue,
          (e) => (e.selected ? 'visible' : 'hidden'),
        ),
        Qe = ge.ZP.div(
          p ||
            (p = (0, me.Z)([
              '\n  display: flex;\n  flex-wrap: wrap;\n  max-height: 520px;\n  overflow: auto;\n',
            ])),
        ),
        Ke = (e) => {
          var t = e.action,
            n =
              void 0 === t
                ? He.r8
                  ? 'http://localhost:3000/api/v0/files/upload/free'
                  : '\u4f60\u7684\u670d\u52a1\u5668\u5730\u5740'
                : t,
            a = e.headers,
            o = e.withCredentials,
            r = void 0 === o || o,
            l = e.maxLen,
            i = void 0 === l ? 1 : l,
            s = e.cropRate,
            c = void 0 === s ? 375 / 158 : s,
            d = e.isCrop,
            m = (0, O.useState)(!1),
            p = (0, G.Z)(m, 2),
            u = p[0],
            g = p[1],
            b = (0, O.useState)(''),
            y = (0, G.Z)(b, 2),
            f = y[0],
            h = y[1],
            x = (0, O.useState)(!1),
            k = (0, G.Z)(x, 2),
            v = k[0],
            C = k[1],
            S = (0, O.useState)(''),
            T = (0, G.Z)(S, 2),
            I = T[0],
            w = T[1],
            P = (0, O.useState)(Oe),
            E = (0, G.Z)(P, 2),
            R = E[0],
            F = (E[1], (0, O.useState)('')),
            A = (0, G.Z)(F, 2),
            Z = A[0],
            _ = A[1],
            D = (0, O.useState)(e.fileList || []),
            L = (0, G.Z)(D, 2),
            N = L[0],
            z = L[1],
            M = () => {
              g(!1);
            },
            B = () => {
              C(!1);
            },
            H = (function () {
              var e = (0, re.Z)(
                (0, oe.Z)().mark(function e(t) {
                  return (0, oe.Z)().wrap(function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (t.url || t.preview) {
                            e.next = 4;
                            break;
                          }
                          return (e.next = 3), (0, He.y3)(t.originFileObj);
                        case 3:
                          t.preview = e.sent;
                        case 4:
                          h(t.url || t.preview),
                            g(!0),
                            w(
                              t.name ||
                                t.url.substring(t.url.lastIndexOf('/') + 1),
                            );
                        case 7:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })(),
            W = (e) => {
              _(e);
            },
            $ = () => {
              C(!0);
            },
            j = () => {
              var t = [
                {
                  uid: (0, He.Vj)(8, 16),
                  name: 'h5-electron\u56fe\u7247\u5e93',
                  status: 'done',
                  url: Z,
                },
              ];
              e.onChange && e.onChange(t), z(t), C(!1);
            },
            U = (t) => {
              var n = t.file,
                a = t.fileList;
              if ((z(a), 'done' === n.status)) {
                var o = a.map((e) => {
                  var t = e.uid,
                    n = e.name,
                    a = e.status,
                    o = e.url || e.response.result.url;
                  return { uid: t, name: n, status: a, url: o };
                });
                e.onChange && e.onChange(o);
              }
            },
            q = (e) => {
              var t =
                'image/jpeg' === e.type ||
                'image/png' === e.type ||
                'image/jpg' === e.type ||
                'image/gif' === e.type;
              t ||
                Le.default.error(
                  '\u53ea\u80fd\u4e0a\u4f20\u683c\u5f0f\u4e3ajpeg/png/gif\u7684\u56fe\u7247',
                );
              var n = e.size / 1024 / 1024 < 2;
              return (
                n ||
                  Le.default.error('\u56fe\u7247\u5fc5\u987b\u5c0f\u4e8e2MB!'),
                t && n
              );
            },
            Y = V().createElement(
              'div',
              null,
              V().createElement(ze.Z, null),
              V().createElement(
                'div',
                { className: 'ant-upload-text' },
                '\u4e0a\u4f20',
              ),
            ),
            X = Object.keys(R);
          return V().createElement(
            V().Fragment,
            null,
            d
              ? V().createElement(
                  Be.Z,
                  {
                    modalTitle: '\u88c1\u526a\u56fe\u7247',
                    modalOk: '\u786e\u5b9a',
                    modalCancel: '\u53d6\u6d88',
                    rotate: !0,
                    aspect: c,
                  },
                  V().createElement(
                    Ve,
                    {
                      fileList: N,
                      onPreview: H,
                      onChange: U,
                      name: 'file',
                      listType: 'picture-card',
                      action: n,
                      withCredentials: r,
                      headers: (0, K.Z)(
                        {
                          'x-requested-with':
                            localStorage.getItem('user') || '',
                          authorization: localStorage.getItem('token') || '',
                        },
                        a,
                      ),
                      beforeUpload: q,
                    },
                    N.length >= i ? null : Y,
                  ),
                )
              : V().createElement(
                  Ve,
                  {
                    fileList: N,
                    onPreview: H,
                    onChange: U,
                    name: 'file',
                    listType: 'picture-card',
                    action: n,
                    withCredentials: r,
                    headers: (0, K.Z)(
                      {
                        'x-requested-with': localStorage.getItem('user') || '',
                        authorization: localStorage.getItem('token') || '',
                      },
                      a,
                    ),
                    beforeUpload: q,
                  },
                  N.length >= i ? null : Y,
                ),
            V().createElement(je, { onClick: $ }, '\u56fe\u7247\u5e93'),
            V().createElement(
              De.Z,
              { open: u, title: I, footer: null, onCancel: M },
              V().createElement('img', {
                alt: '\u9884\u89c8\u56fe\u7247',
                style: { width: '100%' },
                src: f,
              }),
            ),
            V().createElement(
              De.Z,
              {
                open: v,
                title: '\u56fe\u7247\u5e93',
                okText: '\u786e\u5b9a',
                cancelText: '\u53d6\u6d88',
                width: 860,
                onCancel: B,
                onOk: j,
              },
              V().createElement(
                J.Z,
                {
                  defaultActiveKey: X[0],
                  tabPosition: 'left',
                  style: { height: 520 },
                },
                X.map((e, t) =>
                  V().createElement(
                    We,
                    { tab: $e[e], key: e },
                    V().createElement(
                      Qe,
                      null,
                      R[e] &&
                        R[e].map((e, t) =>
                          V().createElement(
                            qe,
                            { selected: Z === e, key: t, onClick: () => W(e) },
                            V().createElement('img', {
                              src: e,
                              alt: '\u8da3\u8c08\u524d\u7aef-h5-dooring',
                            }),
                            V().createElement(
                              Ue,
                              null,
                              V().createElement(Me.Z, null),
                            ),
                          ),
                        ),
                    ),
                  ),
                ),
                V().createElement(
                  We,
                  { tab: '\u66f4\u591a', key: 'more' },
                  V().createElement(Q.ZP, {
                    status: '500',
                    title: 'Dooring\u6e29\u99a8\u63d0\u793a',
                    subTitle:
                      '\u66f4\u591a\u7d20\u6750, \u6b63\u5728\u7b79\u5907\u4e2d...',
                  }),
                ),
              ),
            ),
          );
        },
        Ge = (0, O.memo)(Ke),
        Je = Te.Z.Option,
        Ye = (e) => (Array.isArray(e) ? e : e && e.fileList),
        Xe = { labelCol: { span: 6 }, wrapperCol: { span: 14 } },
        et = (e) => {
          var t = e.item,
            n = e.onSave,
            a = e.visible,
            o = (e.onCancel, e.cropRate),
            r = ve.Z.useForm(),
            l = (0, G.Z)(r, 1),
            i = l[0];
          (0, O.useEffect)(() => {
            i && t && a && i.resetFields();
          }, [i, t, a]);
          var s = (e) => {
              console.log(e), n && n(e);
            },
            c = () => {
              i.validateFields()
                .then((e) => {
                  t && ((e.id = t.id), n && n(e));
                })
                .catch((e) => {
                  console.log(e);
                });
            };
          return V().createElement(
            V().Fragment,
            null,
            !!t &&
              V().createElement(
                De.Z,
                {
                  title: '\u7f16\u8f91\u6570\u636e\u6e90',
                  closable: !1,
                  visible: a,
                  onOk: c,
                  okText: '\u786e\u5b9a',
                  forceRender: !0,
                  footer: V().createElement(
                    we.Z,
                    { type: 'primary', onClick: () => c() },
                    '\u786e\u5b9a',
                  ),
                },
                V().createElement(
                  ve.Z,
                  (0, q.Z)({ form: i, name: 'form_editor_modal' }, Xe, {
                    onFinish: s,
                    initialValues: t,
                  }),
                  V().createElement(
                    ve.Z.Item,
                    {
                      label: '\u6807\u9898',
                      name: 'title',
                      rules: [
                        {
                          required: !0,
                          message: '\u8bf7\u8f93\u5165\u6807\u9898',
                        },
                      ],
                    },
                    V().createElement(Se.Z, null),
                  ),
                  V().createElement(
                    ve.Z.Item,
                    { label: '\u63cf\u8ff0', name: 'desc' },
                    V().createElement(Se.Z, null),
                  ),
                  V().createElement(
                    ve.Z.Item,
                    { label: '\u94fe\u63a5\u5730\u5740', name: 'link' },
                    V().createElement(Se.Z, null),
                  ),
                  !!window['currentCates'] &&
                    V().createElement(
                      ve.Z.Item,
                      {
                        label: '\u5206\u7c7b',
                        name: 'type',
                        rules: [
                          {
                            required: !0,
                            message: '\u8bf7\u9009\u62e9\u5206\u7c7b!',
                          },
                        ],
                      },
                      V().createElement(
                        Te.Z,
                        { placeholder: '\u8bf7\u9009\u62e9' },
                        window['currentCates'].map((e, t) =>
                          V().createElement(Je, { value: t, key: t }, e),
                        ),
                      ),
                    ),
                  V().createElement(
                    ve.Z.Item,
                    {
                      label: '\u4e0a\u4f20\u56fe\u7247',
                      name: 'imgUrl',
                      valuePropName: 'fileList',
                      getValueFromEvent: Ye,
                    },
                    V().createElement(Ge, { cropRate: o, isCrop: !0 }),
                  ),
                ),
              ),
          );
        },
        tt = (0, O.memo)(et),
        nt = n(8212),
        at = n(59465),
        ot = n(42762),
        rt = n(5783),
        lt = n(89069),
        it = n.n(lt),
        st =
          (ge.ZP.span(
            u ||
              (u = (0, me.Z)([
                '\n  margin-right: 18px;\n  cursor: pointer;\n\n  &:last-child {\n    cursor: move;\n  }\n',
              ])),
          ),
          ge.ZP.div(
            g ||
              (g = (0, me.Z)([
                '\n  font-weight: bold;\n  padding-bottom: 5px;\n',
              ])),
          ),
          ge.ZP.div(
            b || (b = (0, me.Z)(['\n  font-size: 12px;\n  color: #ccc;\n'])),
          ),
          ge.ZP.div(
            y ||
              (y = (0, me.Z)([
                '\n  position: absolute;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  display: none;\n  background: #fff;\n  box-shadow: -20px 0 10px 10px #fff;\n',
              ])),
          )),
        ct =
          (ge.ZP.div(
            f ||
              (f = (0, me.Z)([
                '\n  position: relative;\n  padding-bottom: 6px;\n  margin-bottom: 6px;\n  border-bottom: 1px solid #f0f0f0;\n\n  &:hover{\n    ',
                '{\n      display: block;\n    }\n  }\n\n  &:last-child {\n    border-bottom: none;\n    margin-bottom: 0;\n  }\n',
              ])),
            st,
          ),
          (e) => {
            var t = e.title,
              n = e.desc,
              a = e.onDel,
              o = e.onEdit,
              r = e.isDragging,
              l = e.connectDragSource,
              i = e.connectDragPreview,
              s = e.connectDropTarget,
              c = r ? 0.5 : 1;
            return s(
              i(
                V().createElement(
                  'div',
                  {
                    className: it().listItem,
                    style: Object.assign({}, { opacity: c }),
                  },
                  V().createElement('div', { className: it().tit }, t),
                  V().createElement('div', { className: it().desc }, n),
                  V().createElement(
                    'div',
                    { className: it().actionBar },
                    V().createElement(
                      'span',
                      { className: it().action, onClick: () => o() },
                      V().createElement(nt.Z, null),
                    ),
                    V().createElement(
                      'span',
                      { className: it().action, onClick: () => a() },
                      V().createElement(at.Z, null),
                    ),
                    l(
                      V().createElement(
                        'span',
                        { className: it().action },
                        V().createElement(ot.Z, null),
                      ),
                    ),
                  ),
                ),
              ),
            );
          }),
        dt = 'item',
        mt = {
          beginDrag: (e) => ({ id: e.id, originalIndex: e.find(e.id).index }),
          endDrag(e, t) {
            var n = t.getItem(),
              a = n.id,
              o = n.originalIndex,
              r = t.didDrop();
            if (!r) return e.move(a, o);
          },
        },
        pt = (e, t) => ({
          connectDragSource: e.dragSource(),
          connectDragPreview: e.dragPreview(),
          isDragging: t.isDragging(),
        }),
        ut = {
          canDrop: () => !1,
          hover(e, t) {
            var n = t.getItem(),
              a = n.id,
              o = e.id;
            if (a !== o) {
              var r = e.find(o),
                l = r.index;
              e.move(a, l);
            }
          },
        },
        gt = (e) => ({ connectDropTarget: e.dropTarget() }),
        bt = (0, rt.DropTarget)(dt, ut, gt)((0, rt.DragSource)(dt, mt, pt)(ct)),
        yt = ge.ZP.div(
          h ||
            (h = (0, me.Z)([
              '\n  padding: 6px 10px;\n  border: 1px solid #f0f0f0;\n  text-align: justify;\n  padding-left: 10px;\n  padding-top: 10px;\n',
            ])),
        ),
        ft = (e) => {
          var t = e.onChange,
            n = e.value,
            a = e.connectDropTarget,
            o = e.cropRate,
            r = (0, O.useState)(n),
            l = (0, G.Z)(r, 2),
            i = l[0],
            s = l[1],
            c = (0, O.useState)(!1),
            d = (0, G.Z)(c, 2),
            m = d[0],
            p = d[1],
            u = (0, O.useState)(),
            g = (0, G.Z)(u, 2),
            b = g[0],
            y = g[1],
            f = (e) => {
              if (n && t) {
                var a = n.filter((t) => e !== t.id);
                t(a);
              }
            },
            h = (e) => {
              var t = i.find((t) => ''.concat(t.id) === e);
              return { item: t, index: i.indexOf(t) };
            },
            x = (e, n) => {
              var a = h(e),
                o = a.item,
                r = a.index,
                l = [...i];
              l.splice(r, 1), l.splice(n, 0, o), t ? t(l) : s(l);
            },
            k = (0, O.useCallback)(() => {
              p(!1);
            }, []),
            v = (0, O.useCallback)((e) => {
              p(!0), y(e);
            }, []),
            C = (0, O.useCallback)(
              (e) => {
                p(!1),
                  t
                    ? t(i.map((t) => (t.id === e.id ? e : t)))
                    : s((t) => t.map((t) => (t.id === e.id ? e : t)));
              },
              [i, t],
            ),
            S = () => {
              var e = {
                title: '\u65b0\u589e\u9879\u6807\u9898',
                desc: '\u65b0\u589e\u9879\u63cf\u8ff0',
                id: (0, He.Vj)(8, 10),
                imgUrl: [],
                link: '',
              };
              t ? t([...i, e]) : s([...i, e]);
            };
          return (
            (0, O.useEffect)(() => {
              s(n);
            }, [n]),
            a(
              V().createElement(
                'div',
                null,
                V().createElement(
                  yt,
                  null,
                  !(!i || !i.length) &&
                    i.map((e, t) =>
                      V().createElement(
                        'div',
                        null,
                        V().createElement(
                          bt,
                          (0, q.Z)({}, e, {
                            onDel: () => f(e.id),
                            onEdit: () => v(e),
                            key: t,
                            id: ''.concat(e.id),
                            find: h,
                            move: x,
                          }),
                        ),
                      ),
                    ),
                  V().createElement(
                    'div',
                    { style: { marginTop: '10px' } },
                    V().createElement(
                      we.Z,
                      { onClick: S, block: !0 },
                      '\u6dfb\u52a0',
                    ),
                  ),
                  V().createElement(tt, {
                    visible: m,
                    onCancel: k,
                    item: b,
                    onSave: C,
                    cropRate: o,
                  }),
                ),
              ),
            )
          );
        },
        ht = (0, rt.DropTarget)(dt, {}, (e) => ({
          connectDropTarget: e.dropTarget(),
        }))(ft),
        xt = (e) =>
          V().createElement(U.W, { backend: j.PD }, V().createElement(ht, e)),
        kt = (0, O.memo)(xt),
        vt = n(70505),
        Ct = ge.ZP.div(
          x ||
            (x = (0, me.Z)([
              '\n  background: #fff;\n  border-radius: 1px;\n  box-shadow: 0 0 0 1px rgba(0,0,0,0.1);\n  display: inline-block;\n  cursor: pointer;\n',
            ])),
        ),
        St = ge.ZP.div(
          k ||
            (k = (0, me.Z)([
              '\n  width: 20px;\n  height: 20px;\n  border-radius: 2px;\n  background: ',
              ';\n',
            ])),
          (e) =>
            'rgba('
              .concat(e._color.r, ', ')
              .concat(e._color.g, ', ')
              .concat(e._color.b, ', ')
              .concat(e._color.a, ')'),
        ),
        Tt = ge.ZP.div(
          v || (v = (0, me.Z)(['\n  position: absolute;\n  z-index: 999;\n'])),
        ),
        It = ge.ZP.div(
          C ||
            (C = (0, me.Z)([
              '\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 900;\n',
            ])),
        ),
        wt = (e) => {
          var t = (0, O.useState)(!1),
            n = (0, G.Z)(t, 2),
            a = n[0],
            o = n[1],
            r = (0, O.useState)((0, He.Ub)(e.value)),
            l = (0, G.Z)(r, 2),
            i = l[0],
            s = l[1],
            c = () => {
              o(!a);
            },
            d = () => {
              o(!1);
            },
            m = (t) => {
              s(t.rgb),
                e.onChange &&
                  e.onChange(
                    'rgba('
                      .concat(t.rgb.r, ',')
                      .concat(t.rgb.g, ',')
                      .concat(t.rgb.b, ',')
                      .concat(t.rgb.a, ')'),
                  );
            };
          return V().createElement(
            V().Fragment,
            null,
            V().createElement(
              'div',
              null,
              V().createElement(
                Ct,
                { onClick: c },
                V().createElement(St, { _color: i }),
              ),
              a
                ? V().createElement(
                    V().Fragment,
                    null,
                    V().createElement(
                      Tt,
                      null,
                      V().createElement(vt.xS, { color: i, onChange: m }),
                    ),
                    V().createElement(It, { onClick: d }),
                  )
                : null,
            ),
          );
        },
        Pt = wt,
        Et = Pt,
        Rt = n(65382),
        Ft = ge.ZP.div(
          S ||
            (S = (0, me.Z)([
              '\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0;\n  padding: 0;\n  position: relative;\n',
            ])),
        ),
        At = ge.ZP.div(
          T ||
            (T = (0, me.Z)([
              '\n  display: inline-block;\n  padding: 10px;\n  border: 2px solid transparent;\n  cursor: pointer;\n  &:hover {\n    border-color: #4091f7;\n  }\n  border-color: ',
              ';\n',
            ])),
          (e) => (e.selected ? '#4091f7' : '#fff'),
        ),
        Zt = (0, ge.ZP)(Rt.Z)(
          I ||
            (I = (0, me.Z)([
              '\n  size: 20px!important;\n  color: #4091f7!important;\n',
            ])),
        ),
        _t = (e) => {
          var t = e.type,
            n = e.icons,
            a = e.onChange,
            o = (0, O.useState)(t),
            r = (0, G.Z)(o, 2),
            l = r[0],
            i = r[1],
            s = (e) => {
              a ? a(e) : i(e);
            };
          return (
            (0, O.useEffect)(() => {
              i(t);
            }, [t]),
            V().createElement(
              Ft,
              null,
              n.map((e, t) =>
                V().createElement(
                  At,
                  { selected: l === e, key: t, onClick: () => s(e) },
                  V().createElement(Zt, { name: e, loading: !1 }),
                ),
              ),
            )
          );
        },
        Dt = (0, O.memo)(_t),
        Lt = (n(85539), n(3437)),
        Nt = n(93224),
        zt = n(7869),
        Mt = n.n(zt),
        Bt = ['index'],
        Ht = [
          'title',
          'editable',
          'children',
          'dataIndex',
          'record',
          'handleSave',
        ],
        Wt = (0, O.createContext)(null),
        $t = (e) => {
          e.index;
          var t = (0, Nt.Z)(e, Bt),
            n = ve.Z.useForm(),
            a = (0, G.Z)(n, 1),
            o = a[0];
          return V().createElement(
            V().Fragment,
            null,
            V().createElement(
              ve.Z,
              { form: o, component: !1 },
              V().createElement(
                Wt.Provider,
                { value: o },
                V().createElement('tr', t),
              ),
            ),
          );
        },
        Ot = (e) => {
          var t = e.title,
            n = e.editable,
            a = e.children,
            o = e.dataIndex,
            r = e.record,
            l = e.handleSave,
            i = (0, Nt.Z)(e, Ht),
            s = (0, O.useContext)(Wt),
            c = (0, O.useState)(!1),
            d = (0, G.Z)(c, 2),
            m = d[0],
            p = d[1],
            u = (0, O.useRef)(null);
          (0, O.useEffect)(() => {
            var e;
            m && (null === (e = u.current) || void 0 === e || e.focus());
          }, [m]);
          var g = () => {
              p(!m), s.setFieldValue({ [o]: r[o] });
            },
            b = (function () {
              var e = (0, re.Z)(
                (0, oe.Z)().mark(function e() {
                  var t;
                  return (0, oe.Z)().wrap(
                    function (e) {
                      while (1)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0), (e.next = 3), s.validateFields()
                            );
                          case 3:
                            (t = e.sent),
                              g(),
                              l((0, K.Z)((0, K.Z)({}, r), t)),
                              (e.next = 11);
                            break;
                          case 8:
                            (e.prev = 8),
                              (e.t0 = e['catch'](0)),
                              console.log('Save failed: ', e.t0);
                          case 11:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 8]],
                  );
                }),
              );
              return function () {
                return e.apply(this, arguments);
              };
            })(),
            y = a;
          return (
            n &&
              (y = m
                ? V().createElement(
                    ve.Z.Item,
                    {
                      name: o,
                      rules: [
                        {
                          required: !0,
                          message: ''.concat(t, '\u662f\u5fc5\u586b\u7684'),
                        },
                      ],
                    },
                    V().createElement(Se.Z, {
                      ref: u,
                      onPressEnter: b,
                      onBlur: b,
                    }),
                  )
                : V().createElement(
                    'div',
                    {
                      className: 'editable-cell-value-wrap',
                      style: { paddingRight: 24 },
                      onClick: g,
                    },
                    a,
                  )),
            V().createElement('td', i, y)
          );
        },
        Vt = ge.ZP.div(w || (w = (0, me.Z)(['\n  margin-bottom: 16px;\n']))),
        jt = ge.ZP.div(
          P ||
            (P = (0, me.Z)([
              '\n  position: relative;\n  padding: 0;\n  margin: 0;\n',
            ])),
        ),
        Ut = (e) => {
          var t = e.data && e.data.map((e, t) => (0, K.Z)({ key: t + '' }, e)),
            n = (0, O.useState)(t),
            a = (0, G.Z)(n, 2),
            o = a[0],
            r = a[1],
            l = (0, O.useState)(!1),
            i = (0, G.Z)(l, 2),
            s = i[0],
            c = i[1],
            d = (0, O.useState)(!1),
            m = (0, G.Z)(d, 2),
            p = m[0],
            u = m[1],
            g = (0, O.useState)(''),
            b = (0, G.Z)(g, 2),
            y = b[0],
            f = b[1],
            h = [
              {
                title: '\u540d\u5b57',
                dataIndex: 'name',
                width: '180px',
                editable: !0,
              },
              {
                title: '\u503c',
                dataIndex: 'value',
                width: '120px',
                editable: !0,
              },
              {
                title: '\u64cd\u4f5c',
                dataIndex: 'operation',
                render: (e, t) =>
                  o.length >= 1
                    ? V().createElement(
                        Pe.Z,
                        { title: 'Sure to delete?', onConfirm: () => k(t.key) },
                        V().createElement(
                          we.Z,
                          { type: 'link' },
                          '\u5220\u9664',
                        ),
                      )
                    : null,
              },
            ],
            x = { api: '', header: '', dataField: '' },
            k = (t) => {
              var n = [...o],
                a = n.filter((e) => e.key !== t);
              r(a), e.onChange && e.onChange(a);
            },
            v = () => {
              var t = (0, He.Vj)(8, 10),
                n = {
                  key: t,
                  name: 'envelope '.concat(o.length + 1),
                  value: 32,
                },
                a = [...o, n];
              r(a), e.onChange && e.onChange(a);
            },
            C = (t) => {
              var n = [...o],
                a = n.findIndex((e) => e.key === t.key),
                l = n[a];
              n.splice(a, 1, (0, K.Z)((0, K.Z)({}, l), t)),
                r(n),
                e.onChange && e.onChange(n);
            },
            S = () => {
              c(!0);
            },
            T = (e) => {
              c(!1);
            },
            I = (e) => {
              c(!1);
            },
            w = () => {
              u(!0);
            },
            P = () => {
              var t = x.dataField;
              if (t) {
                var n = y[t];
                n &&
                  n instanceof Array &&
                  ((n = n.map((e, t) => (0, K.Z)({ key: t + '' }, e))),
                  r(n),
                  e.onChange && e.onChange(n)),
                  u(!1);
              }
            },
            E = () => {
              u(!1);
            },
            R = (e, t) => {
              x[e] = t;
            },
            F = () => {
              console.log(x);
              var e = x.api,
                t = x.header;
              fetch(e, {
                cache: 'no-cache',
                headers: Object.assign(
                  { 'content-type': 'application/json' },
                  t ? JSON.parse(t) : {},
                ),
                method: 'GET',
                mode: 'cors',
              })
                .then((e) => e.json())
                .then((e) => {
                  f(e);
                });
            },
            A = { body: { row: $t, cell: Ot } },
            Z = h.map((e) =>
              e.editable
                ? (0, K.Z)(
                    (0, K.Z)({}, e),
                    {},
                    {
                      onCell: (t) => ({
                        record: t,
                        editable: e.editable,
                        dataIndex: e.dataIndex,
                        title: e.title,
                        handleSave: C,
                      }),
                    },
                  )
                : e,
            ),
            _ = {
              name: 'file',
              showUploadList: !1,
              beforeUpload(t, n) {
                var a = new FileReader();
                (a.onload = function (t) {
                  var n = t.target.result,
                    a = Mt().read(n, { type: 'binary' }),
                    o = a.SheetNames,
                    l = {};
                  o.forEach((e) => {
                    var t = a.Sheets[e];
                    for (var n in t)
                      '!' !== n[0] &&
                        (l[n[0]] ? l[n[0]].push(t[n].v) : (l[n[0]] = [t[n].v]));
                  });
                  var i = Object.values(l).map((e, t) => ({
                    key: t + '',
                    name: e[0],
                    value: e[1],
                  }));
                  r(i), e.onChange && e.onChange(i);
                }),
                  a.readAsBinaryString(t);
              },
            };
          return V().createElement(
            O.Fragment,
            null,
            V().createElement(
              'div',
              null,
              V().createElement(
                we.Z,
                { type: 'primary', onClick: S },
                '\u7f16\u8f91\u6570\u636e\u6e90',
              ),
              V().createElement(
                De.Z,
                {
                  title: '\u7f16\u8f91\u6570\u636e\u6e90',
                  visible: s,
                  onOk: T,
                  onCancel: I,
                  okText: '\u786e\u5b9a',
                  cancelText: '\u53d6\u6d88',
                },
                V().createElement(
                  we.Z,
                  {
                    onClick: v,
                    type: 'primary',
                    style: { marginBottom: 16, marginRight: 16 },
                  },
                  '\u6dfb\u52a0\u884c',
                ),
                V().createElement(
                  Ne.Z,
                  _,
                  V().createElement(
                    we.Z,
                    { type: 'primary', ghost: !0, style: { marginRight: 16 } },
                    '\u5bfc\u5165Excel',
                  ),
                ),
                V().createElement(
                  we.Z,
                  { type: 'primary', ghost: !0, onClick: w },
                  '\u7b2c\u4e09\u65b9API',
                ),
                V().createElement(Lt.Z, {
                  components: A,
                  rowClassName: () => 'editable-row',
                  bordered: !0,
                  dataSource: o,
                  columns: Z,
                  pagination: { pageSize: 50 },
                  scroll: { y: 240 },
                }),
              ),
              V().createElement(
                De.Z,
                {
                  title: '\u914d\u7f6eapi',
                  visible: p,
                  onOk: P,
                  onCancel: E,
                  okText: '\u786e\u5b9a',
                  cancelText: '\u53d6\u6d88',
                },
                V().createElement(
                  jt,
                  null,
                  V().createElement(
                    Vt,
                    null,
                    V().createElement(Se.Z, {
                      placeholder: '\u8bf7\u8f93\u5165api\u5730\u5740',
                      onChange: (e) => R('api', e.target.value),
                    }),
                  ),
                  V().createElement(
                    Vt,
                    null,
                    V().createElement(Se.Z.TextArea, {
                      placeholder:
                        '\u8bf7\u8f93\u5165\u5934\u4fe1\u606f\uff0c \u5982{token: 123456}\uff0c\u683c\u5f0f\u5fc5\u987b\u4e3ajson',
                      rows: 4,
                      onChange: (e) => R('header', e.target.value),
                    }),
                  ),
                  V().createElement(
                    Vt,
                    null,
                    V().createElement(
                      we.Z,
                      { type: 'primary', onClick: F },
                      '\u53d1\u9001\u8bf7\u6c42',
                    ),
                  ),
                  y &&
                    V().createElement(
                      O.Fragment,
                      null,
                      V().createElement(
                        Vt,
                        null,
                        V().createElement(Se.Z.TextArea, {
                          rows: 6,
                          value: JSON.stringify(y),
                        }),
                      ),
                      V().createElement(
                        Vt,
                        null,
                        V().createElement(Se.Z, {
                          placeholder:
                            '\u8bbe\u7f6e\u6570\u636e\u6e90\u5b57\u6bb5',
                          onChange: (e) => R('dataField', e.target.value),
                        }),
                        V().createElement(
                          'p',
                          { style: { color: 'red' } },
                          '\u6570\u636e\u6e90\u5b57\u6bb5\u662f\u63a5\u53e3\u8fd4\u56de\u7684\u56fe\u8868\u6570\u636e\u5bf9\u5e94\u7684\u5b57\u6bb5\uff0c\u5fc5\u586b\uff0c\u72d7\u5219\u65e0\u6cd5\u6b63\u786e\u5bfc\u5165\u6570\u636e',
                        ),
                      ),
                    ),
                ),
              ),
            ),
          );
        },
        qt = (0, O.memo)(Ut),
        Qt = ge.ZP.span(
          E ||
            (E = (0, me.Z)([
              '\n  margin-right: 3px;\n  font-size: inherit;\n  font-family: inherit;\n',
            ])),
        ),
        Kt = ge.ZP.div(R || (R = (0, me.Z)(['\n  margin-right: 10px;\n']))),
        Gt = ge.ZP.div(
          F ||
            (F = (0, me.Z)([
              '\n  display: flex;\n  justify-content: flex-end;\n  margin-right: -10px;\n  padding: 0;\n  position: relative;\n',
            ])),
        ),
        Jt = (e) => {
          var t = e.value,
            n = e.onChange,
            a = (0, O.useState)(t && t[0]),
            o = (0, G.Z)(a, 2),
            r = o[0],
            l = o[1],
            i = (0, O.useState)(t && t[1]),
            s = (0, G.Z)(i, 2),
            c = s[0],
            d = s[1],
            m = (e, a) => {
              var o = t || [];
              (o[e] = a), 0 === e ? l(a) : d(a), n && n(o);
            };
          return V().createElement(
            V().Fragment,
            null,
            V().createElement(
              Gt,
              null,
              V().createElement(
                Kt,
                null,
                V().createElement(Qt, null, 'X: '),
                V().createElement(Ce.Z, {
                  value: r,
                  defaultValue: r,
                  onChange: (e) => m(0, e),
                }),
              ),
              V().createElement(
                Kt,
                null,
                V().createElement(Qt, null, 'Y: '),
                V().createElement(Ce.Z, {
                  value: c,
                  defaultValue: c,
                  onChange: (e) => m(1, e),
                }),
              ),
            ),
          );
        },
        Yt = (0, O.memo)(Jt),
        Xt = n(85589),
        en = n.n(Xt),
        tn = n(9669),
        nn = n.n(tn),
        an = [
          { key: 'bold', text: V().createElement('b', null, '\u52a0\u7c97') },
          'undo',
          'redo',
          'emoji',
          'list-ul',
          'list-ol',
          'blockquote',
          'text-align',
          'font-size',
          'line-height',
          'letter-spacing',
          'text-color',
          'italic',
          'underline',
          'link',
          'media',
        ],
        on = (e) => {
          var t = e.value,
            n = e.onChange,
            a = (0, O.useState)(en().createEditorState(t)),
            o = (0, G.Z)(a, 2),
            r = o[0],
            l = o[1];
          (0, O.useEffect)(() => {
            var e = t || '';
            l(en().createEditorState(e));
          }, []);
          var i = (e) => {
              var t = new FormData();
              t.append('file', e.file),
                nn()
                  .post('xxxx', t, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: function (t) {
                      console.log((t.loaded / t.total) * 100),
                        e.progress((t.loaded / t.total) * 100);
                    },
                  })
                  .then((t) => {
                    e.success({
                      url: t.url,
                      meta: {
                        id: Date.now(),
                        title: t.filename,
                        alt: '\u8da3\u8c08\u524d\u7aef',
                      },
                    });
                  })
                  .catch((t) => {
                    e.error({ msg: '\u4e0a\u4f20\u5931\u8d25.' });
                  });
            },
            s = () => {
              var e = r.toHTML();
              n && n(e);
            },
            c = (e) => {
              if ((l(e), n)) {
                var t = e.toHTML();
                n(t);
              }
            };
          return V().createElement(en(), {
            value: r,
            controls: an,
            onChange: c,
            onSave: s,
            media: { uploadFn: i },
          });
        },
        rn = (0, O.memo)(on),
        ln = (n(54421), n(38272)),
        sn = Te.Z.Option,
        cn = { labelCol: { span: 6 }, wrapperCol: { span: 14 } },
        dn = (e) => {
          var t = e.item,
            n = e.onSave,
            a = e.visible,
            o = ve.Z.useForm(),
            r = (0, G.Z)(o, 1),
            l = r[0];
          (0, O.useEffect)(() => {
            l && t && a && l.resetFields();
          }, [l, t, a]);
          var i = (e) => {
              n && n(e);
            },
            s = () => {
              l.validateFields()
                .then((e) => {
                  (e.id = t.id), n && n(e);
                })
                .catch((e) => {
                  console.log(e);
                });
            };
          return V().createElement(
            V().Fragment,
            null,
            !!t &&
              V().createElement(
                De.Z,
                {
                  title: '\u7f16\u8f91\u8868\u5355\u7ec4\u4ef6',
                  footer: V().createElement(
                    'div',
                    null,
                    V().createElement(
                      we.Z,
                      { type: 'primary', onClick: s },
                      '\u786e\u5b9a',
                    ),
                  ),
                  forceRender: !0,
                  visible: a,
                  onOk: s,
                  closable: !1,
                },
                V().createElement(
                  ve.Z,
                  (0, q.Z)({ form: l, name: 'formItem_editor_modal' }, cn, {
                    onFinish: i,
                    initialValues: t,
                  }),
                  V().createElement(
                    ve.Z.Item,
                    { label: '\u7c7b\u578b', name: 'type', hidden: !0 },
                    V().createElement(Se.Z, null),
                  ),
                  !!t.label &&
                    V().createElement(
                      ve.Z.Item,
                      {
                        label: '\u5b57\u6bb5\u540d',
                        name: 'label',
                        rules: [
                          {
                            required: !0,
                            message: '\u8bf7\u8f93\u5165\u5b57\u6bb5\u540d',
                          },
                        ],
                      },
                      V().createElement(Se.Z, null),
                    ),
                  !!t.fontSize &&
                    V().createElement(
                      ve.Z.Item,
                      {
                        label: '\u5b57\u4f53\u5927\u5c0f',
                        name: 'fontSize',
                        rules: [
                          {
                            required: !0,
                            message:
                              '\u8bf7\u8f93\u5165\u5b57\u4f53\u5927\u5c0f',
                          },
                        ],
                      },
                      V().createElement(Ce.Z, {
                        min: 12,
                        max: 30,
                        defaultValue: 14,
                      }),
                    ),
                  !!t.color &&
                    V().createElement(
                      ve.Z.Item,
                      {
                        label: '\u6587\u5b57\u989c\u8272',
                        name: 'color',
                        rules: [
                          {
                            required: !0,
                            message:
                              '\u8bf7\u8f93\u5165\u6587\u5b57\u989c\u8272',
                          },
                        ],
                      },
                      V().createElement(Pt, null),
                    ),
                  !!t.placeholder &&
                    V().createElement(
                      ve.Z.Item,
                      {
                        label: '\u63d0\u793a\u6587\u672c',
                        name: 'placeholder',
                      },
                      V().createElement(Se.Z, {
                        placeholder: '\u63d0\u793a\u6587\u672c',
                      }),
                    ),
                  !!t.options &&
                    V().createElement(
                      ve.Z.Item,
                      {
                        label: '\u9009\u9879\u6e90',
                        name: 'options',
                        rules: [
                          {
                            required: !0,
                            message: '\u9009\u9879\u4e0d\u80fd\u4e3a\u7a7a',
                          },
                        ],
                      },
                      V().createElement(
                        Te.Z,
                        {
                          placeholder: '\u8bf7\u8f93\u5165',
                          mode: 'tags',
                          labelInValue: !0,
                          maxTagCount: 39,
                          maxTagTextLength: 16,
                        },
                        t.options.map((e, t) =>
                          V().createElement(
                            sn,
                            { value: e.value, key: t },
                            e.label,
                          ),
                        ),
                      ),
                    ),
                ),
              ),
          );
        },
        mn = (0, O.memo)(dn),
        pn = n(26511),
        un = n(78680),
        gn = n(6350),
        bn = (0, ge.ZP)(we.Z)(
          A ||
            (A = (0, me.Z)([
              '\n  color: #fff;\n  background-color: #4A4A4A;\n',
            ])),
        ),
        yn = (0, ge.ZP)(bn)(
          Z || (Z = (0, me.Z)(['\n  border-radius: 2px;\n  line-height:0;\n'])),
        ),
        fn = {
          Text: (e) => {
            var t = e.label,
              n = e.onChange;
            return V().createElement(yn, { onChange: () => n }, t);
          },
          Textarea: (e) => {
            var t = e.label,
              n = e.onChange;
            return V().createElement(bn, { onChange: () => n }, t);
          },
          Number: (e) => {
            var t = e.label,
              n = e.onChange;
            return V().createElement(bn, { onChange: () => n }, t);
          },
          MyRadio: (e) => {
            var t = e.label,
              n = e.onChange;
            return V().createElement(bn, { onChange: () => n }, t);
          },
          MyCheckbox: (e) => {
            var t = e.label,
              n = e.onChange;
            return V().createElement(
              'div',
              null,
              V().createElement(bn, { onChange: () => n }, t),
            );
          },
          Date: (function (e) {
            function t(t) {
              return e.apply(this, arguments);
            }
            return (
              (t.toString = function () {
                return e.toString();
              }),
              t
            );
          })((e) => {
            var t = e.label,
              n = e.onChange;
            return V().createElement(bn, { onChange: () => n }, t);
          }),
          MySelect: (e) => {
            var t = e.label,
              n = e.onChange;
            return V().createElement(bn, { onChange: () => n }, t);
          },
          MyTextTip: (e) => {
            var t = e.label;
            return V().createElement(yn, null, t);
          },
        },
        hn = fn,
        xn = [
          {
            id: '1',
            type: 'Text',
            label: '\u6587\u672c\u6846',
            placeholder: '\u8bf7\u8f93\u5165\u6587\u672c',
          },
          {
            id: '2',
            type: 'Textarea',
            label: '\u957f\u6587\u672c\u6846',
            placeholder:
              '\u8bf7\u8f93\u5165\u957f\u6587\u672c\u8bf7\u8f93\u5165\u957f\u6587\u672c',
          },
          {
            id: '3',
            type: 'Number',
            label: '\u6570\u503c',
            placeholder: ' \u8bf7\u8f93\u5165\u6570\u503c',
          },
          {
            id: '4',
            type: 'MyRadio',
            label: '\u5355\u9009\u6846',
            options: [
              { label: '\u9009\u9879\u4e00', value: '1' },
              { label: '\u9009\u9879\u4e8c', value: '2' },
            ],
          },
          {
            id: '5',
            type: 'MySelect',
            label: '\u4e0b\u62c9\u9009\u62e9\u6846',
            options: [
              { label: '\u9009\u9879\u4e00', value: '1' },
              { label: '\u9009\u9879\u4e8c', value: '2' },
              { label: '\u9009\u9879\u4e09', value: '3' },
            ],
          },
          {
            id: '6',
            type: 'Date',
            label: '\u65e5\u671f\u6846',
            placeholder: '',
          },
          {
            id: '7',
            type: 'MyTextTip',
            label: '\u7eaf\u6587\u672c',
            fontSize: 12,
            color: 'rgba(0,0,0,1)',
          },
        ],
        kn = ge.ZP.div(
          _ ||
            (_ = (0, me.Z)([
              '\n  font-size: 14px;\n  font-weight: 400;\n  color: #4a4a4a;\n  line-height: 20px;\n  background-color: #2f54eb;\n',
            ])),
        ),
        vn = ge.ZP.span(
          D ||
            (D = (0, me.Z)([
              '\n  margin-right: 15px;\n  display: inline-block;\n  cursor: pointer;\n',
            ])),
        ),
        Cn = ge.ZP.div(L || (L = (0, me.Z)(['\n  color: #fff;\n']))),
        Sn = ge.ZP.div(N || (N = (0, me.Z)(['\n  right: -18px;\n']))),
        Tn = ge.ZP.div(z || (z = (0, me.Z)(['\n  left: 0;\n']))),
        In = ge.ZP.div(
          M ||
            (M = (0, me.Z)([
              '\n  position: relative;\n  padding-left: 2px;\n\n  ',
              ',\n  ',
              '{\n    position: absolute;\n    top: 19px;\n    box-shadow: 0 0 20px #fff;\n    ',
              '{\n      margin-right: 15px;\n      display: inline-block;\n      cursor: pointer;\n    }\n  }\n',
            ])),
          Tn,
          Sn,
          vn,
        ),
        wn = ge.ZP.div(
          B || (B = (0, me.Z)(['\n  text-align: left;\n  width: 251px;\n'])),
        ),
        Pn = ge.ZP.div(
          H ||
            (H = (0, me.Z)([
              '\n  margin-top: 12px;\n  border-top: 1px dashed #ccc;\n  padding-top: 16px;\n  background-color: #4a4a4a;\n  ',
              "{\n    button,\n    [type='button'] {\n      color: #fff;\n      background-color: #4a4a4a;\n      border: 1px solid #fff;\n      border-radius: 4px 0px 0px 0px;\n    }\n    position: relative;\n    border: 1px solid #ccc;\n    margin-bottom: 2px;\n    background-color: #4a4a4a;\n    cursor: pointer;\n\n    ",
              '{\n      pointer-events: none;\n    }\n\n    &:hover{\n      border-color: #2f54eb;\n      position: absolute;\n      right: 0;\n      top: 50%;\n      transform: translateY(-50%);\n      padding: 3px 6px;\n      color: #fff;\n      border-radius: 3px;\n      background-color: #2f54eb;\n      cursor: pointer;\n      display: inline-block;\n    }\n  }\n',
            ])),
          In,
          Cn,
        ),
        En = ge.ZP.div(
          W ||
            (W = (0, me.Z)([
              '\n  width: 56px;\n  height: 20px;\n  font-size: 14px;\n  font-family: PingFangSC-Medium, PingFang SC, serif;\n  font-weight: bold;\n  color: #000000;\n  line-height: 20px;\n',
            ])),
        ),
        Rn = ge.ZP.div($ || ($ = (0, me.Z)(['\n  position: relative;\n']))),
        Fn = (e) => {
          var t = e.formList,
            n = e.onChange,
            a = e.rightPannelRef,
            o = (0, O.useState)(t || []),
            r = (0, G.Z)(o, 2),
            l = r[0],
            i = r[1],
            s = (0, O.useState)(!1),
            c = (0, G.Z)(s, 2),
            d = c[0],
            m = c[1],
            p = (0, O.useState)(),
            u = (0, G.Z)(p, 2),
            g = u[0],
            b = u[1],
            y = (0, O.useState)({ force: () => {} }),
            f = (0, G.Z)(y, 2),
            h = f[0],
            x = f[1],
            k = (e) => {
              var t = xn.find((t) => t.type === e.type),
                a = [
                  ...l,
                  (0, K.Z)((0, K.Z)({}, t), {}, { id: (0, He.Vj)(6, 10) }),
                ];
              i(a), n && n(a), h.force();
            },
            v = (e) => {
              m(!0), b(e);
            },
            C = (e) => {
              var t = l.filter((t) => t.id !== e.id);
              i(t), n && n(t);
            },
            S = (e) => {
              var t = l.map((t) => (t.id === e.id ? e : t));
              i(t), n && n(t), m(!1);
            },
            T = (0, O.useCallback)((e) => {
              console.log(e), x({ force: e });
            }, []);
          return (
            (0, O.useEffect)(() => {
              var e;
              return (
                a.current &&
                  ((e = () => {
                    h.force();
                  }),
                  a.current.addEventListener('scroll', e)),
                () => {
                  a.current && a.current.removeEventListener('scroll', e);
                }
              );
            }, [h, a]),
            V().createElement(
              Rn,
              null,
              V().createElement(En, null, '\u8868\u5355\u63a7\u4ef6'),
              V().createElement(
                wn,
                null,
                l.map((e, t) => {
                  var n = gn.Z[e.type];
                  return V().createElement(
                    In,
                    { key: t },
                    V().createElement(
                      Cn,
                      null,
                      V().createElement(ln.ZP, null, V().createElement(n, e)),
                    ),
                    V().createElement(
                      Tn,
                      null,
                      V().createElement(
                        vn,
                        { onClick: () => C(e) },
                        V().createElement(Ee.Z, null),
                      ),
                    ),
                    V().createElement(
                      Sn,
                      null,
                      V().createElement(
                        vn,
                        { onClick: () => v(e) },
                        V().createElement(pn.Z, null),
                      ),
                    ),
                  );
                }),
                V().createElement(
                  kn,
                  null,
                  V().createElement(
                    un.Z,
                    {
                      content: V().createElement(
                        O.Fragment,
                        null,
                        V().createElement(
                          Pn,
                          { style: { color: 'red' } },
                          xn.map((e, t) => {
                            var n = hn[e.type];
                            return V().createElement(
                              In,
                              { key: t, onClick: () => k(e) },
                              V().createElement(
                                Cn,
                                {
                                  style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'row',
                                    marginTop: '10px',
                                  },
                                },
                                V().createElement(n, e),
                              ),
                            );
                          }),
                        ),
                      ),
                      directions: 'LB',
                      innerConstDomStyle: { display: 'block' },
                      constDomStyle: { display: 'block' },
                      callback: T,
                    },
                    V().createElement(
                      we.Z,
                      {
                        style: { width: '100%' },
                        block: !0,
                        icon: V().createElement(ze.Z, null),
                      },
                      '\u6dfb\u52a0',
                    ),
                  ),
                ),
              ),
              V().createElement(mn, { item: g, onSave: S, visible: d }),
            )
          );
        },
        An = (0, O.memo)(Fn),
        Zn = Te.Z.Option,
        _n = Se.Z.TextArea,
        Dn = (e) => (
          console.log('Upload event: ', e),
          Array.isArray(e) ? e : e && e.fileList
        ),
        Ln = (e) => {
          var t = e.config,
            n = e.defaultValue,
            a = e.onSave,
            o = e.uid,
            r = e.rightPannelRef,
            l = (0, Ie.cI)(),
            i = (0, G.Z)(l, 1),
            s = i[0],
            c = (e) => {
              a && a(e);
            };
          (0, O.useEffect)(
            () => (
              console.log(s.getFieldsValue()),
              () => {
                s.resetFields();
              }
            ),
            [o, s],
          );
          var d = () => {
            console.log(s.getFieldsValue()), c(s.getFieldsValue());
          };
          return V().createElement(
            ve.Z,
            {
              name: 'form_editor',
              form: s,
              labelCol: { span: 6 },
              wrapperCol: { span: 16 },
              initialValues: n,
              onValuesChange: d,
            },
            t.map((e, t) =>
              V().createElement(
                V().Fragment,
                { key: t },
                'Number' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(Ce.Z, { max: e.range && e.range[1] }),
                  ),
                'Text' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(Se.Z, null),
                  ),
                'TextArea' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(_n, { rows: 4 }),
                  ),
                'MultiText' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(_e, null),
                  ),
                'DataList' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(kt, { cropRate: e.cropRate }),
                  ),
                'Color' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(Et, null),
                  ),
                'Select' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(
                      Te.Z,
                      { placeholder: '\u8bf7\u9009\u62e9' },
                      e.range.map((e, t) =>
                        V().createElement(Zn, { value: e.key, key: t }, e.text),
                      ),
                    ),
                  ),
                'Radio' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(
                      ke.ZP.Group,
                      null,
                      e.range.map((e, t) =>
                        V().createElement(
                          ke.ZP,
                          { value: e.key, key: t },
                          e.text,
                        ),
                      ),
                    ),
                  ),
                'Switch' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key, valuePropName: 'checked' },
                    V().createElement(xe.Z, null),
                  ),
                'Upload' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    {
                      label: e.name,
                      name: e.key,
                      valuePropName: 'fileList',
                      getValueFromEvent: Dn,
                    },
                    V().createElement(Ge, {
                      cropRate: e.cropRate,
                      isCrop: e.isCrop,
                    }),
                  ),
                'CardPicker' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key, valuePropName: 'type' },
                    V().createElement(Dt, { icons: e.icons, type: n['type'] }),
                  ),
                'Table' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key, valuePropName: 'data' },
                    V().createElement(qt, { data: e.data }),
                  ),
                'Pos' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key },
                    V().createElement(Yt, null),
                  ),
                'FormItems' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { name: e.key, valuePropName: 'formList' },
                    V().createElement(An, { data: e.data, rightPannelRef: r }),
                  ),
                'RichText' === e.type &&
                  V().createElement(
                    ve.Z.Item,
                    { label: e.name, name: e.key, noStyle: !0 },
                    V().createElement(rn, null),
                  ),
              ),
            ),
          );
        },
        Nn = V().memo(Ln),
        zn = n(16517),
        Mn = n.n(zn),
        Bn = n(55609),
        Hn = n(71894),
        Wn = n(47143),
        $n = n(48848),
        On = n(70285),
        Vn = n(97016),
        jn = n(21090);
      function Un(e) {
        return (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            e,
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            e.substr(0, 4),
          )
        );
      }
      function qn() {
        return (
          window.navigator.userAgent || window.navigator.vendor || window.opera
        );
      }
      function Qn(e, t) {
        var n = !0;
        return function () {
          n &&
            ((n = !1),
            e(...arguments),
            setTimeout(() => {
              n = !0;
            }, t));
        };
      }
      n(22385);
      var Kn = n(94199),
        Gn = (n(54029), n(79166)),
        Jn = (n(12968), n(6122)),
        Yn = n(25046),
        Xn = n.n(Yn),
        ea = n(6700),
        ta = n(84391),
        na = n(90631),
        aa = n(99165),
        oa = n(84189),
        ra = n(29985),
        la = n(73171),
        ia = n(258),
        sa = n(32779),
        ca = n(49535),
        da = n(17490),
        ma = n(75345),
        pa = n(71720),
        ua = n(93162),
        ga = n(94701),
        ba = n.n(ga),
        ya = De.Z.confirm,
        fa = (0, O.memo)((e) => {
          var t = e.pointData,
            n = e.location,
            a = e.clearData,
            o = e.undohandler,
            r = e.redohandler,
            l = e.importTpl,
            i = (0, O.useState)(''),
            s = (0, G.Z)(i, 2),
            c = s[0],
            d = s[1],
            m = (0, O.useRef)(null),
            p = (0, O.useState)(!1),
            u = (0, G.Z)(p, 2),
            g = u[0],
            b = u[1],
            y = (0, O.useState)(!1),
            f = (0, G.Z)(y, 2),
            h = f[0],
            x = f[1],
            k = () => {
              var n = e.location.query || '',
                a = n.tid;
              console.log('savePreview', { tid: a, tpl: t });
            },
            v = () => {
              localStorage.setItem('pointData', JSON.stringify(t)),
                k(),
                setTimeout(() => {
                  window.open('/preview?tid='.concat(e.location.query.tid));
                }, 600);
            },
            C = () => {
              console.log(t);
            },
            S = () => {
              window.open('/login');
            },
            T = (e) => {},
            I = () => {
              ya({
                title: '\u786e\u5b9a\u8981\u4fdd\u5b58\u5417\uff1f',
                content: V().createElement(
                  'div',
                  { className: Xn().saveForm },
                  V().createElement(
                    'div',
                    { className: Xn().formIpt },
                    V().createElement(
                      'span',
                      null,
                      '\u6a21\u7248\u540d\u79f0\uff1a',
                    ),
                    V().createElement(Se.Z, { ref: m }),
                  ),
                  V().createElement(
                    'div',
                    { className: Xn().formIpt },
                    V().createElement(
                      'span',
                      null,
                      '\u5c01\u9762\u8bbe\u7f6e\uff1a',
                    ),
                    V().createElement(
                      we.Z,
                      {
                        type: 'primary',
                        size: 'small',
                        style: { marginRight: '20px' },
                        onClick: () => T(1),
                      },
                      '\u4e00\u952e\u751f\u6210\u5c01\u9762',
                    ),
                    V().createElement(
                      we.Z,
                      { size: 'small', onClick: () => T(0) },
                      '\u4f7f\u7528\u9ed8\u8ba4\u5c01\u9762',
                    ),
                  ),
                  V().createElement(
                    'div',
                    { className: Xn().formIpt },
                    V().createElement(
                      'span',
                      null,
                      '\u8bbf\u95ee\u94fe\u63a5\uff1a',
                    ),
                    V().createElement(Se.Z, {
                      disabled: !0,
                      value:
                        '\u6682\u672a\u5f00\u653e\uff0c\u4fdd\u5b58\u4e4b\u540e\u53ef\u4ee5\u5728\u6a21\u7248\u5e93\u4e2d\u8bbf\u95ee',
                    }),
                  ),
                ),
                okText: '\u4fdd\u5b58',
                cancelText: '\u53d6\u6d88',
                onOk() {
                  var e = m.current.value;
                  console.log('\u751f\u6210\u5c01\u9762', { name: e, tpl: t });
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
            },
            w = () => {
              var e = JSON.stringify(t),
                n = new Blob([e], { type: 'text/plain;charset=utf-8' });
              (0, ua.saveAs)(n, 'template.json');
            },
            P = () => {
              De.Z.confirm({
                title: '\u786e\u8ba4\u6e05\u7a7a\u753b\u5e03?',
                okText: '\u786e\u8ba4',
                cancelText: '\u53d6\u6d88',
                onOk() {
                  a();
                },
              });
            },
            E = () => {
              window.open('/help');
            },
            R = () => {
              pa.m8.push('/inner');
            },
            F = () => {
              a(), pa.m8.push('/inner/editor?tid='.concat((0, He.Vj)(8, 16)));
            },
            A = () => {
              De.Z.confirm({
                title:
                  '\u786e\u5b9a\u8981\u4e0b\u8f7d\u5417? \u6bcf\u4eba\u6bcf\u5929\u53ea\u80fd\u4e0b\u8f7d2\u6b21\u54e6~',
                okText: '\u786e\u5b9a',
                cancelText: '\u53d6\u6d88',
                onOk() {},
              });
            };
          (0, O.useEffect)(() => {
            window.getFaceUrl = (e) => {
              d(e), b(!1);
            };
          }, []);
          var Z = (0, O.useMemo)(
              () => ({
                name: 'file',
                showUploadList: !1,
                beforeUpload(e) {
                  var t = new FileReader();
                  (t.onload = function (e) {
                    var t = e.target.result;
                    l && l(JSON.parse(t));
                  }),
                    t.readAsText(e);
                },
              }),
              [],
            ),
            _ = () => {
              localStorage.setItem('pointData', JSON.stringify(t)),
                b(!0),
                setTimeout(() => {
                  x(!0);
                }, 3600);
            },
            D = () => {
              var e;
              null === (e = document.getElementById('previewPage')) ||
                void 0 === e ||
                e.contentWindow.location.reload();
            },
            L = () => {
              De.Z.info({
                title:
                  '\u8be5\u529f\u80fd\u6b63\u5728\u5347\u7ea7\uff0c\u53ef\u4ee5\u5173\u6ce8\u4e0b\u65b9\u516c\u4f17\u53f7\u5b9e\u65f6\u67e5\u770b\u52a8\u6001',
                content: V().createElement(
                  'div',
                  { style: { textAlign: 'center' } },
                  V().createElement(Jn.Z, {
                    preview: !1,
                    src: ba(),
                    alt: '\u8da3\u8c08\u524d\u7aef',
                    style: { width: '180px' },
                  }),
                ),
                okText: '\u5ba2\u5b98\u77e5\u9053\u5566',
              });
            },
            N = () => {
              var e = n.query || '';
              e.tid;
              return V().createElement('div', null, 'Test');
            };
          return V().createElement(
            'div',
            { className: Xn().header },
            V().createElement(
              'div',
              { className: Xn().logoArea },
              V().createElement(
                'div',
                { className: Xn().backBtn, onClick: R },
                V().createElement(ea.Z, null),
              ),
              V().createElement('div', { className: Xn().logo }),
            ),
            V().createElement(
              'div',
              { className: Xn().controlArea },
              V().createElement(
                we.Z,
                { type: 'primary', style: { marginRight: '9px' }, onClick: L },
                '\u6a21\u7248\u5e93',
              ),
              V().createElement(
                we.Z,
                {
                  type: 'link',
                  style: { marginRight: '9px' },
                  onClick: I,
                  disabled: !t.length,
                },
                '\u4fdd\u5b58\u6a21\u7248',
              ),
              V().createElement(
                Ne.Z,
                Z,
                V().createElement(
                  we.Z,
                  { type: 'link', style: { marginRight: '8px' } },
                  V().createElement(ta.Z, null),
                ),
              ),
              V().createElement(
                we.Z,
                {
                  type: 'link',
                  style: { marginRight: '9px' },
                  onClick: A,
                  disabled: !t.length,
                },
                V().createElement(na.Z, null),
              ),
              V().createElement(
                we.Z,
                {
                  type: 'link',
                  style: { marginRight: '9px' },
                  title: '\u4e0b\u8f7djson\u6587\u4ef6',
                  onClick: w,
                  disabled: !t.length,
                },
                V().createElement(aa.Z, null),
              ),
              V().createElement(
                we.Z,
                {
                  type: 'link',
                  style: { marginRight: '9px' },
                  title: '\u65b0\u5efa\u9875\u9762',
                  onClick: F,
                  disabled: !t.length,
                },
                V().createElement(oa.Z, null),
              ),
              V().createElement(
                un.Z,
                { content: N(), directions: 'BOTTOM' },
                V().createElement(
                  we.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    onClick: k,
                    disabled: !t.length,
                  },
                  V().createElement(ra.Z, null),
                ),
              ),
              V().createElement(
                we.Z,
                {
                  type: 'link',
                  style: { marginRight: '9px' },
                  title: '\u6e05\u7a7a',
                  onClick: P,
                  disabled: !t.length,
                },
                V().createElement(la.Z, null),
              ),
              V().createElement(
                we.Z,
                {
                  type: 'link',
                  style: { marginRight: '9px' },
                  title: '\u64a4\u9500',
                  onClick: o,
                  disabled: !t.length,
                },
                V().createElement(ia.Z, null),
              ),
              V().createElement(
                we.Z,
                {
                  type: 'link',
                  style: { marginRight: '9px' },
                  title: '\u91cd\u505a',
                  onClick: r,
                },
                V().createElement(sa.Z, null),
              ),
              V().createElement(
                Kn.Z,
                {
                  placement: 'bottom',
                  title:
                    '\u4e00\u952e\u751f\u6210\u6d77\u62a5\u5206\u4eab\u56fe',
                },
                V().createElement(
                  Gn.Z,
                  { dot: !0, offset: [-18, 10] },
                  V().createElement(
                    we.Z,
                    {
                      type: 'link',
                      style: { marginRight: '6px' },
                      onClick: _,
                      disabled: !t.length,
                    },
                    V().createElement(ca.Z, null),
                  ),
                ),
              ),
              V().createElement(
                we.Z,
                { type: 'link', onClick: v, disabled: !t.length },
                '\u9884\u89c8',
              ),
              V().createElement(
                we.Z,
                {
                  type: 'link',
                  style: { marginRight: '9px' },
                  onClick: E,
                  disabled: !t.length,
                  title: '\u4f7f\u7528\u5e2e\u52a9',
                },
                '\u5e2e\u52a9',
              ),
            ),
            V().createElement(
              'div',
              { className: Xn().btnArea },
              V().createElement(
                we.Z,
                { type: 'primary', onClick: C, style: { marginRight: '12px' } },
                V().createElement(da.Z, null),
                '\u4ee3\u7801\u5bfc\u51fa',
              ),
              V().createElement(
                we.Z,
                { type: 'primary', onClick: S, style: { marginRight: '12px' } },
                V().createElement(ma.Z, null),
                '\u4f1a\u5458\u767b\u5f55',
              ),
            ),
            V().createElement(
              De.Z,
              {
                title:
                  '\u751f\u6210\u5c01\u9762\u4e2d...(\u957f\u65f6\u95f4\u672a\u53cd\u5e94\u8bf7\u70b9\u53f3\u4fa7\u6309\u94ae\u91cd\u8bd5)',
                visible: g,
                footer: null,
                width: 414,
                closeIcon: V().createElement(sa.Z, null),
                destroyOnClose: !0,
                onCancel: D,
                maskClosable: !1,
              },
              V().createElement('iframe', {
                id: 'previewPage',
                src: '/preview?tid='.concat(e.location.query.tid, '&gf=1'),
                style: { width: '100%', border: 'none', height: '600px' },
              }),
            ),
            V().createElement(
              De.Z,
              {
                title:
                  '\u5c01\u9762\u56fe(\u53f3\u952e\u590d\u5236\u56fe\u7247)',
                visible: h,
                footer: null,
                width: 414,
                destroyOnClose: !0,
                onCancel: () => x(!1),
              },
              V().createElement(Jn.Z, {
                preview: !1,
                src: c,
                style: { width: '100%' },
              }),
            ),
          );
        }),
        ha = fa,
        xa = (n(20136), n(55241)),
        ka = n(32165),
        va = n(62602),
        Ca = n(61193),
        Sa = n.n(Ca),
        Ta = n(25542),
        Ia = n.n(Ta),
        wa = V().createElement(
          'div',
          { className: Ia().fastMenu },
          V().createElement(
            'div',
            { className: Ia().boardTit },
            '\u5feb\u6377\u952e',
          ),
          V().createElement(
            'div',
            { className: Ia().keyRow },
            V().createElement(
              'span',
              { className: Ia().key },
              V().createElement('code', null, 'command + c'),
              V().createElement('code', null, 'ctrl + c'),
            ),
            V().createElement(
              'span',
              { className: Ia().text },
              '\u590d\u5236\u7ec4\u4ef6',
            ),
          ),
          V().createElement(
            'div',
            { className: Ia().keyRow },
            V().createElement(
              'span',
              { className: Ia().key },
              V().createElement('code', null, 'delete'),
              V().createElement('code', null, 'backspace'),
            ),
            V().createElement(
              'span',
              { className: Ia().text },
              '\u5220\u9664\u7ec4\u4ef6',
            ),
          ),
          V().createElement(
            'div',
            { className: Ia().keyRow },
            V().createElement(
              'span',
              { className: Ia().key },
              V().createElement('code', null, 'command + h'),
              V().createElement('code', null, 'ctrl +h'),
            ),
            V().createElement(
              'span',
              { className: Ia().text },
              '\u663e\u793a/\u9690\u85cf\u7f51\u683c\u7ebf',
            ),
          ),
          V().createElement(
            'div',
            { className: Ia().keyRow },
            V().createElement(
              'span',
              { className: Ia().key },
              V().createElement(
                'code',
                null,
                '\u9f20\u6807\u53f3\u952e\u83dc\u5355',
              ),
              V().createElement(
                'code',
                null,
                '\u5feb\u6377\u952e\u76d8(\u5220\u9664/\u590d\u5236)',
              ),
            ),
            V().createElement(
              'span',
              { className: Ia().text },
              '\u663e\u793a/\u9690\u85cf\u7f51\u683c\u7ebf',
            ),
          ),
        ),
        Pa = (e) => {
          var t = e.scaleNum,
            n = e.handleSlider,
            a = e.backSize,
            o = (0, O.useState)(!0),
            r = (0, G.Z)(o, 2),
            l = r[0],
            i = r[1];
          return (
            (0, O.useEffect)(() => {
              setTimeout(() => {
                i(!1);
              }, 5e3);
            }, []),
            V().createElement(
              Sa(),
              null,
              V().createElement(
                'div',
                { className: Ia().sliderWrap },
                V().createElement(
                  Kn.Z,
                  {
                    title: '\u652f\u6301\u81ea\u7531\u62d6\u62fd\u5566',
                    visible: l,
                  },
                  V().createElement('span', { className: Ia().showTip }),
                ),
                V().createElement(
                  'span',
                  {
                    className: Ia().sliderBtn,
                    onClick: n.bind(void 0, 1),
                    style:
                      1.5 === t
                        ? { pointerEvents: 'none' }
                        : { display: 'initial', marginLeft: '13px' },
                  },
                  '+',
                ),
                V().createElement('span', null, 10 * Math.floor(10 * t), '%'),
                V().createElement(
                  'span',
                  {
                    className: Ia().sliderBtn,
                    style:
                      0.5 === t
                        ? { pointerEvents: 'none' }
                        : { display: 'initial' },
                    onClick: n.bind(void 0, 0),
                  },
                  '-',
                ),
                V().createElement(
                  'span',
                  { className: Ia().backSize },
                  V().createElement(
                    xa.Z,
                    {
                      placement: 'bottom',
                      title: null,
                      content: wa,
                      trigger: 'hover',
                    },
                    V().createElement(ka.Z, null),
                  ),
                ),
                V().createElement(
                  'span',
                  { className: Ia().backSize },
                  V().createElement(va.Z, { onClick: a }),
                ),
              ),
            )
          );
        },
        Ea = Pa,
        Ra = n(88980),
        Fa = n.n(Ra);
      function Aa(e) {
        var t = e.direction,
          n = e.multiple,
          a = (0, O.useState)({ width: 0, height: 0 }),
          o = (0, G.Z)(a, 2),
          r = o[0],
          l = o[1],
          i = (0, O.useRef)(null),
          s = (0, O.useCallback)(
            (e, n) => {
              if (i.current) {
                var a = document.createElement('div');
                if (
                  ((a.className = 'calibrationLine'),
                  (a.style.backgroundColor = '#ccc'),
                  (i.current.style.display = 'flex'),
                  (i.current.style.justifyContent = 'space-between'),
                  'up' === t
                    ? ((i.current.style.marginLeft = '50px'),
                      (a.style.width = '1px'),
                      (a.style.height = '6px'),
                      (a.style.display = 'inline-block'))
                    : ((i.current.style.flexDirection = 'column'),
                      (a.style.height = '1px'),
                      (a.style.width = '6px')),
                  e)
                ) {
                  var o = document.createElement('span');
                  'up' === t
                    ? ((a.style.height = '12px'),
                      (o.style.transform = 'translate3d(-4px, 20px, 0px)'),
                      (a.style.transform = 'translateY(0px)'))
                    : ((a.style.width = '12px'),
                      (o.style.paddingLeft = '20px')),
                    (o.style.display = 'block'),
                    (o.className = 'calibrationNumber'),
                    (o.innerHTML = 5 * n + ''),
                    a.appendChild(o);
                }
                i.current.appendChild(a);
              }
            },
            [t],
          );
        return (
          (0, O.useEffect)(() => {
            if (i.current) {
              var e = i.current.getBoundingClientRect();
              l({ width: e.width, height: e.height });
              for (
                var n = 'up' === t ? e.width : e.height, a = 0;
                a < n / 5;
                a++
              )
                a % 10 === 0 ? s(!0, a) : s();
            }
          }, [t, s]),
          (0, O.useEffect)(() => {
            if (i.current) {
              var e = r.width
                  ? r.width
                  : i.current.getBoundingClientRect().width,
                a = r.height
                  ? r.height
                  : i.current.getBoundingClientRect().height,
                o = [
                  ...Array.from(i.current.querySelectorAll('.calibrationLine')),
                ];
              o.length &&
                ('up' === t
                  ? ((i.current.style.width =
                      parseFloat(n.toFixed(1)) * e + 'px'),
                    o.forEach((e) => {
                      var t = [
                        ...Array.from(e.querySelectorAll('.calibrationNumber')),
                      ][0];
                      t &&
                        (t.style.transform =
                          'translate3d(-4px, 16px, 0px) scale('.concat(
                            (n + 0.1).toFixed(1),
                            ')',
                          ));
                    }))
                  : ((i.current.style.height =
                      parseFloat(n.toFixed(1)) * a + 'px'),
                    o.forEach((e) => {
                      var t = [
                        ...Array.from(e.querySelectorAll('.calibrationNumber')),
                      ][0];
                      t &&
                        (t.style.transform =
                          'translate3d(-4px, -8px, 0px) scale('.concat(
                            (n + 0.1).toFixed(1),
                            ')',
                          ));
                    })));
            }
          }, [r.height, r.width, t, n]),
          V().createElement('div', { className: Fa().calibration, ref: i })
        );
      }
      var Za = n(56915),
        _a = n(3975),
        Da = (e) => {
          var t = e.pstate,
            n = e.scaleNum,
            a = e.canvasId,
            o = e.allType,
            r = e.dispatch,
            l = e.dragState,
            i = e.setDragState,
            s = e.cstate,
            c = e.ui,
            d = t ? t.pointData : [],
            m = s ? s.pointData : [],
            p = (0, O.useState)([]),
            u = (0, G.Z)(p, 2),
            g = u[0],
            b = u[1],
            y = (0, O.useState)(!0),
            f = (0, G.Z)(y, 2),
            h = f[0],
            x = f[1],
            k = (0, Za.L)({
              accept: o,
              drop: (e, t) => {
                var n = document.getElementById(a),
                  o = n.getBoundingClientRect(),
                  l = o.top,
                  i = t.getSourceClientOffset(),
                  s = i.y < l ? 0 : i.y - l,
                  c = 24,
                  m = 2,
                  p = 'Icon' === e.type ? 3 : c,
                  u = Math.ceil(s / m);
                r({
                  type: 'editorModal/addPointData',
                  payload: {
                    id: (0, He.Vj)(6, 10),
                    item: e,
                    point: {
                      i: 'x-'.concat(d.length),
                      x: 0,
                      y: u,
                      w: p,
                      h: e.h,
                      isBounded: !0,
                    },
                    status: 'inToCanvas',
                  },
                });
              },
              collect: (e) => ({
                isOver: e.isOver(),
                canDrop: e.canDrop(),
                item: e.getItem(),
              }),
            }),
            v = (0, G.Z)(k, 2),
            C = v[0].isOver,
            S = v[1],
            T = (0, O.useMemo)(
              () => (e, t, n, a, o, l) => {
                var i = d.filter((e) => e.id === n.i)[0];
                r({
                  type: 'editorModal/modPointData',
                  payload: (0, K.Z)(
                    (0, K.Z)({}, i),
                    {},
                    { point: n, status: 'inToCanvas' },
                  ),
                });
              },
              [m, r, d],
            ),
            I = (0, O.useMemo)(
              () => (e, t, n, a, o, l) => {
                var i = d.filter((e) => e.id === n.i)[0];
                r({
                  type: 'editorModal/modPointData',
                  payload: (0, K.Z)(
                    (0, K.Z)({}, i),
                    {},
                    { status: 'inToCanvas' },
                  ),
                });
              },
              [r, d],
            ),
            w = (0, O.useMemo)(
              () => (e, t, n, a, o, l) => {
                var i = d.filter((e) => e.id === n.i)[0];
                r({
                  type: 'editorModal/modPointData',
                  payload: (0, K.Z)(
                    (0, K.Z)({}, i),
                    {},
                    { point: n, status: 'inToCanvas' },
                  ),
                });
              },
              [r, d],
            ),
            P = () => {
              t.curPoint &&
                r({
                  type: 'editorModal/delPointData',
                  payload: { id: t.curPoint.id },
                });
            },
            E = () => {
              t.curPoint &&
                r({
                  type: 'editorModal/copyPointData',
                  payload: { id: t.curPoint.id },
                });
            },
            R = (e) => {
              'del' === e ? P() : 'copy' === e && E();
            },
            F = (0, O.useCallback)(
              () =>
                V().createElement(
                  _a.v2,
                  { id: 'menu_id' },
                  V().createElement(
                    _a.ck,
                    { onClick: () => R('copy') },
                    '\u590d\u5236',
                  ),
                  V().createElement(
                    _a.ck,
                    { onClick: () => R('del') },
                    '\u5220\u9664',
                  ),
                ),
              [R],
            );
          (0, O.useEffect)(() => {
            var e = document.getElementById(a).getBoundingClientRect(),
              t = e.width,
              n = e.height;
            b([t, n]);
          }, [a]),
            (0, O.useEffect)(() => {
              var e = window.setTimeout(() => {
                x(!1);
              }, 3e3);
              return () => {
                window.clearTimeout(e);
              };
            }, []);
          var A = C ? 0.7 : 1,
            Z = (0, O.useMemo)(
              () =>
                V().createElement(
                  Sa(),
                  {
                    position: l,
                    handle: '.js_box',
                    onStop: (e, t) => {
                      i({ x: t.x, y: t.y });
                    },
                  },
                  V().createElement(
                    'div',
                    { className: Mn().canvasBox },
                    V().createElement(
                      _a.Kb,
                      { id: 'menu_id' },
                      V().createElement(
                        'div',
                        {
                          style: {
                            transform: 'scale('.concat(n, ')'),
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                          },
                        },
                        V().createElement(
                          'div',
                          {
                            id: a,
                            className: Mn().canvas,
                            style: { opacity: A },
                            ref: S,
                          },
                          d.length > 0
                            ? V().createElement(he, {
                                pointData: d,
                                width: g[0] || 0,
                                dragStop: T,
                                onDragStart: I,
                                onResizeStop: w,
                                ui: c,
                              })
                            : null,
                        ),
                      ),
                    ),
                  ),
                ),
              [a, g, l, T, S, h, I, w, A, d, n, i, c],
            );
          return V().createElement(
            V().Fragment,
            null,
            Z,
            V().createElement(F, null),
          );
        },
        La = (0, Bn.connect)((e) => ({
          pstate: e.present.editorModal,
          cstate: e.present.editorPcModal,
        }))(Da),
        Na = n(92601),
        za = (0, O.memo)((e) => {
          var t = e.item,
            n = (0, Na.c)({
              item: {
                type: t.type,
                config: Vn.default[t.type].config,
                h: t.h,
                editableEl: Vn.default[t.type].editData,
                templateStr: Vn.default[t.type].templateStr,
                category: t.category,
                x: t.x || 0,
              },
              collect: (e) => ({ isDragging: e.isDragging() }),
            }),
            a = (0, G.Z)(n, 2),
            o = a[0].isDragging,
            r = a[1],
            l = (0, O.useMemo)(
              () => ({ opacity: o ? 0.4 : 1, cursor: 'move', height: '140px' }),
              [o],
            );
          return V().createElement(
            V().Fragment,
            null,
            V().createElement(
              'div',
              { className: Mn().listWrap },
              V().createElement(
                'div',
                { className: Mn().module, style: (0, K.Z)({}, l), ref: r },
                V().createElement(
                  'div',
                  {
                    style: {
                      height: '110px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      overflow: 'hidden',
                    },
                  },
                  e.children,
                ),
                V().createElement(
                  'div',
                  {
                    style: {
                      height: '30px',
                      lineHeight: '30px',
                      textAlign: 'center',
                      backgroundColor: 'rgba(245, 245, 245, 1)',
                      color: 'rgba(118, 118, 118, 1)',
                    },
                  },
                  e.item.displayName,
                ),
              ),
            ),
          );
        }),
        Ma = za,
        Ba = J.Z.TabPane,
        Ha = (e) => {
          var t = (0, O.useState)(!1),
            n = (0, G.Z)(t, 2),
            a = n[0],
            o = n[1],
            r = (0, O.useState)(!0),
            l = (0, G.Z)(r, 2),
            i = l[0],
            s = l[1],
            c = (0, O.useState)(1),
            d = (0, G.Z)(c, 2),
            m = d[0],
            p = d[1],
            u = (0, O.useState)({ x: 0, y: 0 }),
            g = (0, G.Z)(u, 2),
            b = g[0],
            y = g[1],
            f = (0, O.useRef)(null),
            h = (0, O.useRef)(null),
            x = (0, O.useState)({ start: { x: 0, y: 0 }, move: !1 }),
            k = (0, G.Z)(x, 2),
            v = k[0],
            C = k[1],
            S = (0, O.useState)('1'),
            T = (0, G.Z)(S, 2),
            I = T[0],
            w = T[1],
            P = e.pstate,
            E = e.cstate,
            R = e.dispatch,
            F = P ? P.pointData : [],
            A = E ? E.pointData : [],
            Z = (0, O.useMemo)(
              () => (e) => {
                o(e);
              },
              [],
            ),
            _ = (0, O.useMemo)(
              () => (e) => {
                s(e);
              },
              [],
            ),
            D = P ? P.curPoint : {},
            L = 'envelope_canvas',
            N = () => {
              p(1), y({ x: 0, y: 0 });
            },
            z = {
              base: V().createElement(Y.Z, null),
              media: V().createElement(X.Z, null),
              control: V().createElement(ee.Z, null),
              social: V().createElement(te.Z, null),
            },
            M = (0, O.useMemo)(
              () => (e, t) =>
                V().createElement(
                  'div',
                  { style: { height: '10%' } },
                  z[e],
                  ' ',
                  t,
                ),
              [z],
            ),
            B = (0, O.useMemo)(
              () => (e) => {
                p(
                  e
                    ? (e) => +(e + 0.1).toFixed(1)
                    : (e) => +(e - 0.1).toFixed(1),
                );
              },
              [],
            ),
            H = (0, O.useMemo)(
              () => (e) => {
                R({
                  type: 'editorModal/modPointData',
                  payload: (0, K.Z)(
                    (0, K.Z)({}, D),
                    {},
                    { item: (0, K.Z)((0, K.Z)({}, D.item), {}, { config: e }) },
                  ),
                });
              },
              [D, R],
            ),
            W = (0, O.useCallback)(() => {
              R({ type: 'editorModal/clearAll' });
            }, [R]),
            $ = (0, O.useMemo)(
              () => (e) => {
                R({ type: 'editorModal/delPointData', payload: { id: e } });
              },
              [R],
            ),
            j = (0, O.useMemo)(
              () => () => {
                R(jn.zF.redo());
              },
              [R],
            ),
            U = (0, O.useMemo)(
              () => () => {
                R(jn.zF.undo());
              },
              [R],
            ),
            oe = (e) => {
              R({ type: 'editorModal/importTplData', payload: e });
            };
          (0, O.useEffect)(() => {
            Un(qn()) && e.history.push('/mobileTip');
          }, []),
            (0, O.useEffect)(() => {
              P.curPoint && 'inToCanvas' === P.curPoint.status && s(!1);
            }, [P.curPoint]);
          var re = (0, O.useMemo)(() => {
            var e = [];
            return (
              Hn.default.map((t) => {
                e.push(t.type);
              }),
              Wn.default.map((t) => {
                e.push(t.type);
              }),
              $n.default.map((t) => {
                e.push(t.type);
              }),
              On.default.map((t) => {
                e.push(t.type);
              }),
              e
            );
          }, [Hn.default, Wn.default, $n.default, On.default]);
          (0, O.useEffect)(() => {
            console.log('curPoint', D);
          }, []);
          var le = (0, O.useMemo)(
              () =>
                V().createElement(
                  V().Fragment,
                  null,
                  V().createElement(
                    'div',
                    {
                      ref: f,
                      className: Mn().attrSetting,
                      style: {
                        transition: 'all ease-in-out 0.5s',
                        transform: i ? 'translate(100%,0)' : 'translate(0,0)',
                      },
                    },
                    F.length && D
                      ? V().createElement(
                          V().Fragment,
                          null,
                          V().createElement(
                            'div',
                            { className: Mn().tit },
                            '\u5c5e\u6027\u8bbe\u7f6e',
                          ),
                          V().createElement(Nn, {
                            uid: D.id,
                            onSave: H,
                            onDel: $,
                            defaultValue: D.item.config,
                            config: D.item.editableEl,
                            rightPannelRef: f,
                          }),
                        )
                      : V().createElement(
                          'div',
                          { style: { paddingTop: '100px' } },
                          V().createElement(Q.ZP, {
                            status: '404',
                            title: '\u8fd8\u6ca1\u6709\u6570\u636e\u54e6',
                            subTitle:
                              '\u8d76\u5feb\u62d6\u62fd\u7ec4\u4ef6\u6765\u751f\u6210\u4f60\u7684\u9875\u9762\u5427\uff5e',
                          }),
                        ),
                  ),
                ),
              [A.length, D, $, H, F.length, i],
            ),
            ie = (0, O.useMemo)(
              () =>
                a
                  ? V().createElement(
                      V().Fragment,
                      null,
                      V().createElement(Ba, { tab: M('base', ''), key: '1' }),
                      V().createElement(Ba, {
                        tab: M('control', ''),
                        key: '2',
                      }),
                      V().createElement(Ba, { tab: M('media', ''), key: '3' }),
                      V().createElement(Ba, { tab: M('social', ''), key: '4' }),
                    )
                  : V().createElement(
                      V().Fragment,
                      null,
                      V().createElement(
                        Ba,
                        { tab: M('base', ''), key: '1' },
                        V().createElement(
                          'div',
                          { className: Mn().ctitle },
                          '\u57fa\u7840\u7ec4\u4ef6',
                        ),
                        Hn.default.map((e, t) =>
                          V().createElement(
                            Ma,
                            { item: e, key: t, canvasId: L },
                            V().createElement(
                              de,
                              (0, q.Z)({ ui: 'antd', isTpl: !0 }, e, {
                                config: Vn.default[e.type].config,
                                componentsType: 'base',
                              }),
                            ),
                          ),
                        ),
                      ),
                      V().createElement(
                        Ba,
                        { tab: M('control', ''), key: '2' },
                        V().createElement(
                          'div',
                          { className: Mn().ctitle },
                          '\u4ea4\u4e92\u7ec4\u4ef6',
                        ),
                        Wn.default.map((e, t) =>
                          V().createElement(
                            Ma,
                            { item: e, key: t, canvasId: L },
                            V().createElement(
                              de,
                              (0, q.Z)({ ui: 'antd', isTpl: !0 }, e, {
                                config: Vn.default[e.type].config,
                                componentsType: 'control',
                              }),
                            ),
                          ),
                        ),
                      ),
                      V().createElement(
                        Ba,
                        { tab: M('media', ''), key: '3' },
                        V().createElement(
                          'div',
                          { className: Mn().ctitle },
                          '\u5a92\u4f53\u7ec4\u4ef6',
                        ),
                        $n.default.map((e, t) =>
                          V().createElement(
                            Ma,
                            { item: e, key: t, canvasId: L },
                            V().createElement(
                              de,
                              (0, q.Z)({ ui: 'antd', isTpl: !0 }, e, {
                                config: Vn.default[e.type].config,
                                componentsType: 'media',
                              }),
                            ),
                          ),
                        ),
                      ),
                      V().createElement(
                        Ba,
                        { tab: M('social', ''), key: '4' },
                        V().createElement(
                          'div',
                          { className: Mn().ctitle },
                          '\u5c55\u793a\u7ec4\u4ef6',
                        ),
                        On.default.map((e, t) =>
                          V().createElement(
                            Ma,
                            { item: e, key: t, canvasId: L },
                            V().createElement(
                              de,
                              (0, q.Z)({ ui: 'antd', isTpl: !0 }, e, {
                                config: Vn.default[e.type].config,
                                componentsType: 'social',
                              }),
                            ),
                          ),
                        ),
                      ),
                    ),
              [
                L,
                a,
                M,
                Hn.default,
                Wn.default,
                On.default,
                $n.default,
                Vn.default,
              ],
            ),
            se = (0, O.useCallback)((e) => {
              console.log(String(e)), w(String(e));
            }, []),
            ce = (0, O.useMemo)(
              () => (e) => {
                e.target === h.current &&
                  C({ start: { x: e.clientX, y: e.clientY }, move: !0 });
              },
              [],
            ),
            me = (0, O.useMemo)(
              () => (e) => {
                if (v.move) {
                  var t,
                    n,
                    a = e.clientX,
                    o = e.clientY;
                  (t = a - v.start.x),
                    (n = o - v.start.y),
                    C({ start: { x: a, y: o }, move: !0 }),
                    y((e) => ({ x: e.x + t, y: e.y + n }));
                }
              },
              [v.move, v.start.x, v.start.y],
            ),
            pe = (0, O.useMemo)(
              () => () => {
                C({ start: { x: 0, y: 0 }, move: !1 });
              },
              [],
            ),
            ue = (0, O.useMemo)(
              () => (e) => {
                e.deltaY < 0
                  ? y((e) => ({ x: e.x, y: e.y + 40 }))
                  : y((e) => ({ x: e.x, y: e.y - 40 }));
              },
              [],
            );
          return (
            (0, O.useEffect)(() => {
              v.move && h.current
                ? (h.current.style.cursor = 'move')
                : (h.current.style.cursor = 'default');
            }, [v.move]),
            V().createElement(
              'div',
              { className: Mn().editorWrap },
              V().createElement(ha, {
                redohandler: j,
                undohandler: U,
                pointData: F,
                clearData: W,
                location: e.location,
                importTpl: oe,
              }),
              V().createElement(
                'div',
                { className: Mn().container },
                V().createElement(
                  'div',
                  {
                    className: Mn().list,
                    style: {
                      transition: 'all ease-in-out 0.5s',
                      position: 'fixed',
                      width: a ? '50px' : '350px',
                      zIndex: 200,
                      boxShadow: 'none',
                    },
                  },
                  V().createElement(
                    'div',
                    { className: Mn().componentList },
                    V().createElement(
                      J.Z,
                      {
                        className: 'editorTabclass',
                        onTabClick: () => Z(!1),
                        activeKey: I,
                        tabPosition: 'left',
                        onChange: (e) => se(e),
                      },
                      ie,
                    ),
                  ),
                  V().createElement(
                    'div',
                    {
                      className: Mn().collapsed,
                      style: {
                        position: 'absolute',
                        bottom: '80px',
                        left: '20px',
                      },
                      onClick: () => Z(!a),
                    },
                    a
                      ? V().createElement(ne.Z, null)
                      : V().createElement(ae.Z, null),
                  ),
                ),
                V().createElement('div', {
                  style: {
                    width: a ? '50px' : '350px',
                    transition: 'all ease-in-out 0.5s',
                  },
                }),
                V().createElement(
                  'div',
                  {
                    className: Mn().tickMark,
                    id: 'calibration',
                    ref: h,
                    onMouseDown: ce,
                    onMouseMove: Qn(me, 500),
                    onMouseUp: pe,
                    onMouseLeave: pe,
                    onWheel: ue,
                  },
                  V().createElement(
                    'div',
                    { className: Mn().tickMarkTop },
                    V().createElement(Aa, {
                      direction: 'up',
                      id: 'calibrationUp',
                      multiple: m,
                    }),
                  ),
                  V().createElement(
                    'div',
                    { className: Mn().tickMarkLeft },
                    V().createElement(Aa, {
                      direction: 'right',
                      id: 'calibrationRight',
                      multiple: m,
                    }),
                  ),
                  V().createElement(La, {
                    dragState: b,
                    setDragState: y,
                    scaleNum: m,
                    canvasId: L,
                    allType: re,
                    ui: 'antd',
                  }),
                  V().createElement(Ea, {
                    scaleNum: m,
                    handleSlider: B,
                    backSize: N,
                  }),
                ),
                le,
                V().createElement(
                  'div',
                  {
                    className: Mn().rightcolla,
                    style: {
                      position: 'absolute',
                      right: i ? 0 : '304px',
                      transform: 'translate(0,-50%)',
                      transition: 'all ease-in-out 0.5s',
                    },
                    onClick: () => _(!i),
                  },
                  i
                    ? V().createElement(ae.Z, null)
                    : V().createElement(ne.Z, null),
                ),
                V().createElement('div', {
                  style: {
                    width: i ? 0 : '304px',
                    transition: 'all ease-in-out 0.5s',
                  },
                }),
              ),
            )
          );
        },
        Wa = (0, Bn.connect)((e) => ({
          pstate: e.present.editorModal,
          cstate: e.present.editorPcModal,
        }))(Ha),
        $a = n(44014),
        Oa = n(38679),
        Va = n(19177),
        ja = n(6),
        Ua = n(48803),
        qa = (0, O.memo)((e) => {
          var t = e.item,
            n = (0, Na.c)({
              item: {
                type: t.type,
                config: Ua.default[t.type].config,
                h: t.h,
                editableEl: Ua.default[t.type].editData,
                templateStr: Ua.default[t.type].templateStr,
                category: t.category,
                x: t.x || 0,
              },
              collect: (e) => ({ isDragging: e.isDragging() }),
            }),
            a = (0, G.Z)(n, 2),
            o = a[0].isDragging,
            r = a[1],
            l = (0, O.useMemo)(
              () => ({ opacity: o ? 0.4 : 1, cursor: 'move', height: '140px' }),
              [o],
            );
          return V().createElement(
            V().Fragment,
            null,
            V().createElement(
              'div',
              { className: Mn().listWrap },
              V().createElement(
                'div',
                { className: Mn().module, style: (0, K.Z)({}, l), ref: r },
                V().createElement(
                  'div',
                  {
                    style: {
                      height: '110px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      overflow: 'hidden',
                    },
                  },
                  e.children,
                ),
                V().createElement(
                  'div',
                  {
                    style: {
                      height: '30px',
                      lineHeight: '30px',
                      textAlign: 'center',
                      backgroundColor: 'rgba(245, 245, 245, 1)',
                      color: 'rgba(118, 118, 118, 1)',
                    },
                  },
                  e.item.displayName,
                ),
              ),
            ),
          );
        }),
        Qa = qa,
        Ka = J.Z.TabPane,
        Ga = (e) => {
          var t = (0, O.useState)(!1),
            n = (0, G.Z)(t, 2),
            a = n[0],
            o = n[1],
            r = (0, O.useState)(!0),
            l = (0, G.Z)(r, 2),
            i = l[0],
            s = l[1],
            c = (0, O.useState)(1),
            d = (0, G.Z)(c, 2),
            m = d[0],
            p = d[1],
            u = (0, O.useState)({ x: 0, y: 0 }),
            g = (0, G.Z)(u, 2),
            b = g[0],
            y = g[1],
            f = (0, O.useRef)(null),
            h = (0, O.useRef)(null),
            x = (0, O.useState)({ start: { x: 0, y: 0 }, move: !1 }),
            k = (0, G.Z)(x, 2),
            v = k[0],
            C = k[1],
            S = (0, O.useState)('1'),
            T = (0, G.Z)(S, 2),
            I = T[0],
            w = T[1],
            P = e.pstate,
            E = e.cstate,
            R = e.dispatch,
            F = P ? P.pointData : [],
            A = E ? E.pointData : [],
            Z = (0, O.useMemo)(
              () => (e) => {
                o(e);
              },
              [],
            ),
            _ = (0, O.useMemo)(
              () => (e) => {
                s(e);
              },
              [],
            ),
            D = P ? P.curPoint : {},
            L = 'envelope_canvas',
            N = () => {
              p(1), y({ x: 0, y: 0 });
            },
            z = {
              base: V().createElement(Y.Z, null),
              media: V().createElement(X.Z, null),
              control: V().createElement(ee.Z, null),
              social: V().createElement(te.Z, null),
            },
            M = (0, O.useMemo)(
              () => (e, t) =>
                V().createElement(
                  'div',
                  { style: { height: '10%' } },
                  z[e],
                  ' ',
                  t,
                ),
              [z],
            ),
            B = (0, O.useMemo)(
              () => (e) => {
                p(
                  e
                    ? (e) => +(e + 0.1).toFixed(1)
                    : (e) => +(e - 0.1).toFixed(1),
                );
              },
              [],
            ),
            H = (0, O.useMemo)(
              () => (e) => {
                R({
                  type: 'editorModal/modPointData',
                  payload: (0, K.Z)(
                    (0, K.Z)({}, D),
                    {},
                    { item: (0, K.Z)((0, K.Z)({}, D.item), {}, { config: e }) },
                  ),
                });
              },
              [D, R],
            ),
            W = (0, O.useCallback)(() => {
              R({ type: 'editorModal/clearAll' });
            }, [R]),
            $ = (0, O.useMemo)(
              () => (e) => {
                R({ type: 'editorModal/delPointData', payload: { id: e } });
              },
              [R],
            ),
            j = (0, O.useMemo)(
              () => () => {
                R(jn.zF.redo());
              },
              [R],
            ),
            U = (0, O.useMemo)(
              () => () => {
                R(jn.zF.undo());
              },
              [R],
            ),
            oe = (e) => {
              R({ type: 'editorModal/importTplData', payload: e });
            };
          (0, O.useEffect)(() => {
            Un(qn()) && e.history.push('/mobileTip');
          }, []),
            (0, O.useEffect)(() => {
              P.curPoint && 'inToCanvas' === P.curPoint.status && s(!1);
            }, [P.curPoint]);
          var re = (0, O.useMemo)(() => {
            var e = [];
            return (
              ja.default.map((t) => {
                e.push(t.type);
              }),
              Va.default.map((t) => {
                e.push(t.type);
              }),
              Oa.default.map((t) => {
                e.push(t.type);
              }),
              $a.default.map((t) => {
                e.push(t.type);
              }),
              e
            );
          }, [ja.default, Va.default, Oa.default, $a.default]);
          (0, O.useEffect)(() => {
            console.log('curPoint', D);
          }, []);
          var le = (0, O.useMemo)(
              () =>
                V().createElement(
                  V().Fragment,
                  null,
                  V().createElement(
                    'div',
                    {
                      ref: f,
                      className: Mn().attrSetting,
                      style: {
                        transition: 'all ease-in-out 0.5s',
                        transform: i ? 'translate(100%,0)' : 'translate(0,0)',
                      },
                    },
                    F.length && D
                      ? V().createElement(
                          V().Fragment,
                          null,
                          V().createElement(
                            'div',
                            { className: Mn().tit },
                            '\u5c5e\u6027\u8bbe\u7f6e',
                          ),
                          V().createElement(Nn, {
                            uid: D.id,
                            onSave: H,
                            onDel: $,
                            defaultValue: D.item.config,
                            config: D.item.editableEl,
                            rightPannelRef: f,
                          }),
                        )
                      : V().createElement(
                          'div',
                          { style: { paddingTop: '100px' } },
                          V().createElement(Q.ZP, {
                            status: '404',
                            title: '\u8fd8\u6ca1\u6709\u6570\u636e\u54e6',
                            subTitle:
                              '\u8d76\u5feb\u62d6\u62fd\u7ec4\u4ef6\u6765\u751f\u6210\u4f60\u7684\u9875\u9762\u5427\uff5e',
                          }),
                        ),
                  ),
                ),
              [A.length, D, $, H, F.length, i],
            ),
            ie = (0, O.useMemo)(
              () =>
                a
                  ? V().createElement(
                      V().Fragment,
                      null,
                      V().createElement(Ka, { tab: M('base', ''), key: '1' }),
                      V().createElement(Ka, {
                        tab: M('control', ''),
                        key: '2',
                      }),
                      V().createElement(Ka, { tab: M('media', ''), key: '3' }),
                      V().createElement(Ka, { tab: M('social', ''), key: '4' }),
                    )
                  : V().createElement(
                      V().Fragment,
                      null,
                      V().createElement(
                        Ka,
                        { tab: M('base', ''), key: '1' },
                        V().createElement(
                          'div',
                          { className: Mn().ctitle },
                          '\u57fa\u7840\u7ec4\u4ef6',
                        ),
                        ja.default.map((e, t) =>
                          V().createElement(
                            Qa,
                            { item: e, key: t, canvasId: L },
                            V().createElement(
                              de,
                              (0, q.Z)({ isTpl: !0 }, e, {
                                config: Ua.default[e.type].config,
                                ui: 'semantic',
                                componentsType: 'base',
                              }),
                            ),
                          ),
                        ),
                      ),
                      V().createElement(
                        Ka,
                        { tab: M('control', ''), key: '2' },
                        V().createElement(
                          'div',
                          { className: Mn().ctitle },
                          '\u4ea4\u4e92\u7ec4\u4ef6',
                        ),
                        Va.default.map((e, t) =>
                          V().createElement(
                            Qa,
                            { item: e, key: t, canvasId: L },
                            V().createElement(
                              de,
                              (0, q.Z)({ isTpl: !0 }, e, {
                                config: Ua.default[e.type].config,
                                ui: 'semantic',
                                componentsType: 'control',
                              }),
                            ),
                          ),
                        ),
                      ),
                      V().createElement(
                        Ka,
                        { tab: M('media', ''), key: '3' },
                        V().createElement(
                          'div',
                          { className: Mn().ctitle },
                          '\u5a92\u4f53\u7ec4\u4ef6',
                        ),
                        Oa.default.map((e, t) =>
                          V().createElement(
                            Qa,
                            { item: e, key: t, canvasId: L },
                            V().createElement(
                              de,
                              (0, q.Z)({ isTpl: !0 }, e, {
                                config: Ua.default[e.type].config,
                                ui: 'semantic',
                                componentsType: 'media',
                              }),
                            ),
                          ),
                        ),
                      ),
                      V().createElement(
                        Ka,
                        { tab: M('social', ''), key: '4' },
                        V().createElement(
                          'div',
                          { className: Mn().ctitle },
                          '\u5c55\u793a\u7ec4\u4ef6',
                        ),
                        $a.default.map((e, t) =>
                          V().createElement(
                            Qa,
                            { item: e, key: t, canvasId: L },
                            V().createElement(
                              de,
                              (0, q.Z)({ isTpl: !0 }, e, {
                                config: Ua.default[e.type].config,
                                ui: 'semantic',
                                componentsType: 'social',
                              }),
                            ),
                          ),
                        ),
                      ),
                    ),
              [
                L,
                a,
                M,
                ja.default,
                Va.default,
                $a.default,
                Oa.default,
                Ua.default,
              ],
            ),
            se = (0, O.useCallback)((e) => {
              console.log(String(e)), w(String(e));
            }, []),
            ce = (0, O.useMemo)(
              () => (e) => {
                e.target === h.current &&
                  C({ start: { x: e.clientX, y: e.clientY }, move: !0 });
              },
              [],
            ),
            me = (0, O.useMemo)(
              () => (e) => {
                if (v.move) {
                  var t,
                    n,
                    a = e.clientX,
                    o = e.clientY;
                  (t = a - v.start.x),
                    (n = o - v.start.y),
                    C({ start: { x: a, y: o }, move: !0 }),
                    y((e) => ({ x: e.x + t, y: e.y + n }));
                }
              },
              [v.move, v.start.x, v.start.y],
            ),
            pe = (0, O.useMemo)(
              () => () => {
                C({ start: { x: 0, y: 0 }, move: !1 });
              },
              [],
            ),
            ue = (0, O.useMemo)(
              () => (e) => {
                e.deltaY < 0
                  ? y((e) => ({ x: e.x, y: e.y + 40 }))
                  : y((e) => ({ x: e.x, y: e.y - 40 }));
              },
              [],
            );
          return (
            (0, O.useEffect)(() => {
              v.move && h.current
                ? (h.current.style.cursor = 'move')
                : (h.current.style.cursor = 'default');
            }, [v.move]),
            V().createElement(
              'div',
              { className: Mn().editorWrap },
              V().createElement(ha, {
                redohandler: j,
                undohandler: U,
                pointData: F,
                clearData: W,
                location: e.location,
                importTpl: oe,
              }),
              V().createElement(
                'div',
                { className: Mn().container },
                V().createElement(
                  'div',
                  {
                    className: Mn().list,
                    style: {
                      transition: 'all ease-in-out 0.5s',
                      position: 'fixed',
                      width: a ? '50px' : '350px',
                      zIndex: 200,
                      boxShadow: 'none',
                    },
                  },
                  V().createElement(
                    'div',
                    { className: Mn().componentList },
                    V().createElement(
                      J.Z,
                      {
                        className: 'editorTabclass',
                        onTabClick: () => Z(!1),
                        activeKey: I,
                        tabPosition: 'left',
                        onChange: (e) => se(e),
                      },
                      ie,
                    ),
                  ),
                  V().createElement(
                    'div',
                    {
                      className: Mn().collapsed,
                      style: {
                        position: 'absolute',
                        bottom: '80px',
                        left: '20px',
                      },
                      onClick: () => Z(!a),
                    },
                    a
                      ? V().createElement(ne.Z, null)
                      : V().createElement(ae.Z, null),
                  ),
                ),
                V().createElement('div', {
                  style: {
                    width: a ? '50px' : '350px',
                    transition: 'all ease-in-out 0.5s',
                  },
                }),
                V().createElement(
                  'div',
                  {
                    className: Mn().tickMark,
                    id: 'calibration',
                    ref: h,
                    onMouseDown: ce,
                    onMouseMove: Qn(me, 500),
                    onMouseUp: pe,
                    onMouseLeave: pe,
                    onWheel: ue,
                  },
                  V().createElement(
                    'div',
                    { className: Mn().tickMarkTop },
                    V().createElement(Aa, {
                      direction: 'up',
                      id: 'calibrationUp',
                      multiple: m,
                    }),
                  ),
                  V().createElement(
                    'div',
                    { className: Mn().tickMarkLeft },
                    V().createElement(Aa, {
                      direction: 'right',
                      id: 'calibrationRight',
                      multiple: m,
                    }),
                  ),
                  V().createElement(La, {
                    dragState: b,
                    setDragState: y,
                    scaleNum: m,
                    canvasId: L,
                    allType: re,
                    ui: 'semantic',
                  }),
                  V().createElement(Ea, {
                    scaleNum: m,
                    handleSlider: B,
                    backSize: N,
                  }),
                ),
                le,
                V().createElement(
                  'div',
                  {
                    className: Mn().rightcolla,
                    style: {
                      position: 'absolute',
                      right: i ? 0 : '304px',
                      transform: 'translate(0,-50%)',
                      transition: 'all ease-in-out 0.5s',
                    },
                    onClick: () => _(!i),
                  },
                  i
                    ? V().createElement(ae.Z, null)
                    : V().createElement(ne.Z, null),
                ),
                V().createElement('div', {
                  style: {
                    width: i ? 0 : '304px',
                    transition: 'all ease-in-out 0.5s',
                  },
                }),
              ),
            )
          );
        },
        Ja = (0, Bn.connect)((e) => ({
          pstate: e.present.editorModal,
          cstate: e.present.editorPcModal,
        }))(Ga);
      function Ya(e) {
        (0, O.useEffect)(() => {
          console.log(e.location.query.ui);
        }, []);
        var t = e.location.query.ui ? e.location.query.ui : 'antd';
        return V().createElement(
          'div',
          { className: Mn().layout },
          V().createElement(
            U.W,
            { backend: j.PD },
            'antd' === t && V().createElement(Wa, e),
            'semantic' === t && V().createElement(Ja, e),
          ),
        );
      }
      var Xa = Ya;
    },
    94701: function (e, t, n) {
      e.exports = n.p + 'static/Card.6f050f5f.svg';
    },
    5629: function (e, t, n) {
      var a = {
        './absolute-antd/base/Alert': [77811, 9, 7811],
        './absolute-antd/base/Alert/': [77811, 9, 7811],
        './absolute-antd/base/Alert/demo/Alert.md': [78751, 9, 8751],
        './absolute-antd/base/Alert/demo/_demo': [3780, 9, 3780],
        './absolute-antd/base/Alert/demo/_demo.tsx': [3780, 9, 3780],
        './absolute-antd/base/Alert/index': [77811, 9, 7811],
        './absolute-antd/base/Alert/index.tsx': [77811, 9, 7811],
        './absolute-antd/base/Alert/schema': [84466, 9],
        './absolute-antd/base/Alert/schema.ts': [84466, 9],
        './absolute-antd/base/Alert/template': [77347, 9],
        './absolute-antd/base/Alert/template.ts': [77347, 9],
        './absolute-antd/base/Carousel': [82118, 9, 6, 4505],
        './absolute-antd/base/Carousel/': [82118, 9, 6, 4505],
        './absolute-antd/base/Carousel/demo/Carousel.md': [65839, 9, 5839],
        './absolute-antd/base/Carousel/demo/_demo': [26052, 9, 6, 6427],
        './absolute-antd/base/Carousel/demo/_demo.tsx': [26052, 9, 6, 6427],
        './absolute-antd/base/Carousel/index': [82118, 9, 6, 4505],
        './absolute-antd/base/Carousel/index.tsx': [82118, 9, 6, 4505],
        './absolute-antd/base/Carousel/schema': [18006, 9],
        './absolute-antd/base/Carousel/schema.ts': [18006, 9],
        './absolute-antd/base/Carousel/template': [79302, 9],
        './absolute-antd/base/Carousel/template.ts': [79302, 9],
        './absolute-antd/base/Divider': [10170, 9, 170],
        './absolute-antd/base/Divider/': [10170, 9, 170],
        './absolute-antd/base/Divider/demo/Divider.md': [30144, 9, 144],
        './absolute-antd/base/Divider/demo/_demo': [66164, 9, 6164],
        './absolute-antd/base/Divider/demo/_demo.tsx': [66164, 9, 6164],
        './absolute-antd/base/Divider/index': [10170, 9, 170],
        './absolute-antd/base/Divider/index.tsx': [10170, 9, 170],
        './absolute-antd/base/Divider/schema': [86425, 9],
        './absolute-antd/base/Divider/schema.ts': [86425, 9],
        './absolute-antd/base/Divider/template': [80423, 9],
        './absolute-antd/base/Divider/template.ts': [80423, 9],
        './absolute-antd/base/Empty': [49494, 9, 9494],
        './absolute-antd/base/Empty/': [49494, 9, 9494],
        './absolute-antd/base/Empty/demo/Empty.md': [35210, 9, 5210],
        './absolute-antd/base/Empty/demo/_demo': [28022, 9, 8022],
        './absolute-antd/base/Empty/demo/_demo.tsx': [28022, 9, 8022],
        './absolute-antd/base/Empty/index': [49494, 9, 9494],
        './absolute-antd/base/Empty/index.tsx': [49494, 9, 9494],
        './absolute-antd/base/Empty/schema': [11799, 9],
        './absolute-antd/base/Empty/schema.ts': [11799, 9],
        './absolute-antd/base/Empty/template': [43906, 9],
        './absolute-antd/base/Empty/template.ts': [43906, 9],
        './absolute-antd/base/Form': [28869, 9, 8869],
        './absolute-antd/base/Form/': [28869, 9, 8869],
        './absolute-antd/base/Form/demo/Form.md': [42192, 9, 2192],
        './absolute-antd/base/Form/demo/_demo': [77181, 9, 7181],
        './absolute-antd/base/Form/demo/_demo.tsx': [77181, 9, 7181],
        './absolute-antd/base/Form/index': [28869, 9, 8869],
        './absolute-antd/base/Form/index.tsx': [28869, 9, 8869],
        './absolute-antd/base/Form/schema': [14196, 9],
        './absolute-antd/base/Form/schema.ts': [14196, 9],
        './absolute-antd/base/Form/template': [19023, 9],
        './absolute-antd/base/Form/template.ts': [19023, 9],
        './absolute-antd/base/Header': [80492, 9, 492, 3809],
        './absolute-antd/base/Header/': [80492, 9, 492, 3809],
        './absolute-antd/base/Header/demo/Header.md': [96423, 9, 6423],
        './absolute-antd/base/Header/demo/_demo': [73831, 9, 492, 7298],
        './absolute-antd/base/Header/demo/_demo.tsx': [73831, 9, 492, 7298],
        './absolute-antd/base/Header/index': [80492, 9, 492, 3809],
        './absolute-antd/base/Header/index.tsx': [80492, 9, 492, 3809],
        './absolute-antd/base/Header/schema': [86326, 9],
        './absolute-antd/base/Header/schema.ts': [86326, 9],
        './absolute-antd/base/Header/template': [90470, 9],
        './absolute-antd/base/Header/template.ts': [90470, 9],
        './absolute-antd/base/Image': [38241, 9, 8241],
        './absolute-antd/base/Image/': [38241, 9, 8241],
        './absolute-antd/base/Image/demo/Image.md': [71279, 9, 1279],
        './absolute-antd/base/Image/demo/_demo': [13427, 9, 3427],
        './absolute-antd/base/Image/demo/_demo.tsx': [13427, 9, 3427],
        './absolute-antd/base/Image/index': [38241, 9, 8241],
        './absolute-antd/base/Image/index.tsx': [38241, 9, 8241],
        './absolute-antd/base/Image/schema': [438, 9],
        './absolute-antd/base/Image/schema.ts': [438, 9],
        './absolute-antd/base/Image/template': [80100, 9],
        './absolute-antd/base/Image/template.ts': [80100, 9],
        './absolute-antd/base/List': [32060, 9, 2060, 8989],
        './absolute-antd/base/List/': [32060, 9, 2060, 8989],
        './absolute-antd/base/List/demo/List.md': [50467, 9, 467],
        './absolute-antd/base/List/demo/_demo': [43711, 9, 2060, 8923],
        './absolute-antd/base/List/demo/_demo.tsx': [43711, 9, 2060, 8923],
        './absolute-antd/base/List/index': [32060, 9, 2060, 8989],
        './absolute-antd/base/List/index.tsx': [32060, 9, 2060, 8989],
        './absolute-antd/base/List/schema': [60793, 9],
        './absolute-antd/base/List/schema.ts': [60793, 9],
        './absolute-antd/base/List/template': [7862, 9],
        './absolute-antd/base/List/template.ts': [7862, 9],
        './absolute-antd/base/Paragraph': [40044, 9, 8469, 2687],
        './absolute-antd/base/Paragraph/': [40044, 9, 8469, 2687],
        './absolute-antd/base/Paragraph/demo/Paragraph.md': [7007, 9, 7007],
        './absolute-antd/base/Paragraph/demo/_demo': [12672, 9, 8469, 9107],
        './absolute-antd/base/Paragraph/demo/_demo.tsx': [12672, 9, 8469, 9107],
        './absolute-antd/base/Paragraph/index': [40044, 9, 8469, 2687],
        './absolute-antd/base/Paragraph/index.tsx': [40044, 9, 8469, 2687],
        './absolute-antd/base/Paragraph/schema': [47544, 9],
        './absolute-antd/base/Paragraph/schema.ts': [47544, 9],
        './absolute-antd/base/Paragraph/template': [69112, 9],
        './absolute-antd/base/Paragraph/template.ts': [69112, 9],
        './absolute-antd/base/Qrcode': [74892, 9, 4892],
        './absolute-antd/base/Qrcode/': [74892, 9, 4892],
        './absolute-antd/base/Qrcode/demo/Qrcode.md': [46890, 9, 6890],
        './absolute-antd/base/Qrcode/demo/_demo': [40652, 9, 652],
        './absolute-antd/base/Qrcode/demo/_demo.tsx': [40652, 9, 652],
        './absolute-antd/base/Qrcode/index': [74892, 9, 4892],
        './absolute-antd/base/Qrcode/index.tsx': [74892, 9, 4892],
        './absolute-antd/base/Qrcode/schema': [85777, 9],
        './absolute-antd/base/Qrcode/schema.ts': [85777, 9],
        './absolute-antd/base/Qrcode/template': [30108, 9],
        './absolute-antd/base/Qrcode/template.ts': [30108, 9],
        './absolute-antd/base/RichText': [21021, 9, 1021],
        './absolute-antd/base/RichText/': [21021, 9, 1021],
        './absolute-antd/base/RichText/demo/RichText.md': [77517, 9, 7517],
        './absolute-antd/base/RichText/demo/_demo': [34696, 9, 4696],
        './absolute-antd/base/RichText/demo/_demo.tsx': [34696, 9, 4696],
        './absolute-antd/base/RichText/index': [21021, 9, 1021],
        './absolute-antd/base/RichText/index.tsx': [21021, 9, 1021],
        './absolute-antd/base/RichText/schema': [69825, 9],
        './absolute-antd/base/RichText/schema.ts': [69825, 9],
        './absolute-antd/base/RichText/template': [79163, 9],
        './absolute-antd/base/RichText/template.ts': [79163, 9],
        './absolute-antd/base/Tabs': [80567, 9, 567],
        './absolute-antd/base/Tabs/': [80567, 9, 567],
        './absolute-antd/base/Tabs/demo/Tabs.md': [90794, 9, 794],
        './absolute-antd/base/Tabs/demo/_demo': [58447, 9, 8447],
        './absolute-antd/base/Tabs/demo/_demo.tsx': [58447, 9, 8447],
        './absolute-antd/base/Tabs/index': [80567, 9, 567],
        './absolute-antd/base/Tabs/index.tsx': [80567, 9, 567],
        './absolute-antd/base/Tabs/schema': [82232, 9],
        './absolute-antd/base/Tabs/schema.ts': [82232, 9],
        './absolute-antd/base/Tabs/template': [27439, 9],
        './absolute-antd/base/Tabs/template.ts': [27439, 9],
        './absolute-antd/base/Text': [64842, 9, 8469, 5226],
        './absolute-antd/base/Text/': [64842, 9, 8469, 5226],
        './absolute-antd/base/Text/demo/Text.md': [10314, 9, 314],
        './absolute-antd/base/Text/demo/_demo': [54336, 9, 8469, 4045],
        './absolute-antd/base/Text/demo/_demo.tsx': [54336, 9, 8469, 4045],
        './absolute-antd/base/Text/index': [64842, 9, 8469, 5226],
        './absolute-antd/base/Text/index.tsx': [64842, 9, 8469, 5226],
        './absolute-antd/base/Text/schema': [1765, 9],
        './absolute-antd/base/Text/schema.ts': [1765, 9],
        './absolute-antd/base/Text/template': [44053, 9],
        './absolute-antd/base/Text/template.ts': [44053, 9],
        './absolute-antd/base/schema': [29677, 9],
        './absolute-antd/base/schema.ts': [29677, 9],
        './absolute-antd/base/template': [71894, 9],
        './absolute-antd/base/template.ts': [71894, 9],
        './absolute-antd/control/Button': [13672, 9, 6023, 3672],
        './absolute-antd/control/Button/': [13672, 9, 6023, 3672],
        './absolute-antd/control/Button/demo/Button.md': [81478, 9, 1478],
        './absolute-antd/control/Button/demo/_demo': [49587, 9, 6023, 9587],
        './absolute-antd/control/Button/demo/_demo.tsx': [49587, 9, 6023, 9587],
        './absolute-antd/control/Button/index': [13672, 9, 6023, 3672],
        './absolute-antd/control/Button/index.tsx': [13672, 9, 6023, 3672],
        './absolute-antd/control/Button/schema': [26984, 9],
        './absolute-antd/control/Button/schema.ts': [26984, 9],
        './absolute-antd/control/Button/template': [87422, 9],
        './absolute-antd/control/Button/template.ts': [87422, 9],
        './absolute-antd/control/CheckBox': [6934, 9, 6934],
        './absolute-antd/control/CheckBox/': [6934, 9, 6934],
        './absolute-antd/control/CheckBox/demo/CheckBox.md': [51333, 9, 1333],
        './absolute-antd/control/CheckBox/demo/_demo': [80617, 9, 617],
        './absolute-antd/control/CheckBox/demo/_demo.tsx': [80617, 9, 617],
        './absolute-antd/control/CheckBox/index': [6934, 9, 6934],
        './absolute-antd/control/CheckBox/index.tsx': [6934, 9, 6934],
        './absolute-antd/control/CheckBox/schema': [2196, 9],
        './absolute-antd/control/CheckBox/schema.ts': [2196, 9],
        './absolute-antd/control/CheckBox/template': [64975, 9],
        './absolute-antd/control/CheckBox/template.ts': [64975, 9],
        './absolute-antd/control/Radio': [21822, 9, 1822],
        './absolute-antd/control/Radio/': [21822, 9, 1822],
        './absolute-antd/control/Radio/demo/Radio.md': [39683, 9, 9683],
        './absolute-antd/control/Radio/demo/_demo': [26934, 9, 5736],
        './absolute-antd/control/Radio/demo/_demo.tsx': [26934, 9, 5736],
        './absolute-antd/control/Radio/index': [21822, 9, 1822],
        './absolute-antd/control/Radio/index.tsx': [21822, 9, 1822],
        './absolute-antd/control/Radio/schema': [10309, 9],
        './absolute-antd/control/Radio/schema.ts': [10309, 9],
        './absolute-antd/control/Radio/template': [42845, 9],
        './absolute-antd/control/Radio/template.ts': [42845, 9],
        './absolute-antd/control/Segmented': [41057, 9, 6023, 1057],
        './absolute-antd/control/Segmented/': [41057, 9, 6023, 1057],
        './absolute-antd/control/Segmented/demo/Segmented.md': [109, 9, 109],
        './absolute-antd/control/Segmented/demo/_demo': [7941, 9, 6023, 7941],
        './absolute-antd/control/Segmented/demo/_demo.tsx': [
          7941, 9, 6023, 7941,
        ],
        './absolute-antd/control/Segmented/index': [41057, 9, 6023, 1057],
        './absolute-antd/control/Segmented/index.tsx': [41057, 9, 6023, 1057],
        './absolute-antd/control/Segmented/schema': [3567, 9],
        './absolute-antd/control/Segmented/schema.ts': [3567, 9],
        './absolute-antd/control/Segmented/template': [6443, 9],
        './absolute-antd/control/Segmented/template.ts': [6443, 9],
        './absolute-antd/control/Select': [53320, 9, 6023, 3320],
        './absolute-antd/control/Select/': [53320, 9, 6023, 3320],
        './absolute-antd/control/Select/demo/Select.md': [73815, 9, 3815],
        './absolute-antd/control/Select/demo/_demo': [19088, 9, 6023, 9088],
        './absolute-antd/control/Select/demo/_demo.tsx': [19088, 9, 6023, 9088],
        './absolute-antd/control/Select/index': [53320, 9, 6023, 3320],
        './absolute-antd/control/Select/index.tsx': [53320, 9, 6023, 3320],
        './absolute-antd/control/Select/schema': [42457, 9],
        './absolute-antd/control/Select/schema.ts': [42457, 9],
        './absolute-antd/control/Select/template': [2654, 9],
        './absolute-antd/control/Select/template.ts': [2654, 9],
        './absolute-antd/control/Slider': [43297, 9, 3297],
        './absolute-antd/control/Slider/': [43297, 9, 3297],
        './absolute-antd/control/Slider/demo/Slider.md': [1770, 9, 1770],
        './absolute-antd/control/Slider/demo/_demo': [41016, 9, 1016],
        './absolute-antd/control/Slider/demo/_demo.tsx': [41016, 9, 1016],
        './absolute-antd/control/Slider/index': [43297, 9, 3297],
        './absolute-antd/control/Slider/index.tsx': [43297, 9, 3297],
        './absolute-antd/control/Slider/schema': [12300, 9],
        './absolute-antd/control/Slider/schema.ts': [12300, 9],
        './absolute-antd/control/Slider/template': [14769, 9],
        './absolute-antd/control/Slider/template.ts': [14769, 9],
        './absolute-antd/control/Switch': [73610, 9, 3610],
        './absolute-antd/control/Switch/': [73610, 9, 3610],
        './absolute-antd/control/Switch/demo/Switch.md': [85410, 9, 8796],
        './absolute-antd/control/Switch/demo/_demo': [25038, 9, 9503],
        './absolute-antd/control/Switch/demo/_demo.tsx': [25038, 9, 9503],
        './absolute-antd/control/Switch/index': [73610, 9, 3610],
        './absolute-antd/control/Switch/index.tsx': [73610, 9, 3610],
        './absolute-antd/control/Switch/schema': [2927, 9],
        './absolute-antd/control/Switch/schema.ts': [2927, 9],
        './absolute-antd/control/Switch/template': [48170, 9],
        './absolute-antd/control/Switch/template.ts': [48170, 9],
        './absolute-antd/control/schema': [13446, 9],
        './absolute-antd/control/schema.ts': [13446, 9],
        './absolute-antd/control/template': [47143, 9],
        './absolute-antd/control/template.ts': [47143, 9],
        './absolute-antd/media/Audio': [49847, 9, 9847],
        './absolute-antd/media/Audio/': [49847, 9, 9847],
        './absolute-antd/media/Audio/demo/Audio.md': [74821, 9, 4821],
        './absolute-antd/media/Audio/demo/_demo': [74210, 9, 4210],
        './absolute-antd/media/Audio/demo/_demo.tsx': [74210, 9, 4210],
        './absolute-antd/media/Audio/index': [49847, 9, 9847],
        './absolute-antd/media/Audio/index.tsx': [49847, 9, 9847],
        './absolute-antd/media/Audio/schema': [72195, 9],
        './absolute-antd/media/Audio/schema.ts': [72195, 9],
        './absolute-antd/media/Audio/template': [1952, 9],
        './absolute-antd/media/Audio/template.ts': [1952, 9],
        './absolute-antd/media/Calendar': [64188, 9, 7327, 7300],
        './absolute-antd/media/Calendar/': [64188, 9, 7327, 7300],
        './absolute-antd/media/Calendar/demo/Calendar.md': [46280, 9, 6280],
        './absolute-antd/media/Calendar/demo/_demo': [98220, 9, 7327, 7948],
        './absolute-antd/media/Calendar/demo/_demo.tsx': [98220, 9, 7327, 7948],
        './absolute-antd/media/Calendar/index': [64188, 9, 7327, 7300],
        './absolute-antd/media/Calendar/index.tsx': [64188, 9, 7327, 7300],
        './absolute-antd/media/Calendar/schema': [64829, 9],
        './absolute-antd/media/Calendar/schema.ts': [64829, 9],
        './absolute-antd/media/Calendar/template': [50796, 9],
        './absolute-antd/media/Calendar/template.ts': [50796, 9],
        './absolute-antd/media/Map': [93649, 9, 3516, 3649],
        './absolute-antd/media/Map/': [93649, 9, 3516, 3649],
        './absolute-antd/media/Map/demo/Map.md': [17008, 9, 7008],
        './absolute-antd/media/Map/demo/_demo': [58045, 9, 3516, 8045],
        './absolute-antd/media/Map/demo/_demo.tsx': [58045, 9, 3516, 8045],
        './absolute-antd/media/Map/index': [93649, 9, 3516, 3649],
        './absolute-antd/media/Map/index.tsx': [93649, 9, 3516, 3649],
        './absolute-antd/media/Map/schema': [63666, 9],
        './absolute-antd/media/Map/schema.ts': [63666, 9],
        './absolute-antd/media/Map/template': [62991, 9],
        './absolute-antd/media/Map/template.ts': [62991, 9],
        './absolute-antd/media/Progress': [93260, 9, 3260],
        './absolute-antd/media/Progress/': [93260, 9, 3260],
        './absolute-antd/media/Progress/demo/Progress.md': [3713, 9, 7622],
        './absolute-antd/media/Progress/demo/_demo': [8026, 9, 8026],
        './absolute-antd/media/Progress/demo/_demo.tsx': [8026, 9, 8026],
        './absolute-antd/media/Progress/index': [93260, 9, 3260],
        './absolute-antd/media/Progress/index.tsx': [93260, 9, 3260],
        './absolute-antd/media/Progress/schema': [13333, 9],
        './absolute-antd/media/Progress/schema.ts': [13333, 9],
        './absolute-antd/media/Progress/template': [32457, 9],
        './absolute-antd/media/Progress/template.ts': [32457, 9],
        './absolute-antd/media/Video': [92376, 9, 8330, 9573, 2376],
        './absolute-antd/media/Video/': [92376, 9, 8330, 9573, 2376],
        './absolute-antd/media/Video/demo/Video.md': [23193, 9, 3193],
        './absolute-antd/media/Video/demo/_demo': [80946, 9, 8330, 9573, 946],
        './absolute-antd/media/Video/demo/_demo.tsx': [
          80946, 9, 8330, 9573, 946,
        ],
        './absolute-antd/media/Video/index': [92376, 9, 8330, 9573, 2376],
        './absolute-antd/media/Video/index.css': [5506, 7, 9573, 5506],
        './absolute-antd/media/Video/index.tsx': [92376, 9, 8330, 9573, 2376],
        './absolute-antd/media/Video/schema': [6556, 9],
        './absolute-antd/media/Video/schema.ts': [6556, 9],
        './absolute-antd/media/Video/template': [10482, 9],
        './absolute-antd/media/Video/template.ts': [10482, 9],
        './absolute-antd/media/schema': [80823, 9],
        './absolute-antd/media/schema.ts': [80823, 9],
        './absolute-antd/media/template': [48848, 9],
        './absolute-antd/media/template.ts': [48848, 9],
        './absolute-antd/schema': [97016, 9],
        './absolute-antd/schema.ts': [97016, 9],
        './absolute-antd/social/Card': [57998, 9, 6023, 9396, 8118],
        './absolute-antd/social/Card/': [57998, 9, 6023, 9396, 8118],
        './absolute-antd/social/Card/demo/Card.md': [25356, 9, 5356],
        './absolute-antd/social/Card/demo/_demo': [74317, 9, 6023, 9396, 7576],
        './absolute-antd/social/Card/demo/_demo.tsx': [
          74317, 9, 6023, 9396, 7576,
        ],
        './absolute-antd/social/Card/index': [57998, 9, 6023, 9396, 8118],
        './absolute-antd/social/Card/index.tsx': [57998, 9, 6023, 9396, 8118],
        './absolute-antd/social/Card/schema': [17349, 9],
        './absolute-antd/social/Card/schema.ts': [17349, 9],
        './absolute-antd/social/Card/template': [11146, 9],
        './absolute-antd/social/Card/template.ts': [11146, 9],
        './absolute-antd/social/Collapse': [87426, 9, 7426, 8442],
        './absolute-antd/social/Collapse/': [87426, 9, 7426, 8442],
        './absolute-antd/social/Collapse/demo/Collapse.md': [7838, 9, 7838],
        './absolute-antd/social/Collapse/demo/_demo': [75821, 9, 7426, 9261],
        './absolute-antd/social/Collapse/demo/_demo.tsx': [
          75821, 9, 7426, 9261,
        ],
        './absolute-antd/social/Collapse/index': [87426, 9, 7426, 8442],
        './absolute-antd/social/Collapse/index.tsx': [87426, 9, 7426, 8442],
        './absolute-antd/social/Collapse/schema': [56894, 9],
        './absolute-antd/social/Collapse/schema.ts': [56894, 9],
        './absolute-antd/social/Collapse/template': [96932, 9],
        './absolute-antd/social/Collapse/template.ts': [96932, 9],
        './absolute-antd/social/Comment': [40862, 9, 6023, 862],
        './absolute-antd/social/Comment/': [40862, 9, 6023, 862],
        './absolute-antd/social/Comment/demo/Comment.md': [52474, 9, 1473],
        './absolute-antd/social/Comment/demo/_demo': [5218, 9, 6023, 5218],
        './absolute-antd/social/Comment/demo/_demo.tsx': [5218, 9, 6023, 5218],
        './absolute-antd/social/Comment/index': [40862, 9, 6023, 862],
        './absolute-antd/social/Comment/index.tsx': [40862, 9, 6023, 862],
        './absolute-antd/social/Comment/schema': [36562, 9],
        './absolute-antd/social/Comment/schema.ts': [36562, 9],
        './absolute-antd/social/Comment/template': [59840, 9],
        './absolute-antd/social/Comment/template.ts': [59840, 9],
        './absolute-antd/social/Rate': [60581, 9, 6023, 581],
        './absolute-antd/social/Rate/': [60581, 9, 6023, 581],
        './absolute-antd/social/Rate/demo/Rate.md': [93734, 9, 3734],
        './absolute-antd/social/Rate/demo/_demo': [92895, 9, 6023, 2895],
        './absolute-antd/social/Rate/demo/_demo.tsx': [92895, 9, 6023, 2895],
        './absolute-antd/social/Rate/index': [60581, 9, 6023, 581],
        './absolute-antd/social/Rate/index.tsx': [60581, 9, 6023, 581],
        './absolute-antd/social/Rate/schema': [87937, 9],
        './absolute-antd/social/Rate/schema.ts': [87937, 9],
        './absolute-antd/social/Rate/template': [83192, 9],
        './absolute-antd/social/Rate/template.ts': [83192, 9],
        './absolute-antd/social/Statistic': [2925, 9, 6023, 983, 4036],
        './absolute-antd/social/Statistic/': [2925, 9, 6023, 983, 4036],
        './absolute-antd/social/Statistic/demo/Statistic.md': [59108, 9, 9108],
        './absolute-antd/social/Statistic/demo/_demo': [63, 9, 6023, 983, 1892],
        './absolute-antd/social/Statistic/demo/_demo.tsx': [
          63, 9, 6023, 983, 1892,
        ],
        './absolute-antd/social/Statistic/index': [2925, 9, 6023, 983, 4036],
        './absolute-antd/social/Statistic/index.tsx': [
          2925, 9, 6023, 983, 4036,
        ],
        './absolute-antd/social/Statistic/schema': [62677, 9],
        './absolute-antd/social/Statistic/schema.ts': [62677, 9],
        './absolute-antd/social/Statistic/template': [90688, 9],
        './absolute-antd/social/Statistic/template.ts': [90688, 9],
        './absolute-antd/social/schema': [86759, 9],
        './absolute-antd/social/schema.ts': [86759, 9],
        './absolute-antd/social/template': [70285, 9],
        './absolute-antd/social/template.ts': [70285, 9],
        './absolute-semantic/base/Ad': [12462, 9, 4626, 2462],
        './absolute-semantic/base/Ad/': [12462, 9, 4626, 2462],
        './absolute-semantic/base/Ad/demo/Ad.md': [32752, 9, 2752],
        './absolute-semantic/base/Ad/demo/_demo': [40221, 9, 4626, 8137, 221],
        './absolute-semantic/base/Ad/demo/_demo.tsx': [
          40221, 9, 4626, 8137, 221,
        ],
        './absolute-semantic/base/Ad/index': [12462, 9, 4626, 2462],
        './absolute-semantic/base/Ad/index.tsx': [12462, 9, 4626, 2462],
        './absolute-semantic/base/Ad/schema': [61170, 9],
        './absolute-semantic/base/Ad/schema.ts': [61170, 9],
        './absolute-semantic/base/Ad/template': [86491, 9],
        './absolute-semantic/base/Ad/template.ts': [86491, 9],
        './absolute-semantic/base/Divider': [74312, 9, 4626, 4312],
        './absolute-semantic/base/Divider/': [74312, 9, 4626, 4312],
        './absolute-semantic/base/Divider/demo/Divider.md': [4386, 9, 4386],
        './absolute-semantic/base/Divider/demo/_demo': [
          63813, 9, 4626, 8137, 3813,
        ],
        './absolute-semantic/base/Divider/demo/_demo.tsx': [
          63813, 9, 4626, 8137, 3813,
        ],
        './absolute-semantic/base/Divider/index': [74312, 9, 4626, 4312],
        './absolute-semantic/base/Divider/index.tsx': [74312, 9, 4626, 4312],
        './absolute-semantic/base/Divider/schema': [46128, 9],
        './absolute-semantic/base/Divider/schema.ts': [46128, 9],
        './absolute-semantic/base/Divider/template': [93671, 9],
        './absolute-semantic/base/Divider/template.ts': [93671, 9],
        './absolute-semantic/base/Header': [24304, 9, 4626, 4304],
        './absolute-semantic/base/Header/': [24304, 9, 4626, 4304],
        './absolute-semantic/base/Header/demo/Header.md': [74388, 9, 4388],
        './absolute-semantic/base/Header/demo/_demo': [
          35679, 9, 4626, 8137, 5679,
        ],
        './absolute-semantic/base/Header/demo/_demo.tsx': [
          35679, 9, 4626, 8137, 5679,
        ],
        './absolute-semantic/base/Header/index': [24304, 9, 4626, 4304],
        './absolute-semantic/base/Header/index.tsx': [24304, 9, 4626, 4304],
        './absolute-semantic/base/Header/schema': [93475, 9],
        './absolute-semantic/base/Header/schema.ts': [93475, 9],
        './absolute-semantic/base/Header/template': [75590, 9],
        './absolute-semantic/base/Header/template.ts': [75590, 9],
        './absolute-semantic/base/Input': [66913, 9, 4626, 416, 6913],
        './absolute-semantic/base/Input/': [66913, 9, 4626, 416, 6913],
        './absolute-semantic/base/Input/demo/Input.md': [44538, 9, 4538],
        './absolute-semantic/base/Input/demo/_demo': [
          35658, 9, 4626, 416, 5658,
        ],
        './absolute-semantic/base/Input/demo/_demo.tsx': [
          35658, 9, 4626, 416, 5658,
        ],
        './absolute-semantic/base/Input/index': [66913, 9, 4626, 416, 6913],
        './absolute-semantic/base/Input/index.tsx': [66913, 9, 4626, 416, 6913],
        './absolute-semantic/base/Input/schema': [53068, 9],
        './absolute-semantic/base/Input/schema.ts': [53068, 9],
        './absolute-semantic/base/Input/template': [58575, 9],
        './absolute-semantic/base/Input/template.ts': [58575, 9],
        './absolute-semantic/base/Label': [50423, 9, 4626, 423],
        './absolute-semantic/base/Label/': [50423, 9, 4626, 423],
        './absolute-semantic/base/Label/demo/Label.md': [26336, 9, 4376],
        './absolute-semantic/base/Label/demo/_demo': [88499, 9, 4626, 8499],
        './absolute-semantic/base/Label/demo/_demo.tsx': [88499, 9, 4626, 8499],
        './absolute-semantic/base/Label/index': [50423, 9, 4626, 423],
        './absolute-semantic/base/Label/index.tsx': [50423, 9, 4626, 423],
        './absolute-semantic/base/Label/schema': [52704, 9],
        './absolute-semantic/base/Label/schema.ts': [52704, 9],
        './absolute-semantic/base/Label/template': [3111, 9],
        './absolute-semantic/base/Label/template.ts': [3111, 9],
        './absolute-semantic/base/Message': [74818, 9, 4626, 4818],
        './absolute-semantic/base/Message/': [74818, 9, 4626, 4818],
        './absolute-semantic/base/Message/demo/Message.md': [325, 9, 325],
        './absolute-semantic/base/Message/demo/_demo': [84182, 9, 4626, 4182],
        './absolute-semantic/base/Message/demo/_demo.tsx': [
          84182, 9, 4626, 4182,
        ],
        './absolute-semantic/base/Message/index': [74818, 9, 4626, 4818],
        './absolute-semantic/base/Message/index.tsx': [74818, 9, 4626, 4818],
        './absolute-semantic/base/Message/schema': [48446, 9],
        './absolute-semantic/base/Message/schema.ts': [48446, 9],
        './absolute-semantic/base/Message/template': [66236, 9],
        './absolute-semantic/base/Message/template.ts': [66236, 9],
        './absolute-semantic/base/Placeholder': [70411, 9, 4626, 411],
        './absolute-semantic/base/Placeholder/': [70411, 9, 4626, 411],
        './absolute-semantic/base/Placeholder/demo/Placeholder.md': [
          44524, 9, 1989,
        ],
        './absolute-semantic/base/Placeholder/demo/_demo': [
          78357, 9, 4626, 8357,
        ],
        './absolute-semantic/base/Placeholder/demo/_demo.tsx': [
          78357, 9, 4626, 8357,
        ],
        './absolute-semantic/base/Placeholder/index': [70411, 9, 4626, 411],
        './absolute-semantic/base/Placeholder/index.tsx': [70411, 9, 4626, 411],
        './absolute-semantic/base/Placeholder/schema': [89251, 9],
        './absolute-semantic/base/Placeholder/schema.ts': [89251, 9],
        './absolute-semantic/base/Placeholder/template': [96096, 9],
        './absolute-semantic/base/Placeholder/template.ts': [96096, 9],
        './absolute-semantic/base/Search': [67787, 9, 4626, 416, 3867, 7787],
        './absolute-semantic/base/Search/': [67787, 9, 4626, 416, 3867, 7787],
        './absolute-semantic/base/Search/demo/Search.md': [8885, 9, 8885],
        './absolute-semantic/base/Search/demo/_demo': [
          77406, 9, 4626, 416, 3867, 7406,
        ],
        './absolute-semantic/base/Search/demo/_demo.tsx': [
          77406, 9, 4626, 416, 3867, 7406,
        ],
        './absolute-semantic/base/Search/index': [
          67787, 9, 4626, 416, 3867, 7787,
        ],
        './absolute-semantic/base/Search/index.tsx': [
          67787, 9, 4626, 416, 3867, 7787,
        ],
        './absolute-semantic/base/Search/schema': [56919, 9],
        './absolute-semantic/base/Search/schema.ts': [56919, 9],
        './absolute-semantic/base/Search/template': [34205, 9],
        './absolute-semantic/base/Search/template.ts': [34205, 9],
        './absolute-semantic/base/Staistic': [71595, 9, 4626, 1595],
        './absolute-semantic/base/Staistic/': [71595, 9, 4626, 1595],
        './absolute-semantic/base/Staistic/demo/Statistic.md': [71135, 9, 1135],
        './absolute-semantic/base/Staistic/demo/_demo': [70124, 9, 4626, 124],
        './absolute-semantic/base/Staistic/demo/_demo.tsx': [
          70124, 9, 4626, 124,
        ],
        './absolute-semantic/base/Staistic/index': [71595, 9, 4626, 1595],
        './absolute-semantic/base/Staistic/index.tsx': [71595, 9, 4626, 1595],
        './absolute-semantic/base/Staistic/schema': [5503, 9],
        './absolute-semantic/base/Staistic/schema.ts': [5503, 9],
        './absolute-semantic/base/Staistic/template': [60357, 9],
        './absolute-semantic/base/Staistic/template.ts': [60357, 9],
        './absolute-semantic/base/Text': [3394, 9, 4626, 3394],
        './absolute-semantic/base/Text/': [3394, 9, 4626, 3394],
        './absolute-semantic/base/Text/demo/Text.md': [94510, 9, 4510],
        './absolute-semantic/base/Text/demo/_demo': [12418, 9, 4626, 2418],
        './absolute-semantic/base/Text/demo/_demo.tsx': [12418, 9, 4626, 2418],
        './absolute-semantic/base/Text/index': [3394, 9, 4626, 3394],
        './absolute-semantic/base/Text/index.tsx': [3394, 9, 4626, 3394],
        './absolute-semantic/base/Text/schema': [53851, 9],
        './absolute-semantic/base/Text/schema.ts': [53851, 9],
        './absolute-semantic/base/Text/template': [43180, 9],
        './absolute-semantic/base/Text/template.ts': [43180, 9],
        './absolute-semantic/base/TextArea': [
          53058, 9, 4626, 416, 8723, 5957, 1223, 3058,
        ],
        './absolute-semantic/base/TextArea/': [
          53058, 9, 4626, 416, 8723, 5957, 1223, 3058,
        ],
        './absolute-semantic/base/TextArea/demo/TextArea.md': [71164, 9, 1164],
        './absolute-semantic/base/TextArea/demo/_demo': [
          89882, 9, 4626, 416, 8723, 5957, 1223, 9882,
        ],
        './absolute-semantic/base/TextArea/demo/_demo.tsx': [
          89882, 9, 4626, 416, 8723, 5957, 1223, 9882,
        ],
        './absolute-semantic/base/TextArea/index': [
          53058, 9, 4626, 416, 8723, 5957, 1223, 3058,
        ],
        './absolute-semantic/base/TextArea/index.tsx': [
          53058, 9, 4626, 416, 8723, 5957, 1223, 3058,
        ],
        './absolute-semantic/base/TextArea/schema': [39794, 9],
        './absolute-semantic/base/TextArea/schema.ts': [39794, 9],
        './absolute-semantic/base/TextArea/template': [29529, 9],
        './absolute-semantic/base/TextArea/template.ts': [29529, 9],
        './absolute-semantic/base/schema': [82984, 9],
        './absolute-semantic/base/schema.ts': [82984, 9],
        './absolute-semantic/base/template': [6, 9],
        './absolute-semantic/base/template.ts': [6, 9],
        './absolute-semantic/control/Button': [67776, 9, 4626, 7776],
        './absolute-semantic/control/Button/': [67776, 9, 4626, 7776],
        './absolute-semantic/control/Button/demo/Button.md': [27054, 9, 7054],
        './absolute-semantic/control/Button/demo/_demo': [
          1007, 9, 4626, 8137, 1007,
        ],
        './absolute-semantic/control/Button/demo/_demo.tsx': [
          1007, 9, 4626, 8137, 1007,
        ],
        './absolute-semantic/control/Button/index': [67776, 9, 4626, 7776],
        './absolute-semantic/control/Button/index.tsx': [67776, 9, 4626, 7776],
        './absolute-semantic/control/Button/schema': [15117, 9],
        './absolute-semantic/control/Button/schema.ts': [15117, 9],
        './absolute-semantic/control/Button/template': [57861, 9],
        './absolute-semantic/control/Button/template.ts': [57861, 9],
        './absolute-semantic/control/CheckBox': [42966, 9, 4626, 2966],
        './absolute-semantic/control/CheckBox/': [42966, 9, 4626, 2966],
        './absolute-semantic/control/CheckBox/demo/CheckBox.md': [
          50124, 9, 4009,
        ],
        './absolute-semantic/control/CheckBox/demo/_demo': [
          10651, 9, 4626, 8137, 651,
        ],
        './absolute-semantic/control/CheckBox/demo/_demo.tsx': [
          10651, 9, 4626, 8137, 651,
        ],
        './absolute-semantic/control/CheckBox/index': [42966, 9, 4626, 2966],
        './absolute-semantic/control/CheckBox/index.tsx': [
          42966, 9, 4626, 2966,
        ],
        './absolute-semantic/control/CheckBox/schema': [38690, 9],
        './absolute-semantic/control/CheckBox/schema.ts': [38690, 9],
        './absolute-semantic/control/CheckBox/template': [54910, 9],
        './absolute-semantic/control/CheckBox/template.ts': [54910, 9],
        './absolute-semantic/control/Dropdown': [
          70420, 9, 4626, 8723, 5957, 420,
        ],
        './absolute-semantic/control/Dropdown/': [
          70420, 9, 4626, 8723, 5957, 420,
        ],
        './absolute-semantic/control/Dropdown/demo/Dropdown.md': [
          81791, 9, 1791,
        ],
        './absolute-semantic/control/Dropdown/demo/_demo': [
          87852, 9, 4626, 8723, 5957, 7852,
        ],
        './absolute-semantic/control/Dropdown/demo/_demo.tsx': [
          87852, 9, 4626, 8723, 5957, 7852,
        ],
        './absolute-semantic/control/Dropdown/index': [
          70420, 9, 4626, 8723, 5957, 420,
        ],
        './absolute-semantic/control/Dropdown/index.tsx': [
          70420, 9, 4626, 8723, 5957, 420,
        ],
        './absolute-semantic/control/Dropdown/schema': [71401, 9],
        './absolute-semantic/control/Dropdown/schema.ts': [71401, 9],
        './absolute-semantic/control/Dropdown/template': [68414, 9],
        './absolute-semantic/control/Dropdown/template.ts': [68414, 9],
        './absolute-semantic/control/Pagination': [45559, 9, 4626, 9398, 5559],
        './absolute-semantic/control/Pagination/': [45559, 9, 4626, 9398, 5559],
        './absolute-semantic/control/Pagination/demo/Pagination.md': [
          20859, 9, 859,
        ],
        './absolute-semantic/control/Pagination/demo/_demo': [
          55850, 9, 4626, 9398, 5850,
        ],
        './absolute-semantic/control/Pagination/demo/_demo.tsx': [
          55850, 9, 4626, 9398, 5850,
        ],
        './absolute-semantic/control/Pagination/index': [
          45559, 9, 4626, 9398, 5559,
        ],
        './absolute-semantic/control/Pagination/index.tsx': [
          45559, 9, 4626, 9398, 5559,
        ],
        './absolute-semantic/control/Pagination/schema': [49145, 9],
        './absolute-semantic/control/Pagination/schema.ts': [49145, 9],
        './absolute-semantic/control/Pagination/template': [24973, 9],
        './absolute-semantic/control/Pagination/template.ts': [24973, 9],
        './absolute-semantic/control/Progress': [736, 9, 4626, 736],
        './absolute-semantic/control/Progress/': [736, 9, 4626, 736],
        './absolute-semantic/control/Progress/demo/Progress.md': [
          76743, 9, 6743,
        ],
        './absolute-semantic/control/Progress/demo/_demo': [
          82990, 9, 4626, 2990,
        ],
        './absolute-semantic/control/Progress/demo/_demo.tsx': [
          82990, 9, 4626, 2990,
        ],
        './absolute-semantic/control/Progress/index': [736, 9, 4626, 736],
        './absolute-semantic/control/Progress/index.tsx': [736, 9, 4626, 736],
        './absolute-semantic/control/Progress/schema': [21244, 9],
        './absolute-semantic/control/Progress/schema.ts': [21244, 9],
        './absolute-semantic/control/Progress/template': [29269, 9],
        './absolute-semantic/control/Progress/template.ts': [29269, 9],
        './absolute-semantic/control/Radio': [20832, 9, 4626, 832],
        './absolute-semantic/control/Radio/': [20832, 9, 4626, 832],
        './absolute-semantic/control/Radio/demo/Radio.md': [60537, 9, 537],
        './absolute-semantic/control/Radio/demo/_demo': [
          82503, 9, 4626, 8137, 2503,
        ],
        './absolute-semantic/control/Radio/demo/_demo.tsx': [
          82503, 9, 4626, 8137, 2503,
        ],
        './absolute-semantic/control/Radio/index': [20832, 9, 4626, 832],
        './absolute-semantic/control/Radio/index.tsx': [20832, 9, 4626, 832],
        './absolute-semantic/control/Radio/schema': [14949, 9],
        './absolute-semantic/control/Radio/schema.ts': [14949, 9],
        './absolute-semantic/control/Radio/template': [61736, 9],
        './absolute-semantic/control/Radio/template.ts': [61736, 9],
        './absolute-semantic/control/schema': [76324, 9],
        './absolute-semantic/control/schema.ts': [76324, 9],
        './absolute-semantic/control/template': [19177, 9],
        './absolute-semantic/control/template.ts': [19177, 9],
        './absolute-semantic/media/Embed': [26950, 9, 4626, 6950],
        './absolute-semantic/media/Embed/': [26950, 9, 4626, 6950],
        './absolute-semantic/media/Embed/demo/Embed.md': [77712, 9, 7712],
        './absolute-semantic/media/Embed/demo/_demo': [54224, 9, 4626, 4224],
        './absolute-semantic/media/Embed/demo/_demo.tsx': [
          54224, 9, 4626, 4224,
        ],
        './absolute-semantic/media/Embed/index': [26950, 9, 4626, 6950],
        './absolute-semantic/media/Embed/index.tsx': [26950, 9, 4626, 6950],
        './absolute-semantic/media/Embed/schema': [94220, 9],
        './absolute-semantic/media/Embed/schema.ts': [94220, 9],
        './absolute-semantic/media/Embed/template': [54717, 9],
        './absolute-semantic/media/Embed/template.ts': [54717, 9],
        './absolute-semantic/media/Image': [45214, 9, 4626, 5214],
        './absolute-semantic/media/Image/': [45214, 9, 4626, 5214],
        './absolute-semantic/media/Image/demo/Image.md': [95882, 9, 5882],
        './absolute-semantic/media/Image/demo/_demo': [79200, 9, 4626, 9200],
        './absolute-semantic/media/Image/demo/_demo.tsx': [
          79200, 9, 4626, 9200,
        ],
        './absolute-semantic/media/Image/index': [45214, 9, 4626, 5214],
        './absolute-semantic/media/Image/index.tsx': [45214, 9, 4626, 5214],
        './absolute-semantic/media/Image/schema': [46810, 9],
        './absolute-semantic/media/Image/schema.ts': [46810, 9],
        './absolute-semantic/media/Image/template': [63072, 9],
        './absolute-semantic/media/Image/template.ts': [63072, 9],
        './absolute-semantic/media/schema': [81536, 9],
        './absolute-semantic/media/schema.ts': [81536, 9],
        './absolute-semantic/media/template': [38679, 9],
        './absolute-semantic/media/template.ts': [38679, 9],
        './absolute-semantic/schema': [48803, 9],
        './absolute-semantic/schema.ts': [48803, 9],
        './absolute-semantic/social/Accordion': [19919, 9, 4626, 5346],
        './absolute-semantic/social/Accordion/': [19919, 9, 4626, 5346],
        './absolute-semantic/social/Accordion/demo/Accordion.md': [
          11561, 9, 1561,
        ],
        './absolute-semantic/social/Accordion/demo/_demo': [20001, 9, 4626, 1],
        './absolute-semantic/social/Accordion/demo/_demo.tsx': [
          20001, 9, 4626, 1,
        ],
        './absolute-semantic/social/Accordion/index': [19919, 9, 4626, 5346],
        './absolute-semantic/social/Accordion/index.tsx': [
          19919, 9, 4626, 5346,
        ],
        './absolute-semantic/social/Accordion/schema': [88647, 9],
        './absolute-semantic/social/Accordion/schema.ts': [88647, 9],
        './absolute-semantic/social/Accordion/template': [16458, 9],
        './absolute-semantic/social/Accordion/template.ts': [16458, 9],
        './absolute-semantic/social/Card': [74589, 9, 4626, 4589],
        './absolute-semantic/social/Card/': [74589, 9, 4626, 4589],
        './absolute-semantic/social/Card/demo/Card.md': [29368, 9, 9368],
        './absolute-semantic/social/Card/demo/_demo': [41014, 9, 4626, 1014],
        './absolute-semantic/social/Card/demo/_demo.tsx': [
          41014, 9, 4626, 1014,
        ],
        './absolute-semantic/social/Card/index': [74589, 9, 4626, 4589],
        './absolute-semantic/social/Card/index.tsx': [74589, 9, 4626, 4589],
        './absolute-semantic/social/Card/schema': [30384, 9],
        './absolute-semantic/social/Card/schema.ts': [30384, 9],
        './absolute-semantic/social/Card/template': [22438, 9],
        './absolute-semantic/social/Card/template.ts': [22438, 9],
        './absolute-semantic/social/Comment': [63512, 9, 4626, 3512],
        './absolute-semantic/social/Comment/': [63512, 9, 4626, 3512],
        './absolute-semantic/social/Comment/demo/Comment.md': [33102, 9, 3102],
        './absolute-semantic/social/Comment/demo/_demo': [89518, 9, 4626, 9518],
        './absolute-semantic/social/Comment/demo/_demo.tsx': [
          89518, 9, 4626, 9518,
        ],
        './absolute-semantic/social/Comment/index': [63512, 9, 4626, 3512],
        './absolute-semantic/social/Comment/index.tsx': [63512, 9, 4626, 3512],
        './absolute-semantic/social/Comment/schema': [58993, 9],
        './absolute-semantic/social/Comment/schema.ts': [58993, 9],
        './absolute-semantic/social/Comment/template': [51425, 9],
        './absolute-semantic/social/Comment/template.ts': [51425, 9],
        './absolute-semantic/social/Feed': [26464, 9, 4626, 6464],
        './absolute-semantic/social/Feed/': [26464, 9, 4626, 6464],
        './absolute-semantic/social/Feed/demo/Feed.md': [79794, 9, 9794],
        './absolute-semantic/social/Feed/demo/_demo': [14117, 9, 4626, 4117],
        './absolute-semantic/social/Feed/demo/_demo.tsx': [
          14117, 9, 4626, 4117,
        ],
        './absolute-semantic/social/Feed/index': [26464, 9, 4626, 6464],
        './absolute-semantic/social/Feed/index.tsx': [26464, 9, 4626, 6464],
        './absolute-semantic/social/Feed/schema': [30405, 9],
        './absolute-semantic/social/Feed/schema.ts': [30405, 9],
        './absolute-semantic/social/Feed/template': [74838, 9],
        './absolute-semantic/social/Feed/template.ts': [74838, 9],
        './absolute-semantic/social/Item': [93427, 9, 4626, 1961],
        './absolute-semantic/social/Item/': [93427, 9, 4626, 1961],
        './absolute-semantic/social/Item/demo/Item.md': [74311, 9, 4311],
        './absolute-semantic/social/Item/demo/_demo': [48140, 9, 4626, 8140],
        './absolute-semantic/social/Item/demo/_demo.tsx': [
          48140, 9, 4626, 8140,
        ],
        './absolute-semantic/social/Item/index': [93427, 9, 4626, 1961],
        './absolute-semantic/social/Item/index.tsx': [93427, 9, 4626, 1961],
        './absolute-semantic/social/Item/schema': [57267, 9],
        './absolute-semantic/social/Item/schema.ts': [57267, 9],
        './absolute-semantic/social/Item/template': [22089, 9],
        './absolute-semantic/social/Item/template.ts': [22089, 9],
        './absolute-semantic/social/Rate': [76163, 9, 4626, 6163],
        './absolute-semantic/social/Rate/': [76163, 9, 4626, 6163],
        './absolute-semantic/social/Rate/demo/Rating.md': [51314, 9, 1314],
        './absolute-semantic/social/Rate/demo/_demo': [78065, 9, 4626, 8065],
        './absolute-semantic/social/Rate/demo/_demo.tsx': [
          78065, 9, 4626, 8065,
        ],
        './absolute-semantic/social/Rate/index': [76163, 9, 4626, 6163],
        './absolute-semantic/social/Rate/index.tsx': [76163, 9, 4626, 6163],
        './absolute-semantic/social/Rate/schema': [64110, 9],
        './absolute-semantic/social/Rate/schema.ts': [64110, 9],
        './absolute-semantic/social/Rate/template': [94477, 9],
        './absolute-semantic/social/Rate/template.ts': [94477, 9],
        './absolute-semantic/social/schema': [80170, 9],
        './absolute-semantic/social/schema.ts': [80170, 9],
        './absolute-semantic/social/template': [44014, 9],
        './absolute-semantic/social/template.ts': [44014, 9],
      };
      function o(e) {
        if (!n.o(a, e))
          return Promise.resolve().then(function () {
            var t = new Error("Cannot find module '" + e + "'");
            throw ((t.code = 'MODULE_NOT_FOUND'), t);
          });
        var t = a[e],
          o = t[0];
        return Promise.all(t.slice(2).map(n.e)).then(function () {
          return n.t(o, 16 | t[1]);
        });
      }
      (o.keys = function () {
        return Object.keys(a);
      }),
        (o.id = 5629),
        (e.exports = o);
    },
    18685: function () {},
    20067: function () {},
    55382: function () {},
    72095: function () {},
    61219: function () {},
  },
]);
