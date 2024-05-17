import { useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '../graphql';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd'; // Import Ant Design components

const LoginUser = () => {
  let navigate = useNavigate();
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.tokenAuth.token);
      localStorage.setItem('refreshToken', data.tokenAuth.refreshToken);
      navigate('/mentors'); 
    },
    onError: (error) => {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    },
  });

  const handleSubmit = async (values) => {
    try {
      await loginUser({ variables: values });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm">
        <Form
          onFinish={handleSubmit}
          initialValues={{ email: '', password: '' }}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
          {error && <p className="text-red-500">{error.message}</p>}
        </Form>
      </div>
    </div>
  );
};

export default LoginUser;
