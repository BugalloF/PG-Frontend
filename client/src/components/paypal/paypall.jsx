// Dependencies
import React, {useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import swal from "sweetalert";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// Files
import {sendEmail} from "../../redux/actions";


// This values are the props in the UI
const currency = "USD";
const style= {
    layout: 'horizontal',
    height: 55,
    size: 'large',
    color: 'white',
    shape: 'rect',
    label: 'pay',
    tagline: 'false',
    fundingicons: 'false'
}
// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner ,idPost}) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    console.log('soy idpost',idPost.idPost)
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, []);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                              description: idPost.title,
                              amount: {
                                currency_code: "USD",
                                value: idPost.price,
                              },
                              description: idPost.title,
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
                    // console.log(order)
                    swal('Pago exitoso, a continuación recibirás un correo con tu obra.')
                    if(order.status === 'COMPLETED'){
                      let payer = order.payer.name.given_name;
                      let surname = order.payer.name.surname;
                      let time = order.create_time;
                      dispatch(sendEmail({payer,surname,time,idPost})) //FALTA ACCEDER A LA INFO EN ORDER Y MANDARLA AL BACK
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

export default function App(idPost,price,description,title) {
	return (
		<div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    "client-id": process.env.REACT_APP_CLIENT_ID_PAYPAL,
                    components: "buttons",
                    currency: "USD"
                }}
            >
				<ButtonWrapper
                    style={style}
                    currency={currency}
                    showSpinner={false}
                    idPost={idPost}
                    price={price}
                    description={description}
                    title={title}
                />
			</PayPalScriptProvider>
		</div>
	);
}