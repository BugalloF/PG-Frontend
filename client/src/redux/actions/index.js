// Dependencies
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Files
import storage from "../../firebase/firebase.js";
const Compress = require("compress.js").default;

const watermark = require("watermarkjs")
const {REACT_APP_URL, REACT_APP_API_KEY} = process.env;

const URL = REACT_APP_URL;

const compress = new Compress();

export const GetAllPosts = (page = 0, name = "", by = "", type = "") => {

  if (name !== "") name = "&" + name.slice(1);

  if (by !== "" && type !== ""){
    by = "&by=" + by ;
    type = "&type=" + type;
  }

  return async function (dispatch) {
    const allposts = await axios.get(
      `${URL}/art?from=${page}${name}${by}${type}&apiKey=${REACT_APP_API_KEY}`
    );

      dispatch({
        type: "GetPosts",
        artWorks: allposts.data.artWorks,
        length: allposts.data.counter,
      });
    
  };
};

export const GetCategotyPosts = (page = 0,category , by = "", type = "",) => {
      var name = "";
  if (name !== "") name = "&" + name.slice(1);

  if (by !== "" && type !== ""){
    by = "&by=" + by ;
    type = "&type=" + type;
  }

  if(category) category = "&category=" + category

  console.log(`${URL}/filter/category?from=${page}${category}${name}${by}${type}&apiKey=${REACT_APP_API_KEY}`)

  return async function (dispatch) {
    const allposts = await axios.get(
      `${URL}/filter/category?from=${page}${category}${name}${by}${type}&apiKey=${REACT_APP_API_KEY}`
    );



      dispatch({
        type: "GetCategoryPosts",
        artWorks: allposts.data.Artworks,
        length: allposts.data.counter,
      });
    
  };
};


export const SetCategoty = (value) =>{
  return{
    type: 'SetCategory',
    payload: value
  }
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
    const allcategories = await axios.get(
      `${URL}/categories?apiKey=${REACT_APP_API_KEY}`
    );

    dispatch({ type: "GetCategories", payload: allcategories.data });
  };
};

export const GetDetail = (userData = null, id) => {
  return async function (dispatch) {
    if (userData === null) {
      const data = (await axios(`${URL}/art/${id}?apiKey=${REACT_APP_API_KEY}`))
        .data;
      return dispatch({ type: "GetDetail", payload: data });
    } else {
      if (userData !== null) {
        const userDataJson = JSON.parse(userData);
        const token = userDataJson.token;
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const data = (
          await axios(`${URL}/art/${id}?apiKey=${REACT_APP_API_KEY}`, config)
        ).data;
        return dispatch({ type: "GetDetail", payload: data });
      }
    }
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

    const watermarked = await watermark([fileCompress])
    .blob(watermark.text.center('DigitalizArte', '48px serif', '#fff', 0.6));



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
      watermarked
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



export function sendEmail(userData, values)
{
  return async function ()
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
      await axios.post(`https://artpage.herokuapp.com/emails/send-email`, values, config);
    };
  };
};

// LOGIN ----------------------------------------------------------------------
export function register(values)
{
  return async function (dispatch)
  {
    const data = (await axios.post(`${URL}/register`, values)).data;
    return dispatch({ type: "REGISTER", payload: data });
  };
};

export function login(values)
{
  return async function (dispatch)
  {
    const data = (await axios.post(`${URL}/login`, values)).data;
    return dispatch({ type: "LOGIN", payload: data });
  };
};

export function profile(userData, id)
{
  return async function (dispatch)
  {
    if (userData !== null) {
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
      return dispatch({ type: "PROFILE", payload: data });
    };
  };
};

export function getUsers()
{
  return async function (dispatch)
  {
    const data = (await axios(`${URL}/profile?apiKey=${REACT_APP_API_KEY}`)).data;
    return dispatch({ type: "GET_USERS", payload: data });
  };
};

export function addLike(userData = null, idPost)
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
      
      await axios.post(`${URL}/art/likes/${idPost}?apiKey=${REACT_APP_API_KEY}`, config);
      
      const data = (await axios(`${URL}/art/${idPost}?apiKey=${REACT_APP_API_KEY}`, config)).data;
      
      return await dispatch({type: "ADD_LIKE", payload: data});
    };
  };
};

export function deleteLike(userData = null, idPost)
{
  return async function (dispatch)
  {
    if (userData !== null)
    {

      const userDataJson = JSON.parse(userData);

      const token = userDataJson.token;

      const idUser = JSON.parse(userData).id;

      const config =
      {
        data:
        {
          idUser,
        },
      };
      const config2 =
      {
        headers:
        {
          authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`${URL}/art/likes/${idPost}?idUser=${idUser}`, config);
      
      const data = (await axios(`${URL}/art/${idPost}?apiKey=${REACT_APP_API_KEY}`, config2)).data;
      console.log('soy dataaa',data)
      return await dispatch({type: "DELETE_LIKE", payload: data});
    };
  };
};

export function addFollower(userData,idSeguido2)
{
  return async function (dispatch)
  {
    const idSeguido = idSeguido2
    
    const idSeguidor = JSON.parse(userData).id

    const userDataJson = JSON.parse(userData);

    const token = userDataJson.token;
    
    const config =
      {
        headers:
        {
          authorization: `Bearer ${token}`,
        },
      };
    await axios.post(`${URL}/profile/follow/${idSeguido}?apiKey=${REACT_APP_API_KEY}`,
    {idSeguidor})
    
    let data =  (await axios.get(`${URL}/profile/${idSeguido}?apiKey=${REACT_APP_API_KEY}`,config)).data

    return await dispatch({type: "ADD_FOLLOWER", payload: data});
  }
}

export function deleteFollower(userData,idSeguido2)
{
  return async function (dispatch)
  {
    const idSeguido = idSeguido2
    
    const idSeguidor = JSON.parse(userData).id

    const userDataJson = JSON.parse(userData);

    const token = userDataJson.token;
    
    const config =
      {
        headers:
        {
          authorization: `Bearer ${token}`,
        },
      };
      
      const config2 =
      {
        data:
        {
          idSeguidor,
        },
      };
    await axios.delete(`${URL}/profile/${idSeguido}?apiKey=${REACT_APP_API_KEY}`,
    config2)
    
    let data =  (await axios.get(`${URL}/profile/${idSeguido}?apiKey=${REACT_APP_API_KEY}`,config)).data

    return await dispatch({type: "DELETE_FOLLOWER", payload: data});
  }
}