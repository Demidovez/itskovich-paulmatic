// import { Table } from "reactstrap";
import "./TableCompanies.scss";
import {
  MultiGrid,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import "react-virtualized/styles.css";
import { useMemo } from "react";

const TableCompanies = ({ data = [[]] }) => {
  const cache = useMemo(() => {
    return new CellMeasurerCache({
      defaultWidth: 100,
      fixedHeight: true,
    });
  }, []);

  const cellRenderer = ({ columnIndex, key, parent, rowIndex, style }) => {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div
          style={{
            ...style,
            whiteSpace: "nowrap",
          }}
          className={`table-cell level-${rowIndex}`}
        >
          {data[rowIndex][columnIndex]}
        </div>
      </CellMeasurer>
    );
  };

  return (
    <div className="table-companies flex-fill">
      <AutoSizer>
        {({ height, width }) => (
          <MultiGrid
            cellRenderer={cellRenderer}
            columnCount={data[0].length}
            columnWidth={cache.columnWidth}
            // deferredMeasurementCache={cache}
            // enableFixedColumnScroll
            // enableFixedRowScroll
            // styleTopRightGrid={{ height: 40 }}
            fixedRowCount={1}
            height={height}
            rowCount={data.length}
            rowHeight={53}
            width={width}
          />

          // <Table
          //   width={width}
          //   height={height}
          //   headerHeight={20}
          //   rowHeight={30}
          //   rowCount={data.length}
          //   rowGetter={({ index }) => data[index]}
          // >
          //   <Column width={100} label="" dataKey="Name" />
          //   <Column width={100} label="Название" dataKey="Name" />
          //   <Column width={200} label="Адрес" dataKey="Address" />
          //   <Column width={200} label="Категория" dataKey="Category" />
          //   <Column width={200} label="Город" dataKey="City" />
          //   <Column width={200} label="Страна" dataKey="Country" />
          //   <Column width={200} label="E-mail" dataKey="Email" />
          //   <Column width={200} label="Телефон" dataKey="Phone" />
          //   <Column width={200} label="Регион" dataKey="Region" />
          //   <Column width={200} label="Соц. сети" dataKey="Socials" />
          //   <Column width={200} label="Подкатегория" dataKey="Subcategory" />
          //   <Column width={200} label="Сайт" dataKey="Website" />
          //   <Column width={200} label="Индекс" dataKey="ZipCode" />
          // </Table>
        )}
      </AutoSizer>

      {data.length === 0 && <p className="message">Не найдено :(</p>}
    </div>
  );
};

export default TableCompanies;
