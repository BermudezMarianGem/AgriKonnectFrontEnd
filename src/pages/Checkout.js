import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarCustomer from "./NavbarCustomer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Checkout() {
  let customer = JSON.parse(localStorage.getItem("user-info"));
  localStorage.setItem("customer", JSON.stringify(customer));


  const location = useLocation();
  const state = location.state;
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderItem, setOrderItem] = useState([])
  //const [cart, setCart] = useState(state);

  console.log(state);

  const cartId = state.selectedItems[0].id;
  const sellerId = state.selectedItems[0].seller_id;
  const productId = state.selectedItems[0].product_id;
  const productName = state.selectedItems[0].name;
  const productQty = state.selectedItems[0].fruits_qty;
  const total_price = state.total;
  const price = state.selectedItems[0].price;
  const shippingfee = state.shippingFee;
  const grandtotal = (state.shippingFee + state.total);

  console.log(price)
  const [checkoutInput, setCheckoutInput] = useState({
    shippingaddress: "",
    mobilephone: "",
    modeofpayment: "",
  });

  const [error, setError] = useState([]);
  //const [orderData, setCustomer] = useState(state);

  //var totalCartPrice = 0;

  /*useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/checkout/${cart_id}`).then((res) => {
      if (res.status === 200) {
        setCustomer(res.data.customer);
        setCart(res.data.cart);
        setLoading(false);
      }
    });
  }, [cart_id]);*/


  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };
  

  const submitOrder = (e) => {
    e.preventDefault();

    const orders = {
      cart_id: cartId,
      seller_id: sellerId,
      order_name: productName,
      price: price,
      product_id: productId,
      product_qty: productQty,
      shippingfee: shippingfee,
      total_price: grandtotal,
      firstname: customer.firstname,
      middlename: customer.middlename,
      lastname: customer.lastname,
      shippingaddress: checkoutInput.shippingaddress,
      mobilephone: checkoutInput.mobilephone,
      modeofpayment: checkoutInput.modeofpayment,
      customerId: customer.id,

    };

    console.log(orders)


    axios.post(`http://localhost:8000/api/place-order`, orders).then((res) => {
      if (res.data.status === 200) {
        swal("Order Placed Successfully", res.data.message, "Success");
        setError([]);
        history("/basket");
      } else if (res.data.status === 422) {
        swal("All fields are mandatory", "", "error");
        setError(res.data.errors);
      }
    });
  };

  /*if (loading) {
    return <h4>Loading Checkout Details...</h4>;
  }*/
  var checkOutDetails = "";
  checkOutDetails = state.selectedItems.map( (item, idx) => {
    return(
      <div className="col-md-12" key={idx}>
        <div className="card">
          <h5>{item.name}</h5>
          <h6>Quantity: {item.fruits_qty}</h6>
          <h6>Price: {item.price}</h6>
        </div>
      </div>
    )
  })
  //totalCartPrice += data.price * data.fruits_qty;
  /*
        var showCheckOutDetails = "";
        showCheckOutDetails = cart.map( (item, idx) => {
            totalCartPrice += item.price * item.fruits_qty;
            return(
                <div className='col-md-12' key={idx}>
                    <div className='card'>
                        <div className='card-body'>
                            <h6>{item.name}</h6>
                            <h6>Php: {item.price * item.fruits_qty}.00</h6>
                        </div>
                    </div>
                    <br></br>
                    <div  className="form-group mb-3">
                        <div className="material-textfield">
                            <input placeholder=" " name="address" type="text"/>
                        <label>Shipping Address</label>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="material-textfield">
                        <select name="modeofpayment" id="modeofpayment"  className="form-control">
                            <option value="default" selected hidden>Select mode of payment</option>
                            <option value = "Cash on Delivery">Cash on Delivery (pay when you receive) </option>
                                <option value = "Online Payment">Online Payment (Thru Gcash)</option>
                        </select>
                        </div>
                    </div>
                    <div  className="form-group mb-3">
                        <div className="material-textfield">
                            <input placeholder=" " name="voucher" type="text"/>
                        <label>Enter your voucher code</label>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <p>Order Amount: {totalCartPrice}</p>
                    </div>
                        <div className="form-group mb-3">
                            <p>Subtotal: {totalCartPrice}</p>
                        </div>
                    </div>
            )
        });*/

  return (
    <>
      <NavbarCustomer />
      <div>
        <h5>Checkout Details</h5>
        <Link to="/basket" className="btn btn-primary">
          Back
        </Link>
        <form>
          <div className="py-4">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            {checkOutDetails}

                            <div className="form-group mb-3">
                              <input
                                type="text"
                                name="shippingaddress"
                                onChange={handleInput}
                                value={checkoutInput.shippingaddress}
                                className="form-control"
                                placeholder="Enter Shipping Address"
                              />
                              <small className="text-danger">
                                {error.shippingaddress}
                              </small>
                            </div>
                            <div className="form-group mb-3">
                              <select
                                type="text"
                                id="modeofpayment"
                                name="modeofpayment"
                                onChange={handleInput}
                                value={checkoutInput.modeofpayment}
                                className="form-control"
                                placeholder="Choose mode of payment"
                              >
                                <option value="default" selected hidden>
                                  Select Payment Method
                                </option>
                                <option value="Cash on Delivery">
                                  Cash on Delivery (pay when you order)
                                </option>
                                <option value="Online Payment">
                                  Online Payment (Gcash)
                                </option>
                              </select>
                              <small className="text-danger">
                                {error.modeofpayment}
                              </small>
                            </div>
                            <div className="form-group mb-3">
                              <input
                                type="text"
                                name="mobilephone"
                                onChange={handleInput}
                                value={checkoutInput.mobilephone}
                                className="form-control"
                                placeholder="Mobile Phone"
                              />
                              <small className="text-danger">
                                {error.mobilephone}
                              </small>
                            </div>
                            <p>Shipping Fee: Php {shippingfee}.00</p>
                            <p>Subtotal: Php {total_price}.00</p>
                            <p>Total (including shipping fee): Php {grandtotal}.00</p>
                            <hr />
                            <Link
                              to="/placeorder"
                              className="btn btn-primary"
                              onClick={submitOrder}
                            >
                              Place Order
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Checkout;
