(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [6358],
  {
    17582: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return l;
        },
      });
      var r = n(28991),
        o = n(12924),
        a = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'defs',
                attrs: {},
                children: [{ tag: 'style', attrs: {} }],
              },
              {
                tag: 'path',
                attrs: {
                  d: 'M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z',
                },
              },
              {
                tag: 'path',
                attrs: {
                  d: 'M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z',
                },
              },
            ],
          },
          name: 'rotate-left',
          theme: 'outlined',
        },
        i = a,
        c = n(13401),
        s = function (e, t) {
          return o.createElement(
            c.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: t, icon: i }),
          );
        };
      s.displayName = 'RotateLeftOutlined';
      var l = o.forwardRef(s);
    },
    3035: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return l;
        },
      });
      var r = n(28991),
        o = n(12924),
        a = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'defs',
                attrs: {},
                children: [{ tag: 'style', attrs: {} }],
              },
              {
                tag: 'path',
                attrs: {
                  d: 'M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z',
                },
              },
              {
                tag: 'path',
                attrs: {
                  d: 'M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z',
                },
              },
            ],
          },
          name: 'rotate-right',
          theme: 'outlined',
        },
        i = a,
        c = n(13401),
        s = function (e, t) {
          return o.createElement(
            c.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: t, icon: i }),
          );
        };
      s.displayName = 'RotateRightOutlined';
      var l = o.forwardRef(s);
    },
    53469: function () {},
    6122: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return le;
        },
      });
      var r = n(22122),
        o = n(90484),
        a = n(95357),
        i = n(28991),
        c = n(96156),
        s = n(28481),
        l = n(81253),
        u = n(12924),
        f = n.n(u),
        m = n(94184),
        d = n.n(m),
        v = n(27678),
        p = n(21770),
        g = n(57315),
        h = n(64019),
        w = n(15105),
        C = n(80334),
        Z = [
          'visible',
          'onVisibleChange',
          'getContainer',
          'current',
          'countRender',
        ],
        y = u.createContext({
          previewUrls: new Map(),
          setPreviewUrls: function () {
            return null;
          },
          current: null,
          setCurrent: function () {
            return null;
          },
          setShowPreview: function () {
            return null;
          },
          setMousePosition: function () {
            return null;
          },
          registerImage: function () {
            return function () {
              return null;
            };
          },
          rootClassName: '',
        }),
        b = y.Provider,
        E = function (e) {
          var t = e.previewPrefixCls,
            n = void 0 === t ? 'rc-image-preview' : t,
            a = e.children,
            i = e.icons,
            c = void 0 === i ? {} : i,
            f = e.preview,
            m = 'object' === (0, o.Z)(f) ? f : {},
            d = m.visible,
            v = void 0 === d ? void 0 : d,
            g = m.onVisibleChange,
            h = void 0 === g ? void 0 : g,
            w = m.getContainer,
            C = void 0 === w ? void 0 : w,
            y = m.current,
            E = void 0 === y ? 0 : y,
            N = m.countRender,
            x = void 0 === N ? void 0 : N,
            P = (0, l.Z)(m, Z),
            k = (0, u.useState)(new Map()),
            S = (0, s.Z)(k, 2),
            R = S[0],
            O = S[1],
            M = (0, u.useState)(),
            z = (0, s.Z)(M, 2),
            L = z[0],
            T = z[1],
            I = (0, p.Z)(!!v, { value: v, onChange: h }),
            Y = (0, s.Z)(I, 2),
            j = Y[0],
            X = Y[1],
            H = (0, u.useState)(null),
            G = (0, s.Z)(H, 2),
            D = G[0],
            F = G[1],
            U = void 0 !== v,
            W = Array.from(R.keys()),
            A = W[E],
            B = new Map(
              Array.from(R)
                .filter(function (e) {
                  var t = (0, s.Z)(e, 2),
                    n = t[1].canPreview;
                  return !!n;
                })
                .map(function (e) {
                  var t = (0, s.Z)(e, 2),
                    n = t[0],
                    r = t[1].url;
                  return [n, r];
                }),
            ),
            _ = function (e, t) {
              var n =
                  !(arguments.length > 2 && void 0 !== arguments[2]) ||
                  arguments[2],
                r = function () {
                  O(function (t) {
                    var n = new Map(t),
                      r = n.delete(e);
                    return r ? n : t;
                  });
                };
              return (
                O(function (r) {
                  return new Map(r).set(e, { url: t, canPreview: n });
                }),
                r
              );
            },
            K = function (e) {
              e.stopPropagation(), X(!1), F(null);
            };
          return (
            u.useEffect(
              function () {
                T(A);
              },
              [A],
            ),
            u.useEffect(
              function () {
                !j && U && T(A);
              },
              [A, U, j],
            ),
            u.createElement(
              b,
              {
                value: {
                  isPreviewGroup: !0,
                  previewUrls: B,
                  setPreviewUrls: O,
                  current: L,
                  setCurrent: T,
                  setShowPreview: X,
                  setMousePosition: F,
                  registerImage: _,
                },
              },
              a,
              u.createElement(
                V,
                (0, r.Z)(
                  {
                    'aria-hidden': !j,
                    visible: j,
                    prefixCls: n,
                    onClose: K,
                    mousePosition: D,
                    src: B.get(L),
                    icons: c,
                    getContainer: C,
                    countRender: x,
                  },
                  P,
                ),
              ),
            )
          );
        },
        N = E,
        x = n(63441),
        P = n(38475),
        k = 1,
        S = 50,
        R = 1,
        O = 0.2,
        M = function (e) {
          var t,
            n = e.visible,
            r = e.maskTransitionName,
            o = e.getContainer,
            a = e.prefixCls,
            i = e.rootClassName,
            s = e.icons,
            l = e.countRender,
            f = e.showSwitch,
            m = e.showProgress,
            v = e.current,
            p = e.count,
            g = e.scale,
            h = e.onSwitchLeft,
            w = e.onSwitchRight,
            C = e.onClose,
            Z = e.onZoomIn,
            y = e.onZoomOut,
            b = e.onRotateRight,
            E = e.onRotateLeft,
            N = s.rotateLeft,
            R = s.rotateRight,
            O = s.zoomIn,
            M = s.zoomOut,
            z = s.close,
            L = s.left,
            T = s.right,
            I = ''.concat(a, '-operations-operation'),
            Y = ''.concat(a, '-operations-icon'),
            j = [
              { icon: z, onClick: C, type: 'close' },
              { icon: O, onClick: Z, type: 'zoomIn', disabled: g === S },
              { icon: M, onClick: y, type: 'zoomOut', disabled: g === k },
              { icon: R, onClick: b, type: 'rotateRight' },
              { icon: N, onClick: E, type: 'rotateLeft' },
            ],
            X = u.createElement(
              u.Fragment,
              null,
              f &&
                u.createElement(
                  u.Fragment,
                  null,
                  u.createElement(
                    'div',
                    {
                      className: d()(
                        ''.concat(a, '-switch-left'),
                        (0, c.Z)(
                          {},
                          ''.concat(a, '-switch-left-disabled'),
                          0 === v,
                        ),
                      ),
                      onClick: h,
                    },
                    L,
                  ),
                  u.createElement(
                    'div',
                    {
                      className: d()(
                        ''.concat(a, '-switch-right'),
                        (0, c.Z)(
                          {},
                          ''.concat(a, '-switch-right-disabled'),
                          v === p - 1,
                        ),
                      ),
                      onClick: w,
                    },
                    T,
                  ),
                ),
              u.createElement(
                'ul',
                { className: ''.concat(a, '-operations') },
                m &&
                  u.createElement(
                    'li',
                    { className: ''.concat(a, '-operations-progress') },
                    null !==
                      (t = null === l || void 0 === l ? void 0 : l(v + 1, p)) &&
                      void 0 !== t
                      ? t
                      : ''.concat(v + 1, ' / ').concat(p),
                  ),
                j.map(function (e) {
                  var t,
                    n = e.icon,
                    r = e.onClick,
                    o = e.type,
                    i = e.disabled;
                  return u.createElement(
                    'li',
                    {
                      className: d()(
                        I,
                        ((t = {}),
                        (0, c.Z)(
                          t,
                          ''.concat(a, '-operations-operation-').concat(o),
                          !0,
                        ),
                        (0, c.Z)(
                          t,
                          ''.concat(a, '-operations-operation-disabled'),
                          !!i,
                        ),
                        t),
                      ),
                      onClick: r,
                      key: o,
                    },
                    u.isValidElement(n)
                      ? u.cloneElement(n, { className: Y })
                      : n,
                  );
                }),
              ),
            );
          return u.createElement(
            x.default,
            { visible: n, motionName: r },
            function (e) {
              var t = e.className,
                n = e.style;
              return u.createElement(
                P.Z,
                {
                  open: !0,
                  getContainer: null !== o && void 0 !== o ? o : document.body,
                },
                u.createElement(
                  'div',
                  {
                    className: d()(''.concat(a, '-operations-wrapper'), t, i),
                    style: n,
                  },
                  X,
                ),
              );
            },
          );
        },
        z = M,
        L = n(75164),
        T = { x: 0, y: 0, rotate: 0, scale: 1 };
      function I(e) {
        var t = (0, u.useRef)(null),
          n = (0, u.useRef)([]),
          r = (0, u.useState)(T),
          o = (0, s.Z)(r, 2),
          a = o[0],
          c = o[1],
          l = function () {
            c(T);
          },
          f = function (e) {
            null === t.current &&
              ((n.current = []),
              (t.current = (0, L.Z)(function () {
                c(function (e) {
                  var r = e;
                  return (
                    n.current.forEach(function (e) {
                      r = (0, i.Z)((0, i.Z)({}, r), e);
                    }),
                    (t.current = null),
                    r
                  );
                });
              }))),
              n.current.push((0, i.Z)((0, i.Z)({}, a), e));
          },
          m = function (t, n, r) {
            var o = e.current,
              i = o.width,
              c = o.height,
              s = o.offsetWidth,
              l = o.offsetHeight,
              u = o.offsetLeft,
              m = o.offsetTop,
              d = t,
              p = a.scale * t;
            p > S
              ? ((d = S / a.scale), (p = S))
              : p < k && ((d = k / a.scale), (p = k));
            var g = null !== n && void 0 !== n ? n : innerWidth / 2,
              h = null !== r && void 0 !== r ? r : innerHeight / 2,
              w = d - 1,
              C = w * i * 0.5,
              Z = w * c * 0.5,
              y = w * (g - a.x - u),
              b = w * (h - a.y - m),
              E = a.x - (y - C),
              N = a.y - (b - Z);
            if (t < 1 && 1 === p) {
              var x = s * p,
                P = l * p,
                R = (0, v.g1)(),
                O = R.width,
                M = R.height;
              x <= O && P <= M && ((E = 0), (N = 0));
            }
            f({ x: E, y: N, scale: p });
          };
        return {
          transform: a,
          resetTransform: l,
          updateTransform: f,
          dispatchZoonChange: m,
        };
      }
      function Y(e, t, n, r) {
        var o = t + n,
          a = (n - r) / 2;
        if (n > r) {
          if (t > 0) return (0, c.Z)({}, e, a);
          if (t < 0 && o < r) return (0, c.Z)({}, e, -a);
        } else if (t < 0 || o > r) return (0, c.Z)({}, e, t < 0 ? a : -a);
        return {};
      }
      function j(e, t, n, r) {
        var o = (0, v.g1)(),
          a = o.width,
          c = o.height,
          s = null;
        return (
          e <= a && t <= c
            ? (s = { x: 0, y: 0 })
            : (e > a || t > c) &&
              (s = (0, i.Z)((0, i.Z)({}, Y('x', n, e, a)), Y('y', r, t, c))),
          s
        );
      }
      var X = [
          'prefixCls',
          'src',
          'alt',
          'onClose',
          'afterClose',
          'visible',
          'icons',
          'rootClassName',
          'getContainer',
          'countRender',
          'scaleStep',
          'transitionName',
          'maskTransitionName',
        ],
        H = function (e) {
          var t = e.prefixCls,
            n = e.src,
            o = e.alt,
            a = e.onClose,
            m = (e.afterClose, e.visible),
            v = e.icons,
            p = void 0 === v ? {} : v,
            Z = e.rootClassName,
            b = e.getContainer,
            E = e.countRender,
            N = e.scaleStep,
            x = void 0 === N ? 0.5 : N,
            P = e.transitionName,
            k = void 0 === P ? 'zoom' : P,
            S = e.maskTransitionName,
            M = void 0 === S ? 'fade' : S,
            L = (0, l.Z)(e, X),
            T = (0, u.useRef)(),
            Y = (0, u.useRef)({
              deltaX: 0,
              deltaY: 0,
              transformX: 0,
              transformY: 0,
            }),
            H = (0, u.useState)(!1),
            V = (0, s.Z)(H, 2),
            G = V[0],
            D = V[1],
            F = (0, u.useContext)(y),
            U = F.previewUrls,
            W = F.current,
            A = F.isPreviewGroup,
            B = F.setCurrent,
            _ = U.size,
            K = Array.from(U.keys()),
            q = K.indexOf(W),
            J = A ? U.get(W) : n,
            Q = A && _ > 1,
            $ = A && _ >= 1,
            ee = I(T),
            te = ee.transform,
            ne = ee.resetTransform,
            re = ee.updateTransform,
            oe = ee.dispatchZoonChange,
            ae = te.rotate,
            ie = te.scale,
            ce = d()((0, c.Z)({}, ''.concat(t, '-moving'), G)),
            se = function () {
              ne();
            },
            le = function () {
              oe(R + x);
            },
            ue = function () {
              oe(R - x);
            },
            fe = function () {
              re({ rotate: ae + 90 });
            },
            me = function () {
              re({ rotate: ae - 90 });
            },
            de = function (e) {
              e.preventDefault(), e.stopPropagation(), q > 0 && B(K[q - 1]);
            },
            ve = function (e) {
              e.preventDefault(), e.stopPropagation(), q < _ - 1 && B(K[q + 1]);
            },
            pe = function () {
              if (m && G) {
                D(!1);
                var e = Y.current,
                  t = e.transformX,
                  n = e.transformY,
                  r = te.x !== t && te.y !== n;
                if (!r) return;
                var o = T.current.offsetWidth * ie,
                  a = T.current.offsetHeight * ie,
                  c = T.current.getBoundingClientRect(),
                  s = c.left,
                  l = c.top,
                  u = ae % 180 !== 0,
                  f = j(u ? a : o, u ? o : a, s, l);
                f && re((0, i.Z)({}, f));
              }
            },
            ge = function (e) {
              0 === e.button &&
                (e.preventDefault(),
                e.stopPropagation(),
                (Y.current = {
                  deltaX: e.pageX - te.x,
                  deltaY: e.pageY - te.y,
                  transformX: te.x,
                  transformY: te.y,
                }),
                D(!0));
            },
            he = function (e) {
              m &&
                G &&
                re({
                  x: e.pageX - Y.current.deltaX,
                  y: e.pageY - Y.current.deltaY,
                });
            },
            we = function (e) {
              if (m && 0 != e.deltaY) {
                var t = Math.abs(e.deltaY / 100),
                  n = Math.min(t, O),
                  r = R + n * x;
                e.deltaY > 0 && (r = R / r), oe(r, e.clientX, e.clientY);
              }
            },
            Ce = (0, u.useCallback)(
              function (e) {
                m &&
                  Q &&
                  (e.keyCode === w.Z.LEFT
                    ? q > 0 && B(K[q - 1])
                    : e.keyCode === w.Z.RIGHT && q < _ - 1 && B(K[q + 1]));
              },
              [q, _, K, B, Q, m],
            ),
            Ze = function (e) {
              m &&
                (1 !== ie
                  ? re({ x: 0, y: 0, scale: 1 })
                  : oe(R + x, e.clientX, e.clientY));
            };
          return (
            (0, u.useEffect)(
              function () {
                var e,
                  t,
                  n = (0, h.Z)(window, 'mouseup', pe, !1),
                  r = (0, h.Z)(window, 'mousemove', he, !1),
                  o = (0, h.Z)(window, 'keydown', Ce, !1);
                try {
                  window.top !== window.self &&
                    ((e = (0, h.Z)(window.top, 'mouseup', pe, !1)),
                    (t = (0, h.Z)(window.top, 'mousemove', he, !1)));
                } catch (a) {
                  (0, C.Kp)(!1, '[rc-image] '.concat(a));
                }
                return function () {
                  var a, i;
                  n.remove(),
                    r.remove(),
                    o.remove(),
                    null === (a = e) || void 0 === a || a.remove(),
                    null === (i = t) || void 0 === i || i.remove();
                };
              },
              [m, G, Ce],
            ),
            f().createElement(
              f().Fragment,
              null,
              f().createElement(
                g.default,
                (0, r.Z)(
                  {
                    transitionName: k,
                    maskTransitionName: M,
                    closable: !1,
                    keyboard: !0,
                    prefixCls: t,
                    onClose: a,
                    afterClose: se,
                    visible: m,
                    wrapClassName: ce,
                    rootClassName: Z,
                    getContainer: b,
                  },
                  L,
                ),
                f().createElement(
                  'div',
                  { className: ''.concat(t, '-img-wrapper') },
                  f().createElement('img', {
                    width: e.width,
                    height: e.height,
                    onWheel: we,
                    onMouseDown: ge,
                    onDoubleClick: Ze,
                    ref: T,
                    className: ''.concat(t, '-img'),
                    src: J,
                    alt: o,
                    style: {
                      transform: 'translate3d('
                        .concat(te.x, 'px, ')
                        .concat(te.y, 'px, 0) scale3d(')
                        .concat(ie, ', ')
                        .concat(ie, ', 1) rotate(')
                        .concat(ae, 'deg)'),
                    },
                  }),
                ),
              ),
              f().createElement(z, {
                visible: m,
                maskTransitionName: M,
                getContainer: b,
                prefixCls: t,
                rootClassName: Z,
                icons: p,
                countRender: E,
                showSwitch: Q,
                showProgress: $,
                current: q,
                count: _,
                scale: ie,
                onSwitchLeft: de,
                onSwitchRight: ve,
                onZoomIn: le,
                onZoomOut: ue,
                onRotateRight: fe,
                onRotateLeft: me,
                onClose: a,
              }),
            )
          );
        },
        V = H,
        G = [
          'src',
          'alt',
          'onPreviewClose',
          'prefixCls',
          'previewPrefixCls',
          'placeholder',
          'fallback',
          'width',
          'height',
          'style',
          'preview',
          'className',
          'onClick',
          'onError',
          'wrapperClassName',
          'wrapperStyle',
          'rootClassName',
          'crossOrigin',
          'decoding',
          'loading',
          'referrerPolicy',
          'sizes',
          'srcSet',
          'useMap',
          'draggable',
        ],
        D = [
          'src',
          'visible',
          'onVisibleChange',
          'getContainer',
          'mask',
          'maskClassName',
          'icons',
          'scaleStep',
        ],
        F = 0,
        U = function (e) {
          var t,
            n = e.src,
            a = e.alt,
            f = e.onPreviewClose,
            m = e.prefixCls,
            g = void 0 === m ? 'rc-image' : m,
            h = e.previewPrefixCls,
            w = void 0 === h ? ''.concat(g, '-preview') : h,
            C = e.placeholder,
            Z = e.fallback,
            b = e.width,
            E = e.height,
            N = e.style,
            x = e.preview,
            P = void 0 === x || x,
            k = e.className,
            S = e.onClick,
            R = e.onError,
            O = e.wrapperClassName,
            M = e.wrapperStyle,
            z = e.rootClassName,
            L = e.crossOrigin,
            T = e.decoding,
            I = e.loading,
            Y = e.referrerPolicy,
            j = e.sizes,
            X = e.srcSet,
            H = e.useMap,
            U = e.draggable,
            W = (0, l.Z)(e, G),
            A = C && !0 !== C,
            B = 'object' === (0, o.Z)(P) ? P : {},
            _ = B.src,
            K = B.visible,
            q = void 0 === K ? void 0 : K,
            J = B.onVisibleChange,
            Q = void 0 === J ? f : J,
            $ = B.getContainer,
            ee = void 0 === $ ? void 0 : $,
            te = B.mask,
            ne = B.maskClassName,
            re = B.icons,
            oe = B.scaleStep,
            ae = (0, l.Z)(B, D),
            ie = null !== _ && void 0 !== _ ? _ : n,
            ce = void 0 !== q,
            se = (0, p.Z)(!!q, { value: q, onChange: Q }),
            le = (0, s.Z)(se, 2),
            ue = le[0],
            fe = le[1],
            me = (0, u.useState)(A ? 'loading' : 'normal'),
            de = (0, s.Z)(me, 2),
            ve = de[0],
            pe = de[1],
            ge = (0, u.useState)(null),
            he = (0, s.Z)(ge, 2),
            we = he[0],
            Ce = he[1],
            Ze = 'error' === ve,
            ye = u.useContext(y),
            be = ye.isPreviewGroup,
            Ee = ye.setCurrent,
            Ne = ye.setShowPreview,
            xe = ye.setMousePosition,
            Pe = ye.registerImage,
            ke = u.useState(function () {
              return (F += 1), F;
            }),
            Se = (0, s.Z)(ke, 1),
            Re = Se[0],
            Oe = !!P,
            Me = u.useRef(!1),
            ze = function () {
              pe('normal');
            },
            Le = function (e) {
              R && R(e), pe('error');
            },
            Te = function (e) {
              if (!ce) {
                var t = (0, v.os)(e.target),
                  n = t.left,
                  r = t.top;
                be ? (Ee(Re), xe({ x: n, y: r })) : Ce({ x: n, y: r });
              }
              be ? Ne(!0) : fe(!0), S && S(e);
            },
            Ie = function (e) {
              e.stopPropagation(), fe(!1), ce || Ce(null);
            },
            Ye = function (e) {
              (Me.current = !1),
                'loading' === ve &&
                  null !== e &&
                  void 0 !== e &&
                  e.complete &&
                  (e.naturalWidth || e.naturalHeight) &&
                  ((Me.current = !0), ze());
            };
          u.useEffect(function () {
            var e = Pe(Re, ie);
            return e;
          }, []),
            u.useEffect(
              function () {
                Pe(Re, ie, Oe);
              },
              [ie, Oe],
            ),
            u.useEffect(
              function () {
                Ze && pe('normal'), A && !Me.current && pe('loading');
              },
              [n],
            );
          var je = d()(g, O, z, (0, c.Z)({}, ''.concat(g, '-error'), Ze)),
            Xe = Ze && Z ? Z : ie,
            He = {
              crossOrigin: L,
              decoding: T,
              draggable: U,
              loading: I,
              referrerPolicy: Y,
              sizes: j,
              srcSet: X,
              useMap: H,
              alt: a,
              className: d()(
                ''.concat(g, '-img'),
                (0, c.Z)({}, ''.concat(g, '-img-placeholder'), !0 === C),
                k,
              ),
              style: (0, i.Z)({ height: E }, N),
            };
          return u.createElement(
            u.Fragment,
            null,
            u.createElement(
              'div',
              (0, r.Z)({}, W, {
                className: je,
                onClick: Oe ? Te : S,
                style: (0, i.Z)({ width: b, height: E }, M),
              }),
              u.createElement(
                'img',
                (0, r.Z)(
                  {},
                  He,
                  { ref: Ye },
                  Ze && Z ? { src: Z } : { onLoad: ze, onError: Le, src: n },
                  { width: b, height: E },
                ),
              ),
              'loading' === ve &&
                u.createElement(
                  'div',
                  {
                    'aria-hidden': 'true',
                    className: ''.concat(g, '-placeholder'),
                  },
                  C,
                ),
              te &&
                Oe &&
                u.createElement(
                  'div',
                  {
                    className: d()(''.concat(g, '-mask'), ne),
                    style: {
                      display:
                        'none' ===
                        (null === (t = He.style) || void 0 === t
                          ? void 0
                          : t.display)
                          ? 'none'
                          : void 0,
                    },
                  },
                  te,
                ),
            ),
            !be &&
              Oe &&
              u.createElement(
                V,
                (0, r.Z)(
                  {
                    'aria-hidden': !ue,
                    visible: ue,
                    prefixCls: w,
                    onClose: Ie,
                    mousePosition: we,
                    src: Xe,
                    alt: a,
                    getContainer: ee,
                    icons: re,
                    scaleStep: oe,
                    rootClassName: z,
                  },
                  ae,
                ),
              ),
          );
        };
      (U.PreviewGroup = N), (U.displayName = 'Image');
      var W = U,
        A = W,
        B = n(53124),
        _ = n(40378),
        K = n(33603),
        q = n(54549),
        J = n(67724),
        Q = n(8812),
        $ = n(17582),
        ee = n(3035),
        te = n(72504),
        ne = n(16130),
        re = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        oe = {
          rotateLeft: u.createElement($.Z, null),
          rotateRight: u.createElement(ee.Z, null),
          zoomIn: u.createElement(te.Z, null),
          zoomOut: u.createElement(ne.Z, null),
          close: u.createElement(q.Z, null),
          left: u.createElement(J.Z, null),
          right: u.createElement(Q.Z, null),
        },
        ae = function (e) {
          var t = e.previewPrefixCls,
            n = e.preview,
            a = re(e, ['previewPrefixCls', 'preview']),
            i = u.useContext(B.E_),
            c = i.getPrefixCls,
            s = c('image-preview', t),
            l = c(),
            f = u.useMemo(
              function () {
                if (!1 === n) return n;
                var e = 'object' === (0, o.Z)(n) ? n : {};
                return (0, r.Z)((0, r.Z)({}, e), {
                  transitionName: (0, K.mL)(l, 'zoom', e.transitionName),
                  maskTransitionName: (0, K.mL)(
                    l,
                    'fade',
                    e.maskTransitionName,
                  ),
                });
              },
              [n],
            );
          return u.createElement(
            A.PreviewGroup,
            (0, r.Z)({ preview: f, previewPrefixCls: s, icons: oe }, a),
          );
        },
        ie = ae,
        ce = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        se = function (e) {
          var t = e.prefixCls,
            n = e.preview,
            i = ce(e, ['prefixCls', 'preview']),
            c = (0, u.useContext)(B.E_),
            s = c.getPrefixCls,
            l = c.locale,
            f = void 0 === l ? _.Z : l,
            m = c.getPopupContainer,
            d = s('image', t),
            v = s(),
            p = f.Image || _.Z.Image,
            g = u.useMemo(
              function () {
                if (!1 === n) return n;
                var e = 'object' === (0, o.Z)(n) ? n : {},
                  t = e.getContainer,
                  i = ce(e, ['getContainer']);
                return (0, r.Z)(
                  (0, r.Z)(
                    {
                      mask: u.createElement(
                        'div',
                        { className: ''.concat(d, '-mask-info') },
                        u.createElement(a.Z, null),
                        null === p || void 0 === p ? void 0 : p.preview,
                      ),
                      icons: oe,
                    },
                    i,
                  ),
                  {
                    getContainer: t || m,
                    transitionName: (0, K.mL)(v, 'zoom', e.transitionName),
                    maskTransitionName: (0, K.mL)(
                      v,
                      'fade',
                      e.maskTransitionName,
                    ),
                  },
                );
              },
              [n, p],
            );
          return u.createElement(A, (0, r.Z)({ prefixCls: d, preview: g }, i));
        };
      se.PreviewGroup = ie;
      var le = se;
    },
    12968: function (e, t, n) {
      'use strict';
      n(38663), n(53469);
    },
  },
]);
