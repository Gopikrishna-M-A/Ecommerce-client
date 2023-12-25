"use client";
import React, { useState } from "react";
import { List, Button, Card, Modal, Space, Typography } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const { Text, Title, Paragraph } = Typography;

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 20.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 25.0,
      image: "/images/products/apple.jpeg",
    },
    // Add more wishlist items as needed
  ]);

  const handleRemoveItem = (itemId) => {
    confirm({
      title: "Remove from Wishlist",
      content: "Are you sure you want to remove this item from your wishlist?",
      onOk() {
        const updatedItems = wishlistItems.filter((item) => item.id !== itemId);
        setWishlistItems(updatedItems);
      },
      onCancel() {},
    });
  };

  const handleAddToCart = (itemId) => {
    // Implement your logic to add the item to the cart
    console.log(`Add to cart clicked for item with ID ${itemId}`);
  };

  return (
    <div className="wishlist section">
      <Title level={2}>Wishlist</Title>
      <div className="wishlist-card-wrapper">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            title={item.name}
            cover={
              <img
                alt={item.name}
                src={item.image}
                style={{ height: 100, objectFit: "contain", padding: 5 }}
              />
            }
            actions={[
              <Button
                key="remove"
                icon={<DeleteOutlined />}
                type="link"
                onClick={() => handleRemoveItem(item.id)}
                danger
              />,
              <Button
                key="addToCart"
                icon={<ShoppingCartOutlined />}
                type="link"
                onClick={() => handleAddToCart(item.id)}
              />,
            ]}
            style={{ width: 230 }} // Adjust the width as needed
          >
            <Paragraph style={{ fontSize: 14 }}>Price: ${item.price}</Paragraph>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
