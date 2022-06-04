import axios from "axios";
import { Detail } from "../../components/detail/detail";
import {ref, uploadBytes ,getDownloadURL} from 'firebase/storage'
import storage from  "../../firebase/firebase.js"
import { async } from "@firebase/util";
const Compress = require('compress.js').default;
const compress = new Compress()



const URL = 'https://artpage.herokuapp.com'



export const GetAllPosts = (page=0, name = '') =>{
  if(name !== '')  name = '&' + name.slice(1)

    return async function (dispatch) {
      const allposts = await axios.get(`${URL}/art?from=${page}${name}`);
      dispatch({
      type: "GetPosts", 
      artWorks: allposts.data.artWorks,
      length: allposts.data.counter,
    })
    }
}

export const GetProfileDetail = (id) => {
  return async function (dispatch) {
    const profileDetail = await axios.get(`${URL}/profile/${id}`)
    dispatch({
      type: 'GetProfileDetail',
      payload: profileDetail.data

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
    const allcategories = await axios.get(`${URL}/categories`);
    dispatch({type: "GetCategories", payload: allcategories.data})
  }
}

export const GetDetail = (id) =>{

  return async function (dispatch) {
    const detailPost = await axios.get(`${URL}/art/${id}`);
    dispatch({type: "GetDetail", payload: detailPost.data[0]})
  }
}

export const Post = (input) =>{
  return async function (dispatch) {
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
      "category": input.category,
      "original": urlOriginal,
      "compress": urlCompress,
      "price": input.price,
    }
   
    const MakePost = await axios.post(`${URL}/art`, data);

    dispatch({
      type:'Post',
      payload:MakePost.status
    })
    

  }
}


export const CleanStatus = () =>{
  return{
    type:'CleanStatus'
  }
}

export const CleanDetail = () =>{
  return{
    type:'CleanDetail'
  }
}