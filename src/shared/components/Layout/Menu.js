import {Link} from "react-router-dom";

const Menu = ({item}) => {
    return (
        <>
            <nav>
                <div id="menu" className="collapse navbar-collapse">
                    <ul>
                        {item.map((category, index)=>
                            <li key={index} className="menu-item"><Link to={`/Category-${category._id}`}>{category.name}</Link></li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Menu;