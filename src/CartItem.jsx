import React , { useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, updateCartSummary } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);

    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        let totalAmnt = 0;
        cart.map(item => (
            totalAmnt = totalAmnt + item.quantity * parseFloat(item.cost.substring(1))
        ))
        return totalAmnt;
    };

    const handleContinueShopping = (e) => {
        onContinueShopping(false);
    };



    const handleIncrement = (item) => {
        let name_it = item.name
        let qtd_it = item.quantity + 1;
        dispatch(updateQuantity({name_it,qtd_it}))
        dispatch(updateCartSummary());

    };

    const handleDecrement = (item) => {
        let name_it = item.name
        let qtd_it = item.quantity - 1;

        if (item.quantity - 1 > 0) {
            dispatch(updateQuantity({name_it, qtd_it}))
        } else {
            dispatch(removeItem(item));
        }
        dispatch(updateCartSummary());

    };

    const handleRemove = (item) => {
        dispatch(removeItem(item));
    };
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };
    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        return item.quantity * parseFloat(item.cost.substring(1));
    };

    useEffect(() => {
        dispatch(updateCartSummary());
      }, [cart, dispatch]);

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button disabled={item.quantity===0} className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1">Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;


