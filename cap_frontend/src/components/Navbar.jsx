import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sprout, Leaf } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo}>
                    <div className={styles.logoIcon}><Sprout size={24} color="#4ec97e" /></div>
                    <span className={styles.logoText}>Crop<span>Sense</span> AI</span>
                </Link>
                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/predict"
                        className={({ isActive }) => `${styles.navLink} ${styles.navCta} ${isActive ? styles.active : ''}`}
                    >
                        <Leaf size={16} /> Try Now
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
