// Dependencies
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import swal from "sweetalert";
// Files
import {profile, EditProfile, getUsers} from "../../redux/actions/index";
import s from "./FormEditProfile.module.css";
import {ImageProfile} from "../imageprofile/imageprofile"
import EditProfileSkeleton from '../loaderSkeleton/EditProfile/EditProfileSkeleton'

const FormEditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile);
    const users = useSelector(state => state.users);

    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const id = userDataJson ? userDataJson.id : "";
    const {profileId} = useParams();
      
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
      id:"",
      name:"",
      lastName:"",
      userName:"",
      email:"",
      password:"",
      day_of_birth:"",
      gender:"",
      img:"",
      img64:"",
      phone:"",
      description:"",
      country:"",
      facebook:"",
      instagram:"",
      linkedIn:"",
    });
    const [photo, setPhoto] = useState();


    useEffect(() =>{
      dispatch(profile(loggedUser, profileId));    
      dispatch(getUsers())
    }, []);


    useEffect(()=>{
        if(user.found){
            setInput({
              id:profileId,      
              name:user.found.name ? user.found.name:"",
              lastName:user.found.lastName ? user.found.lastName:"",
              userName:user.found.userName ? user.found.userName:"",
              email:user.found.email ? user.found.email:"",
              password:user.found.password,
              day_of_birth:user.found.day_of_birth ? user.found.day_of_birth:"",
              gender:user.found.gender ? user.found.gender:"",
              img:user.found.img,
              phone:user.found.phone ? user.found.phone:"",
              description:user.found.description ? user.found.description:"",
              country:user.found.country ? user.found.country:"",
              facebook:user.found.facebook ? user.found.facebook:"",
              instagram:user.found.instagram ? user.found.instagram:"",
              linkedIn:user.found.linkedIn ? user.found.linkedIn:"",
            })
            setPhoto(user.found.img)
        }
    },[user])

    function regexValidation(input, type) 
    {
      let regularExp;
      if (type==='facebook') {
        regularExp = new RegExp(/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i);
        return regularExp.test(input);
      }
      else if (type==='instagram') {
        regularExp = new RegExp(/(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)(\/)?(\?hl=es-la)?/i);
        return regularExp.test(input);
      }
      else if (type==='linkedIn') {
        regularExp = new RegExp(/((?:(?:http|https):\/\/)?linkedin.com\/((in\/[^/]+\/?)|(pub\/[^/]+\/((\w|\d)+\/?){3}))$)/i);
        return regularExp.test(input);
      }
      else if (type==='email') {
        regularExp = new RegExp(/([A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4})/i);
        return regularExp.test(input);
      } 
      else if (type==='phone') {
        regularExp = new RegExp(/^[0-9]*$/i);
        return regularExp.test(input);
      } 
    }


    function validate(input)
    {
      const errors = {};
      const foundUsername = users.filter(e => e.userName === input.userName && e.userName !== user.found.userName);
      const foundEmail = users.filter(e => e.email === input.email && e.email !== user.found.email);
     

      if(!input.name)
      {
          errors.name = <font color="red">*</font>;
      }
      else if(!input.lastName)
      {
          errors.lastName = <font color="red">*</font>;
      }
      else if(!input.userName)
      {
          errors.userName = <font color="red">*</font>;
      }

      else if (foundUsername.length)
      {
          errors.userName = <p className={s.error}>Este nombre de usuario no está disponible. Por favor, intente con otro.</p>
      }

      else if(!input.email)
      {
          errors.email = <font color="red">*</font>;
      }

      else if (input.email && !regexValidation(input.email, 'email')) 
      {
          errors.email = <p className={s.error}>Ingrese un correo electrónico válido</p>
      }

      else if(foundEmail.length)
      {
          errors.email = <p className={s.error}>Este correo electrónico ya está en uso. Por favor, intente con otro.</p>;
      }

      else if (input.day_of_birth.length < 10 && input.day_of_birth.length !== 0) 
      {
          errors.day_of_birth = <p className={s.error}>Ingrese una fecha válida</p>
      }

      else if (input.phone && !regexValidation(input.phone, 'phone')) 
      {
          errors.phone = <p className={s.error}>Ingrese un télefono valido</p>
      }

      else if (input.facebook && !regexValidation(input.facebook, 'facebook')) 
      {
          errors.facebook = <p className={s.error}>Link inválido</p>
      }
      
      else if (input.instagram && !regexValidation(input.instagram, 'instagram')) 
      {
          errors.instagram = <p className={s.error}>Link inválido</p>
      }
     
      else if (input.linkedIn && !regexValidation(input.linkedIn, 'linkedIn')) 
      {
          errors.linkedIn = <p className={s.error}>Link inválido</p>
      }
      
      return errors;
    }


    function dateFormat(e)
    {
      let v = e.target.value
      if (v.match(/^\d{2}$/) !== null) {
        e.target.value = v + '/'
      }else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        e.target.value = v + '/'
      }
    };



    function handleChange(e)
    {
      setInput({...input, [e.target.name] : e.target.value});
      setErrors(validate({...input,[e.target.name] : e.target.value}));
    };


    function handleChangeFile(e)
    {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = function(event)
        {
          setPhoto(reader.result)
          setInput({...input, img: file,img64:reader.result});          
        };
        // console.log(file)

    };



    async function handleSubmit(e)
    {
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Por favor, complete todos los campos correctamente.");
        }
        else
        {  
          e.preventDefault();
          dispatch(EditProfile(input))
          setInput({
            ...input
          });
          swal("Cambios guardados");
        }
    };



	return (
    user.found ? 

		<div className={s.container_edit_profile}>
			<h5>EDITAR PERFIL</h5>
			<form className={s.edit_profile_form} onSubmit={e => handleSubmit(e)}>
        <div className={s.edit_profile_photo}>
          <ImageProfile image={photo}/>
          <input onChange={e => handleChangeFile(e)} type="file" accept=".jpg, .jpeg, .png" name="img" />
        </div>   

        <div className={s.edit_profile_inputs}>
          
          <div className={s.edit_profile_left}>
            <input type="text" placeholder="Nombre" maxLength="60" name="name" value={input.name} onChange={handleChange} />
            {
                errors.name && errors.name
            }    

            <input type="text" placeholder="Apellido" maxLength="60" name="lastName" value={input.lastName} onChange={handleChange} />
            {
                errors.lastName && errors.lastName
            } 

            <input type="text" placeholder="Nombre de usuario" maxLength="15" name="userName" value={input.userName} onChange={handleChange} />
            {
                errors.userName && errors.userName
            } 

            <input type="email" placeholder="Correo electrónico" name="email" value={input.email} onChange={handleChange} />
            {
                errors.email && errors.email
            } 

            <Link to={`/forgot`}>
              <button className={s.btn_password}>CAMBIAR CONTRASEÑA</button>
            </Link>

            <input type="text" placeholder="Fecha de nacimiento" maxLength="10" onKeyUp={dateFormat} name="day_of_birth" value={input.day_of_birth} onChange={handleChange} />
            {
                errors.day_of_birth && errors.day_of_birth
            } 

            <select className={s.select} onChange={handleChange} name="gender">
              {input.gender === ""?<option value="Género" key="Género" selected disabled>Género</option>: <option disabled>Género</option>}           
              {input.gender === "Hombre"?<option value="Hombre" key="Hombre" selected>Hombre</option>:<option value="Hombre" key="Hombre">Hombre</option>}
              {input.gender === "Mujer"?<option value="Mujer" key="Mujer" selected>Mujer</option>:<option value="Mujer" key="Mujer">Mujer</option>}
              {input.gender === "Prefiero no decirlo"?<option value="Prefiero no decirlo" key="Prefiero no decirlo" selected>Prefiero no decirlo</option>:<option value="Prefiero no decirlo" key="Prefiero no decirlo">Prefiero no decirlo</option>}
            </select>

            <input type="text" placeholder="Télefono" name="phone" value= {input.phone} onChange={handleChange} />
            {
                errors.phone && errors.phone
            } 

            <input type="text" placeholder="País" maxLength="20" name="country" value= {input.country} onChange={handleChange} />
            {
              errors.country && errors.country
            }     

          </div>   

          <div className={s.edit_profile_rigth}>
        
            <textarea type="text" placeholder="Descripción" maxLength="250" name="description" value= {input.description} onChange={handleChange} />
            {
              errors.description && errors.description
            }
            
            <input type="text" placeholder="Facebook" name="facebook" value= {input.facebook} onChange={handleChange} />
            {
                errors.facebook && errors.facebook
            }

            <input type="text" placeholder="Instagram" name="instagram" value= {input.instagram} onChange={handleChange} />
            {
                errors.instagram && errors.instagram
            }            

            <input type="text" placeholder="LinkedIn" name="linkedIn" value= {input.linkedIn} onChange={handleChange} />
            {
                errors.linkedIn && errors.linkedIn
            }

          </div>

        </div>

                <button className={s.btnSubmit} type="submit">Guardar cambios</button>

			</form>
		</div>
            :
            <EditProfileSkeleton/>
	

  )


}

export default FormEditProfile;