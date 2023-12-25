"use client";
import { useState, useEffect } from "react";
import { Image, Typography, Rate, Button, Tag, InputNumber, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
const { Text, Title } = Typography;

const Products = ({ baseURL, user, productId }) => {
  const [product, setProduct] = useState({});
  const[qty, setQty] = useState(1);
  const [currentImage, setCurrentImage] = useState();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = axios
          .get(`${baseURL}/api/products/${productId}`)
          .then((res) => {
            setProduct(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
    setCurrentImage(1)

  }, []);
  console.log(currentImage);

  const handleCart = async() => {
    if (!user) {
      push(`/api/auth/signin?callbackUrl=/products/${category}`);
    }
    try {
      const response = axios.post(`${baseURL}/api/cart/${product._id}/${user._id}`, {
        quantity: qty,
      }).then((res) => {
        user.cart = res.data;
      })
      message.success("Added to cart");
    //   console.log(user.cart);

    }catch(err){
      console.log(err);
    }
  }
  const images = {};

  for (let i = 0; i < product?.images?.length; i++) {
    images[`image${i + 1}`] = `/images/Products/${product.images[i]}`;
  }
  return (
    <div className="page product-detail Row ">
      <div className="section Row">
        <div className="product-detail-left Row Vertical">
          <div className="Row">
            <div>
              
              <Image
                className="product-img-focused"
                preview={false}
                src={images[`image${currentImage}`]}
                width={500}
                height={500}
              />
            </div>
            <div className="Row Vertical JC-C">
            {images.image1 && (
              <Image
                className="product-img-options"
                preview={false}
                width={50}
                src={images.image1}
                onClick={() => setCurrentImage(1)}
              />
            )}
            {images.image2 && (
              <Image
                className="product-img-options"
                preview={false}
                width={50}
                src={images.image2}
                onClick={() => setCurrentImage(2)}
              />
            )}

            {images.image3 && (
              <Image
                className="product-img-options"
                preview={false}
                width={50}
                src={images.image3}
                onClick={() => setCurrentImage(3)}

              />
            )}

            {images.image4 && (
              <Image
                className="product-img-options"
                preview={false}
                width={50}
                src={images.image4}
                onClick={() => setCurrentImage(4)}

              />
            )}
              {/* <Image
                className="product-img-options"
                preview={false}
                width={50}
                src="/images/Products/apple.png"
              /> */}
            </div>
          </div>
        </div>

        <div className="product-detail-right Row Vertical JC-SB">
          <div className="Row Vertical">
            <div className="Row product-name">
              <Title level={1}>{product.name}</Title>
            </div>
            <div className="Row product-desc">
              <Text>{product.description}</Text>
            </div>
            <div className="Row product-desc">
            {Object.entries(product?.attributes || {}).map(([key, value]) => (
                <Tag key={key} bordered={false} >
                    {`${value}`}
                </Tag>
                ))}
            </div>
            <div className="Row product-price AI-C">
              <Title level={2}>₹{product.price}</Title>
              <Text type="secondary" delete>
                ₹{(product.price * 1.1).toFixed(2)}
              </Text>
              <Tag bordered={false} color="green">
                10% OFF
              </Tag>
            </div>
            <div className="Row product-qty AI-C">
              <Text>Quantity</Text>
              <InputNumber
              
                placeholder="Qty"
                value={qty}
                onChange={(value) => setQty(value)}
                min={1}
                max={10}
              />
            </div>
            <div className="Row product-rating">
              <Rate value={3} disabled />
              <Text>441 reviews </Text>
            </div>
            <div className="Row product-action-btn-wrapper">
                <Button size="large" onClick={handleCart}>Add to Cart</Button>
              <Link href={"/cart"}>
              <Button size="large" type="primary" onClick={handleCart}>
                Buy Now
              </Button>
              </Link>

            </div>
          </div>
          <div className="Row Vertical">
            <div className="Row JC-SB W-100">
              <Text type="secondary">Recently viewed</Text>
              <div className="Row gap-5 AI-FS">
                <Button shape="circle" icon={<LeftOutlined />}></Button>
                <Button shape="circle" icon={<RightOutlined />}></Button>
              </div>
            </div>
            <div className="Row gap-20">
              <Image
                className="product-img-recent"
                preview={false}
                height={100}
                width={120}
                src="/images/Products/orange.jpeg"
              />
              <Image
                className="product-img-recent"
                preview={false}
                height={100}
                width={120}
                src="/images/Products/kiwi.jpeg"
              />
              <Image
                className="product-img-recent"
                preview={false}
                height={100}
                width={120}
                src="/images/Products/berry.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
