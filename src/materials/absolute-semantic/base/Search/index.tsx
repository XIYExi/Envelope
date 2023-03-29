import React, { FC, useState } from 'react';
import { ISearchConfig } from '@/materials/absolute-semantic/base/Search/schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Image, Search } from 'semantic-ui-react';
import _ from 'lodash';

/*begin to delete*/
interface ISearchProps extends ISearchConfig {
  isTpl: boolean;
  onResultSelect?: any;
}
/*end to delete*/

const initialState = {
  loading: false,
  results: [],
  value: '',
};

function searchReducer(state: any, action: any) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

const SSearch: FC<ISearchProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { dataSource, placeholder, fluid, size } = restProps;

  const [state, dispatch] = React.useReducer(searchReducer, initialState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });
    /*@ts-ignore*/
    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result: any) => re.test(result.title);

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(dataSource, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Search" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Search
            loading={loading}
            fluid={fluid}
            size={size}
            placeholder={placeholder}
            onResultSelect={(e, data) => {
              dispatch({
                type: 'UPDATE_SELECTION',
                selection: data.result.title,
              });
              //console.log(data.result);
              props.onResultSelect && props.onResultSelect(data.result);
            }}
            onSearchChange={handleSearchChange}
            results={results}
            value={value}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default SSearch;
