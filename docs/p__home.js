(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4364],
  {
    76673: function (e) {
      e.exports = {
        homeWrap: 'homeWrap___1x0xg',
        leftArea: 'leftArea___yEWq3',
        contentArea: 'contentArea___Z3usC',
        logoTip: 'logoTip___-J2aA',
        logo: 'logo___3WCnj',
        logoText: 'logoText___258Ah',
        operation: 'operation___2Pxiq',
        card: 'card___8Db4b',
        footer: 'footer___2nQkL',
        'steps-action': 'steps-action___ADAGo',
      };
    },
    64842: function (e, t, n) {
      'use strict';
      n.r(t);
      var l,
        a = n(91896),
        r = (n(12968), n(6122)),
        m = n(93224),
        c = (n(402), n(55672)),
        i = n(20310),
        o = n(12924),
        s = n.n(o),
        E = n(12788),
        g = n(49504),
        p = n.n(g),
        A = ['isTpl'],
        d = ['textAlign', 'text', 'fontSize', 'color', 'lineHeight'],
        u = (0, E.ZP)(c.Z.Text)(
          l ||
            (l = (0, i.Z)([
              '\n  color: ',
              ';\n  text-align: ',
              ';\n  font-size: ',
              ';\n  line-height: ',
              ';\n',
            ])),
          (e) => e.$color,
          (e) => e.$textAlign,
          (e) => e.$fontSize,
          (e) => e.$lineHeight,
        ),
        Z = (e) => {
          var t = e.isTpl,
            n = (0, m.Z)(e, A),
            l = n.textAlign,
            c = n.text,
            i = n.fontSize,
            o = n.color,
            E = n.lineHeight,
            g = (0, m.Z)(n, d);
          return s().createElement(
            s().Fragment,
            null,
            t
              ? s().createElement(
                  'div',
                  null,
                  s().createElement(r.Z, { src: p(), alt: '' }),
                )
              : s().createElement(
                  u,
                  (0, a.Z)(
                    { $color: o, $lineHeight: E, $fontSize: i, $textAlign: l },
                    g,
                  ),
                  c,
                ),
          );
        };
      t['default'] = (0, o.memo)(Z);
    },
    736: function (e, t, n) {
      'use strict';
      n.r(t);
      var l = n(93224),
        a = n(12924),
        r = n.n(a),
        m = n(1959),
        c = n.n(m),
        i = n(76763),
        o = n(44165),
        s = ['isTpl'],
        E = (e) => {
          var t = e.isTpl,
            n = (0, l.Z)(e, s),
            a = n.defaultValue,
            m = n.total,
            E = n.color,
            g = n.disabled,
            p = n.indicating,
            A = n.inverted,
            d = n.label,
            u = n.progress,
            Z = n.size,
            h = n.error,
            x = n.success,
            b = n.warning;
          return r().createElement(
            r().Fragment,
            null,
            t && r().createElement(i.Z, { src: c(), alt: 'Progress' }),
            !t &&
              r().createElement(
                'div',
                null,
                r().createElement(o.Z, {
                  percent: a,
                  value: a,
                  total: m,
                  indicating: p,
                  color: E,
                  disabled: g,
                  inverted: A,
                  label: d,
                  progress: u,
                  size: Z,
                  error: h,
                  success: x,
                  warning: b,
                }),
              ),
          );
        };
      t['default'] = E;
    },
    70182: function (e, t, n) {
      'use strict';
      n(48736);
      var l,
        a,
        r,
        m,
        c = n(27049),
        i = n(20310),
        o = n(12924),
        s = n.n(o),
        E = n(12788),
        g = n(48237),
        p = n(14309),
        A = n(76763),
        d = n(39445),
        u = n(20995),
        Z = n.n(u),
        h = E.ZP.footer(
          l ||
            (l = (0, i.Z)(['\n  margin-top: 9em;\n  margin-bottom: 20px;\n'])),
        ),
        x = E.ZP.p(
          a ||
            (a = (0, i.Z)([
              '\n  color: black;\n  opacity: 0.6;\n  font-size: 15px;\n  margin-top: 2em;\n  margin-bottom: 2em;\n',
            ])),
        ),
        b = E.ZP.p(
          r ||
            (r = (0, i.Z)([
              '\n  color: black;\n  opacity: 0.6;\n  font-size: 15px;\n',
            ])),
        ),
        v = (0, E.ZP)(g.Z)(
          m || (m = (0, i.Z)(['\n  margin-right: 1em !important;\n'])),
        ),
        w = (e) =>
          s().createElement(
            s().Fragment,
            null,
            s().createElement(
              h,
              null,
              s().createElement(
                p.Z,
                null,
                s().createElement(
                  p.Z.Column,
                  { width: 5 },
                  s().createElement(
                    'div',
                    { style: { paddingLeft: '6em' } },
                    s().createElement(
                      'div',
                      { style: { display: 'flex' } },
                      s().createElement(A.Z, { size: 'mini', src: Z() }),
                      s().createElement(
                        'p',
                        {
                          style: {
                            fontSize: '20px',
                            fontWeight: '500',
                            marginTop: '0.2em',
                            marginLeft: '1em',
                          },
                        },
                        'Ink',
                      ),
                    ),
                    s().createElement(
                      x,
                      null,
                      'Ink \u4f4e\u4ee3\u7801\u6574\u5408\u5e73\u53f0',
                      s().createElement('br', null),
                      '\u4f7f\u7528\u81ea\u7814\u5f15\u64ce\u3001Lowcode-Engine\u3001AntV',
                      s().createElement('br', null),
                      '\u81f4\u529b\u4e8e\u5e26\u7ed9\u4f60\u6700\u597d\u7684\u4f4e\u4ee3\u7801\u4f53\u9a8c',
                    ),
                    s().createElement(v, {
                      size: 'mini',
                      circular: !0,
                      color: 'facebook',
                      icon: 'facebook',
                    }),
                    s().createElement(v, {
                      size: 'mini',
                      circular: !0,
                      color: 'twitter',
                      icon: 'twitter',
                    }),
                    s().createElement(v, {
                      size: 'mini',
                      circular: !0,
                      color: 'linkedin',
                      icon: 'linkedin',
                    }),
                    s().createElement(v, {
                      size: 'mini',
                      circular: !0,
                      color: 'google plus',
                      icon: 'google plus',
                    }),
                  ),
                ),
                s().createElement(
                  p.Z.Column,
                  { width: 2 },
                  s().createElement(d.Z, { as: 'h4' }, '\u56e2\u961f'),
                  s().createElement(b, null, '\u5173\u4e8e'),
                  s().createElement(b, null, '\u751f\u547d\u5468\u671f'),
                  s().createElement(b, null, '\u53c2\u8003'),
                ),
                s().createElement(
                  p.Z.Column,
                  { width: 3 },
                  s().createElement(d.Z, { as: 'h4' }, '\u4ea7\u54c1'),
                  s().createElement(
                    b,
                    null,
                    'H5 \u539f\u751f\u4f4e\u4ee3\u7801\u7f16\u8f91\u5668',
                  ),
                  s().createElement(
                    b,
                    null,
                    'LoeCode-Engine\u4f4e\u4ee3\u7801\u7f16\u8f91\u5668',
                  ),
                  s().createElement(
                    b,
                    null,
                    '\u539f\u751f\u6a21\u677f\u7f16\u8f91\u5668',
                  ),
                  s().createElement(
                    b,
                    null,
                    'AntV\u53ef\u89c6\u5316\u6d41\u7a0b\u56fe\u7f16\u8f91\u5668',
                  ),
                ),
                s().createElement(
                  p.Z.Column,
                  { width: 3 },
                  s().createElement(d.Z, { as: 'h4' }, '\u8d44\u6e90'),
                  s().createElement(
                    b,
                    null,
                    'UI \u6846\u67b6\u8bbe\u8ba1\u7a3f',
                  ),
                  s().createElement(b, null, 'Figma \u8bbe\u8ba1\u8d44\u6e90'),
                  s().createElement(b, null, 'Ink \u8bbe\u8ba1\u7a3f'),
                  s().createElement(b, null, '\u63d2\u4ef6\u8bbe\u8ba1\u7a3f'),
                ),
                s().createElement(
                  p.Z.Column,
                  { width: 3 },
                  s().createElement(d.Z, { as: 'h4' }, '\u66f4\u591a'),
                  s().createElement(b, null, '\u8054\u7cfb\u6211\u4eec'),
                  s().createElement(b, null, 'GitHub'),
                  s().createElement(b, null, 'Gitee'),
                ),
              ),
              s().createElement(c.Z, { style: { marginTop: '7em' } }),
              s().createElement(
                p.Z,
                null,
                s().createElement(
                  p.Z.Column,
                  { width: 4 },
                  s().createElement(
                    b,
                    { style: { textAlign: 'right' } },
                    'Ink \u5f00\u53d1\u56e2\u961f',
                  ),
                ),
                s().createElement(
                  p.Z.Column,
                  { width: 8 },
                  s().createElement(
                    b,
                    { style: { textAlign: 'center' } },
                    '\u4eac\u6d77\u5efa\u5de5\u96c6\u56e2',
                  ),
                ),
                s().createElement(
                  p.Z.Column,
                  { width: 4 },
                  s().createElement(b, null, '2023.04.04'),
                ),
              ),
            ),
          );
      t['Z'] = w;
    },
    1234: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return ln;
          },
        });
      n(35556);
      var l,
        a,
        r,
        m,
        c,
        i,
        o,
        s,
        E = n(75899),
        g = (n(48736), n(27049)),
        p = (n(57663), n(71577)),
        A = (n(402), n(55672)),
        d = (n(30887), n(28682)),
        u = n(2824),
        Z = n(20310),
        h = n(12924),
        x = n.n(h),
        b = n(76673),
        v = n.n(b),
        w = n(71720),
        y = n(24616),
        C = n(52577),
        B = n(54977),
        f = n(22164),
        I = n(44251),
        k = n(5233),
        R = n(56022),
        U = n(78874),
        F = n(12788),
        L = (0, F.ZP)(A.Z.Title)(l || (l = (0, Z.Z)(['\n\n']))),
        Y = n(5405),
        P = (n(49111), n(19650)),
        D = n(8812),
        W = n(76763),
        M = n(27553),
        H = n.n(M),
        Q = n(11867),
        T = n.n(Q),
        V = n(71869),
        S = n.n(V),
        G = n(58741),
        j = n.n(G),
        z = n(93048),
        X = n.n(z),
        N = n(20995),
        O = n.n(N),
        q = (e) => {
          var t = e.ui,
            n = e.chooseUI,
            l = e.nextStep;
          return x().createElement(
            x().Fragment,
            null,
            x().createElement(
              P.Z,
              { size: 30 },
              x().createElement(
                'div',
                { className: v().operation, style: { paddingRight: '50px' } },
                x().createElement(
                  'div',
                  { onClick: () => n('antd'), style: { marginBottom: '15px' } },
                  x().createElement(
                    'div',
                    {
                      className: v().card,
                      style: { borderColor: 'antd' === t ? '#8db8ee' : '' },
                    },
                    x().createElement(
                      P.Z,
                      { className: 'ui-sys-space', size: 90, align: 'center' },
                      x().createElement(W.Z, { width: 48, src: T() }),
                      x().createElement(
                        'div',
                        { style: { margin: 0 } },
                        'Ant Design',
                        x().createElement(D.Z, {
                          style: { marginLeft: '20px' },
                        }),
                      ),
                    ),
                  ),
                ),
                x().createElement(
                  'div',
                  {
                    onClick: () => n('semantic'),
                    style: { marginBottom: '15px' },
                  },
                  x().createElement(
                    'div',
                    {
                      className: v().card,
                      style: { borderColor: 'semantic' === t ? '#8db8ee' : '' },
                    },
                    x().createElement(
                      P.Z,
                      { className: 'ui-sys-space', size: 90, align: 'center' },
                      x().createElement(W.Z, { width: 48, src: j() }),
                      x().createElement(
                        'div',
                        { style: { margin: 0 } },
                        'Semantic UI',
                        x().createElement(D.Z, {
                          style: { marginLeft: '20px' },
                        }),
                      ),
                    ),
                  ),
                ),
                x().createElement(
                  'div',
                  { onClick: () => n('lole'), style: { marginBottom: '15px' } },
                  x().createElement(
                    'div',
                    {
                      className: v().card,
                      style: { borderColor: 'lole' === t ? '#8db8ee' : '' },
                    },
                    x().createElement(
                      P.Z,
                      { className: 'ui-sys-space', size: 90, align: 'center' },
                      x().createElement(W.Z, { width: 48, src: O() }),
                      x().createElement(
                        'div',
                        { style: { margin: 0 } },
                        'Love Letter',
                        x().createElement(D.Z, {
                          style: { marginLeft: '20px' },
                        }),
                      ),
                    ),
                  ),
                ),
              ),
              x().createElement(
                'div',
                { className: 'ui-sys-card' },
                'antd' === t &&
                  x().createElement(
                    x().Fragment,
                    null,
                    x().createElement(W.Z, {
                      preview: !1,
                      src: H(),
                      alt: '',
                      width: 300,
                      height: 350,
                    }),
                    x().createElement(
                      A.Z.Paragraph,
                      { className: 'ui-sys-text' },
                      'Stacks is a production-ready library of stackable content blocks built in React Native',
                    ),
                  ),
                'semantic' === t &&
                  x().createElement(
                    x().Fragment,
                    null,
                    x().createElement(W.Z, {
                      preview: !1,
                      src: S(),
                      alt: '',
                      width: 300,
                      height: 350,
                    }),
                    x().createElement(
                      A.Z.Paragraph,
                      { className: 'ui-sys-text' },
                      'Stacks is a production-ready library of stackable content blocks built in React Native',
                    ),
                  ),
                'lole' === t &&
                  x().createElement(
                    x().Fragment,
                    null,
                    x().createElement(W.Z, {
                      preview: !1,
                      src: X(),
                      alt: '',
                      width: 300,
                      height: 350,
                    }),
                    x().createElement(
                      A.Z.Paragraph,
                      { className: 'ui-sys-text' },
                      'Stacks is a production-ready library of stackable content blocks built in React Native',
                    ),
                  ),
                x().createElement(
                  A.Z.Paragraph,
                  null,
                  x().createElement(
                    p.Z,
                    {
                      type: 'primary',
                      size: 'large',
                      style: { width: '120px', borderRadius: '20px' },
                      onClick: () => l(),
                    },
                    'Next',
                  ),
                ),
              ),
            ),
          );
        },
        K = q,
        J = (n(58024), n(91894)),
        _ = (0, F.ZP)(W.Z)(
          a ||
            (a = (0, Z.Z)([
              '\n  width: 240px !important;\n  height: 360px !important;\n  object-fit: cover !important;\n',
            ])),
        ),
        $ = (e) => {
          var t = e.template,
            n = e.chooseTemplate,
            l = e.prevStep,
            a = e.nextStep;
          return x().createElement(
            'div',
            null,
            x().createElement(
              'div',
              { className: v().operation },
              x().createElement(
                P.Z,
                { wrap: !0, size: 30 },
                x().createElement(
                  J.Z,
                  {
                    hoverable: !0,
                    style: {
                      width: 240,
                      borderColor: 'empty' === t ? '#8db8ee' : '',
                      margin: '5px',
                    },
                    cover: x().createElement(_, {
                      alt: 'example',
                      src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    }),
                    onClick: () => n('empty'),
                  },
                  x().createElement(J.Z.Meta, {
                    title: '\u7a7a\u767d',
                    description:
                      '\u4e0d\u9002\u7528\u4efb\u4f55\u6a21\u677f\uff0c\u76f4\u63a5\u901a\u8fc7UI\u6846\u67b6\u6784\u5efa\u7cfb\u7edf',
                  }),
                ),
                te.map((e, l) =>
                  x().createElement(
                    J.Z,
                    {
                      key: l,
                      hoverable: !0,
                      style: {
                        width: 240,
                        borderColor: 'test' === t ? '#8db8ee' : '',
                        margin: '5px',
                      },
                      cover: x().createElement(_, {
                        alt: e.description,
                        src: e.src,
                      }),
                      onClick: () => n(e.key),
                    },
                    x().createElement(J.Z.Meta, {
                      title: e.title,
                      description: e.description,
                    }),
                  ),
                ),
              ),
            ),
            x().createElement(
              A.Z.Paragraph,
              { style: { marginTop: '20px' } },
              x().createElement(
                p.Z,
                {
                  size: 'large',
                  style: {
                    width: '120px',
                    borderRadius: '20px',
                    marginRight: '30px',
                  },
                  onClick: () => l(),
                },
                'Previous',
              ),
              x().createElement(
                p.Z,
                {
                  type: 'primary',
                  size: 'large',
                  style: { width: '120px', borderRadius: '20px' },
                  onClick: () => a(),
                },
                'Next',
              ),
            ),
          );
        },
        ee = $,
        te = [
          {
            key: 'activity',
            title: '\u6d3b\u52a8\u6a21\u677f',
            description:
              '\u9002\u7528\u4e8e\u79fb\u52a8\u7aef\u4fc3\u9500\u6d3b\u52a8\u6216\u989d\u5916\u4fe1\u606f\u7684\u9875\u9762\u6a21\u677f',
            src: 'https://s1.ax1x.com/2023/04/11/ppOiEAs.png',
          },
          {
            key: 'text',
            title: '\u6587\u5b57\u6a21\u677f',
            description:
              '\u9002\u7528\u4e8e\u79fb\u52a8\u7aef\u6587\u5b57\u4ecb\u7ecd\u9875\u9762\u7684\u6a21\u677f',
            src: 'https://s1.ax1x.com/2023/04/11/ppOiQuF.jpg',
          },
          {
            key: 'wx_text',
            title: '\u5fae\u4fe1\u516c\u4f17\u53f7\u6a21\u677f',
            description:
              '\u9002\u7528\u4e8e\u5fae\u4fe1\u516c\u4f17\u53f7\u6587\u6848\u5c55\u793a\u7684\u6a21\u677f',
            src: 'https://s1.ax1x.com/2023/04/11/ppOi8E9.jpg',
          },
          {
            key: 'shop',
            title: '\u5546\u5e97\u9875\u9762\u6a21\u677f',
            description:
              '\u9002\u7528\u4e8e\u79fb\u52a8\u7aef\u7f51\u8d2d\u5546\u54c1\u5c55\u793a\u9875\u9762\u7684\u6a21\u677f',
            src: 'https://s1.ax1x.com/2023/04/11/ppOit9x.jpg',
          },
          {
            key: 'friend',
            title: '\u670b\u53cb\u5708\u6a21\u677f',
            description:
              '\u9002\u7528\u4e8e\u6784\u5efa\u79fb\u52a8\u7aef\u670b\u53cb\u5708\u7684\u6a21\u677f',
            src: 'https://s1.ax1x.com/2023/04/11/ppOiUgK.jpg',
          },
        ],
        ne = (e) => {
          var t = e.ui,
            n = e.template,
            l = e.done,
            a = e.prev;
          return x().createElement(
            'div',
            null,
            x().createElement(
              A.Z,
              null,
              x().createElement(
                A.Z.Paragraph,
                null,
                x().createElement(
                  A.Z.Text,
                  null,
                  'UI\u7cfb\u7edf:',
                  x().createElement(A.Z.Text, { code: !0 }, t),
                ),
              ),
              x().createElement(
                A.Z.Paragraph,
                null,
                x().createElement(
                  A.Z.Text,
                  null,
                  '\u6a21\u677f:',
                  x().createElement(A.Z.Text, { code: !0 }, n),
                ),
              ),
              x().createElement(
                A.Z.Paragraph,
                null,
                x().createElement(
                  A.Z.Text,
                  null,
                  '\u5e03\u5c40\u65b9\u5f0f:',
                  x().createElement(
                    A.Z.Text,
                    { code: !0 },
                    '\u9759\u6001\u5e03\u5c40',
                  ),
                ),
              ),
              x().createElement(
                A.Z.Paragraph,
                null,
                x().createElement(
                  A.Z.Text,
                  null,
                  '\u5e73\u53f0:',
                  x().createElement(
                    A.Z.Text,
                    { code: !0 },
                    '\u79fb\u52a8\u7aef',
                  ),
                ),
              ),
              x().createElement(
                A.Z.Paragraph,
                null,
                x().createElement(
                  A.Z.Text,
                  null,
                  '\u753b\u5e03\u5927\u5c0f:',
                  x().createElement(A.Z.Text, { code: !0 }, '375 * 684'),
                ),
              ),
            ),
            x().createElement(
              A.Z.Paragraph,
              null,
              x().createElement(
                p.Z,
                {
                  size: 'large',
                  style: {
                    width: '120px',
                    borderRadius: '20px',
                    marginTop: '50px',
                    marginRight: '30px',
                  },
                  onClick: () => a(),
                },
                'Previous',
              ),
              x().createElement(
                p.Z,
                {
                  type: 'primary',
                  size: 'large',
                  style: {
                    width: '120px',
                    borderRadius: '20px',
                    marginTop: '50px',
                  },
                  onClick: () => l(),
                },
                'Done',
              ),
            ),
          );
        },
        le = ne,
        ae = n(8870),
        re = n(73626),
        me = n(48237),
        ce = n(37406),
        ie = n(65382),
        oe = n(60345),
        se = n(14309),
        Ee = n(35766),
        ge = n(21173),
        pe = n.n(ge),
        Ae = (0, F.ZP)(re.Z.Header)(
          r || (r = (0, Z.Z)(['\n  margin-bottom: 16px !important;\n'])),
        ),
        de = (0, F.ZP)(re.Z.Header)(
          m || (m = (0, Z.Z)(['\n  margin-bottom: 8px !important;\n'])),
        ),
        ue = (0, F.ZP)(me.Z)(
          c || (c = (0, Z.Z)(['\n  border-radius: 1rem !important;\n'])),
        ),
        Ze = (0, F.ZP)(re.Z)(
          i ||
            (i = (0, Z.Z)([
              '\n  width: 330px !important;\n  margin: 10px !important;\n',
            ])),
        ),
        he = (0, F.ZP)(ce.Z)(
          o ||
            (o = (0, Z.Z)([
              '\n  margin-top: 15px !important;\n  margin-bottom: 10px !important;\n  & .ui.icon.input {\n    width: 30rem !important;\n  }\n  & .results.transition.visible {\n    width: 30rem !important;\n  }\n',
            ])),
        ),
        xe = (0, F.ZP)(me.Z)(
          s || (s = (0, Z.Z)(['\n  width: 47% !important;\n'])),
        ),
        be = [
          {
            type: 'lowcode',
            color: 'teal',
            image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
            title: 'Ant Design \u98ce\u683c\u6a21\u677f',
            description:
              '\u57fa\u4e8eAntd\u6846\u67b6\u7684H5\u9759\u6001\u5e03\u5c40\u4f4e\u4ee3\u7801\u6846\u67b6\uff0c\u5728antd\u7684\u57fa\u7840\u4e0a\u5c01\u88c530\u5957\u7ec4\u4ef6\uff0c\u5176\u98ce\u683c\u7b80\u7ea6\u5e72\u7ec3\uff0c\u9002\u5408\u4e8e\u7ba1\u7406\u7cfb\u7edf\u6784\u5efa',
            tags: ['Antd', 'H5', '\u9759\u6001\u5e03\u5c40'],
            msgs: [
              { name: 'edit', tags: 'React.js' },
              { name: 'user', tags: 'Anyone' },
            ],
            actionUrl: '',
            designUrl: '',
          },
          {
            type: 'lowcode',
            color: 'teal',
            image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
            title: 'Semantic UI \u98ce\u683c\u6a21\u677f',
            description:
              '\u5c01\u88c5Semantic UI\u4e2d26\u5957\u7cbe\u9009\u7ec4\u4ef6\uff0c\u805a\u7126\u4e8e\u793e\u4ea4\u4ee5\u53ca\u4ea4\u4e92\u7ec4\u4ef6\uff0c\u6dfb\u52a0\u4e86\u66f4\u591a\u7528\u6237\u4ea4\u4e92\u7684\u81ea\u5b9a\u4e49\u7ec4\u4ef6\uff0c\u9002\u7528\u4e8e\u5236\u4f5c\u793e\u4ea4App',
            tags: [
              'Semantic',
              'H5',
              '\u9759\u6001\u5e03\u5c40',
              '\u793e\u4ea4',
            ],
            msgs: [
              { name: 'edit', tags: 'React.js' },
              { name: 'user', tags: 'Anyone' },
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
              '\u4f7f\u7528\u963f\u91cc\u5f00\u6e90lowcode-engine\u4e3a\u6838\u5fc3\uff0c\u7f16\u5199\u89e3\u6790\u63d2\u4ef6\u4ee5\u53ca\u7269\u6599\uff0c\u6784\u5efa\u57fa\u4e8eFushion\u4ee5\u53caNext\u7684\u4f4e\u4ee3\u7801\u7f16\u8f91\u5668\uff0c\u9002\u7528\u4e8e\u7f16\u8f91PC\u7f51\u9875\u4ee5\u53ca\u6805\u683c\u5e03\u5c40\u5e94\u7528',
            tags: ['lowcode engine', '\u6805\u683c\u5e03\u5c40'],
            msgs: [
              { name: 'edit', tags: 'React.js' },
              { name: 'user', tags: 'Anyone' },
            ],
            actionUrl: '',
            designUrl: '',
          },
          {
            type: 'lowcode',
            color: 'teal',
            image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
            title: '\u6a21\u677f\u7f51\u9875\u6784\u5efa',
            description:
              '\u57fa\u4e8e\u63d0\u4f9b\u7684\u6a21\u677f\u7f51\u9875\uff0c\u901a\u8fc7\u62d3\u5c55\u4ee5\u53ca\u81ea\u5b9a\u4e49\u53c2\u6570\uff0c\u8f7b\u677e\u5b9e\u73b0\u52a8\u6548\u5b98\u7f51\u7684\u6784\u5efa',
            tags: ['template', '\u4f4e\u4ee3\u7801', '\u52a8\u6548'],
            msgs: [
              { name: 'edit', tags: 'React.js' },
              { name: 'user', tags: 'Anyone' },
            ],
            actionUrl: '',
            designUrl: '',
          },
          {
            type: 'lowcode',
            color: 'teal',
            image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
            title: 'AntV \u53ef\u89c6\u5316\u5f00\u53d1',
            description:
              '\u57fa\u4e8eAntV\uff0c\u4f7f\u7528json schema\u81ea\u5b9a\u4e49\u53ef\u89c6\u5316\u56fe\u6807\uff0c\u5b9e\u73b0\u5feb\u901f\u6784\u5efa\u53ef\u89c6\u5316\u5e94\u7528',
            tags: ['AntV', '\u53ef\u89c6\u5316', 'json'],
            msgs: [
              { name: 'edit', tags: 'React.js' },
              { name: 'user', tags: 'Anyone' },
            ],
            actionUrl: '',
            designUrl: '',
          },
          {
            type: 'ui',
            color: 'yellow',
            image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
            title: '\u5c01\u88c5\u7ec4\u4ef6\u5c55\u793a\u6587\u6863',
            description:
              '\u5bf9\u4e8c\u6b21\u5c01\u88c5\u7ec4\u4ef6\u8fdb\u884c\u5c55\u793a\uff0c\u8ba9\u7528\u6237\u53ef\u4ee5\u5feb\u901f\u9884\u89c8\u7ec4\u4ef6\u6548\u679c\u4ee5\u53ca\u6837\u5f0f',
            tags: ['Antd', 'Semantic', 'dumi'],
            msgs: [
              { name: 'edit', tags: 'dumi' },
              { name: 'user', tags: 'Anyone' },
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
              'Ink Engine\u81ea\u5e26\u7684\u9ed8\u8ba4\u6837\u5f0f\uff0c\u5f00\u7bb1\u5373\u7528\u7684\u6a31\u82b1\u98ce\u683cReact\u5143\u4ef6\u5e93\uff0c\u57fa\u4e8eReact Hook\u548cTypeScript\u6784\u9020\u3002',
            tags: ['UI\u6846\u67b6', 'TypeScript', 'React Hook'],
            msgs: [
              { name: 'edit', tags: 'dumi' },
              { name: 'user', tags: 'Anyone' },
            ],
            actionUrl: '',
            designUrl: '',
          },
          {
            type: 'doc',
            color: 'pink',
            image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
            title: '\u4f7f\u7528\u624b\u518c',
            description:
              'Ink Engine\u81ea\u5e26\u7684\u9ed8\u8ba4\u6837\u5f0f\uff0c\u5f00\u7bb1\u5373\u7528\u7684\u6a31\u82b1\u98ce\u683cReact\u5143\u4ef6\u5e93\uff0c\u57fa\u4e8eReact Hook\u548cTypeScript\u6784\u9020\u3002',
            tags: ['UI\u6846\u67b6', 'TypeScript', 'React Hook'],
            msgs: [
              { name: 'edit', tags: 'dumi' },
              { name: 'user', tags: 'Anyone' },
            ],
            actionUrl: '',
            designUrl: '',
          },
          {
            type: 'doc',
            color: 'pink',
            image: 'https://s1.ax1x.com/2023/06/28/pCdQA9x.png',
            title: '\u8bbe\u8ba1\u624b\u518c',
            description:
              'Ink Engine\u662f\u5f00\u6e90\u9879\u76ee\uff0c\u5c06\u63d0\u4f9b\u8bbe\u8ba1\u624b\u518c\u5bf9\u9879\u76ee\u4e2d\u90e8\u5206\u91cd\u70b9\u8fdb\u884c\u8bb2\u89e3\uff0c\u5e76\u4ee5dumi\u6587\u6863\u7684\u5f62\u5f0f\u5c55\u793a',
            tags: ['design', 'doc'],
            msgs: [
              { name: 'edit', tags: 'dumi' },
              { name: 'user', tags: 'Anyone' },
            ],
            actionUrl: '',
            designUrl: '',
          },
        ],
        ve = { loading: !1, results: [], value: '' };
      function we(e, t) {
        switch (t.type) {
          case 'CLEAN_QUERY':
            return ve;
          case 'START_SEARCH':
            return (0, ae.Z)(
              (0, ae.Z)({}, e),
              {},
              { loading: !0, value: t.query },
            );
          case 'FINISH_SEARCH':
            return (0, ae.Z)(
              (0, ae.Z)({}, e),
              {},
              { loading: !1, results: t.results },
            );
          case 'UPDATE_SELECTION':
            return (0, ae.Z)((0, ae.Z)({}, e), {}, { value: t.selection });
          default:
            throw new Error();
        }
      }
      var ye,
        Ce,
        Be,
        fe,
        Ie,
        ke,
        Re,
        Ue,
        Fe,
        Le,
        Ye,
        Pe,
        De,
        We,
        Me,
        He,
        Qe,
        Te,
        Ve,
        Se,
        Ge,
        je = (e) => {
          var t = (0, h.useState)(be),
            n = (0, u.Z)(t, 2),
            l = n[0],
            a = n[1],
            r = x().useReducer(we, ve),
            m = (0, u.Z)(r, 2),
            c = m[0],
            i = m[1],
            o = c.loading,
            s = c.results,
            E = c.value,
            g = x().useRef(),
            p = x().useCallback((e, t) => {
              clearTimeout(g.current),
                i({ type: 'START_SEARCH', query: t.value }),
                (g.current = setTimeout(() => {
                  if (0 === t.value.length)
                    return i({ type: 'CLEAN_QUERY' }), void a(be);
                  var e = new RegExp(pe().escapeRegExp(t.value), 'i'),
                    n = (t) => e.test(t.title);
                  a(pe().filter(be, n)),
                    i({ type: 'FINISH_SEARCH', results: pe().filter(be, n) });
                }, 300));
            }, []);
          x().useEffect(
            () => () => {
              clearTimeout(g.current);
            },
            [],
          );
          var d = (e) =>
              x().createElement(
                x().Fragment,
                null,
                e.map((e) =>
                  x().createElement(ue, { size: 'small', compact: !0 }, e),
                ),
              ),
            Z = (e) =>
              x().createElement(
                x().Fragment,
                null,
                e.map((e) =>
                  x().createElement(
                    x().Fragment,
                    null,
                    x().createElement(ie.Z, { name: e.name }),
                    x().createElement(
                      'span',
                      {
                        style: { marginRight: '10px', color: 'rgba(0,0,0,.4)' },
                      },
                      e.tags,
                    ),
                  ),
                ),
              );
          return x().createElement(
            x().Fragment,
            null,
            x().createElement(
              'div',
              { style: { width: '100%', marginTop: '25px' } },
              x().createElement(
                A.Z.Title,
                { level: 3 },
                '\u6b22\u8fce\u4f7f\u7528 Ink Engine',
              ),
              x().createElement(
                A.Z.Paragraph,
                { style: { color: 'gray' } },
                '\u7b80\u5355\u6613\u4e0a\u624b\u7684\u4f4e\u4ee3\u7801\u6574\u5408\u5e73\u53f0',
              ),
              x().createElement(oe.Z, null),
            ),
            x().createElement(
              se.Z,
              null,
              x().createElement(se.Z.Column, { width: 10 }),
              x().createElement(
                se.Z.Column,
                { width: 6 },
                x().createElement(he, {
                  loading: o,
                  placeholder: 'Search...',
                  onResultSelect: (e, t) => {
                    i({ type: 'UPDATE_SELECTION', selection: t.result.title }),
                      a([t.result]);
                  },
                  onSearchChange: p,
                  results: s,
                  value: E,
                }),
              ),
            ),
            x().createElement(
              Ee.Z,
              { basic: !0 },
              x().createElement(
                re.Z.Group,
                null,
                l.map((e, t) => {
                  var n = e.tags,
                    l = e.msgs,
                    a = e.image,
                    r = e.title,
                    m = e.description,
                    c = (e.actionUrl, e.designUrl, e.type, e.color);
                  return x().createElement(
                    Ze,
                    { raised: !0, key: t, color: c },
                    x().createElement(
                      re.Z.Content,
                      null,
                      x().createElement(
                        Ae,
                        null,
                        x().createElement(W.Z, {
                          size: 'massive',
                          avatar: !0,
                          src: a,
                          alt: 'HomeIndex\u9875\u9762CardItem'.concat(
                            t,
                            '-\u7f3a\u5931\u56fe\u7247',
                          ),
                        }),
                      ),
                      x().createElement(de, null, r),
                      x().createElement(re.Z.Meta, null, m),
                      x().createElement('div', {
                        style: { marginBottom: '12px' },
                      }),
                      x().createElement(
                        re.Z.Description,
                        null,
                        d(n),
                        x().createElement(
                          'div',
                          { style: { marginTop: '10px' } },
                          Z(l),
                        ),
                      ),
                    ),
                    x().createElement(
                      re.Z.Content,
                      { extra: !0 },
                      x().createElement(
                        xe,
                        {
                          color: 'teal',
                          icon: !0,
                          labelPosition: 'right',
                          floated: 'left',
                        },
                        '\u7acb\u523b\u4f7f\u7528',
                        x().createElement(ie.Z, { name: 'right arrow' }),
                      ),
                      x().createElement(
                        xe,
                        { floated: 'right' },
                        '\u8bbe\u8ba1\u7406\u5ff5',
                      ),
                    ),
                  );
                }),
              ),
            ),
          );
        },
        ze = je,
        Xe = n(39445),
        Ne = n(95712),
        Oe = n(59574),
        qe = n(13929),
        Ke = n.n(qe),
        Je = (e) => {
          var t = e.url;
          return x().createElement(p.Z, {
            style: {
              float: 'right',
              marginRight: '20px',
              marginBottom: '10px',
              width: '50px',
              borderRadius: '8px',
            },
            icon: x().createElement(U.Z, null),
            href: t,
          });
        },
        _e = (0, h.memo)(Je),
        $e = (0, F.ZP)(re.Z)(
          ye || (ye = (0, Z.Z)(['\n  box-shadow: none !important;\n'])),
        ),
        et = (0, F.ZP)(W.Z)(
          Ce ||
            (Ce = (0, Z.Z)([
              '\n  position: absolute !important;\n  margin-top: -40px !important;\n  margin-left: 40px !important;\n',
            ])),
        ),
        tt = (0, F.ZP)(W.Z)(
          Be ||
            (Be = (0, Z.Z)([
              '\n  border-top-left-radius: 1.25rem !important;\n  border-top-right-radius: 1.25rem !important;\n',
            ])),
        ),
        nt = F.ZP.p(
          fe ||
            (fe = (0, Z.Z)([
              '\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.5);\n',
            ])),
        ),
        lt = F.ZP.span(
          Ie ||
            (Ie = (0, Z.Z)([
              '\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.5);\n',
            ])),
        ),
        at = (0, F.ZP)(Xe.Z)(
          ke || (ke = (0, Z.Z)(['\n  margin-top: 2em !important;\n'])),
        ),
        rt = (e) =>
          x().createElement(
            x().Fragment,
            null,
            x().createElement(
              'div',
              { style: { width: '100%', marginTop: '25px' } },
              x().createElement(
                A.Z.Title,
                { level: 3 },
                'Lowcode Engine\u54cd\u5e94\u5f0f\u642d\u5efa',
              ),
              x().createElement(
                A.Z.Paragraph,
                { style: { color: 'gray' } },
                '\u57fa\u4e8e lowcode-engine \u5feb\u901f\u6784\u5efa\u54cd\u5e94\u5f0f\u7cfb\u7edf',
              ),
              x().createElement(_e, {
                url: 'https://github.com/XIYExi/Envelope',
              }),
              x().createElement(g.Z, null),
            ),
            x().createElement(
              se.Z,
              null,
              x().createElement(
                se.Z.Column,
                { width: 12 },
                x().createElement(
                  Ee.Z,
                  { basic: !0 },
                  x().createElement(tt, {
                    rounded: !0,
                    src: Ke(),
                    alt: 'HomeLowCodeEngine\u62ac\u5934\u56fe\u7247\u663e\u793a\u9519\u8bef',
                  }),
                  x().createElement(et, {
                    size: 'tiny',
                    src: j(),
                    alt: 'HomeLowCodeEngine\u5706\u5f62\u56fe\u7247',
                    circular: !0,
                  }),
                  x().createElement(
                    'div',
                    { style: { marginTop: '60px' } },
                    x().createElement(
                      Ne.Z,
                      { text: !0 },
                      x().createElement(
                        at,
                        { as: 'h2' },
                        '\u57fa\u4e8e Lowcode-Engine',
                      ),
                      x().createElement(
                        nt,
                        null,
                        'Lowcode-Engine \u662f\u4e00\u6b3e\u4e3a\u4f4e\u4ee3\u7801\u5e73\u53f0\u5f00\u53d1\u8005\u63d0\u4f9b\u7684\uff0c\u5177\u5907\u5f3a\u5927\u5b9a\u5236\u6269\u5c55\u80fd\u529b\u7684\u4f4e\u4ee3\u7801\u8bbe\u8ba1\u5668\u7814\u53d1\u6846\u67b6\u3002\u5177\u5907\u5f3a\u5927\u7684\u4f4e\u4ee3\u7801\u8bbe\u8ba1\u5668\uff0c \u53ef\u4ee5\u627f\u8f7d\u7740\u4f4e\u4ee3\u7801\u5e73\u53f0\u7684\u6838\u5fc3\u529f\u80fd\uff0c\u5305\u62ec\u5165\u6599\u3001\u7f16\u6392\u3001\u7ec4\u4ef6\u914d\u7f6e\u3001\u753b\u5e03\u6e32\u67d3\u7b49\u7b49\u3002Lowcode-Engine \u5177\u5907\u5f3a\u5927\u7684\u62d3\u5c55\u80fd\u529b\uff0c \u4e00\u65b9\u9762\u6211\u4eec\u53ef\u4ee5\u5feb\u901f\u62e5\u6709\u4e00\u4efd\u6807\u51c6\u7684\u4f4e\u4ee3\u7801\u8bbe\u8ba1\u5668\uff0c\u53e6\u5916\u4e00\u65b9\u9762\u5982\u679c\u6709\u4e1a\u52a1\u72ec\u7279\u7684\u529f\u80fd\u9700\u8981\uff0c\u6211\u4eec\u53ef\u4ee5\u4e0d\u7528\u770b\u5b83\u7684\u6e90\u7801\u3001\u4e0d\u7528\u5173\u5fc3\u5176\u5b9e\u73b0\uff0c \u53ef\u4ee5\u4f7f\u7528 API\u3001\u63d2\u4ef6\u7b49\u65b9\u5f0f\u5feb\u901f\u5b8c\u6210\u80fd\u529b\u7684\u5f00\u53d1\u3002',
                      ),
                      x().createElement(
                        nt,
                        null,
                        'Ink \u81f4\u529b\u4e8e\u6253\u9020\u4f4e\u4ee3\u7801\u6574\u5408\u5e73\u53f0\uff0c\u56e2\u961f\u8ba4\u4e3a\u6ca1\u6709\u4e00\u6b3e\u8bbe\u8ba1\u53ef\u4ee5\u6ee1\u8db3\u6240\u6709\u7684\u8f6f\u4ef6\u9700\u6c42\uff0c\u53ea\u6709\u6700\u9002\u5408\u5f53\u524d\u9700\u6c42\u7684\u5de5\u5177\u4e0e\u65b9\u6cd5\u3002\u56e0\u6b64\u5f3a\u5927\u7684 Lowcode-Engine \u6b63\u662f\u6211\u4eec\u6784\u5efa\u4f4e\u4ee3\u7801\u9879\u76ee\u7684\u795e\u5175\u5229\u5668\u3002Lowcode-Engine \u5177\u5907\u5f3a\u5927\u7684\u54cd\u5e94\u5f0f\u5e03\u5c40\u4ee5\u53ca\u6805\u683c\u7cfb\u7edf\uff0c\u5f25\u8865\u4e86\u539f\u751f Ink \u7cfb\u7edf\u5728\u54cd\u5e94\u5f0f\u9879\u76ee\u4ee5\u53caPC\u7b49\u5927\u663e\u793a \u8bbe\u5907\u4e0a\u7684\u8868\u73b0\u529b\u3002',
                      ),
                      x().createElement(
                        nt,
                        null,
                        'Ink \u56e2\u961f\u901a\u8fc7\u4e3a\u539f\u751f\u5f15\u64ce\u7f16\u5199\u63d2\u4ef6\u4ee5\u53ca\u7269\u6599\u5e93\uff0c\u6210\u529f\u6784\u5efa\u4e86\u4f4e\u4ee3\u7801\u8fd0\u884c\u96c6\uff0c\u53ef\u4ee5\u4f7f\u7528Fushion\u5143\u4ef6\u5e93\uff0c\u914d\u5408\u5f3a\u5927\u7684\u7f16\u8f91\u5668\u6784\u5efa\u54cd\u5e94\u5f0f\u9879\u76ee\uff0c\u5e76\u5b8c\u6210 \u9884\u89c8\u3001\u51fa\u7801\u7b49\u529f\u80fd\u3002\u7b2c\u4e09\u65b9\u5f15\u64ce\u4e0e Ink \u539f\u751f\u9879\u76ee\u5b8c\u5168\u9694\u79bb\uff0c\u56e0\u6b64\u5e76\u4e0d\u4f1a\u4ea7\u751f\u73af\u5883\u6216\u9879\u76ee\u6c61\u67d3\u3002',
                      ),
                      x().createElement(
                        Ee.Z.Group,
                        { horizontal: !0 },
                        x().createElement(
                          Ee.Z,
                          null,
                          x().createElement(Xe.Z, { as: 'h5' }, 'Open Source'),
                          x().createElement(ie.Z, { name: 'globe' }),
                          x().createElement(
                            lt,
                            null,
                            '\u5b8c\u5168\u5f00\u6e90',
                          ),
                        ),
                        x().createElement(
                          Ee.Z,
                          null,
                          x().createElement(
                            Xe.Z,
                            { as: 'h5' },
                            'Technical Support',
                          ),
                          x().createElement(ie.Z, { name: 'archive' }),
                          x().createElement(
                            lt,
                            null,
                            '\u652f\u6301\u9694\u79bb',
                          ),
                        ),
                        x().createElement(
                          Ee.Z,
                          null,
                          x().createElement(Xe.Z, { as: 'h5' }, 'Third Party'),
                          x().createElement(ie.Z, { name: 'sitemap' }),
                          x().createElement(
                            lt,
                            null,
                            '\u5141\u8bb8\u63a5\u5165',
                          ),
                        ),
                        x().createElement(
                          Ee.Z,
                          null,
                          x().createElement(Xe.Z, { as: 'h5' }, 'User Use'),
                          x().createElement(ie.Z, { name: 'user' }),
                          x().createElement(
                            lt,
                            null,
                            '\u514d\u8d39\u4f7f\u7528',
                          ),
                        ),
                      ),
                      x().createElement(
                        at,
                        { as: 'h2' },
                        '\u81ea\u5b9a\u4e49\u63d2\u4ef6',
                      ),
                      x().createElement(
                        nt,
                        null,
                        'Ink Lowcode-Engine \u901a\u8fc7\u7f16\u5199\u63d2\u4ef6\u5b9e\u73b0\u5bf9\u5f15\u64ce\u7684\u6ce8\u5165\u4ee5\u53ca\u64cd\u63a7\uff0c\u5728\u9879\u76ee\u6838\u5fc3\u5305',
                        ' ',
                        x().createElement('mark', null, 'engine-lib-grid'),
                        ' ',
                        '\u4e2d\u914d\u7f6e\u4e86\u5173\u4e8e\u7b2c\u4e09\u65b9\u5f15\u64ce\u7684\u6240\u6709\u63d2\u4ef6\u3002',
                      ),
                      x().createElement(
                        Oe.Z,
                        { animated: !0 },
                        x().createElement(
                          Oe.Z.Item,
                          null,
                          x().createElement(Oe.Z.Icon, { name: 'folder' }),
                          x().createElement(
                            Oe.Z.Content,
                            null,
                            x().createElement(
                              Oe.Z.Header,
                              { as: 'a' },
                              'sample-plugins',
                            ),
                            x().createElement(
                              Oe.Z.Description,
                              null,
                              '\u5173\u4e8eengine-lib-plugin\u7684\u5168\u90e8\u63d2\u4ef6',
                            ),
                          ),
                        ),
                        x().createElement(
                          Oe.Z.Item,
                          null,
                          x().createElement(Oe.Z.Icon, { name: 'folder' }),
                          x().createElement(
                            Oe.Z.Content,
                            null,
                            x().createElement(
                              Oe.Z.Header,
                              { as: 'a' },
                              'scenarios',
                            ),
                            x().createElement(
                              Oe.Z.Description,
                              null,
                              '\u7269\u6599',
                            ),
                          ),
                        ),
                        x().createElement(
                          Oe.Z.Item,
                          null,
                          x().createElement(Oe.Z.Icon, { name: 'folder' }),
                          x().createElement(
                            Oe.Z.Content,
                            null,
                            x().createElement(
                              Oe.Z.Header,
                              { as: 'a' },
                              'setters',
                            ),
                            x().createElement(
                              Oe.Z.Description,
                              null,
                              '\u6ce8\u5165\u5668',
                            ),
                          ),
                        ),
                        x().createElement(
                          Oe.Z.Item,
                          null,
                          x().createElement(Oe.Z.Icon, { name: 'folder' }),
                          x().createElement(
                            Oe.Z.Content,
                            null,
                            x().createElement(
                              Oe.Z.Header,
                              { as: 'a' },
                              'universal',
                            ),
                            x().createElement(
                              Oe.Z.Description,
                              null,
                              'Json Schema \u7b49\u9759\u6001\u6587\u4ef6',
                            ),
                          ),
                        ),
                      ),
                      x().createElement(
                        'div',
                        { style: { marginTop: '2em' } },
                        x().createElement(g.Z, null),
                        x().createElement(
                          se.Z,
                          null,
                          x().createElement(
                            se.Z.Row,
                            null,
                            x().createElement(
                              se.Z.Column,
                              { width: 10 },
                              x().createElement(
                                Xe.Z,
                                { as: 'h2' },
                                '\u4e86\u89e3\u66f4\u591a',
                              ),
                            ),
                            x().createElement(
                              se.Z.Column,
                              { width: 6 },
                              x().createElement(
                                me.Z,
                                {
                                  primary: !0,
                                  onClick: () => {
                                    window.open('https://lowcode-engine.cn/');
                                  },
                                },
                                '\u524d\u5f80 Lowcode-Engine \u5b98\u7f51',
                                x().createElement(ie.Z, {
                                  name: 'arrow right',
                                }),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              x().createElement(
                se.Z.Column,
                { width: 4 },
                x().createElement(
                  re.Z.Group,
                  null,
                  x().createElement(
                    re.Z,
                    { color: 'teal' },
                    x().createElement(
                      re.Z.Content,
                      null,
                      x().createElement(re.Z.Header, null, 'Ink Lowcode'),
                      x().createElement(
                        me.Z,
                        {
                          fluid: !0,
                          color: 'teal',
                          onClick: e.gotoLowcodeEngine,
                        },
                        '\u7acb\u523b\u4f7f\u7528',
                        x().createElement(ie.Z, { name: 'arrow right' }),
                      ),
                    ),
                  ),
                  x().createElement(
                    re.Z,
                    { color: 'red' },
                    x().createElement(
                      re.Z.Content,
                      null,
                      x().createElement(
                        re.Z.Header,
                        null,
                        x().createElement(W.Z, {
                          size: 'huge',
                          avatar: !0,
                          src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                        }),
                        x().createElement(
                          lt,
                          null,
                          ' \u6c99\u7bb1\u8fd0\u884c',
                        ),
                      ),
                      x().createElement(
                        re.Z.Description,
                        null,
                        x().createElement(
                          nt,
                          null,
                          'Ink Lowcode-Engine \u5c01\u88c5\u540e\u4fdd\u7559\u539f\u5f15\u64ce\u7684\u5f3a\u5927\u7279\u6027\uff0c\u652f\u6301SandBox\u6c99\u7bb1\u8fd0\u884c\u9879\u76ee\uff0c\u53ef\u4ee5\u5feb\u901f\u9884\u89c8\uff0c\u5728\u7ebf\u4fee\u6539',
                        ),
                      ),
                    ),
                    x().createElement(
                      re.Z.Content,
                      { extra: !0 },
                      x().createElement(
                        'a',
                        null,
                        x().createElement(ie.Z, { name: 'archive' }),
                        'SandBox',
                      ),
                    ),
                  ),
                  x().createElement(
                    re.Z,
                    { color: 'black' },
                    x().createElement(
                      re.Z.Content,
                      null,
                      x().createElement(
                        re.Z.Header,
                        null,
                        x().createElement(W.Z, {
                          size: 'huge',
                          avatar: !0,
                          src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                        }),
                        x().createElement(
                          lt,
                          null,
                          ' \u5728\u7ebf\u7f16\u7a0b',
                        ),
                      ),
                      x().createElement(
                        re.Z.Description,
                        null,
                        x().createElement(
                          nt,
                          null,
                          'Lowcode-Engine \u6700\u5f3a\u5927\u7684\u7279\u6027\u4e4b\u4e00\uff0c\u53ef\u4ee5\u5728\u7ebf\u7f16\u8f91\u6e90\u4ee3\u7801\uff0c\u540c\u65f6\u5bf9\u5143\u4ef6\u4e8b\u4ef6\u8fdb\u884c\u7ed1\u5b9a\uff0c\u5feb\u6377\u65b9\u4fbf\u5f97\u8bbe\u8ba1\u4f4e\u4ee3\u7801\u9875\u9762',
                        ),
                      ),
                    ),
                    x().createElement(
                      re.Z.Content,
                      { extra: !0 },
                      x().createElement(
                        'a',
                        null,
                        x().createElement(ie.Z, { name: 'edit outline' }),
                        'Online Program',
                      ),
                    ),
                  ),
                  x().createElement(
                    re.Z,
                    { color: 'red' },
                    x().createElement(
                      re.Z.Content,
                      null,
                      x().createElement(
                        re.Z.Header,
                        null,
                        x().createElement(W.Z, {
                          size: 'huge',
                          avatar: !0,
                          src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                        }),
                        x().createElement(
                          lt,
                          null,
                          ' \u51fa\u7801\u6a21\u5757',
                        ),
                      ),
                      x().createElement(
                        re.Z.Description,
                        null,
                        x().createElement(
                          nt,
                          null,
                          'Lowcode-Engine \u4f7f\u7528\u548c \u539f\u751f Ink \u4e00\u6837\u5f97\u8bbe\u8ba1\u7406\u5ff5\uff0c\u5747\u4f7f\u7528Json Schema\u5bfc\u51fa\u5143\u4ef6\u7f16\u8f91\u6570\u636e\uff0c\u4f7f\u7528zip\u5de5\u5177\u5feb\u901f\u6253\u5305\uff0c\u652f\u6301\u6e90\u7801\u5bfc\u51fa',
                        ),
                      ),
                    ),
                    x().createElement(
                      re.Z.Content,
                      { extra: !0 },
                      x().createElement(
                        'a',
                        { style: { marginRight: '20px' } },
                        x().createElement(ie.Z, { name: 'code' }),
                        'Code',
                      ),
                      x().createElement(
                        'a',
                        null,
                        x().createElement(ie.Z, { name: 'modx' }),
                        'Module',
                      ),
                    ),
                  ),
                  x().createElement(
                    $e,
                    null,
                    x().createElement(
                      re.Z.Content,
                      null,
                      x().createElement(
                        me.Z,
                        { fluid: !0, color: 'blue' },
                        'Learn More',
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        mt = rt,
        ct = n(91896),
        it = n(89301),
        ot = n.n(it),
        st = n(64842),
        Et = n(736),
        gt = F.ZP.p(
          Re ||
            (Re = (0, Z.Z)([
              '\n  font-size: 15px;\n  color: rgba(0, 0, 0, 0.5);\n',
            ])),
        ),
        pt = {
          text: '\u8fd9\u4e00\u4e2a\u6807\u51c6\u7684 Antd \u6587\u672c\u57df\uff0c \u5e76\u5bf9\u6587\u672c\u8fdb\u884c\u4e86\u6807\u8bb0',
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
        At = {
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
        dt = (0, F.ZP)(oe.Z)(
          Ue ||
            (Ue = (0, Z.Z)([
              '\n  margin-top: 3.5em !important;\n  margin-bottom: 3.5em !important;\n',
            ])),
        ),
        ut = (e) =>
          x().createElement(
            x().Fragment,
            null,
            x().createElement(
              'div',
              { style: { width: '100%', marginTop: '25px' } },
              x().createElement(
                A.Z.Title,
                { level: 3 },
                '\u7b2c\u4e09\u65b9\u5143\u4ef6\u5c01\u88c5\u6587\u6863',
              ),
              x().createElement(
                A.Z.Paragraph,
                { style: { color: 'gray' } },
                '\u57fa\u4e8edumi\u6587\u6863\uff0c\u5c55\u793a\u5c01\u88c5\u540e Antd \u548c semantic \u5143\u4ef6',
              ),
              x().createElement(oe.Z, null),
            ),
            x().createElement(
              Ee.Z,
              { basic: !0 },
              x().createElement(W.Z, {
                src: ot(),
                size: 'huge',
                centered: !0,
                alt: '',
              }),
              x().createElement(
                Xe.Z,
                { as: 'h1', textAlign: 'center' },
                '\u5c01\u88c5\u4e24\u5927\u5143\u4ef6\u5e93',
              ),
              x().createElement(
                Ee.Z,
                { basic: !0, textAlign: 'center' },
                x().createElement(
                  me.Z,
                  {
                    color: 'teal',
                    onClick: () => {
                      window.open(
                        '/#/~docs/lole\u6587\u6863/lole_of_react',
                        'blank',
                      );
                    },
                  },
                  '\u67e5\u770b\u6587\u6863',
                  x().createElement(ie.Z, { name: 'arrow right' }),
                ),
              ),
              x().createElement(dt, { hidden: !0 }),
              x().createElement(
                se.Z,
                null,
                x().createElement(
                  se.Z.Row,
                  null,
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      Ee.Z,
                      { basic: !0 },
                      x().createElement(
                        Xe.Z,
                        { as: 'h3' },
                        '\u4eba\u6c14\u6846\u67b6',
                      ),
                      x().createElement(
                        gt,
                        null,
                        '\u56fd\u5185\u73b0\u8c61\u7ea7UI\u7ec4\u4ef6\u5e93Ant Design\uff0c \u62e5\u6709\u5e9e\u5927\u7684\u7528\u6237\u7fa4\u4f53\uff0c\u7ecf\u5386\u65e0\u6570\u6574\u5408\u4e0e\u8fed\u4ee3\uff0c\u62e5\u670950\u591a\u4e2a\u98ce\u683c\u9c9c\u660e\u7684\u5143\u4ef6\uff0c\u53ef\u4ee5\u9002\u914d90%\u7684\u4efb\u52a1\u9700\u6c42\u3002',
                      ),
                      x().createElement(
                        gt,
                        null,
                        '\u56fd\u5916\u4eba\u6c14\u9887\u9ad8\u7684 Semantic UI React\uff0c \u57fa\u4e8e Semantic UI \u4fee\u6539\u800c\u6765\u7684 React \u7248\u672c\uff0c\u662fcss\u9a71\u52a8\u7684\u5143\u4ef6\u5e93\uff0c\u98ce\u683c\u6e05\u65b0\u8131\u4fd7\uff0c\u62e5\u670940\u591a\u4e2a\u4e0d\u540c\u7ec4\u4ef6\uff0c \u5176\u4e2d\u5927\u591a\u7ec4\u4ef6\u805a\u7126\u7528\u6237\u4ea4\u4e92\uff0c\u62e5\u6709\u4e30\u5bcc\u7684\u52a8\u753b\u5e93\uff0c\u4e3b\u8981\u9886\u57df\u5b9a\u4f4d\u4e0e\u793e\u4ea4\u5e73\u53f0\u3002',
                      ),
                    ),
                  ),
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      Ee.Z,
                      null,
                      x().createElement(W.Z, {
                        src: 'https://s1.ax1x.com/2023/04/10/ppqlDAK.png',
                      }),
                    ),
                    x().createElement(
                      me.Z,
                      { primary: !0 },
                      '\u4e00\u4e2a\u6807\u51c6\u7684Semantic\u6309\u94ae',
                    ),
                  ),
                ),
                x().createElement(dt, null),
                x().createElement(
                  se.Z.Row,
                  null,
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      Ee.Z,
                      { basic: !0 },
                      x().createElement(
                        Xe.Z,
                        { as: 'h3' },
                        '\u7cbe\u7b80\u5c01\u88c5',
                      ),
                      x().createElement(
                        gt,
                        null,
                        '\u7ec4\u4ef6\u7cbe\u9009\uff0c\u5bf9Antd\u4ee5\u53caSemantic\u5143\u4ef6\u5e93\u8fdb\u884c\u7cbe\u7b80\uff0c\u7b5b\u9664\u4e0d\u5e38\u7528\u7ec4\u4ef6\uff0c\u7b5b\u9664\u975e\u901a\u7528\u7ec4\u4ef6\uff0c\u4f7f\u5f97\u7528\u6237\u4f53\u9a8c\u8fbe\u5230\u6700\u4f73\u3002',
                      ),
                      x().createElement(
                        gt,
                        null,
                        '\u5bf9\u7ec4\u4ef6\u5c5e\u6027\u8fdb\u884c\u7cbe\u7b80\uff0c\u63d0\u51fa\u5197\u4f59\u5c5e\u6027\uff0c\u4fdd\u7559\u57fa\u672c\u4ea4\u4e92\u4ee5\u53ca\u6837\u5f0f\u5c5e\u6027\uff0c\u52a0\u901f\u7528\u6237\u6784\u5efa\u5feb\u901f\u539f\u578b.',
                      ),
                    ),
                  ),
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      Ee.Z,
                      null,
                      x().createElement(W.Z, {
                        src: 'https://s1.ax1x.com/2023/04/10/ppqlhHP.png',
                      }),
                    ),
                    x().createElement(st.default, (0, ct.Z)({ isTpl: !1 }, pt)),
                  ),
                ),
                x().createElement(dt, null),
                x().createElement(
                  se.Z.Row,
                  null,
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      Ee.Z,
                      { basic: !0 },
                      x().createElement(
                        Xe.Z,
                        { as: 'h3' },
                        '\u8fed\u4ee3 - \u9012\u589e',
                      ),
                      x().createElement(
                        gt,
                        null,
                        '\u4e0d\u65ad\u9012\u589e\u3002\u540e\u7eed\u6211\u4eec\u5c06\u7ee7\u7eed\u7ee7\u627f\u66f4\u591a\u7684\u5143\u4ef6\uff0c\u5982\u56fd\u5916\u73b0\u8c61\u7ea7\u7684Material UI\uff0c\u4e0d\u65ad\u4e30\u5bcc\u5e73\u53f0\u7684UI\u6846\u67b6\uff0c\u7ed9\u7528\u6237\u66f4\u591a\u7684\u9009\u62e9\u3002',
                      ),
                      x().createElement(
                        gt,
                        null,
                        '\u4e0d\u65ad\u8fed\u4ee3\u3002\u5bf9\u73b0\u6709\u5143\u4ef6\u5e93\u8fdb\u884c\u8c03\u6574\uff0c\u5bf9\u73b0\u6709\u5143\u4ef6\u5e93\u8fdb\u884c\u66f4\u52a0\u5f7b\u5e95\u7684\u4e8c\u6b21\u5c01\u88c5\uff0c\u5f00\u8f9f\u65b0\u7684\u63a5\u53e3\uff0c\u63d0\u4f9b\u66f4\u591a\u65b9\u9762\u5feb\u6377\u7684\u5c5e\u6027\u5165\u53e3\u3002',
                      ),
                    ),
                  ),
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      Ee.Z,
                      null,
                      x().createElement(W.Z, {
                        src: 'https://s1.ax1x.com/2023/04/10/ppqlbcj.png',
                      }),
                    ),
                    x().createElement(Et.default, (0, ct.Z)({ isTpl: !1 }, At)),
                  ),
                ),
              ),
            ),
          ),
        Zt = (0, h.memo)(ut),
        ht = n(40209),
        xt = F.ZP.p(
          Fe ||
            (Fe = (0, Z.Z)([
              '\n  color: rgba(0, 0, 0, 0.5);\n  font-size: 14px;\n  display: flex;\n',
            ])),
        ),
        bt = (0, F.ZP)(W.Z)(
          Le || (Le = (0, Z.Z)(['\n  width: ', ';\n  height: ', ';\n'])),
          (e) => e.width,
          (e) => e.height,
        ),
        vt =
          ((0, F.ZP)(ie.Z)(
            Ye || (Ye = (0, Z.Z)(['\n  margin-right: 10px !important;\n'])),
          ),
          (e) =>
            x().createElement(
              x().Fragment,
              null,
              x().createElement(
                'div',
                { style: { width: '100%', marginTop: '25px' } },
                x().createElement(
                  A.Z.Title,
                  { level: 3 },
                  '\u6d41\u7a0b\u56fe\u7f16\u8f91\u5668',
                ),
                x().createElement(
                  A.Z.Paragraph,
                  { style: { color: 'gray' } },
                  '\u57fa\u4e8e AntV/X6 \u56fe\u5f15\u64ce\u5feb\u901f\u642d\u5efa\u6d41\u7a0b\u56fe',
                ),
                x().createElement(_e, {
                  url: 'https://github.com/XIYExi/Envelope',
                }),
                x().createElement(g.Z, null),
              ),
              x().createElement(
                'div',
                null,
                x().createElement(
                  se.Z,
                  null,
                  x().createElement(
                    se.Z.Row,
                    null,
                    x().createElement(
                      se.Z.Column,
                      { width: 9 },
                      x().createElement(
                        ht.Z,
                        { animated: 'move' },
                        x().createElement(
                          ht.Z.Content,
                          { visible: !0 },
                          x().createElement(bt, {
                            width: '1028.67px',
                            height: '510px',
                            src: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*W9g1S7W-TOoAAAAAAAAAAAAAARQnAQ',
                          }),
                        ),
                        x().createElement(
                          ht.Z.Content,
                          { hidden: !0 },
                          x().createElement('div', {
                            style: { marginTop: '2em' },
                          }),
                          x().createElement(
                            Ee.Z,
                            { basic: !0 },
                            x().createElement(
                              Xe.Z,
                              { as: 'h2', color: 'blue' },
                              'AntV X6',
                            ),
                            x().createElement(
                              xt,
                              { style: { marginTop: '2em' } },
                              'X6 \u662f AntV \u65d7\u4e0b\u7684\u56fe\u7f16\u8f91\u5f15\u64ce\uff0c\u63d0\u4f9b\u4e86\u4e00\u7cfb\u5217\u5f00\u7bb1\u5373\u7528\u7684\u4ea4\u4e92\u7ec4\u4ef6\u548c\u7b80\u5355\u6613\u7528\u7684\u8282\u70b9\u5b9a\u5236\u80fd\u529b\uff0c\u65b9\u4fbf\u6211\u4eec\u5feb\u901f\u642d\u5efa\u6d41\u7a0b\u56fe\u3001DAG \u56fe\u3001ER \u56fe\u7b49\u56fe\u5e94\u7528\u3002',
                            ),
                            x().createElement(
                              xt,
                              null,
                              '\ud83c\udf31\u3000\u6781\u6613\u5b9a\u5236\uff1a\u652f\u6301\u4f7f\u7528 SVG/HTML/React/Vue \u5b9a\u5236\u8282\u70b9\u6837\u5f0f\u548c\u4ea4\u4e92\uff1b',
                              x().createElement('br', null),
                              '\ud83d\ude80\u3000\u5f00\u7bb1\u5373\u7528\uff1a\u5185\u7f6e 10+ \u56fe\u7f16\u8f91\u914d\u5957\u6269\u5c55\uff0c\u5982\u6846\u9009\u3001\u5bf9\u9f50\u7ebf\u3001\u5c0f\u5730\u56fe\u7b49\uff1b',
                              x().createElement('br', null),
                              '\ud83e\uddf2\u3000\u6570\u636e\u9a71\u52a8\uff1a\u57fa\u4e8e MVC \u67b6\u6784\uff0c\u7528\u6237\u66f4\u52a0\u4e13\u6ce8\u4e8e\u6570\u636e\u903b\u8f91\u548c\u4e1a\u52a1\u903b\u8f91\uff1b',
                              x().createElement('br', null),
                              '\ud83d\udcaf\u3000\u4e8b\u4ef6\u9a71\u52a8\uff1a\u53ef\u4ee5\u76d1\u542c\u56fe\u8868\u5185\u53d1\u751f\u7684\u4efb\u4f55\u4e8b\u4ef6\u3002',
                            ),
                            x().createElement(
                              xt,
                              null,
                              'Ink \u56e2\u961f\u901a\u8fc7 X6 \u5f15\u64ce\u63d0\u4f9b\u7684 API \u63a5\u53e3\uff0c\u8fdb\u884c\u4e8c\u6b21\u5c01\u88c5\uff0c\u4fdd\u7559\u539f\u751f\u5f15\u64ce\u64cd\u4f5c\u624b\u611f\uff0c\u5e76\u63d0\u4f9b\u4e86\u66f4\u591a\u81ea\u5b9a\u4e49\u64cd\u4f5c\uff0c\u65b9\u4fbf\u7528\u6237\u8fc5\u901f\u8fdb\u884c\u56fe\u64cd\u4f5c\u3002',
                            ),
                          ),
                        ),
                      ),
                    ),
                    x().createElement(
                      se.Z.Column,
                      { width: 4 },
                      x().createElement(
                        se.Z,
                        null,
                        x().createElement(
                          se.Z.Row,
                          null,
                          x().createElement(
                            ht.Z,
                            { animated: 'move down' },
                            x().createElement(
                              ht.Z.Content,
                              { visible: !0 },
                              x().createElement(bt, {
                                src: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*_0vpQ5sFL-8AAAAAAAAAAAAAARQnAQ',
                                width: '514.333px',
                                height: '240px',
                              }),
                            ),
                            x().createElement(
                              ht.Z.Content,
                              { hidden: !0 },
                              x().createElement('div', {
                                style: { marginTop: '2em' },
                              }),
                              x().createElement(
                                Ee.Z,
                                { basic: !0 },
                                x().createElement(
                                  Xe.Z,
                                  { as: 'h2', color: 'teal' },
                                  '\u6d41\u7a0b\u56fe',
                                ),
                                x().createElement(
                                  xt,
                                  { style: { marginTop: '2em' } },
                                  '\u6d41\u7a0b\u56fe\u7f16\u8f91\u5668\u4e3b\u8981\u805a\u7126\u4e8e\u6d41\u7a0b\u56fe\u7ed8\u5236\uff0c\u63d0\u4f9b \u8d77\u59cb\u8282\u70b9\u3001\u6761\u4ef6\u5224\u65ad\u3001\u4e00\u822c\u64cd\u4f5c \u7b49\u591a\u79cd\u6d41\u7a0b\u56fe\u8282\u70b9\uff0c\u540c\u65f6\u63d0\u4f9b ReactNode \u7b49\u7ec4\u4ef6\u652f\u6301\u81ea\u5b9a\u4e49\u3002 \u7f16\u8f91\u5668\u76ee\u524d\u63d0\u4f9b\u901a\u7528\u63a7\u5236\u680f\uff0c\u53ef\u4ee5\u4e00\u952e\u5bfc\u51fa\u914d\u7f6e\uff0c\u652f\u6301\u9879\u76ee\u95f4\u5feb\u901f\u96c6\u6210\u3002',
                                ),
                              ),
                            ),
                          ),
                        ),
                        x().createElement(
                          se.Z.Row,
                          null,
                          x().createElement(
                            ht.Z,
                            { animated: 'move down' },
                            x().createElement(
                              ht.Z.Content,
                              { visible: !0 },
                              x().createElement(bt, {
                                src: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*AVRUSrPL_dEAAAAAAAAAAAAAARQnAQ',
                                width: '514.333px',
                                height: '240px',
                              }),
                            ),
                            x().createElement(
                              ht.Z.Content,
                              { hidden: !0 },
                              x().createElement('div', {
                                style: { marginTop: '2em' },
                              }),
                              x().createElement(
                                Ee.Z,
                                { basic: !0 },
                                x().createElement(
                                  Xe.Z,
                                  { as: 'h2' },
                                  '\u66f4\u591a\u56fe\u8868',
                                ),
                                x().createElement(
                                  xt,
                                  { style: { marginTop: '2em' } },
                                  'Ink \u6d41\u7a0b\u56fe\u7f16\u8f91\u5668\u540e\u7eed\u5c06\u6dfb\u52a0E - R\u5b9e\u4f53\u56fe\u3001DFD \u6570\u636e\u6d41\u56fe\u3001\u65f6\u5e8f\u56fe\u3001UML\u5b9e\u4f8b\u56fe\u7b49\u4e00\u7cfb\u5217\u56fe\u6807\u7ec4\u4ef6\u3002 Ink \u4f4e\u4ee3\u7801\u6574\u5408\u5e73\u53f0\u6301\u7eed\u96c6\u6210\uff0c\u6301\u7eed\u4ea4\u4ed8\u3002',
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    x().createElement(
                      se.Z.Column,
                      { width: 3 },
                      x().createElement(
                        'div',
                        { style: { marginTop: '2em' } },
                        x().createElement(
                          Xe.Z,
                          { as: 'h2', icon: !0 },
                          x().createElement(ie.Z, { name: 'database' }),
                          '\u6570\u636e\u9a71\u52a8\u7684\u56fe\u7f16\u8f91\u5668',
                          x().createElement(
                            Xe.Z.Subheader,
                            null,
                            '\u57fa\u4e8e X6 \u548c React \u6253\u9020\u5f00\u7bb1\u5373\u7528\u7684\u6570\u636e\u6d41\u56fe\u8bbe\u8ba1\u5668',
                          ),
                        ),
                        x().createElement(
                          me.Z,
                          {
                            primary: !0,
                            fluid: !0,
                            onClick: () => e.gotoAntv(),
                          },
                          '\u7acb\u5373\u4f7f\u7528',
                          x().createElement(ie.Z, { name: 'arrow right' }),
                        ),
                      ),
                      x().createElement(g.Z, null),
                      x().createElement(
                        Xe.Z,
                        { as: 'h2', icon: !0 },
                        x().createElement(ie.Z, { name: 'database' }),
                        '\u66f4\u591a\u7528\u6cd5',
                        x().createElement(
                          Xe.Z.Subheader,
                          null,
                          '\u524d\u5f80AntV X6 \u8bbe\u8ba1\u6587\u6863\u67e5\u770b\u66f4\u591a\u63a5\u5165\u65f6\u5b88\u5219',
                        ),
                      ),
                      x().createElement(
                        me.Z,
                        {
                          fluid: !0,
                          onClick: () => {
                            window.open(
                              'https://x6.antv.vision/zh/docs/tutorial/about',
                            );
                          },
                        },
                        '\u524d\u5f80\u67e5\u770b',
                      ),
                    ),
                  ),
                ),
              ),
            )),
        wt = vt,
        yt = n(7300),
        Ct = n.n(yt),
        Bt = n(19394),
        ft = n.n(Bt),
        It = n(54206),
        kt = n.n(It),
        Rt = n(87401),
        Ut = F.ZP.p(
          Pe ||
            (Pe = (0, Z.Z)([
              '\n  color: rgba(0, 0, 0, 0.5);\n  font-size: 14px;\n  display: flex;\n',
            ])),
        ),
        Ft = (0, F.ZP)(ie.Z)(
          De || (De = (0, Z.Z)(['\n  margin-right: 10px !important;\n'])),
        ),
        Lt = (e) =>
          x().createElement(
            x().Fragment,
            null,
            x().createElement(
              'div',
              { style: { width: '100%', marginTop: '25px' } },
              x().createElement(
                A.Z.Title,
                { level: 3 },
                'Love Letter UI \u539f\u751f\u6846\u67b6',
              ),
              x().createElement(
                A.Z.Paragraph,
                { style: { color: 'gray' } },
                'Ink \u4f4e\u4ee3\u7801\u6574\u5408\u5e73\u53f0\u5185\u7f6e UI \u6846\u67b6',
              ),
              x().createElement(_e, {
                url: 'https://github.com/XIYExi/Envelope',
              }),
              x().createElement(g.Z, null),
            ),
            x().createElement(
              'div',
              { style: { paddingTop: '3em' } },
              x().createElement(
                Ee.Z,
                { basic: !0 },
                x().createElement(
                  se.Z,
                  null,
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      'div',
                      { style: { marginLeft: '1em', marginTop: '2em' } },
                      x().createElement(
                        Rt.Z,
                        { size: 'tiny' },
                        x().createElement(ie.Z, { name: 'user' }),
                        ' \u7b80\u5355\u5feb\u6377',
                      ),
                      x().createElement(
                        Xe.Z,
                        { as: 'h1', color: 'teal' },
                        '\u5f00\u7bb1\u5373\u7528\u3001\u968f\u65f6\u8bbf\u95ee\uff0c\u7acb\u5373\u5c1d\u8bd5 Love Letter UI \uff01',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        'Love Letter UI \u662f Ink \u4f4e\u4ee3\u7801\u6574\u5408\u5e73\u53f0\u7684\u5185\u7f6e UI \u6846\u67b6\uff0c\u79c9\u627f\u72ec\u7acb\u5f00\u53d1\uff0c\u7edf\u4e00\u96c6\u6210\u7684\u601d\u60f3\uff0c\u4e24\u5957\u7cfb\u7edf\u5e76\u884c\u5f00\u53d1\uff0c\u5e76\u5b9e\u73b0\u5b8c\u7f8e\u5bf9\u63a5\u3002',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u5f00\u7bb1\u5373\u7528\uff0cUI \u6846\u67b6\u6253\u5305\u4e0a\u4f20 npm\uff0c\u901a\u8fc7\u547d\u4ee4\u884c\u4e0b\u8f7d\u5373\u53ef\u76f4\u63a5\u4f7f\u7528\u3002',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u6279\u91cf\u5bfc\u5165\uff0c\u5141\u8bb8\u9009\u62e9\u6027\u5bfc\u5165\u9700\u8981\u7684\u5143\u4ef6\uff0c\u652f\u6301\u5bfc\u5165\u6846\u67b6\u8fd0\u884c\u6700\u5c0f\u96c6\uff0c\u63d0\u9ad8\u9879\u76ee\u6027\u80fd\uff0c\u51cf\u5c11\u4e0d\u5fc5\u8981\u7684\u5f00\u9500\u3002',
                      ),
                      x().createElement(
                        Ut,
                        { style: { marginBottom: '2em' } },
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u5b8c\u5168\u5f00\u6e90\uff0c\u9879\u76ee\u5de5\u7a0b\u6e90\u7801\u5df2\u7ecf\u5728 GitHub \u5f00\u6e90',
                      ),
                      x().createElement(
                        me.Z,
                        {
                          primary: !0,
                          onClick: () => {
                            window.open(
                              'http://lole.feifeilong.work/md/storybook-static/index.html',
                              'blank',
                            );
                          },
                        },
                        '\u67e5\u770b\u7ec4\u4ef6\u5e93',
                        x().createElement(ie.Z, { name: 'arrow right' }),
                      ),
                    ),
                  ),
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(W.Z, {
                      centered: !0,
                      size: 'large',
                      src: Ct(),
                      alt: 'AntV lole1\u7f3a\u7701',
                    }),
                  ),
                ),
              ),
              x().createElement(g.Z, null),
              x().createElement(
                Ee.Z,
                { basic: !0 },
                x().createElement(
                  se.Z,
                  null,
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(W.Z, {
                      centered: !0,
                      size: 'large',
                      src: ft(),
                      alt: 'AntV lole2\u7f3a\u7701',
                    }),
                  ),
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      'div',
                      { style: { marginLeft: '1em', marginTop: '2em' } },
                      x().createElement(
                        Rt.Z,
                        { size: 'tiny' },
                        x().createElement(ie.Z, { name: 'user' }),
                        ' \u6a21\u5757\u5316',
                      ),
                      x().createElement(
                        Xe.Z,
                        { as: 'h1', color: 'teal' },
                        '\u529f\u80fd\u62c6\u5206\uff0c\u6a21\u5757\u7f16\u5199',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        'Love Letter UI \u5c06\u7ec4\u4ef6\u62c6\u5206\u4e3a \u57fa\u7840\u3001\u4ea4\u4e92\u3001\u89c6\u56fe\u3001\u5176\u4ed6 \u56db\u4e2a\u79cd\u7c7b\uff0c\u6bcf\u4e2a\u79cd\u7c7b\u4e2d\u5143\u4ef6\u76f8\u4e92\u7ec4\u5408\u4ee5\u5b8c\u6210\u5177\u4f53\u67d0\u4e00\u7c7b\u7528\u6237\u52a8\u4f5c\u3002',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u7ec4\u4ef6\u7e41\u591a\uff0cLove Letter UI \u5f00\u6e90 50+ \u5143\u4ef6\uff0c\u6d89\u53caWeb\u8bbe\u8ba1\u7684\u5404\u79cd\u8981\u7d20\uff0c\u53ef\u4ee5\u5b8c\u6210\u7edd\u5927\u591a\u6570\u7c7b\u578b\u7684\u5f00\u53d1\u9700\u6c42\u3002',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u6846\u67b6\u652f\u6301\uff0cLove Letter UI \u652f\u6301 React \u6846\u67b6\uff0c\u540c\u65f6\u63a8\u51fa\u539f\u751f\u7248\u672c\u4ee5\u53ca Vue \u7248\u672c\uff0c\u9002\u914d\u524d\u7aef\u5f00\u53d1\u7edd\u5927\u591a\u6570\u9700\u6c42\u3002',
                      ),
                      x().createElement(
                        Ut,
                        { style: { marginBottom: '2em' } },
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u98ce\u683c\u9c9c\u660e\uff0cUI \u7cfb\u7edf\u4ee5\u5f15\u4eba\u6ce8\u76ee\u7684',
                        ' ',
                        x().createElement(
                          'span',
                          { style: { color: 'rgb(249,204,226)' } },
                          '\u6a31\u82b1\u8272',
                        ),
                        ' ',
                        '\u505a\u4e3a\u4e3b\u9898\u8272\u3002',
                      ),
                      x().createElement(
                        me.Z,
                        {
                          primary: !0,
                          onClick: () => {
                            window.open(
                              '/#/~docs/lole\u6587\u6863/lole_of_react',
                            );
                          },
                        },
                        '\u8bbe\u8ba1\u6587\u6863',
                        x().createElement(ie.Z, { name: 'arrow right' }),
                      ),
                    ),
                  ),
                ),
              ),
              x().createElement(g.Z, null),
              x().createElement(
                Ee.Z,
                { basic: !0 },
                x().createElement(
                  se.Z,
                  null,
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(
                      'div',
                      { style: { marginLeft: '1em', marginTop: '2em' } },
                      x().createElement(
                        Rt.Z,
                        { size: 'tiny' },
                        x().createElement(ie.Z, { name: 'user' }),
                        ' \u6587\u6863',
                      ),
                      x().createElement(
                        Xe.Z,
                        { as: 'h1', color: 'teal' },
                        '\u534f\u52a9\u8f6f\u4ef6\u5f00\u53d1',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        'Love Letter UI \u63d0\u4f9b\u4e86\u5b8c\u5584\u7684\u6587\u6863\uff0c\u5305\u62ec\u8bbe\u8ba1\u6587\u7a3f\u4ee5\u53ca\u7528\u6237\u624b\u518c\u3002 \u9002\u914dJavaScript\u4ee5\u53caTypeScript\u5f00\u53d1\uff0c\u5bf9\u4e8e\u6846\u67b6\u7684\u4efb\u4f55\u914d\u7f6e\u90fd\u53ef\u4ee5\u5728\u6587\u4ef6\u7cfb\u7edf\u4e2d\u627e\u5230\u89e3\u7b54\u3002',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u8be6\u7ec6\u5168\u9762\uff0cUI \u6846\u67b6\u63d0\u4f9b\u7528\u6237\u624b\u518c\u4ee5\u53ca\u8bbe\u8ba1\u6587\u7a3f\u3002',
                      ),
                      x().createElement(
                        Ut,
                        null,
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u539f\u578b\u5bfc\u51fa\uff0cLove Letter UI \u539f\u578b\u901a\u8fc7 Figma \u8bbe\u8ba1\u800c\u6765\uff0c\u6709\u5b8c\u5584\u7684\u8bbe\u8ba1\u652f\u6491\u3002',
                      ),
                      x().createElement(
                        Ut,
                        { style: { marginBottom: '2em' } },
                        x().createElement(Ft, {
                          name: 'check',
                          color: 'green',
                        }),
                        '\u63a5\u53e3\u4e30\u5bcc\uff0c\u5f00\u653e\u4e86\u4e30\u5bcc\u7684\u63a5\u5165\uff0c\u652f\u6301\u540e\u7eed\u5f00\u53d1\u8005\u63a5\u5165\u8fdb\u884c\u4e8c\u6b21\u5c01\u88c5\u3002',
                      ),
                      x().createElement(
                        me.Z,
                        {
                          primary: !0,
                          onClick: () => {
                            window.open(
                              '/#/~docs/lole\u6587\u6863/lole_of_react',
                            );
                          },
                        },
                        '\u67e5\u770b\u7528\u6237\u624b\u518c',
                        x().createElement(ie.Z, { name: 'arrow right' }),
                      ),
                    ),
                  ),
                  x().createElement(
                    se.Z.Column,
                    { width: 8 },
                    x().createElement(W.Z, {
                      centered: !0,
                      size: 'large',
                      src: kt(),
                      alt: 'AntV lole3\u7f3a\u7701',
                    }),
                  ),
                ),
              ),
            ),
          ),
        Yt = Lt,
        Pt = n(60416),
        Dt = n(6172),
        Wt = n.n(Dt),
        Mt = n(20609),
        Ht = n.n(Mt),
        Qt = n(30103),
        Tt = n.n(Qt),
        Vt = n(20085),
        St = n.n(Vt),
        Gt = n(50844),
        jt = n.n(Gt),
        zt = F.ZP.h1(
          We ||
            (We = (0, Z.Z)([
              '\n  color: ',
              ';\n  font-size: ',
              ';\n  font-weight: ',
              ';\n',
            ])),
          (e) => e.$color,
          (e) => e.$fontSize,
          (e) => e.$fontWeight,
        ),
        Xt = F.ZP.p(
          Me ||
            (Me = (0, Z.Z)([
              '\n  margin-top: 2em;\n  margin-bottom: 3em;\n  color: rgba(0, 0, 0, 0.5);\n  font-size: 15px;\n',
            ])),
        ),
        Nt = (0, F.ZP)(Ee.Z)(
          He ||
            (He = (0, Z.Z)([
              '\n  padding-left: 5em !important;\n  background-color: ',
              '!important;\n',
            ])),
          (e) => (e.$bgColor ? e.$bgColor : void 0),
        ),
        Ot = (0, F.ZP)(W.Z)(
          Qe ||
            (Qe = (0, Z.Z)([
              '\n  width: 100% !important;\n  height: 400px !important;\n',
            ])),
        ),
        qt = (0, F.ZP)(re.Z)(
          Te ||
            (Te = (0, Z.Z)([
              '\n  background-color: ',
              '!important;\n  height: 400px !important;\n  width: 370px !important;\n  border: none !important;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;\n  border-radius: 12px !important;\n  color: ',
              '!important;\n  margin: auto !important;\n',
            ])),
          (e) => e.$bgColor,
          (e) => e.$color,
        ),
        Kt = (0, F.ZP)(W.Z)(
          Ve ||
            (Ve = (0, Z.Z)([
              '\n  margin-top: 4em !important;\n  margin-bottom: 4em !important;\n  padding-left: 2em !important;\n',
            ])),
        ),
        Jt = (0, F.ZP)(W.Z)(
          Se ||
            (Se = (0, Z.Z)([
              '\n  width: 400px !important;\n  height: 450px !important;\n  box-shadow: 0 8px 24px rgba(163, 177, 191, 0.35) !important;\n  margin: auto !important;\n  object-fit: cover !important;\n  object-position: top !important;\n  transition: object-position 2s !important;\n  &:hover {\n    object-position: bottom !important;\n  }\n',
            ])),
        ),
        _t = (e) => {
          var t = (0, h.useState)(''),
            n = (0, u.Z)(t, 2),
            l = (n[0], n[1]),
            a = (e, t) => {
              l(t.value);
            };
          return x().createElement(
            x().Fragment,
            null,
            x().createElement(
              'div',
              { style: { width: '100%', marginTop: '25px' } },
              x().createElement(
                A.Z.Title,
                { level: 3 },
                'React \u6a21\u677f\u642d\u5efa',
              ),
              x().createElement(
                A.Z.Paragraph,
                { style: { color: 'gray' } },
                '\u5feb\u901f\u642d\u5efa\u52a8\u6548\u5b98\u7f51',
              ),
              x().createElement(_e, {
                url: 'https://github.com/XIYExi/Envelope',
              }),
              x().createElement(g.Z, null),
            ),
            x().createElement(
              se.Z,
              null,
              x().createElement(
                se.Z.Row,
                null,
                x().createElement(
                  se.Z.Column,
                  { width: 10 },
                  x().createElement(
                    Nt,
                    { basic: !0 },
                    x().createElement(
                      zt,
                      {
                        $fontSize: '35px',
                        $fontWeight: 550,
                        $color: 'black',
                        style: { marginBottom: '5px', marginTop: '1em' },
                      },
                      '\u6a21\u677f\u7f51\u9875\u5f00\u53d1',
                    ),
                    x().createElement(
                      zt,
                      { $fontSize: '26px', $fontWeight: 500, $color: 'black' },
                      'Ink \u539f\u751f\u5f15\u64ce,',
                      x().createElement('br', null),
                      'React, \u52a8\u6548, \u7b80\u5355\u64cd\u4f5c, \u6e90\u7801\u5bfc\u51fa',
                    ),
                    x().createElement(
                      Xt,
                      { style: { width: '640px' } },
                      '\u6a21\u677f\u7f16\u8f91\u5668\u57fa\u4e8e Ink \u539f\u751f\u5f15\u64ce\uff0c\u7ee7\u7eed\u53c2\u7167 JSON Schema \u89c4\u8303\u6784\u5efa\u4f4e\u4ee3\u7801\u9879\u76ee\uff0c \u4e3a\u4e86\u5f25\u8865\u539f\u751f\u5f15\u64ce\u5728\u5927\u5c4f\u5e55\u8bbe\u5907\u4e0a\u9057\u7559\u7684\u7f3a\u9677\uff0c\u6211\u4eec\u8bbe\u8ba1\u4e86\u6a21\u5757\u5316\u7f51\u9875\u6a21\u677f\u7f16\u8f91\u5668\u3002 Ink Template Engine \u62e5\u6709\u4e30\u5bcc\u7684\u5404\u7c7b\u9996\u9875\u6a21\u677f\uff0c \u4e0b\u8f7d\u6a21\u677f\u4ee3\u7801\u5305\uff0c\u5373\u53ef\u5feb\u901f\u4f7f\u7528\uff0c \u4e5f\u53ef\u4ee5\u4f7f\u7528\u9996\u9875\u7f16\u8f91\u5668\uff0c\u5feb\u901f\u642d\u5efa\u4e00\u4e2a\u5c5e\u4e8e\u4f60\u7684\u4e13\u5c5e\u9996\u9875\u3002',
                    ),
                    x().createElement(
                      Pt.Z,
                      {
                        type: 'text',
                        placeholder:
                          '\u8f93\u5165\u90ae\u7bb1\u83b7\u53d6\u6fc0\u6d3b\u7801...',
                        action: !0,
                        onChange: (e, t) => a(e, t),
                      },
                      x().createElement('input', { style: { width: '380px' } }),
                      x().createElement(
                        me.Z,
                        { primary: !0, type: 'submit', onClick: (e, t) => {} },
                        '\u514d\u8d39\u4f7f\u7528',
                      ),
                    ),
                    x().createElement(
                      Xt,
                      {
                        style: {
                          marginTop: '0.5em',
                          color: 'rgba(255,75,75,0.8)',
                          fontSize: '14px',
                        },
                      },
                      '* \u6a21\u677f\u7f16\u8f91\u5668\u4ecd\u5728\u6d4b\u8bd5\u4e2d\uff0c\u901a\u8fc7\u90ae\u7bb1\u9a8c\u8bc1\u5373\u53ef\u514d\u8d39\u4f7f\u7528',
                    ),
                  ),
                ),
                x().createElement(
                  se.Z.Column,
                  { width: 6 },
                  x().createElement(W.Z, {
                    size: 'big',
                    floated: 'right',
                    src: Wt(),
                  }),
                ),
              ),
            ),
            x().createElement('div', { style: { marginTop: '5em' } }),
            x().createElement(
              Nt,
              { $bgColor: '#004050' },
              x().createElement(
                se.Z,
                null,
                x().createElement(
                  se.Z.Row,
                  { columns: 'equal' },
                  x().createElement(
                    se.Z.Column,
                    null,
                    x().createElement(
                      zt,
                      {
                        $fontWeight: 450,
                        $color: 'white',
                        $fontSize: '40px',
                        style: { paddingTop: '2.2em', paddingLeft: '2.45em' },
                      },
                      '\u4e09\u5927\u7279\u6027',
                    ),
                  ),
                  x().createElement(
                    se.Z.Column,
                    null,
                    x().createElement(
                      Xt,
                      {
                        style: {
                          marginTop: '5em',
                          marginBottom: '5em',
                          color: 'white',
                          opacity: 0.7,
                          height: '100px',
                          width: '400px',
                        },
                      },
                      '\u6240\u6709\u7684\u6a21\u5757\u4e0e\u6a21\u677f\u90fd\u57fa\u4e8e Ant Design \u4ee5\u53ca Ink \u5185\u90e8\u7ea6\u5b9a\u7684\u8bbe\u8ba1\u89c4\u8303\u8bbe\u8ba1\uff0c\u4f60\u53ef\u4ee5\u76f4\u63a5\u4e0b\u8f7d\u6211\u4eec\u7684\u6a21\u677f\u4ee5\u53ca\u6e90\u7801\uff0c \u4e5f\u53ef\u4ee5\u4f7f\u7528\u6211\u4eec\u7684\u7f16\u8f91\u5668\uff0c\u5feb\u901f\u642d\u5efa\u4e00\u4e2a\u5c5e\u4e8e\u4f60\u7684\u4e13\u5c5e\u9996\u9875\u3002',
                    ),
                  ),
                ),
                x().createElement(
                  se.Z.Row,
                  { columns: 'equal' },
                  x().createElement(
                    se.Z.Column,
                    null,
                    x().createElement(
                      qt,
                      { raised: !0, $color: 'black', $bgColor: '#FFE377' },
                      x().createElement(
                        re.Z.Content,
                        null,
                        x().createElement(Kt, { size: 'tiny', src: Ht() }),
                        x().createElement(g.Z, null),
                        x().createElement(
                          re.Z.Header,
                          null,
                          x().createElement(
                            'div',
                            {
                              style: {
                                paddingLeft: '0.9em',
                                fontSize: '20px',
                                marginBottom: '16px',
                              },
                            },
                            '\u8bbe\u8ba1\u6307\u5f15',
                          ),
                        ),
                        x().createElement(
                          re.Z.Description,
                          null,
                          x().createElement(
                            'div',
                            { style: { paddingLeft: '1em' } },
                            '\u63d0\u4f9b\u8be6\u7ec6\u7684\u8bbe\u8ba1\u6307\u5357\uff0c\u8bb2\u89e3\u52a8\u6548\u6a21\u677f\u5b9e\u73b0\u601d\u8def\uff0c\u91c7\u7528\u5185\u7f6edumi\u90e8\u7f72\u6587\u6863\uff0c\u5feb\u6377\u8bbf\u95ee\u3002 \u6211\u4eec\u5c06\u6301\u7eed\u8fed\u4ee3\uff0c\u9010\u6b65\u6c89\u6dc0\u548c\u603b\u7ed3\u51fa\u66f4\u591a\u9996\u9875\u6a21\u5757\u7684\u4ee3\u7801\u5b9e\u73b0\uff0c\u9610\u8ff0\u9996\u9875(Ink page)\u7684\u6700\u4f73\u5b9e\u8df5\uff0c \u4e5f\u5341\u5206\u671f\u5f85\u4f60\u7684\u53c2\u4e0e\u548c\u5171\u5efa\u3002',
                          ),
                        ),
                      ),
                    ),
                  ),
                  x().createElement(
                    se.Z.Column,
                    null,
                    x().createElement(
                      qt,
                      {
                        raised: !0,
                        $bgColor: 'rgba(255,255,255,0.04)',
                        $color: 'white',
                      },
                      x().createElement(
                        re.Z.Content,
                        null,
                        x().createElement(Kt, { size: 'tiny', src: Tt() }),
                        x().createElement(g.Z, null),
                        x().createElement(
                          re.Z.Header,
                          null,
                          x().createElement(
                            'div',
                            {
                              style: {
                                paddingLeft: '0.9em',
                                fontSize: '20px',
                                marginBottom: '16px',
                                color: 'white',
                              },
                            },
                            'Figma \u8d44\u6e90\u5305',
                          ),
                        ),
                        x().createElement(
                          re.Z.Description,
                          null,
                          x().createElement(
                            'div',
                            { style: { paddingLeft: '1em', color: 'white' } },
                            'Ink \u6a21\u677f\u8bbe\u8ba1\u5668\u6240\u6709\u6a21\u677f\u5747\u6765\u81ea Figma \u8bbe\u8ba1\u7a3f\uff0c\u6211\u4eec\u63d0\u4f9b\u4e86\u5927\u91cf\u7684\u8bbe\u8ba1\u624b\u7a3f\u4f9b\u53c2\u8003\u3001\u4e0b\u8f7d\u3002 \u4efb\u4f55\u4eba\u90fd\u53ef\u4ee5\u5728\u6211\u4eec\u7684\u5b98\u7f51\u4e0a\u4e0b\u8f7d\u6211\u4eec\u7684\u8bbe\u8ba1\u8d44\u6e90\uff0c\u6b64\u5916\u66f4\u591a\u7684\u8bbe\u8ba1\u8d44\u6e90\u6b63\u5728\u6574\u7406\u548c\u5b8c\u5584\u4e2d\u3002',
                          ),
                        ),
                      ),
                    ),
                  ),
                  x().createElement(
                    se.Z.Column,
                    null,
                    x().createElement(
                      qt,
                      {
                        raised: !0,
                        $bgColor: 'rgba(255,255,255,0.04)',
                        $color: 'white',
                      },
                      x().createElement(
                        re.Z.Content,
                        null,
                        x().createElement(Kt, { size: 'tiny', src: St() }),
                        x().createElement(g.Z, null),
                        x().createElement(
                          re.Z.Header,
                          null,
                          x().createElement(
                            'div',
                            {
                              style: {
                                paddingLeft: '0.9em',
                                fontSize: '20px',
                                marginBottom: '16px',
                                color: 'white',
                              },
                            },
                            '\u54cd\u5e94\u5f0f\u5e03\u5c40',
                          ),
                        ),
                        x().createElement(
                          re.Z.Description,
                          null,
                          x().createElement(
                            'div',
                            { style: { paddingLeft: '1em', color: 'white' } },
                            'Ink \u6a21\u677f\u7f16\u8f91\u5668\u5b8c\u7f8e\u89e3\u51b3\u4e86 H5 \u5f15\u64ce\u4e2d\u65e0\u6cd5\u9002\u914d\u54cd\u5e94\u5f0f\u7684\u95ee\u9898\uff0c\u91c7\u7528 Ant Design \u5143\u4ef6\u5e93\u4ee5\u53ca React Animate \u52a8\u753b\u5e93\uff0c\u5236\u4f5c\u5177\u6709\u52a8\u6548\u52a8\u753b\u7684\u54cd\u5e94\u5f0f\u7f51\u7ad9\u9996\u9875\u3002\u76ee\u524d\u8bbe\u8ba1\u5668\u6a21\u677f\u91c7\u752824\u6805\u683c\u5e03\u5c40(Grid)\uff0c \u540e\u7eed\u5c06\u6dfb\u52a0Layout\u5e03\u5c40(\u7f51\u7ad9\u9aa8\u67b6)\u3002',
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            x().createElement('div', { style: { marginTop: '5em' } }),
            x().createElement(
              Ee.Z,
              { basic: !0 },
              x().createElement(
                zt,
                {
                  $color: 'black',
                  style: { textAlign: 'center', marginBottom: '4em' },
                  $fontSize: '32px',
                  $fontWeight: 450,
                },
                '\u4e30\u5bcc\u7684\u6a21\u677f',
              ),
              x().createElement(
                se.Z,
                null,
                x().createElement(
                  se.Z.Row,
                  { columns: '4' },
                  new Array(8)
                    .fill(0)
                    .map((e, t) =>
                      x().createElement(
                        se.Z.Column,
                        null,
                        x().createElement(
                          'div',
                          {
                            style: {
                              marginTop: '1.5em',
                              marginBottom: '1.5em',
                            },
                          },
                          x().createElement(Jt, {
                            src: 'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*NLz5QayvKkkAAAAAAAAAAABkARQnAQ',
                          }),
                          x().createElement(
                            'div',
                            {
                              style: {
                                textAlign: 'center',
                                marginTop: '14px',
                                fontSize: '18px',
                                color: 'rgba(0,0,0,0.5)',
                              },
                            },
                            '\u4e2d\u540e\u53f0\u6a21\u677f',
                          ),
                        ),
                      ),
                    ),
                ),
              ),
            ),
            x().createElement('div', { style: { marginTop: '8em' } }),
            x().createElement(
              'div',
              { style: { position: 'relative' } },
              x().createElement(Ot, { src: jt() }),
              x().createElement(
                'div',
                {
                  style: {
                    position: 'absolute',
                    textAlign: 'left',
                    marginTop: '-20em',
                    marginLeft: '8em',
                  },
                },
                x().createElement(
                  zt,
                  {
                    $color: 'white',
                    $fontSize: '28px',
                    $fontWeight: 450,
                    style: { marginBottom: '2.5em' },
                  },
                  '\u7acb\u523b\u4f7f\u7528 Ink page \u7f16\u8f91\u5668\uff0c',
                  x().createElement('br', null),
                  '\u4f7f\u7528\u98ce\u683c\u8fe5\u5f02\u7684\u6a21\u677f\u5feb\u901f\u6784\u5efa\u4f60\u7684\u7f51\u9875',
                ),
                x().createElement(
                  me.Z,
                  { primary: !0 },
                  '\u7acb\u523b\u8bbf\u95ee',
                  x().createElement(ie.Z, { name: 'arrow right' }),
                ),
              ),
            ),
          );
        },
        $t = _t,
        en = n(70182),
        tn = F.ZP.div(
          Ge ||
            (Ge = (0, Z.Z)([
              '\n  min-height: 200px;\n  margin-top: 16px;\n  padding-top: 40px;\n  padding-bottom: 40px;\n  text-align: center;\n  background-color: #fafafa;\n  border: 1px dashed #e9e9e9;\n  border-radius: 2px;\n',
            ])),
        ),
        nn = () => {
          var e = (e) => {
              m(''),
                'H5' === e
                  ? w.m8.push('/inner/editor?tid=123456&ui='.concat(s))
                  : 'PC' === e
                  ? window.open('http://v6.dooring.cn/beta')
                  : w.m8.push('/ide');
            },
            t = () => {
              window.open(
                'https://lowcode-engine.cn/demo/demo-general/index.html',
              );
            },
            n = () => {
              w.m8.push('/inner/antv');
            },
            l = (0, h.useState)('home'),
            a = (0, u.Z)(l, 2),
            r = a[0],
            m = a[1],
            c = (e) => {
              m(e.key);
            },
            i = (0, h.useState)('antd'),
            o = (0, u.Z)(i, 2),
            s = o[0],
            Z = o[1],
            b = (e) => {
              console.log(e), Z(e);
            },
            F = (0, h.useState)(0),
            P = (0, u.Z)(F, 2),
            D = P[0],
            W = P[1],
            M = () => {
              W(D + 1);
            },
            H = () => {
              W(D - 1);
            },
            Q = (0, h.useState)('empty'),
            T = (0, u.Z)(Q, 2),
            V = T[0],
            S = T[1],
            G = (e) => {
              console.log(e), S(e);
            };
          return x().createElement(
            'div',
            { className: v().homeWrap },
            x().createElement(
              'div',
              { className: v().leftArea },
              x().createElement(
                'div',
                { style: { padding: '0 40px' } },
                x().createElement(
                  L,
                  {
                    level: 3,
                    copyable: !1,
                    onClick: () => {
                      w.m8.push('/');
                    },
                  },
                  'Ink',
                ),
              ),
              x().createElement(
                'div',
                null,
                x().createElement(
                  d.Z,
                  {
                    onClick: c,
                    mode: 'inline',
                    selectedKeys: [r],
                    inlineCollapsed: !1,
                  },
                  x().createElement(d.Z.Item, { key: 'home' }, '\u8d77\u6b65'),
                  x().createElement(
                    d.Z.SubMenu,
                    {
                      key: 'lowcode',
                      title: '\u4f4e\u4ee3\u7801\u5f00\u53d1',
                      icon: x().createElement(y.Z, null),
                    },
                    x().createElement(
                      d.Z.Item,
                      { key: 'absolute', icon: x().createElement(Y.Z, null) },
                      '\u624b\u673aH5\u642d\u5efa',
                    ),
                    x().createElement(
                      d.Z.Item,
                      { key: 'grid', icon: x().createElement(C.Z, null) },
                      '\u54cd\u5e94\u5f0f\u642d\u5efa',
                    ),
                    x().createElement(
                      d.Z.Item,
                      { key: 'html', icon: x().createElement(B.Z, null) },
                      'React\u6a21\u677f\u642d\u5efa',
                    ),
                    x().createElement(
                      d.Z.Item,
                      { key: 'antv', icon: x().createElement(B.Z, null) },
                      'AntV\u53ef\u89c6\u5316\u642d\u5efa',
                    ),
                  ),
                  x().createElement(
                    d.Z.SubMenu,
                    {
                      key: 'ui',
                      title: 'UI\u6587\u6863',
                      icon: x().createElement(f.Z, null),
                    },
                    x().createElement(
                      d.Z.Item,
                      { key: 'package', icon: x().createElement(B.Z, null) },
                      '\u5c01\u88c5\u5143\u4ef6\u6587\u6863',
                    ),
                    x().createElement(
                      d.Z.Item,
                      { key: 'lole', icon: x().createElement(B.Z, null) },
                      'Lole\u539f\u751f\u6587\u4ef6\u6587\u6863',
                    ),
                  ),
                  x().createElement(
                    d.Z.SubMenu,
                    {
                      key: 'doc',
                      title: '\u9879\u76ee\u6587\u6863',
                      icon: x().createElement(I.Z, null),
                    },
                    x().createElement(
                      d.Z.Item,
                      { key: 'user', icon: x().createElement(k.Z, null) },
                      '\u4f7f\u7528\u624b\u518c',
                    ),
                    x().createElement(
                      d.Z.Item,
                      { key: 'design', icon: x().createElement(R.Z, null) },
                      '\u8bbe\u8ba1\u6587\u6863',
                    ),
                  ),
                ),
              ),
            ),
            x().createElement(
              'div',
              { className: v().contentArea },
              'home' === r &&
                x().createElement(
                  x().Fragment,
                  null,
                  x().createElement(ze, null),
                ),
              'absolute' === r &&
                x().createElement(
                  x().Fragment,
                  null,
                  x().createElement(
                    'div',
                    { style: { width: '100%', marginTop: '25px' } },
                    x().createElement(
                      A.Z.Title,
                      { level: 3 },
                      'Ink H5 \u914d\u7f6e',
                    ),
                    x().createElement(
                      A.Z.Paragraph,
                      { style: { color: 'gray' } },
                      '\u901a\u8fc7\u7b80\u5355\u914d\u7f6e\u542f\u52a8\u7f16\u8f91\u5668',
                    ),
                    x().createElement(p.Z, {
                      style: {
                        float: 'right',
                        marginRight: '20px',
                        marginBottom: '10px',
                        width: '50px',
                        borderRadius: '8px',
                      },
                      icon: x().createElement(U.Z, null),
                      href: 'https://github.com/XIYExi/Envelope',
                    }),
                    x().createElement(g.Z, null),
                  ),
                  x().createElement(E.Z, {
                    current: D,
                    items: [
                      {
                        title: 'UI system',
                        description: '\u9009\u62e9UI\u7cfb\u7edf',
                      },
                      {
                        title: 'Template',
                        description: '\u9009\u62e9\u6a21\u677f',
                      },
                      {
                        title: 'Confirm',
                        description: '\u786e\u8ba4\u4fe1\u606f',
                      },
                    ],
                  }),
                  x().createElement(
                    tn,
                    null,
                    0 === D &&
                      x().createElement(K, { ui: s, chooseUI: b, nextStep: M }),
                    1 === D &&
                      x().createElement(ee, {
                        template: V,
                        chooseTemplate: G,
                        prevStep: H,
                        nextStep: M,
                      }),
                    2 === D &&
                      x().createElement(le, {
                        ui: s,
                        template: V,
                        done: () => e('H5'),
                        prev: H,
                      }),
                  ),
                ),
              'grid' === r &&
                x().createElement(
                  x().Fragment,
                  null,
                  x().createElement(mt, { gotoLowcodeEngine: t }),
                ),
              'html' === r &&
                x().createElement(
                  x().Fragment,
                  null,
                  x().createElement($t, null),
                ),
              'antv' === r &&
                x().createElement(
                  x().Fragment,
                  null,
                  x().createElement(wt, { gotoAntv: n }),
                ),
              'package' === r &&
                x().createElement(
                  x().Fragment,
                  null,
                  x().createElement(Zt, null),
                ),
              'lole' === r &&
                x().createElement(
                  x().Fragment,
                  null,
                  x().createElement(Yt, null),
                ),
              x().createElement(g.Z, { style: { marginTop: '7em' } }),
              x().createElement(en.Z, null),
            ),
          );
        },
        ln = nn;
    },
    1959: function (e, t, n) {
      e.exports = n.p + 'static/Progress.abbc69b1.svg';
    },
    27553: function (e, t, n) {
      e.exports = n.p + 'static/antd.1c5794ef.svg';
    },
    11867: function (e, t, n) {
      e.exports = n.p + 'static/antdlogo.51586d6b.svg';
    },
    93048: function (e, t, n) {
      e.exports = n.p + 'static/lole.9c0486b0.svg';
    },
    71869: function (e, t, n) {
      e.exports = n.p + 'static/sem.a498b3df.svg';
    },
    49504: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAFd0lEQVR4Xu2cWSitURTHl8gQMhOhjA+U8iAkefPgQUlKJFMZohQyDxmjRCQZ3kh5kYwvvJCQOUM8mSPzeAyZbmuXkzO4zr2556y6a9ftq/Nt3/ff/9/5r7W3brTe39/fgQcZB7QYCBkWQggDocWDgRDjwUAYCDUHiOnhHsJAiDlATA4nhIEQc4CYHE4IAyHmADE5nBAGQswBYnI4IQyEmAPE5HBCGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgcTggDIeYAMTlaEomE/28vISgMhBAMlMJAGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgcTggDIeYAMTmcEAZCzAFicjSWkKGhIfDw8ABnZ2dhyfb2NkxNTUF0dLSCRcPDwxAQEADGxsbw+vqqcF9XV1fhs62tLZiYmIC4uDiVLL+5uYGenh5ISkpSaf6/mqQxICcnJ9DW1gbFxcVibdXV1RAREQFubm4ya11aWgIEUlRUBP39/TA5OangRWZmJtja2ip8Xl5eDpGRkeDu7v6tfxcXF1BXVyd0aHKoHcje3h7U1taCpaUl4B8iur29FevX1tYGQ0NDODs7g9zcXHB0dASE0dnZKaCZm5v/1qfd3V1ob2+XmYPPfnh4AGtra5nPMQULCwviXR/j8fERVldXwcfHR2aun58feHl5qY2R2oFgaRoYGICMjAyxyJGREXENCQkR18bGRggNDRUm4rc1OzsbME2YjMTExC+NwVJ2d3cH+/v7gOUwNTVVZm59fb1Ii52dHRgZGYl5T09PYs7l5aVIIQI0MTGBqKgo6c9aWVl9+2X4SVoaAVJVVQUODg5iHefn5+JqYWEhrmhUYWEhODk5wcvLi/hXUFAAWJYwAVdXV2IeAri+vhZmeXp6QnJystSX0tJSSEtLkybj+PgYWlpaoKysTKl3eC8oKAi6u7shMDAQTE1Nwd/f/yd9VvlZGgGiSkIQCDbampoaUb5SUlJkFoU1v6GhASoqKhQWOzs7C9PT09IUtra2gre3N/j6+irMXV9fh5mZGQgLCxM9BJ+HvScvLw8MDAxUNvKnJmoESGVlpbQJY7nAYWZmJq5HR0eigSOEnJwcsQtDYxISEhSAYBnCZykbCMHe3h5sbGxgfHxclD75cXBwAM3NzZCfny8S99HU19bWoLe3F7KyskR5U+dQOxD5xcn3kM/3Dw8PRf9YXFxUCuSrhOAzsNSVlJSIvoK9SN7Yzc1N6OjoEKUNyyUmDnd9CAfHxsYG9PX1iaR8fFnUAUatQFZWVqCrq0tmXdgHcGAz/TxiYmLE7mZ5efmvgIyNjcHo6KjYuWFKYmNjQV9fX7xCIpGIPoVmI+y5uTl4fn4G3AG6uLiIOeHh4WIevv9zf/rXUNQKRNlifpcQnP8VENyy4o5Mvofg1nVwcFA0+/j4eNDT0xM7OYSDuzds2jo6OoDb3A9A+J7/9hzyJyVLGZCdnR1R33Hn5OrqKj1Z48m8qalJHCyDg4MVDphoOG5t5+fnIT09Xen9//JgKA9EvqnL38eD3f39vXRbjL3h9PRUfMvxjPAx3t7exLzvmjDOwV+14M9/HtjUETKeUzQ5NF6yNLl4iu9mIMSoMBAGQswBYnI4IQyEmAPE5HBCGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgc/mtADISYA8TkcEIYCDEHiMnhhDAQYg4Qk8MJYSDEHCAmhxPCQIg5QEwOJ4SBEHOAmBxOCAMh5gAxOZwQBkLMAWJyOCEMhJgDxORwQhgIMQeIyeGEMBBiDhCTwwlhIMQcICaHE8JAiDlATA4nhIEQc4CYnF8Rm3XaxTKrBgAAAABJRU5ErkJggg==';
    },
    89301: function (e, t, n) {
      e.exports = n.p + 'static/devices.ba7484e4.png';
    },
    7300: function (e, t, n) {
      e.exports = n.p + 'static/lole1.654561df.png';
    },
    19394: function (e, t, n) {
      e.exports = n.p + 'static/lole2.3ebd8115.png';
    },
    54206: function (e, t, n) {
      e.exports = n.p + 'static/lole3.5205a5cb.png';
    },
    20995: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
    13929: function (e, t, n) {
      e.exports = n.p + 'static/lowcodeEngineBar.aab290b3.png';
    },
    58741: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAMFBMVEU1vbKi29bi8/Jcxr17z8fE6OT///+J08zY8O2t39psysKW19Hs9/a549/O7OkAAAA1s34QAAAACXBIWXMAAAsTAAALEwEAmpwYAAACUUlEQVRoBe2YvWsUURTFX3bHDzMqih+VhdWAijCFCBaBLRYFSaEIqU3cnIzRLKmsRCxkbQXD2EgIgqksUogoREhABoONWFinSuM/IYTBNzP3vfWdeWDj+5UD5+Tlztl77xv13xAIBAJR/9Or/lpbdffzCPt8XWmln0rwh+wUr/+IGr9Y/SYabHP6NxA8YPRHYOALYZDAxHdn/TsYeeiaiEkhJctwFTZucRWQLDnpj8HKgpPBdVh54WRQWPVDJ30MK+edDI7CilsOHlUUF973rtxYLagSqj2tf1kG6zX2OeFmoPUX681h3rEN6uhXnk6XJaR+yYPq47NAqsgcbtU67Gig3Dhs+eVMbNAGMrf8CfwMtnwNFtoZHGejL3PgeYRD0DxrNZNR4RIplg1pKeUNclTJZADZqXCHNTiABs/pKjbZpovQZJ4rZQeCbJkxmKRmkr2xe7yMGL5n+GDcT3pEFYzz9T7ZFCRPCYdpGJjj08SPd8053yOoJ+SqKZmCYKAo4kJkgb3x7KEB25+6P0UUPC8u9xTNtVohZhVPPJKrJkeUcK9BMgENKZXrd+p7hJ5qReFrkJMGJ0Wf5gxi7PoZrIsOnFOvsSs384Qy6OjQiw0+c79xfKs8OUjMBr1g7JjmzCIz14YbZU1mwKy/ETSXT9+M+mcKbsKuYxwtb95MDTsYx92/G8xgHMue/8GQuW+0ns457KTUzVWySK03kjnXhvoYZnb91hvMcj3Uc+HeFPqM7Odv5d8niX6I75m0xWpSnv72msdX4ZV+T/0jAoFAIPAbiNmfkNF0IpoAAAAASUVORK5CYII=';
    },
    6172: function (e, t, n) {
      e.exports = n.p + 'static/template.5ffa5eb4.png';
    },
    20609: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
    30103: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAB4CAYAAAAOhjujAAADMklEQVR4Xu3a4W3bMBRFYY/gDeIROoJH6AbJBu4G7gbtBhnFI2QEjZARbknIP+RXm7RjXUWUzgcQKFA1ZMCD59jNZjMhSdu0dqxvXdt4L83K30xah7ROaX0Kc5Hv4qT+bnbx3mYvHXp//gbQhne1EJr6ifX38uxoyB/N9SVU/et7d3leNKjT3KZZPtD5YFiGTnOJLB/kfCAsS6c5RCZ+mF+yU7zvSaUDvMUTYXF+xXufjHhpXIP8mdn07yzF9FqTQ7x/u7TpRzwFFmvan8XUv3PEukz3Mpk2+xl3x+K9xg5s0mbHuDsW7xg7sFH/f1ZYl/fYgU3eLO6OxSMwWBEYrAgMVgQGKwKDFYHBisBgRWCwIjBYERisCAxWBAYrAoMVgcGKwGBFYLAiMFgRGKwIDFYEBisCgxWBwYrAYEVgsCIwWBEYrAgMVgQGKwKDFYHBisBgRWCwIjBYERisCAxWBAYrAoMVgcGKwGBFYLAiMFgRGKwIDFYEBisCgxWBwYrAYEVgsCIwWBEYrAgMVgQGKwKDFYHBisBgRWCwIjBYERisCAxWBAYrAoPVpIF1cXcsXhc7sEgbvcWdsRqvsYfRiem1Zl1a29jEaFSeXl1aJ9YiVqfbjrGL0ai88S4+jzblu4yXO/ApxxRTeXpN9w4Dk8h3Gi95YPwpJqbXqqQ73aqfVteMO8XE9FqldLfHeNkD400xMb1WSVNMMTG9Vk3uKSam16rJOcXE9MLGOMXE9MLGNMXE9MKAxp5iYnphQGNOMTG9cIXGmmJieuEKjTHFxPRCgZ6dYmJ6oUDPTDExvXAHfXWKiemFO+grU0xMLzxAj0wx9UV24aGh3cU/aEw6/2/1v0A3p3WI52yJHpli6i/gluanl/rfM5+bUzxna3TPFNPCp1cmArPQPVNM5V/wb356ZSIwG5Wn2EstsB/xC7ZIBGajcj/VwF7iF2yRCMxGtX5Ue2AB0vdx0P/v4r573f5AsiGq9aPaA0CBav2o9gBQoFo/qj0AFKjWj2oPAAWq9aPaA0CBav2o/MBe/d+zWLfWXrdVAwOeQWCwIjBYERisCAxWBAar/mOu/AcWa+yV2/oH/yCoHIvOajoAAAAASUVORK5CYII=';
    },
    20085: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACVCAYAAABRorhPAAAEo0lEQVR4Xu3cgXHbNhhA4YyQETxCNugK3SDdoN0g3aTdoCNkhIyQETrCq3ACapumSFDCT4Hg++54uUhkROJ/vouZmJ8+DQz4zryv032lKhiVWsOo1BpGpdYwKrWGUak1jEqtYVRqDaNSaxiVWsOo1BpGdUyXAf152T5PX+8BB4vqcl6/9Xpuu7kswN95SD/oMCwOFBXXoLo9v13wGlTRXVgcJCreB1V0dY7h+BhU0VVYHCAq5oMqujnPUJcL/Ta98oluwqLzqFgOqvgyPW44l4v8zDWcJV2ERcdRURfUt+lxw+IgYdFpVBjUPA4QFh1GhUEto/Ow6CwqDKoOHYdFR1FhUNvQaVh0EhUGdR86DIsOosKgHkNnYXEd6LeZbZd7P/nz1xjUGjoL61kwqLY4eVgYVAxOGhYGFYuThUVdUL9Pj9NG1IU1xFfu5Tp+Ti9sYrfvOofHclh/Tfc/qsu1vHA7LINqjfmwhgmqYD4sg4rC+7CGC6rgfVgGFS2HNcTfoZbksAxKkiRJkiRJkiTpFfDr9DXpblwf0pYM+w/a2tGboArD0v1mgioMS9txO6jCsFSP9aAKw9I66oMqDEu3sT2owrD0EfcHVRiWXrEe1M/L9kv+dYlhqTqol7zvS/79EsO6B9eFjdx2+TFvNgT15hjDijBdwQDhP47FHUEV6fX8/hLD2mK6egFCo+KBoIr0ft5viWHVmq5cgLCoaBBUkfbL+y8xrBrTVQsQEhUNgyrS/vm4JYa1ZrpiAZpHRUBQRTouH7/EsJZwvWcTub1MP/MRlz/vD5b9y4OfmY7HsM6DnQZO3ef8wyBPATw96ga+V1jDPF7y9KgbuGFpG+oGbljahrqBG5a2oW7ghqVtqBt4q7DSbYslhjUKdgiLugfwJ4Y1CgLDoj6owrBGQUBYbA+qMKxR0DAs7g+qMKxR0CAsHg+qMKxR8EBYtAuqMKxRcEdYtA+qMKxRsCEs4oIqDGsU1IX1ffpCEMMaBXVh7cWwRoFhKQKGpQgY1jh6WjwM6/i4frue/uvIl+l7z4JhHRfv7/8Y1m2GVYP5G4qGdZthLWE+qMKwbjOsOSwHVXydHvdMGFa/OGBQBYbVHw4cVIFh9YMBgiowrOdj/aksySGCKjCs52H9uVHJoYIqMKz9MXBQBYa1H04QVIFhxeNEQRUYVhxOGFSBYbXHiYMqMKx2MKj/YViPY8D7UI/CsB7D+gKeKqiC9XXZ01BhnTKogtvr8gxDhHXqoIqZdXmmQ4dlUG+8WZceHDKsY53wTjAsRcCwFAHDUgQMSxEwLEXAsBQBw1IEDEsRMCxFwLAUAcNSBAxLETAsRcCwFAHDUgQMSxEwLEXAsBQBw1IEDEsRMCxFwLAUAcNSBAxLETAsRcCwFCENMg+0B4Y1ijTIPNBnM6qRpGHmoT6LQY0oDTUPd28GNbI03DzkvRjUGaQh52FHM6gzScPOQ49iUGeUhp6H35pBnVkafo6gFYNS07AMSq9SDDmKexmUPkpR5Di2MijdluLIkdQyKK1LkeRY1hiU6qVYcjS3GJS2S9HkeKYMSvdL8eSIDErtvAnLoNRODqtJUP8BkY3l4F8ZFLkAAAAASUVORK5CYII=';
    },
    50844: function (e, t, n) {
      e.exports = n.p + 'static/templatelogobg.c8b1de93.png';
    },
  },
]);
