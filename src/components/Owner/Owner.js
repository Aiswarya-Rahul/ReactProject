import classes from "./Owner.module.css";
import Pet from "../Pet/Pet";
const Owner = (props) => {
  return (
    <div className={classes.gender}>
      <label>{props.gender}</label>
      <ul>
        {props.pets != null &&
          props.pets.length > 0 &&
          props.pets.map((pet, index) => <Pet key={index} name={pet} />)}
      </ul>
    </div>
  );
};

export default Owner;
