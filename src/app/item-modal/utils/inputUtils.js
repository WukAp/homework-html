const toDigitInput = (inputElement) => {
    inputElement.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        inputElement.classList.remove('error-input');
    });
}

const validateInput = (inn, innInput, kpp, kppInput) => {
    const isValidInn = isValidInnValue(inn);
    const isValidKpp = isValidKppValue(kpp);
    if (!isValidInn) {
        innInput.classList.add('error-input');
    }
    if (!isValidKpp) {
        kppInput.classList.add('error-input');
    }
    return isValidInn && isValidKpp
}

const isValidInnValue = (inn) => {
    return inn && inn.length === 11 && /^[0-9]+$/.test(inn);
}

const isValidKppValue = (kpp) => {
    return kpp && kpp.length === 9 && /^[0-9]+$/.test(kpp);
}


export {toDigitInput, validateInput}
