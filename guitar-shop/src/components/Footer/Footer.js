import { NavLink } from "react-router-dom"
import MainLogo from "../../assets/logos/MainLogo.png"
import youtube_logo_white from "../../assets/logos/youtube_logo_white.png"
import instagram_logo_white from "../../assets/logos/instagram_logo_white.png"
import twitter_logo_white from "../../assets/logos/twitter_logo_white.png"
import phone_icon from "../../assets/icons/phone_icon.png"
import clock_icon from "../../assets/icons/clock_icon.png"
import image_guitar_footer from "../../assets/images/image_guitar_footer.png"
import "./Footer.css"

export const Footer = () => {
    return (
        <>
        <div className="FooterBlock">
        <img className="image_guitar_footer" src={image_guitar_footer} alt="image-guitar_footer" />
        </div>
        <div className="MainFooterBlock">
            <div className="footer_logos">
                <nav className="footer_main_logo">
                    <NavLink to="./">
                        <img className="main_logo" src={MainLogo} alt="MainLogo" />
                    </NavLink>
                </nav>
                <nav className="social_logos">
                        <NavLink className="social_logo" to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                            <img className="youtube_logo_white" src={youtube_logo_white} alt="youtube_logo" />
                        </NavLink>
                        <NavLink className="social_logo" to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                            <img className="instagram_logo_white" src={instagram_logo_white} alt="instagram_logo"/>
                        </NavLink>
                        <NavLink className="social_logo" to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                            <img className="twitter_logo_white" src={twitter_logo_white} alt="twitter_logo" />
                        </NavLink>
                </nav>
            </div>
            <div className="footer_text_info">
                <div className="footer_about_us">
                    <h3>Про нас</h3>
                    <p>
                        Магазин гітар, музичних інструментів
                        та гітарна майстерня у Львові
                    </p>
                    <p> Усі інструменти перевірені та налаштовані ідеально</p>
                </div>
                <div className="footer_catalog">
                    <h3>Каталог</h3>
                    <a href="">Акустичні гітари</a>
                    <a href="">Класичні гітари</a>
                    <a href="">Електрогітари гітари</a>
                    <a href="">Бас-гітари</a>
                    <a href="">Укулеле</a>
                </div>
                <div className="footer_questions">
                    <h3>Інформація</h3>
                    <a href="">Де купити</a>
                    <a href=""> Блог</a>
                    <a href="">Питання - відповідь</a>
                    <a href="">Повернення</a>
                    <a href="">Сервіс-центри</a>
                </div>
                <div className="footer_contacts">
                    <h3>Контакти</h3>
                    <p>
                        м. Київ, <br/>
                        вул. Хрещатик,<br />
                        <img className="phone_icon" src={phone_icon} alt="phone_icon" /> 010-555-00<br />
                    </p>
                    <p>
                        Графік роботи: <br />
                        <img className="clock_icon" src={clock_icon} alt="clock_icon" /> з 11:00 до 20:00, <br />
                        Без вихідних.
                    </p>
                </div>
            </div>
        </div>
        
        
    </>
    )
}