import React from 'react';
import './content.css';

const Content = ({ items }) => {
  return (
    <div className="listElem">
      {items.map((item, index) => (
        <div key={index} className="elem">
          {item}
        </div>
      ))}
    </div>
  );
};

export default Content;
