import axios from "axios";
const Compress = require('compress.js').default;
const compress = new Compress()
//npm install compress.js --save


export const GetAllPosts = () =>{
    return async function (dispatch) {
      const allposts = await axios.get("https://artpage-api.herokuapp.com/art?from=0");
      dispatch({type: "GetPosts", payload: allposts.data.obras})
    }
}

export const Post = (input) =>{
  return async function () {
    const postFull = await compress.compress(input, {
      size: 20, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: 1920, // the max width of the output image, defaults to 1920px
    maxHeight: 1920, // the max height of the output image, defaults to 1920px
    resize: false, // defaults to true, set false if you do not want to resize the image width and height
    rotate: false, // See the rotation section below
    })

    const post = await compress.compress(input, {
      size: 4, // the max size in MB, defaults to 2MB
    quality: .25, // the quality of the image, max is 1,
    maxWidth: 1280, // the max width of the output image, defaults to 1920px
    maxHeight: 1280, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
    rotate: false, // See the rotation section below
    })
    const outputFull = postFull[0];
    const output = post[0]
    const resFull = outputFull.prefix + outputFull.data
    const res = output.prefix + output.data
 
    console.log('imagen no comprimida',resFull)
    const data = {
      "title":"nuevo test",
      "content":"alo feef 2",
      "category":"Img",
      "img":resFull,
      "imgCompress":res,
      "price": 199 
    }
    const MakePost = await axios.post("https://artpage-api.herokuapp.com/art", data);
  }
}