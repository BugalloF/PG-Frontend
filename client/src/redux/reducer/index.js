const initialState = {
  posts: [],
  search:[],
  length: 0,
  page: 0,
  categories:[],
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
      case 'PriceOrder':
        return{
          ...state,
          posts: action.payload.Artworks,
          length: action.payload.counter,  
        }  
      case 'AntOrder':
        return{
          ...state,
          posts: action.payload.Artoworks,
          length: action.payload.counter,          
        }  
      case 'LikesOrder':
        return{
          ...state,
          posts: action.payload.Artworks,
          length: action.payload.counter, 
        }  
      // case 'CountryFilter':
      //   return{
      //     ...state,
      //     posts: action.payload.Artworks,
      //     length: action.payload.counter, 
      //   } 

      // case 'CategoryFilter':
      //   return{
      //     ...state,
      //     posts: action.payload,
      //     length: action.payload.counter, 
      //   }  


      default:
      return state;
  }
}
export default rootReducer;