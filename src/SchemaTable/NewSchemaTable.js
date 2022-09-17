import React from 'react';
import { useState } from 'react';
import { StyledTable } from './SchemaTable.styled';
import currentTable from '../mockTable.json';
import {
  getAllKeys,
  swapPropertyName,
  columnfy,
  range,
} from '../helperFunctions';

export function SchemaTable() {
  const [tableData, setTableData] = useState(columnfy(currentTable));
  const [headingOrder, setHeadingOrder] = useState(getAllKeys(currentTable));
  const [rowNumber, setRowNumber] = useState(currentTable.length);

  const headingUpdateFactory = (index) => {
    return (newValue) => {
      if (headingOrder[index] === newValue) return;
      const newOrder = [...headingOrder];
      newOrder[index] = newValue;
      setHeadingOrder(newOrder);
      setTableData(swapPropertyName(tableData, headingOrder[index], newValue));
    };
  };

  const dataUpdateFactory = (index, property) => {
    return (newValue) => {
      const newTable = { ...tableData };
      newTable[property][index] = newValue;
      setTableData(newTable);
    };
  };

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            {headingOrder.map((heading, headingIndex) => (
              <HeadingCell
                text={heading}
                updateValue={headingUpdateFactory(headingIndex)}
                key={headingIndex}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {range(rowNumber).map((rowIndex) => (
            <tr key={rowIndex}>
              {headingOrder.map((heading, cellIndex) => {
                return (
                  <DataCell
                    text={tableData[heading][rowIndex]}
                    updateValue={dataUpdateFactory(rowIndex, heading)}
                    key={cellIndex}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <p>{`${JSON.stringify(objectify(tableData, rowNumber, headingOrder))}`}</p>
    </div>
  );
}

function objectify(vectorObj, objAmount, propertyOrder) {
  let result = [];
  for (let index = 0; index < objAmount; index++) {
    const obj = {};
    for (const property of propertyOrder) {
      if (vectorObj[property][index])
        obj[property] = vectorObj[property][index];
    }
    result.push(obj);
  }
  return result;
}

const DataCell = ({ text, updateValue }) => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState(text);

  if (active)
    return (
      <td>
        <input
          type={'text'}
          value={data || ''}
          onInput={(e) => setData(e.target.value)}
          onBlur={() => {
            updateValue(data);
            setActive(false);
          }}
          autoFocus={true}
        />
      </td>
    );

  return <td onClick={() => setActive(true)}>{text}</td>;
};

const HeadingCell = ({ text, updateValue }) => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState(text);

  if (active)
    return (
      <th>
        <input
          type={'text'}
          value={data}
          onInput={(e) => setData(e.target.value)}
          onBlur={() => {
            updateValue(data);
            setActive(false);
          }}
          autoFocus={true}
        />
      </th>
    );

  return <th onClick={() => setActive(true)}>{text}</th>;
};
