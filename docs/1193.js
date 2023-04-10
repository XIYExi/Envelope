(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1193],
  {
    86010: function (e, t, r) {
      'use strict';
      function n(e) {
        var t,
          r,
          o = '';
        if ('string' == typeof e || 'number' == typeof e) o += e;
        else if ('object' == typeof e)
          if (Array.isArray(e))
            for (t = 0; t < e.length; t++)
              e[t] && (r = n(e[t])) && (o && (o += ' '), (o += r));
          else for (t in e) e[t] && (o && (o += ' '), (o += t));
        return o;
      }
      function o() {
        for (var e, t, r = 0, o = ''; r < arguments.length; )
          (e = arguments[r++]) && (t = n(e)) && (o && (o += ' '), (o += t));
        return o;
      }
      r.r(t),
        r.d(t, {
          clsx: function () {
            return o;
          },
        }),
        (t['default'] = o);
    },
    75668: function (e, t, r) {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'DraggableCore', {
          enumerable: !0,
          get: function () {
            return f.default;
          },
        }),
        (t.default = void 0);
      var o = b(r(12924)),
        a = g(r(55301)),
        i = g(r(11092)),
        u = g(r(86010)),
        l = r(81825),
        s = r(2849),
        c = r(9280),
        f = g(r(80783)),
        d = g(r(55904)),
        p = [
          'axis',
          'bounds',
          'children',
          'defaultPosition',
          'defaultClassName',
          'defaultClassNameDragging',
          'defaultClassNameDragged',
          'position',
          'positionOffset',
          'scale',
        ];
      function g(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function y(e) {
        if ('function' !== typeof WeakMap) return null;
        var t = new WeakMap(),
          r = new WeakMap();
        return (y = function (e) {
          return e ? r : t;
        })(e);
      }
      function b(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ('object' !== n(e) && 'function' !== typeof e))
          return { default: e };
        var r = y(t);
        if (r && r.has(e)) return r.get(e);
        var o = {},
          a = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e)
          if ('default' !== i && Object.prototype.hasOwnProperty.call(e, i)) {
            var u = a ? Object.getOwnPropertyDescriptor(e, i) : null;
            u && (u.get || u.set)
              ? Object.defineProperty(o, i, u)
              : (o[i] = e[i]);
          }
        return (o.default = e), r && r.set(e, o), o;
      }
      function h() {
        return (
          (h =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
          h.apply(this, arguments)
        );
      }
      function m(e, t) {
        if (null == e) return {};
        var r,
          n,
          o = v(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (o[r] = e[r]));
        }
        return o;
      }
      function v(e, t) {
        if (null == e) return {};
        var r,
          n,
          o = {},
          a = Object.keys(e);
        for (n = 0; n < a.length; n++)
          (r = a[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
        return o;
      }
      function S(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function w(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? S(Object(r), !0).forEach(function (t) {
                W(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : S(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
        }
        return e;
      }
      function O(e, t) {
        return M(e) || x(e, t) || P(e, t) || D();
      }
      function D() {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      }
      function P(e, t) {
        if (e) {
          if ('string' === typeof e) return j(e, t);
          var r = Object.prototype.toString.call(e).slice(8, -1);
          return (
            'Object' === r && e.constructor && (r = e.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(e)
              : 'Arguments' === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? j(e, t)
              : void 0
          );
        }
      }
      function j(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      function x(e, t) {
        var r =
          null == e
            ? null
            : ('undefined' !== typeof Symbol && e[Symbol.iterator]) ||
              e['@@iterator'];
        if (null != r) {
          var n,
            o,
            a = [],
            i = !0,
            u = !1;
          try {
            for (r = r.call(e); !(i = (n = r.next()).done); i = !0)
              if ((a.push(n.value), t && a.length === t)) break;
          } catch (l) {
            (u = !0), (o = l);
          } finally {
            try {
              i || null == r['return'] || r['return']();
            } finally {
              if (u) throw o;
            }
          }
          return a;
        }
      }
      function M(e) {
        if (Array.isArray(e)) return e;
      }
      function E(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function T(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function C(e, t, r) {
        return (
          t && T(e.prototype, t),
          r && T(e, r),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          e
        );
      }
      function N(e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function',
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t && k(e, t);
      }
      function k(e, t) {
        return (
          (k =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          k(e, t)
        );
      }
      function _(e) {
        var t = Y();
        return function () {
          var r,
            n = R(e);
          if (t) {
            var o = R(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return A(this, r);
        };
      }
      function A(e, t) {
        if (t && ('object' === n(t) || 'function' === typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            'Derived constructors may only return object or undefined',
          );
        return X(e);
      }
      function X(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
          );
        return e;
      }
      function Y() {
        if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      }
      function R(e) {
        return (
          (R = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          R(e)
        );
      }
      function W(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var I = (function (e) {
        N(r, e);
        var t = _(r);
        function r(e) {
          var n;
          return (
            E(this, r),
            (n = t.call(this, e)),
            W(X(n), 'onDragStart', function (e, t) {
              (0, d.default)('Draggable: onDragStart: %j', t);
              var r = n.props.onStart(e, (0, s.createDraggableData)(X(n), t));
              if (!1 === r) return !1;
              n.setState({ dragging: !0, dragged: !0 });
            }),
            W(X(n), 'onDrag', function (e, t) {
              if (!n.state.dragging) return !1;
              (0, d.default)('Draggable: onDrag: %j', t);
              var r = (0, s.createDraggableData)(X(n), t),
                o = { x: r.x, y: r.y };
              if (n.props.bounds) {
                var a = o.x,
                  i = o.y;
                (o.x += n.state.slackX), (o.y += n.state.slackY);
                var u = (0, s.getBoundPosition)(X(n), o.x, o.y),
                  l = O(u, 2),
                  c = l[0],
                  f = l[1];
                (o.x = c),
                  (o.y = f),
                  (o.slackX = n.state.slackX + (a - o.x)),
                  (o.slackY = n.state.slackY + (i - o.y)),
                  (r.x = o.x),
                  (r.y = o.y),
                  (r.deltaX = o.x - n.state.x),
                  (r.deltaY = o.y - n.state.y);
              }
              var p = n.props.onDrag(e, r);
              if (!1 === p) return !1;
              n.setState(o);
            }),
            W(X(n), 'onDragStop', function (e, t) {
              if (!n.state.dragging) return !1;
              var r = n.props.onStop(e, (0, s.createDraggableData)(X(n), t));
              if (!1 === r) return !1;
              (0, d.default)('Draggable: onDragStop: %j', t);
              var o = { dragging: !1, slackX: 0, slackY: 0 },
                a = Boolean(n.props.position);
              if (a) {
                var i = n.props.position,
                  u = i.x,
                  l = i.y;
                (o.x = u), (o.y = l);
              }
              n.setState(o);
            }),
            (n.state = {
              dragging: !1,
              dragged: !1,
              x: e.position ? e.position.x : e.defaultPosition.x,
              y: e.position ? e.position.y : e.defaultPosition.y,
              prevPropsPosition: w({}, e.position),
              slackX: 0,
              slackY: 0,
              isElementSVG: !1,
            }),
            !e.position ||
              e.onDrag ||
              e.onStop ||
              console.warn(
                'A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.',
              ),
            n
          );
        }
        return (
          C(
            r,
            [
              {
                key: 'componentDidMount',
                value: function () {
                  'undefined' !== typeof window.SVGElement &&
                    this.findDOMNode() instanceof window.SVGElement &&
                    this.setState({ isElementSVG: !0 });
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  this.setState({ dragging: !1 });
                },
              },
              {
                key: 'findDOMNode',
                value: function () {
                  var e, t, r;
                  return null !==
                    (e =
                      null === (t = this.props) ||
                      void 0 === t ||
                      null === (r = t.nodeRef) ||
                      void 0 === r
                        ? void 0
                        : r.current) && void 0 !== e
                    ? e
                    : i.default.findDOMNode(this);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e,
                    t = this.props,
                    r = (t.axis, t.bounds, t.children),
                    n = t.defaultPosition,
                    a = t.defaultClassName,
                    i = t.defaultClassNameDragging,
                    c = t.defaultClassNameDragged,
                    d = t.position,
                    g = t.positionOffset,
                    y = (t.scale, m(t, p)),
                    b = {},
                    v = null,
                    S = Boolean(d),
                    O = !S || this.state.dragging,
                    D = d || n,
                    P = {
                      x: (0, s.canDragX)(this) && O ? this.state.x : D.x,
                      y: (0, s.canDragY)(this) && O ? this.state.y : D.y,
                    };
                  this.state.isElementSVG
                    ? (v = (0, l.createSVGTransform)(P, g))
                    : (b = (0, l.createCSSTransform)(P, g));
                  var j = (0, u.default)(
                    r.props.className || '',
                    a,
                    ((e = {}),
                    W(e, i, this.state.dragging),
                    W(e, c, this.state.dragged),
                    e),
                  );
                  return o.createElement(
                    f.default,
                    h({}, y, {
                      onStart: this.onDragStart,
                      onDrag: this.onDrag,
                      onStop: this.onDragStop,
                    }),
                    o.cloneElement(o.Children.only(r), {
                      className: j,
                      style: w(w({}, r.props.style), b),
                      transform: v,
                    }),
                  );
                },
              },
            ],
            [
              {
                key: 'getDerivedStateFromProps',
                value: function (e, t) {
                  var r = e.position,
                    n = t.prevPropsPosition;
                  return !r || (n && r.x === n.x && r.y === n.y)
                    ? null
                    : ((0, d.default)(
                        'Draggable: getDerivedStateFromProps %j',
                        { position: r, prevPropsPosition: n },
                      ),
                      { x: r.x, y: r.y, prevPropsPosition: w({}, r) });
                },
              },
            ],
          ),
          r
        );
      })(o.Component);
      (t.default = I),
        W(I, 'displayName', 'Draggable'),
        W(
          I,
          'propTypes',
          w(
            w({}, f.default.propTypes),
            {},
            {
              axis: a.default.oneOf(['both', 'x', 'y', 'none']),
              bounds: a.default.oneOfType([
                a.default.shape({
                  left: a.default.number,
                  right: a.default.number,
                  top: a.default.number,
                  bottom: a.default.number,
                }),
                a.default.string,
                a.default.oneOf([!1]),
              ]),
              defaultClassName: a.default.string,
              defaultClassNameDragging: a.default.string,
              defaultClassNameDragged: a.default.string,
              defaultPosition: a.default.shape({
                x: a.default.number,
                y: a.default.number,
              }),
              positionOffset: a.default.shape({
                x: a.default.oneOfType([a.default.number, a.default.string]),
                y: a.default.oneOfType([a.default.number, a.default.string]),
              }),
              position: a.default.shape({
                x: a.default.number,
                y: a.default.number,
              }),
              className: c.dontSetMe,
              style: c.dontSetMe,
              transform: c.dontSetMe,
            },
          ),
        ),
        W(
          I,
          'defaultProps',
          w(
            w({}, f.default.defaultProps),
            {},
            {
              axis: 'both',
              bounds: !1,
              defaultClassName: 'react-draggable',
              defaultClassNameDragging: 'react-draggable-dragging',
              defaultClassNameDragged: 'react-draggable-dragged',
              defaultPosition: { x: 0, y: 0 },
              scale: 1,
            },
          ),
        );
    },
    80783: function (e, t, r) {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var o = p(r(12924)),
        a = f(r(55301)),
        i = f(r(11092)),
        u = r(81825),
        l = r(2849),
        s = r(9280),
        c = f(r(55904));
      function f(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function d(e) {
        if ('function' !== typeof WeakMap) return null;
        var t = new WeakMap(),
          r = new WeakMap();
        return (d = function (e) {
          return e ? r : t;
        })(e);
      }
      function p(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ('object' !== n(e) && 'function' !== typeof e))
          return { default: e };
        var r = d(t);
        if (r && r.has(e)) return r.get(e);
        var o = {},
          a = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e)
          if ('default' !== i && Object.prototype.hasOwnProperty.call(e, i)) {
            var u = a ? Object.getOwnPropertyDescriptor(e, i) : null;
            u && (u.get || u.set)
              ? Object.defineProperty(o, i, u)
              : (o[i] = e[i]);
          }
        return (o.default = e), r && r.set(e, o), o;
      }
      function g(e, t) {
        return v(e) || m(e, t) || b(e, t) || y();
      }
      function y() {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      }
      function b(e, t) {
        if (e) {
          if ('string' === typeof e) return h(e, t);
          var r = Object.prototype.toString.call(e).slice(8, -1);
          return (
            'Object' === r && e.constructor && (r = e.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(e)
              : 'Arguments' === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? h(e, t)
              : void 0
          );
        }
      }
      function h(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      function m(e, t) {
        var r =
          null == e
            ? null
            : ('undefined' !== typeof Symbol && e[Symbol.iterator]) ||
              e['@@iterator'];
        if (null != r) {
          var n,
            o,
            a = [],
            i = !0,
            u = !1;
          try {
            for (r = r.call(e); !(i = (n = r.next()).done); i = !0)
              if ((a.push(n.value), t && a.length === t)) break;
          } catch (l) {
            (u = !0), (o = l);
          } finally {
            try {
              i || null == r['return'] || r['return']();
            } finally {
              if (u) throw o;
            }
          }
          return a;
        }
      }
      function v(e) {
        if (Array.isArray(e)) return e;
      }
      function S(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function w(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function O(e, t, r) {
        return (
          t && w(e.prototype, t),
          r && w(e, r),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          e
        );
      }
      function D(e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function',
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          t && P(e, t);
      }
      function P(e, t) {
        return (
          (P =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          P(e, t)
        );
      }
      function j(e) {
        var t = E();
        return function () {
          var r,
            n = T(e);
          if (t) {
            var o = T(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return x(this, r);
        };
      }
      function x(e, t) {
        if (t && ('object' === n(t) || 'function' === typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            'Derived constructors may only return object or undefined',
          );
        return M(e);
      }
      function M(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
          );
        return e;
      }
      function E() {
        if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' === typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {}),
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      }
      function T(e) {
        return (
          (T = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          T(e)
        );
      }
      function C(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var N = {
          touch: { start: 'touchstart', move: 'touchmove', stop: 'touchend' },
          mouse: { start: 'mousedown', move: 'mousemove', stop: 'mouseup' },
        },
        k = N.mouse,
        _ = (function (e) {
          D(r, e);
          var t = j(r);
          function r() {
            var e;
            S(this, r);
            for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
              o[a] = arguments[a];
            return (
              (e = t.call.apply(t, [this].concat(o))),
              C(M(e), 'state', {
                dragging: !1,
                lastX: NaN,
                lastY: NaN,
                touchIdentifier: null,
              }),
              C(M(e), 'mounted', !1),
              C(M(e), 'handleDragStart', function (t) {
                if (
                  (e.props.onMouseDown(t),
                  !e.props.allowAnyClick &&
                    'number' === typeof t.button &&
                    0 !== t.button)
                )
                  return !1;
                var r = e.findDOMNode();
                if (!r || !r.ownerDocument || !r.ownerDocument.body)
                  throw new Error('<DraggableCore> not mounted on DragStart!');
                var n = r.ownerDocument;
                if (
                  !(
                    e.props.disabled ||
                    !(t.target instanceof n.defaultView.Node) ||
                    (e.props.handle &&
                      !(0, u.matchesSelectorAndParentsTo)(
                        t.target,
                        e.props.handle,
                        r,
                      )) ||
                    (e.props.cancel &&
                      (0, u.matchesSelectorAndParentsTo)(
                        t.target,
                        e.props.cancel,
                        r,
                      ))
                  )
                ) {
                  'touchstart' === t.type && t.preventDefault();
                  var o = (0, u.getTouchIdentifier)(t);
                  e.setState({ touchIdentifier: o });
                  var a = (0, l.getControlPosition)(t, o, M(e));
                  if (null != a) {
                    var i = a.x,
                      s = a.y,
                      f = (0, l.createCoreData)(M(e), i, s);
                    (0, c.default)('DraggableCore: handleDragStart: %j', f),
                      (0, c.default)('calling', e.props.onStart);
                    var d = e.props.onStart(t, f);
                    !1 !== d &&
                      !1 !== e.mounted &&
                      (e.props.enableUserSelectHack &&
                        (0, u.addUserSelectStyles)(n),
                      e.setState({ dragging: !0, lastX: i, lastY: s }),
                      (0, u.addEvent)(n, k.move, e.handleDrag),
                      (0, u.addEvent)(n, k.stop, e.handleDragStop));
                  }
                }
              }),
              C(M(e), 'handleDrag', function (t) {
                var r = (0, l.getControlPosition)(
                  t,
                  e.state.touchIdentifier,
                  M(e),
                );
                if (null != r) {
                  var n = r.x,
                    o = r.y;
                  if (Array.isArray(e.props.grid)) {
                    var a = n - e.state.lastX,
                      i = o - e.state.lastY,
                      u = (0, l.snapToGrid)(e.props.grid, a, i),
                      s = g(u, 2);
                    if (((a = s[0]), (i = s[1]), !a && !i)) return;
                    (n = e.state.lastX + a), (o = e.state.lastY + i);
                  }
                  var f = (0, l.createCoreData)(M(e), n, o);
                  (0, c.default)('DraggableCore: handleDrag: %j', f);
                  var d = e.props.onDrag(t, f);
                  if (!1 !== d && !1 !== e.mounted)
                    e.setState({ lastX: n, lastY: o });
                  else
                    try {
                      e.handleDragStop(new MouseEvent('mouseup'));
                    } catch (y) {
                      var p = document.createEvent('MouseEvents');
                      p.initMouseEvent(
                        'mouseup',
                        !0,
                        !0,
                        window,
                        0,
                        0,
                        0,
                        0,
                        0,
                        !1,
                        !1,
                        !1,
                        !1,
                        0,
                        null,
                      ),
                        e.handleDragStop(p);
                    }
                }
              }),
              C(M(e), 'handleDragStop', function (t) {
                if (e.state.dragging) {
                  var r = (0, l.getControlPosition)(
                    t,
                    e.state.touchIdentifier,
                    M(e),
                  );
                  if (null != r) {
                    var n = r.x,
                      o = r.y;
                    if (Array.isArray(e.props.grid)) {
                      var a = n - e.state.lastX || 0,
                        i = o - e.state.lastY || 0,
                        s = (0, l.snapToGrid)(e.props.grid, a, i),
                        f = g(s, 2);
                      (a = f[0]),
                        (i = f[1]),
                        (n = e.state.lastX + a),
                        (o = e.state.lastY + i);
                    }
                    var d = (0, l.createCoreData)(M(e), n, o),
                      p = e.props.onStop(t, d);
                    if (!1 === p || !1 === e.mounted) return !1;
                    var y = e.findDOMNode();
                    y &&
                      e.props.enableUserSelectHack &&
                      (0, u.removeUserSelectStyles)(y.ownerDocument),
                      (0, c.default)('DraggableCore: handleDragStop: %j', d),
                      e.setState({ dragging: !1, lastX: NaN, lastY: NaN }),
                      y &&
                        ((0, c.default)('DraggableCore: Removing handlers'),
                        (0, u.removeEvent)(
                          y.ownerDocument,
                          k.move,
                          e.handleDrag,
                        ),
                        (0, u.removeEvent)(
                          y.ownerDocument,
                          k.stop,
                          e.handleDragStop,
                        ));
                  }
                }
              }),
              C(M(e), 'onMouseDown', function (t) {
                return (k = N.mouse), e.handleDragStart(t);
              }),
              C(M(e), 'onMouseUp', function (t) {
                return (k = N.mouse), e.handleDragStop(t);
              }),
              C(M(e), 'onTouchStart', function (t) {
                return (k = N.touch), e.handleDragStart(t);
              }),
              C(M(e), 'onTouchEnd', function (t) {
                return (k = N.touch), e.handleDragStop(t);
              }),
              e
            );
          }
          return (
            O(r, [
              {
                key: 'componentDidMount',
                value: function () {
                  this.mounted = !0;
                  var e = this.findDOMNode();
                  e &&
                    (0, u.addEvent)(e, N.touch.start, this.onTouchStart, {
                      passive: !1,
                    });
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  this.mounted = !1;
                  var e = this.findDOMNode();
                  if (e) {
                    var t = e.ownerDocument;
                    (0, u.removeEvent)(t, N.mouse.move, this.handleDrag),
                      (0, u.removeEvent)(t, N.touch.move, this.handleDrag),
                      (0, u.removeEvent)(t, N.mouse.stop, this.handleDragStop),
                      (0, u.removeEvent)(t, N.touch.stop, this.handleDragStop),
                      (0, u.removeEvent)(e, N.touch.start, this.onTouchStart, {
                        passive: !1,
                      }),
                      this.props.enableUserSelectHack &&
                        (0, u.removeUserSelectStyles)(t);
                  }
                },
              },
              {
                key: 'findDOMNode',
                value: function () {
                  var e, t, r;
                  return null !== (e = this.props) && void 0 !== e && e.nodeRef
                    ? null === (t = this.props) ||
                      void 0 === t ||
                      null === (r = t.nodeRef) ||
                      void 0 === r
                      ? void 0
                      : r.current
                    : i.default.findDOMNode(this);
                },
              },
              {
                key: 'render',
                value: function () {
                  return o.cloneElement(o.Children.only(this.props.children), {
                    onMouseDown: this.onMouseDown,
                    onMouseUp: this.onMouseUp,
                    onTouchEnd: this.onTouchEnd,
                  });
                },
              },
            ]),
            r
          );
        })(o.Component);
      (t.default = _),
        C(_, 'displayName', 'DraggableCore'),
        C(_, 'propTypes', {
          allowAnyClick: a.default.bool,
          disabled: a.default.bool,
          enableUserSelectHack: a.default.bool,
          offsetParent: function (e, t) {
            if (e[t] && 1 !== e[t].nodeType)
              throw new Error("Draggable's offsetParent must be a DOM Node.");
          },
          grid: a.default.arrayOf(a.default.number),
          handle: a.default.string,
          cancel: a.default.string,
          nodeRef: a.default.object,
          onStart: a.default.func,
          onDrag: a.default.func,
          onStop: a.default.func,
          onMouseDown: a.default.func,
          scale: a.default.number,
          className: s.dontSetMe,
          style: s.dontSetMe,
          transform: s.dontSetMe,
        }),
        C(_, 'defaultProps', {
          allowAnyClick: !1,
          disabled: !1,
          enableUserSelectHack: !0,
          onStart: function () {},
          onDrag: function () {},
          onStop: function () {},
          onMouseDown: function () {},
          scale: 1,
        });
    },
    61193: function (e, t, r) {
      'use strict';
      var n = r(75668),
        o = n.default,
        a = n.DraggableCore;
      (e.exports = o), (e.exports.default = o), (e.exports.DraggableCore = a);
    },
    81825: function (e, t, r) {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.addClassName = E),
        (t.addEvent = g),
        (t.addUserSelectStyles = x),
        (t.createCSSTransform = w),
        (t.createSVGTransform = O),
        (t.getTouch = P),
        (t.getTouchIdentifier = j),
        (t.getTranslation = D),
        (t.innerHeight = m),
        (t.innerWidth = v),
        (t.matchesSelector = d),
        (t.matchesSelectorAndParentsTo = p),
        (t.offsetXYFromParent = S),
        (t.outerHeight = b),
        (t.outerWidth = h),
        (t.removeClassName = T),
        (t.removeEvent = y),
        (t.removeUserSelectStyles = M);
      var o = r(9280),
        a = u(r(38650));
      function i(e) {
        if ('function' !== typeof WeakMap) return null;
        var t = new WeakMap(),
          r = new WeakMap();
        return (i = function (e) {
          return e ? r : t;
        })(e);
      }
      function u(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ('object' !== n(e) && 'function' !== typeof e))
          return { default: e };
        var r = i(t);
        if (r && r.has(e)) return r.get(e);
        var o = {},
          a = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var u in e)
          if ('default' !== u && Object.prototype.hasOwnProperty.call(e, u)) {
            var l = a ? Object.getOwnPropertyDescriptor(e, u) : null;
            l && (l.get || l.set)
              ? Object.defineProperty(o, u, l)
              : (o[u] = e[u]);
          }
        return (o.default = e), r && r.set(e, o), o;
      }
      function l(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? l(Object(r), !0).forEach(function (t) {
                c(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : l(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t),
                );
              });
        }
        return e;
      }
      function c(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var f = '';
      function d(e, t) {
        return (
          f ||
            (f = (0, o.findInArray)(
              [
                'matches',
                'webkitMatchesSelector',
                'mozMatchesSelector',
                'msMatchesSelector',
                'oMatchesSelector',
              ],
              function (t) {
                return (0, o.isFunction)(e[t]);
              },
            )),
          !!(0, o.isFunction)(e[f]) && e[f](t)
        );
      }
      function p(e, t, r) {
        var n = e;
        do {
          if (d(n, t)) return !0;
          if (n === r) return !1;
          n = n.parentNode;
        } while (n);
        return !1;
      }
      function g(e, t, r, n) {
        if (e) {
          var o = s({ capture: !0 }, n);
          e.addEventListener
            ? e.addEventListener(t, r, o)
            : e.attachEvent
            ? e.attachEvent('on' + t, r)
            : (e['on' + t] = r);
        }
      }
      function y(e, t, r, n) {
        if (e) {
          var o = s({ capture: !0 }, n);
          e.removeEventListener
            ? e.removeEventListener(t, r, o)
            : e.detachEvent
            ? e.detachEvent('on' + t, r)
            : (e['on' + t] = null);
        }
      }
      function b(e) {
        var t = e.clientHeight,
          r = e.ownerDocument.defaultView.getComputedStyle(e);
        return (
          (t += (0, o.int)(r.borderTopWidth)),
          (t += (0, o.int)(r.borderBottomWidth)),
          t
        );
      }
      function h(e) {
        var t = e.clientWidth,
          r = e.ownerDocument.defaultView.getComputedStyle(e);
        return (
          (t += (0, o.int)(r.borderLeftWidth)),
          (t += (0, o.int)(r.borderRightWidth)),
          t
        );
      }
      function m(e) {
        var t = e.clientHeight,
          r = e.ownerDocument.defaultView.getComputedStyle(e);
        return (
          (t -= (0, o.int)(r.paddingTop)), (t -= (0, o.int)(r.paddingBottom)), t
        );
      }
      function v(e) {
        var t = e.clientWidth,
          r = e.ownerDocument.defaultView.getComputedStyle(e);
        return (
          (t -= (0, o.int)(r.paddingLeft)), (t -= (0, o.int)(r.paddingRight)), t
        );
      }
      function S(e, t, r) {
        var n = t === t.ownerDocument.body,
          o = n ? { left: 0, top: 0 } : t.getBoundingClientRect(),
          a = (e.clientX + t.scrollLeft - o.left) / r,
          i = (e.clientY + t.scrollTop - o.top) / r;
        return { x: a, y: i };
      }
      function w(e, t) {
        var r = D(e, t, 'px');
        return c({}, (0, a.browserPrefixToKey)('transform', a.default), r);
      }
      function O(e, t) {
        var r = D(e, t, '');
        return r;
      }
      function D(e, t, r) {
        var n = e.x,
          o = e.y,
          a = 'translate('.concat(n).concat(r, ',').concat(o).concat(r, ')');
        if (t) {
          var i = ''.concat('string' === typeof t.x ? t.x : t.x + r),
            u = ''.concat('string' === typeof t.y ? t.y : t.y + r);
          a = 'translate('.concat(i, ', ').concat(u, ')') + a;
        }
        return a;
      }
      function P(e, t) {
        return (
          (e.targetTouches &&
            (0, o.findInArray)(e.targetTouches, function (e) {
              return t === e.identifier;
            })) ||
          (e.changedTouches &&
            (0, o.findInArray)(e.changedTouches, function (e) {
              return t === e.identifier;
            }))
        );
      }
      function j(e) {
        return e.targetTouches && e.targetTouches[0]
          ? e.targetTouches[0].identifier
          : e.changedTouches && e.changedTouches[0]
          ? e.changedTouches[0].identifier
          : void 0;
      }
      function x(e) {
        if (e) {
          var t = e.getElementById('react-draggable-style-el');
          t ||
            ((t = e.createElement('style')),
            (t.type = 'text/css'),
            (t.id = 'react-draggable-style-el'),
            (t.innerHTML =
              '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n'),
            (t.innerHTML +=
              '.react-draggable-transparent-selection *::selection {all: inherit;}\n'),
            e.getElementsByTagName('head')[0].appendChild(t)),
            e.body && E(e.body, 'react-draggable-transparent-selection');
        }
      }
      function M(e) {
        if (e)
          try {
            if (
              (e.body && T(e.body, 'react-draggable-transparent-selection'),
              e.selection)
            )
              e.selection.empty();
            else {
              var t = (e.defaultView || window).getSelection();
              t && 'Caret' !== t.type && t.removeAllRanges();
            }
          } catch (r) {}
      }
      function E(e, t) {
        e.classList
          ? e.classList.add(t)
          : e.className.match(new RegExp('(?:^|\\s)'.concat(t, '(?!\\S)'))) ||
            (e.className += ' '.concat(t));
      }
      function T(e, t) {
        e.classList
          ? e.classList.remove(t)
          : (e.className = e.className.replace(
              new RegExp('(?:^|\\s)'.concat(t, '(?!\\S)'), 'g'),
              '',
            ));
      }
    },
    38650: function (e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.browserPrefixToKey = o),
        (t.browserPrefixToStyle = a),
        (t.default = void 0),
        (t.getPrefix = n);
      var r = ['Moz', 'Webkit', 'O', 'ms'];
      function n() {
        var e,
          t,
          n =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'transform';
        if ('undefined' === typeof window) return '';
        var a =
          null === (e = window.document) ||
          void 0 === e ||
          null === (t = e.documentElement) ||
          void 0 === t
            ? void 0
            : t.style;
        if (!a) return '';
        if (n in a) return '';
        for (var i = 0; i < r.length; i++) if (o(n, r[i]) in a) return r[i];
        return '';
      }
      function o(e, t) {
        return t ? ''.concat(t).concat(i(e)) : e;
      }
      function a(e, t) {
        return t ? '-'.concat(t.toLowerCase(), '-').concat(e) : e;
      }
      function i(e) {
        for (var t = '', r = !0, n = 0; n < e.length; n++)
          r
            ? ((t += e[n].toUpperCase()), (r = !1))
            : '-' === e[n]
            ? (r = !0)
            : (t += e[n]);
        return t;
      }
      var u = n();
      t.default = u;
    },
    55904: function (e, t) {
      'use strict';
      function r() {}
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = r);
    },
    2849: function (e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.canDragX = u),
        (t.canDragY = l),
        (t.createCoreData = c),
        (t.createDraggableData = f),
        (t.getBoundPosition = a),
        (t.getControlPosition = s),
        (t.snapToGrid = i);
      var n = r(9280),
        o = r(81825);
      function a(e, t, r) {
        if (!e.props.bounds) return [t, r];
        var a = e.props.bounds;
        a = 'string' === typeof a ? a : d(a);
        var i = p(e);
        if ('string' === typeof a) {
          var u,
            l = i.ownerDocument,
            s = l.defaultView;
          if (
            ((u = 'parent' === a ? i.parentNode : l.querySelector(a)),
            !(u instanceof s.HTMLElement))
          )
            throw new Error(
              'Bounds selector "' + a + '" could not find an element.',
            );
          var c = u,
            f = s.getComputedStyle(i),
            g = s.getComputedStyle(c);
          a = {
            left:
              -i.offsetLeft +
              (0, n.int)(g.paddingLeft) +
              (0, n.int)(f.marginLeft),
            top:
              -i.offsetTop + (0, n.int)(g.paddingTop) + (0, n.int)(f.marginTop),
            right:
              (0, o.innerWidth)(c) -
              (0, o.outerWidth)(i) -
              i.offsetLeft +
              (0, n.int)(g.paddingRight) -
              (0, n.int)(f.marginRight),
            bottom:
              (0, o.innerHeight)(c) -
              (0, o.outerHeight)(i) -
              i.offsetTop +
              (0, n.int)(g.paddingBottom) -
              (0, n.int)(f.marginBottom),
          };
        }
        return (
          (0, n.isNum)(a.right) && (t = Math.min(t, a.right)),
          (0, n.isNum)(a.bottom) && (r = Math.min(r, a.bottom)),
          (0, n.isNum)(a.left) && (t = Math.max(t, a.left)),
          (0, n.isNum)(a.top) && (r = Math.max(r, a.top)),
          [t, r]
        );
      }
      function i(e, t, r) {
        var n = Math.round(t / e[0]) * e[0],
          o = Math.round(r / e[1]) * e[1];
        return [n, o];
      }
      function u(e) {
        return 'both' === e.props.axis || 'x' === e.props.axis;
      }
      function l(e) {
        return 'both' === e.props.axis || 'y' === e.props.axis;
      }
      function s(e, t, r) {
        var n = 'number' === typeof t ? (0, o.getTouch)(e, t) : null;
        if ('number' === typeof t && !n) return null;
        var a = p(r),
          i = r.props.offsetParent || a.offsetParent || a.ownerDocument.body;
        return (0, o.offsetXYFromParent)(n || e, i, r.props.scale);
      }
      function c(e, t, r) {
        var o = e.state,
          a = !(0, n.isNum)(o.lastX),
          i = p(e);
        return a
          ? { node: i, deltaX: 0, deltaY: 0, lastX: t, lastY: r, x: t, y: r }
          : {
              node: i,
              deltaX: t - o.lastX,
              deltaY: r - o.lastY,
              lastX: o.lastX,
              lastY: o.lastY,
              x: t,
              y: r,
            };
      }
      function f(e, t) {
        var r = e.props.scale;
        return {
          node: t.node,
          x: e.state.x + t.deltaX / r,
          y: e.state.y + t.deltaY / r,
          deltaX: t.deltaX / r,
          deltaY: t.deltaY / r,
          lastX: e.state.x,
          lastY: e.state.y,
        };
      }
      function d(e) {
        return { left: e.left, top: e.top, right: e.right, bottom: e.bottom };
      }
      function p(e) {
        var t = e.findDOMNode();
        if (!t) throw new Error('<DraggableCore>: Unmounted during event!');
        return t;
      }
    },
    9280: function (e, t) {
      'use strict';
      function r(e, t) {
        for (var r = 0, n = e.length; r < n; r++)
          if (t.apply(t, [e[r], r, e])) return e[r];
      }
      function n(e) {
        return (
          'function' === typeof e ||
          '[object Function]' === Object.prototype.toString.call(e)
        );
      }
      function o(e) {
        return 'number' === typeof e && !isNaN(e);
      }
      function a(e) {
        return parseInt(e, 10);
      }
      function i(e, t, r) {
        if (e[t])
          return new Error(
            'Invalid prop '
              .concat(t, ' passed to ')
              .concat(r, ' - do not set this, set it on the child.'),
          );
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.dontSetMe = i),
        (t.findInArray = r),
        (t.int = a),
        (t.isFunction = n),
        (t.isNum = o);
    },
  },
]);
