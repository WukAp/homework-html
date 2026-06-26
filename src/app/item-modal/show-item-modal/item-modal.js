import html from "./item-modal.html";
import '../item-modal.css'
import {Modal} from "flowbite";
import {toDigitInput, validateInput} from "../utils/inputUtils";
import {collectItemRowData} from "../../table/rowConverter/RowItemDataConverter";
import {fillRowData} from "../../table/rowConverter/ItemDataRowConverter";

const initShowItemModal = () => {
    document.body.insertAdjacentHTML('beforeend', html);
    new Modal(document.getElementById('show-item-modal'), { backdrop: 'static' });

    toDigitInput(document.getElementById('show-item-inn'));
    toDigitInput(document.getElementById('show-item-kpp'));
};

const changeModalItem = (row) => {
    const itemData = collectItemRowData(row)
    const modalElement = document.getElementById('show-item-modal');
    const nameInput = modalElement.querySelector('#show-item-name');
    const innInput = modalElement.querySelector('#show-item-inn');
    const addressInput = modalElement.querySelector('#show-item-address');
    const kppInput = modalElement.querySelector('#show-item-kpp');
    const saveButton = modalElement.querySelector('#show-item-save-button');

    innInput.classList.remove('error-input');
    kppInput.classList.remove('error-input');

    nameInput.value = itemData.name;
    innInput.value = itemData.inn;
    addressInput.value = itemData.address;
    kppInput.value = itemData.kpp;

    if (saveButton._saveHandler) {
        saveButton.removeEventListener('click', saveButton._saveHandler);
    }

    saveButton._saveHandler = function () {
        const inn = innInput.value;
        const kpp = kppInput.value;

        if (!validateInput(inn, innInput, kpp, kppInput)) {
            return
        }
        const currentItemData = {
            id: itemData.id,
            name: nameInput.value,
            inn: inn,
            address: addressInput.value,
            kpp: kpp
        };
        fillRowData(row, currentItemData);
        row.id = currentItemData.id;
        modal.hide();
    };

    saveButton.addEventListener('click', saveButton._saveHandler);

    const modal = window.FlowbiteInstances.getInstance('Modal', 'show-item-modal');
    modal.show();
    return row;
}

export {initShowItemModal, changeModalItem}
