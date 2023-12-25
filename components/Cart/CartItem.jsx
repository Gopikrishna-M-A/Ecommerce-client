import { useState, useEffect } from 'react';
import Image from 'next/image'
import { Typography, Tag, InputNumber, Checkbox } from 'antd'
import { CarOutlined, CloseOutlined } from '@ant-design/icons'
import axios from 'axios';

const { Text, Title, Paragraph } = Typography;
const CartItem = ({ cartItem, baseURL, user, setCart}) => {

    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };

    const onQuantityChange = async(type) => {
        try{
            const response = await axios.patch(`${baseURL}/api/cart/${cartItem.product._id}/${user._id}`,{
                quantity: type === "inc" ? cartItem.quantity + 1 : cartItem.quantity - 1,
            })
            const userCart = response.data;
            setCart(userCart.cart);
        }catch(err){
            console.log(err);
        }

    }

    const removeCartItem = async() => {
        try{
            setLoading(true);
            const response = await axios.delete(`${baseURL}/api/cart/${cartItem.product._id}/${user._id}`)
            const userCart = response.data;
            setCart(userCart.cart);
        }catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }
    
    

  return (
    <div className={`cart-item-card Row JC-SB ${loading ? 'loading' : ''}`} >
        <div className='Row'>
        <div className='cart-item-card-left'>
            <Image 
            className='cart-item-img'
            width={70}
            height={70}
            src='/images/products/apple.jpeg'
             />
             <Checkbox checked={true} className='cart-item-checkbox' onChange={onChange}/>
        </div>
        <div className='cart-item-card-middle'>
            <div className='cart-item-details'>
                <div className=''>
                    <Title level={4}>{cartItem.product.name}</Title>
                    <Paragraph>{cartItem.product.description}</Paragraph>
                </div>
                <div className='Row AI-C'>
                    <Title level={5}>₹{cartItem.product.price}</Title> 
                    <Text  type="secondary" delete >₹{(cartItem.product.price * 1.1).toFixed(2)}</Text>
                    <Tag bordered={false} color="green">10% OFF</Tag>
                </div>
                <div className='Row AI-C'>
                    <CarOutlined />
                    <Text  type="secondary" ><strong>Express</strong> delivery in 3 days</Text>
                </div>

            </div>
            
        </div>
        </div>
        <div className='cart-item-card-right Row Vertical AI-FE JC-SB'>
            <CloseOutlined onClick={removeCartItem}/>
            <InputNumber 
                style={{ width: '60px' }}
                // readOnly={true}   
                defaultValue={cartItem.quantity}
                // addonBefore="-" 
                // addonAfter="+"  
                min={1} 
                // max={10} 
                onStep={(value, info) => {
                    if (info.type === 'up') {
                        onQuantityChange("inc"); // Call your increment function
                    } else if (info.type === 'down') {
                        onQuantityChange("dec"); // Call your decrement function
                    }
                }}
            />
        </div>
    </div>
  )
}

export default CartItem