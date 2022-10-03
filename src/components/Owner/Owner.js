import classes from "./Owner.module.css";
import Pet from "../Pet/Pet";

const Owner = (props) => {
  const { pets, gender } = props;

  return (
    <div className={classes.gender}>
      <label>{gender}</label>
      <ul>
        {pets != null &&
          pets.length > 0 &&
          pets.map((pet, index) => <Pet key={index} name={pet} />)}
      </ul>
    </div>
  );
};

export default Owner;
