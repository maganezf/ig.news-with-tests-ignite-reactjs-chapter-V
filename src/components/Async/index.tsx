import { useEffect, useState } from 'react';

export function Async() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 3000);
  }, []);

  return (
    <div>
      <h1>Hello World</h1>

      {isVisible && <button type='button'>Async Button</button>}
    </div>
  );
}
