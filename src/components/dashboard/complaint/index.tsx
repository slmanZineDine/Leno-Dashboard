// React
import { useState } from "react";
// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// My-Components
import Select from "@components/common/select/Select";
// Img
import userAvatar from "@assets/images/user_avatar.png";
// Data
import {
  complaintStatusBadges,
  complaintStatusBorderColor,
} from "constants/constants";
import { ComplaintStatus, TComplaintStatusValues } from "constants/enums";
// Types
import { TComplaint } from "@customTypes/complaint";

const Complaint = (props: TComplaint) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### REACT HOOKS ###################
  const [complaintStatus, setEmergencyStatus] =
    useState<TComplaintStatusValues>(props.status as TComplaintStatusValues);

  // ################### DATA ###################
  const { customer, status, description, location } = props;
  const complaintStatusOptions = Object.entries(ComplaintStatus).map(
    ([key, value]) => ({
      name: key.toLocaleLowerCase(),
      displayValue: t(`common.${value}`),
    }),
  );

  return (
    <article
      className={`bg-box-bg rounded-lg border-s-4 ${complaintStatusBorderColor[status]} p-4`}
    >
      <header className="flex w-full items-start gap-2">
        <div className="size-11 shrink-0 rounded-full bg-gray-400">
          <img
            src={customer?.image ? customer.image : userAvatar}
            alt="User Image"
            className="size-full rounded-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="mb-1 flex w-full items-start gap-2">
          <div>
            <h3 className="text-md">{customer.name}</h3>
            <span className="text-text text-sm">{customer.phone}</span>
          </div>
          <span className={`${complaintStatusBadges[complaintStatus]} ms-auto`}>
            {t(`common.${complaintStatus}`)}
          </span>
        </div>
      </header>
      <p className="text-text mt-6 mb-2">{description}</p>
      <address className="text-md text-text">
        {location.city.name}, {location.region.name}
      </address>
      <footer>
        {complaintStatus !== ComplaintStatus.Resolved && (
          <Select
            initailValue={t("common.status")}
            label={t("common.changeStatus")}
            value={complaintStatus}
            options={complaintStatusOptions}
            optionLabels={{ value: "name", displayValue: "displayValue" }}
            isRequired={false}
            onChange={(event) =>
              setEmergencyStatus(event.target.value as TComplaintStatusValues)
            }
            containerClassName="mt-6"
          />
        )}
      </footer>
    </article>
  );
};

export default Complaint;
