
import { useState } from 'react';

function ShoppingList() {
    
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [removeItemNumber, setRemoveItemNumber] = useState('');
    const [isVisible , setIsVisible] = useState(false);
    function handleAddItem(event) {
        event.preventDefault();

        const trimmedName = newItemName.trim();

        if (trimmedName === '') {
            return;
        }

        const newItem = {
            id: crypto.randomUUID(),
            name: trimmedName,
            purchased: false
        };

        setItems(previousItems => [...previousItems, newItem]);

        setNewItemName('');
    }

    function handleRemoveItem(event) {
        event.preventDefault();

        const itemNumber = Number(removeItemNumber);

        if (
            !Number.isInteger(itemNumber) ||
            itemNumber < 1 ||
            itemNumber > items.length
        ) {
            return;
        }

        setItems(previousItems =>
            previousItems.filter((item, index) => index !== itemNumber - 1)
        );

        setRemoveItemNumber('');
    }

    function handleClearList() {
        setItems([]);
    }

    function handlePurchaseItem(itemId){
        setItems(previousItems =>
            previousItems.map(item=>
                item.id === itemId ? {...item, purchased : !item.purchased} : item
            )
        )
    }
    function handleToggleStatsDisplay(){
        setIsVisible(prevValue => !prevValue);
    }

    return (
        <main className="shopping-app">
            <section className="shopping-card">
                <h1>Shopping List</h1>

                <div className="shopping-actions">
                    <button
                        type="button"
                        className="shopping-button danger"
                        onClick={handleClearList}
                        disabled={items.length === 0}
                    >
                        Clear List
                    </button>

                    <button
                        type="button"
                        className="shopping-button secondary"
                        onClick={handleToggleStatsDisplay}
                    >
                        {isVisible ? 'Hide Stats' : 'Show Stats'}
                    </button>
                </div>

                <form className="shopping-form" onSubmit={handleAddItem}>
                    <input
                        className="shopping-input"
                        type="text"
                        placeholder="Add an item"
                        value={newItemName}
                        onChange={event => setNewItemName(event.target.value)}
                    />

                    <button className="shopping-button" type="submit">
                        Add Item
                    </button>
                </form>

                <form className="shopping-form" onSubmit={handleRemoveItem}>
                    <input
                        className="shopping-input"
                        type="number"
                        min="1"
                        max={items.length || 1}
                        step="1"
                        placeholder="Enter item number"
                        value={removeItemNumber}
                        onChange={event => setRemoveItemNumber(event.target.value)}
                    />

                    <button
                        className="shopping-button secondary"
                        type="submit"
                        disabled={items.length === 0}
                    >
                        Remove Item
                    </button>
                </form>

                {items.length > 0 ? (
                    <ul className="shopping-list">
                        {items.map((item, index) => (
                            <li className="shopping-item" key={item.id}>
                                <span
                                    className={
                                        item.purchased
                                            ? 'shopping-item-name purchased'
                                            : 'shopping-item-name'
                                    }
                                >
                                    {index + 1}. {item.name}
                                </span>

                                <button
                                    className="shopping-button purchase-button"
                                    type="button"
                                    onClick={() => handlePurchaseItem(item.id)}
                                >
                                    {item.purchased ? 'Undo' : 'Purchase'}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="shopping-empty">Your shopping list is empty.</p>
                )}

                {isVisible ? (
                    <ul className="shopping-stats">
                        <li className="shopping-stat">
                            <strong>{items.length}</strong>
                            <span>Items</span>
                        </li>
                        <li className="shopping-stat">
                            <strong>{items.filter(item => item.purchased).length}</strong>
                            <span>Purchased</span>
                        </li>
                        <li className="shopping-stat">
                            <strong>{items.filter(item => !item.purchased).length}</strong>
                            <span>Remaining</span>
                        </li>
                    </ul>
                ) : (
                    <p className="stats-hidden">Stats are hidden</p>
                )}
            </section>
        </main>
    );
}

export default ShoppingList;
