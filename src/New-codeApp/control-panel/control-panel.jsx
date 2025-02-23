import { useDispatch } from "react-redux";
import { increaseAge, resetAge } from "../action/Action";

export const ControlPanel = () => {
  const dispatch = useDispatch();
  const onAgeIncrease = () => {
    dispatch(increaseAge(1));
  };
  const onAgeReset = () => {
    dispatch(resetAge());
  };
  return (
    <div className="control-panel">
      <button onClick={onAgeIncrease}>Увеличить возраст</button>
      <button onClick={onAgeReset}>Сбросить возраст</button>
    </div>
  );
};
