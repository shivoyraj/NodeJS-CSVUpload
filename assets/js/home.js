var allFiles;
window.onload = async function(){
    const response = await fetch('/getAllUploadedCSV');
    if (response.ok) {
        const jsonData = await response.json();
        allFiles = jsonData;
        console.log(allFiles);
    } else {
        console.error('Fetch failed with status code: ' + response.status);
    }
}
