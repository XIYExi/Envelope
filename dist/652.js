(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [652, 4892],
  {
    40652: function (e, a, t) {
      'use strict';
      t.r(a);
      var n = t(91896),
        i = t(12924),
        c = t.n(i),
        r = t(74892),
        l = {
          qrcode: [
            {
              uid: '001',
              name: 'image.png',
              status: 'done',
              url: 'http://49.234.61.19/uploads/code_173e1705e0c.png',
            },
          ],
          text: '\u4e8c\u7ef4\u7801',
          color: 'rgba(153,153,153,1)',
          fontSize: 14,
        };
      a['default'] = () =>
        c().createElement(r.default, (0, n.Z)({ isTpl: !1 }, l));
    },
    74892: function (e, a, t) {
      'use strict';
      t.r(a);
      t(12968);
      var n,
        i,
        c = t(6122),
        r = t(93224),
        l = t(20310),
        x = t(12924),
        o = t.n(x),
        s = t(48510),
        d = t.n(s),
        A = t(12788),
        p = ['isTpl'],
        u = A.ZP.div(
          n ||
            (n = (0, l.Z)([
              '\n  width: 100%;\n  max-width: 220px;\n  margin: 16px auto;\n',
            ])),
        ),
        v = A.ZP.div(
          i ||
            (i = (0, l.Z)([
              '\n  text-align: center;\n  color: ',
              ';\n  font-size: ',
              ';\n  padding: 8px;\n',
            ])),
          (e) => e.$color,
          (e) => e.$fontSize,
        ),
        m = (e) => {
          var a = e.isTpl,
            t = (0, r.Z)(e, p),
            n = t.qrcode,
            i = t.text,
            l = t.color,
            x = t.fontSize,
            s = void 0 === x ? 14 : x;
          return o().createElement(
            o().Fragment,
            null,
            a
              ? o().createElement(
                  'div',
                  null,
                  o().createElement(c.Z, { preview: !1, src: d(), alt: '' }),
                )
              : o().createElement(
                  u,
                  null,
                  o().createElement(c.Z, {
                    preview: !1,
                    src: n && n[0].url,
                    alt: i,
                    style: { width: '100%' },
                  }),
                  o().createElement(v, { $color: l, $fontSize: s }, i),
                ),
          );
        };
      a['default'] = (0, x.memo)(m);
    },
    48510: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB2CAYAAAAdp2cRAAAHzUlEQVR4Xu2dy3LbNhSGvW4m0weox7t21adI/BhJd+mjdbpoZ7rtrn0Mj+/3iyxZN1vyVcHvMTVHh+Q5NARSEHS+mX8ySYAQwWeQIAFRa2sFjEajjW63u9nr9b64X79Z4subm81Op7PB/eVwhX4cDAZ/D4fDg7u7u6v7+/uJJc48PDxM4Aiu+v3+X61W6yP3+Yor/KsrcPH8/PwyMZaKp6enF7gbj8c/z0jFSHV/ccUrGMuFc3jpfvkwFetOv/8667ycsWTAoXP5z6tUTJTcb1q8kLGcuGvuZbvdXl/DzMrJ7fICxnLiXPac089rbtr81c2w7DycCHDpnP6GEfsN02cjDeDSOf3dxCaGiU0UE5soJjZRTGyimNhECSZ2MBhM9vb2JltbW9Hk6OhoMh6PeVNz3N3dvZbl9RcZ9OXt7S1vamWCiHU3wrmGxZKdnZ3Jy0v5QtXj42OuTkzBD50PQcTGNlJ5+v0+b/KU6+vrXPmYgjOJD0HE8sbEllarfG3j9PQ0Vz62+LASYs/OzniTpxwcHOTKxxYfVkLsyckJb/KU/f39XPnY4oOJNbHl8IbQ4OKPCUrd4celwXW0DEksZtT8OHVEagPiQ+1ir66a2ULFj0vje43FbL8JtAmcDysvVnow0ZRYtI8fm8aHlRd7fHycK5/FxBY0JksMYqVrrHQaNLEFjcliYnWkNiA+mFihU01sQWOymFgdqQ2ID9GIxfIaymIyg+C6856VDX5cmibEYtkSD0LQ9svLS3HhgZPsNVZa9kNHVYHXo6lTLJYEy2bWePBQZT04SbFV1kMxAjR4HZo6xZ6fn+fq0UCuRpJi8UiN1ykKPgcqwcvT1CUW/cXrFAWnaYkkxZadxnhc+3jVGXh5mrrEok28TlHa7TavOkOSYg8PD3N1ioKRLcHL09QlFsJ4naJol5IkxUodSxPjiMXMl9cpys3NDa86Q5JipRkxjfaBbF6epi6xz8/Pk+3t7Vw9Hm1+kKRYoJ2OpT1LGbwOTV1iQafTydWj0U7DIFmxGI1lkyjt2prB69HUKRaUzexxKyRtfc1IVmwGNkhnuwpwXcI9blX4cWnqFgvQVoxeTKgwH3jPU7Pkxc4DPy5NE2LnQWoD4oOJFTrVxBY0JouJ1ZHagPhgYoVObUqsXWMF+HFpJLFYauPlszQlVvrhQnxYebFlt1lIU2JtxArw49JInwSw7acCvCGxRVqs1556xRAfVl6s9EmAWOLDSoiVTsU2YgV4Q2ILrmFlaDPSGOLDSoiVVofwd7x8TMGyoA9BxMZ+nZLevjIcDnPlYwpWiHwIIhYdxxsUS6R72IxYT8e43dIW6csIIhZgTRW7IXA9yzZ9o8Ow0Mw/6Bs6uFfONmvTSKdgjvv/v7aXtv3i4iJ3rDqCPuL9hiXAKmu5ZQQTa8SFiU0UE5soJjZRTGyimNhECSYWm6cxdae3DDSYzuO2hE/15wluR8qOhxt73H5VAW3H7sKyf2veSA9IAHZk0vK4TcPtznt2aXKCiEW93d3d3A12DNEeUEAqHgTweiGj/YDhB5TXQfA4cTQa8eKVCCI29hUSqXMw8nn50NHESp+xxQj2IYhY3pjYAnllSHueQkUTqz3S9GElxEoP0rX3GIaIia0p0kJ73ddXRBOrnTV8WAmx0nWqiUmfia0pklgbsQK8ITSxbz9tYpOAiZ0Dflwaac+TtK84VEzsHPDj0khicZrm5UPHxM4BPy6NJFa71QgRTazWBh9MrNKpIaKJtRErwI9LE7tYrQ0+mFilU0NEEyuNWHyTiA9RicVWSyxhYckKS11YeakKPy5N7GKlNvh+4i8KsVh3LPvPaW81y+D1aBYtdp5UeXtqEQsXW2U9tMpLnXkdGhO7ALHam80QXGe00zKvQ+MrVupUbOau0vZ5I7VBYuFiqz750d75y8vT1CEWoE28TuhobShj4WIxGnmdomB0SPDyNL5i8RxZwsQKVF02687xWltfsdjyI9GE2KWdFUsdSyPtWwK8PI2vWO1rtE2sAF4myevwaB0MeB0aX7HSOi4wsQrS7BKnwyqfEeX1aOoSGzNRiAX4fhp8TpRunNauqxR+XBoTu0Cx88KPS2NiTexMTGxBp2QxsYvBxJrYcniH0MQgFvLKkNZCTWxBp2SJXay0mU0Ti4UA3IdL0RYvcDfA6/D4sBJipX3F0iKEJhadzuvwaF8zWuWTij7ULhYdxz+wXEf4cWkkQdKGcakeqPJWN00sHvLzOjw+1C42hkiCpI6V6oEqjxQ1sdomA8SHlRArnYpNrABvSGyRbneka5wmtsq3UZrYGiO9UxHSefksmtjkR2yVxi0ymOSU0RW+tTkGsdJlRCKIWOyb5Q2KJZoc3GeW7eLQ6jYh1tdJELEA+3+r7l9qKjjNag8IADq/6EHFIsXiNsz34QQIJtaICxObKCY2UUxsopjYRDGxiWJiE2UqttPpfDGx6fD2IfKvGLGb7oa4/DWhxlLhXJ45p58wYjeGw6H8qMVYGpzLfSf3pzUwGAz+xDdeGcuNc/jU6/X+eJUKWq3Wx36/f8ELGsuFc3jm+GEqFrg//MWN3EcbucsHnLlT8NidgtdnpGa4Mh9cgf9duqPR6BYzLMyYLfEFbpyjoRuMXefrv9xILaLdbq+7mdVnTJtxT2SJL29uPk0nSozvU1wFm2twnaUAAAAASUVORK5CYII=';
    },
  },
]);
