// React
import { ChangeEvent, useState } from "react";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import InputField from "@components/common/Input/InputField";
import ResetFilter from "@components/common/filters/ResetFilter";
import PieChartComponent from "@components/common/statistics/PieChartComponent";
// Icons
import { IoClose } from "react-icons/io5";
import {
  MdFileDownloadDone,
  MdOutlineLocalShipping,
  MdOutlinePendingActions,
} from "react-icons/md";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";

const ordersStatus = [
  {
    id: 1,
    name: "pending",
    value: 35,
    icon: <MdOutlinePendingActions />,
    color: "#fde047",
  },
  {
    id: 2,
    name: "shipped",
    value: 56,
    icon: <MdOutlineLocalShipping />,
    color: "#87cefa",
  },
  {
    id: 3,
    name: "delivered",
    value: 142,
    icon: <MdFileDownloadDone />,
    color: "#90EE90",
  },
  { id: 7, name: "canceled", value: 17, icon: <IoClose />, color: "#F08080" },
];

const OrdersStatistics = () => {
  // ################### REACT HOOKS ###################
  const [{ from, to }, setFilterByDate] = useState({
    from: "",
    to: "",
  });

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### HANDER ###################
  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    const theValue = event.target.value;
    if (event.target.name === "from") {
      // Validation
      if (to !== "" && new Date(theValue) > new Date(to)) {
        toastifyMsg(t("toasts.invalideDate"), "error");
      } else {
        setFilterByDate({
          from: theValue,
          to,
        });
      }
    } else if (event.target.name === "to") {
      // Validation
      if (from !== "" && new Date(theValue) < new Date(from)) {
        toastifyMsg(t("toasts.invalideDate"), "error");
      } else {
        setFilterByDate({
          from,
          to: theValue,
        });
      }
    }
  };

  return (
    <section className="container mb-8">
      <div className="bg-box-bg min-h-60 rounded-lg p-4">
        <h3 className="text-2xl font-bold">{t("orders.ordersStatistics")}</h3>
        <div className="5xl:grid-cols-2 mt-6 mb-2 grid grid-cols-1 gap-2">
          <div className="cmd:grid-cols-2 grid grid-cols-1 gap-2">
            <InputField
              type="date"
              label={t("common.fromDate")}
              inputClassName="input-field"
              isRequired={false}
              name="from"
              value={from}
              onChange={handleChangeDate}
            />
            <InputField
              type="date"
              label={t("common.toDate")}
              inputClassName="input-field"
              isRequired={false}
              name="to"
              value={to}
              onChange={handleChangeDate}
            />
          </div>
        </div>
        {(from || to) && (
          <ResetFilter reset={() => setFilterByDate({ from: "", to: "" })} />
        )}
        <div className="flex-between max-3xl:flex-col mt-6 gap-4">
          <ul className="min-w-60 divide-y-2">
            {ordersStatus.map((status) => (
              <li key={status.id} className="flex-between p-2">
                <h3 className="flex items-center gap-2">
                  <span
                    className="flex-center size-6 rounded-full text-white drop-shadow-sm"
                    style={{ backgroundColor: status.color }}
                  >
                    {status.icon}
                  </span>
                  {t(`common.${status.name}`)}
                </h3>
                <span className="text-content">{status.value}</span>
              </li>
            ))}
          </ul>

          <div className="h-60 w-full" dir="ltr">
            <PieChartComponent data={ordersStatus} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersStatistics;
