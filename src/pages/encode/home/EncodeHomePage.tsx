import { useEffect } from 'react';

import { startEncodeStatusPolling } from './EncodeHomeContext';
import { useDispatch } from 'src/redux';

export default function EncodeHomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startEncodeStatusPolling());
  }, [dispatch]);

  return (
    <div id="EncodeHomePage">
      <h1>EncodeHomePage</h1>
    </div>
  );
}
