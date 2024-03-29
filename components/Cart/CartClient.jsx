"use client";
import { Button, message, Steps, Spin, Typography } from "antd";
import { useState } from "react";
import Cart from "./Cart";
import Address from "./Address";
import Payment from "./Payment";




const page = ({ user, baseURL, razorpayKEY }) => {
  const [current, setCurrent] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const steps = [
    {
      title: "Cart",
      content: <Cart user={user} baseURL={baseURL} setCurrent={setCurrent} setCartTotal={setCartTotal}/>,
    },
    {
      title: "Address",
      content: <Address user={user} baseURL={baseURL} setCurrent={setCurrent} />,
    },
    {
      title: "Payment",
      content: <Payment user={user} baseURL={baseURL} razorpayKEY={razorpayKEY} cartTotal={cartTotal}/>,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  return (
    <div className=" py-12 px-24">
      <Steps className="w-1/2 my-2.5 mx-auto" current={current} items={items} onChange={onChange} />

      <div>
        <div className=" mt-10 ">{steps[current].content}</div>
      </div>
    </div>
  );
};

export default page;
