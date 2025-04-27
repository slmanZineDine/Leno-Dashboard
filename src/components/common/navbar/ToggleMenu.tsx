type Props = {
  isShowAside: boolean;
  onToggleClick: any;
};

const ToggleMenu = ({ isShowAside, onToggleClick }: Props) => {
  return (
    <button className="navbar-icon" onClick={() => onToggleClick(!isShowAside)}>
      <div
        className={`flex w-6 flex-col ${
          isShowAside ? "space-y-0" : "space-y-1"
        }`}
      >
        <span
          className={`bg-text block h-1 rounded-xs transition-transform duration-300 ${isShowAside ? "origin-center translate-y-1/2 rotate-45" : ""} `}
        ></span>
        <span
          className={`bg-text block h-1 rounded-sm ${
            isShowAside ? "hidden" : ""
          }`}
        ></span>
        <span
          className={`bg-text block h-1 rounded-sm transition-transform duration-300 ${
            isShowAside ? "origin-center -translate-y-1/2 -rotate-45" : ""
          }`}
        ></span>
      </div>
    </button>
  );
};

export default ToggleMenu;
