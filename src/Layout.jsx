import { Outlet } from 'react-router-dom';
import Nav from './components/Nav.jsx';

export default function Layout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}
