import React from "react";
import { Typography, Skeleton } from "antd";
import Link from "next/link";
const { Text } = Typography;

const CategoryCard = ({ category }) => {
  const img ='/images/Categories/fruirtsandveg.png'
  return (
    <Link href={`/products/${category._id}`}>
      <div className="category-card">
        <div className="category-img">
          {img ? (
            <img src={img} alt="category" />
          ) : (
            <Skeleton.Image active={true} className="skt" />
          )}
        </div>
        <div className="category-name">
          <Text>{category.name}</Text>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
<Skeleton active paragraph={{ rows: 1 }} />;
