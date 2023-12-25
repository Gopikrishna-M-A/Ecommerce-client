'use client';
import {
  AppstoreOutlined,
  MailOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { Typography, Menu, Slider, Select } from "antd";
import ProductCard from "./Home/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
const { Title, Text } = Typography;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const ProductCategory = ({ params, baseURL, user }) => {

    const [category, setCategory] = useState(params.CategoryId);
    const [allProducts, setAllProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);

    useEffect(() => {
        try {
        axios.get(`${baseURL}/api/products`).then((res) => {
            setAllProducts(res.data);
        });
        }catch(err){
            console.log(err)
        }
    }, []);

    useEffect(() => {
        // Filter products based on the current category and price range
        const filteredProducts = allProducts.filter((product) => {
          const isCategoryMatch = category ? product.category._id === category : true;
          const isPriceInRange = product.price >= minPrice && product.price <= maxPrice;
          return isCategoryMatch && isPriceInRange;
        });
    
        setCategoryProducts(filteredProducts);
      }, [category, minPrice, maxPrice, allProducts]);

  const generateCategoriesSection = (allProducts, setCategory) => {
    const uniqueCategories = Array.from(new Set(allProducts.map((product) => product.category._id)));
  
    const categoriesSection = uniqueCategories.map((categoryId) => {
      const category = allProducts.find((product) => product.category._id === categoryId).category;
      // Customize the label and key based on your category structure
      const label = category.name;
      const key = categoryId;
  
      return getItem(label, key);
    });
  
    return categoriesSection;
  };

  const handleSliderChange = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };


  const items = [
    getItem("Favorites", "sub1", <MailOutlined />, [
      getItem("All Products", "1"),
      getItem("Current Promotions", "2"),
      getItem("New Products", "3"),
      getItem("Best Sellers", "4"),
      getItem("Worst Sellers", "5"),
    ]),
    getItem(
      "Filters",
      "grp",
      null,
      [
        getItem(
          <div className="filter-input">
            <Text className="filter-text">Price Range</Text>
            <Slider
                    className="filter-input-type"
                    range
                    defaultValue={[minPrice, maxPrice]}
                    max={100}
                    min={0}
                    onChange={handleSliderChange}
                />
          </div>,
          "6"
        ),
        getItem(
          <div className="filter-input">
            <Text className="filter-text">Rating</Text>
            <Slider
              className="filter-input-type"
              defaultValue={3}
              max={5}
            />
          </div>,
          "7"
        ),
        getItem(
          <div className="filter-input">
            <Text className="filter-text">Discount</Text>
            <Slider className="filter-input-type" range defaultValue={[0, 100]} max={100} />
          </div>,
          "8"
        ),
      ],
      "group"
    ),
    {
      type: "divider",
    },
    getItem("Categories", "sub4", <AppstoreOutlined />, [
      ...generateCategoriesSection(allProducts, setCategory),
    ]),
  ];

  return (
    <div className="page products Row ">
      <div className="products-left">
        {/* <Title level={5}>Products</Title> */}
        <Menu
            onClick={({ key }) => {
                if (key.length > 10) {
                  setCategory(key);
                }
              }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>
      <div className="products-right Row Vertical">
        <div className="Row JC-SB">
          <Title level={4}>{categoryProducts[0]?.category?.name}</Title>
          <div className="Row">
            <SortAscendingOutlined />
            <Select
              placeholder="sorrt"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "a-z", label: "A-Z" },
                { value: "z-a", label: "Z-A" },
                { value: "l-h", label: "Low - high" },
                { value: "h-l", label: "High - Low" },
              ]}
            />
          </div>
        </div>
        <div className="Row products-list">
            { categoryProducts.map(product => <ProductCard key={product._id} baseURL={baseURL} category={category} user={user} product={product} />) }
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
