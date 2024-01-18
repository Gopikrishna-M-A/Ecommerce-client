"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Breadcrumb,
  Steps,
  Popover,
  Divider,
  Spin,
  Empty,
} from "antd";
import {
  QuestionCircleOutlined,
  FilePdfOutlined,
  DropboxCircleFilled,
  CheckCircleFilled,
  CarFilled,
  EnvironmentFilled,
  StarFilled,
} from "@ant-design/icons";
import OrderItems from "./OrderItems";
import axios from "axios";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const page = ({ user, baseURL }) => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(orders.length);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseURL}/api/orders/history/${user._id}`
      );
      setOrders(data);
      setTotalOrders(data.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // const phase = CurrentOrder?.orderStatus && CurrentOrder.phase
  console.log(orders);

  function convertDateFormat(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateObject = new Date(inputDate);

    const year = dateObject.getFullYear();
    const month = months[dateObject.getMonth()];
    const day = dateObject.getDate();
    var hours = dateObject.getHours();
    var minutes = dateObject.getMinutes();
    minutes += 30;

    // Adjust hours if minutes overflow
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }

    // Convert 24-hour time to 12-hour time with AM/PM
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const formattedDate = `${month} ${day},${year} at ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return formattedDate;
  }


  return (
  <div className="page orders-page">
    <div className="orders-head">
      <div className="Row JC-SB">
        <div className="Row AI-C">
          <Title level={3} className="order-title">
            Your Orders
          </Title>
          <Paragraph type="secondary">({totalOrders})</Paragraph>
        </div>
        <div className="head-btns Row ">
          <Button icon={<QuestionCircleOutlined />}>Need Help?</Button>
        </div>
      </div>
    </div>

      <div className="Row JC-SB">
      <div className="orders-left-section">
        {orders.map((order,index) => (
            <div  key={order._id}>
            <div className="left-head Row JC-SB AI-C">
              <div className="Row Vertical W-70">
                <Link href={`/orders/${order._id}`}><Title level={4}>Order #{order?.orderNumber} </Title></Link>
                <div className="Row JC-SB">
                  <div className="Row Vertical gap-5">
                    <Paragraph type="secondary">Order</Paragraph>
                    <Paragraph type="success">
                      &#10003;{" "}
                      {order?.paymentStatus == "captured"
                        ? "paid"
                        : "unpaid"}
                    </Paragraph>
                  </div>
                  <div className="Row Vertical gap-5">
                    <Paragraph type="secondary">Amount</Paragraph>
                    <Text strong>&#8377; {order?.totalAmount}</Text>
                  </div>
                  <div className="Row Vertical gap-5">
                    <Paragraph type="secondary">Estimated Delivery</Paragraph>
                    <Paragraph>{convertDateFormat(order.orderDate)}</Paragraph>
                  </div>
                  <div className="Row Vertical">
                    <Button type="primary" size="small">
                      {order?.orderStatus &&
                        order.orderStatus[order.phase].status}
                    </Button>
                  </div>
                </div>
              </div>
              {/* <div className="orders-map"></div> */}
            </div>

            <Steps
              style={{ marginTop: "30px", marginBottom: "20px" }}
              current={order.phase}
              items={[
                {
                  title: "Processing",
                  icon: <CheckCircleFilled />,
                },
                {
                  title: "Packed",
                  icon: <DropboxCircleFilled />,
                },
                {
                  title: "Shipped",
                  icon: <CarFilled />,
                },
                {
                  title: "Delivered",
                  icon: <EnvironmentFilled />,
                },
                {
                  title: "Completed",
                  icon: <StarFilled />,
                },
              ]}
            />
           {index == orders.length-1 ? <></> :<Divider />}
            </div>
        ))}
        </div>

        <div className="orders-right-section">

        </div>


      </div>
    
  </div>
  )
};

export default page;
