
export function readLocal(localFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(JSON.parse(reader.result));
        }

        reader.onerror = () => {
            reject("Error")
        }
        reader.readAsText(localFile);
    })
}

export function dataIsNull(data) {
    return data === null;
}
