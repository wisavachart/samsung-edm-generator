import { useState } from "react";
import { edmTPSFooterPart, openTableTagTPS } from "./part/part";
import Tps from "./pages/Tps";

function App() {
  const [boxes, setBoxes] = useState([]);
  const [markUp, setMarkup] = useState("");
  // const boxes = [{ cols: [] }, { cols: [{}, {}] }, { cols: [] }];
  // const boxes = [
  //   { cols: [] },
  //   // { cols: [] },
  //   // { cols: [] },
  //   { cols: [{}, {}] },
  //   // { cols: [{}, {}] },
  //   // { cols: [] },
  //   // { cols: [] },
  //   // { cols: [{}, {}] },
  //   // { cols: [] },
  // ];

  const addRow = () => {
    // Add a new box with an empty array for columns
    setBoxes([...boxes, { cols: [] }]);
  };

  const addCol = () => {
    // Add a column to the latest box
    setBoxes(
      boxes.map(
        (box, i) =>
          i === boxes.length - 1 // Check if it's the last box
            ? { ...box, cols: [...box.cols, {}] } // Add a column to the last box
            : box // Keep the rest of the boxes unchanged
      )
    );
  };

  const handleSetElement = () => {
    let markupText = openTableTagTPS();

    boxes.forEach((item, i) => {
      const colsLength = item.cols.length;
      const lastIndex = boxes.length - 1;
      let nomalrow = `<tr><td></td></tr>`;
      if (colsLength == 0) {
        markupText += nomalrow;
      }
      if (colsLength != 0) {
        let cols = ``;
        for (let j = 1; j <= colsLength; j++) {
          cols += `<td>${j}</td>`;
        }
        let markCol = `<table><tr>${cols}</tr></table>`;
        markupText += markCol;

        // i == 0
        //   ? (markupText += `อีกแบบ</table>`)
        //   : (markupText += `<table>อีกแบบ</table>`);
      }

      if (i < lastIndex) {
        const nextItemColsLength = boxes[i + 1].cols.length;
        const currentItemColsLenght = boxes[i].cols.length;
        // console.log(`Length of next item cols: ${nextItemColsLength}`);
        currentItemColsLenght == 0 &&
          nextItemColsLength !== 0 &&
          (markupText += `</table>`);
        currentItemColsLenght !== 0 &&
          nextItemColsLength == 0 &&
          (markupText += `<table>`);
      } else if (i == lastIndex) {
        console.log("This is the last item, no next item.");
        const lastItemColsLength = boxes[lastIndex].cols.length;
        lastItemColsLength == 0 && (markupText += `</table>`);
      }
    });
    setMarkup(markupText);
  };

  return (
    <div>
      {boxes.map((box, i) => (
        <div key={i} className="w-[200px] h-4 bg-black border flex">
          {box.cols.map((_, j) => (
            <div key={j} className="flex-1 bg-green-500 border"></div>
          ))}
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={addRow}>plus Row</button>
        <button onClick={addCol}>plus Column</button>
        <button onClick={handleSetElement}>Create element</button>
      </div>
      <div>
        <p>{markUp}</p>
      </div>
    </div>
  );
}
export default App;

// IN USE AND ALL WORK WELL
// function App() {
//   const [imageFooterStart, setImageFooterStart] = useState(20);
//   const [images, setImages] = useState([]);
//   const [inputValue, setInputValue] = useState(20);
//   const handleClick = () => {
//     setImageFooterStart(inputValue);
//   };
//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const imagePromises = files.map((file) => {
//       return new Promise((resolve) => {
//         const reader = new FileReader();
//         const image = new Image();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//           image.src = reader.result;
//           image.onload = () => {
//             resolve({
//               name: file.name,
//               width: image.width,
//               height: image.height,
//               url: reader.result,
//             });
//           };
//         };
//       });
//     });

//     Promise.all(imagePromises).then((imageData) => {
//       setImages(imageData);
//     });
//   };

//   return (
//     <div className="flex w-screen h-screen">
//       <div className="flex flex-col gap-4 items-center">
//         {/* IMG FOOTER */}
//         <input
//           type="number"
//           className="border-s-red-500 bg-slate-200"
//           value={inputValue}
//           onChange={(e) => setInputValue(Number(e.target.value))}
//         />
//         <div className="w-[20%] bg-gray-100">
//           <button
//             onClick={handleClick}
//             className="bg-slate-900 text-white text-[14px] px-1 py-1 text-center">
//             Generate Footer
//           </button>
//         </div>
//         {/* IMG UPLOAD */}
//         <div>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//           {/* <div>
//             {images.map((image, index) => (
//               <div key={index} style={{ margin: "10px 0" }}>
//                 <p>
//                   <strong>Name:</strong> {image.name}
//                 </p>
//                 <p>
//                   <strong>Width:</strong> {image.width}px
//                 </p>
//                 <p>
//                   <strong>Height:</strong> {image.height}px
//                 </p>
//                 <img
//                   src={image.url}
//                   alt={image.name}
//                   style={{ width: "10px", height: "auto", marginTop: "10px" }}
//                 />
//               </div>
//             ))}
//           </div> */}
//         </div>
//       </div>
//       <div className="bg-slate-500 w-full h-full p-4">
//         <p>{edmTPSFooterPart(imageFooterStart, images)}</p>
//       </div>
//     </div>
//   );
// }
// export default App;
