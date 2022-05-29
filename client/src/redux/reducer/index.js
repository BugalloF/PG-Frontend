const initialState = {
    posts: [],
    length: 0,
    categries:[],
    detail: {},
    compressedPost: '',
  };
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GetPosts":
          console.log(action.payload)
        if(action.page > 0){
          return {
            ...state,
            posts: state.posts.concat(action.payload.artWorks),
            length: action.payload.counter
          };
        }else {
          return {
            ...state,
            posts: action.payload.artWorks,
            length: action.payload.counter
          }
        }
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
        case 'GetDetail':
          console.log(action.payload) 
        return {
          ...state,
          detail: action.payload
        }
      default:
        return state;
    }
  }
  export default rootReducer;