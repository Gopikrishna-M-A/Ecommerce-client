import React from "react";
import Image from "next/image";
import { Typography } from "antd";
const { Text, Title, Paragraph } = Typography;

const OrderItems = ({ products }) => {
  return (
    <div className="Row Vertical " style={{ marginTop: "20px" }}>
      {products.map((product) => (
        <div key={product._id} className="Row">
          <div className="cart-item-card-left">
            <Image
              alt="Product Image"
              className="cart-item-img"
              width={70}
              height={70}
              src={"/images/Products/" + product.product.images[0]}
            />
          </div>
          <div className="cart-item-card-middle">
            <div className="cart-item-details">
              <div className="">
                <Text strong>{product.product.name}</Text>
                <br />
                <Text type="secondary">
                  {product.product.description.length > 30
                    ? `${product.product.description.slice(0, 30)}...`
                    : product.product.description}
                </Text>
              </div>
              <div className="Row AI-C">
                <Text strong>₹{product.price}</Text>
                <Text type="secondary">{product.quantity} item</Text>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
