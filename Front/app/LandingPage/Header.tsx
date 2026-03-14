"use client";
interface HeaderProps {
    text: String,
}


function Header({text}:HeaderProps) {
    return (
        <div className="header-container">
            <div className="header-title">{text}</div>
        </div>
    )
}

export default Header