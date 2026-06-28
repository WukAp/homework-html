import html from "./app.html";
import {createTable} from "./table/table";


const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

createTable('#table-container')
