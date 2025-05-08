import styles from './authen.module.css';

function Login() {
    return (
        <div className={styles['container']}>
            <h2 className={styles['title']}>Login</h2>
            <form className={styles['form']}>
                <input type="text" placeholder="Username" className={styles['input']} />
                <input type="password" placeholder="Password" className={styles['input']} />
                <button type="submit" className={styles['button']}>Login</button>
            </form>
        </div>
    );
}

export default Login;