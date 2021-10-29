import { useEffect, useState } from 'react';

export function Async() {
  const [isInvisible, setIsInvisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsInvisible(true);
    }, 3000);
  }, []);

  return (
    <div>
      <h1>Hello World</h1>

      {!isInvisible && <button type='button'>Async Button</button>}
    </div>
  );
}
