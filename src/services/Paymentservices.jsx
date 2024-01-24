import { toast } from "react-toastify"
import { apiConnector } from "../utils/Apiconnecter"
import { courseroutes, paymentroutes } from "../apis/apis"
import rzpLogo from "../assets/Logo/Logo-Small-Light.png";


function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script")
        script.src=src
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

async function verifyPayment(bodydata,token,navigate){
    const toastid = toast.loading("Verifying Payment...");
    try{
        const response=await apiConnector("POST",paymentroutes.VERIFYPAYMENT_API,bodydata,
        {
            Authorization:`Bearer ${token}`,
        })

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful. You are Added to the course ");
    navigate("/dashboard/student/enrolled-courses");
    toast.dismiss(toastid);

    }
    catch(err){
        console.log("VERIFY PAYMENT API ERROR ",err);
        toast.error(err.message);
        toast.dismiss(toastid);
    }
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector("POST",paymentroutes.SENTPAYMENTSUCCESSEMAIL_API,
        {
            orderid:response.razorpay_order_id,
            paymentid:response.razorpay_payment_id,
            amount,
        },
        {
            Authorization: `Bearer ${token}`,
        })
    }
    catch(err){
        console.log("PAYMENT SUCCESS EMAIL ERROR............", err);
    }
}


export function buynow(courses,token,profile,navigate){
    return async (dispatch)=>{
        const toastid=toast.loading("Loading...");
        try{
            // Loading the script of Razorpay SDK
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
            if (!res) {
                toast.error("Razorpay SDK failed to load. Check your Internet Connection." )
                return
            }
            console.log("okk before api")
            //initiating the order in backend.
            const orderResponse=await apiConnector("POST",paymentroutes.CAPTUREPAYMENT_API,{courses},
            {
                Authorization: `Bearer ${token}`,
            })
            console.log("order response is=>",orderResponse)
            console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)
            console.log("okk after api")
            // Opening the Razorpay SDK
    const options = {
        key:"rzp_test_WxrIhqSQFhUHs2",
        currency: orderResponse.data.data.currency,
        amount: `${orderResponse.data.data.amount}`,
        order_id: orderResponse.data.data.id,
        name: "StudyNotion",
        description: "Thank you for Purchasing the Course.",
        image: rzpLogo,
        prefill: {
          name: `${profile.firstname} ${profile.lastname}`,
          email: profile.email,
        },

        handler: function (response) {
          console.log("sending email stareted----")
          sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
          verifyPayment({ ...response, courses }, token, navigate);
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        console.log("error fund is=>",response)
        toast.error("Oops! Payment Failed.")
        console.log("error is=>",response.error)
      })


                                     
        }
        catch(err){
            console.log("PAYMENT API ERROR............", err)
            toast.error("Could Not make Payment.")
        }
        toast.dismiss(toastid);
    }
}