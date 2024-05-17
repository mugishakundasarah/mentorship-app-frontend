import { useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '../graphql';
import { Form, Input, Button, notification } from 'antd'; // Import Ant Design components
import { jwtDecode } from 'jwt-decode';

const LoginUser = () => {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER_MUTATION, {
    onCompleted: (data) => {
      console.log(data)
      localStorage.setItem('token', data.tokenAuth.token);
      localStorage.setItem('refreshToken', data.tokenAuth.refreshToken);
      const decoded = jwtDecode(data.tokenAuth.token);
      const userRole = decoded?.role
      console.log(userRole)
      if (userRole === 'mentor') {
        window.location = '/requests';
      } else if (userRole === 'mentee') {
        window.location = '/mentors';
      }
        
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
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <div className="w-full max-w-sm bg-white py-4 px-3 shadow-md rounded-md">
        <h1 className='text-center font-semibold py-4'>Mentorship App</h1>
        <Form
          onFinish={handleSubmit}
          initialValues={{ email: '', password: '' }}
          className="bg-white rounded px-8 pt-6"
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
        <div className="text-sm flex justify-center mb-4">
          <p>{`Don't have an account?`}</p> <a className="ml-1 underline text-blue-500" href="/">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;