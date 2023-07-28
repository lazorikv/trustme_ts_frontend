import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({
  children,
}) => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    scrollToTop();

    const unlisten = () => {
      scrollToTop();
    };

    return () => {
      unlisten();
    };
  }, [location.pathname]);

  return <>{children}</>;
};

export default PageTransitionWrapper;