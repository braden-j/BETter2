import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollable = document.querySelector('.scrollable-area') || document.querySelector('.content-area');
    if (scrollable) {
      scrollable.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
