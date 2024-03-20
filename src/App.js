import App_style from "./App_style.css";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import Card from "./Card";

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setfileName] = useState(null);
  const [sheetName, setSheetName] = useState([]);
  const [sheetData, setSheetData] = useState({});
  const [finalData, setFinalData] = useState([]);
  const conData = [];

  const fileRef = useRef();
  const acceptableFileName = ["xlsx", "xls"];

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  const readDataFromExcel = (data) => {
    const wb = XLSX.read(data);
    setSheetName(wb.SheetNames);

    const mySheetData = {};

    for (let i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];

      const worksheet = wb.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        blankrows: "",
        header: 1,
      });

      mySheetData[sheetName] = jsonData;
    }

    setSheetData(mySheetData);
    // console.log(sheetData.Arkusz1[1]);
    // window.open(sheetData.Arkusz1[1][3], "_blank");
  };

  const convertData = (sheetData) => {
    sheetData.forEach((line) => {
      conData.push(line);
    });

    // console.log(conData);
  };

  const handleFile = async (e) => {
    const myFile = e.target.files[0];
    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      alert("Invalid File Type");
      return;
    }

    //read the xlsx metaData
    const data = await myFile.arrayBuffer();

    readDataFromExcel(data);
    setFile(myFile);
    setfileName(myFile.name);
  };

  if (fileName != null) {
    let obj = {};
    convertData(sheetData.Arkusz1);

    // sheetData.Arkusz1.forEach((h, i) => {
    //   // console.log(i);
    //   // console.log(h);
    //   obj = {
    //     asin: conData[i][0],
    //     productId: conData[i][1],
    //     title: conData[i][2],
    //     amazonLink: conData[i][3],
    //     kod: conData[i][4],
    //     linkDoKarty: conData[i][5],
    //     nazwa: conData[i][6],
    //     ...obj,
    //   };
    // });

    // console.log(obj);
  }

  const handleExport = () => {
    console.log(conData);
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.aoa_to_sheet(conData);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const handleRemove = () => {
    setFile(null);
    setfileName(null);
    fileRef.current.value = "";
  };
  return (
    <div className="App">
      <p>{fileName && "File name: " + fileName}</p>
      <p>{!fileName && "Please Upload a File"}</p>
      <input
        type="file"
        accept="xlsx, xls"
        multiple={false}
        onChange={(e) => handleFile(e)}
        ref={fileRef}
      />
      {fileName && (
        <>
          <button onClick={handleRemove}>Delete</button>
          <button onClick={handleExport}>Export</button>
        </>
      )}

      {fileName && (
        <div>
          {sheetData.Arkusz1.map((h, i) => (
            <Card
              asin={conData[i][0]}
              productId={conData[i][1]}
              title={conData[i][2]}
              amazonLink={conData[i][3]}
              kod={conData[i][4]}
              linkDoKarty={conData[i][5]}
              nazwa={conData[i][6]}
              licznik={i}
              data={conData}
              setData={setFinalData}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
