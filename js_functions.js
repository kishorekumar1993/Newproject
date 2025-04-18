//async function saveFileToNestedFolder(folderPath, fileName, textContent) {
//    try {
//        // Ask the user to select a base directory
//        const rootHandle = await window.showDirectoryPicker();
//
//        // Split folder path into an array of folder names
//        const folders = folderPath.split("/");
//
//        // Traverse and create folders dynamically
//        let currentHandle = rootHandle;
//        for (const folder of folders) {
//            currentHandle = await currentHandle.getDirectoryHandle(folder, { create: true });
//        }
//
//        // Create and write the file inside the last folder
//        const fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
//        const writable = await fileHandle.createWritable();
//
//        // Write text content
//        await writable.write(textContent);
//        await writable.close();
//
//        console.log(`✅ File saved successfully at ${folderPath}/${fileName}`);
//        return "File saved successfully!";
//    } catch (error) {
//        console.error("❌ Error saving file:", error.name, error.message);
//        alert(`Error: ${error.name} - ${error.message}`); // Show error in a popup
//        return "Failed to save file.";
//    }
//}
async function saveMultipleFilesToFolders(jsonString) {
    try {
        console.log("🔄 Received JSON string:", jsonString);

        // Parse JSON string to a JavaScript array
        const fileDataArray = JSON.parse(jsonString);

        console.log("✅ Parsed file array:", fileDataArray);

        // Ask user to select a base directory
        const rootHandle = await window.showDirectoryPicker();

        for (const fileData of fileDataArray) {
            console.log("📂 Processing:", fileData);

            const { folderPath, fileName, textContent } = fileData;
            const folders = folderPath.split("/");

            let currentHandle = rootHandle;
            for (const folder of folders) {
                console.log(`📁 Checking/creating folder: ${folder}`);
                currentHandle = await currentHandle.getDirectoryHandle(folder, { create: true });
            }

            console.log(`📄 Creating file: ${fileName}`);
            const fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
            const writable = await fileHandle.createWritable();

            console.log("✍ Writing content...");
            await writable.write(textContent);
            await writable.close();

            console.log(`✅ File saved successfully: ${folderPath}/${fileName}`);
        }

        alert("All files have been saved successfully!");
    } catch (error) {
        console.error("❌ Error saving files:", error.name, error.message);
        alert(`Error: ${error.name} - ${error.message}`);
    }
}
