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

const page = ({ user, baseURL, orderId }) => {
  const [orders, setOrders] = useState([]);
  const [CurrentOrderId, setCurrentOrderId] = useState(orderId);
  const [CurrentOrder, setCurrentOrder] = useState({});
  const [CurrentOrderProducts, setCurrentOrderProducts] = useState([]);
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
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${baseURL}/api/orders/${CurrentOrderId}`
      );
      setCurrentOrder(data);
      setCurrentOrderProducts(data.products);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (CurrentOrderId) {
      fetchOrder();
    }
  }, [CurrentOrderId]);

  const phase = CurrentOrder?.orderStatus && CurrentOrder.phase;

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
  function convertDateFormat2(inputDate) {
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
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    // Convert 24-hour time to 12-hour time with AM/PM
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const formattedDate = `${month} ${day} ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return formattedDate;
  }

  const inputDateString = CurrentOrder.orderDate;
  const formattedDate = convertDateFormat(inputDateString);

  console.log(
    "asda",
    CurrentOrder.orderStatus && CurrentOrder?.orderStatus[0].timestamp
  );

  return (
    <div className="px-10 py-2.5 ">
      <div className="">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Title level={3}>Your Orders</Title>
            <Paragraph type="secondary">({totalOrders})</Paragraph>
          </div>
          <div className="flex gap-1">
            <Button icon={<QuestionCircleOutlined />}>Need Help?</Button>
            <Button
              disabled={totalOrders < 1 ? true : false}
              icon={<FilePdfOutlined />}
            >
              Download Invoice
            </Button>
          </div>
        </div>
        <Breadcrumb
          items={[
            totalOrders > 0 && {
              title: `#${CurrentOrder?.orderNumber}`,
            },
            totalOrders > 0 && {
              title: <Link href="/orders">History</Link>,
            },
          ]}
        />
      </div>

      {!loading ? (
        <div className="flex justify-between">
          <div className="w-3/5 bg-white rounded-md border mt-8 py-2.5 px-5">
            {totalOrders == 0 && (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    You currently have no orders. Start exploring our products
                    and place your first order to see it here.
                  </span>
                }
              >
                <Link href={"/"}>
                  <Button type="primary">Order Now</Button>
                </Link>
              </Empty>
            )}
            {totalOrders > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col w-2/3">
                    <Title level={4}>Order #{CurrentOrder?.orderNumber} </Title>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-1">
                        <Paragraph type="secondary">Order</Paragraph>
                        <Paragraph type="success">
                          &#10003;{" "}
                          {CurrentOrder?.paymentStatus == "captured"
                            ? "paid"
                            : "unpaid"}
                        </Paragraph>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Paragraph type="secondary">Amount</Paragraph>
                        <Text strong>&#8377; {CurrentOrder?.totalAmount}</Text>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Paragraph type="secondary">
                          Estimated Delivery
                        </Paragraph>
                        <Paragraph>{formattedDate}</Paragraph>
                      </div>
                      <div className="flex flex-col">
                        <Button type="primary" size="small">
                          {CurrentOrder?.orderStatus &&
                            CurrentOrder.orderStatus[phase].status}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className=" w-20 h-20 bg-slate-300 rounded-md"></div>
                </div>

                <Steps
                  className="mt-8 mb-5"
                  current={phase}
                  // progressDot={customDot}
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

                <Title level={5}>Track Details</Title>
                <Steps
                  className="mt-2.5 mb-5"
                  direction="vertical"
                  size="small"
                  current={phase + 1}
                  items={[
                    {
                      title: "Order Confirmed",
                      subTitle: convertDateFormat2(
                        CurrentOrder.orderStatus &&
                          CurrentOrder?.orderStatus[0].timestamp
                      ),
                      description:
                        "The order has been successfully confirmed by our system",
                    },
                    {
                      title: "Order Paid",
                      ...(phase >= 0 && {
                        subTitle: convertDateFormat2(
                          CurrentOrder.orderStatus &&
                            CurrentOrder?.orderStatus[0].timestamp
                        ),
                      }),
                      ...(phase > 0 && {
                        description: "Your payment has been received",
                      }),
                    },
                    {
                      title: "Order packed",
                      ...(phase >= 1 && {
                        subTitle: convertDateFormat2(
                          CurrentOrder.orderStatus &&
                            CurrentOrder?.orderStatus[1].timestamp
                        ),
                      }),
                      ...(phase > 1 && {
                        description: "All items from your order were packed",
                      }),
                    },
                    {
                      title: "Package send",
                      ...(phase >= 2 && {
                        subTitle: convertDateFormat2(
                          CurrentOrder.orderStatus &&
                            CurrentOrder?.orderStatus[2].timestamp
                        ),
                      }),
                      ...(phase > 2 && {
                        description: `Your package has been sent from our store to ${CurrentOrder?.shippingAddress?.street}`,
                      }),
                    },
                    {
                      title: "Package Delivered",
                      ...(phase >= 3 && {
                        subTitle: convertDateFormat2(
                          CurrentOrder.orderStatus &&
                            CurrentOrder?.orderStatus[3].timestamp
                        ),
                      }),
                      ...(phase > 3 && {
                        description: `Your package has been successfully delivered to ${CurrentOrder?.shippingAddress?.street}`,
                      }),
                    },
                  ]}
                />
              </>
            )}
          </div>
          {totalOrders > 0 && (
            <div className="w-1/3 bg-white rounded-md border mt-8 py-2.5 px-5 ">
              <Title level={4}>Inside Package</Title>
              <OrderItems products={CurrentOrderProducts} />
              <Divider />
              <div className="flex justify-between">
                <Title level={5}>Total</Title>
                <Paragraph>&#8377; {CurrentOrder?.totalAmount}</Paragraph>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default page;
