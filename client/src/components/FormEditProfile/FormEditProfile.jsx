// Dependencies
import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
import {ThreeDots} from  'react-loader-spinner';
// Files
import {profile, EditProfile, getUsers, login} from "../../redux/actions/index";
import {ImageProfile} from "../imageprofile/imageprofile";
import EditProfileSkeleton from "../loaderSkeleton/EditProfile/EditProfileSkeleton";
import s from "./FormEditProfile.module.css";


function FormEditProfile()
{
  const dispatch = useDispatch();
  const user = useSelector(state => state.profile);
  const users = useSelector(state => state.users);
  const loggedUser = window.localStorage.getItem("userData");
  const userDataJson = JSON.parse(loggedUser);
  const id = userDataJson ? userDataJson.id : "";
  const {profileId} = useParams();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    id: "",
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    day_of_birth: "",
    gender: "",
    img: "",
    phone: "",
    description: "",
    country: "",
    facebook: "",
    instagram: "",
    linkedIn: "",
  });
  const [loadChanges, setLoadChanges] = useState(false)
  const [photo, setPhoto] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(profile(loggedUser, profileId));
    dispatch(getUsers());
  }, []);
  
  useEffect(() => {
    if(user.found)
    {
      setInput({
        id: profileId,
        name: user.found.name ? user.found.name : "",
        lastName: user.found.lastName ? user.found.lastName : "",
        userName: user.found.userName ? user.found.userName : "",
        email: user.found.email ? user.found.email : "",
        password: user.found.password,
        day_of_birth: user.found.day_of_birth ? user.found.day_of_birth : "",
        gender: user.found.gender ? user.found.gender : "",
        img: user.found.img,
        phone: user.found.phone ? user.found.phone : "",
        description: user.found.description ? user.found.description : "",
        country: user.found.country ? user.found.country : "",
        facebook: user.found.facebook ? user.found.facebook : "",
        instagram: user.found.instagram ? user.found.instagram : "",
        linkedIn: user.found.linkedIn ? user.found.linkedIn : "",
      });
      setPhoto(user.found.img);
    }
  }, [user]);
  
  function validate(input)
  {
    const errors = {};
    const foundUsername = users.filter(e => e.userName === input.userName && e.userName !== user.found.userName);
    const foundEmail = users.filter(e => e.email === input.email && e.email !== user.found.email);
    const birthYear = input.day_of_birth.length ? input.day_of_birth.split("-").shift() : null;
    // RegExp
    const emailRegExp = /^[^]+@[^ ]+\.[a-z]{2,3}$/;
    const phoneRegExp = /^[0-9]*$/i;
    const facebookRegExp = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
    const instagramRegExp = /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)(\/)?(\?hl=es-la)?/i;
    const linkedInRegExp = /((?:(?:http|https):\/\/)?linkedin.com\/((in\/[^/]+\/?)|(pub\/[^/]+\/((\w|\d)+\/?){3}))$)/i;
    // RegExp
    const verifyEmail = emailRegExp.test(input.email);
    const verifyPhone = phoneRegExp.test(input.phone);
    const verifyFacebook = facebookRegExp.test(input.facebook);
    const verifyInstagram = instagramRegExp.test(input.instagram);
    const verifyLinkedIn = linkedInRegExp.test(input.linkedIn);
    
    if(!input.name)
    {
      errors.name = <font></font>;
    }
    else if(input.name.length > 30)
    {
      errors.name = <font></font>;
    }
    else if(!input.lastName)
    {
      errors.lastName = <font></font>;
    }
    else if(input.lastName.length > 30)
    {
      errors.lastName = <font></font>;
    }
    else if(!input.userName)
    {
      errors.userName = <font></font>;
    }
    else if(input.userName.length > 20)
    {
      errors.userName = <font></font>;
    }
    else if(!input.email)
    {
      errors.email = <font></font>;
    }
    else if(foundUsername.length)
    {
      errors.userName = <p className={s.AlertText}>Este nombre de usuario ya está en uso. Por favor, intente con otro.</p>;
    }
    else if(foundEmail.length)
    {
      errors.email = <p className={s.AlertText}>Este correo electrónico ya está en uso. Por favor, intente con otro.</p>;
    }
    else if(!verifyEmail)
    {
      errors.email = <p className={s.AlertText}>Introduzca un correo válido.</p>;
    }
    else if(!verifyPhone)
    {
      errors.phone = <p className={s.AlertText}>Introduzca un número de teléfono sin espacios ni símbolos.</p>;
    }
    else if(input.facebook && !verifyFacebook)
    {
      errors.facebook = <p className={s.AlertText}>Introduzca un link válido.</p>;
    }
    else if(input.instagram && !verifyInstagram)
    {
      errors.instagram = <p className={s.AlertText}>Introduzca un link válido.</p>;
    }
    else if(input.linkedIn && !verifyLinkedIn)
    {
      errors.linkedIn = <p className={s.AlertText}>Introduzca un link válido.</p>;
    }
    else if(birthYear !== null)
    {
      if(birthYear > 2012 || birthYear < 1905)
      {
        errors.day_of_birth= <p className={s.AlertText}>Ingrese una fecha de nacimiento válida.</p>;
      };
    }
    else if(input.description.length > 500)
    {
      errors.description = <font></font>;
    };
    
    return errors;
  };
  
  function handleChange(e)
  {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };
  
  function handleChangeFile(e)
  {
    const reader = new FileReader();
    const file = e.target.files[0];
    
    reader.readAsDataURL(file);
    reader.onloadend = function(event)
    {
      setPhoto(reader.result);
      setInput({...input, img: file,img64:reader.result});
    };
  };
  
  async function handleSubmit(e)
  {
    if(Object.keys(validate(input)).length > 0)
    {
      e.preventDefault();
      swal({
        text: "Por favor, complete todos los campos correctamente.",
        icon: "warning",
      });
    }
    else
    {
      e.preventDefault();
      setLoadChanges(true);
      
      const data = await dispatch(EditProfile(input)).catch(error => console.log(error));
      console.log(data);
      if(data !== undefined && data !== null)
      {
        const payload = data.payload;
        const userData =
        {
          id: payload.updatedProfile.id,
          userName: payload.updatedProfile.userName,
          email: payload.updatedProfile.email,
          token: payload.token,
          img: payload.updatedProfile.img,
          is_Admin: payload.updatedProfile.is_Admin,
          is_banned:payload.updatedProfile.is_banned,
        };
        
        window.localStorage.setItem("userData", JSON.stringify(userData));
      }
      setInput({...input});
      swal({
        text: "Cambios guardados.",
        icon: "success",
      });
      navigate(`/profile/${profileId}`);
    };
  };
  
  if(user.found)
  {
    return (
      <div className={s.container_edit_profile}>
        <h5>EDITAR PERFIL</h5>
        <form className={s.edit_profile_form} onSubmit={handleSubmit}>
          <div className={s.edit_profile_photo}>
            <ImageProfile image={photo} />
            <input onChange={handleChangeFile} type="file" accept=".jpg, .jpeg, .png" name="img" disabled={loadChanges}/>
          </div>
          
          <div className={s.edit_profile_inputs}>
            <div className={s.edit_profile_left}>
              <input onChange={handleChange} className={errors.name ? s.Alert : s.Inputs} type="text" placeholder="Nombre" maxLength="20" name="name" value={input.name} disabled={loadChanges}/>
              {
                errors.name && errors.name
              }
              
              <input onChange={handleChange} className={errors.lastName ? s.Alert : s.Inputs} type="text" placeholder="Apellido" maxLength="30" name="lastName" value={input.lastName} disabled={loadChanges}/>
              {
                errors.lastName && errors.lastName
              }
              
              <input onChange={handleChange} className={errors.userName ? s.Alert : s.Inputs} type="text" placeholder="Nombre de usuario" maxLength="20" name="userName" value={input.userName} disabled={loadChanges}/>
              {
                errors.userName && errors.userName
              }
              
              <input onChange={handleChange} className={errors.email ? s.Alert : s.Inputs} type="email" placeholder="Correo electrónico" name="email" value={input.email} disabled={loadChanges}/>
              {
                errors.email && errors.email
              }
              
              <Link to={`/profile/changePassword/${profileId}`}>
                <button type="button" className={s.btn_password} disabled={loadChanges}>CAMBIAR CONTRASEÑA</button>
              </Link>
              
              <input onChange={handleChange} className={errors.day_of_birth ? s.Alert : s.Inputs} type="date" placeholder="Fecha de nacimiento" maxLength="10" name="day_of_birth" value={input.day_of_birth} onFocus={e => e.currentTarget.type = "date"} onBlur={e => e.currentTarget.type = "text"} disabled={loadChanges}/>
              {
                errors.day_of_birth && errors.day_of_birth
              }
              
              <select className={errors.gender ? s.Alert : s.Inputs} onChange={handleChange} name="gender" disabled={loadChanges}>
                {
                  input.gender === "" ? <option value="Género" key="Género" selected disabled>Género</option>
                  :
                  <option disabled>Género</option>
                }
                {
                  input.gender === "Hombre" ? <option value="Hombre" key="Hombre" selected>Hombre</option>
                  :
                  <option value="Hombre" key="Hombre">Hombre</option>
                }
                {
                  input.gender === "Mujer" ? <option value="Mujer" key="Mujer" selected>Mujer</option>
                  :
                  <option value="Mujer" key="Mujer">Mujer</option>
                }
                {
                  input.gender === "Prefiero no decirlo" ? <option value="Prefiero no decirlo" key="Prefiero no decirlo" selected>Prefiero no decirlo</option>
                  :
                  <option value="Prefiero no decirlo" key="Prefiero no decirlo">Prefiero no decirlo</option>
                }
              </select>
              
              <input onChange={handleChange} className={errors.phone ? s.Alert : s.Inputs} type="text" placeholder="Teléfono. Ej.(AR): 541122223333" name="phone" value={input.phone} disabled={loadChanges}/>
              {
                errors.phone && errors.phone
              }
              
              <input onChange={handleChange} className={errors.country ? s.Alert : s.Inputs} type="text" placeholder="País" maxLength="30" name="country" value={input.country} disabled={loadChanges}/>
              {
                errors.country && errors.country
              }
            </div>
            
            <div className={s.edit_profile_rigth}>
              <textarea onChange={handleChange} className={errors.description ? s.Alert : s.Inputs} type="text" placeholder="Descripción" maxLength="500" name="description" value={input.description} disabled={loadChanges}/>
              {
                errors.description && errors.description
              }
              
              <input onChange={handleChange} className={errors.facebook ? s.Alert : s.Inputs} type="text" placeholder="Facebook. Ej: https://www.facebook.com/usuario" name="facebook" value={input.facebook} disabled={loadChanges}/>
              {
                errors.facebook && errors.facebook
              }
              
              <input onChange={handleChange} className={errors.instagram ? s.Alert : s.Inputs} type="text" placeholder="Instagram Ej: https://www.instagram.com/usuario" name="instagram" value={input.instagram} disabled={loadChanges}/>
              {
                errors.instagram && errors.instagram
              }
              
              <input onChange={handleChange} className={errors.linkedIn ? s.Alert : s.Inputs} type="text" placeholder="LinkedIn Ej: https://www.linkedin.com/in/usuario" name="linkedIn" value={input.linkedIn} disabled={loadChanges}/>
              {
                errors.linkedIn && errors.linkedIn
              }
            </div>
          </div>
          
          {loadChanges?<button className={s.btnLoad} disabled><ThreeDots className={s.loadDots} color="#FFF" height={15} /></button> :
            <button className={s.btnSubmit} type="submit">Guardar cambios</button>
          }
        </form>
      </div>
    );
  }
  else
  {
    return (<EditProfileSkeleton />);
  };
};


export default FormEditProfile;