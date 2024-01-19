'use client';
import {
  AppstoreOutlined,
  MailOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { Typography, Menu, Slider, Select } from "antd";
import ProductCard from "./ProductCard";
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
          <div className="flex justify-between items-center p-3">
            <Text className=" w-2/5">Price Range</Text>
            <Slider
                    className=" w-3/5"
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
          <div className="flex justify-between items-center p-3">
            <Text className="w-2/5">Rating</Text>
            <Slider
              className="w-3/5"
              defaultValue={3}
              max={5}
            />
          </div>,
          "7"
        ),
        getItem(
          <div className="flex justify-between items-center p-3">
            <Text className="w-2/5">Discount</Text>
            <Slider className="w-3/5" range defaultValue={[0, 100]} max={100} />
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
    <div className="px-10 py-2.5 pl-0 pt-0 overflow-hidden flex h-[calc(100vh-73px)]">
      <div className=" w-1/4 h-screen overflow-y-auto border-r ">
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
      <div className=" w-3/4 h-screen overflow-y-auto px-5 py-2 pr-0 no-scrollbar pb-24 flex-col ">
        <div className="flex justify-between mb-4">
          <Title level={4}>{categoryProducts[0]?.category?.name}</Title>
          <div className="flex gap-1">
            <SortAscendingOutlined />
            <Select
              placeholder="sort"
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
        <div className="flex flex-wrap gap-5">
            { categoryProducts.map(product => <ProductCard key={product._id} baseURL={baseURL} category={category} user={user} product={product} />) }
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
