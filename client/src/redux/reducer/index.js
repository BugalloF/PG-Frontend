const initialState = {
  posts: [],
  search:[],
  length: 0,
  page: 0,
  categries:[],
  detail: {},
  profile: {},
  search: '',
  compressedPost: '',
};
function rootReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case "GetPosts": 
        if(state.page === 0){
          return {
            ...state,
            posts: action.payload.artWorks,
            length: action.payload.counter,

          };
        }else {
          return {
            ...state,
            posts: [...state.posts,...action.payload.artWorks],
            length: action.payload.counter,
          };
        }
    case 'GetProfile':
      return {
        ...state,
        profile: action.payload
      }       
      
    case "MakePost":
        
      return {
        ...state,
        compressedPost: action.payload,
      };
      case 'GetCategories':
       
        return{
          ...state,
          categories: action.payload
        }
      case 'GetDetail':
       
      return {
        ...state,
        detail: action.payload
      }
      case 'setPage':
      return{
        ...state,
        page: ++state.page
      }
      case 'resetPage' :
      return{
        ...state,
        page:0
      }
    default:
      return state;
  }
}
export default rootReducer;