import React from 'react';
import { Button, Result } from 'antd';
interface Props {}

function NotFound(props:Props) {
    return (
        <div className='notfound'>
           <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    // extra={<Button type="primary">Back Home</Button>}
  />
        </div>
    );
}

export default NotFound;