const initialState = {
  posts: [],
  search:[],
  status: null ,
  length: 0,
  page: 0,
  categories:[],
  detail: {},
  profile: {},
  search: '',
  compressedPost: '',
  users: [],
};
function rootReducer(state = initialState, action) {
  // console.log(action)
  switch (action.type) {
    case "GetPosts": 
        if(state.page === 0){
          // console.log('holis')
          return {
            ...state,
            posts: action.artWorks,
            length: action.counter,

          };
        }else {
          return {
            ...state,
            posts: [...state.posts,...action.artWorks],
            length: action.counter,
          };
        }
    case 'GetProfileDetail':
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
      case 'Post': 
      return {
        ...state,
        status: action.payload
      }
      case 'CleanStatus': 
      return {
        ...state,
        status: null
      }
      case 'CleanDetail': 
      return {
        ...state,
        detail: {}
      }
      case 'CleanProfile': 
      return {
        ...state,
        profile: {}
      }
      case 'CleanPosts': 
      return {
        ...state,
        posts: []
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

      case 'CategoryFilter':
        return{
          ...state,
          posts: action.payload.Artworks,
          length: action.payload.counter, 
        }

        case "REGISTER":
            return {...state};
        
        case "LOGIN":
            return {...state, profile: action.payload};
        
        case "PROFILE":
            return {...state, profile: action.payload};
        
        case "GET_USERS":
            return {...state, users: action.payload};

      default:
        return state;
  }
}
export default rootReducer;