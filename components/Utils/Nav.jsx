"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Typography, Input, Select, Badge } from "antd";
import axios from "axios";
const { Title, Text } = Typography;
const { Search } = Input;

const Navbar = ({ user, baseURL }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [cartTotalQty, setCartTotalQty] = useState(0);

  console.log(user);


  // useEffect(() => {
  //   const fetchUserCart = async () => {
  //     if (user) {
  //       try {
  //         const response = await axios.get(`${baseURL}/api/cart/${user._id}`);
  //         const userCart = response.data;
  //         // Calculate the total quantity of items in the cart
          
  //         setCartTotalQty(totalQty);
  //         console.log(totalQty);
  //       } catch (error) {
  //         console.error('Error fetching user cart:', error);
  //       }
  //     }
  //   };
  //   fetchUserCart();
  // }, [user]);

  const totalQty = user?.cart?.products?.reduce((acc, product) => acc + product.quantity, 0);



  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };
  const closeNav = () => {
    setIsNavExpanded(false);
  };

  const handleMenuClick = async (e) => {
    if (e.key === "1") {
    } else if (e.key === "2") {
    }
  };
  const items = [
    {
      label: "Logout",
      key: "1",
      icon: <LogoutOutlined />,
    },
    {
      label: "Settings",
      key: "2",
      icon: <SettingOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  return (
    <>
      <nav className={`nav`}>
        <Link className="nav__brand" href="/">
          <Title level={3}>Mart</Title>
        </Link>

        <Search
          style={{
            width: "100%",
            maxWidth: "300px",
          }}
          className="search-input"
          addonBefore={
            <Select
              defaultValue="all-Categories"
              onChange={handleChange}
              options={[
                { value: "all-Categories", label: "All Categories" },
                { value: "electronics", label: "Electronics" },
                { value: "clothing", label: "Clothing" },
                { value: "furniture", label: "Furniture" },
                { value: "books", label: "Books" },
                { value: "toys", label: "Toys" },
                { value: "fruits", label: "Fruits" },
              ]}
            />
          }
          placeholder="I'm searching for..."
          allowClear
          onSearch={onSearch}
        />

        <div className="nav-button-wrapper">
          <div className="nav-links">
            <Link className="link-item" onClick={closeNav} href="/cart">
              <Badge  count={totalQty}>
                <ShoppingCartOutlined />
              </Badge>
            </Link>
            <Link className="link-item" onClick={closeNav} href="/wishlist">
              <HeartOutlined />
            </Link>
          </div>
          {user ? (
            <Link href="/api/auth/signout">
              <Button className="nav-button">Sign out</Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <Button type="primary" className="nav-button">Sign in</Button>
            </Link>
          )}
          <Link href="/settings">
            {user && <img src={user.image} className="nav-logo-img"></img>}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

