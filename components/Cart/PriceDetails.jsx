import { useEffect, useState } from 'react';
import { Typography, Button, Divider, notification } from 'antd';

const { Text, Title,Paragraph } = Typography;

const openNotification = () => {
  notification.error({
    message: 'Empty Cart',
    description: 'Oops! It seems your cart is empty. Please add items to your cart before proceeding to place an order.',
  });
};



const PriceDetails = ({ cart, setCurrent, setCartTotal }) => {

    // const [CartItems, setCartItems] = useState(cart?.products);

    // useEffect(() => {
    //     setCartItems(cart?.products);
    // }, [cart]);

    const calculateTotalPrice = (quantity, price) => quantity * price;

    const priceDetails = cart?.products?.map((cartItem) => (
        <div key={cartItem.product._id} className="Row JC-SB">
          <Text style={{width:"70%"}} type="secondary">{`${cartItem.quantity} x ${cartItem.product.name}`}</Text>
          <Text>{`₹${calculateTotalPrice(cartItem.quantity, cartItem.product.price).toFixed(2)}`}</Text>
        </div>
      ));
    const totalAmount = cart?.products?.reduce(
        (total, cartItem) => total + calculateTotalPrice(cartItem.quantity, cartItem.product.price),
        0
    );
    const couponDiscount = totalAmount > 25 ? 10 : 0 // Assuming a fixed coupon discount for this example
    const deliveryCharges = 0; // Assuming free delivery for this example
    const cartTotal = ((totalAmount + deliveryCharges) - couponDiscount ).toFixed(2);
    setCartTotal(cartTotal);


    const onButtonClick = () => {
      if(cartTotal<=0){
        openNotification()
      }else{
        setCurrent(1)
      }
    }

  return (
    <div className="Row Vertical">
      <Title level={4}>Price Details</Title>
      <div className="price-detail-card">
        <Text>{`${cart?.products?.length} items`}</Text>
        {priceDetails}
        <div className="Row JC-SB">
          <Text type="secondary">Discount</Text>
          <Text type="success">{`-₹${couponDiscount}`}</Text>
        </div>
        <div className="Row JC-SB">
          <Text type="secondary">Delivery Charges</Text>
          <Text>{deliveryCharges === 0 ? 'Free Delivery' : `₹${deliveryCharges}`}</Text>
        </div>
        <Divider style={{ margin: 5 }} />
        <div className="Row JC-SB">
          <Title level={5}>Total Amount</Title>
          <Title level={5}>{`₹${(totalAmount - couponDiscount).toFixed(2)}`}</Title>
        </div>
      </div>
      <Button onClick={onButtonClick} type="primary" size="large">
        Place order
      </Button>
    </div>
  )
}

export default PriceDetails
