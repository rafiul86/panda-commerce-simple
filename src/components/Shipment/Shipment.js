import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import shipment from './Shipment.css'

const Shipment = () => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  return (
    
    <form className ="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="title"  placeholder="title" defaultValue="test" ref={register} />
      {errors.exampleRequired && <span className="error">This field is required</span>}
      <input name="name" placeholder="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
      {errors.name && <span className="error">This field is required</span>}
      <input name="address" defaultValue={loggedInUser.address} placeholder="address line 1" ref={register({ required: true })} />
      {errors.address && <span className="error">This field is required</span>}
      <input name="address" placeholder="address line 2" ref={register({ required: true })} />
      {errors.exampleRequired && <span className="error">This field is required</span>}
      <input name="country" placeholder="country" ref={register({ required: true })} />
      {errors.country && <span className="error">This field is required</span>}
      <input name="zip code" placeholder="zip code" ref={register({ required: true })} />
      {errors.zipcode && <span className="error">This field is required</span>}
      <input name="email" defaultValue={loggedInUser.email} placeholder="email" ref={register({ required: true })} />
      {errors.email && <span className="error">This field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;