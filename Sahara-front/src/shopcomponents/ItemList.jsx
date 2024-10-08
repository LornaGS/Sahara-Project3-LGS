import React from 'react';
import ItemCard from '../shopcomponents/ItemCard';

/**
 * The ItemList component renders a list of ItemCard components based on the provided items array.
 * It handles cases where the items prop is not an array and displays a message if no items are available.
 * 
 */
const ItemList = ({ items }) => {
    if (!Array.isArray(items)) {
        console.error('Expected items to be an array');
        return null;
    }

    return (
        <div className="item-list" role="list">
            {items.length > 0 ? (
                items.map((item) => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        quantity={item.quantity}
                    />
                ))
            ) : (
                <p className='noitems'>No items available</p>
            )}
        </div>
    );
};

export default ItemList;
