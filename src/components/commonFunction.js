export default function handleFileOnChange(e, callback) {
    e.preventDefault();
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        console.log(callback)
        callback({ url: reader.result, name: file.name });
    }
    reader.readAsDataURL(file);
}