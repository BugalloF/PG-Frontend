import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../redux/actions";
import swal from "sweetalert";

export default function Paypal({price,title,idPost}) {
  const dispatch = useDispatch()
  const paypal = useRef();

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
          console.log(order)
          swal('Pago exitoso, a continuación recibirás un correo con tu obra.')
          if(order.status === 'COMPLETED'){
            let payer = order.payer.name.given_name;
            let surname = order.payer.name.surname;
            let time = order.create_time;
            dispatch(sendEmail({payer,surname,time,idPost})) //FALTA ACCEDER A LA INFO EN ORDER Y MANDARLA AL BACK
          }
        },
        onError: (err) => {
            window.alert('Ocurrió un error!')
            console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}