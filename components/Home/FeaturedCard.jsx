import React from "react";
import { Skeleton } from "antd";
import Link from "next/link";

const FeaturedCard = ({ img }) => {
  const productId = "1234567890"
  return (
    <Link href={`/`}>
      <div className="featured-card">
        <div className="featured-img">
          {img ? (
            <img src={`/images/Featured/${img}`} alt="FeaturedCard" />
          ) : (
            <Skeleton.Image active={true} className="skt" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
