import React from 'react'
import { Input, Typography} from 'antd';

const { Text, Title } = Typography;

const Coupoun = () => {
  return (
    <div className='Row Vertical'>
        <Title level={4}>Coupons</Title>
        <Input size='large' placeholder='Enter your promo code' addonBefore="Coupons" allowClear />
    </div>
  )
}

export default Coupoun