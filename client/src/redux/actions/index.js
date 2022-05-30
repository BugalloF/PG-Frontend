import axios from "axios";
import { Detail } from "../../components/detail/detail";
const Compress = require('compress.js').default;
const compress = new Compress()
//npm install compress.js --save


export const GetAllPosts = (page=0, name = '') =>{
  if(name !== '')  name = '&' + name.slice(1)

    return async function (dispatch) {
      const allposts = await axios.get(`https://artpage-api.herokuapp.com/art?from=${page}${name}`);
      dispatch({
      type: "GetPosts", 
      payload: allposts.data,
    })
    }
}

export const GetProfileByID = (id) => {
   return async function (dispatch){
     const profile = await axios.get(`https://artpage-api.herokuapp.com/profile/${id}`)
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
    const allcategories = await axios.get("https://artpage-api.herokuapp.com/categories");
    dispatch({type: "GetCategories", payload: allcategories.data})
  }
}

export const GetDetail = (id) =>{
  return async function (dispatch) {
    const detailPost = await axios.get(`https://artpage-api.herokuapp.com/art/${id}`);
    dispatch({type: "GetDetail", payload: detailPost.data[0]})
  }
}

export const Post = (input) =>{
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
    const res = output.prefix + output.data

    const data = {
      "id": input.id,
      "title": input.title,
      "content": input.content,
      "category": input.category,
      "img": input.img,
      "imgCompress": res,
      "price": input.price,
    }
    const MakePost = await axios.post("https://artpage-api.herokuapp.com/art", data);
  }
}