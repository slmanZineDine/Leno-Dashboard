// React
import { Directions } from "constants/enums";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";

const CountDown = ({
  initalValue,
  onCounterFinishing,
}: {
  initalValue: number;
  onCounterFinishing: Dispatch<SetStateAction<number>>;
}) => {
  // ################### REACT HOOKS ###################
  const [counter, setCounter] = useState(initalValue);

  // ################### LOCALES ###################
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir(i18n.language) === Directions.RTL;

  // ################### DATA ###################
  const seconds = String(counter % 60).padStart(2, "0");
  const minutes = String(Math.floor(counter / 60) % 60).padStart(2, "0");

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((counter) => {
        if (counter > 0) {
          return counter - 1;
        } else {
          // This two line because update the state of VerifyAccountModel component while CountDown component is rendering,
          // which React doesn’t allow. It could be due to a setState call inside a render function,
          // or another component triggering a state change during the render phase.
          clearInterval(intervalId);
          setTimeout(() => onCounterFinishing(0), 0); // Defer state update
          return 0;
        }
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [setCounter]);

  return (
    <div className="flex-center flex-col gap-2">
      <h4 className="">{t("modal.pleaseWaitMessage")}</h4>
      <span className="flex-center border-border size-16 cursor-wait rounded-full border-2 text-center text-sm">
        <span className="countdown font-mono">
          {isRTL ? (
            <>
              <span style={{ "--value": seconds }}></span>:
              <span style={{ "--value": minutes }}></span>
            </>
          ) : (
            <>
              <span style={{ "--value": minutes }}></span>:
              <span style={{ "--value": seconds }}></span>
            </>
          )}
        </span>
      </span>
    </div>
  );
};

export default CountDown;
