(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9585],
  {
    61579: function (e) {
      e.exports = {
        header: 'header___3nQEM',
        logoArea: 'logoArea___1HF6s',
        backBtn: 'backBtn___3hmXU',
        logo: 'logo___1RuC0',
        controlArea: 'controlArea___4dbLx',
        btnArea: 'btnArea___3HbPX',
      };
    },
    99405: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return De;
          },
          useStateRef: function () {
            return Oe;
          },
        });
      var n = a(12924),
        o = a.n(n),
        r = (a(57663), a(71577)),
        l = a(57337),
        i = a(6700),
        c = a(258),
        s = a(32779),
        d = a(72504),
        p = a(16130),
        u = a(99165),
        m = a(73218),
        g = a(19869),
        h = a(5405),
        f = {
          undo: { svg: 'undo', can: !1, title: '\u64a4\u9500' },
          redo: { svg: 'redo', can: !1, title: '\u91cd\u505a' },
          zoomin: { svg: 'zoomin', title: '\u653e\u5927' },
          zoomout: { svg: 'zoomout', title: '\u7f29\u5c0f' },
          copy: { svg: 'copy', title: '\u590d\u5236' },
          delete: { svg: 'dustbin', title: '\u5220\u9664', can: !1 },
          focus: { svg: 'focus', title: '\u5c45\u4e2d' },
          selectAll: { svg: 'select_all', title: '\u5168\u9009' },
        },
        b = { graph: null };
      function v(e) {
        b.graph = e;
      }
      function E() {
        return b.graph;
      }
      class y {
        static dispatchEvent(e, t) {
          if (!e) throw new Error('TypeEnum not found');
          window.dispatchEvent(
            new CustomEvent(e, { detail: t, bubbles: !1, cancelable: !0 }),
          );
        }
        static eventListener(e, t) {
          if (!e) throw new Error('TypeEnum not found');
          window.addEventListener(
            e,
            function (e) {
              t(e.detail);
            },
            !1,
          );
        }
      }
      var k = { REMOVE_BUTTON: 'custom-remove-button' },
        _ = {
          CELL_CLICK: '__antv_x6_custom_event_type_cell_click__',
          NODE_CLICK: '__antv_x6_custom_event_type_node_click__',
          DOUBLE_NODE_CLICK: '__antv_x6_custom_event_type_cell_double_click__',
          HELP: '__antv_x6_custom_event_type_help__',
          FREEZE_GRAPH: '__antv_x6_custom_event_type_freeze_graph__',
          RUNTIME_ERR: '__antv_x6_custom_event_type_runtime_err__',
        },
        C = { SELECTED: 'selected', UN_SELECTED: 'unselected' },
        x = {
          PANEL_AREA_SLOT: 'panel_area_slot',
          TOOLTIPS_SLOT: 'tooltips_slot',
        },
        N = { TRIGGER: 'TRIGGER', CONDITION: 'CONDITION', ACTION: 'ACTION' },
        T = (e) => {
          I(e);
        },
        w = { offset: 30, useLocalStorage: !0 };
      function I(e) {
        e.bindKey(['ctrl+c', 'command+c'], () => {
          var t = e.getSelectedCells();
          return t.length && e.copy(t), !1;
        }),
          e.bindKey(['ctrl+v', 'command+v'], () => {
            if (!e.isClipboardEmpty()) {
              var t = e.paste({ offset: 32 });
              e.cleanSelection(), e.select(t);
            }
            return !1;
          }),
          e.bindKey(['ctrl+a', 'command+a'], () => {
            var t = e.getCells();
            return t.length && e.select(t), !1;
          }),
          e.bindKey(
            ['delete', 'backspace'],
            () => {
              var t = e.getSelectedCells();
              return (
                t.length &&
                  (t.forEach((e) => {
                    e.removeTools();
                  }),
                  e.removeCells(t)),
                !1
              );
            },
            'keydown',
          ),
          e.bindKey(['ctrl+z', 'command+z'], () => {
            var t;
            return (
              null === e ||
                void 0 === e ||
                null === (t = e.history) ||
                void 0 === t ||
                t.undo(),
              !1
            );
          }),
          e.bindKey(['ctrl+y', 'shift+command+z'], () => {
            var t;
            return (
              null === e ||
                void 0 === e ||
                null === (t = e.history) ||
                void 0 === t ||
                t.redo(),
              !1
            );
          }),
          e.bindKey(
            'esc',
            () => (e.cleanSelection(), y.dispatchEvent(_.HELP, 'close'), !1),
          ),
          e.bindKey(['alt+h', 'option+h'], () => (y.dispatchEvent(_.HELP), !1)),
          e.bindKey(['alt+f', 'option+f'], () => (e.centerContent(), !1));
      }
      function z(e) {
        var t = null === e || void 0 === e ? void 0 : e.getSelectedCells();
        if ((t && t.length && e.copy(t, w), !e.isClipboardEmpty())) {
          var a = e.paste(w);
          e.cleanSelection(), e.select(a);
        }
      }
      function R(e) {
        var t = e.getSelectedCells();
        t.length &&
          (t.forEach((e) => {
            e.removeTools();
          }),
          e.removeCells(t));
      }
      function O(e) {
        var t = e.getCells();
        t.length && e.select(t);
      }
      var A = a(61579),
        D = a.n(A),
        L = a(71720),
        S = () => {
          var e = (0, n.useState)(f),
            t = (0, l.Z)(e, 2),
            a = t[0],
            b = (t[1], E()),
            v = (e) => {
              switch (e) {
                case 'undo':
                case 'redo':
                  a[e].can && b.value.history[e]();
                  break;
                case 'zoomin':
                  b.value.zoom(0.1);
                  break;
                case 'zoomout':
                  b.value.zoom(-0.1);
                  break;
                case 'copy':
                  z(b.value);
                  break;
                case 'dustbin':
                  R(b.value);
                  break;
                case 'focus':
                  b.value.centerContent();
                  break;
                case 'select_all':
                  O(b.value);
                  break;
                default:
                  break;
              }
            },
            y = () => {
              L.m8.push('/inner');
            };
          return o().createElement(
            o().Fragment,
            null,
            o().createElement(
              'div',
              { className: D().header },
              o().createElement(
                'div',
                { className: D().logoArea },
                o().createElement(
                  'div',
                  { className: D().backBtn, onClick: y },
                  o().createElement(i.Z, null),
                ),
                o().createElement('div', { className: D().logo }),
              ),
              o().createElement(
                'div',
                { className: D().controlArea },
                o().createElement(
                  r.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u64a4\u9500',
                    onClick: () => v('undo'),
                  },
                  o().createElement(c.Z, null),
                ),
                o().createElement(
                  r.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u91cd\u505a',
                    onClick: () => v('redo'),
                  },
                  o().createElement(s.Z, null),
                ),
                o().createElement(
                  r.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u653e\u5927',
                    onClick: () => v('zoomin'),
                  },
                  o().createElement(d.Z, null),
                ),
                o().createElement(
                  r.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u7f29\u5c0f',
                    onClick: () => v('zoomout'),
                  },
                  o().createElement(p.Z, null),
                ),
                o().createElement(
                  r.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u590d\u5236',
                    onClick: () => v('copy'),
                  },
                  o().createElement(u.Z, null),
                ),
                o().createElement(
                  r.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u5220\u9664',
                    onClick: () => v('dustbin'),
                  },
                  o().createElement(m.Z, null),
                ),
                o().createElement(
                  r.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u753b\u5e03\u5c45\u4e2d',
                    onClick: () => v('focus'),
                  },
                  o().createElement(g.Z, null),
                ),
                o().createElement(
                  r.Z,
                  {
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u5168\u9009',
                    onClick: () => v('select_all'),
                  },
                  o().createElement(h.Z, null),
                ),
              ),
            ),
          );
        },
        Z = S,
        F = (a(18106), a(86629)),
        M = a(68392);
      Error;
      function U(e) {
        if (!M.Uo.isString(e)) return e;
        if (e.length <= 9) return e;
        var t = e.slice(0, 6) + '...';
        return t;
      }
      function B(e) {
        var t = {
            DEFAULT: { border: '#5b8ffa', background: '#83b7ff' },
            BLUE: { border: '#A4C2FF', background: '#D0DDF9' },
            GREEN: { border: '#A8D7CD', background: '#BFE8E2' },
            ORANGE: { border: '#FDBE94', background: '#FBECE3' },
            GRAY: { border: '#C4C4C4', background: '#E4E4E4' },
            YELLOW: { border: '#CCAC55', background: '#FDF3D7' },
          },
          a = t.DEFAULT;
        if (!e) return a;
        var n = N.TRIGGER,
          o = N.CONDITION,
          r = N.ACTION;
        return { [n]: t.GREEN, [o]: t.GRAY, [r]: t.BLUE }[e];
      }
      function G(e) {
        var t,
          a,
          n = e.type,
          o = e.shape,
          r = e.tooltip,
          l = e.attrs,
          i = e.x,
          c = e.y,
          s = e.size,
          d = e.id,
          p = e.position,
          u = e.data,
          m = e.actionType,
          g = e.initialization,
          h = i,
          f = c,
          b = o,
          v = r,
          E = m;
        u && u.actionType && (E = u.actionType),
          s &&
            (M.Uo.isArray(s)
              ? ((t = s[0]), (a = s[1]))
              : M.Uo.isObject(s) && ((t = s.width), (a = s.height))),
          M.Uo.isObject(p) && ((h = p.x), (f = p.y)),
          M.Uo.isString(n) && ((b = n), 'diamond' === n && (b = 'rect')),
          M.Uo.isObject(l) && (v = l.label.text);
        var y = U(v);
        return {
          type: b,
          label: y,
          x: h,
          y: f,
          width: t,
          height: a,
          id: d,
          actionType: E,
          data: { actionType: E, initialization: g, tooltip: v },
        };
      }
      function W(e) {
        var t = G(e),
          a = t.type,
          n = t.label,
          o = t.x,
          r = t.y,
          l = t.width,
          i = t.height,
          c = t.id,
          s = t.actionType,
          d = t.data,
          p = B(s);
        return {
          id: c,
          shape: a,
          width: l,
          height: i,
          x: o,
          y: r,
          zIndex: 100,
          data: d,
          attrs: {
            label: { text: n, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
            body: { stroke: p.border, strokeWidth: 1.5, fill: p.background },
          },
          ports: {
            items: [{ group: 'port_g', id: 'p_bottom' }],
            groups: {
              port_g: {
                attrs: {
                  circle: {
                    dataClass: 'choice-point',
                    r: 6,
                    magnet: !0,
                    stroke: '#5b8ffa',
                    strokeWidth: 1,
                    fill: '#fff',
                  },
                },
                position: 'bottom',
              },
            },
          },
        };
      }
      function K(e) {
        var t = G(e),
          a = t.type,
          n = t.label,
          o = t.x,
          r = t.y,
          l = t.width,
          i = t.height,
          c = t.id,
          s = t.actionType,
          d = t.data,
          p = B(s);
        return {
          id: c,
          shape: a,
          width: l,
          height: i,
          x: o,
          y: r,
          zIndex: 100,
          markup: [
            { tagName: 'rect', selector: 'body' },
            { tagName: 'text', selector: 'label' },
          ],
          data: d,
          attrs: {
            label: { text: n, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
            body: { stroke: p.border, strokeWidth: 1.5, fill: p.background },
          },
          ports: {
            items: [
              { group: 'port-top', id: 'p_top' },
              { group: 'port-bottom', id: 'p_bottom' },
            ],
            groups: {
              'port-top': {
                position: 'top',
                zIndex: 20,
                attrs: {
                  circle: {
                    dataClass: 'choice-point',
                    r: 6,
                    magnet: !0,
                    stroke: '#5b8ffa',
                    strokeWidth: 1,
                    fill: '#fff',
                  },
                },
              },
              'port-bottom': {
                position: 'bottom',
                zIndex: 20,
                attrs: {
                  circle: {
                    dataClass: 'choice-point',
                    r: 6,
                    magnet: !0,
                    stroke: '#5b8ffa',
                    strokeWidth: 1,
                    fill: '#fff',
                  },
                },
              },
            },
          },
        };
      }
      function P(e) {
        var t = G(e),
          a = t.type,
          n = t.label,
          o = t.x,
          r = t.y,
          l = t.id,
          i = t.actionType,
          c = t.data,
          s = B(i);
        return {
          id: l,
          shape: a,
          width: 50,
          height: 50,
          x: o,
          y: r,
          zIndex: 100,
          markup: [
            { tagName: 'rect', selector: 'body' },
            { tagName: 'text', selector: 'label' },
          ],
          data: c,
          attrs: {
            label: { text: n, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
            body: {
              transform: 'rotate(-45,25,25)',
              stroke: s.border,
              strokeWidth: 1.5,
              fill: s.background,
              rx: 5,
              ry: 5,
            },
          },
          ports: {
            items: [
              { group: 'in', id: 'p_top' },
              { group: 'out', id: 'p_bottom' },
            ],
            groups: {
              in: {
                attrs: {
                  circle: {
                    dataClass: 'choice-point',
                    r: 6,
                    magnet: !0,
                    stroke: '#5b8ffa',
                    strokeWidth: 1,
                    fill: '#fff',
                    transform: 'translate(0, -7)',
                  },
                },
                position: 'top',
              },
              out: {
                attrs: {
                  circle: {
                    dataClass: 'choice-point',
                    r: 6,
                    magnet: !0,
                    stroke: '#5b8ffa',
                    strokeWidth: 1,
                    fill: '#fff',
                    transform: 'translate(0, 7)',
                  },
                },
                position: 'bottom',
              },
            },
          },
        };
      }
      function H(e) {
        var t = G(e),
          a = t.label,
          n = t.width,
          o = t.height,
          r = t.id,
          l = t.data;
        return {
          id: r,
          shape: 'vue-shape',
          width: n,
          height: o,
          component: 'vue-node',
          label: a,
          zIndex: 100,
          data: l,
          ports: {
            items: [
              { group: 'port-top', id: 'p_top' },
              { group: 'port-bottom', id: 'p_bottom' },
            ],
            groups: {
              'port-top': {
                position: 'top',
                zIndex: 20,
                attrs: {
                  circle: {
                    dataClass: 'choice-point',
                    r: 6,
                    magnet: !0,
                    stroke: '#5b8ffa',
                    strokeWidth: 1,
                    fill: '#fff',
                  },
                },
              },
              'port-bottom': {
                position: 'bottom',
                zIndex: 20,
                attrs: {
                  circle: {
                    dataClass: 'choice-point',
                    r: 6,
                    magnet: !0,
                    stroke: '#5b8ffa',
                    strokeWidth: 1,
                    fill: '#fff',
                  },
                },
              },
            },
          },
        };
      }
      var V,
        j = a(20310),
        J = a(12788),
        Y = J.ZP.div(
          V ||
            (V = (0, j.Z)([
              '\n  height: 50px;\n  width: 75%;\n  display: flex;\n  user-select: none;\n  background-color: #ff8228;\n  border: 2px solid rgba(58, 184, 129, 0.5);\n  background-color: rgba(58, 184, 129, 0.5);\n  border-radius: 4px;\n  color: rgb(125, 118, 113);\n  display: flex;\n  justify-content: center;\n  font-size: 13px;\n  align-items: center;\n',
            ])),
        ),
        q = (e) =>
          o().createElement(
            o().Fragment,
            null,
            o().createElement(Y, { className: 'container' }, 'React-Node'),
          ),
        X = q,
        Q = a(99889),
        $ = a(98244),
        ee = a(65425),
        te = a(91896),
        ae = (e) =>
          o().createElement(
            o().Fragment,
            null,
            o().createElement(
              'div',
              (0, te.Z)({ className: 'listWrap' }, e),
              o().createElement(
                'div',
                { className: 'module' },
                o().createElement(
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
              ),
            ),
          ),
        ne = ae,
        oe = a(8870),
        re = {
          rect: {
            width: '100px',
            height: '50px',
            lineHeight: '36px',
            textAlign: 'center',
            border: '2px solid #5b8ffa',
            backgroundColor: '#9ec9ff',
            borderRadius: '4px',
            color: '#7D7671',
          },
          ellipse: {
            width: '100px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            border: '2px solid #5b8ffa',
            backgroundColor: '#9ec9ff',
            borderRadius: '50px / 25px',
            color: '#7D7671',
          },
          diamond: {
            width: '52px',
            height: '52px',
            lineHeight: '36px',
            textAlign: 'center',
            border: '2px solid #5b8ffa',
            backgroundColor: '#9ec9ff',
            borderRadius: '4px',
            color: '#7D7671',
            transform: 'rotateZ(45deg)',
          },
        };
      function le(e) {
        var t,
          a = N.TRIGGER,
          n = N.CONDITION,
          o = N.ACTION,
          r = B(e);
        switch (e) {
          case a:
            t = re.ellipse;
            break;
          case n:
            t = re.diamond;
            break;
          case o:
            t = re.rect;
            break;
          default:
            break;
        }
        return (0, oe.Z)(
          (0, oe.Z)({}, t),
          {},
          { backgroundColor: r.background, borderColor: r.border },
        );
      }
      var ie,
        ce = [
          {
            label: 'Start',
            actionType: N.TRIGGER,
            styles: le(N.TRIGGER),
            shape: 'ellipse',
          },
          {
            label: 'Condition',
            actionType: N.CONDITION,
            styles: le(N.CONDITION),
            shape: 'diamond',
          },
          {
            label: 'Action',
            actionType: N.ACTION,
            styles: le(N.ACTION),
            shape: 'rect',
          },
        ],
        se = F.Z.TabPane,
        de = (e) => {
          var t = (0, n.useState)({ dnd: {}, freeze: !1 }),
            a = (0, l.Z)(t, 2),
            r = a[0],
            i = (a[1], (0, n.useState)(!1)),
            c = (0, l.Z)(i, 2),
            s = c[0],
            d = c[1],
            p = (0, n.useMemo)(
              () => (e) => {
                d(e);
              },
              [],
            ),
            u = (0, n.useState)('1'),
            m = (0, l.Z)(u, 2),
            g = m[0],
            h = m[1],
            f = (0, n.useCallback)((e) => {
              console.log(String(e)), h(String(e));
            }, []),
            b = (0, n.useCallback)(
              (t, a) => {
                var n,
                  o = t.actionType,
                  l = t.shape,
                  i = t.label,
                  c = N.TRIGGER,
                  s = N.CONDITION,
                  d = N.ACTION;
                switch (o) {
                  case c:
                    n = W({
                      shape: l,
                      tooltip: i,
                      size: { width: 100, height: 50 },
                      actionType: o,
                      initialization: !0,
                    });
                    break;
                  case s:
                    n = P({
                      shape: 'rect',
                      tooltip: i,
                      actionType: o,
                      initialization: !0,
                    });
                    break;
                  case d:
                    n = K({
                      shape: l,
                      tooltip: i,
                      size: { width: 100, height: 50 },
                      actionType: o,
                      initialization: !0,
                    });
                    break;
                  case 'Vue-node':
                    n = H({
                      shape: 'rect',
                      tooltip: i,
                      size: { width: 110, height: 50 },
                      actionType: o,
                      initialization: !0,
                    });
                    break;
                  default:
                    break;
                }
                var p = e.graph.current.createNode(n);
                r.freeze ||
                  (console.log('d', e.dnd), e.dnd.current.start(p, a));
              },
              [e],
            ),
            v = { base: o().createElement(Q.Z, null) },
            E = (0, n.useMemo)(
              () => (e, t) =>
                o().createElement(
                  'div',
                  { style: { height: '10%' } },
                  v[e],
                  ' ',
                  t,
                ),
              [v],
            ),
            y = (0, n.useMemo)(
              () =>
                s
                  ? o().createElement(
                      o().Fragment,
                      null,
                      o().createElement(se, { tab: E('base', ''), key: '1' }),
                    )
                  : o().createElement(
                      o().Fragment,
                      null,
                      o().createElement(
                        se,
                        { tab: E('base', ''), key: '1' },
                        o().createElement(
                          'div',
                          { className: 'ctitle' },
                          '\u57fa\u7840\u7ec4\u4ef6',
                        ),
                        ce.map((e, t) =>
                          o().createElement(
                            ne,
                            { key: t, onMouseDown: (t) => b(e, t) },
                            o().createElement(
                              'div',
                              {
                                className: r.freeze
                                  ? 'freeze-'.concat(e.shape)
                                  : 'default-'.concat(e.shape),
                                style: e.styles,
                              },
                              o().createElement('span', null, e.label),
                            ),
                          ),
                        ),
                        o().createElement(
                          'div',
                          { className: 'ctitle' },
                          '\u81ea\u5b9a\u4e49\u7ec4\u4ef6',
                        ),
                        o().createElement(
                          ne,
                          {
                            onMouseDown: (e) =>
                              b(
                                {
                                  label: 'React-Node',
                                  shape: 'rect',
                                  actionType: 'React-Node',
                                },
                                e,
                              ),
                          },
                          o().createElement(
                            'div',
                            null,
                            o().createElement(X, {
                              className: r.freeze
                                ? 'freeze-rect'
                                : 'static-react-node',
                            }),
                          ),
                        ),
                      ),
                    ),
              [],
            );
          return o().createElement(
            o().Fragment,
            null,
            o().createElement(
              'div',
              {
                className: 'list',
                style: {
                  transition: 'all ease-in-out 0.5s',
                  position: 'fixed',
                  width: s ? '50px' : '350px',
                  zIndex: 200,
                  boxShadow: 'none',
                },
              },
              o().createElement(
                'div',
                { className: 'componentList' },
                o().createElement(
                  F.Z,
                  {
                    className: 'editorTabclass',
                    onTabClick: () => p(!1),
                    activeKey: g,
                    tabPosition: 'left',
                    onChange: (e) => f(e),
                  },
                  y,
                ),
              ),
              o().createElement(
                'div',
                {
                  className: 'collapsed',
                  style: { position: 'absolute', bottom: '80px', left: '20px' },
                  onClick: () => p(!s),
                },
                s
                  ? o().createElement($.Z, null)
                  : o().createElement(ee.Z, null),
              ),
            ),
          );
        },
        pe = (0, n.memo)(de),
        ue = (e) =>
          o().createElement(
            o().Fragment,
            null,
            o().createElement(
              'div',
              { className: 'panel-area-container' },
              o().createElement('div', { id: 'minimap' }, e.children),
            ),
          ),
        me = ue,
        ge = a(66687),
        he = ge.z.define({
          markup: [
            {
              tagName: 'rect',
              selector: 'button',
              attrs: {
                width: 20,
                height: 20,
                rx: 10,
                ry: 10,
                fill: '#ff4d4f',
                stroke: '#ff4d4f',
                cursor: 'pointer',
              },
            },
            {
              tagName: 'text',
              selector: 'text',
              textContent: '-',
              attrs: {
                fill: '#fff',
                fontSize: 40,
                textAnchor: 'middle',
                pointerEvents: 'none',
                x: 10,
                y: 21,
              },
              style: { userSelect: 'none' },
            },
          ],
          onClick(e) {
            var t = e.view,
              a = t.cell;
            a.removeTools(), a.remove();
          },
        }),
        fe = () => {
          M.kJ.registerNodeTool(k.REMOVE_BUTTON, he, !0),
            M.kJ.registerEdgeTool(k.REMOVE_BUTTON, he, !0);
        },
        be =
          (a(48551),
          J.ZP.div(
            ie ||
              (ie = (0, j.Z)([
                '\n  height: 50px;\n  width: 100%;\n  display: flex;\n  user-select: none;\n  background-color: #ff8228;\n  border: 2px solid rgba(58, 184, 129, 0.5);\n  background-color: rgba(58, 184, 129, 0.5);\n  border-radius: 4px;\n  color: rgb(125, 118, 113);\n  display: flex;\n  justify-content: center;\n  font-size: 13px;\n  align-items: center;\n',
              ])),
          )),
        ve = (e) =>
          o().createElement(
            o().Fragment,
            null,
            o().createElement(be, { className: 'container' }),
          ),
        Ee = ve,
        ye = () => {
          M.kJ.registerReactComponent(
            'react-node',
            o().createElement(Ee, null),
          );
        },
        ke = (e, t) => {
          var a = document.querySelectorAll(
            'g[data-cell-id="'.concat(e.id, '"] .x6-port-body'),
          );
          a.forEach((e) => {
            e.style.visibility = t ? 'visible' : 'hidden';
          });
        };
      function _e(e, t, a, n) {
        e.addNode({
          x: a,
          y: n,
          width: 350,
          height: 40,
          shape: 'html',
          html() {
            var e = document.createElement('div');
            return (
              (e.style.border = '1px solid #e2e2e2'),
              (e.style.borderRadius = '4px'),
              (e.style.fontSize = '12px'),
              (e.style.color = '#545454'),
              (e.style.width = '350px'),
              (e.style.wordBreak = 'break-all'),
              (e.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'),
              (e.style.boxShadow = 'rgb(174, 174, 174) 0px 0px 10px'),
              (e.style.padding = '10px'),
              (e.innerText = t),
              e
            );
          },
        });
      }
      var Ce = (e) => {
          e.on('node:mouseenter', (t) => {
            var a = t.node,
              n = a.getData();
            n && n.disableMove ? ke(a, !1) : ke(a, !0);
            var o = a.store.data.position,
              r = o.x,
              l = o.y;
            a.data &&
              !a.data.initialization &&
              _e(e, a.data.tooltip, r + 100, l - 50);
          }),
            e.on('node:mouseleave', (t) => {
              var a,
                n = t.node;
              ke(n, !1),
                null === (a = e.getNodes()) ||
                  void 0 === a ||
                  a.forEach((t) => {
                    'html' === t.shape && e.removeNode(t);
                  });
            });
        },
        xe = (e) => {
          e.on('cell:removed', () => {
            var t;
            null === (t = e.getNodes()) ||
              void 0 === t ||
              t.forEach((t) => {
                'html' === t.shape && e.removeNode(t);
              });
          });
        },
        Ne = (e) => {
          e.on('cell:selected', (t) => {
            var a,
              n = t.cell;
            if (
              (n.isEdge() &&
                (n.attr('line', { stroke: 'skyblue', strokeWidth: 3 }),
                (a = { distance: '30%' })),
              n.isNode())
            ) {
              var o = e.findView(n);
              o.addClass(''.concat(n.shape, '-selected')),
                (a = { x: -28, y: -5 });
            }
            y.dispatchEvent(_.CELL_CLICK, C.SELECTED);
            var r = e.getSelectedCells();
            r.length > 1
              ? r.forEach((e) => {
                  e.removeTools();
                })
              : n.addTools({ name: k.REMOVE_BUTTON, args: a });
          }),
            e.on('cell:unselected', (t) => {
              var a,
                n = t.cell;
              if (n.isEdge())
                n.attr('line', { stroke: '#7c68fc', strokeWidth: 2 });
              else {
                var o = e.findView(n);
                o && o.removeClass(''.concat(n.shape, '-selected'));
              }
              n.removeTools(),
                y.dispatchEvent(_.CELL_CLICK, C.UN_SELECTED),
                null === (a = e.getNodes()) ||
                  void 0 === a ||
                  a.forEach((t) => {
                    'html' === t.shape && e.removeNode(t);
                  });
            });
        },
        Te = (e) => {
          e.on('edge:connected', (t) => {
            var a = t.edge,
              n = t.currentCell,
              o = t.currentMagnet,
              r = o.getAttribute('port');
            if (n.isNode() && 'vue-shape' === n.shape) {
              var l = e.findViewByCell(a);
              if (l) {
                var i = l.findOne('path');
                if (i) {
                  var c = M.OW.create('circle', { r: 5, fill: '#5F95FF' });
                  c.animateAlongPath(
                    { dur: '3s', repeatCount: 'indefinite' },
                    i,
                  ),
                    c.appendTo(i.parentNode);
                }
              }
            }
            'vue-shape' !== n.shape &&
              (n.setPortProp(r, 'connected', !0),
              (a.zIndex = -1),
              a.attr({
                line: { strokeDasharray: '', targetMarker: 'classic' },
              }),
              a.appendLabel({ attrs: { label: { text: '' } } }));
          });
        };
      function we(e) {
        var t = e.data,
          a = void 0 === t ? {} : t,
          n = e.data.tooltip,
          o = a.actionType;
        return { node: e, label: n, nodeId: e.id, actionType: o };
      }
      var Ie = (e) => {
        e.on('node:click', (e) => {
          var t = e.node,
            a = we(t);
          y.dispatchEvent(_.NODE_CLICK, a);
        }),
          e.on('node:dblclick', (t) => {
            var a = t.node,
              n = e.getSelectedCells();
            if (M.Uo.isArray(n) && 1 === n.length) {
              var o = we(a);
              y.dispatchEvent(_.DOUBLE_NODE_CLICK, o);
            }
          });
      };
      function ze(e) {
        Ce(e), xe(e), Ne(e), Te(e), Ie(e);
      }
      function Re() {
        var e = new M.kJ({
          container: document.getElementById('container'),
          autoResize: !0,
          keyboard: { enabled: !0, global: !0 },
          selecting: {
            enabled: !0,
            showNodeSelectionBox: !0,
            rubberband: !0,
            modifiers: 'ctrl',
          },
          snapline: !0,
          panning: {
            enabled: !0,
            eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel'],
          },
          grid: { size: 10, visible: !0 },
          clipboard: !0,
          history: {
            enabled: !0,
            beforeAddCommand(e, t) {
              if (t.key) return 'tools' !== t.key;
            },
          },
          highlighting: {
            magnetAvailable: {
              name: 'stroke',
              args: {
                padding: 4,
                attrs: { 'stroke-width': 4, stroke: 'skyblue' },
              },
            },
            magnetAdsorbed: {
              name: 'stroke',
              args: {
                padding: 4,
                attrs: { 'stroke-width': 8, stroke: 'skyblue' },
              },
            },
          },
          mousewheel: { enabled: !0, modifiers: ['ctrl', 'meta'] },
          minimap: {
            enabled: !0,
            container: document.getElementById('minimap'),
            padding: 40,
          },
          interacting: function (e) {
            var t;
            return (
              null === (t = e.cell.getData()) ||
              void 0 === t ||
              !t.disableMove || { nodeMovable: !1 }
            );
          },
          connecting: {
            snap: !0,
            allowBlank: !1,
            allowLoop: !1,
            allowMulti: !1,
            highlight: !0,
            sourceAnchor: { name: 'center' },
            targetAnchor: 'center',
            connectionPoint: 'anchor',
            connector: { name: 'rounded', args: { radius: 20 } },
            router: 'manhattan',
            validateMagnet(e) {
              var t = e.magnet,
                a = t.getAttribute('port-group');
              return 'in' !== a;
            },
            createEdge() {
              return this.createEdge({
                zIndex: -1,
                attrs: {
                  line: {
                    strokeDasharray: '5 5',
                    stroke: '#7c68fc',
                    strokeWidth: 2,
                    targetMarker: { name: 'block', args: { size: '6' } },
                  },
                },
              });
            },
            validateConnection(e) {
              var t,
                a = e.targetView,
                n = e.sourceMagnet,
                o = e.targetMagnet,
                r = e.sourceCell;
              if (!n || !o) return !1;
              if (null !== (t = r.getData()) && void 0 !== t && t.disableMove)
                return !1;
              var l = o.getAttribute('port'),
                i = a.cell,
                c = i.getPort(l);
              return !!c;
            },
          },
        });
        return ye(), ze(e), T(e), v(e), e;
      }
      function Oe(e) {
        var t = (0, n.useRef)();
        return (0, n.useEffect)(() => ((t.current = e), () => {}), [e]), t;
      }
      var Ae = () => {
          var e = (0, n.useRef)(null),
            t = (0, n.useRef)(null);
          return (
            (0, n.useEffect)(() => {
              fe();
              var a = Re(),
                n = new M.e9.q6({
                  target: a,
                  validateNode() {
                    return !0;
                  },
                });
              (t.current = n), (e.current = a);
            }, []),
            (0, n.useEffect)(() => {
              y.eventListener(_.NODE_CLICK, (e) =>
                console.log('node-click', e),
              ),
                y.eventListener(_.DOUBLE_NODE_CLICK, (e) =>
                  console.log('node-dblclick', e),
                );
            }, []),
            o().createElement(
              o().Fragment,
              null,
              o().createElement(
                'div',
                { className: 'layout' },
                o().createElement(Z, null),
                o().createElement(
                  'div',
                  { className: 'container' },
                  o().createElement(pe, { graph: e, dnd: t }),
                  o().createElement('div', {
                    id: 'container',
                    className: 'graph-main-container',
                  }),
                  o().createElement(
                    'div',
                    { className: 'panel-area-container' },
                    o().createElement(
                      me,
                      null,
                      o().createElement(
                        'template',
                        { 'slot-scope': '{ row }' },
                        o().createElement('slot', { name: x.PANEL_AREA_SLOT }),
                      ),
                    ),
                  ),
                ),
              ),
            )
          );
        },
        De = Ae;
    },
  },
]);
