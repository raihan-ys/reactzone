import { useState } from "react";

// A props is an object that contains the properties passed to a component like input.
interface Props {
  heading: string;
  items: string[];
  onSelectItem: (item:string) => void;
}

function ListGroup({ heading, items, onSelectItem } : Props) {
  /*
   * First element is a state variable, the second element is an updater function.
   * useState is a hook (built-in react function) that allows you to add state to a functional component.
   */  
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1 className="text-danger">{heading}</h1>

      {items.length == 0 && <p className="text-danger">No items found!</p>}
      
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index 
              ? 'list-group-item bg-danger text-white' 
              : 'list-group-item text-danger'
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }} >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;