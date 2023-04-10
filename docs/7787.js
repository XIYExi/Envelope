(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7787],
  {
    67787: function (A, e, C) {
      'use strict';
      C.r(e);
      var t = C(57337),
        I = C(93224),
        g = C(8870),
        l = C(12924),
        B = C.n(l),
        E = C(74086),
        n = C.n(E),
        u = C(49282),
        s = C(73867),
        o = C(21173),
        Q = C.n(o),
        U = ['isTpl'],
        r = { loading: !1, results: [], value: '' };
      function a(A, e) {
        switch (e.type) {
          case 'CLEAN_QUERY':
            return r;
          case 'START_SEARCH':
            return (0, g.Z)(
              (0, g.Z)({}, A),
              {},
              { loading: !0, value: e.query },
            );
          case 'FINISH_SEARCH':
            return (0, g.Z)(
              (0, g.Z)({}, A),
              {},
              { loading: !1, results: e.results },
            );
          case 'UPDATE_SELECTION':
            return (0, g.Z)((0, g.Z)({}, A), {}, { value: e.selection });
          default:
            throw new Error();
        }
      }
      var m = (A) => {
        var e = A.isTpl,
          C = (0, I.Z)(A, U),
          g = C.dataSource,
          l = C.placeholder,
          E = C.fluid,
          o = C.size,
          m = B().useReducer(a, r),
          G = (0, t.Z)(m, 2),
          S = G[0],
          R = G[1],
          J = S.loading,
          F = S.results,
          i = S.value,
          c = B().useRef(),
          h = B().useCallback((A, e) => {
            clearTimeout(c.current),
              R({ type: 'START_SEARCH', query: e.value }),
              (c.current = setTimeout(() => {
                if (0 !== e.value.length) {
                  var A = new RegExp(Q().escapeRegExp(e.value), 'i'),
                    C = (e) => A.test(e.title);
                  R({ type: 'FINISH_SEARCH', results: Q().filter(g, C) });
                } else R({ type: 'CLEAN_QUERY' });
              }, 300));
          }, []);
        return (
          B().useEffect(
            () => () => {
              clearTimeout(c.current);
            },
            [],
          ),
          B().createElement(
            B().Fragment,
            null,
            e && B().createElement(u.Z, { src: n(), alt: 'Search' }),
            !e &&
              B().createElement(
                'div',
                null,
                B().createElement(s.Z, {
                  loading: J,
                  fluid: E,
                  size: o,
                  placeholder: l,
                  onResultSelect: (e, C) => {
                    R({ type: 'UPDATE_SELECTION', selection: C.result.title }),
                      A.onResultSelect && A.onResultSelect(C.result);
                  },
                  onSearchChange: h,
                  results: F,
                  value: i,
                }),
              ),
          )
        );
      };
      e['default'] = m;
    },
    74086: function (A) {
      A.exports =
        'data:image/png;base64,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';
    },
  },
]);
