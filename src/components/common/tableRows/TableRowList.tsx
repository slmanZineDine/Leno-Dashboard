type TTableRowList<TRecord> = {
  records: TRecord[];
  renderItem: (record: TRecord, index: number) => React.ReactNode;
  isLoading?: boolean;
  colCount: number;
  noRecordMsg?: string;
};
type THasId = { id?: number; slug?: string };

const TableRowList = <T extends string | THasId>({
  records,
  renderItem,
  isLoading = false,
  colCount,
  noRecordMsg = "لا يوجد بيانات.",
}: TTableRowList<T>) => {
  // ################### CONTENT ###################
  let content;
  if (isLoading) {
    content = (
      <tr>
        <td colSpan={colCount}>
          <span className="loading loading-spinner loading-lg bg-primary"></span>
        </td>
      </tr>
    );
  } else if (records.length > 0) {
    content = records.map((record, index) => (
      <tr key={typeof record === "object" ? record?.id || record?.slug : index}>
        {renderItem(record, index)}
      </tr>
    ));
  } else {
    content = (
      <tr>
        <td colSpan={colCount}>{noRecordMsg}</td>
      </tr>
    );
  }

  return content;
};

export default TableRowList;
