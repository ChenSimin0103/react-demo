import React from "react";

const ListGroup = props => {
  const {
    items,
    selectedItem,
    textProperty = "name",
    valueProperty = "_id",
    onItemSelect
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={selectedItem === item?"list-group-item active":"list-group-item"}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

// 加入props属性的默认值 ，也可在 解构 props 时给初值
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
