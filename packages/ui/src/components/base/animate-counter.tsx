import { memo, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value?: number;
  className?: string;
}

function AnimatedCounter(props: AnimatedCounterProps) {
  const { value, className } = props;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!value) return;

    let start = 0;
    const end = value;
    const duration = 1000;
    const step = Math.max(1, Math.floor(end / 30));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / 30);

    return () => clearInterval(timer);
  }, [value]);

  return <span className={className}>{count}</span>;
}

export default memo(AnimatedCounter);
