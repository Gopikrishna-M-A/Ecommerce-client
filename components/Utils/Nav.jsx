"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Typography, Input, Select, Badge } from "antd";

import { useCart } from "../../contexts/cartContext";

const { Title, Text } = Typography;
const { Search } = Input;

const Navbar = ({ user, baseURL }) => {
  const { cart } = useCart();

  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const totalQty = cart?.products?.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

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
  // const items = [
  //   {
  //     label: "Logout",
  //     key: "1",
  //     icon: <LogoutOutlined />,
  //   },
  //   {
  //     label: "Settings",
  //     key: "2",
  //     icon: <SettingOutlined />,
  //   },
  // ];

  // const menuProps = {
  //   items,
  //   onClick: handleMenuClick,
  // };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const items = [
    {
      key: '1',
      label: (
        <Link href="/profile" rel="noopener noreferrer" >
          Profile
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/orders" rel="noopener noreferrer" >
          Orders
        </Link>
      ),
    },
    {
      key: '3',
      danger: true,
      label: (
        <Link href="/api/auth/signout" rel="noopener noreferrer" >
         Sign out
        </Link>
      ),
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-screen flex items-center justify-between p-5 border-b bg-white">
        <Link className="font-bold text-2xl" href="/">
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

        <div className="flex items-center gap-4">
          <div className=" flex gap-8 mr-3">
            <Link className="link-item" onClick={closeNav} href="/cart">
              <Badge count={totalQty}>
                <ShoppingCartOutlined />
              </Badge>
            </Link>
            <Link className="link-item" onClick={closeNav} href="/wishlist">
              <HeartOutlined />
            </Link>
          </div>
          {!user && (
            <Link href="/api/auth/signin">
              <Button >
                Sign in
              </Button>
            </Link>
          )}
          <Dropdown
            menu={{
              items,
            }}
          >
            <Link href="/">
              {user && <img src={user.image} className=" w-9 h-9 rounded-full"></img>}
            </Link>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
