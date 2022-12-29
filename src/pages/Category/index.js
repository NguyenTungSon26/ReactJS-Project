import React, { useEffect } from "react";
import { getCategory, getProductsCategory } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import { useParams } from "react-router-dom";
const Category = () => {
    const [category, setCategory] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const [totalProduct, setTotalProduct] = React.useState(0);
    const params = useParams();
    const id = params.id;
    useEffect(()=>{
        // Get Category
        getCategory(id, {}).then(({data})=>{
            return setCategory(data.data);
        });
        // Get Total Product
        getProductsCategory(id, {}).then(({data})=>{
            return setTotalProduct(data.data.items.total);
        });
        // Get Products By Category ID
        getProductsCategory(id, {}).then(({data})=>{
            return setProducts(data.data.docs);
        });
        
    }, [id]);
    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <h3>{category?.name} (hiện có {totalProduct} sản phẩm)</h3>
                    <div className="product-list card-deck">
                        {products?.map((value, index)=>
                            <ProductItem item={value}/>
                        )}
                    </div>
                    
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                    </ul>
                </div>
            </div>

        </>
    )
}
export default Category;