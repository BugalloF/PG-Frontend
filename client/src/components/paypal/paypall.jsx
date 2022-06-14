// Dependencies
import React, {useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import swal from "sweetalert";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// Files
import {sendEmail} from "../../redux/actions";

// This values are the props in the UI
const style= {
    layout: 'horizontal',
    heignt: 40,
    size: 'large',
    color: 'white',
    shape: 'rect',
    label: 'pay',
    tagline: 'false',
    fundingicons: 'false'
}

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ showSpinner ,idPost,title,price}) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    // const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const dispatch = useDispatch();
    const loggedUser = window.localStorage.getItem("userData");
    
    return (<>
            <PayPalButtons
                style={style}
                disabled={false}
                // forceReRender={[]}
                showSpinner={showSpinner}
                fundingSource={undefined}
                createOrder={(data, actions) => {
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
                        }
                    })
                      .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    swal('Pago exitoso, a continuación recibirás un correo con tu obra.')
                    if(order.status === 'COMPLETED'){
                      let payer = order.payer.name.given_name;
                      let surname = order.payer.name.surname;
                      let time = order.create_time;
                      console.log(payer,surname,time,idPost)
                      dispatch(sendEmail(loggedUser,{payer,surname,time,idPost}))
                    }
                }}
                onError={(err) => {
                    swal('Ocurrió un error!')
                    console.log(err);
                }}
            />
        </>
    );
}

export default function Paypal({idPost,price,title}) {
    const loggedUser = window.localStorage.getItem("userData");
    if(loggedUser)
    {
        return (
            <div>
                <PayPalScriptProvider
                    options={{
                        "client-id": process.env.REACT_APP_CLIENT_ID_PAYPAL,
                        components: "buttons",
                        currency: "USD"
                    }}
                >
                    <ButtonWrapper
                        style={style}
                        showSpinner={true}
                        idPost={idPost}
                        price={price}
                        title={title}
                    />
                </PayPalScriptProvider>
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