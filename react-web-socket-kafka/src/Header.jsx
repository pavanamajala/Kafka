import React from 'react';

const Header = () => {
    return (
        <header className="header">
            {/* Home link on the right */}
            <a href="/" className="header-home">
                Home
            </a>
            
            {/* Title in the middle */}
            <div className="header-title">Online Message Sender Application</div>

            {/* Empty space for alignment on the left */}
            <div></div>
        </header>
    );
};

export default Header;
