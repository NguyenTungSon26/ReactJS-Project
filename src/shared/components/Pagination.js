import React from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
const Pagination = ({ pages }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {pathname, search} = useLocation();
    const {total, limit, currentPage, hasNext, hasPrev, next, prev} = pages;
    const totalPages = Math.ceil(total/limit);

    const formatUrl = (page) => {
        return `${pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
    } 
    
    const renderPagesHTML = (delta=2)=>{
        const pagesHtml = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for(let i=1; i<=totalPages; i++){
            if(
                i===1 ||
                i===currentPage ||
                i===totalPages ||
                (i>=left && i<=right)
            ){
                pagesHtml.push(i);
            }
        }
        return pagesHtml;
    }

    return (
        <ul className="pagination">
		{
			hasPrev
				? <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li>
				: null
		}

		{
			renderPagesHTML().map((page, index)=>
				<li className={`page-item ${page===currentPage && 'active'}`}><Link className="page-link" to={formatUrl(page)}>{page}</Link></li>
			)
		}

		{
			hasNext
				? <li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang sau</Link></li>
				: null
		}
	</ul>

    )
}
export default Pagination;