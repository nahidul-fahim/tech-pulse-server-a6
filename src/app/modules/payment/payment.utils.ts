/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import config from "../../config"



export const initiatePayment = async (paymentData: any) => {
    const response = await axios.post(config.payment_url!, {
        store_id: config.store_id,
        signature_key: config.signature_key,
        tran_id: paymentData.transactionId,
        success_url: `https://tech-pulse-server-six.vercel.app/api/v1/payment/confirmation?transactionId=${paymentData.transactionId}`,
        fail_url: "http://www.merchantdomain.com/failedpage.html",
        cancel_url: "http://www.merchantdomain.com/cancellpage.html",
        amount: "20.0",
        currency: "USD",
        desc: "Merchant Registration Payment",
        cus_name: paymentData.userName,
        cus_email: paymentData.userEmail,
        cus_add1: "N/A",
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "N/A",
        cus_phone: "N/A",
        type: "json"
    })

    return response.data;
}