import SideBar from '../ui/side-bar/SideBar';
import styles from './layout.module.scss';

export default function RootLayout({ children }: { children: any }) {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
