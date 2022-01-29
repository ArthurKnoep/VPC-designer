import { Layout } from 'antd';
import styles from './Footer.module.scss';

const { Footer: FooterD } = Layout;
export function Footer() {
  return <FooterD className={styles.footer}>Arthur Knoepflin &copy; 2022</FooterD>
}
