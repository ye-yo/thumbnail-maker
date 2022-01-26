export default function handleFileOnChange(e, callback) {
    e.preventDefault();
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        callback({ url: reader.result, name: file.name });
    }
    reader.readAsDataURL(file);
}

export function getRgba({ r, g, b, a }) {
    return `rgba(${r},${g},${b},${a})`;
}