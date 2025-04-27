// React
import { ChangeEvent, FormEvent, useState } from "react";
// My-Components
import Button from "@components/common/buttons/Button";
import DropdownBox from "@components/common/box/DropdownBox";
import LoadingDots from "@components/common/Loading/LoadingDots";
import InputFieldset from "@components/common/Input/InputFieldset";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Third-Party
import { useTranslation } from "react-i18next";

const AddCategory = () => {
  // ################### REACT HOOKS ###################
  const [isAdding, setIsAdding] = useState(false);
  const [reset, setReset] = useState(crypto.randomUUID());
  const [categoryName, setCategoryName] = useState<string>("");

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### ASYNC REQUEST ###################
  const handleAdding = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Validation
      if (categoryName?.trim() === "") {
        toastifyMsg(t("toasts.nameRequired"), "error");
      } else {
        setIsAdding(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toastifyMsg(t("toasts.successMessage"), "success");

        // Clean Up
        handleCleanUp();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsAdding(false);
    }
  };

  // ################### HANDLER ###################
  // ========== Reset State
  const handleCleanUp = () => {
    setReset(crypto.randomUUID());
    setCategoryName("");
  };

  return (
    <div className="container">
      <DropdownBox
        key={reset}
        title={t("pages.add-category")}
        arrowColor="text-primary dark:text-headingColor"
        borderColor="border-primary"
      >
        <form onSubmit={handleAdding}>
          <InputFieldset
            name="name"
            label={t("common.category")}
            placeholder={t("form.titlePlaceholder")}
            containerClassName="mb-4"
            value={categoryName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategoryName(e.target.value)
            }
          />

          {/* ========================== Button ========================== */}
          <div className="mt-12">
            {isAdding ? (
              <LoadingDots />
            ) : (
              <Button color="primary" type="submit">
                {t("buttons.save")}
              </Button>
            )}
          </div>
        </form>
      </DropdownBox>
    </div>
  );
};

export default AddCategory;
