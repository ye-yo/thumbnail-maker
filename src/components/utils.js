function handleFileOnChange(e, callback) {
    e.preventDefault();
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        callback({ url: reader.result, name: file.name });
    }
    reader.readAsDataURL(file);
}

function getRgba({ r, g, b, a }) {
    return `rgba(${r},${g},${b},${a})`;
}

function getGradient({ form, direction, from, to }) {
    return `${form}-gradient(${form == "linear" ? `${direction}deg,` : ''} ${getRgba(from)}, ${getRgba(to)})`
}

export {
    handleFileOnChange,
    getRgba,
    getGradient,
}