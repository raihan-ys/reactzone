const items = [
  'Bukittinggi',
  'Padang',
  'Payakumbuh',
  'Padang Panjang'
];

function ListGroup() {
  return (
    <>
      <h1 className="text-primary">List</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item} className="list-group-item text-danger">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
