import * as uuid from 'uuid';

function newServRow(attrs = {}) {
  const serv_row = {
    title: attrs.title || '',
    price: attrs.price || '',
    count: attrs.count || '',
    id: uuid.v4(),
  };

  return serv_row;
}

function newMaterialRow(attrs = {}) {
  const material_row = {
    price: attrs.price || 0,
    count: attrs.count || 0,
    id: uuid.v4(),
    item_id: attrs.item_id || ''
  };

  return material_row;
}

export default {
  newServRow,
  newMaterialRow
}