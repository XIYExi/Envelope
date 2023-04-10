(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [5226],
  {
    64842: function (e, A, g) {
      'use strict';
      g.r(A);
      var n,
        t = g(91896),
        E = (g(12968), g(6122)),
        i = g(93224),
        l = (g(402), g(55672)),
        c = g(20310),
        o = g(12924),
        D = g.n(o),
        h = g(12788),
        Q = g(49504),
        C = g.n(Q),
        I = ['isTpl'],
        m = ['textAlign', 'text', 'fontSize', 'color', 'lineHeight'],
        x = (0, h.ZP)(l.Z.Text)(
          n ||
            (n = (0, c.Z)([
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
        f = (e) => {
          var A = e.isTpl,
            g = (0, i.Z)(e, I),
            n = g.textAlign,
            l = g.text,
            c = g.fontSize,
            o = g.color,
            h = g.lineHeight,
            Q = (0, i.Z)(g, m);
          return D().createElement(
            D().Fragment,
            null,
            A
              ? D().createElement(
                  'div',
                  null,
                  D().createElement(E.Z, { src: C(), alt: '' }),
                )
              : D().createElement(
                  x,
                  (0, t.Z)(
                    { $color: o, $lineHeight: h, $fontSize: c, $textAlign: n },
                    Q,
                  ),
                  l,
                ),
          );
        };
      A['default'] = (0, o.memo)(f);
    },
    49504: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAFd0lEQVR4Xu2cWSitURTHl8gQMhOhjA+U8iAkefPgQUlKJFMZohQyDxmjRCQZ3kh5kYwvvJCQOUM8mSPzeAyZbmuXkzO4zr2556y6a9ftq/Nt3/ff/9/5r7W3brTe39/fgQcZB7QYCBkWQggDocWDgRDjwUAYCDUHiOnhHsJAiDlATA4nhIEQc4CYHE4IAyHmADE5nBAGQswBYnI4IQyEmAPE5HBCGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgcTggDIeYAMTlaEomE/28vISgMhBAMlMJAGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgcTggDIeYAMTmcEAZCzAFicjSWkKGhIfDw8ABnZ2dhyfb2NkxNTUF0dLSCRcPDwxAQEADGxsbw+vqqcF9XV1fhs62tLZiYmIC4uDiVLL+5uYGenh5ISkpSaf6/mqQxICcnJ9DW1gbFxcVibdXV1RAREQFubm4ya11aWgIEUlRUBP39/TA5OangRWZmJtja2ip8Xl5eDpGRkeDu7v6tfxcXF1BXVyd0aHKoHcje3h7U1taCpaUl4B8iur29FevX1tYGQ0NDODs7g9zcXHB0dASE0dnZKaCZm5v/1qfd3V1ob2+XmYPPfnh4AGtra5nPMQULCwviXR/j8fERVldXwcfHR2aun58feHl5qY2R2oFgaRoYGICMjAyxyJGREXENCQkR18bGRggNDRUm4rc1OzsbME2YjMTExC+NwVJ2d3cH+/v7gOUwNTVVZm59fb1Ii52dHRgZGYl5T09PYs7l5aVIIQI0MTGBqKgo6c9aWVl9+2X4SVoaAVJVVQUODg5iHefn5+JqYWEhrmhUYWEhODk5wcvLi/hXUFAAWJYwAVdXV2IeAri+vhZmeXp6QnJystSX0tJSSEtLkybj+PgYWlpaoKysTKl3eC8oKAi6u7shMDAQTE1Nwd/f/yd9VvlZGgGiSkIQCDbampoaUb5SUlJkFoU1v6GhASoqKhQWOzs7C9PT09IUtra2gre3N/j6+irMXV9fh5mZGQgLCxM9BJ+HvScvLw8MDAxUNvKnJmoESGVlpbQJY7nAYWZmJq5HR0eigSOEnJwcsQtDYxISEhSAYBnCZykbCMHe3h5sbGxgfHxclD75cXBwAM3NzZCfny8S99HU19bWoLe3F7KyskR5U+dQOxD5xcn3kM/3Dw8PRf9YXFxUCuSrhOAzsNSVlJSIvoK9SN7Yzc1N6OjoEKUNyyUmDnd9CAfHxsYG9PX1iaR8fFnUAUatQFZWVqCrq0tmXdgHcGAz/TxiYmLE7mZ5efmvgIyNjcHo6KjYuWFKYmNjQV9fX7xCIpGIPoVmI+y5uTl4fn4G3AG6uLiIOeHh4WIevv9zf/rXUNQKRNlifpcQnP8VENyy4o5Mvofg1nVwcFA0+/j4eNDT0xM7OYSDuzds2jo6OoDb3A9A+J7/9hzyJyVLGZCdnR1R33Hn5OrqKj1Z48m8qalJHCyDg4MVDphoOG5t5+fnIT09Xen9//JgKA9EvqnL38eD3f39vXRbjL3h9PRUfMvxjPAx3t7exLzvmjDOwV+14M9/HtjUETKeUzQ5NF6yNLl4iu9mIMSoMBAGQswBYnI4IQyEmAPE5HBCGAgxB4jJ4YQwEGIOEJPDCWEgxBwgJocTwkCIOUBMDieEgRBzgJgc/mtADISYA8TkcEIYCDEHiMnhhDAQYg4Qk8MJYSDEHCAmhxPCQIg5QEwOJ4SBEHOAmBxOCAMh5gAxOZwQBkLMAWJyOCEMhJgDxORwQhgIMQeIyeGEMBBiDhCTwwlhIMQcICaHE8JAiDlATA4nhIEQc4CYnF8Rm3XaxTKrBgAAAABJRU5ErkJggg==';
    },
  },
]);
