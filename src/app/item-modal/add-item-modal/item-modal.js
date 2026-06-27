import html from "./item-modal.html";
import '../item-modal.css'
import {toDigitInput, validateInput} from "../utils/inputUtils";
import {addItem} from "../../table/table";


const initAddItemModal = () => {
    document.body.insertAdjacentHTML('beforeend', html);

    toDigitInput(document.getElementById('add-item-inn'));
    toDigitInput(document.getElementById('add-item-kpp'));
    initModalItem();
};

const initModalItem = () => {
    const modalElement = document.getElementById('add-item-modal');

    //очищать каждый раз при открытии - костыль, уйдёт в реакте
    window.addEventListener('load', () => {
        const modal = window.FlowbiteInstances.getInstance('Modal', 'add-item-modal');
        modal.updateOnShow(() => {
            modalElement.querySelectorAll('input').forEach((input) => {
                input.value = '';
                input.classList.remove('error-input');
            });
        });
    });

    const nameInput = modalElement.querySelector('#add-item-name');
    const innInput = modalElement.querySelector('#add-item-inn');
    const addressInput = modalElement.querySelector('#add-item-address');
    const kppInput = modalElement.querySelector('#add-item-kpp');
    const saveButton = modalElement.querySelector('#add-item-save-button');

    if (saveButton._saveHandler) {
        saveButton.removeEventListener('click', saveButton._saveHandler);
    }

    saveButton._saveHandler = function () {
        const inn = innInput.value;
        const kpp = kppInput.value;
        if (!validateInput(inn, innInput, kpp, kppInput)) {
            return
        }
        const id = crypto.randomUUID();
        const currentItemData = {
            id: id,
            name: nameInput.value,
            inn: inn,
            address: addressInput.value,
            kpp: kpp
        };
        addItem(currentItemData);

        const modal = window.FlowbiteInstances.getInstance('Modal', 'add-item-modal');
        modal.hide();
    };

    saveButton.addEventListener('click', saveButton._saveHandler);
}

export {initAddItemModal}
