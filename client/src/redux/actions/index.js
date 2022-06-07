// Dependencies
import axios from "axios";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
// Files
import storage from "../../firebase/firebase.js";
const Compress = require("compress.js").default;
const {REACT_APP_URL, REACT_APP_API_KEY} = process.env;
const URL = REACT_APP_URL;

const compress = new Compress();


export const GetAllPosts = (page = 0, name = "") => {
  if (name !== "") name = "&" + name.slice(1);
  
  return async function (dispatch) {
    const allposts = await axios.get(`${URL}/art?from=${page}${name}&apiKey=${REACT_APP_API_KEY}`);
    
    if (!name.length) {
      dispatch({
        type: "GetPosts",
        artWorks: allposts.data.artWorks,
        length: allposts.data.counter,
      });
    } else {
      dispatch({
        type: "GetPostsWithSearch",
        artWorks: allposts.data.artWorks,
        length: allposts.data.counter,
      });
    }
  };
};

export const setPage = () => {
  return {
    type: "setPage",
  };
};

export const resetPage = () => {
  return {
    type: "resetPage",
  };
};

export const GetAllCategories = () => {
  return async function (dispatch) {
    const allcategories = await axios.get(`${URL}/categories?apiKey=${REACT_APP_API_KEY}`);
    
    dispatch({ type: "GetCategories", payload: allcategories.data });
  };
};

export const GetDetail = (userData=null, id) => {
  return async function (dispatch)
  {
    if(userData === null)
    {
      const data = (await axios(`${URL}/art/${id}?apiKey=${REACT_APP_API_KEY}`)).data;
      return dispatch({type: "GetDetail", payload: data});
    }
    else 
    {
      if (userData !== null)
      {
        const userDataJson = JSON.parse(userData);
        const token = userDataJson.token;
        const config =
        {
          headers:
          {
            authorization: `Bearer ${token}`,
          },
        };
        const data = (await axios(`${URL}/art/${id}?apiKey=${REACT_APP_API_KEY}`, config)).data;
        return dispatch({type: "GetDetail", payload: data});
      };
    };
  };
};

export const Post = (input) => {
  return async function (dispatch) {
    const post = await compress.compress(input.input, {
      size: 4, // the max size in MB, defaults to 2MB
      quality: 0.25, // the quality of the image, max is 1,
      maxWidth: 1280, // the max width of the output image, defaults to 1920px
      maxHeight: 1280, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
      rotate: false, // See the rotation section below
    });
    const postFull = await compress.compress(input.img, {
      size: 20, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 1280, // the max width of the output image, defaults to 1920px
      maxHeight: 1280, // the max height of the output image, defaults to 1920px
      resize: false, // defaults to true, set false if you do not want to resize the image width and height
      rotate: false, // See the rotation section below
    });
    
    const output = post[0];
    const base64str = output.data;
    const imgExt = output.ext;
    const fileCompress = Compress.convertBase64ToFile(base64str, imgExt);
    
    const outputF = postFull[0];
    const base64strF = outputF.data;
    const imgExtF = outputF.ext;
    const fileFull = Compress.convertBase64ToFile(base64strF, imgExtF);
    
    const imageRefCompress = ref(
      storage,
      `images/compress/${input.input[0].name}`
    );
    const uploadImageCompress = await uploadBytes(
      imageRefCompress,
      fileCompress
    );
    const urlCompress = await getDownloadURL(uploadImageCompress.ref);
    
    const imageRefOriginal = ref(
      storage,
      `images/original/${input.input[0].name}`
    );
    const uploadImageOriginal = await uploadBytes(imageRefOriginal, fileFull);
    const urlOriginal = await getDownloadURL(uploadImageOriginal.ref);
    
    const data = {
      id: input.id,
      title: input.title,
      content: input.content,
      category: input.category,
      original: urlOriginal,
      compress: urlCompress,
      price: input.price,
    };
    
    const MakePost = await axios.post(`${URL}/art`, data);
    
    dispatch({
      type: "Post",
      payload: MakePost.status,
    });
  };
};

export const CleanStatus = () => {
  return {
    type: "CleanStatus",
  };
};

export const CleanDetail = () => {
  return {
    type: "CleanDetail",
  };
};

export const priceOrder = (order, page = 0) => {
  return async function (dispatch) {
    let filterPrices = await axios.get(
      `${URL}/filter/price?price=${order}&from=${page}`
    );
    
    dispatch({
      type: "PriceOrder",
      payload: filterPrices.data,
    });
  };
};

export const antOrder = (order, page = 0) => {
  return async function (dispatch) {
    let filterAnt = await axios.get(
      `${URL}/filter/antiquity?antiquity=${order}&from=${page}`
    );
    
    dispatch({
      type: "AntOrder",
      payload: filterAnt.data,
    });
  };
};

export const likesOrder = (order, page = 0) => {
  return async function (dispatch) {
    let filterLikes = await axios.get(
      `${URL}/filter/likes?likes=${order}&from=${page}`
    );
    
    dispatch({
      type: "LikesOrder",
      payload: filterLikes.data,
    });
  };
};

export const CleanProfile = () => {
  return {
    type: "CleanProfile",
  };
};

export const CleanPosts = () => {
  return {
    type: "CleanPosts",
  };
};

export const categoryFilter = (order, page = 0) => {
  return async function (dispatch) {
    let filterCategory = await axios.get(
      `${URL}/filter/category?category=${order}&from=${page}`
    );
    
    dispatch({
      type: "CategoryFilter",
      payload: filterCategory.data,
    });
  };
};

export const Filter = () => {
  return {
    type: "Filter",
  };
};

export const FilterNo = () => {
  return {
    type: "FilterNo",
  };
};

export const NotFound = () => {
  return {
    type: "NotFound",
  };
};

export const sendEmail = (values) => {
  return async function () {
    await axios.post("https://artpage.herokuapp.com/emails/send-email", values);
  };
};

// LOGIN ----------------------------------------------------------------------
export function register(values)
{
  return async function (dispatch)
  {
    const data = (await axios.post(`${URL}/register`, values)).data;
    return dispatch({type: "REGISTER", payload: data});
  };
};

export function login(values)
{
  return async function (dispatch)
  {
    const data = (await axios.post(`${URL}/login`, values)).data;
    return dispatch({type: "LOGIN", payload: data});
  };
};

export function profile(userData, id)
{
  return async function (dispatch)
  {
    if (userData !== null)
    {
      const userDataJson = JSON.parse(userData);
      const token = userDataJson.token;
      const config =
      {
        headers:
        {
          authorization: `Bearer ${token}`,
        },
      };
      const data = (await axios(`${URL}/profile/${id}?apiKey=${REACT_APP_API_KEY}`, config)).data;
      return dispatch({type: "PROFILE", payload: data});
    };
  };
};

export function getUsers()
{
  return async function (dispatch)
  {
    const data = (await axios(`${URL}/profile?apiKey=${REACT_APP_API_KEY}`)).data;
    return dispatch({type: "GET_USERS", payload: data});
  };
};

// LOGIN ----------------------------------------------------------------------
