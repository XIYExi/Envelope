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
    24157: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return ht;
          },
          useStateRef: function () {
            return mt;
          },
        });
      var r = a(12924),
        o = a.n(r),
        n = (a(49111), a(19650)),
        i = (a(57663), a(71577)),
        l = (a(34792), a(48086)),
        s = a(2824),
        c = a(6700),
        d = a(258),
        p = a(32779),
        u = a(72504),
        f = a(16130),
        m = a(99165),
        g = a(73218),
        h = a(19869),
        b = a(5405),
        v = {
          undo: { svg: 'undo', can: !0, title: '\u64a4\u9500' },
          redo: { svg: 'redo', can: !0, title: '\u91cd\u505a' },
          zoomin: { svg: 'zoomin', title: '\u653e\u5927' },
          zoomout: { svg: 'zoomout', title: '\u7f29\u5c0f' },
          copy: { svg: 'copy', title: '\u590d\u5236' },
          delete: { svg: 'dustbin', title: '\u5220\u9664', can: !1 },
          focus: { svg: 'focus', title: '\u5c45\u4e2d' },
          selectAll: { svg: 'select_all', title: '\u5168\u9009' },
        };
      class E {
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
      var y = { REMOVE_BUTTON: 'custom-remove-button' },
        k = {
          CELL_CLICK: '__antv_x6_custom_event_type_cell_click__',
          NODE_CLICK: '__antv_x6_custom_event_type_node_click__',
          DOUBLE_NODE_CLICK: '__antv_x6_custom_event_type_cell_double_click__',
          HELP: '__antv_x6_custom_event_type_help__',
          FREEZE_GRAPH: '__antv_x6_custom_event_type_freeze_graph__',
          RUNTIME_ERR: '__antv_x6_custom_event_type_runtime_err__',
        },
        x = { SELECTED: 'selected', UN_SELECTED: 'unselected' },
        C = {
          PANEL_AREA_SLOT: 'panel_area_slot',
          TOOLTIPS_SLOT: 'tooltips_slot',
        },
        _ = {
          TRIGGER: 'TRIGGER',
          CONDITION: 'CONDITION',
          ACTION: 'ACTION',
          OPTIONAL: 'OPTIONAL',
          DATA: 'DATA',
          CONNECT: 'CONNECT',
          DAG: 'DAG',
          DAGLINE: 'DAGLINE',
          ER: 'ER',
          ALGO: 'ALGO',
          PRO: 'PRO',
        },
        A = (e) => {
          T(e);
        },
        N = { offset: 30, useLocalStorage: !0 };
      function T(e) {
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
            () => (e.cleanSelection(), E.dispatchEvent(k.HELP, 'close'), !1),
          ),
          e.bindKey(['alt+h', 'option+h'], () => (E.dispatchEvent(k.HELP), !1)),
          e.bindKey(['alt+f', 'option+f'], () => (e.centerContent(), !1));
      }
      function z(e) {
        var t = null === e || void 0 === e ? void 0 : e.getSelectedCells();
        if ((t && t.length && e.copy(t, N), !e.isClipboardEmpty())) {
          var a = e.paste(N);
          e.cleanSelection(), e.select(a);
        }
      }
      function I(e) {
        var t = e.getSelectedCells();
        t.length &&
          (t.forEach((e) => {
            e.removeTools();
          }),
          e.removeCells(t));
      }
      function w(e) {
        var t = e.getCells();
        t.length && e.select(t);
      }
      function O(e) {
        var t = e.getCells();
        t.length &&
          t.forEach((e) => {
            e.removeTools(), e.setData({ disableMove: !0 });
          }),
          e
            .freeze()
            .disableSelection()
            .disableMultipleSelection()
            .cleanSelection()
            .disableClipboard()
            .disableHistory()
            .disableSnapline()
            .disableKeyboard(),
          E.dispatchEvent(k.FREEZE_GRAPH, !0);
      }
      function R(e) {
        var t = e.getCells();
        t.length &&
          t.forEach((e) => {
            e.setData({ disableMove: !1 });
          }),
          e
            .unfreeze()
            .enableSelection()
            .enableMultipleSelection()
            .enableClipboard()
            .enableHistory()
            .enableSnapline()
            .enableKeyboard(),
          E.dispatchEvent(k.FREEZE_GRAPH, !1);
      }
      var D = a(61579),
        Z = a.n(D),
        S = a(71720),
        L = a(55609),
        P = a(91220),
        W = a(93224),
        F = a(68392);
      class M extends Error {
        constructor(e, t) {
          super(t),
            (this.errorCode = void 0),
            (this.errorMsg = void 0),
            (this.errorCode = e),
            (this.errorMsg = t);
        }
        static __ErrorMap(e) {
          return {
            [M.InvalidParameters]: 2e3,
            [M.VerifyFailure]: 2001,
            [M.InvalidFormatData]: 2002,
          }[e];
        }
        static isTypeOf(e, t) {
          return !!e && e.errorCode === M.__ErrorMap(t);
        }
        static InvalidParameters(e) {
          return new M(2e3, e || 'invalid parameters');
        }
        static VerifyFailure(e) {
          return new M(2001, e || 'verify failure');
        }
        static InvalidFormatData(e) {
          return new M(2002, e || 'invalid format data');
        }
      }
      var G = M;
      function U(e) {
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
        var r = _.TRIGGER,
          o = _.CONDITION,
          n = _.ACTION,
          i = _.OPTIONAL,
          l = _.DATA,
          s = _.CONNECT;
        return {
          [r]: t.GREEN,
          [o]: t.GRAY,
          [n]: t.BLUE,
          [i]: t.YELLOW,
          [l]: t.ORANGE,
          [s]: t.DEFAULT,
        }[e];
      }
      function B(e) {
        var t,
          a,
          r = e.type,
          o = e.shape,
          n = e.tooltip,
          i = e.attrs,
          l = e.x,
          s = e.y,
          c = e.size,
          d = e.id,
          p = e.position,
          u = e.data,
          f = e.actionType,
          m = e.initialization,
          g = l,
          h = s,
          b = o,
          v = n,
          E = f;
        u && u.actionType && (E = u.actionType),
          c &&
            (F.Uo.isArray(c)
              ? ((t = c[0]), (a = c[1]))
              : F.Uo.isObject(c) && ((t = c.width), (a = c.height))),
          F.Uo.isObject(p) && ((g = p.x), (h = p.y)),
          F.Uo.isString(r) && ((b = r), 'diamond' === r && (b = 'rect')),
          F.Uo.isObject(i) && (v = i.label.text);
        var y = oe(v);
        return {
          type: b,
          label: y,
          x: g,
          y: h,
          width: t,
          height: a,
          id: d,
          actionType: E,
          data: { actionType: E, initialization: m, tooltip: v },
        };
      }
      function J(e) {
        var t = B(e),
          a = t.type,
          r = t.label,
          o = t.x,
          n = t.y,
          i = t.width,
          l = t.height,
          s = t.id,
          c = t.actionType,
          d = t.data,
          p = U(c);
        return {
          id: s,
          shape: a,
          width: i,
          height: l,
          x: o,
          y: n,
          zIndex: 100,
          data: d,
          attrs: {
            label: { text: r, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
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
      function K(e) {
        var t = B(e),
          a = t.type,
          r = t.label,
          o = t.x,
          n = t.y,
          i = t.width,
          l = t.height,
          s = t.id,
          c = t.actionType,
          d = t.data,
          p = U(c);
        return {
          id: s,
          shape: a,
          width: i,
          height: l,
          x: o,
          y: n,
          zIndex: 100,
          markup: [
            { tagName: 'rect', selector: 'body' },
            { tagName: 'text', selector: 'label' },
          ],
          data: d,
          attrs: {
            label: { text: r, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
            body: { stroke: p.border, strokeWidth: 1.5, fill: p.background },
          },
          ports: {
            items: [
              { group: 'port-top', id: 'p_top' },
              { group: 'port-bottom', id: 'p_bottom' },
              { group: 'port-left', id: 'p_left' },
              { group: 'port-right', id: 'p_right' },
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
              'port-left': {
                position: 'left',
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
              'port-right': {
                position: 'right',
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
      function H(e) {
        var t = B(e),
          a = t.type,
          r = t.label,
          o = t.x,
          n = t.y,
          i = t.width,
          l = t.height,
          s = t.id,
          c = t.actionType,
          d = t.data,
          p = U(c);
        return {
          id: s,
          shape: a,
          width: i,
          height: l,
          x: o,
          y: n,
          zIndex: 100,
          markup: [
            { tagName: 'rect', selector: 'body' },
            { tagName: 'text', selector: 'label' },
          ],
          data: d,
          attrs: {
            label: { text: r, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
            body: {
              stroke: p.border,
              strokeWidth: 1.5,
              fill: p.background,
              rx: 15,
              ry: 15,
            },
          },
          style: { borderRadius: '15px' },
          ports: {
            items: [
              { group: 'port-top', id: 'p_top' },
              { group: 'port-bottom', id: 'p_bottom' },
              { group: 'port-left', id: 'p_left' },
              { group: 'port-right', id: 'p_right' },
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
              'port-left': {
                position: 'left',
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
              'port-right': {
                position: 'right',
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
      function V(e) {
        var t = B(e),
          a = t.type,
          r = t.label,
          o = t.x,
          n = t.y,
          i = t.width,
          l = t.height,
          s = t.id,
          c = t.actionType,
          d = t.data,
          p = U(c);
        return {
          id: s,
          inherit: a,
          width: i,
          height: l,
          x: o,
          y: n,
          zIndex: 100,
          markup: [
            { tagName: 'polygon', selector: 'body' },
            { tagName: 'text', selector: 'label' },
          ],
          data: d,
          attrs: {
            label: { text: r, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
            body: {
              stroke: p.border,
              strokeWidth: 1.5,
              fill: p.background,
              refPoints: '10,0 40,0 30,20 0,20',
            },
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
      function j(e) {
        var t = B(e),
          a = t.type,
          r = t.label,
          o = t.x,
          n = t.y,
          i = t.width,
          l = t.height,
          s = t.id,
          c = t.actionType,
          d = t.data,
          p = U(c);
        return {
          id: s,
          shape: a,
          width: i,
          height: l,
          x: o,
          y: n,
          zIndex: 100,
          data: d,
          attrs: {
            label: { text: r, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
            body: { stroke: p.border, strokeWidth: 1.5, fill: p.background },
          },
          ports: {
            items: [
              { group: 'port-top', id: 'p_top' },
              { group: 'port-bottom', id: 'p_bottom' },
              { group: 'port-left', id: 'p_left' },
              { group: 'port-right', id: 'p_right' },
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
              'port-left': {
                position: 'left',
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
              'port-right': {
                position: 'right',
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
      function Q(e) {
        var t = B(e),
          a = t.type,
          r = t.label,
          o = t.x,
          n = t.y,
          i = t.id,
          l = t.actionType,
          s = t.data,
          c = U(l);
        return {
          id: i,
          shape: a,
          width: 50,
          height: 50,
          x: o,
          y: n,
          zIndex: 100,
          markup: [
            { tagName: 'rect', selector: 'body' },
            { tagName: 'text', selector: 'label' },
          ],
          data: s,
          attrs: {
            label: { text: r, fill: '#7D7671', strokeWidth: 0.4, fontSize: 12 },
            body: {
              transform: 'rotate(-45,25,25)',
              stroke: c.border,
              strokeWidth: 1.5,
              fill: c.background,
              rx: 5,
              ry: 5,
            },
          },
          ports: {
            items: [
              { group: 'port-top', id: 'p_top' },
              { group: 'port-bottom', id: 'p_bottom' },
              { group: 'port-left', id: 'p_left' },
              { group: 'port-right', id: 'p_right' },
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
              'port-left': {
                position: 'left',
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
              'port-right': {
                position: 'right',
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
      function X(e) {
        var t = B(e),
          a = t.label,
          r = t.width,
          o = t.height,
          n = t.id,
          i = t.data;
        return {
          id: n,
          shape: 'dag-node',
          width: r,
          height: o,
          label: a,
          zIndex: 100,
          data: i,
          ports: {
            items: [
              { group: 'port-top', id: 'p_top_0' },
              { group: 'port-top', id: 'p_top_1' },
              { group: 'port-top', id: 'p_top_2' },
              { group: 'port-bottom', id: 'p_bottom_0' },
              { group: 'port-bottom', id: 'p_bottom_1' },
              { group: 'port-bottom', id: 'p_bottom_2' },
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
      function Y(e) {
        var t = B(e),
          a = t.label,
          r = t.width,
          o = t.height,
          n = t.id,
          i = t.data;
        return {
          id: n,
          shape: 'dag-node',
          width: r,
          height: o,
          label: a,
          zIndex: 100,
          data: i,
          ports: {
            items: [
              { group: 'port-top', id: 'p_top_0' },
              { group: 'port-top', id: 'p_top_1' },
              { group: 'port-bottom', id: 'p_bottom_0' },
              { group: 'port-bottom', id: 'p_bottom_1' },
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
      function q(e) {
        var t = B(e),
          a = t.label,
          r = t.width,
          o = t.height,
          n = t.id,
          i = t.data;
        return {
          id: n,
          shape: 'dag-node',
          width: r,
          height: o,
          label: a,
          zIndex: 100,
          data: i,
          ports: {
            items: [
              { group: 'port-top', id: 'p_top_0' },
              { group: 'port-bottom', id: 'p_bottom_0' },
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
      function $(e) {
        var t = B(e),
          a = t.label,
          r = t.width,
          o = t.height,
          n = t.id,
          i = t.data;
        return {
          id: n,
          shape: 'er-rect',
          zIndex: 100,
          width: r,
          height: o,
          label: a,
          data: i,
          ports: [],
        };
      }
      function ee(e) {
        var t = B(e),
          a = t.label,
          r = t.width,
          o = t.height,
          n = t.id,
          i = t.data;
        return {
          id: n,
          shape: 'vue-shape',
          width: r,
          height: o,
          component: 'vue-node',
          label: a,
          zIndex: 100,
          data: i,
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
      function te(e) {
        var t = [],
          a = [],
          r = [],
          o = [],
          n = e.getCells();
        if (n.length) {
          var i,
            l = (0, P.Z)(n);
          try {
            for (l.s(); !(i = l.n()).done; ) {
              var s = i.value,
                c = s.toJSON();
              s.isEdge() && (r.push(c), t.push(JSON.stringify(c))),
                s.isNode() &&
                  ((c.attrs.label.text = c.data.tooltip),
                  o.push(c),
                  a.push(JSON.stringify(c)));
            }
          } catch (d) {
            l.e(d);
          } finally {
            l.f();
          }
        }
        return { nodes: a, edges: t, nodesJSON: o, edgesJSON: r };
      }
      var ae = ['label'];
      function re(e) {
        try {
          if (F.Uo.isString(e)) return JSON.parse(e);
          if (F.Uo.isArray(e))
            return e.map((e) => (F.Uo.isObject(e) ? e : JSON.parse(e)));
          if (F.Uo.isObject(e)) return e;
          throw (
            (E.dispatchEvent(
              k.RUNTIME_ERR,
              G.InvalidFormatData('nodes or edges error'),
            ),
            G.InvalidFormatData('nodes or edges error'))
          );
        } catch (t) {
          return {};
        }
      }
      function oe(e) {
        if (!F.Uo.isString(e)) return e;
        if (e.length <= 9) return e;
        var t = e.slice(0, 6) + '...';
        return t;
      }
      function ne(e) {
        return te(e);
      }
      function ie(e, t) {
        var a = t.getSelectedCells();
        if (F.Uo.isArray(a) && 1 === a.length) {
          var r = a[0],
            o = e.label,
            n = (0, W.Z)(e, ae);
          if (o) {
            var i = oe(o);
            r.setData({ tooltip: o, initialization: !1 }),
              r.setAttrs({ label: { text: i } });
          }
          for (var l in n)
            if (Object.hasOwnProperty.call(n, l)) {
              var s = n[l];
              F.Uo.isNil(s) || r.setData({ [l]: s, initialization: !1 });
            }
          t.cleanSelection();
        }
      }
      function le(e, t) {
        var a = t.getSelectedCells();
        if (F.Uo.isArray(a) && 1 === a.length) {
          var r = a[0];
          console.log('\u5f53\u524d\u9009\u4e2d\u8282\u70b9', r),
            r.hasPorts() && r.removePorts(),
            r.addPorts(e);
        }
        t.cleanSelection();
      }
      function se(e) {
        var t = [],
          a = e.getCells();
        a.length || t.push('\u753b\u5e03\u65e0\u53ef\u7528\u8282\u70b9');
        var r = e.getEdges(),
          o = new Set(
            r.reduce(
              (e, t) => (e.push(t.target.cell), e.push(t.source.cell), e),
              [],
            ),
          ),
          n = e.getNodes();
        o.size !== n.length &&
          t.push('\u5b58\u5728\u672a\u8fde\u7ebf\u7684\u8282\u70b9');
        var i,
          l = _.TRIGGER,
          s = _.ACTION,
          c = 0,
          d = 0,
          p = (0, P.Z)(n);
        try {
          for (p.s(); !(i = p.n()).done; ) {
            var u = i.value,
              f = u.getData(),
              m = f.initialization,
              g = f.tooltip,
              h = f.actionType;
            switch (
              (m &&
                t.push(
                  '['.concat(
                    g || '',
                    ']\u8282\u70b9\u6570\u636e\u4e0d\u80fd\u4e3a\u7a7a',
                  ),
                ),
              h)
            ) {
              case l:
                c += 1;
                break;
              case s:
                d += 1;
                break;
            }
          }
        } catch (b) {
          p.e(b);
        } finally {
          p.f();
        }
        return (
          (c && d) || t.push('\u6d41\u7a0b\u94fe\u8def\u672a\u95ed\u73af'),
          { ok: !t.length, errs: t }
        );
      }
      function ce(e) {
        var t = e.getNodes();
        return t.map((e) => {
          var t = e.id,
            a = e.data;
          return { id: t, data: a };
        });
      }
      function de(e) {
        var t = e.getEdges();
        return t.map((e) => ({
          id: e.id,
          source: e.source.cell,
          target: e.target.cell,
        }));
      }
      function pe(e, t) {
        var a;
        switch (t) {
          case 'nodes':
            a = { nodes: ce(e) };
            break;
          case 'edges':
            a = { edges: de(e) };
            break;
          default:
            a = { nodes: ce(e), edges: de(e) };
            break;
        }
        return a;
      }
      var ue,
        fe = a(93162),
        me = (e) => {
          var t = (0, r.useState)(v),
            a = (0, s.Z)(t, 2),
            E = a[0],
            y = (a[1], (0, r.useState)(!1)),
            k = (0, s.Z)(y, 2),
            x = k[0],
            C = k[1],
            _ = e.cstate,
            A = (e.dispatch, (0, r.useRef)(_.graph)),
            N = (0, r.useRef)(_.dnd);
          (0, r.useEffect)(() => {
            (A.current = _.graph), (N.current = _.dnd);
          }, [_]);
          var T = (e) => {
              switch (e) {
                case 'undo':
                case 'redo':
                  E[e].can && A.current.history[e]();
                  break;
                case 'zoomin':
                  A.current.zoom(0.1);
                  break;
                case 'zoomout':
                  A.current.zoom(-0.1);
                  break;
                case 'copy':
                  z(A.current);
                  break;
                case 'dustbin':
                  I(A.current);
                  break;
                case 'focus':
                  A.current.centerContent();
                  break;
                case 'select_all':
                  w(A.current);
                  break;
                default:
                  break;
              }
            },
            D = () => {
              S.m8.push('/');
            },
            L = () => {
              C(!x), x ? R(A.current) : O(A.current);
            },
            P = () => {
              var e = pe(A.current);
              console.log('[debug]data:', e);
              var t = JSON.stringify(e),
                a = new Blob([t], { type: 'text/plain;charset=utf-8' });
              (0, fe.saveAs)(a, 'AntVData.json'),
                l.default.info(
                  '\u56fe\u6570\u636e\u5bfc\u51fa\u6210\u529f\uff01',
                );
            },
            W = () => {
              A.current.exportPNG('image.png', {}),
                l.default.info('\u56fe\u4e0b\u8f7d\u6210\u529f!');
            },
            F = () => {
              var e = se(A.current),
                t = e.ok,
                a = e.errs;
              if (t) {
                var r = ne(A.current),
                  o = r.nodesJSON,
                  n = r.edgesJSON,
                  i = { nodesJSON: o, edgesJSON: n },
                  s = JSON.stringify(i),
                  c = new Blob([s], { type: 'text/plain;charset=utf-8' });
                (0, fe.saveAs)(c, 'AntVJSON.json'),
                  l.default.success(
                    'Export succeeded. Please view it on the console',
                  );
              } else console.log('[debug]errs:', a), l.default.error(a[0]);
            };
          return o().createElement(
            o().Fragment,
            null,
            o().createElement(
              'div',
              { className: Z().header },
              o().createElement(
                'div',
                { className: Z().logoArea },
                o().createElement(
                  'div',
                  { className: Z().backBtn, onClick: D },
                  o().createElement(c.Z, null),
                ),
                o().createElement('div', { className: Z().logo }),
              ),
              o().createElement(
                'div',
                { className: Z().controlArea },
                o().createElement(
                  i.Z,
                  {
                    disabled: x,
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u64a4\u9500',
                    onClick: () => T('undo'),
                  },
                  o().createElement(d.Z, null),
                ),
                o().createElement(
                  i.Z,
                  {
                    disabled: x,
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u91cd\u505a',
                    onClick: () => T('redo'),
                  },
                  o().createElement(p.Z, null),
                ),
                o().createElement(
                  i.Z,
                  {
                    disabled: x,
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u653e\u5927',
                    onClick: () => T('zoomin'),
                  },
                  o().createElement(u.Z, null),
                ),
                o().createElement(
                  i.Z,
                  {
                    disabled: x,
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u7f29\u5c0f',
                    onClick: () => T('zoomout'),
                  },
                  o().createElement(f.Z, null),
                ),
                o().createElement(
                  i.Z,
                  {
                    disabled: x,
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u590d\u5236',
                    onClick: () => T('copy'),
                  },
                  o().createElement(m.Z, null),
                ),
                o().createElement(
                  i.Z,
                  {
                    disabled: x,
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u5220\u9664',
                    onClick: () => T('dustbin'),
                  },
                  o().createElement(g.Z, null),
                ),
                o().createElement(
                  i.Z,
                  {
                    disabled: x,
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u753b\u5e03\u5c45\u4e2d',
                    onClick: () => T('focus'),
                  },
                  o().createElement(h.Z, null),
                ),
                o().createElement(
                  i.Z,
                  {
                    disabled: x,
                    type: 'link',
                    style: { marginRight: '9px' },
                    title: '\u5168\u9009',
                    onClick: () => T('select_all'),
                  },
                  o().createElement(b.Z, null),
                ),
                o().createElement(
                  n.Z,
                  null,
                  o().createElement(
                    i.Z,
                    { danger: x, onClick: () => L() },
                    '\u53ea\u8bfb',
                  ),
                  o().createElement(
                    i.Z,
                    { disabled: x, onClick: () => P() },
                    '\u5bfc\u51fa\u6570\u636e',
                  ),
                  o().createElement(
                    i.Z,
                    { disabled: x, onClick: () => F() },
                    '\u5bfc\u51faJSON',
                  ),
                  o().createElement(
                    i.Z,
                    { disabled: x, onClick: () => W() },
                    '\u4e0b\u8f7d\u56fe\u7247',
                  ),
                ),
              ),
            ),
          );
        },
        ge = (0, L.connect)((e) => ({ cstate: e.present.antvModal }))(me),
        he = (a(18106), a(86629)),
        be = a(20310),
        ve = a(12788),
        Ee = ve.ZP.div(
          ue ||
            (ue = (0, be.Z)([
              '\n  height: 65px;\n  width: 100%;\n  user-select: none;\n  color: rgb(125, 118, 113);\n  font-size: 13px;\n  align-items: center;\n  & img {\n    padding: 5px;\n    height: 60px;\n  }\n',
            ])),
        ),
        ye = (e) =>
          o().createElement(
            o().Fragment,
            null,
            o().createElement(
              Ee,
              { className: 'container' },
              o().createElement('img', { src: e.src }),
            ),
          ),
        ke = ye,
        xe = a(99889),
        Ce = a(98244),
        _e = a(65425),
        Ae = a(91896),
        Ne = (e) =>
          o().createElement(
            o().Fragment,
            null,
            o().createElement(
              'div',
              (0, Ae.Z)({ className: 'antvListWrap' }, e),
              o().createElement(
                'div',
                { className: 'module' },
                o().createElement(
                  'div',
                  {
                    style: {
                      height: '45px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      overflow: 'hidden',
                    },
                  },
                  o().createElement(
                    'div',
                    { style: { transform: 'scale(0.6)' } },
                    e.children,
                  ),
                ),
              ),
              o().createElement(
                'div',
                { className: 'antvTitle' },
                o().createElement('p', null, e.title),
              ),
            ),
          ),
        Te = Ne,
        ze = a(8870),
        Ie = {
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
          bordered: {
            width: '100px',
            height: '50px',
            lineHeight: '36px',
            textAlign: 'center',
            border: '2px solid #5b8ffa',
            backgroundColor: '#9ec9ff',
            borderRadius: '15px',
            color: '#7D7671',
          },
          data: {
            width: '100px',
            height: '50px',
            lineHeight: '36px',
            textAlign: 'center',
            border: '2px solid #5b8ffa',
            backgroundColor: '#9ec9ff',
            color: '#7D7671',
            transform: 'skewX(-30deg)',
          },
          connect: {
            width: '60px',
            height: '60px',
            lineHeight: '36px',
            textAlign: 'center',
            border: '2px solid #5b8ffa',
            borderRadius: '50px',
            backgroundColor: '#9ec9ff',
            color: '#7D7671',
          },
        };
      function we(e) {
        var t,
          a = _.TRIGGER,
          r = _.CONDITION,
          o = _.ACTION,
          n = _.OPTIONAL,
          i = _.DATA,
          l = _.CONNECT,
          s = U(e);
        switch (e) {
          case a:
            t = Ie.ellipse;
            break;
          case r:
            t = Ie.diamond;
            break;
          case o:
            t = Ie.rect;
            break;
          case n:
            t = Ie.bordered;
            break;
          case i:
            t = Ie.data;
            break;
          case l:
            t = Ie.connect;
            break;
          default:
            break;
        }
        return (0, ze.Z)(
          (0, ze.Z)({}, t),
          {},
          { backgroundColor: s.background, borderColor: s.border },
        );
      }
      var Oe = [
          {
            label: 'Start',
            title: '\u5f00\u59cb/\u7ed3\u675f',
            actionType: _.TRIGGER,
            styles: we(_.TRIGGER),
            shape: 'ellipse',
          },
          {
            label: 'Condition',
            title: '\u6761\u4ef6',
            actionType: _.CONDITION,
            styles: we(_.CONDITION),
            shape: 'diamond',
          },
          {
            label: 'Action',
            title: '\u64cd\u4f5c',
            actionType: _.ACTION,
            styles: we(_.ACTION),
            shape: 'rect',
          },
          {
            label: 'Optional',
            title: '\u53ef\u9009\u64cd\u4f5c',
            actionType: _.OPTIONAL,
            styles: we(_.OPTIONAL),
            shape: 'rect',
          },
          {
            label: 'Data',
            title: '\u6570\u636e',
            actionType: _.DATA,
            styles: we(_.DATA),
            shape: 'polygon',
          },
          {
            label: 'Connect',
            title: '\u8fde\u63a5',
            actionType: _.CONNECT,
            styles: we(_.CONNECT),
            shape: 'circle',
          },
        ],
        Re = he.Z.TabPane,
        De = (e) => {
          var t = (0, r.useState)({ freeze: !1 }),
            a = (0, s.Z)(t, 2),
            n = a[0],
            i = (a[1], e.cstate),
            l = (e.dispatch, (0, r.useRef)(i.graph)),
            c = (0, r.useRef)(i.dnd),
            d = (0, r.useRef)(i.text),
            p = (0, r.useState)(!1),
            u = (0, s.Z)(p, 2),
            f = u[0],
            m = u[1],
            g = (0, r.useMemo)(
              () => (e) => {
                m(e);
              },
              [],
            ),
            h = (0, r.useState)('1'),
            b = (0, s.Z)(h, 2),
            v = b[0],
            E = b[1],
            y = (0, r.useCallback)((e) => {
              console.log(String(e)), E(String(e));
            }, []);
          (0, r.useEffect)(() => {
            (l.current = i.graph), (c.current = i.dnd), (d.current = i.text);
          }, [i]);
          var k = (0, r.useCallback)(
              (e, t) => {
                var a,
                  r = e.actionType,
                  o = e.shape,
                  i = e.label,
                  s = _.TRIGGER,
                  d = _.CONDITION,
                  p = _.ACTION,
                  u = _.OPTIONAL,
                  f = _.DATA,
                  m = _.CONNECT,
                  g = _.DAG,
                  h = (_.DAGLINE, _.ER),
                  b = _.ALGO,
                  v = _.PRO;
                switch (r) {
                  case s:
                    a = J({
                      shape: o,
                      tooltip: i,
                      size: { width: 100, height: 50 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case d:
                    a = Q({
                      shape: 'rect',
                      tooltip: i,
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case p:
                    a = K({
                      shape: o,
                      tooltip: i,
                      size: { width: 100, height: 50 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case u:
                    a = H({
                      shape: o,
                      tooltip: i,
                      size: { width: 100, height: 50 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case f:
                    a = V({
                      shape: 'polygon',
                      tooltip: i,
                      size: { width: 100, height: 50 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case m:
                    a = j({
                      shape: 'circle',
                      tooltip: i,
                      size: { width: 60, height: 60 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case g:
                    a = X({
                      shape: 'dag-node',
                      tooltip: i,
                      size: { width: 350, height: 60 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case b:
                    a = q({
                      shape: 'dag-node',
                      tooltip: i,
                      size: { width: 350, height: 60 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case v:
                    a = Y({
                      shape: 'dag-node',
                      tooltip: i,
                      size: { width: 350, height: 60 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case h:
                    a = $({
                      shape: 'er-rect',
                      tooltip: i,
                      size: { width: 150, height: 24 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case 'Vue-node':
                    a = ee({
                      shape: 'rect',
                      tooltip: i,
                      size: { width: 110, height: 50 },
                      actionType: r,
                      initialization: !0,
                    });
                    break;
                  case 'Dag-Node':
                    break;
                  default:
                    break;
                }
                var E = l.current.createNode(a);
                n.freeze || c.current.start(E, t);
              },
              [l.current, c.current],
            ),
            x = { base: o().createElement(xe.Z, null) },
            C = (0, r.useMemo)(
              () => (e, t) =>
                o().createElement(
                  'div',
                  { style: { height: '10%' } },
                  x[e],
                  ' ',
                  t,
                ),
              [x],
            ),
            A = (0, r.useMemo)(
              () =>
                f
                  ? o().createElement(
                      o().Fragment,
                      null,
                      o().createElement(Re, { tab: C('base', ''), key: '1' }),
                    )
                  : o().createElement(
                      o().Fragment,
                      null,
                      o().createElement(
                        Re,
                        { tab: C('base', ''), key: '1' },
                        o().createElement(
                          'div',
                          { className: 'ctitle' },
                          '\u57fa\u7840\u6d41\u7a0b\u56fe\u7ec4\u4ef6',
                        ),
                        Oe.map((e, t) =>
                          o().createElement(
                            Te,
                            {
                              key: t,
                              onMouseDown: (t) => k(e, t),
                              title: e.title,
                            },
                            o().createElement('div', {
                              className: n.freeze
                                ? 'freeze-'.concat(e.shape)
                                : 'default-'.concat(e.shape),
                              style: e.styles,
                            }),
                          ),
                        ),
                        o().createElement(
                          'div',
                          { className: 'ctitle' },
                          ' DAG \u56fe',
                        ),
                        o().createElement(
                          Te,
                          {
                            title: '\u7b97\u6cd5\u6d41\u7a0b',
                            onMouseDown: (e) =>
                              k(
                                {
                                  label: 'algro-node',
                                  shape: 'dag-node',
                                  actionType: 'ALGO',
                                },
                                e,
                              ),
                          },
                          o().createElement(
                            'div',
                            null,
                            o().createElement(ke, {
                              src: 'https://s1.ax1x.com/2023/04/19/p9i5MPx.png',
                              className: n.freeze
                                ? 'freeze-rect'
                                : 'static-react-node',
                            }),
                          ),
                        ),
                        o().createElement(
                          Te,
                          {
                            title: '\u5de5\u7a0b\u5efa\u6a21',
                            onMouseDown: (e) =>
                              k(
                                {
                                  label: 'dag-node',
                                  shape: 'dag-node',
                                  actionType: 'PRO',
                                },
                                e,
                              ),
                          },
                          o().createElement(
                            'div',
                            null,
                            o().createElement(ke, {
                              src: 'https://s1.ax1x.com/2023/04/19/p9i5MPx.png',
                              className: n.freeze
                                ? 'freeze-rect'
                                : 'static-react-node',
                            }),
                          ),
                        ),
                        o().createElement(
                          Te,
                          {
                            title: '\u4eba\u5de5\u667a\u80fd',
                            onMouseDown: (e) =>
                              k(
                                {
                                  label: 'dag-node',
                                  shape: 'dag-node',
                                  actionType: 'DAG',
                                },
                                e,
                              ),
                          },
                          o().createElement(
                            'div',
                            null,
                            o().createElement(ke, {
                              src: 'https://s1.ax1x.com/2023/04/19/p9i5MPx.png',
                              className: n.freeze
                                ? 'freeze-rect'
                                : 'static-react-node',
                            }),
                          ),
                        ),
                        o().createElement(
                          'div',
                          { className: 'ctitle' },
                          'E - R \u5173\u7cfb\u56fe',
                        ),
                        o().createElement(
                          Te,
                          {
                            title: 'E - R',
                            onMouseDown: (e) =>
                              k(
                                {
                                  label: 'er-node',
                                  shape: 'er-node',
                                  actionType: 'ER',
                                },
                                e,
                              ),
                          },
                          o().createElement(
                            'div',
                            null,
                            o().createElement(ke, {
                              src: 'https://s1.ax1x.com/2023/04/19/p9i5MPx.png',
                              className: n.freeze
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
                className: 'antvlist',
                style: {
                  transition: 'all ease-in-out 0.5s',
                  position: 'fixed',
                  width: f ? '50px' : '350px',
                  zIndex: 200,
                  boxShadow: 'none',
                },
              },
              o().createElement(
                'div',
                { className: 'componentList' },
                o().createElement(
                  he.Z,
                  {
                    className: 'editorTabclass',
                    onTabClick: () => g(!1),
                    activeKey: v,
                    tabPosition: 'left',
                    onChange: (e) => y(e),
                  },
                  A,
                ),
              ),
              o().createElement(
                'div',
                {
                  className: 'collapsed',
                  style: { position: 'absolute', bottom: '80px', left: '20px' },
                  onClick: () => g(!f),
                },
                f
                  ? o().createElement(Ce.Z, null)
                  : o().createElement(_e.Z, null),
              ),
            ),
          );
        },
        Ze = (0, L.connect)((e) => ({ cstate: e.present.antvModal }))(De),
        Se = (e) =>
          o().createElement(
            o().Fragment,
            null,
            o().createElement(
              'div',
              { className: 'panel-area-container' },
              o().createElement('div', { id: 'minimap' }, e.children),
            ),
          ),
        Le = Se,
        Pe = a(66687),
        We = Pe.z.define({
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
        Fe = () => {
          F.kJ.registerNodeTool(y.REMOVE_BUTTON, We, !0),
            F.kJ.registerEdgeTool(y.REMOVE_BUTTON, We, !0);
        },
        Me =
          (a(48551),
          {
            logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
            success:
              'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
            failed:
              'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
            running:
              'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
          });
      class Ge extends o().Component {
        shouldComponentUpdate() {
          var e = this.props.node;
          return !(!e || !e.hasChanged('data'));
        }
        render() {
          var e = this.props.node,
            t = null === e || void 0 === e ? void 0 : e.getData(),
            a = t.label,
            r = t.status,
            n = void 0 === r ? 'default' : r;
          return o().createElement(
            'div',
            { className: 'dagnode '.concat(n) },
            o().createElement('img', { src: Me.logo }),
            o().createElement('span', { className: 'label' }, a),
            o().createElement(
              'span',
              { className: 'status' },
              'success' === n && o().createElement('img', { src: Me.success }),
              'failed' === n && o().createElement('img', { src: Me.failed }),
              'running' === n && o().createElement('img', { src: Me.running }),
            ),
          );
        }
      }
      var Ue = () => {
          F.kJ.registerConnector(
            'algo-connector',
            (e, t) => {
              var a = 4,
                r = Math.abs(t.y - e.y),
                o = Math.floor((r / 3) * 2),
                n = { x: e.x, y: e.y + a + o },
                i = { x: t.x, y: t.y - a - o };
              return F.y$.normalize(
                'M '
                  .concat(e.x, ' ')
                  .concat(e.y, '\n       L ')
                  .concat(e.x, ' ')
                  .concat(e.y + a, '\n       C ')
                  .concat(n.x, ' ')
                  .concat(n.y, ' ')
                  .concat(i.x, ' ')
                  .concat(i.y, ' ')
                  .concat(t.x, ' ')
                  .concat(t.y - a, '\n       L ')
                  .concat(t.x, ' ')
                  .concat(t.y, '\n      '),
              );
            },
            !0,
          ),
            F.kJ.registerNode(
              'dag-node',
              {
                inherit: 'react-shape',
                width: 180,
                height: 36,
                component: o().createElement(Ge, null),
                ports: {
                  groups: {
                    top: {
                      position: 'top',
                      attrs: {
                        circle: {
                          r: 4,
                          magnet: !0,
                          stroke: '#C2C8D5',
                          strokeWidth: 1,
                          fill: '#fff',
                        },
                      },
                    },
                    bottom: {
                      position: 'bottom',
                      attrs: {
                        circle: {
                          r: 4,
                          magnet: !0,
                          stroke: '#C2C8D5',
                          strokeWidth: 1,
                          fill: '#fff',
                        },
                      },
                    },
                  },
                },
              },
              !0,
            ),
            F.kJ.registerPortLayout(
              'er-PortPosition',
              (e) =>
                e.map((e, t) => ({
                  position: { x: 0, y: 24 * (t + 1) },
                  angle: 0,
                })),
              !0,
            ),
            F.kJ.registerNode(
              'er-rect',
              {
                inherit: 'rect',
                flag: 'er',
                markup: [
                  { tagName: 'rect', selector: 'body' },
                  { tagName: 'text', selector: 'label' },
                ],
                attrs: {
                  rect: { strokeWidth: 1, stroke: '#5F95FF', fill: '#5F95FF' },
                  label: { fontWeight: 'bold', fill: '#ffffff', fontSize: 12 },
                },
                ports: {
                  groups: {
                    'er-list': {
                      markup: [
                        { tagName: 'rect', selector: 'portBody' },
                        { tagName: 'text', selector: 'portNameLabel' },
                        { tagName: 'text', selector: 'portTypeLabel' },
                      ],
                      attrs: {
                        portBody: {
                          width: 150,
                          height: 24,
                          strokeWidth: 1,
                          stroke: '#5F95FF',
                          fill: '#EFF4FF',
                          magnet: !0,
                        },
                        portNameLabel: {
                          ref: 'portBody',
                          refX: 6,
                          refY: 6,
                          fontSize: 10,
                        },
                        portTypeLabel: {
                          ref: 'portBody',
                          refX: 95,
                          refY: 6,
                          fontSize: 10,
                        },
                      },
                      position: 'er-PortPosition',
                    },
                  },
                },
              },
              !0,
            );
        },
        Be = (e, t) => {
          var a = document.querySelectorAll(
            'g[data-cell-id="'.concat(e.id, '"] .x6-port-body'),
          );
          a.forEach((e) => {
            e.style.visibility = t ? 'visible' : 'hidden';
          });
        };
      function Je(e, t, a, r) {
        e.addNode({
          x: a,
          y: r,
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
      var Ke = (e) => {
          e.on('node:mouseenter', (t) => {
            var a = t.node,
              r = a.getData();
            r && r.disableMove ? Be(a, !1) : Be(a, !0);
            var o = a.store.data.position,
              n = o.x,
              i = o.y;
            a.data &&
              !a.data.initialization &&
              Je(e, a.data.tooltip, n + 100, i - 50);
          }),
            e.on('node:mouseleave', (t) => {
              var a,
                r = t.node;
              Be(r, !1),
                null === (a = e.getNodes()) ||
                  void 0 === a ||
                  a.forEach((t) => {
                    'html' === t.shape && e.removeNode(t);
                  });
            });
        },
        He = (e) => {
          e.on('cell:removed', () => {
            var t;
            null === (t = e.getNodes()) ||
              void 0 === t ||
              t.forEach((t) => {
                'html' === t.shape && e.removeNode(t);
              });
          });
        },
        Ve = (e) => {
          e.on('cell:selected', (t) => {
            var a,
              r = t.cell;
            if (
              (r.isEdge() &&
                (r.attr('line', { stroke: 'skyblue', strokeWidth: 3 }),
                (a = { distance: '30%' })),
              r.isNode())
            ) {
              var o = e.findView(r);
              o.addClass(''.concat(r.shape, '-selected')),
                (a = { x: -28, y: -5 });
            }
            E.dispatchEvent(k.CELL_CLICK, x.SELECTED);
            var n = e.getSelectedCells();
            n.length > 1
              ? n.forEach((e) => {
                  e.removeTools();
                })
              : r.addTools({ name: y.REMOVE_BUTTON, args: a });
          }),
            e.on('cell:unselected', (t) => {
              var a,
                r = t.cell;
              if (r.isEdge())
                r.attr('line', { stroke: '#7c68fc', strokeWidth: 2 });
              else {
                var o = e.findView(r);
                o && o.removeClass(''.concat(r.shape, '-selected'));
              }
              r.removeTools(),
                E.dispatchEvent(k.CELL_CLICK, x.UN_SELECTED),
                null === (a = e.getNodes()) ||
                  void 0 === a ||
                  a.forEach((t) => {
                    'html' === t.shape && e.removeNode(t);
                  });
            });
        },
        je = (e) => {
          e.on('edge:connected', (t) => {
            var a = t.edge,
              r = t.currentCell,
              o = t.currentMagnet;
            'rect' === o.tagName && (o = o.parentNode);
            var n = o.getAttribute('port');
            if (r.isNode() && 'vue-shape' === r.shape) {
              var i = e.findViewByCell(a);
              if (i) {
                var l = i.findOne('path');
                if (l) {
                  var s = F.OW.create('circle', { r: 5, fill: '#5F95FF' });
                  s.animateAlongPath(
                    { dur: '3s', repeatCount: 'indefinite' },
                    l,
                  ),
                    s.appendTo(l.parentNode);
                }
              }
            }
            'vue-shape' !== r.shape &&
              (r.setPortProp(n, 'connected', !0),
              (a.zIndex = -1),
              a.attr({
                line: { strokeDasharray: '', targetMarker: 'classic' },
              }),
              a.appendLabel({ attrs: { label: { text: '' } } }));
          });
        };
      function Qe(e) {
        var t = e.data,
          a = void 0 === t ? {} : t,
          r = e.data.tooltip,
          o = a.actionType;
        return { node: e, label: r, nodeId: e.id, actionType: o };
      }
      var Xe = (e) => {
        e.on('node:click', (e) => {
          var t = e.node,
            a = Qe(t);
          E.dispatchEvent(k.NODE_CLICK, a);
        }),
          e.on('node:dblclick', (t) => {
            var a = t.node,
              r = e.getSelectedCells();
            if (F.Uo.isArray(r) && 1 === r.length) {
              var o = Qe(a);
              E.dispatchEvent(k.DOUBLE_NODE_CLICK, o);
            }
          });
      };
      function Ye(e) {
        Ke(e), He(e), Ve(e), je(e), Xe(e);
      }
      function qe() {
        Ue();
        var e = new F.kJ({
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
            connector: 'algo-connector',
            router: { name: 'er', args: { offset: 25, direction: 'H' } },
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
                r = e.sourceMagnet,
                o = e.targetMagnet,
                n = e.sourceCell;
              if (!r || !o) return !1;
              if (null !== (t = n.getData()) && void 0 !== t && t.disableMove)
                return !1;
              var i = void 0;
              'rect' === o.tagName && (i = o.parentNode);
              var l =
                  void 0 === i
                    ? o.getAttribute('port')
                    : i.getAttribute('port'),
                s = a.cell,
                c = s.getPort(l);
              return !!c;
            },
          },
        });
        return Ye(e), A(e), e;
      }
      a(47673);
      var $e,
        et = a(4107),
        tt = a(90636),
        at = a(3182),
        rt = (a(88983), a(55742)),
        ot = (a(402), a(55672)),
        nt = (a(9715), a(55843)),
        it = a(59465),
        lt = a(49101),
        st = ['key', 'name'],
        ct = ve.ZP.div($e || ($e = (0, be.Z)(['']))),
        dt = (e) => {
          var t = e.cstate,
            a = (e.dispatch, (0, r.useRef)(t.graph)),
            l = (0, r.useState)([]),
            c = (0, s.Z)(l, 2),
            d = c[0],
            p = c[1],
            u = (0, r.useRef)(null);
          (0, r.useEffect)(() => {
            var e = a.current.getSelectedCells();
            if (F.Uo.isArray(e) && 1 === e.length) {
              var t = e[0];
              if (null !== t._model) {
                var r = t.getPorts();
                if ((p(r), 0 !== r.length))
                  for (var o = 0; o < r.length; ++o) {
                    var n;
                    null === (n = u.current) || void 0 === n || n.click();
                  }
              }
            }
          }, [t]);
          var f = (t) => {
            var r = t.key_value,
              o = [];
            r.map((t, a) => {
              var r = a + 1,
                n = e.nodeId + '_' + r,
                i = t.first,
                l = t.last,
                s = {
                  id: n,
                  group: 'er-list',
                  attrs: {
                    portNameLabel: { text: i },
                    portTypeLabel: { text: l },
                  },
                };
              o.push(s);
            }),
              p(o),
              le(o, a.current),
              e.setValue(void 0),
              e.setJson({});
          };
          return o().createElement(
            ct,
            null,
            o().createElement(
              nt.Z,
              {
                name: 'dynamic_form_nest_item',
                onFinish: f,
                autoComplete: 'off',
                style: { marginTop: '20px' },
              },
              o().createElement(nt.Z.List, { name: 'key_value' }, (e, t) => {
                var a = t.add,
                  r = t.remove;
                return o().createElement(
                  o().Fragment,
                  null,
                  e.map((e) => {
                    var t = e.key,
                      a = e.name;
                    (0, W.Z)(e, st);
                    return o().createElement(
                      n.Z,
                      {
                        key: t,
                        style: { display: 'flex', marginBottom: 8 },
                        align: 'baseline',
                      },
                      o().createElement(
                        nt.Z.Item,
                        {
                          name: [a, 'first'],
                          rules: [
                            {
                              required: !0,
                              message:
                                '\u5b57\u6bb5\u540d\u4e0d\u53ef\u4ee5\u4e3a\u7a7a',
                            },
                          ],
                          initialValue:
                            void 0 !== d[t]
                              ? d[t].attrs.portNameLabel.text
                              : '',
                        },
                        o().createElement(et.Z, {
                          placeholder:
                            void 0 !== d[t]
                              ? d[t].attrs.portNameLabel.text
                              : '\u5b57\u6bb5\u540d',
                        }),
                      ),
                      o().createElement(
                        nt.Z.Item,
                        {
                          name: [a, 'last'],
                          rules: [
                            {
                              required: !0,
                              message:
                                '\u7c7b\u578b\u4e0d\u53ef\u4ee5\u4e3a\u7a7a',
                            },
                          ],
                          initialValue:
                            void 0 !== d[t]
                              ? d[t].attrs.portTypeLabel.text
                              : '',
                        },
                        o().createElement(et.Z, {
                          placeholder:
                            void 0 !== d[t]
                              ? d[t].attrs.portTypeLabel.text
                              : '\u5c5e\u6027\u540d',
                        }),
                      ),
                      o().createElement(it.Z, { onClick: () => r(a) }),
                    );
                  }),
                  o().createElement(
                    nt.Z.Item,
                    null,
                    o().createElement(
                      i.Z,
                      {
                        ref: u,
                        type: 'dashed',
                        onClick: () => a(),
                        block: !0,
                        icon: o().createElement(lt.Z, null),
                      },
                      '\u589e\u51cf\u952e\u503c\u5bf9',
                    ),
                  ),
                );
              }),
              o().createElement(
                nt.Z.Item,
                null,
                o().createElement(
                  i.Z,
                  { type: 'primary', htmlType: 'submit', block: !0 },
                  '\u66f4\u65b0\u6570\u636e',
                ),
              ),
            ),
          );
        },
        pt = (0, L.connect)((e) => ({ cstate: e.present.antvModal }))(dt),
        ut = (e) => {
          var t = e.cstate,
            a = (e.disptach, (0, r.useRef)(t.node)),
            l = (0, r.useRef)(t.graph),
            c = (0, r.useState)({}),
            d = (0, s.Z)(c, 2),
            p = d[0],
            u = d[1],
            f = (0, r.useState)(),
            m = (0, s.Z)(f, 2),
            g = m[0],
            h = m[1],
            b = (0, r.useState)(''),
            v = (0, s.Z)(b, 2),
            E = v[0],
            y = v[1],
            k = (0, r.useState)([]),
            x = (0, s.Z)(k, 2),
            C = x[0],
            _ = x[1],
            A = (0, r.useState)([]),
            N = (0, s.Z)(A, 2),
            T = N[0],
            z = N[1];
          (0, r.useEffect)(() => {
            (a.current = t.node), (l.current = t.graph);
            var e = re(a.current);
            u(e),
              console.log('json', e),
              h(e.label),
              y(e.nodeId),
              'dag-node' === e.label &&
                (function () {
                  var e = pe(l.current),
                    t = e.nodes;
                  console.log('nodes: ', t);
                  var a = [],
                    r = [];
                  t.map((e, t) => {
                    if (e.data && 'DAG' === e.data.actionType) {
                      var r = {
                        id: e.id,
                        name: e.data.tooltip,
                        status: 'default',
                      };
                      a.push(r);
                    }
                  }),
                    _(a);
                  for (var o = 0, n = 0; n < a.length + 1; ++n) {
                    var i = a;
                    (i = i.map((e) =>
                      (0, ze.Z)((0, ze.Z)({}, e), {}, { key: o }),
                    )),
                      ++o,
                      r.push(i);
                  }
                  z(r);
                })();
          }, [t]);
          var I = (e) => {
              h(e.target.value);
            },
            w = () => {
              ie({ label: g }, l.current), h(void 0), u({});
            },
            O = (e) => {
              var t = e.target.value,
                a = t.split('@'),
                r = a[0],
                o = a[1],
                n = a[2],
                i = T;
              i[n].map((e) => {
                if (o === e.id) return (e.status = r), e;
              }),
                z(i);
            },
            R = (e) => {
              for (
                var t = e.label, a = e.nodeId, r = [], i = 0;
                i < C.length + 1;
                ++i
              ) {
                var l = o().createElement(
                  o().Fragment,
                  null,
                  o().createElement(
                    ot.Z.Text,
                    { style: { marginLeft: '5px' } },
                    '\u8282\u70b9\u3010'
                      .concat(t, '\u3011\u7ed3\u675f\u72b6\u6001 ')
                      .concat(i + 1),
                  ),
                  o().createElement(
                    n.Z.Compact,
                    {
                      key: i,
                      style: { marginLeft: '5px', marginRight: '5px' },
                    },
                    o().createElement(
                      rt.ZP.Group,
                      {
                        name: 'dag' + i,
                        size: 'small',
                        onChange: O,
                        defaultValue: 'default@'.concat(a, '@').concat(i),
                      },
                      o().createElement(
                        rt.ZP.Button,
                        { value: 'default@'.concat(a, '@').concat(i) },
                        'Default',
                      ),
                      o().createElement(
                        rt.ZP.Button,
                        { value: 'running@'.concat(a, '@').concat(i) },
                        'Running',
                      ),
                      o().createElement(
                        rt.ZP.Button,
                        { value: 'success@'.concat(a, '@').concat(i) },
                        'Success',
                      ),
                      o().createElement(
                        rt.ZP.Button,
                        { value: 'failed@'.concat(a, '@').concat(i) },
                        'Failed',
                      ),
                    ),
                  ),
                );
                r.push(l);
              }
              return o().createElement(o().Fragment, null, r);
            },
            D = (function () {
              var e = (0, at.Z)(
                (0, tt.Z)().mark(function e(t) {
                  var a;
                  return (0, tt.Z)().wrap(function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          (a = t.shift()),
                            null === a ||
                              void 0 === a ||
                              a.forEach((e) => {
                                var t = e.id,
                                  a = e.status,
                                  r = l.current.getCellById(t),
                                  o = r.getData();
                                r.setData(
                                  (0, ze.Z)(
                                    (0, ze.Z)({}, o),
                                    {},
                                    { status: a },
                                  ),
                                );
                              }),
                            setTimeout(() => {
                              D(t);
                            }, 3e3);
                        case 3:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })();
          return o().createElement(
            o().Fragment,
            null,
            o().createElement(
              'div',
              { className: 'antv-user-contaniner' },
              o().createElement(
                ot.Z.Text,
                { style: { marginLeft: '5px', marginRight: '5px' } },
                '\u6807\u7b7e:',
              ),
              o().createElement(
                n.Z,
                { size: 'large' },
                o().createElement(
                  n.Z.Compact,
                  { style: { width: '100%' } },
                  o().createElement(et.Z, { value: g, onChange: (e) => I(e) }),
                  o().createElement(
                    i.Z,
                    {
                      disabled: '{}' === JSON.stringify(p),
                      onClick: () => w(),
                    },
                    'Submit',
                  ),
                ),
              ),
              'DAG' === p.actionType &&
                o().createElement(
                  o().Fragment,
                  null,
                  o().createElement(
                    n.Z,
                    {
                      direction: 'vertical',
                      size: 'large',
                      style: { marginTop: '20px' },
                    },
                    o().createElement(
                      ot.Z.Text,
                      {
                        style: {
                          marginLeft: '5px',
                          marginRight: '5px',
                          fontWeight: 700,
                        },
                      },
                      'DAG\u6d41\u7a0b\u52a8\u753b:',
                    ),
                    R(p),
                  ),
                  o().createElement(
                    i.Z,
                    {
                      style: { marginTop: '2.5em', marginLeft: '5px' },
                      onClick: () => D(T),
                    },
                    '\u8282\u70b9\u52a8\u753b',
                  ),
                ),
              'ER' === p.actionType &&
                o().createElement(
                  o().Fragment,
                  null,
                  o().createElement(
                    'div',
                    { style: { marginLeft: '10px', marginRight: '10px' } },
                    o().createElement(pt, {
                      nodeId: E,
                      setValue: h,
                      setJson: u,
                    }),
                  ),
                ),
            ),
          );
        },
        ft = (0, L.connect)((e) => ({ cstate: e.present.antvModal }))(ut);
      function mt(e) {
        var t = (0, r.useRef)();
        return (0, r.useEffect)(() => ((t.current = e), () => {}), [e]), t;
      }
      var gt = (e) => {
          var t = (0, r.useRef)(null),
            a = (0, r.useRef)(null),
            n = (0, r.useRef)(null),
            i = e.cstate,
            l = e.dispatch;
          return (
            (0, r.useEffect)(() => {
              n.current = i.node;
            }, [i.node]),
            (0, r.useEffect)(() => {
              Fe();
              var e = qe(),
                r = new F.e9.q6({
                  target: e,
                  validateNode() {
                    return !0;
                  },
                });
              l({
                type: 'antvModal/initializeGraph',
                payload: { graph: e, dnd: r, text: 'hello dva' },
              }),
                (a.current = r),
                (t.current = e);
            }, []),
            (0, r.useEffect)(() => {
              E.eventListener(k.NODE_CLICK, (e) => {
                console.log('node-click', e),
                  l({ type: 'antvModal/singleClick', payload: { node: e } });
              });
            }, []),
            o().createElement(
              o().Fragment,
              null,
              o().createElement(
                'div',
                { className: 'layout' },
                o().createElement(ge, { super: e }),
                o().createElement(
                  'div',
                  { className: 'container' },
                  o().createElement(Ze, { graph: t, dnd: a }),
                  o().createElement('div', {
                    id: 'container',
                    className: 'graph-main-container',
                  }),
                  o().createElement(
                    'div',
                    { className: 'user-controller-container' },
                    o().createElement(
                      'div',
                      { className: 'common-actions' },
                      o().createElement(ft, null),
                    ),
                    o().createElement(
                      'div',
                      { className: 'panel-area-container' },
                      o().createElement(
                        Le,
                        null,
                        o().createElement(
                          'template',
                          { 'slot-scope': '{ row }' },
                          o().createElement('slot', {
                            name: C.PANEL_AREA_SLOT,
                          }),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            )
          );
        },
        ht = (0, L.connect)((e) => ({ cstate: e.present.antvModal }))(gt);
    },
  },
]);
