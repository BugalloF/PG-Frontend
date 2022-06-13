// Dependencies
import React, {useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
// import {Navigate, useNavigate} from "react-router-dom";
import swal from "sweetalert";
// Files
import {sendEmail, TransactionsPost} from "../../redux/actions";


export default function Paypal({price,title,idPost,userSeller,userPayer,email}) {
  const dispatch = useDispatch()
  const paypal = useRef();
  const loggedUser = window.localStorage.getItem("userData");
  // const navigate = useNavigate();
  
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: title,
                amount: {
                  currency_code: "USD",
                  value: price,
                },
                description: title,
              },
            ],
            application_context: {
                brand_name: "DigitalizArte",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
            },
          });
        },
        style: {
            layout: 'horizontal',
            size: 'large',
            color: 'white',
            shape: 'rect',
            label: 'pay',
            tagline: 'false',
            fundingicons: 'false'
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          // console.log(order)
          swal('Pago exitoso, a continuación recibirás un correo con tu obra.')
          if(order.status === 'COMPLETED'){
            let payer = order.payer.name.given_name;
            let surname = order.payer.name.surname;
            let time = order.create_time;
            dispatch(sendEmail(loggedUser, {payer,surname,time,idPost})) //FALTA ACCEDER A LA INFO EN ORDER Y MANDARLA AL BACK
            dispatch(TransactionsPost({price,title,userSeller,userPayer,email}))
          }
        },
        onError: (err) => {
            swal('Ocurrió un error!')
            // console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  
  if(loggedUser)
  {
    return(
      <div>
        <div ref={paypal}></div>
      </div>
    );
  }
  else
  {
    return(
      <h4>Para poder comprar, es necesario estar registrado.</h4>
    );
  };
}