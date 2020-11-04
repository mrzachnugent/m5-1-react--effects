import { useEffect } from "react";

const useDocumentTitle = (title, fallbacktitle) => {
  useEffect(() => {
    document.title = `${title} - ${fallbacktitle}`;

    return () => (document.title = fallbacktitle);
  }, [title, fallbacktitle]);
};

export default useDocumentTitle;
