(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4045, 5226],
  {
    54336: function (e, A, n) {
      'use strict';
      n.r(A);
      var g = n(91896),
        t = n(12924),
        l = n.n(t),
        i = n(64842),
        o = {
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
        };
      A['default'] = () =>
        l().createElement(i.default, (0, g.Z)({ isTpl: !1 }, o));
    },
    64842: function (e, A, n) {
      'use strict';
      n.r(A);
      var g,
        t = n(91896),
        l = (n(12968), n(6122)),
        i = n(93224),
        o = (n(402), n(55672)),
        E = n(20310),
        c = n(12924),
        a = n.n(c),
        h = n(12788),
        D = n(49504),
        f = n.n(D),
        r = ['isTpl'],
        C = ['textAlign', 'text', 'fontSize', 'color', 'lineHeight'],
        Q = (0, h.ZP)(o.Z.Text)(
          g ||
            (g = (0, E.Z)([
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
        m = (e) => {
          var A = e.isTpl,
            n = (0, i.Z)(e, r),
            g = n.textAlign,
            o = n.text,
            E = n.fontSize,
            c = n.color,
            h = n.lineHeight,
            D = (0, i.Z)(n, C);
          return a().createElement(
            a().Fragment,
            null,
            A
              ? a().createElement(
                  'div',
                  null,
                  a().createElement(l.Z, { src: f(), alt: '' }),
                )
              : a().createElement(
                  Q,
                  (0, t.Z)(
                    { $color: c, $lineHeight: h, $fontSize: E, $textAlign: g },
                    D,
                  ),
                  o,
                ),
          );
        };
      A['default'] = (0, c.memo)(m);
    },
    49504: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAFd0lEQVR4Xu2cWSitURTHl8gQMhOhjA+U8iAkefPgQUlKJFMZohQyDxmjRCQZ3kh5kYwvvJCQOUM8mSPzeAyZbmuXkzO4zr2556y6a9ftq/Nt3/ff/9/5r7W3brTe39/fgQcZB7QYCBkWQggDocWDgRDjwUAYCDUHiOnhHsJAiDlATA4nhIEQc4CYHE4IAyHmADE5nBAGQswBYnI4IQyEmAPE5HBCGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgcTggDIeYAMTlaEomE/28vISgMhBAMlMJAGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgcTggDIeYAMTmcEAZCzAFicjSWkKGhIfDw8ABnZ2dhyfb2NkxNTUF0dLSCRcPDwxAQEADGxsbw+vqqcF9XV1fhs62tLZiYmIC4uDiVLL+5uYGenh5ISkpSaf6/mqQxICcnJ9DW1gbFxcVibdXV1RAREQFubm4ya11aWgIEUlRUBP39/TA5OangRWZmJtja2ip8Xl5eDpGRkeDu7v6tfxcXF1BXVyd0aHKoHcje3h7U1taCpaUl4B8iur29FevX1tYGQ0NDODs7g9zcXHB0dASE0dnZKaCZm5v/1qfd3V1ob2+XmYPPfnh4AGtra5nPMQULCwviXR/j8fERVldXwcfHR2aun58feHl5qY2R2oFgaRoYGICMjAyxyJGREXENCQkR18bGRggNDRUm4rc1OzsbME2YjMTExC+NwVJ2d3cH+/v7gOUwNTVVZm59fb1Ii52dHRgZGYl5T09PYs7l5aVIIQI0MTGBqKgo6c9aWVl9+2X4SVoaAVJVVQUODg5iHefn5+JqYWEhrmhUYWEhODk5wcvLi/hXUFAAWJYwAVdXV2IeAri+vhZmeXp6QnJystSX0tJSSEtLkybj+PgYWlpaoKysTKl3eC8oKAi6u7shMDAQTE1Nwd/f/yd9VvlZGgGiSkIQCDbampoaUb5SUlJkFoU1v6GhASoqKhQWOzs7C9PT09IUtra2gre3N/j6+irMXV9fh5mZGQgLCxM9BJ+HvScvLw8MDAxUNvKnJmoESGVlpbQJY7nAYWZmJq5HR0eigSOEnJwcsQtDYxISEhSAYBnCZykbCMHe3h5sbGxgfHxclD75cXBwAM3NzZCfny8S99HU19bWoLe3F7KyskR5U+dQOxD5xcn3kM/3Dw8PRf9YXFxUCuSrhOAzsNSVlJSIvoK9SN7Yzc1N6OjoEKUNyyUmDnd9CAfHxsYG9PX1iaR8fFnUAUatQFZWVqCrq0tmXdgHcGAz/TxiYmLE7mZ5efmvgIyNjcHo6KjYuWFKYmNjQV9fX7xCIpGIPoVmI+y5uTl4fn4G3AG6uLiIOeHh4WIevv9zf/rXUNQKRNlifpcQnP8VENyy4o5Mvofg1nVwcFA0+/j4eNDT0xM7OYSDuzds2jo6OoDb3A9A+J7/9hzyJyVLGZCdnR1R33Hn5OrqKj1Z48m8qalJHCyDg4MVDphoOG5t5+fnIT09Xen9//JgKA9EvqnL38eD3f39vXRbjL3h9PRUfMvxjPAx3t7exLzvmjDOwV+14M9/HtjUETKeUzQ5NF6yNLl4iu9mIMSoMBAGQswBYnI4IQyEmAPE5HBCGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgc/mtADISYA8TkcEIYCDEHiMnhhDAQYg4Qk8MJYSDEHCAmhxPCQIg5QEwOJ4SBEHOAmBxOCAMh5gAxOZwQBkLMAWJyOCEMhJgDxORwQhgIMQeIyeGEMBBiDhCTwwlhIMQcICaHE8JAiDlATA4nhIEQc4CYnF8Rm3XaxTKrBgAAAABJRU5ErkJggg==';
    },
  },
]);
