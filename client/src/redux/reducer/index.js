const initialState = {
    posts: [],
    length: 0,
    categries:[],
    detail: {},
    search: '',
    compressedPost: '',
  };
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GetPosts":
          console.log(action)
        if(action.page > 0){
          return {
            ...state,
            posts: state.posts.concat(action.payload.artWorks),
            length: action.payload.counter
          };
        }else if(action.search) {
          return {
            ...state,
            posts: action.payload,
            
          }
        }else{
          
            return {
              ...state,
              posts: action.payload.artWorks,
              
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
        case 'SearchAll':
          console.log(action)
          return{
            ...state,
            search: action.payload,
            
        }
      default:
        return state;
    }
  }
  export default rootReducer;