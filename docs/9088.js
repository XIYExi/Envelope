(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9088, 3320],
  {
    19088: function (e, a, l) {
      'use strict';
      l.r(a);
      var t = l(91896),
        o = l(12924),
        n = l.n(o),
        r = l(53320),
        c = {
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
        };
      a['default'] = () =>
        n().createElement(r.default, (0, t.Z)({ isTpl: !1 }, c));
    },
    53320: function (e, a, l) {
      'use strict';
      l.r(a);
      l(12968);
      var t = l(6122),
        o = l(93224),
        n = (l(71153), l(60331)),
        r = l(2824),
        c = (l(43358), l(9e3)),
        i = l(12924),
        u = l.n(i),
        s = l(71706),
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
            s = (0, i.useState)(Math.floor(4 * Math.random()) + 0),
            d = (0, r.Z)(s, 2),
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
        f = (e) => {
          var a = e.isTpl,
            l = (0, o.Z)(e, p),
            n = l.options,
            d = l.allowClear,
            f = l.autoFocus,
            v = l.bordered,
            b = l.clearIcon,
            w = l.defaultActiveFirstOption,
            x = l.defaultOpen,
            C = l.disabled,
            T = l.listHeight,
            E = l.loading,
            O = l.maxTagCount,
            Z = l.maxTagPlaceholder,
            F = l.maxTagTextLength,
            S = l.mode,
            A = l.placeholder,
            I = l.placement,
            k = l.showArrow,
            M = l.showSearch,
            y = l.suffixIcon,
            L = l.virtual,
            P = (0, i.useState)([]),
            H = (0, r.Z)(P, 2),
            D = H[0],
            R = H[1],
            j = (0, i.useState)(),
            q = (0, r.Z)(j, 2),
            z = q[0],
            B = q[1];
          (0, i.useEffect)(() => {
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
                    placeholder: A,
                    placement: I,
                    mode: S,
                    allowClear: d,
                    autoFocus: f,
                    clearIcon: u().createElement(s[b]),
                    bordered: v,
                    defaultActiveFirstOption: w,
                    defaultOpen: x,
                    disabled: C,
                    listHeight: T,
                    loading: E,
                    maxTagTextLength: F,
                    maxTagCount: O,
                    maxTagPlaceholder: Z,
                    showArrow: k,
                    showSearch: M,
                    suffixIcon: u().createElement(s[y]),
                    virtual: L,
                    onChange: G,
                  },
                  D.map((e, a) =>
                    u().createElement(g, { value: e, label: e, key: a }, e),
                  ),
                ),
              ),
          );
        };
      a['default'] = (0, i.memo)(f);
    },
    27981: function (e, a, l) {
      e.exports = l.p + 'static/Select.e16b64ec.svg';
    },
  },
]);
