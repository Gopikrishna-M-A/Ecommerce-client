import { useState, useEffect } from "react";
import { Checkbox, Typography, Empty } from "antd";
import CartItem from "./CartItem";
import Coupoun from "./Coupoun";
import Gifting from "./Gifting";
import PriceDetails from "./PriceDetails";
import axios from "axios";
const { Text } = Typography;




const Cart = ({ user, baseURL, setCurrent, setCartTotal }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/cart/${user._id}`);
        const userCart = response.data;
        setCart(userCart);
      } catch (err) {
        console.log("error");
      }
    };
    fetchCart();
  }, []);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="section Row gap-50 JC-C">
      <div className="cart-left">
        <div className="Row cart-item-options JC-SB">
          <div className="selected Row">
            <Checkbox checked onChange={onChange} />
            <Text>
              {cart?.products?.length}/{cart?.products?.length} items selected
            </Text>
          </div>

          <div className="options Row">
            <Text>Move to wishlist</Text>
            <Text type="secondary">Remove</Text>
          </div>
        </div>

        <div className="cart-items-wrapper">
          {cart.products && cart.products.length > 0 ? (
            cart.products.map((cartItem) => (
              <CartItem
                key={cartItem._id}
                cartItem={cartItem}
                baseURL={baseURL}
                user={user}
                setCart={setCart}
              />
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No items in the cart"/>
          )}
        </div>
      </div>
      <div className="cart-right Row Vertical gap-20">
        {/* <Coupoun /> */}
        {/* <Gifting /> */}
        <PriceDetails cart={cart} setCurrent={setCurrent} setCartTotal={setCartTotal}/>
      </div>
    </div>
  );
};

export default Cart;
