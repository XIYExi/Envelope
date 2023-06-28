(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3320],
  {
    53320: function (e, a, l) {
      'use strict';
      l.r(a);
      l(12968);
      var t = l(6122),
        o = l(93224),
        n = (l(71153), l(60331)),
        r = l(2824),
        c = (l(43358), l(9e3)),
        s = l(12924),
        u = l.n(s),
        i = l(71706),
        d = l(27981),
        m = l.n(d),
        p = ['isTpl'],
        g = c.Z.Option,
        h = (e) => {
          var a = e.label,
            l = e.closable,
            t = e.onClose,
            o = (e) => {
              e.preventDefault(), e.stopPropagation();
            },
            c = [
              { value: 'gold' },
              { value: 'lime' },
              { value: 'green' },
              { value: 'cyan' },
            ],
            i = (0, s.useState)(Math.floor(4 * Math.random()) + 0),
            d = (0, r.Z)(i, 2),
            m = d[0];
          d[1];
          return u().createElement(
            n.Z,
            {
              color: c[m].value,
              onMouseDown: o,
              closable: l,
              onClose: t,
              style: { marginRight: 3 },
            },
            a,
          );
        },
        v = (e) => {
          var a = e.isTpl,
            l = (0, o.Z)(e, p),
            n = l.options,
            d = l.allowClear,
            v = l.autoFocus,
            f = l.bordered,
            w = l.clearIcon,
            b = l.defaultActiveFirstOption,
            x = l.defaultOpen,
            C = l.disabled,
            E = l.listHeight,
            T = l.loading,
            Z = l.maxTagCount,
            S = l.maxTagPlaceholder,
            k = l.maxTagTextLength,
            F = l.mode,
            O = l.placeholder,
            y = l.placement,
            A = l.showArrow,
            I = l.showSearch,
            M = l.suffixIcon,
            P = l.virtual,
            D = (0, s.useState)([]),
            H = (0, r.Z)(D, 2),
            L = H[0],
            R = H[1],
            j = (0, s.useState)(),
            q = (0, r.Z)(j, 2),
            z = q[0],
            B = q[1];
          (0, s.useEffect)(() => {
            var e = n.split('-');
            R(e), console.log(e);
          }, [n]);
          var G = (a) => {
            B(a), e.onChange && e.onChange(a);
          };
          return u().createElement(
            u().Fragment,
            null,
            a &&
              u().createElement(
                'div',
                null,
                u().createElement(t.Z, { preview: !1, src: m(), alt: '' }),
              ),
            !a &&
              u().createElement(
                'div',
                null,
                u().createElement(
                  c.Z,
                  {
                    value: z,
                    tagRender: h,
                    style: { width: '100%' },
                    placeholder: O,
                    placement: y,
                    mode: F,
                    allowClear: d,
                    autoFocus: v,
                    clearIcon: u().createElement(i[w]),
                    bordered: f,
                    defaultActiveFirstOption: b,
                    defaultOpen: x,
                    disabled: C,
                    listHeight: E,
                    loading: T,
                    maxTagTextLength: k,
                    maxTagCount: Z,
                    maxTagPlaceholder: S,
                    showArrow: A,
                    showSearch: I,
                    suffixIcon: u().createElement(i[M]),
                    virtual: P,
                    onChange: G,
                  },
                  L.map((e, a) =>
                    u().createElement(g, { value: e, label: e, key: a }, e),
                  ),
                ),
              ),
          );
        };
      a['default'] = (0, s.memo)(v);
    },
    27981: function (e, a, l) {
      e.exports = l.p + 'static/Select.e16b64ec.svg';
    },
  },
]);
