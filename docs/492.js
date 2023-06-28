(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [492],
  {
    52683: function () {},
    80492: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          AHeader: function () {
            return A;
          },
        });
      n(57663);
      var r,
        a,
        l,
        o,
        i,
        c = n(71577),
        s = (n(94233), n(51890)),
        u = (n(12968), n(6122)),
        m = n(2824),
        p = n(93224),
        f = n(20310),
        g = n(12924),
        d = n.n(g),
        v = n(82425),
        h = n.n(v),
        x = n(12788),
        y = ['isTpl'],
        Z = x.ZP.div(
          r ||
            (r = (0, f.Z)([
              "\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 15px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  & button + button {\n    margin-left: 10px;\n  }\n",
            ])),
        ),
        b = x.ZP.div(
          a ||
            (a = (0, f.Z)([
              '\n  color: #333;\n  font-size: 14px;\n  margin-right: 10px;\n',
            ])),
        ),
        E = x.ZP.div(
          l ||
            (l = (0, f.Z)([
              '\n  margin-right: 10px;\n  max-width: 160px;\n  max-height: 46px;\n  height: 46px;\n  overflow: hidden;\n  img {\n    height: 100%;\n    object-fit: contain;\n  }\n',
            ])),
        ),
        k = x.ZP.h1(
          o ||
            (o = (0, f.Z)([
              '\n  font-weight: 900;\n  line-height: 1;\n  margin: 6px 0 6px 10px;\n  display: inline-block;\n  vertical-align: top;\n  color: ',
              ';\n  font-size: ',
              ';\n',
            ])),
          (e) => e.$color,
          (e) => e.$fontSize,
        ),
        S = x.ZP.header(
          i ||
            (i = (0, f.Z)([
              '\n  box-sizing: content-box;\n  padding: 3px 12px;\n  display: flex;\n  align-items: center;\n  height: 50px;\n  overflow: hidden;\n  position: absolute;\n  background-color: ',
              ';\n  width: ',
              '%;\n  height: ',
              '%;\n  border-radius: ',
              ';\n  transform: translate(\n      ',
              'px,\n      ',
              '\n    )\n    scale(',
              ')\n    rotate(',
              'deg);\n',
            ])),
          (e) => e.props.bgColor,
          (e) => e.props.baseWidth,
          (e) => e.props.baseHeight,
          (e) => e.props.baseRadius,
          (e) => e.props.baseLeft,
          (e) => e.props.baseTop,
          (e) => e.props.baseScale / 100,
          (e) => e.props.baseRadius,
        ),
        A = (e) => {
          var t = e.isTpl,
            n = (0, p.Z)(e, y),
            r = n.user,
            a = n.title,
            l = n.logo,
            o = n.fontSize,
            i = n.color,
            f = n.size,
            v = n.shape,
            x = n.onLogin,
            A = n.onLogout,
            R = n.onCreateAccount,
            z = (0, g.useState)(r),
            W = (0, m.Z)(z, 2),
            O = W[0],
            C = W[1],
            j = () => {
              C(''), A && A();
            },
            N = () => {
              C('xiye'), x && x();
            },
            P = () => {
              C('xiye'), R && R();
            };
          return d().createElement(
            d().Fragment,
            null,
            t &&
              d().createElement(
                'div',
                null,
                d().createElement(u.Z, { preview: !1, src: h(), alt: '' }),
              ),
            !t &&
              d().createElement(
                S,
                { props: e },
                d().createElement(
                  Z,
                  null,
                  d().createElement(
                    'div',
                    { style: { display: 'flex' } },
                    d().createElement(
                      E,
                      null,
                      d().createElement(s.C, {
                        shape: v,
                        size: f,
                        src: l && l[0].url,
                        alt: a,
                      }),
                    ),
                    d().createElement(k, { $fontSize: o, $color: i }, a),
                  ),
                  d().createElement(
                    'div',
                    null,
                    O.length > 0
                      ? d().createElement(
                          d().Fragment,
                          null,
                          d().createElement(
                            b,
                            null,
                            'Welcome, ',
                            d().createElement('b', null, O),
                            '!',
                          ),
                          d().createElement(
                            c.Z,
                            { size: 'small', onClick: j },
                            'Log out',
                          ),
                        )
                      : d().createElement(
                          d().Fragment,
                          null,
                          d().createElement(
                            c.Z,
                            { size: 'small', onClick: N },
                            'Log in',
                          ),
                          d().createElement(
                            c.Z,
                            { type: 'primary', size: 'small', onClick: P },
                            'Sign up',
                          ),
                        ),
                  ),
                ),
              ),
          );
        };
      t['default'] = (0, g.memo)(A);
    },
    82425: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAAAqCAYAAABLNUJiAAAEq0lEQVR4Xu2cz2sUWRDHR/8MkZ3Diuuv1V28rAfBBcW7bBwSja6CNyGYeFBYnKCiwiJ6lRWGFUWjIAge9iIKxsR4MGBEENSokDVBMzPdk/ll4pRVrR1mqm3zfNUDD6kPlLHG9y148KFnuuO8VCoGAFicz+c3ep7XXSgUeovF4mH82Yd9VkvL9/3QiV7su8kVdGYR9ygWWoxDruOQGWSyUqnUsaBarWppzVetVgt+khvkCLmCzpRQugHuVIRyufwrLm7U63VQFBtIQHQIULx13K+AUqm0BqvIg4piA7pUwFrZIhm+voiuZHyxotjSaDToytZoEQ3fV6/g26WKpiQKOYVXtUvh1WwxfYjjixQlCeimMhAN7zA30h0DX6AoSYA3mBPo2AZ62+zG29MyX6AoSYAXMVTM60rRA7dqtTrHFyhKEqBbVRStJ0VPd+nBm6K0A3RrFh07RFe0PhVNaRf08J8co89oWRVNaRf0mwIUrd9Z0W5n05DJjX/uxiGXSUP2dtjmIJPOQtjiYkhncrgqbO2zvJfMcjLLe8ksg2zHP0+TE817/w4ujB+H7Nh22HV/dVD9Yxm4+PIEeLPTfLkR0g3aZnkvmeVklveSWQbZxES7M3UNdg7/BNsGl3yxdt1fBSPT//HYgkg3aJvlvWSWk1neS2YZZBMR7ebE+YhYcTX07iaPfxXpBm2zvJfMcjLLe8ksg6xYtMnaK/hjcGlEqLjqGlr2TW+j0g3aZnkvmeVklveSWQZZsWjnnh2KyNRc+x6sh0svT7W8du31GT4mFukGbbO8l8xyMst7ySyDrFi0vSO/RORqrkfFu3gzcLLltYOjW/mYWKQbtM3yXjLLySzvJbMMsmLROu790CLR+ed/wYHRzcHfcy/6A9G4fHTTYIp0g7ZZ3ktmOZnlvWSWQVYsGn3mapboxJPdMFF5Bj0PN8F0/Q1e8dZFRNsxvJyPiUW6Qdss7yWznMzyXjLLICsWrefh7xGRbk1dhtqHCvQ/zkT+jap3dAsfE4t0g7ZZ3ktmOZnlvWSWQVYsGv/8RdU59COcfbo/8npYA69P8zGxSDdom+W9ZJaTWd5LZhlkxaLl65Ow/V46IlNckYSl2TwfE4t0g7ZZ3ktmOZnlvWSWQVYsGkFvlVyouNIHto5keS+ZZZBNRDRi8O0NvJtcERErrD9HfobRwh0eWxDpBm2zvJfMcjLLe8ksg2xiohHF92/h3/FjcGSsA7qHV8KekbVw9HEnXH71N5TnfL7cCOkGbbO8l8xyMst7ySyDbKKiKUoczv9/NOX7YF40/KNXz9pQ2gWJ5vt+X/jllDm+QFGSgNwKv5xCX7fTS5rSFtCtmkdft/M+fYFYj0RQ2sLMzIyPjnWm6KS+crn8P1+gKEmAok2gaL8FR1bhX+wedinKAqBbXvOxVQN656kkDR1bhW5dmBeNoOMgFSUpPh/E96FFMoKOgaSjRWmBokggh8gl3/eXc88C6IBbOg6SHrIpig30EYyuZHQmMvcrAi66iu+tdPz7VPPx7ySglhYVCUVONB3/PoXOmB3/zqGT+jDYRQ/c6OluoVDoo99baWnRr5XICXKDnpMFjzC+wkcu40uaRaMTNAAAAABJRU5ErkJggg==';
    },
    51890: function (e, t, n) {
      'use strict';
      n.d(t, {
        C: function () {
          return W;
        },
      });
      var r = n(22122),
        a = n(96156),
        l = n(90484),
        o = n(28481),
        i = n(94184),
        c = n.n(i),
        s = n(48717),
        u = n(42550),
        m = n(12924),
        p = n(53124),
        f = n(25378),
        g = n(24308),
        d = m.createContext('default'),
        v = function (e) {
          var t = e.children,
            n = e.size;
          return m.createElement(d.Consumer, null, function (e) {
            return m.createElement(d.Provider, { value: n || e }, t);
          });
        },
        h = d,
        x = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
              t.indexOf(r[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                (n[r[a]] = e[r[a]]);
          }
          return n;
        },
        y = function (e, t) {
          var n,
            i,
            d = m.useContext(h),
            v = m.useState(1),
            y = (0, o.Z)(v, 2),
            Z = y[0],
            b = y[1],
            E = m.useState(!1),
            k = (0, o.Z)(E, 2),
            S = k[0],
            A = k[1],
            R = m.useState(!0),
            z = (0, o.Z)(R, 2),
            W = z[0],
            O = z[1],
            C = m.useRef(null),
            j = m.useRef(null),
            N = (0, u.sQ)(t, C),
            P = m.useContext(p.E_),
            V = P.getPrefixCls,
            L = function () {
              if (j.current && C.current) {
                var t = j.current.offsetWidth,
                  n = C.current.offsetWidth;
                if (0 !== t && 0 !== n) {
                  var r = e.gap,
                    a = void 0 === r ? 4 : r;
                  2 * a < n && b(n - 2 * a < t ? (n - 2 * a) / t : 1);
                }
              }
            };
          m.useEffect(function () {
            A(!0);
          }, []),
            m.useEffect(
              function () {
                O(!0), b(1);
              },
              [e.src],
            ),
            m.useEffect(
              function () {
                L();
              },
              [e.gap],
            );
          var F,
            w = function () {
              var t = e.onError,
                n = t ? t() : void 0;
              !1 !== n && O(!1);
            },
            Y = e.prefixCls,
            H = e.shape,
            B = void 0 === H ? 'circle' : H,
            M = e.size,
            Q = void 0 === M ? 'default' : M,
            G = e.src,
            T = e.srcSet,
            X = e.icon,
            K = e.className,
            U = e.alt,
            D = e.draggable,
            I = e.children,
            J = e.crossOrigin,
            q = x(e, [
              'prefixCls',
              'shape',
              'size',
              'src',
              'srcSet',
              'icon',
              'className',
              'alt',
              'draggable',
              'children',
              'crossOrigin',
            ]),
            $ = 'default' === Q ? d : Q,
            _ = Object.keys(('object' === (0, l.Z)($) && $) || {}).some(
              function (e) {
                return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(e);
              },
            ),
            ee = (0, f.Z)(_),
            te = m.useMemo(
              function () {
                if ('object' !== (0, l.Z)($)) return {};
                var e = g.c4.find(function (e) {
                    return ee[e];
                  }),
                  t = $[e];
                return t
                  ? {
                      width: t,
                      height: t,
                      lineHeight: ''.concat(t, 'px'),
                      fontSize: X ? t / 2 : 18,
                    }
                  : {};
              },
              [ee, $],
            ),
            ne = V('avatar', Y),
            re = c()(
              ((n = {}),
              (0, a.Z)(n, ''.concat(ne, '-lg'), 'large' === $),
              (0, a.Z)(n, ''.concat(ne, '-sm'), 'small' === $),
              n),
            ),
            ae = m.isValidElement(G),
            le = c()(
              ne,
              re,
              ((i = {}),
              (0, a.Z)(i, ''.concat(ne, '-').concat(B), !!B),
              (0, a.Z)(i, ''.concat(ne, '-image'), ae || (G && W)),
              (0, a.Z)(i, ''.concat(ne, '-icon'), !!X),
              i),
              K,
            ),
            oe =
              'number' === typeof $
                ? {
                    width: $,
                    height: $,
                    lineHeight: ''.concat($, 'px'),
                    fontSize: X ? $ / 2 : 18,
                  }
                : {};
          if ('string' === typeof G && W)
            F = m.createElement('img', {
              src: G,
              draggable: D,
              srcSet: T,
              onError: w,
              alt: U,
              crossOrigin: J,
            });
          else if (ae) F = G;
          else if (X) F = X;
          else if (S || 1 !== Z) {
            var ie = 'scale('.concat(Z, ') translateX(-50%)'),
              ce = { msTransform: ie, WebkitTransform: ie, transform: ie },
              se =
                'number' === typeof $ ? { lineHeight: ''.concat($, 'px') } : {};
            F = m.createElement(
              s.Z,
              { onResize: L },
              m.createElement(
                'span',
                {
                  className: ''.concat(ne, '-string'),
                  ref: j,
                  style: (0, r.Z)((0, r.Z)({}, se), ce),
                },
                I,
              ),
            );
          } else
            F = m.createElement(
              'span',
              {
                className: ''.concat(ne, '-string'),
                style: { opacity: 0 },
                ref: j,
              },
              I,
            );
          return (
            delete q.onError,
            delete q.gap,
            m.createElement(
              'span',
              (0, r.Z)({}, q, {
                style: (0, r.Z)((0, r.Z)((0, r.Z)({}, oe), te), q.style),
                className: le,
                ref: N,
              }),
              F,
            )
          );
        },
        Z = m.forwardRef(y);
      var b = Z,
        E = n(50344),
        k = n(55241),
        S = n(96159),
        A = function (e) {
          var t = m.useContext(p.E_),
            n = t.getPrefixCls,
            r = t.direction,
            l = e.prefixCls,
            o = e.className,
            i = void 0 === o ? '' : o,
            s = e.maxCount,
            u = e.maxStyle,
            f = e.size,
            g = n('avatar-group', l),
            d = c()(g, (0, a.Z)({}, ''.concat(g, '-rtl'), 'rtl' === r), i),
            h = e.children,
            x = e.maxPopoverPlacement,
            y = void 0 === x ? 'top' : x,
            Z = e.maxPopoverTrigger,
            A = void 0 === Z ? 'hover' : Z,
            R = (0, E.Z)(h).map(function (e, t) {
              return (0, S.Tm)(e, { key: 'avatar-key-'.concat(t) });
            }),
            z = R.length;
          if (s && s < z) {
            var W = R.slice(0, s),
              O = R.slice(s, z);
            return (
              W.push(
                m.createElement(
                  k.Z,
                  {
                    key: 'avatar-popover-key',
                    content: O,
                    trigger: A,
                    placement: y,
                    overlayClassName: ''.concat(g, '-popover'),
                  },
                  m.createElement(b, { style: u }, '+'.concat(z - s)),
                ),
              ),
              m.createElement(
                v,
                { size: f },
                m.createElement('div', { className: d, style: e.style }, W),
              )
            );
          }
          return m.createElement(
            v,
            { size: f },
            m.createElement('div', { className: d, style: e.style }, R),
          );
        },
        R = A,
        z = b;
      z.Group = R;
      var W = z;
    },
    94233: function (e, t, n) {
      'use strict';
      n(38663), n(52683), n(20136);
    },
  },
]);
