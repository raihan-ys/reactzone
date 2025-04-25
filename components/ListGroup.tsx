import { useState } from "react";

function ListGroup() {
  let items = ['Padang', 'Bukittingi', 'Payakumbuh', 'Pariaman'];
  let selectedIndex = -1;
  // Hook (state hook). This will return an array.
  const arr = useState(-1);
  arr[0] = selectedIndex; // variable selectedIndex
  arr[1] // updater function
    
  return (
    <>
      <h1 className="text-danger">List</h1>

      { items.length == 0 && <p className="text-danger">No items found!</p> }
      <ul className="list-group">
        {items.map((item, index) => (
          <li 
            key={item} 
            className={ selectedIndex === index ? 'list-group-item bg-secondary' : 'list-group-item' } 
            style={{ color: 'orangered' }}
            onClick={() => selectedIndex = index  }>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
