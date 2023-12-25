import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Empty, Spin, notification } from "antd";
import Bill from "./Bill";
import Confetti from 'react-confetti'

const SupermarketBill = ({ baseURL, razorpayKEY, user, cartTotal }) => {
  const [cart, setCart] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const openNotification = () => {
    notification.success({
      message: 'Order Confirmed',
      description: 'Thank you for your order! Your payment was successful. You will receive an email with the order details shortly.',
    });
  };




  const currentDate = new Date();
  useEffect(() => {
    if(cartTotal > 0){
      makePayment()
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/cart/${user._id}`);
        const userCart = response.data;
        setCart(userCart);
      } catch (err) {
        console.log("error");
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    // Calculate and set table data based on the cart
    const newTableData = cart?.products?.map((product) => {
      return {
        item: product.product.name, // Assuming the product object has a "name" property
        rate: product.product.price,
        qty: product.quantity,
      };
    });
    setTableData(newTableData);
    const newTotal = cart?.products?.reduce((acc, product) => {
      return acc + product.quantity * product.product.price;
    }, 0);

    setTotal(newTotal);
  }, [cart]);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    const amount = cartTotal; // Amount is in currency subunits. Hence, multiply by 100 to get the actual amount
    // Make API call to the serverless API
    console.log("amount", amount);
    const response = await axios.post(`${baseURL}/api/orders`, {
      amount,
    });
    const data = response.data.order;
    setOrderID(data.id)

    var options = {
      key: razorpayKEY, // Enter the Key ID generated from the Dashboard
      name: "Mart Store",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for shopping with us",
      // image: "https://manuarora.in/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature); 
        try{
          const res  = axios.post(`${baseURL}/api/orders/verify`, {
            total: amount*100,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }).then(res => {
            if(res.status === 200){
              setPaymentSuccess(true);
              openNotification()
            }
          })
       

        }catch(err){
          console.log("error",err);
        }
        
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      {paymentSuccess ? (
        <>
          <Confetti width={windowDimensions.width} height={windowDimensions.height}/>
          <Bill user={user} orderID={orderID} tableData={tableData} total={total} cartTotal={cartTotal}/>
        </>
      ) : (
        <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
      )}
    </div>
  );
};

export default SupermarketBill;
