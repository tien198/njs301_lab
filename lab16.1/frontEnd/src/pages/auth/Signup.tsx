import styles from './authen.module.css';

function Signup() {
    return (
        <div className={styles['container']}>
            <h2 className={styles['title']}>Signup</h2>
            <form className={styles['form']}>
                <input type="text" placeholder="Username" className={styles['input']} />
                <input type="password" placeholder="Password" className={styles['input']} />
                <input type="password" placeholder="Confirm password" className={styles['input']} />
                <button type="submit" className={styles['button']}>Signup</button>
            </form>
        </div>
    );
}

export default Signup;