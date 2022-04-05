import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    // ref: https://v5.reactrouter.com/web/guides/scroll-restoration
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop