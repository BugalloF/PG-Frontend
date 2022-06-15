// Dependencies
// import { async } from "@firebase/util";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Files
import storage from "../../firebase/firebase.js";
const Compress = require("compress.js").default;

const watermark = require("watermarkjs")
const {REACT_APP_URL, REACT_APP_API_KEY} = process.env;

const URL = REACT_APP_URL;

const compress = new Compress();

//GETS----------------------------------------------------------------------------------------

export const GetAllPosts = (page = 0, name = "", by = "", type = "") => {

  if (name !== "") name = "&" + name.slice(1);

  if (by !== "" && type !== ""){
    by = "&by=" + by ;
    type = "&type=" + type;
  }
  // console.log(      `${URL}/art?from=${page}${name}${by}${type}&apiKey=${REACT_APP_API_KEY}`)
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


export const GetRecoPosts = (page = 0,category ,) => {
  
 
 const  by = "&by=createdAt"
 const type = "&type=DESC"

  category = "&category=" + category
  // console.log(`${URL}/filter/category?from=${page}${category}${by}${type}&apiKey=${REACT_APP_API_KEY}`)
  return async function (dispatch) {
  const allposts = await axios.get(
    `${URL}/filter/category?from=${page}${category}${by}${type}&apiKey=${REACT_APP_API_KEY}`
  );
  
    dispatch({
      type: "GetRecoPosts",
      artWorks: allposts.data.Artworks
    });
  
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

//GETS----------------------------------------------------------------------------------------

//PAGINADO------------------------------------------------------------------------------------
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

export const PageNumber = () => {
  return {
    type: "PageNumber",
  };
};


//PAGINADO------------------------------------------------------------------------------------

//POST ARTWORK-------------------------------------------------------------------------------
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
    // console.log(output)
    const base64str = output.data;
    // console.log('DEMIIII',base64str)
    const imgExt = output.ext;
    // console.log('DEMIIII',imgExt)

    const fileCompress = Compress.convertBase64ToFile(base64str, imgExt);
    // console.log('DEMIIII',fileCompress)

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
//POST ARTWORK-------------------------------------------------------------------------------

//CLEANING STATES------------------------------------------------------------------------------
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

export const CleanReco = () => {
  return {
    type: "CleanReco"
  }
};

//CLEANING STATES------------------------------------------------------------------------------


//FILTERS--------------------------------------------------------------------------------------

export const GetCategotyPosts = (page = 0,category , by = "", type = "",) => {
  
var name = "";
if (name !== "") name = "&" + name.slice(1);
if (by !== "" && type !== ""){
by = "&by=" + by ;
type = "&type=" + type;
}
if(category) category = "&category=" + category

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
//FILTERS--------------------------------------------------------------------------------------


// LOGIN / REGISTER / RESET PASSWORD //

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

export function forgotPassword(user)
{
  return async function(dispatch)
  {
    const data = (await axios.post(`${URL}/forgot`, user)).data;
    return dispatch({type: "FORGOT_PASSWORD", payload: data});
  };
};

export function resetPassword(id, resetToken, input)
{
  return async function(dispatch)
  {
    if(resetToken !== null)
    {
      const resetTokenJson = JSON.parse(resetToken);
      const token = resetTokenJson.token;
      const config =
      {
        headers:
        {
          authorization: `Bearer ${token}`,
        },
      };
      const data = (await axios.put(`${URL}/reset/${id}`, input, config)).data;
      return dispatch({type: "RESET_PASSWORD", payload: data});
    };
  };
};

export function changePassword(id, {oldPassword, password})
{
  return async function(dispatch)
  {
    const data = (await axios.put(`${URL}/changepassword/${id}`, {oldPassword, password})).data;
    return dispatch({type: "CHANGE_PASSWORD", payload: data});
  };
};

export function EditProfile(input)
{
  return async function (dispatch)
  { 
    // console.log('aaaaaaaaaaaaaaa',input)
    if(input.img64){
    // const output = input.img;
    const base64str = input.img64;
    // console.log(base64str)
    const b64= base64str.slice(23)
    // console.log(b64)
    const imgExt = input.img.type;
    // console.log(imgExt)
    const fileCompress = Compress.convertBase64ToFile(b64, imgExt);
    // console.log(fileCompress)

    const imageRefCompress = ref(
      storage,
      `images/profileImg/${input.img.name}`
    );
    const uploadImageCompress = await uploadBytes(
      imageRefCompress,
      fileCompress
    );
    var profileUrlCompress = await getDownloadURL(uploadImageCompress.ref);

    }
    
    
    const data = {
      name: input.name,
      lastName: input.lastName,
      userName: input.userName,
      email: input.email,
      password: input.password,
      day_of_birth: input.day_of_birth,
      gender: input.gender,
      img: profileUrlCompress || 'https://i.pinimg.com/564x/20/0d/72/200d72a18492cf3d7adac8a914ef3520.jpg',
      phone: input.phone,
      description: input.description,
      country: input.country,
      facebook: input.facebook,
      instagram: input.instagram,
      linkedIn: input.linkedIn,
    };
  
    const editProfile = (await axios.put(`${URL}/profile/${input.id}?apiKey=${REACT_APP_API_KEY}`, data)).data;
    
    return dispatch({type: "EDIT_PROFILE", payload: editProfile});
  };
};


// ----------------------------------------------------------------------------------------------

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
      // console.log('soy dataaa',data)
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

//LIKES AND FOLLOWERS---------------------------------------------------------------------------

//VARIOS--------------------------------------------------------------------------------------

export const NotFound = () => {
  return {
    type: "NotFound",
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
        }
      };
      await axios.post(`https://artpage.herokuapp.com/emails/send-email`, values, config);
    };
  };
};
//VARIOS--------------------------------------------------------------------------------------

//EDIT AND DELETEN ARTWORK---------------------------------------------------------------------------
export function EditArtwork(input)
{
  return async function (dispatch)
  {
    const data = {
      title: input.title,
      content: input.content,
      category: input.category,
      price: input.price,
    };
  
    const editPost = await axios.put(`${URL}/art/${input.id}?apiKey=${REACT_APP_API_KEY}`,data)
  
    dispatch({
      type: "EDIT_ARTWORK",
      payload: editPost.status,
    });
  };
};

export function DeleteArtwork(idPost)
{
  return async function (dispatch)
  {
    const deleted = await axios.delete(`${URL}/art/${idPost}?apiKey=${REACT_APP_API_KEY}`)
  
    dispatch({
      type: "DELETE_ARTWORK",
      payload: deleted.status,
    });
  };
};

//EDIT AND DELETEN ARTWORK---------------------------------------------------------------------------
    
export function getFollowedPost(page = 0,userData){
  return async function (dispatch) {

    const userDataJson = JSON.parse(userData);

    const token = userDataJson.token;
    
    const config =
      {
        headers:
        {
          authorization: `Bearer ${token}`,
        },
      };
    const followedPost = (await axios.get(`${URL}/followedfeed?from=${page}&apiKey=${REACT_APP_API_KEY}`,config));
    
      dispatch({
        type: "GET_FOLLOWED_POST",
        artWorks: followedPost.data.arr,
        length: followedPost.data.counter,
      });
    
  };
}

export function cleanFollowedPosts(){
  return {
    type: "CLEAN_FOLLOWED_POSTS",
  };
}

// ----------------------------  ADMIN ----------------------------

// --------------- DELETE USER -------------- //

export const DeleteUser = (userId) => {
  return async function(dispatch){
    const user = await axios.delete(`${URL}/profile/delete/${userId}?apiKey=${REACT_APP_API_KEY}`)
    
    dispatch({
      type: "DeleteUser",
      payload: user.status
    })
  }

}

// ------------- ADD CATEGORY ------------- //

export const AddCategory = (value) => {
  return async function(dispatch){
    const category = await axios.post(`${URL}/categories`, {category:value})

    dispatch({
      type: 'AdmCategory',
      payload: category.status
    })
  }
}

export const DeleteCategory = (categoryId) => {
  return async function(dispatch){
    const category = await axios.delete(`${URL}/categories/${categoryId}`)

    dispatch({
      type: 'AdmCategory',
      payload: category.status
    })
  }
}

export const UpdateCategory = (categoryId,value) => {
  return async function(dispatch){
    const category = await axios.put(`${URL}/categories/${categoryId}`, {title:value})

    dispatch({
      type: 'AdmCategory',
      payload: category.status
    })
  }
}
// ------- sumar dias ban -------------
var fecha= new Date()
function sumarDias(fecha){
  let  bantime= fecha.setDate(fecha.getDate() + 4 );
  return bantime;
}

// -------------- BAN / NO BAN USER

export const banUser = (userId,userData) =>{
  
  return async function (dispatch){
    
    const userDataJson = JSON.parse(userData);
    
    const token = userDataJson.token;
    
    const config =
      {
        headers:
        {
          authorization: `Bearer ${token}`,
        },
      };
      const user =  (await axios(`${URL}/profile/${userId}?apiKey=${REACT_APP_API_KEY}`,config)).data.found
      
      // console.log('userrrrrrDATA',userData)
    // console.log('userrrrrr',user)
    if(user.is_banned === false){
      const ban = {
        is_banned: true,
        banned_time: sumarDias(fecha)

      };
     await axios.put(`${URL}/profile/${userId}?apiKey=${REACT_APP_API_KEY}`,ban)
      // console.log(sumarDias(fecha))
     const data = (await axios(`${URL}/profile?apiKey=${REACT_APP_API_KEY}`,config)).data;
     return dispatch({ type: "BAN_USER", payload: data });
    
    }else{
      const unBan = {
        is_banned: false,
        banned_time: null
      };
     await axios.put(`${URL}/profile/${userId}?apiKey=${REACT_APP_API_KEY}`,unBan)
     const data = (await axios(`${URL}/profile?apiKey=${REACT_APP_API_KEY}`,config)).data;
     return dispatch({ type: "UNBAN_USER", payload: data });
    }

  }
}

export const getBannedUsers = (userData) =>{
  
  return async function (dispatch){
    
    const userDataJson = JSON.parse(userData);
    
    const token = userDataJson.token;
    
    const config =
      {
        headers:
        {
          authorization: `Bearer ${token}`,
        },
      };
      const users =  (await axios(`${URL}/profile?apiKey=${REACT_APP_API_KEY}`,config)).data

      const data = users.filter(el=> el.is_banned)

      // console.log('filtrados',data)
      
      return dispatch({type:"GET_BANNED_USERS",payload:data})
      
  }
}


export const GetAdmProfiles = (from = "",name = "") => {
  if(from !== "") from = `?from=${from}`
  if (name !== "") name = "&" + name.slice(1); 
  return async function(dispatch){

    const profiles = await axios.get(`${URL}/profile/profiles${from}${name}`)

    dispatch({
      type:'GetAdmProfiles',
      profiles: profiles.data.profiles,
      counter: profiles.data.counter
    })
  }
}

export const GetTransactions = (from = 0, name = "") => {
  if(from !== "") from = `?from=${from}`
  if (name !== "") name = "&" + name.slice(1); 

  return async function(dispatch){

    const trans = await axios.get(`${URL}/transactions${from}${name}`)

    dispatch({
      type:'GetTransactions',
      transactions: trans.data.result,
      counter: trans.data.counter
    })
  }

}

export const PutTransactions = (id) => {


  return async function(dispatch){

    const trans = await axios.put(`${URL}/transactions/${id}`)

    dispatch({
      type:'AdmTransaction',
      payload: trans.status
    })
  }

}

export const CleanUsers = () => {
 return{
  type: "CleanUsers",
 }
}

export const CleanTransactions = () => {
  return{
   type: "CleanTransactions",
  }
 }

 export const TransactionsPost = (values)=>{
  return async function(dispatch){
 
    await axios.post(`${URL}/transactions`,values)

  dispatch({
    type:'POST_TRANSACTIONS'
  })
  }
}