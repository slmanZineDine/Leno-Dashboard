import { Fragment } from "react/jsx-runtime";
import LoadingSpinner from "../Loading/LoadingSpinner";

type TCustomListProps<TRecord> = {
  records: TRecord[];
  renderItem: (record: TRecord, index: number) => React.ReactNode;
  isLoading?: boolean;
  noRecordMsg?: string;
};
type THasId = { id?: number };

const CustomList = <T extends THasId>({
  records,
  renderItem,
  isLoading = false,
  noRecordMsg = "لا يوجد بيانات.",
}: TCustomListProps<T>) => {
  // ################### CONTENT ###################
  let content;
  if (isLoading) {
    content = (
      <div className="flex-center h-full">
        <LoadingSpinner size="loading-lg" color="text-primary" />
      </div>
    );
  } else if (records.length > 0) {
    content = records.map((record, index) => (
      <Fragment key={record?.id ?? index}>{renderItem(record, index)}</Fragment>
    ));
  } else {
    content = (
      <div className="flex-center h-full">
        <p>{noRecordMsg}</p>
      </div>
    );
  }

  return content;
};

export default CustomList;
