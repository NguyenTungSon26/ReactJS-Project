import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import { getProduct, getCommentsProduct, createCommentProduct } from "../../services/Api";
import moment from "moment/moment";
import { getImageProduct } from "../../shared/ultils";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
    const [product, setProduct] = React.useState({});
    const [comments, setComments] = React.useState([]);
    const [data, setData] = React.useState({});
    const params = useParams();
    const id = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getComments = (id) => {
        getCommentsProduct(id, {}).then(({ data }) => {
            return setComments(data.data.docs);
        });
    }
    useEffect(() => {
        // Get Product
        getProduct(id, {}).then(({ data }) => {
            return setProduct(data.data);
        });
        // Get Comments
        getComments(id);
    }, [id]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        return setData({ ...data, [name]: value });
    }

    const onSubmitComment = (e) => {
        e.preventDefault();
        createCommentProduct(id, data, {}).then(({ data }) => {
            if (data.status === "success") {
                getComments(id);
                return setData({});
            }

        });
    }

    const addToCart = (type)=>{
        if(product){
            const {_id, name, price, image} = product;
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    _id,
                    name,
                    price,
                    image,
                    qty: 1,
                }
            });
        }
        if(type==="buy-now"){
            navigate("/Cart");
        }
    }

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div id="product">
                    <div id="product-head" className="row">
                        <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                            <img src={getImageProduct(product?.image)} />
                        </div>
                        <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                            <h1>{product?.name}</h1>
                            <ul>
                                <li><span>B???o h??nh:</span> {product?.warranty}</li>
                                <li><span>??i k??m:</span> {product?.accessoories}</li>
                                <li><span>T??nh tr???ng:</span> {product?.status}</li>
                                <li><span>Khuy???n M???i:</span> {product?.promotion}</li>
                                <li id="price">Gi?? B??n (ch??a bao g???m VAT)</li>
                                <li id="price-number">{product?.price}??</li>
                                {
                                    product?.is_stock
                                        ? <li id="status">C??n h??ng</li>
                                        : <li className="text-danger" id="status">H???t h??ng</li>

                                }

                            </ul>
                            <div id="add-cart">
                                <button onClick={()=>addToCart("buy-now")} className="btn btn-warning mr-2">
                                    Mua ngay
                                </button>

                                <button onClick={addToCart} className="btn btn-info">
                                    Th??m v??o gi??? h??ng
                                </button>
                            </div>

                        </div>
                    </div>
                    <div id="product-body" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>????nh gi?? v??? {product?.name}</h3>
                            {product?.details}
                        </div>
                    </div>
                    {/*	Comment	*/}
                    <div id="comment" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>B??nh lu???n s???n ph???m</h3>
                            <form method="post">
                                <div className="form-group">
                                    <label>T??n:</label>
                                    <input
                                        onChange={onChangeInput}
                                        name="name"
                                        required type="text"
                                        className="form-control"
                                        value={data.name || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        onChange={onChangeInput}
                                        name="email"
                                        required type="email"
                                        className="form-control" id="pwd"
                                        value={data.email || ""} />
                                </div>
                                <div className="form-group">
                                    <label>N???i dung:</label>
                                    <textarea
                                        onChange={onChangeInput}
                                        name="content"
                                        required rows={8}
                                        className="form-control"
                                        value={data.content || ""} />
                                </div>
                                <button onClick={onSubmitComment} type="submit" name="sbm" className="btn btn-primary">G???i</button>
                            </form>
                        </div>
                    </div>
                    {/*	End Comment	*/}
                    {/*	Comments List	*/}
                    {
                        comments.length && (
                            <div id="comments-list" className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    {
                                        comments.map((comment, index) => {
                                            const m = moment(comment.createdAt);
                                            return (
                                                <div className="comment-item">
                                                    <ul>
                                                        <li><b>{comment.name}</b></li>
                                                        <li>{m.fromNow()}</li>
                                                        <li>
                                                            {comment.content}
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        }

                                        )
                                    }


                                </div>
                            </div>
                        )
                    }
                    {/*	End Comments List	*/}
                </div>
                {/*	End Product	*/}
                <div id="pagination">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang tr?????c</a></li>
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
export default ProductDetails;