import styles from './index.css';
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function () {
  return (
    <div className={styles.normal}>
      <div>
        <Input
          className={styles.antdInput}
          placeholder="请输入用户名"
        />
        <Input.Password
          className={styles.antdInput}
          placeholder="请输入密码"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <Button className={styles.antdBtn} type="primary">登录</Button>
      </div>
    </div>
  );
}
