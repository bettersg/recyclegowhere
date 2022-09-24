export default async function getSheetData(url: string, sheetName: string) {
    const respones = await fetch(url);
    const rawData = await respones.json();
    const jsonData = await rawData[sheetName];

    const returnArray = [];
    for (let i = 0; i < jsonData; i++) {
        const newItem = jsonData[i];
        returnArray.push(newItem);
    };

    return returnArray;
}