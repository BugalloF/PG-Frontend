const initialState = {
  posts: [],
  followedPosts:[],
  transactions: [],
  search:[],
  recommended: [],
  status: null ,
  length: null,
  page: 0,
  category: null,
  categories:[],
  detail: {},
  profile: {},
  users: [],
  search: '',
  compressedPost: '',
  loader:true,
  hasMore:true,
  notFound:false
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GetPosts":
      if (state.page === 0) {
        return {
          ...state,
          posts: action.artWorks,
          length: action.length,
          loader: false,
          hasMore: action.artWorks.length<12?false:true,
          notFound:false
        };
      } else {
        return {
          ...state,
          posts: [...state.posts, ...action.artWorks],
          length: action.length,
          loader:false,
          notFound:false
        };
      };
      case "GetCategoryPosts":
        if (state.page === 0) {
          return {
            ...state,
            posts: action.artWorks,
            length: action.length,
            loader: false,
            hasMore:action.artWorks.length<12?false:true,
            notFound:false
          };
        } else {
          return {
            ...state,
            posts: [...state.posts, ...action.artWorks],
            length: action.length,
            loader:false,
            notFound:false
          };
        };

    case "SetCategory":
          return {
            ...state,
            category: action.payload,
          };

    case "GetRecoPosts":
            return {
              ...state,
              recommended: action.artWorks,
            };

    case "CleanReco": 
            return {
              ...state,
              recommended: []
            }
      
    case "GetProfileDetail":
      return {
        ...state,
        profile: action.payload,
      };
    
    case "MakePost":
      return {
        ...state,
        compressedPost: action.payload,
      };
    
    case "GetCategories":
      return {
        ...state,
        categories: action.payload,
      };
    
    case "GetDetail":
      return {
        ...state,
        detail: action.payload,
        filter:false,
        loader: false,
        notFound:false
      };
  
    case "setPage":
    if (state.page === Math.floor(state.length / 12)) {
      return {
        ...state,
        hasMore:false
      };
    } else {
      return {
        ...state,
        page: ++state.page,
        hasMore:true
      };      
    }
    
    case "resetPage":
      return {
        ...state,
        page: 0,
      };
    
    case "LOADER_TRUE":
      return {
        ...state,
        loader:true
      }


    
    case "Post":
      return {
        ...state,
        status: action.payload,
      };

    case "EDIT_ARTWORK":
      return {
        ...state,
          status: action.payload,
      };
    case "DELETE_ARTWORK":
      return {
        ...state,
          status: action.payload,
      };
      
    case "CleanStatus":
      return {
        ...state,
        status: null,
      };
    
    case "CleanDetail":
      return {
        ...state,
        detail: {},
      };
    
    case "CleanProfile":
      return {
        ...state,
        profile: {},
      };
    case "CleanTransactions":
        return {
          ...state,
          transactions: [],
        };
      case "CleanUsers":
        return {
          ...state,
          users:[],
        };
    
    case "CleanPosts":
      return {
        ...state,
        posts: [],
        loader:true
      };
        
    case "REGISTER":
      return {...state};
    
    case "LOGIN":
      return {...state, profile: action.payload};
    
    case "PROFILE":
      return {...state, profile: action.payload, loader: false};
    
    case "EDIT_PROFILE":
      return {...state, profile:{...state.profile, found:action.payload.data}};    

    case "GET_USERS":
      return {...state, users: action.payload};
    
    case "ADD_LIKE":
      return {...state, detail: action.payload};
    
    case 'DELETE_LIKE':
      return {...state, detail: action.payload};

    case "ADD_FOLLOWER":
        return {...state, profile: action.payload};
    
    case "DELETE_FOLLOWER":
          return {...state, profile: action.payload};
    
    case "GET_FOLLOWED_POST":
      if (state.page === 0) {
        return {
          ...state,
          followedPosts: action.artWorks,
          length: action.length,
          filter: false,
          loader: false,
          hasMore:action.artWorks.length<12?false:true,
          notFound:false
        };
      } else {
        return {
          ...state,
          followedPosts: [...state.followedPosts, ...action.artWorks],
          length: state.length + action.length,
          filter: false,
          loader:false,
          notFound:false
        };
      };
     case "CLEAN_FOLLOWED_POSTS":
      return {...state,
        followedPosts: [],
        loader:true
      }
      case "DeleteUser":
        return {...state,
          status:action.payload 
        }

        
    case "AdmCategory":
      return{
        ...state,
        status:action.payload,

      }
      case "AdmTransaction":
        return{
          ...state,
          status:action.payload
        }

    case "GetTransactions":
      if(state.page === 0){
        return {
          ...state,
          transactions: action.transactions,
          length: action.counter,
          hasMore:true
        }
      }else{
        return {
          ...state,
          transactions:  [...state.transactions, ...action.transactions],
          length: action.counter,
          hasMore:true
        }
      }

    case "GetAdmProfiles":
      if(state.page === 0){
        return{
          ...state,
          users:action.profiles,
          length: action.counter,
          hasMore: true
        }

      }else{
        return {
          ...state,
          users:[...state.users, ...action.profiles],
          length: action.counter,
          hasMore: true
        }
      }
        case "BAN_USER":
            return {...state, users: action.payload};
        case "UNBAN_USER":
              return {...state, users: action.payload};
        case "GET_BANNED_USERS":
              return {...state, users: action.payload};  

        case "Not_Found":
          return {...state, notFound:true, posts:[], hasMore: false, loader:false};  


    default:
      return {...state};
  };
};


export default rootReducer;