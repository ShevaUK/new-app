import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import {useMutation} from "react-query";


export const login = user =>
    axios
        .post('https://web-production-b461.up.railway.app/jwt/login',  user )
        // .then(({ session }) => setItem('token', session));

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Login = () =>{
    const loginUser = useMutation(
        ['login'], login,
        {onSuccess:()=> null});
    const onFinish = (values) => {
        loginUser.mutate(values)
        console.log('Success:', values);
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

}
export default Login;