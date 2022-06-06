const initialState = {
  posts: [],
  search:[],
  status: null ,
  length: 0,
  page: 0,
  categories:[],
  detail: {},
  profile: {},
  users: [],
  search: '',
  compressedPost: '',
  filter: false,
  countries:[],
  loader:true
};


function rootReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "GetPosts":
      if (state.page === 0) {
        return {
          ...state,
          posts: action.artWorks,
          length: action.counter,
          filter: false,
          loader: false,
        };
      } else {
        return {
          ...state,
          posts: [...state.posts, ...action.artWorks],
          length: action.counter,
          filter: false,
          loader:false
        };
      };
    
    case "GetPostsWithSearch":
      if (state.page === 0) {
        return {
          ...state,
          posts: action.artWorks,
          length: action.counter,
          filter: false,
          loader: false,
        };
      } else {
        return {
          ...state,
          posts: [...state.posts, ...action.artWorks],
          length: action.counter,
          filter: false,
          loader:false
        };
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
      return {
        ...state,
        page: ++state.page,
      };
    
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
    
    case "PriceOrder":
      if (state.page === 0) {
        return {
          ...state,
          posts: action.payload.Artworks,
          length: action.payload.counter,
          filter: true,
          loader:false
        };
      } else {
          return {
            ...state,
            posts: [...state.posts, ...action.payload.Artworks],
            length: action.payload.counter,
            filter: true,
            loader:false
          };              
      }

    
    case "Filter":
      return {
        ...state,
        filter: true,
      };
    
    case "FilterNo":
      return {
        ...state,
        filter: false,
      };
    
    case "AntOrder":
      if (state.page === 0) {
        return {
          ...state,
          posts: action.payload.Artoworks,
          length: action.payload.counter,
          filter: true,
          loader:false
        };
      } else {
        return {
          ...state,
          posts: [...state.posts, ...action.payload.Artoworks],
          length: action.payload.counter,
          filter: true,
          loader:false
        };        
      }

    
    case "LikesOrder":

      if (state.page === 0) {
        return {
          ...state,
          posts: action.payload.Artworks,
          length: action.payload.counter,
          filter: true,
          loader:false
        };
      } else {
        return {
          ...state,
          posts: [...state.posts, ...action.payload.Artworks],
          length: action.payload.counter,
          filter: true,
          loader:false
        };
      };

    case "CountryFilter":
      if (state.page === 0) {
        return {
          ...state,
          posts: action.payload,
          length: action.payload.counter,
          filter: true,
          loader:false
        };
      } else {
        return{
          ...state,
          posts: [...state.posts, ...action.payload],
          length: action.payload.counter,
          filter: true,
          loader:false            
        }
      }
    
    case "CategoryFilter":
      if (state.page === 0) {
        return{
          ...state,
          posts: action.payload.Artworks,
          length: action.payload.counter,
          filter: true,
          loader:false
        }
      } else {
        return{
          ...state,
          posts: [...state.posts, ...action.payload.Artworks],
          length: action.payload.counter,
          filter: true,
          loader:false 
        }
      }
    
    case "Countries":
      let allCountries = [];
      let country = action.payload.map((e) => {
        if (!allCountries.includes(e.country)) {
          allCountries.push(e.country);
        };
      });
      return {
        ...state,
        countries: allCountries,
      };
    
    case "REGISTER":
      return {...state};
    
    case "LOGIN":
      return {...state, profile: action.payload};
    
    case "PROFILE":
      return {...state, profile: action.payload};
    
    case "GET_USERS":
      return {...state, users: action.payload};
    
    default:
      return {...state};
  };
};


export default rootReducer;