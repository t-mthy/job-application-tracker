import React from 'react';

function Footer() {
    const currYear = new Date().getFullYear();

    return (
        <footer>
            <p>&copy; {currYear} t-mthy</p>
        </footer>
    );
}

export default Footer;
