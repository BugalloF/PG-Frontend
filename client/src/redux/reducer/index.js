const initialState = {
    posts: [],
    categries:[],
    compressedPost: '',
  };
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GetPosts":
          console.log(action.payload)
        return {
          ...state,
          posts: action.payload,
        };
      case "MakePost":
          console.log(action.payload)
        return {
          ...state,
          compressedPost: action.payload,
        };
        case 'GetCategories':
          console.log(action.payload)
          return{
            ...state,
            categories: action.payload
          }
      default:
        return state;
    }
  }
  export default rootReducer;