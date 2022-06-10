const initialState = {
  posts: [],
  followedPosts:[],
  search:[],
  status: null ,
  length: 0,
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
          hasMore:true
        };
      } else {
        return {
          ...state,
          posts: [...state.posts, ...action.artWorks],
          length: action.length,
          loader:false
        };
      };
      case "GetCategoryPosts":
        if (state.page === 0) {
          return {
            ...state,
            posts: action.artWorks,
            length: action.length,
            loader: false,
            hasMore:true
          };
        } else {
          return {
            ...state,
            posts: [...state.posts, ...action.artWorks],
            length: action.length,
            loader:false
          };
        };

        case "SetCategory":
          return {
            ...state,
            category: action.payload,
          };
      
    
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
        filter:false
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
      return {...state, profile: action.payload};
    
    case "GET_USERS":
      return {...state, users: action.payload};
    
    case "ADD_LIKE":
      return {...state, detail: action.payload};
    
    case 'DELETE_LIKE':
      // console.log('soy delete like',action.payload)
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
          hasMore:true
        };
      } else {
        return {
          ...state,
          followedPosts: [...state.followedPosts, ...action.artWorks],
          length: action.length,
          filter: false,
          loader:false
        };
      };
     case "CLEAN_FOLLOWED_POSTS":
      return {...state,
        followedPosts: [],
        loader:true
      }
    default:
      return {...state};
  };
};


export default rootReducer;