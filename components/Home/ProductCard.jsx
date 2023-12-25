import React from "react";
import { Button, Rate, Typography, Tag, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from "axios";

import { useCart } from '../../contexts/cartContext';

const { Title, Text, Paragraph } = Typography;

const ProductCard = ({ product, user, category, baseURL }) => {
  const { addToCart } = useCart();
  const { push } = useRouter();
  
  const handleCart = async() => {
    if (!user) {
      push(`/api/auth/signin?callbackUrl=/products/${category}`);
    }else{
      addToCart(product._id, user._id, 1);
    }
  }

  const truncatedDescription = product.description.length > 30
    ? `${product.description.slice(0, 60)}...`
    : product.description;

  return (
    <div className="product-card Row Vertical">
      <HeartOutlined className="whishlist-icon"/>
      {/* <HeartFilled className="whishlist-icon"/> */}
      <div className="product-img">
        <img src={`/images/Products/${product.images[0]}`} alt="" />
      </div>
      <div className="product-name Row JC-SB AI-C">
        <Link href={`/product/${product._id}`}><Title  level={5}>{product.name}</Title></Link>
        <Text style={{textWrap:"nowrap"}} type="secondary">{product.attributes.weight || product.attributes.size}</Text>
      </div>
      <div className="Row product-desc">
        <Paragraph>{truncatedDescription}</Paragraph>
      </div>
      <div className="Row rating JC-SB">
        <Rate value={3} disabled  />
        <div color="success" className="color-tag veg">
          {" "}
          •{" "}
        </div>
      </div>
      <div className="Row product-price AI-C">
        <Text className="price-new">₹{product.price}</Text>
        <Text type="secondary" delete className="price-old">
          ₹{(product.price * 1.1).toFixed(2)}
        </Text>
        <Tag bordered={false} color="green">
          10% OFF
        </Tag>
      </div>
      <Button onClick={handleCart}>Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
