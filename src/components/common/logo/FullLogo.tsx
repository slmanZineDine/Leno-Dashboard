import Logo from "@assets/images/full_logo.png";

const FullLogo = ({ className }: { className: string }) => {
  return <img src={Logo} alt="Logo" className={className} />;
};

export default FullLogo;
