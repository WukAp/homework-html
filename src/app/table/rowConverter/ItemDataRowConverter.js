import {changeModalItem} from "../../item-modal/show-item-modal/item-modal";

const fillRow = (row, itemData) => {
    row = fillRowData(row, itemData);
    const deleteButton = row.querySelector('.remove-button');
    row.id = itemData.id;
    row.addEventListener('click', () => {
        changeModalItem(row)
    })
    deleteButton.addEventListener('click', (e) => {
        row.remove();
        e.stopPropagation();
    })
    return row;
}

const fillRowData = (row, itemData) => {
    const nameCell = row.querySelector('.name-cell');
    const innCell = row.querySelector('.inn-cell');
    const addressCell = row.querySelector('.address-cell');
    const kppCell = row.querySelector('.kpp-cell');
    row.id = itemData.id;
    nameCell.innerHTML = itemData.name;
    innCell.innerHTML = itemData.inn;
    addressCell.innerHTML = itemData.address;
    kppCell.innerHTML = itemData.kpp;
    return row;
}

export {fillRow, fillRowData}
