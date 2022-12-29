import React, { useEffect } from "react";
import ProductItem from "../../shared/components/product-item";
import { getProducts } from "../../services/Api";
import { useSearchParams, useLocation } from "react-router-dom";
import Pagination from "../../shared/components/Pagination";
const Search = () => {
    const [products, setProducts] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const page = searchParams.get("page") || 1;
    const [pages, setPages] = React.useState({
        total: 0,
        limit: 12,
        currentPage: page,
    });

    useEffect(() => {
        getProducts({
            params: {
                page: page,
                name: keyword,
                limit: 12,
            }
        }).then(({ data }) => {
            console.log(data);
            setProducts(data.data.docs);
            setPages({ ...pages, ...data.data.pages });

        });
    }, [keyword, page]);
    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
                    <div className="product-list card-deck">
                        {
                            products.map((value, index) =>
                                <ProductItem item={value} />
                            )
                        }
                    </div>

                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <Pagination pages={pages}/>
                </div>
            </div>

        </>
    )
}
export default Search;