import { useEffect } from "react";
import { useDispatch } from "src/redux"
import { startEncodeStatusPolling } from "./EncodeHomeContext";

export default function EncodeHomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startEncodeStatusPolling());
  }, [dispatch])

  return (
    <div id="EncodeHomePage">
      <h1>EncodeHomePage</h1>
    </div>
  )
}
