const collectItemRowData = (row) => {
    return {
        id: row.id,
        name: row.querySelector('.name-cell').textContent,
        inn: row.querySelector('.inn-cell').textContent,
        address: row.querySelector('.address-cell').textContent,
        kpp: row.querySelector('.kpp-cell').textContent
    };
}

export {collectItemRowData}

