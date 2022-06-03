import axios from "axios";
import { Detail } from "../../components/detail/detail";
import {ref, uploadBytes ,getDownloadURL} from 'firebase/storage'
import storage from  "../../firebase/firebase.js"
const Compress = require('compress.js').default;
const compress = new Compress()



const URL = 'https://pruebafirebase.herokuapp.com'



//npm install compress.js --save


export const GetAllPosts = (page=0, name = '') =>{
  if(name !== '')  name = '&' + name.slice(1)

    return async function (dispatch) {
      const allposts = await axios.get(`${URL}/art?from=${page}${name}`);
      dispatch({
      type: "GetPosts", 
      payload: allposts.data,
    })
    }
}

export const GetProfileByID = (id) => {
   return async function (dispatch){
     const profile = await axios.get(`${URL}/profile/${id}`)
     dispatch({
       type: 'GetProfile',
       payload: profile
     })
   }
}

export const setPage = () => {
  return {
    type: 'setPage'
  }
}

export const resetPage = () => {
  return {
    type: 'resetPage'
  }
}


export const GetAllCategories = () =>{
  return async function (dispatch) {
    dispatch({type: "GetCategories", payload: allcategories.data})
    const allcategories = await axios.get(`${URL}/categories`);
  }
}

export const GetDetail = (id) =>{
  console.log('holaaa')
  return async function (dispatch) {
    const detailPost = await axios.get(`${URL}/art/${id}`);
    dispatch({type: "GetDetail", payload: detailPost.data[0]})
  }
}

export const Post = (input) =>{
 console.log(input.img)
  return async function () {
    const post = await compress.compress(input.input, {
    size: 4, // the max size in MB, defaults to 2MB
    quality: .25, // the quality of the image, max is 1,
    maxWidth: 1280, // the max width of the output image, defaults to 1920px
    maxHeight: 1280, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
    rotate: false, // See the rotation section below
    })
    const output = post[0]
    // const res = output.prefix + output.data
    // const img1 = results[0]
    const base64str = output.data
    const imgExt = output.ext
    const fileCompress = Compress.convertBase64ToFile(base64str, imgExt)
    

    const imageRefCompress = ref(storage, `images/compress/${input.input[0].name}`);
    const uploadImageCompress = await uploadBytes(imageRefCompress,fileCompress)
    const urlCompress = await getDownloadURL(uploadImageCompress.ref)

    const imageRefOriginal = ref(storage, `images/original/${input.input[0].name}`);
    const uploadImageOriginal = await uploadBytes(imageRefOriginal,input.img)
    const urlOriginal = await getDownloadURL(uploadImageOriginal.ref)



    const data = {
      "id": 'a276f5ff-9182-4ca5-8ae2-eae5354683b6',
      "title": input.title,
      "content": input.content,
      "category": 'arte',
      "original": urlOriginal,
      "compress": urlCompress,
      "price": input.price,
    }
    console.log(MakePost)
    const MakePost = await axios.post(`${URL}/art`, data);

  }
}