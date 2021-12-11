import { FC } from "react";
import computeClass from "classnames";
import "./footer.less";

interface IProps {

}

const PlatformFooter: FC<IProps> = (props) => {

  const {
    children
  } = props;


  return (
    <footer className={computeClass(
      "footer-container"
    )}  >
      <div className="footer-children">
        {children}
      </div>

    </footer>
  );
};


export default PlatformFooter;
