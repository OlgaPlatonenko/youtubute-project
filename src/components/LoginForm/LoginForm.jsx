import { Form, Input, Button } from 'antd';
import { Logo } from '../Logo';

import styles from './LoginForm.module.css';

export const LoginForm = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        className={styles.form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={onSubmit}
      >
        <div className={styles.inputWrapper}>
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ required: true, message: 'Введите ваше имя' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
