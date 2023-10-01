import React, { useState } from "react";

const App = () => {
  const [jsonData, setJsonData] = useState(null);

  // Function to convert CSV data to JSON format
  const convertCSVToJson = (csvData) => {
    const lines = csvData.split("\n");

    // Extract the column headers from the first line
    const headers = lines[0].split(",");
    const result = [];

    // Loop through each line of CSV data (excluding the headers)
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      // Loop through each column and map it to the corresponding header
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim();
      }

      result.push(obj);
    }
    return result;
  };

  // Function to handle the file input change event
  const handleCSVInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;

      // Call the function to conversion CSV to JSON 
      const jsonData = convertCSVToJson(csvData);
      setJsonData(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <div className="card">
      <input type="file" accept=".csv" onChange={handleCSVInputChange} />

      {/* Conditional rendering based on whether JSON data is available */}
      {jsonData ? (
        <div className="json-container">
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      ) : (
        // Display a message when no file is selected
        <p>Please select a CSV file.</p>
      )}
    </div>
  );
};

export default App;
