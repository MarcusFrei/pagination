import React, { useEffect } from 'react';
import { testData, itemsPerPage } from './components/Api/Api';
import Header from './components/header/header';
import Pagination from './components/pagination/pagination';
import './App.css';

const App = () => {
  // function handleClicker(event) {
  //   console.log('Кнопка нажалась');
  // }
  function sortArray(arr) {
    return arr.sort((a, b) => a - b);
  }

  function binarySearch(arr, target) {
    const resortedArr = sortArray([...arr]);
    let left = 0;
    let right = resortedArr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (resortedArr[mid] === target) {
        return mid;
      } else if (resortedArr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  }

  const sortedArray = [1, 3, 9, 8, 14, 2, 97, 81, 19];
  const target = 81;
  const result = binarySearch(sortedArray, target);
  console.log(result);

  // useEffect(() => {
  //   const button = document.getElementById('button');
  //   button.addEventListener('click', handleClicker);
  //   setTimeout(() => {
  //     button.removeEventListener('click', handleClicker);
  //   }, 3000);
  // }, []);

  return (
    <div className="appWrapper">
      <Header />
      <Pagination data={testData} itemsPerPage={itemsPerPage} />
      {/* <button id="button">BUTTON</button> */}
    </div>
  );
};

export default App;

/////////// getAttribute, setAttribute - почитать тоже, читать про form api,

////////////  useMemo, useState, useEffect, useCallback, useRef, useLayout

//////////// методы массива map, sort, find, some, reduce

//////////// евро, рубли и доллары подумать как можно сделать с помощью reduce

//////////// для алгоритмов сделать ui у нас есть инпуты для ввода массива, нопка + добавляет к массиву и отображение самого массива
//////////// и есть еще инпут для поиска значения и вывод индекса
