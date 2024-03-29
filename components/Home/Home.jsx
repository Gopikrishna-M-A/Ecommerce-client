"use client";
import { useState, useEffect } from "react";
import {
  MenuOutlined,
  ThunderboltOutlined,
  SyncOutlined,
  TagOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Typography, Input, Select } from "antd";
import CategoryCard from "./CategoryCard";
import FeaturedCard from "./FeaturedCard";
import axios from "axios";
import Image from "next/image";

const { Title, Text } = Typography;

const Home = ({ baseURL }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/products`).then((res) => {
      const uniqueCategories = Object.values(
        res.data.reduce((acc, product) => {
          const categoryId = product.category._id;
          if (!acc[categoryId]) {
            acc[categoryId] = product.category;
          }
          return acc;
        }, {})
      );

      setCategories(uniqueCategories);
    });
  }, []);

  return (
    <div className="px-10 py-2.5">
      {/* SHOP BY CATEGORY SECTION */}

      <div className="flex justify-between my-2.5 gap-1">
        <div className="flex gap-1">
          <Button icon={<MenuOutlined />}>SHOP BY CATEGORY</Button>
          <Button icon={<ThunderboltOutlined />} type="text">
            Deals Today
          </Button>
          <Button icon={<TagOutlined />} type="text">
            Special Prices
          </Button>
          <Select
            defaultValue="fresh"
            bordered={false}
            options={[{ value: "fresh", label: "Fresh" }]}
          />

          <Select
            defaultValue="frozen"
            bordered={false}
            options={[{ value: "frozen", label: "Frozen" }]}
          />

          <Select
            defaultValue="demos"
            bordered={false}
            options={[{ value: "demos", label: "Demos" }]}
          />

          <Select
            defaultValue="shop"
            bordered={false}
            options={[{ value: "shop", label: "Shop" }]}
          />
        </div>

        <div>
          <Button icon={<SyncOutlined />} type="text">
            Recently Viewed
          </Button>
        </div>
      </div>

      {/* BANNER SECTION */}

      <div className="flex banner w-full justify-between my-2.5">
        <div className="w-full">
          <Carousel className="carousel" autoplay>
            <div>
              <Image
                width={816}
                height={320}
                src="/images/Banner/1.png"
                alt="Banner Image"
                className="w-full"
              />
            </div>
            <div>
              <Image
                width={816}
                height={320}
                src="/images/Banner/2.png"
                alt="Banner Image"
                className="w-full"
              />
            </div>
            <div>
              <Image
                width={816}
                height={320}
                src="/images/Banner/3.png"
                alt="Banner Image"
                className="w-full"
              />
            </div>
            <div>
              <Image
                width={816}
                height={320}
                src="/images/Banner/4.png"
                alt="Banner Image"
                className="w-full"
              />
            </div>
          </Carousel>
        </div>

        {/* <div className="w-2/6">
          <Carousel className="carousel" autoplay>
            <div>
            <Image
             width={100}
             height={100}
                src="/images/Banner/5.png"
                alt="Image 1"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div> */}
      </div>

      {/* BROWSE BY CATEGORY SECTION */}
      <div className="flex-col my-2.5 mt-10 gap-1">
        <div className="flex items-center gap-2">
          <Title level={4}>Browse by Category</Title>
          <Text style={{ marginLeft: "20px" }} type="secondary">
            All Categories <RightOutlined />
          </Text>
        </div>

        <div className="flex gap-2 mt-2.5 overflow-x-auto py-2.5 px-2.5">
          {categories.map((category) => {
            return <CategoryCard key={category._id} category={category} />;
          })}
        </div>
      </div>

      {/* FEATURED BRANDS SECTION */}

      {/* <div className="Row Vertical section" style={{ marginTop: "40px" }}>
        <div className="Row AI-C">
          <Title level={4}>Featured Brands</Title>
          <Text style={{ marginLeft: "20px" }} type="secondary">
            All Offers <RightOutlined />
          </Text>
        </div>

        <div className="Row JC-SB" style={{ marginTop: "10px" }}>
          <FeaturedCard Image="choco.jpg" />
          <FeaturedCard Image="" />
          <FeaturedCard Image="" />
          <FeaturedCard Image="" />
          <FeaturedCard Image="" />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
