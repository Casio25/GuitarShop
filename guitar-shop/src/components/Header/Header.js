import { NavLink } from "react-router-dom";

export const Header = () => {
    const headerTextNames = ["Каталог", "Де придбати?", "Про нас", "Сервіс центри"];
    const headerTextLinks = ["/.", "/where_to_buy", "/about_us", "/service_centers" ];

    return (
        <>
        <div className="HeaderBlock">
            <nav className="header_main_logo">
                <NavLink></NavLink>
            </nav>
            <nav className="header_text_links">
                {headerTextNames.map((headerTextName, index) =>(
                    <NavLink key={headerTextName} to ={headerTextLinks[index]}>
                        {headerTextName}
                    </NavLink>
                ))}
            </nav>
        </div>
        </>
    );

}