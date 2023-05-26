import MainLogo from "../../assets/logos/MainLogo.png"
import { offers } from "../../components/FakeData";
export const Catalog = () => {
    return (
        <>
        <div className="CatalogBlock">
            <p>some text</p>
                <img className="main_logo" src={MainLogo} alt="Main Logo" />
        </div>
        <div>
            {offers.map((offers, index) =>(
                <img className="image+test" src={offers.photo} alt="photo"/>
            ))}
        </div>
        <div className="filterObject">
            
        </div>
        </>
    );
}