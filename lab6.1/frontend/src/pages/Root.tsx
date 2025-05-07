import { Link, Outlet } from 'react-router-dom';

function Root() {
    return (
        <div>
            <nav>
                <ul style={{ display: 'flex', gap: '2rem' }}>
                    <li>
                        <Link to='/'>Enter User</Link>
                    </li>
                    <li>
                        <Link to='/users'>Users</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Root;