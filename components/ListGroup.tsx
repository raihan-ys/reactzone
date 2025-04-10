let items = [
  'Bukittinggi',
  'Padang',
  'Payakumbuh',
  'Padang Panjang'
];

items = [];

function ListGroup() {
  return (
    <>
      <h1 className="text-danger">List</h1>
      { items.length === 0 ? <p>No items found!</p> : null }
      <ul className="list-group">
        {items.map((item) => (
          <li key={item} className="list-group-item" style={{ color: 'orangered' }}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
