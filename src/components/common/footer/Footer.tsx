// Third-Party ======> React-Router
import { Link } from "react-router-dom";

// ################### CONSTANTS ###################
const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-body-bg text-text mt-auto w-full py-6 text-center">
      <div className="container">
        <p>
          All rights reserved to{" "}
          <Link
            to="https://slmanzinedine.vercel.app/"
            className="text-primary font-extrabold transition-all hover:underline hover:underline-offset-8"
            target="_blank"
          >
            Slman Zinedine
          </Link>
          &copy; <span>{currentYear}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
