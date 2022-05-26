const initialState = {
    posts: [],
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
      default:
        return state;
    }
  }
  export default rootReducer;