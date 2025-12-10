import React from "react";

export default function CartItem({ item, onChangeQty, onRemove }) {
  function dec() {
    const next = Math.max(1, item.qty - 1);
    onChangeQty(item.id, next);
  }
  function inc() {
    onChangeQty(item.id, item.qty + 1);
  }

  return (
    <div className="d-flex align-items-center gap-3 py-2 border-bottom">
      <img src={item.thumbnail} alt={item.title} style={{ width: 80, height: 80, objectFit: "cover" }} />
      <div className="flex-grow-1">
        <div className="fw-bold">{item.title}</div>
        <div className="text-muted small">₹{item.price.toLocaleString()}</div>
      </div>

      <div className="d-flex align-items-center">
        <div className="input-group" style={{ width: 120 }}>
          <button className="btn btn-outline-secondary btn-sm" type="button" onClick={dec}>−</button>
          <input
            type="number"
            className="form-control form-control-sm text-center"
            value={item.qty}
            min="1"
            onChange={(e) => {
              const v = Math.max(1, parseInt(e.target.value || 1));
              onChangeQty(item.id, v);
            }}
          />
          <button className="btn btn-outline-secondary btn-sm" type="button" onClick={inc}>+</button>
        </div>
        <button className="btn btn-sm btn-danger ms-2" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}
