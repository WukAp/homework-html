import html from "./table.html";
import './table.css'
import './status-cell.css'
import {APP_URL} from "../../resources/config";
import {fillRow} from "./rowConverter/ItemDataRowConverter";


const loadTemplate = () => fetch(`${APP_URL}/static/row.template.html`)
    .then(response =>
        response.text());

const loadTableData = () => fetch(`${APP_URL}/static/items.json`)
    .then(response => response.json())

const loadTable = () => Promise.all([
    loadTemplate(),
    loadTableData()
])

const createTable = (containerSelector = '#table-container') => {
    const rootElement = document.querySelector(containerSelector);
    rootElement.innerHTML = html;

    loadTable().then(([template, tableItems]) => {
        const rowTemplateElement = getTemplateRow(template);
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        for (const itemData of tableItems) {

            let row = rowTemplateElement.cloneNode(true);
            row = fillRow(row, itemData);
            tbody.append(row);
        }
    })
}

const addItem = (itemData) => {
    loadTemplate().then((template) => {
        const rowTemplateElement = getTemplateRow(template);
        const tbody = document.querySelector('tbody');

        let row = rowTemplateElement.cloneNode(true);
        row = fillRow(row, itemData);
        tbody.append(row);
    })
}


const getTemplateRow = (template) => {
    const templateElement = document.createElement('tbody');
    templateElement.innerHTML = template;

    return templateElement.querySelector('tr');
}

export {createTable, addItem}
