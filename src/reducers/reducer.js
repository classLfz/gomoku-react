const initialState = {
  text: '你好，访问者',
  name: '访问者'
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'change':
      return {
        name: action.payload,
        text: '你好，' + action.payload
      };
    default:
      return state;
  }
}

export default reducer;
