(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4355],
  {
    16855: function (e, t, r) {
      'use strict';
      r.r(t),
        r.d(t, {
          default: function () {
            return re;
          },
        });
      var i = r(57337),
        n = r(12924),
        s = r.n(n),
        a = r(20653),
        o = r(90636),
        c = r(3182),
        p = r(52276),
        l = r.n(p),
        u = r(84627),
        j = r(29707),
        _ = r(27017),
        d = r(61578),
        S = r(98901),
        m = r(12572),
        g = r(90597),
        y = r(76198),
        h = r(13910),
        x = r(90974),
        f = r(96779),
        E = r(91896),
        b = r(93224),
        v = r(18549),
        C = ['url', 'responseFormatter', 'extraBehaviorActions'],
        P = [];
      class w extends n.Component {
        render() {
          var e = this.props,
            t = (e.url, e.responseFormatter, e.extraBehaviorActions),
            r = void 0 === t ? [] : t,
            i = (0, b.Z)(e, C),
            s = 'https://hn.algolia.com/api/v1/search?query',
            a = (e) => e.hits.map((e) => ({ label: e.title, value: e.author })),
            o = r.concat(P);
          return n.createElement(
            v.Z,
            (0, E.Z)({}, i, {
              url: s,
              responseFormatter: a,
              extraBehaviorActions: o,
            }),
          );
        }
      }
      var B = w;
      class k extends n.Component {
        render() {
          var e = this.props;
          e.defaultValue, e.value, e.onChange, this.props.field.editor;
          return s().createElement('div', null, 'hello world');
        }
      }
      var M = k,
        N = (e) =>
          s().createElement(
            'div',
            { className: 'lowcode-plugin-logo' },
            s().createElement('a', {
              className: 'logo',
              target: 'blank',
              href: e.href || 'https://lowcode-engine.cn',
              style: { backgroundImage: 'url('.concat(e.logo, ')') },
            }),
          ),
        T = N,
        G = r(98393),
        Z = (e) => ({
          name: 'deleteHiddenTransducer',
          init() {
            return (0, c.Z)(
              (0, o.Z)().mark(function e() {
                return (0, o.Z)().wrap(function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        a.project.addPropsTransducer(
                          (e) => (delete e.hidden, e),
                          G.TransformStage.Save,
                        );
                      case 1:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              }),
            )();
          },
        });
      Z.pluginName = 'deleteHiddenTransducer';
      var A = () => {
          null === a.material ||
            void 0 === a.material ||
            a.material.onChangeAssets(() => {
              u.Message.success(
                '[MCBreadcrumb] \u7269\u6599\u52a0\u8f7d\u6210\u529f',
              );
            }),
            a.material.loadIncrementalAssets({
              packages: [
                {
                  title: 'MCBreadcrumb',
                  package: 'mc-breadcrumb',
                  version: '1.0.0',
                  urls: [
                    'https://unpkg.alibaba-inc.com/mc-breadcrumb@1.0.0/dist/MCBreadcrumb.js',
                    'https://unpkg.alibaba-inc.com/mc-breadcrumb@1.0.0/dist/MCBreadcrumb.css',
                  ],
                  library: 'MCBreadcrumb',
                },
              ],
              components: [
                {
                  componentName: 'MCBreadcrumb',
                  title: 'MCBreadcrumb',
                  docUrl: '',
                  screenshot: '',
                  npm: {
                    package: 'mc-breadcrumb',
                    version: '1.0.0',
                    exportName: 'MCBreadcrumb',
                    main: 'lib/index.js',
                    destructuring: !1,
                    subName: '',
                  },
                  props: [
                    {
                      name: 'prefix',
                      propType: 'string',
                      description:
                        '\u6837\u5f0f\u7c7b\u540d\u7684\u54c1\u724c\u524d\u7f00',
                      defaultValue: 'next-',
                    },
                    {
                      name: 'title',
                      propType: 'string',
                      description: '\u6807\u9898',
                      defaultValue: 'next-',
                    },
                    { name: 'rtl', propType: 'bool' },
                    {
                      name: 'children',
                      propType: { type: 'instanceOf', value: 'node' },
                      description:
                        '\u9762\u5305\u5c51\u5b50\u8282\u70b9\uff0c\u9700\u4f20\u5165 Breadcrumb.Item',
                    },
                    {
                      name: 'maxNode',
                      propType: {
                        type: 'oneOfType',
                        value: ['number', { type: 'oneOf', value: ['auto'] }],
                      },
                      description:
                        '\u9762\u5305\u5c51\u6700\u591a\u663e\u793a\u4e2a\u6570\uff0c\u8d85\u51fa\u90e8\u5206\u4f1a\u88ab\u9690\u85cf, \u8bbe\u7f6e\u4e3a auto \u4f1a\u81ea\u52a8\u6839\u636e\u7236\u5143\u7d20\u7684\u5bbd\u5ea6\u9002\u914d\u3002',
                      defaultValue: 100,
                    },
                    {
                      name: 'separator',
                      propType: { type: 'instanceOf', value: 'node' },
                      description:
                        '\u5206\u9694\u7b26\uff0c\u53ef\u4ee5\u662f\u6587\u672c\u6216 Icon',
                    },
                    {
                      name: 'component',
                      propType: {
                        type: 'oneOfType',
                        value: ['string', 'func'],
                      },
                      description: '\u8bbe\u7f6e\u6807\u7b7e\u7c7b\u578b',
                      defaultValue: 'nav',
                    },
                    { name: 'className', propType: 'any' },
                    { name: 'style', propType: 'object' },
                  ],
                  configure: {
                    component: {
                      isContainer: !0,
                      isModel: !0,
                      rootSelector: 'div.MCBreadcrumb',
                    },
                  },
                },
              ],
              componentList: [
                {
                  title: '\u5e38\u7528',
                  icon: '',
                  children: [
                    {
                      componentName: 'MCBreadcrumb',
                      title: 'MC\u9762\u5305\u5c51',
                      icon: '',
                      package: 'mc-breadcrumb',
                      library: 'MCBreadcrumb',
                      snippets: [
                        {
                          title: 'MC\u9762\u5305\u5c51',
                          screenshot:
                            'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_breadcrumb.png',
                          schema: {
                            componentName: 'MCBreadcrumb',
                            props: {
                              title: '\u7269\u6599\u4e2d\u5fc3',
                              prefix: 'next-',
                              maxNode: 100,
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            });
        },
        O = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'index';
          L(e),
            setTimeout(() => {
              var t = location.search
                ? ''.concat(location.search, '&scenarioName=').concat(e)
                : '?scenarioName='.concat(e);
              window.open('./preview'.concat(t));
            }, 500);
        },
        L = (function () {
          var e = (0, c.Z)(
            (0, o.Z)().mark(function e() {
              var t,
                r = arguments;
              return (0, o.Z)().wrap(function (e) {
                while (1)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (t = r.length > 0 && void 0 !== r[0] ? r[0] : 'index'),
                        W(t),
                        (e.next = 4),
                        K(t)
                      );
                    case 4:
                      u.Message.success(
                        '\u6210\u529f\u4fdd\u5b58\u5230\u672c\u5730',
                      );
                    case 5:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            }),
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        I = (function () {
          var e = (0, c.Z)(
            (0, o.Z)().mark(function e() {
              var t,
                i,
                n,
                s,
                c,
                p,
                l,
                j,
                _ = arguments;
              return (0, o.Z)().wrap(
                function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n =
                            _.length > 0 && void 0 !== _[0] ? _[0] : 'index'),
                          (e.prev = 1),
                          (e.next = 4),
                          new Promise((e, t) => {
                            u.Dialog.confirm({
                              content:
                                '\u786e\u5b9a\u8981\u91cd\u7f6e\u5417\uff1f\u60a8\u6240\u6709\u7684\u4fee\u6539\u90fd\u5c06\u6d88\u5931\uff01',
                              onOk: () => {
                                e();
                              },
                              onCancel: () => {
                                t();
                              },
                            });
                          })
                        );
                      case 4:
                        e.next = 9;
                        break;
                      case 6:
                        return (
                          (e.prev = 6),
                          (e.t0 = e['catch'](1)),
                          e.abrupt('return')
                        );
                      case 9:
                        if ('index' === n) {
                          e.next = 15;
                          break;
                        }
                        return (
                          window.localStorage.setItem(
                            D(n),
                            JSON.stringify({
                              componentsTree: [
                                { componentName: 'Page', fileName: 'sample' },
                              ],
                              componentsMap: a.material.componentsMap,
                              version: '1.0.0',
                              i18n: {},
                            }),
                          ),
                          null === (s = a.project.getCurrentDocument()) ||
                            void 0 === s ||
                            s.importSchema({
                              componentName: 'Page',
                              fileName: 'sample',
                            }),
                          null === (c = a.project.simulatorHost) ||
                            void 0 === c ||
                            c.rerender(),
                          u.Message.success(
                            '\u6210\u529f\u91cd\u7f6e\u9875\u9762',
                          ),
                          e.abrupt('return')
                        );
                      case 15:
                        return (
                          (e.prev = 15),
                          (e.next = 18),
                          r.e(8278).then(r.t.bind(r, 68278, 19))
                        );
                      case 18:
                        (l = e.sent), (j = l.default), (p = j), (e.next = 26);
                        break;
                      case 23:
                        (e.prev = 23),
                          (e.t1 = e['catch'](15)),
                          (p = { componentName: 'Page', fileName: 'sample' });
                      case 26:
                        window.localStorage.setItem(
                          D('index'),
                          JSON.stringify({
                            componentsTree: [p],
                            componentsMap: a.material.componentsMap,
                            version: '1.0.0',
                            i18n: {},
                          }),
                        ),
                          null === (t = a.project.getCurrentDocument()) ||
                            void 0 === t ||
                            t.importSchema(p),
                          null === (i = a.project.simulatorHost) ||
                            void 0 === i ||
                            i.rerender(),
                          u.Message.success(
                            '\u6210\u529f\u91cd\u7f6e\u9875\u9762',
                          );
                      case 30:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [
                  [1, 6],
                  [15, 23],
                ],
              );
            }),
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        D = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 'projectSchema';
          return ''.concat(e, ':').concat(t);
        },
        H = (e) => {
          if (e) return JSON.parse(window.localStorage.getItem(D(e)) || '{}');
          console.error('scenarioName is required!');
        },
        W = (e) => {
          e
            ? window.localStorage.setItem(
                D(e),
                JSON.stringify(a.project.exportSchema(G.TransformStage.Save)),
              )
            : console.error('scenarioName is required!');
        },
        K = (function () {
          var e = (0, c.Z)(
            (0, o.Z)().mark(function e(t) {
              var r;
              return (0, o.Z)().wrap(function (e) {
                while (1)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (t) {
                        e.next = 3;
                        break;
                      }
                      return (
                        console.error('scenarioName is required!'),
                        e.abrupt('return')
                      );
                    case 3:
                      return (
                        (e.next = 5), (0, h.WL)(a.material.getAssets().packages)
                      );
                    case 5:
                      (r = e.sent),
                        window.localStorage.setItem(
                          D(t, 'packages'),
                          JSON.stringify(r),
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
        U = (function () {
          var e = (0, c.Z)(
            (0, o.Z)().mark(function e() {
              var t,
                i,
                n,
                s,
                a,
                c = arguments;
              return (0, o.Z)().wrap(function (e) {
                while (1)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (
                        ((i = c.length > 0 && void 0 !== c[0] ? c[0] : 'index'),
                        (n =
                          null === (t = H(i).componentsTree) || void 0 === t
                            ? void 0
                            : t[0]),
                        !n)
                      ) {
                        e.next = 4;
                        break;
                      }
                      return e.abrupt('return', n);
                    case 4:
                      return (
                        (e.next = 6), r.e(8278).then(r.t.bind(r, 68278, 19))
                      );
                    case 6:
                      return (
                        (s = e.sent), (a = s.default), e.abrupt('return', a)
                      );
                    case 9:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            }),
          );
          return function () {
            return e.apply(this, arguments);
          };
        })();
      var R = JSON.parse(
          '{"packages":[{"package":"moment","version":"2.24.0","urls":["https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js"],"library":"moment"},{"package":"lodash","library":"_","urls":["https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js"]},{"title":"fusion\u7ec4\u4ef6\u5e93","package":"@alifd/next","version":"1.24.18","urls":["https://g.alicdn.com/code/lib/alifd__next/1.24.18/next.min.css","https://g.alicdn.com/code/lib/alifd__next/1.24.18/next-with-locales.min.js"],"library":"Next"},{"title":"NextTable","package":"NextTable","version":"1.0.1","urls":["https://g.alicdn.com/fusion-platform/pro-table/1.0.1/next-table.js","https://g.alicdn.com/fusion-platform/pro-table/1.0.1/next-table.css"],"library":"NextTable"},{"package":"@alilc/lowcode-materials","version":"1.0.2","library":"AlilcLowcodeMaterials","urls":["https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.2/dist/AlilcLowcodeMaterials.js","https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.2/dist/AlilcLowcodeMaterials.css"],"editUrls":["https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.2/build/lowcode/view.js","https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.2/build/lowcode/view.css"]},{"package":"@alifd/pro-layout","version":"1.0.1-beta.6","library":"AlifdProLayout","urls":["https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/dist/AlifdProLayout.js","https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/dist/AlifdProLayout.css"],"editUrls":["https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/build/lowcode/view.js","https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/build/lowcode/view.css"]},{"package":"@alifd/fusion-ui","version":"1.0.5","library":"AlifdFusionUi","urls":["https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.5/dist/AlifdFusionUi.js","https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.5/dist/AlifdFusionUi.css"],"editUrls":["https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.5/build/lowcode/view.js","https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.5/build/lowcode/view.css"]}],"components":[{"exportName":"AlilcLowcodeMaterialsMeta","npm":{"package":"@alilc/lowcode-materials"},"url":"https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.2/build/lowcode/meta.js","urls":{"default":"https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.2/build/lowcode/meta.js","design":"https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.2/build/lowcode/meta.design.js"}},{"exportName":"AlifdProLayoutMeta","npm":{"package":"@alifd/pro-layout","version":"1.0.1-beta.6"},"url":"https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/build/lowcode/meta.js","urls":{"default":"https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/build/lowcode/meta.js","design":"https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/build/lowcode/meta.design.js"}},{"exportName":"AlifdFusionUiMeta","npm":{"package":"@alifd/fusion-ui"},"url":"https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.5/build/lowcode/meta.js","urls":{"default":"https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.5/build/lowcode/meta.js","design":"https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.5/build/lowcode/meta.design.js"}}],"sort":{"groupList":["\u7cbe\u9009\u7ec4\u4ef6","\u539f\u5b50\u7ec4\u4ef6"],"categoryList":["\u57fa\u7840\u5143\u7d20","\u5e03\u5c40\u5bb9\u5668\u7c7b","\u8868\u683c\u7c7b","\u8868\u5355\u8be6\u60c5\u7c7b","\u5e2e\u52a9\u7c7b","\u5bf9\u8bdd\u6846\u7c7b","\u4e1a\u52a1\u7c7b","\u901a\u7528","\u5f15\u5bfc","\u4fe1\u606f\u8f93\u5165","\u4fe1\u606f\u5c55\u793a","\u4fe1\u606f\u53cd\u9988"]},"groupList":["\u7cbe\u9009\u7ec4\u4ef6","\u539f\u5b50\u7ec4\u4ef6"],"ignoreComponents":{}}',
        ),
        V = r(8870),
        q = r(55877);
      function F(e) {
        var t,
          r,
          i = e.componentName,
          n = e.configure,
          s = void 0 === n ? {} : n,
          a = 'Page' === i || 'Component' === i;
        if (a) return e;
        var o = {
          title: {
            label: 'refId',
            tip: '\u7528\u4e8e\u83b7\u53d6\u7ec4\u4ef6\u5b9e\u4f8b\uff0c\u8c03\u7528\u7269\u6599\u5185\u90e8\u65b9\u6cd5',
            icon: '',
          },
          name: 'ref',
          setter: { componentName: 'StringSetter' },
          defaultValue: () => {
            var e = (0, q.v4)().replace('-', '').substring(0, 8);
            return ''.concat(i.toLowerCase(), '-').concat(e);
          },
          extraProps: { display: 'block', supportVariable: !1 },
        };
        s.combined || (s.combined = []),
          (r =
            null === (t = s.combined) || void 0 === t
              ? void 0
              : t.filter((e) => '#advanced' === e.name)[0]),
          r ||
            ((r = {
              name: '#advanced',
              title: {
                type: 'i18n',
                'zh-CN': '\u9ad8\u7ea7',
                'en-US': 'Advanced',
              },
              items: [o],
            }),
            s.combined.push(r)),
          r.items || (r.items = [o]);
        var c = r.items || [];
        return (
          (c &&
            c.length &&
            null !== c &&
            void 0 !== c &&
            c.filter((e) => 'ref' === e.name).length) ||
            c.push(o),
          (0, V.Z)((0, V.Z)({}, e), {}, { configure: s })
        );
      }
      var J = () => ({
        init() {
          a.material.registerMetadataTransducer(F, 110, 'register-ref-prop');
        },
      });
      function z() {
        return Y.apply(this, arguments);
      }
      function Y() {
        return (
          (Y = (0, c.Z)(
            (0, o.Z)().mark(function e() {
              var t, r, i, n, p, E, b;
              return (0, o.Z)().wrap(function (e) {
                while (1)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), a.plugins.register(y.Z);
                    case 2:
                      return (e.next = 4), a.plugins.register(h.ZP);
                    case 4:
                      return (e.next = 6), a.plugins.register(J);
                    case 6:
                      return (e.next = 8), a.plugins.register(Z);
                    case 8:
                      return (
                        (m.Z.pluginName = 'SchemaPlugin'),
                        (e.next = 11),
                        a.plugins.register(m.Z)
                      );
                    case 11:
                      return (
                        (x.ZP.pluginName = 'SimulatorResizer'),
                        a.plugins.register(x.ZP),
                        (t = (e) => ({
                          name: 'editor-init',
                          init() {
                            return (0, c.Z)(
                              (0, o.Z)().mark(function t() {
                                var r, i, n;
                                return (0, o.Z)().wrap(function (t) {
                                  while (1)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        return (
                                          (r = e.material),
                                          (i = e.project),
                                          (t.t0 = r),
                                          (t.next = 4),
                                          (0, h.QG)(R)
                                        );
                                      case 4:
                                        return (
                                          (t.t1 = t.sent),
                                          (t.next = 7),
                                          t.t0.setAssets.call(t.t0, t.t1)
                                        );
                                      case 7:
                                        return (t.next = 9), U();
                                      case 9:
                                        (n = t.sent), i.openDocument(n);
                                      case 11:
                                      case 'end':
                                        return t.stop();
                                    }
                                }, t);
                              }),
                            )();
                          },
                        })),
                        (t.pluginName = 'editorInit'),
                        (e.next = 17),
                        a.plugins.register(t)
                      );
                    case 17:
                      return (
                        (r = (e) => ({
                          name: 'builtin-plugin-registry',
                          init() {
                            return (0, c.Z)(
                              (0, o.Z)().mark(function t() {
                                var r, i, n;
                                return (0, o.Z)().wrap(function (t) {
                                  while (1)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        (i = e.skeleton),
                                          i.add({
                                            area: 'topArea',
                                            type: 'Widget',
                                            name: 'logo',
                                            content: T,
                                            contentProps: {
                                              logo: 'https://img.alicdn.com/imgextra/i4/O1CN013w2bmQ25WAIha4Hx9_!!6000000007533-55-tps-137-26.svg',
                                              href: 'https://lowcode-engine.cn',
                                            },
                                            props: { align: 'left' },
                                          }),
                                          (n = i.add({
                                            area: 'leftArea',
                                            type: 'PanelDock',
                                            name: 'componentsPane',
                                            content: j.Z,
                                            contentProps: {},
                                            props: {
                                              align: 'top',
                                              icon: 'zujianku',
                                              description: '\u7ec4\u4ef6\u5e93',
                                            },
                                          })),
                                          null === n ||
                                            void 0 === n ||
                                            null === (r = n.disable) ||
                                            void 0 === r ||
                                            r.call(n),
                                          a.project.onSimulatorRendererReady(
                                            () => {
                                              var e;
                                              null === n ||
                                                void 0 === n ||
                                                null === (e = n.enable) ||
                                                void 0 === e ||
                                                e.call(n);
                                            },
                                          );
                                      case 5:
                                      case 'end':
                                        return t.stop();
                                    }
                                }, t);
                              }),
                            )();
                          },
                        })),
                        (r.pluginName = 'builtinPluginRegistry'),
                        (e.next = 21),
                        a.plugins.register(r)
                      );
                    case 21:
                      return (
                        (i = (e) => {
                          var t = l().setterMap,
                            r = l().pluginMap;
                          return {
                            name: 'ext-setters-registry',
                            init() {
                              return (0, c.Z)(
                                (0, o.Z)().mark(function i() {
                                  var n, s;
                                  return (0, o.Z)().wrap(function (i) {
                                    while (1)
                                      switch ((i.prev = i.next)) {
                                        case 0:
                                          (n = e.setters),
                                            (s = e.skeleton),
                                            n.registerSetter(t),
                                            s.add({
                                              area: 'centerArea',
                                              type: 'Widget',
                                              content: r.EventBindDialog,
                                              name: 'eventBindDialog',
                                              props: {},
                                            }),
                                            s.add({
                                              area: 'centerArea',
                                              type: 'Widget',
                                              content: r.VariableBindDialog,
                                              name: 'variableBindDialog',
                                              props: {},
                                            });
                                        case 4:
                                        case 'end':
                                          return i.stop();
                                      }
                                  }, i);
                                }),
                              )();
                            },
                          };
                        }),
                        (i.pluginName = 'setterRegistry'),
                        (e.next = 25),
                        a.plugins.register(i)
                      );
                    case 25:
                      return (e.next = 27), a.plugins.register(_.Z);
                    case 27:
                      return (
                        (n = (e) => ({
                          name: 'loadAssetsSample',
                          init() {
                            return (0, c.Z)(
                              (0, o.Z)().mark(function t() {
                                var r;
                                return (0, o.Z)().wrap(function (t) {
                                  while (1)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        (r = e.skeleton),
                                          r.add({
                                            name: 'loadAssetsSample',
                                            area: 'topArea',
                                            type: 'Widget',
                                            props: {
                                              align: 'right',
                                              width: 80,
                                            },
                                            content: s().createElement(
                                              u.Button,
                                              { onClick: A },
                                              '\u5f02\u6b65\u52a0\u8f7d\u8d44\u6e90',
                                            ),
                                          });
                                      case 2:
                                      case 'end':
                                        return t.stop();
                                    }
                                }, t);
                              }),
                            )();
                          },
                        })),
                        (n.pluginName = 'loadAssetsSample'),
                        (e.next = 31),
                        a.plugins.register(n)
                      );
                    case 31:
                      return (
                        (p = (e) => ({
                          name: 'saveSample',
                          init() {
                            return (0, c.Z)(
                              (0, o.Z)().mark(function t() {
                                var r, i;
                                return (0, o.Z)().wrap(function (t) {
                                  while (1)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        (r = e.skeleton),
                                          (i = e.hotkey),
                                          r.add({
                                            name: 'saveSample',
                                            area: 'topArea',
                                            type: 'Widget',
                                            props: { align: 'right' },
                                            content: s().createElement(
                                              u.Button,
                                              { onClick: () => L() },
                                              '\u4fdd\u5b58\u5230\u672c\u5730',
                                            ),
                                          }),
                                          r.add({
                                            name: 'resetSchema',
                                            area: 'topArea',
                                            type: 'Widget',
                                            props: { align: 'right' },
                                            content: s().createElement(
                                              u.Button,
                                              { onClick: () => I() },
                                              '\u91cd\u7f6e\u9875\u9762',
                                            ),
                                          }),
                                          i.bind('command+s', (e) => {
                                            e.preventDefault(), L();
                                          });
                                      case 4:
                                      case 'end':
                                        return t.stop();
                                    }
                                }, t);
                              }),
                            )();
                          },
                        })),
                        (p.pluginName = 'saveSample'),
                        (e.next = 35),
                        a.plugins.register(p)
                      );
                    case 35:
                      return (
                        (S.Z.pluginName = 'DataSourcePane'),
                        (e.next = 38),
                        a.plugins.register(S.Z)
                      );
                    case 38:
                      return (
                        (g.Z.pluginName = 'CodeEditor'),
                        (e.next = 41),
                        a.plugins.register(g.Z)
                      );
                    case 41:
                      return (
                        (d.Z.pluginName = 'CodeGenPlugin'),
                        (e.next = 44),
                        a.plugins.register(d.Z)
                      );
                    case 44:
                      return (
                        (E = (e) => ({
                          name: 'previewSample',
                          init() {
                            return (0, c.Z)(
                              (0, o.Z)().mark(function t() {
                                var r;
                                return (0, o.Z)().wrap(function (t) {
                                  while (1)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        (r = e.skeleton),
                                          r.add({
                                            name: 'previewSample',
                                            area: 'topArea',
                                            type: 'Widget',
                                            props: { align: 'right' },
                                            content: s().createElement(
                                              u.Button,
                                              {
                                                type: 'primary',
                                                onClick: () => O(),
                                              },
                                              '\u9884\u89c8',
                                            ),
                                          });
                                      case 2:
                                      case 'end':
                                        return t.stop();
                                    }
                                }, t);
                              }),
                            )();
                          },
                        })),
                        (E.pluginName = 'previewSample'),
                        (e.next = 48),
                        a.plugins.register(E)
                      );
                    case 48:
                      return (
                        (b = (e) => ({
                          name: '___registerCustomSetter___',
                          init() {
                            return (0, c.Z)(
                              (0, o.Z)().mark(function t() {
                                var r;
                                return (0, o.Z)().wrap(function (t) {
                                  while (1)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        (r = e.setters),
                                          r.registerSetter('TitleSetter', f.Z),
                                          r.registerSetter('BehaviorSetter', B),
                                          r.registerSetter('CustomSetter', M);
                                      case 4:
                                      case 'end':
                                        return t.stop();
                                    }
                                }, t);
                              }),
                            )();
                          },
                        })),
                        (b.pluginName = 'customSetter'),
                        (e.next = 52),
                        a.plugins.register(b)
                      );
                    case 52:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            }),
          )),
          Y.apply(this, arguments)
        );
      }
      J.pluginName = 'register-ref-prop';
      var Q = new Map(),
        X = a.common.skeletonCabin.Workbench;
      Q.set('DataSourcePane', {
        importPlugins: [],
        dataSourceTypes: [{ type: 'fetch' }, { type: 'jsonp' }],
      }),
        a.config.setConfig({
          enableCondition: !0,
          enableCanvasLock: !0,
          supportVariableGlobally: !0,
          simulatorUrl: [
            'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/css/react-simulator-renderer.css',
            'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/js/react-simulator-renderer.js',
          ],
        });
      var $ = () => {
          var e = (0, n.useState)(!1),
            t = (0, i.Z)(e, 2),
            r = t[0],
            o = t[1];
          return (
            (0, n.useEffect)(
              () => (
                a.plugins
                  .init(Q)
                  .then(() => {
                    o(!0);
                  })
                  .catch((e) => console.error(e)),
                () => {
                  a.plugins.destroy();
                }
              ),
              [],
            ),
            r ? s().createElement(X, null) : s().createElement('div', null)
          );
        },
        ee = $;
      function te() {
        var e = (0, n.useState)(!1),
          t = (0, i.Z)(e, 2),
          r = t[0],
          o = t[1];
        return (
          (0, n.useEffect)(
            () => (
              z()
                .then(() => {
                  o(!0);
                })
                .catch((e) => console.error(e)),
              () => {
                a.plugins.dispose().then(() => {
                  console.info('plugins destroy success');
                });
              }
            ),
            [],
          ),
          s().createElement('div', null, r && s().createElement(ee, null))
        );
      }
      var re = te;
    },
    75544: function (e, t, r) {
      var i = {
        './Binary_Property/ASCII.js': 38090,
        './Binary_Property/ASCII_Hex_Digit.js': 39666,
        './Binary_Property/Alphabetic.js': 81319,
        './Binary_Property/Any.js': 37402,
        './Binary_Property/Assigned.js': 93512,
        './Binary_Property/Bidi_Control.js': 82230,
        './Binary_Property/Bidi_Mirrored.js': 28794,
        './Binary_Property/Case_Ignorable.js': 86154,
        './Binary_Property/Cased.js': 10457,
        './Binary_Property/Changes_When_Casefolded.js': 16177,
        './Binary_Property/Changes_When_Casemapped.js': 16211,
        './Binary_Property/Changes_When_Lowercased.js': 74709,
        './Binary_Property/Changes_When_NFKC_Casefolded.js': 93332,
        './Binary_Property/Changes_When_Titlecased.js': 15979,
        './Binary_Property/Changes_When_Uppercased.js': 61638,
        './Binary_Property/Dash.js': 64152,
        './Binary_Property/Default_Ignorable_Code_Point.js': 24447,
        './Binary_Property/Deprecated.js': 71748,
        './Binary_Property/Diacritic.js': 28490,
        './Binary_Property/Emoji.js': 99782,
        './Binary_Property/Emoji_Component.js': 92514,
        './Binary_Property/Emoji_Modifier.js': 94210,
        './Binary_Property/Emoji_Modifier_Base.js': 27696,
        './Binary_Property/Emoji_Presentation.js': 13653,
        './Binary_Property/Extended_Pictographic.js': 51733,
        './Binary_Property/Extender.js': 73921,
        './Binary_Property/Grapheme_Base.js': 80164,
        './Binary_Property/Grapheme_Extend.js': 36218,
        './Binary_Property/Hex_Digit.js': 1903,
        './Binary_Property/IDS_Binary_Operator.js': 76639,
        './Binary_Property/IDS_Trinary_Operator.js': 56591,
        './Binary_Property/ID_Continue.js': 39363,
        './Binary_Property/ID_Start.js': 49367,
        './Binary_Property/Ideographic.js': 17949,
        './Binary_Property/Join_Control.js': 12087,
        './Binary_Property/Logical_Order_Exception.js': 22193,
        './Binary_Property/Lowercase.js': 56792,
        './Binary_Property/Math.js': 66975,
        './Binary_Property/Noncharacter_Code_Point.js': 44175,
        './Binary_Property/Pattern_Syntax.js': 95049,
        './Binary_Property/Pattern_White_Space.js': 55149,
        './Binary_Property/Quotation_Mark.js': 22306,
        './Binary_Property/Radical.js': 23349,
        './Binary_Property/Regional_Indicator.js': 80869,
        './Binary_Property/Sentence_Terminal.js': 92382,
        './Binary_Property/Soft_Dotted.js': 26847,
        './Binary_Property/Terminal_Punctuation.js': 96898,
        './Binary_Property/Unified_Ideograph.js': 44138,
        './Binary_Property/Uppercase.js': 36751,
        './Binary_Property/Variation_Selector.js': 60676,
        './Binary_Property/White_Space.js': 78778,
        './Binary_Property/XID_Continue.js': 73598,
        './Binary_Property/XID_Start.js': 85242,
        './General_Category/Cased_Letter.js': 92313,
        './General_Category/Close_Punctuation.js': 71119,
        './General_Category/Connector_Punctuation.js': 69777,
        './General_Category/Control.js': 63184,
        './General_Category/Currency_Symbol.js': 42990,
        './General_Category/Dash_Punctuation.js': 77186,
        './General_Category/Decimal_Number.js': 42071,
        './General_Category/Enclosing_Mark.js': 90091,
        './General_Category/Final_Punctuation.js': 15454,
        './General_Category/Format.js': 70307,
        './General_Category/Initial_Punctuation.js': 96204,
        './General_Category/Letter.js': 67940,
        './General_Category/Letter_Number.js': 3008,
        './General_Category/Line_Separator.js': 23708,
        './General_Category/Lowercase_Letter.js': 58103,
        './General_Category/Mark.js': 46146,
        './General_Category/Math_Symbol.js': 24682,
        './General_Category/Modifier_Letter.js': 80557,
        './General_Category/Modifier_Symbol.js': 23409,
        './General_Category/Nonspacing_Mark.js': 6018,
        './General_Category/Number.js': 27782,
        './General_Category/Open_Punctuation.js': 18815,
        './General_Category/Other.js': 77982,
        './General_Category/Other_Letter.js': 64621,
        './General_Category/Other_Number.js': 28467,
        './General_Category/Other_Punctuation.js': 84376,
        './General_Category/Other_Symbol.js': 45621,
        './General_Category/Paragraph_Separator.js': 74877,
        './General_Category/Private_Use.js': 16811,
        './General_Category/Punctuation.js': 61985,
        './General_Category/Separator.js': 10661,
        './General_Category/Space_Separator.js': 19599,
        './General_Category/Spacing_Mark.js': 27288,
        './General_Category/Surrogate.js': 22508,
        './General_Category/Symbol.js': 8884,
        './General_Category/Titlecase_Letter.js': 52991,
        './General_Category/Unassigned.js': 46770,
        './General_Category/Uppercase_Letter.js': 97113,
        './Property_of_Strings/Basic_Emoji.js': 12372,
        './Property_of_Strings/Emoji_Keycap_Sequence.js': 97978,
        './Property_of_Strings/RGI_Emoji.js': 68900,
        './Property_of_Strings/RGI_Emoji_Flag_Sequence.js': 5647,
        './Property_of_Strings/RGI_Emoji_Modifier_Sequence.js': 25794,
        './Property_of_Strings/RGI_Emoji_Tag_Sequence.js': 37856,
        './Property_of_Strings/RGI_Emoji_ZWJ_Sequence.js': 56263,
        './Script/Adlam.js': 46294,
        './Script/Ahom.js': 93733,
        './Script/Anatolian_Hieroglyphs.js': 23786,
        './Script/Arabic.js': 89139,
        './Script/Armenian.js': 19871,
        './Script/Avestan.js': 62033,
        './Script/Balinese.js': 8902,
        './Script/Bamum.js': 16701,
        './Script/Bassa_Vah.js': 46341,
        './Script/Batak.js': 88893,
        './Script/Bengali.js': 86571,
        './Script/Bhaiksuki.js': 12228,
        './Script/Bopomofo.js': 17220,
        './Script/Brahmi.js': 56236,
        './Script/Braille.js': 35863,
        './Script/Buginese.js': 84652,
        './Script/Buhid.js': 4392,
        './Script/Canadian_Aboriginal.js': 4411,
        './Script/Carian.js': 26764,
        './Script/Caucasian_Albanian.js': 35662,
        './Script/Chakma.js': 29379,
        './Script/Cham.js': 40696,
        './Script/Cherokee.js': 14562,
        './Script/Chorasmian.js': 88466,
        './Script/Common.js': 84941,
        './Script/Coptic.js': 11759,
        './Script/Cuneiform.js': 2885,
        './Script/Cypriot.js': 43571,
        './Script/Cypro_Minoan.js': 95924,
        './Script/Cyrillic.js': 92680,
        './Script/Deseret.js': 85161,
        './Script/Devanagari.js': 87106,
        './Script/Dives_Akuru.js': 29403,
        './Script/Dogra.js': 79035,
        './Script/Duployan.js': 22782,
        './Script/Egyptian_Hieroglyphs.js': 57722,
        './Script/Elbasan.js': 70076,
        './Script/Elymaic.js': 68624,
        './Script/Ethiopic.js': 21742,
        './Script/Georgian.js': 23036,
        './Script/Glagolitic.js': 71852,
        './Script/Gothic.js': 35522,
        './Script/Grantha.js': 82325,
        './Script/Greek.js': 90686,
        './Script/Gujarati.js': 25927,
        './Script/Gunjala_Gondi.js': 84153,
        './Script/Gurmukhi.js': 77123,
        './Script/Han.js': 68761,
        './Script/Hangul.js': 5756,
        './Script/Hanifi_Rohingya.js': 90251,
        './Script/Hanunoo.js': 95998,
        './Script/Hatran.js': 29916,
        './Script/Hebrew.js': 65115,
        './Script/Hiragana.js': 8267,
        './Script/Imperial_Aramaic.js': 59032,
        './Script/Inherited.js': 80710,
        './Script/Inscriptional_Pahlavi.js': 58843,
        './Script/Inscriptional_Parthian.js': 57339,
        './Script/Javanese.js': 8415,
        './Script/Kaithi.js': 44865,
        './Script/Kannada.js': 72388,
        './Script/Katakana.js': 65395,
        './Script/Kawi.js': 97698,
        './Script/Kayah_Li.js': 97517,
        './Script/Kharoshthi.js': 51541,
        './Script/Khitan_Small_Script.js': 66437,
        './Script/Khmer.js': 38290,
        './Script/Khojki.js': 57011,
        './Script/Khudawadi.js': 12058,
        './Script/Lao.js': 61116,
        './Script/Latin.js': 89428,
        './Script/Lepcha.js': 66980,
        './Script/Limbu.js': 2954,
        './Script/Linear_A.js': 84059,
        './Script/Linear_B.js': 41106,
        './Script/Lisu.js': 21233,
        './Script/Lycian.js': 29868,
        './Script/Lydian.js': 92804,
        './Script/Mahajani.js': 44059,
        './Script/Makasar.js': 87449,
        './Script/Malayalam.js': 47224,
        './Script/Mandaic.js': 58807,
        './Script/Manichaean.js': 78897,
        './Script/Marchen.js': 27432,
        './Script/Masaram_Gondi.js': 80403,
        './Script/Medefaidrin.js': 85078,
        './Script/Meetei_Mayek.js': 38697,
        './Script/Mende_Kikakui.js': 94218,
        './Script/Meroitic_Cursive.js': 93869,
        './Script/Meroitic_Hieroglyphs.js': 49776,
        './Script/Miao.js': 49897,
        './Script/Modi.js': 65714,
        './Script/Mongolian.js': 21652,
        './Script/Mro.js': 7741,
        './Script/Multani.js': 52068,
        './Script/Myanmar.js': 74218,
        './Script/Nabataean.js': 31440,
        './Script/Nag_Mundari.js': 17677,
        './Script/Nandinagari.js': 16036,
        './Script/New_Tai_Lue.js': 3274,
        './Script/Newa.js': 75150,
        './Script/Nko.js': 98453,
        './Script/Nushu.js': 76621,
        './Script/Nyiakeng_Puachue_Hmong.js': 35659,
        './Script/Ogham.js': 65613,
        './Script/Ol_Chiki.js': 48263,
        './Script/Old_Hungarian.js': 36347,
        './Script/Old_Italic.js': 93175,
        './Script/Old_North_Arabian.js': 7548,
        './Script/Old_Permic.js': 81592,
        './Script/Old_Persian.js': 58990,
        './Script/Old_Sogdian.js': 8513,
        './Script/Old_South_Arabian.js': 88438,
        './Script/Old_Turkic.js': 93991,
        './Script/Old_Uyghur.js': 87428,
        './Script/Oriya.js': 60241,
        './Script/Osage.js': 70358,
        './Script/Osmanya.js': 62432,
        './Script/Pahawh_Hmong.js': 45467,
        './Script/Palmyrene.js': 42922,
        './Script/Pau_Cin_Hau.js': 94381,
        './Script/Phags_Pa.js': 49134,
        './Script/Phoenician.js': 31430,
        './Script/Psalter_Pahlavi.js': 71180,
        './Script/Rejang.js': 33880,
        './Script/Runic.js': 978,
        './Script/Samaritan.js': 14612,
        './Script/Saurashtra.js': 47019,
        './Script/Sharada.js': 30179,
        './Script/Shavian.js': 85926,
        './Script/Siddham.js': 7507,
        './Script/SignWriting.js': 26026,
        './Script/Sinhala.js': 84167,
        './Script/Sogdian.js': 3389,
        './Script/Sora_Sompeng.js': 42352,
        './Script/Soyombo.js': 19808,
        './Script/Sundanese.js': 91237,
        './Script/Syloti_Nagri.js': 34583,
        './Script/Syriac.js': 53357,
        './Script/Tagalog.js': 13381,
        './Script/Tagbanwa.js': 76515,
        './Script/Tai_Le.js': 2335,
        './Script/Tai_Tham.js': 97986,
        './Script/Tai_Viet.js': 79274,
        './Script/Takri.js': 76569,
        './Script/Tamil.js': 32409,
        './Script/Tangsa.js': 6339,
        './Script/Tangut.js': 51667,
        './Script/Telugu.js': 33064,
        './Script/Thaana.js': 338,
        './Script/Thai.js': 72014,
        './Script/Tibetan.js': 60015,
        './Script/Tifinagh.js': 91825,
        './Script/Tirhuta.js': 64585,
        './Script/Toto.js': 54200,
        './Script/Ugaritic.js': 19794,
        './Script/Vai.js': 99940,
        './Script/Vithkuqi.js': 22679,
        './Script/Wancho.js': 47450,
        './Script/Warang_Citi.js': 6230,
        './Script/Yezidi.js': 63831,
        './Script/Yi.js': 65414,
        './Script/Zanabazar_Square.js': 75495,
        './Script_Extensions/Adlam.js': 92364,
        './Script_Extensions/Ahom.js': 38107,
        './Script_Extensions/Anatolian_Hieroglyphs.js': 1275,
        './Script_Extensions/Arabic.js': 50820,
        './Script_Extensions/Armenian.js': 30327,
        './Script_Extensions/Avestan.js': 14813,
        './Script_Extensions/Balinese.js': 59854,
        './Script_Extensions/Bamum.js': 88552,
        './Script_Extensions/Bassa_Vah.js': 80519,
        './Script_Extensions/Batak.js': 3690,
        './Script_Extensions/Bengali.js': 15522,
        './Script_Extensions/Bhaiksuki.js': 36100,
        './Script_Extensions/Bopomofo.js': 58041,
        './Script_Extensions/Brahmi.js': 18571,
        './Script_Extensions/Braille.js': 29636,
        './Script_Extensions/Buginese.js': 44674,
        './Script_Extensions/Buhid.js': 44321,
        './Script_Extensions/Canadian_Aboriginal.js': 3586,
        './Script_Extensions/Carian.js': 16971,
        './Script_Extensions/Caucasian_Albanian.js': 40370,
        './Script_Extensions/Chakma.js': 36999,
        './Script_Extensions/Cham.js': 5090,
        './Script_Extensions/Cherokee.js': 22025,
        './Script_Extensions/Chorasmian.js': 28903,
        './Script_Extensions/Common.js': 40819,
        './Script_Extensions/Coptic.js': 62879,
        './Script_Extensions/Cuneiform.js': 79338,
        './Script_Extensions/Cypriot.js': 26748,
        './Script_Extensions/Cypro_Minoan.js': 26136,
        './Script_Extensions/Cyrillic.js': 50403,
        './Script_Extensions/Deseret.js': 52117,
        './Script_Extensions/Devanagari.js': 44603,
        './Script_Extensions/Dives_Akuru.js': 59153,
        './Script_Extensions/Dogra.js': 88569,
        './Script_Extensions/Duployan.js': 35137,
        './Script_Extensions/Egyptian_Hieroglyphs.js': 70423,
        './Script_Extensions/Elbasan.js': 6604,
        './Script_Extensions/Elymaic.js': 22593,
        './Script_Extensions/Ethiopic.js': 58757,
        './Script_Extensions/Georgian.js': 8967,
        './Script_Extensions/Glagolitic.js': 94941,
        './Script_Extensions/Gothic.js': 73775,
        './Script_Extensions/Grantha.js': 7716,
        './Script_Extensions/Greek.js': 17167,
        './Script_Extensions/Gujarati.js': 35653,
        './Script_Extensions/Gunjala_Gondi.js': 9920,
        './Script_Extensions/Gurmukhi.js': 12512,
        './Script_Extensions/Han.js': 66719,
        './Script_Extensions/Hangul.js': 57992,
        './Script_Extensions/Hanifi_Rohingya.js': 12282,
        './Script_Extensions/Hanunoo.js': 32154,
        './Script_Extensions/Hatran.js': 10593,
        './Script_Extensions/Hebrew.js': 12674,
        './Script_Extensions/Hiragana.js': 89815,
        './Script_Extensions/Imperial_Aramaic.js': 88427,
        './Script_Extensions/Inherited.js': 30846,
        './Script_Extensions/Inscriptional_Pahlavi.js': 36626,
        './Script_Extensions/Inscriptional_Parthian.js': 36558,
        './Script_Extensions/Javanese.js': 12010,
        './Script_Extensions/Kaithi.js': 44452,
        './Script_Extensions/Kannada.js': 33992,
        './Script_Extensions/Katakana.js': 32728,
        './Script_Extensions/Kawi.js': 75654,
        './Script_Extensions/Kayah_Li.js': 39203,
        './Script_Extensions/Kharoshthi.js': 21656,
        './Script_Extensions/Khitan_Small_Script.js': 5454,
        './Script_Extensions/Khmer.js': 31171,
        './Script_Extensions/Khojki.js': 35022,
        './Script_Extensions/Khudawadi.js': 32185,
        './Script_Extensions/Lao.js': 43762,
        './Script_Extensions/Latin.js': 10187,
        './Script_Extensions/Lepcha.js': 46259,
        './Script_Extensions/Limbu.js': 98553,
        './Script_Extensions/Linear_A.js': 29036,
        './Script_Extensions/Linear_B.js': 36831,
        './Script_Extensions/Lisu.js': 33554,
        './Script_Extensions/Lycian.js': 15074,
        './Script_Extensions/Lydian.js': 97130,
        './Script_Extensions/Mahajani.js': 13515,
        './Script_Extensions/Makasar.js': 87798,
        './Script_Extensions/Malayalam.js': 81475,
        './Script_Extensions/Mandaic.js': 75053,
        './Script_Extensions/Manichaean.js': 989,
        './Script_Extensions/Marchen.js': 18814,
        './Script_Extensions/Masaram_Gondi.js': 33286,
        './Script_Extensions/Medefaidrin.js': 74369,
        './Script_Extensions/Meetei_Mayek.js': 46454,
        './Script_Extensions/Mende_Kikakui.js': 56420,
        './Script_Extensions/Meroitic_Cursive.js': 75131,
        './Script_Extensions/Meroitic_Hieroglyphs.js': 81593,
        './Script_Extensions/Miao.js': 14780,
        './Script_Extensions/Modi.js': 80382,
        './Script_Extensions/Mongolian.js': 30388,
        './Script_Extensions/Mro.js': 86560,
        './Script_Extensions/Multani.js': 38214,
        './Script_Extensions/Myanmar.js': 54677,
        './Script_Extensions/Nabataean.js': 54860,
        './Script_Extensions/Nag_Mundari.js': 66158,
        './Script_Extensions/Nandinagari.js': 16379,
        './Script_Extensions/New_Tai_Lue.js': 96164,
        './Script_Extensions/Newa.js': 6225,
        './Script_Extensions/Nko.js': 44127,
        './Script_Extensions/Nushu.js': 40676,
        './Script_Extensions/Nyiakeng_Puachue_Hmong.js': 65280,
        './Script_Extensions/Ogham.js': 38227,
        './Script_Extensions/Ol_Chiki.js': 33642,
        './Script_Extensions/Old_Hungarian.js': 7997,
        './Script_Extensions/Old_Italic.js': 33496,
        './Script_Extensions/Old_North_Arabian.js': 13284,
        './Script_Extensions/Old_Permic.js': 72430,
        './Script_Extensions/Old_Persian.js': 36073,
        './Script_Extensions/Old_Sogdian.js': 65673,
        './Script_Extensions/Old_South_Arabian.js': 69136,
        './Script_Extensions/Old_Turkic.js': 50710,
        './Script_Extensions/Old_Uyghur.js': 20390,
        './Script_Extensions/Oriya.js': 38245,
        './Script_Extensions/Osage.js': 43797,
        './Script_Extensions/Osmanya.js': 40922,
        './Script_Extensions/Pahawh_Hmong.js': 21408,
        './Script_Extensions/Palmyrene.js': 61506,
        './Script_Extensions/Pau_Cin_Hau.js': 60461,
        './Script_Extensions/Phags_Pa.js': 49729,
        './Script_Extensions/Phoenician.js': 90759,
        './Script_Extensions/Psalter_Pahlavi.js': 28486,
        './Script_Extensions/Rejang.js': 25184,
        './Script_Extensions/Runic.js': 95225,
        './Script_Extensions/Samaritan.js': 15237,
        './Script_Extensions/Saurashtra.js': 74809,
        './Script_Extensions/Sharada.js': 24574,
        './Script_Extensions/Shavian.js': 32839,
        './Script_Extensions/Siddham.js': 71259,
        './Script_Extensions/SignWriting.js': 9128,
        './Script_Extensions/Sinhala.js': 99273,
        './Script_Extensions/Sogdian.js': 64176,
        './Script_Extensions/Sora_Sompeng.js': 10387,
        './Script_Extensions/Soyombo.js': 89861,
        './Script_Extensions/Sundanese.js': 65419,
        './Script_Extensions/Syloti_Nagri.js': 3755,
        './Script_Extensions/Syriac.js': 60926,
        './Script_Extensions/Tagalog.js': 53956,
        './Script_Extensions/Tagbanwa.js': 34519,
        './Script_Extensions/Tai_Le.js': 75031,
        './Script_Extensions/Tai_Tham.js': 95315,
        './Script_Extensions/Tai_Viet.js': 14989,
        './Script_Extensions/Takri.js': 2861,
        './Script_Extensions/Tamil.js': 90476,
        './Script_Extensions/Tangsa.js': 4700,
        './Script_Extensions/Tangut.js': 77787,
        './Script_Extensions/Telugu.js': 16910,
        './Script_Extensions/Thaana.js': 67282,
        './Script_Extensions/Thai.js': 15202,
        './Script_Extensions/Tibetan.js': 46225,
        './Script_Extensions/Tifinagh.js': 45821,
        './Script_Extensions/Tirhuta.js': 93573,
        './Script_Extensions/Toto.js': 2274,
        './Script_Extensions/Ugaritic.js': 88375,
        './Script_Extensions/Vai.js': 84505,
        './Script_Extensions/Vithkuqi.js': 52931,
        './Script_Extensions/Wancho.js': 57047,
        './Script_Extensions/Warang_Citi.js': 212,
        './Script_Extensions/Yezidi.js': 56479,
        './Script_Extensions/Yi.js': 55384,
        './Script_Extensions/Zanabazar_Square.js': 27041,
        './index.js': 81519,
        './unicode-version.js': 13554,
      };
      function n(e) {
        var t = s(e);
        return r(t);
      }
      function s(e) {
        if (!r.o(i, e)) {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = 'MODULE_NOT_FOUND'), t);
        }
        return i[e];
      }
      (n.keys = function () {
        return Object.keys(i);
      }),
        (n.resolve = s),
        (e.exports = n),
        (n.id = 75544);
    },
    59330: function () {},
    72950: function () {},
    54882: function () {},
  },
]);
