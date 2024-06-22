import React, { useState } from 'react';
import Content from '../content/content';
import './pagination.css';

const Pagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showInput, setShowInput] = useState(false);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleInputBlur = () => {
    setShowInput(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const page = Number(value);
    if (
      value === '' ||
      (Number.isInteger(page) && page >= 1 && page <= totalPages)
    ) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(currentPage + halfVisible, totalPages);

    if (currentPage <= halfVisible) {
      endPage = Math.min(visiblePages, totalPages);
    }

    if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(totalPages - visiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <button key="1" onClick={() => handlePageChange(1)}>
          1
        </button>
      );

      if (startPage > 2) {
        pages.splice(
          1,
          0,
          <button key="start-ellipsis" onClick={() => setShowInput(true)}>
            ...
          </button>
        );
      }
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <button key="end-ellipsis" onClick={() => setShowInput(true)}>
            ...
          </button>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={totalPages === currentPage}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Content items={currentItems} />
      <div className="moveBtn">
        {renderPageNumbers()}
        {showInput && (
          <input
            type="number"
            min="1"
            max={totalPages}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;

///// допилить валидацию инпутов для выбора страницы
/////

// import React, { useState } from 'react';

// const Pagination = ({ data, itemsPerPage }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showInput, setShowInput] = useState(false);
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleInputBlur = () => {
//     setShowInput(false);
//   };

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     const page = Number(value);
//     if (
//       value === '' ||
//       (Number.isInteger(page) && page >= 1 && page <= totalPages)
//     ) {
//       setCurrentPage(page);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pages = [];
//     const visiblePages = 5;

//     for (let i = 1; i <= Math.min(visiblePages, totalPages); i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           disabled={i === currentPage}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (totalPages > visiblePages) {
//       pages.push(
//         <button key="ellipsis" onClick={() => setShowInput(true)}>
//           ...
//         </button>
//       );

//       pages.push(
//         <button
//           key={totalPages}
//           onClick={() => handlePageChange(totalPages)}
//           disabled={totalPages === currentPage}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return pages;
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div>
//       <div>
//         {currentItems.map((item, index) => (
//           <div key={index}>{item}</div>
//         ))}
//       </div>
//       <div>
//         {renderPageNumbers()}
//         {showInput && (
//           <input
//             type="number"
//             min="1"
//             max={totalPages}
//             onChange={handleInputChange}
//             onBlur={handleInputBlur}
//             autoFocus
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pagination;

// import React, { useState } from 'react';
// import './pagination.css';
// import Back from './../../images/Peremotka-nazadsvg.svg';

// const Pagination = ({ data, itemsPerPage }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageChange = (event) => {
//     setCurrentPage(Number(event.target.value));
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div>
//       <div className="listElem">
//         {currentItems.map((item, index) => (
//           <div key={index} className="tempData">
//             {item}
//           </div>
//         ))}
//         {/* вынести в отдельный компонент content */}
//       </div>
//       <div className="moveBlock">
//         <button
//           onClick={handlePrevious}
//           disabled={currentPage === 1}
//           className="moveBtn backBtn"
//         >
//           <img src={Back} className="arrowImg" />
//         </button>
//         <span>
//           Страница {currentPage} из {totalPages}
//         </span>
//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className="moveBtn forceBtn"
//         ></button>
//         <select value={currentPage} onChange={handlePageChange}>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <option key={index + 1} value={index + 1}>
//               {index + 1}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

//////////// не background img, а лучше внутри кнопки положить img
