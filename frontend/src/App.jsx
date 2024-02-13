import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Enter you email here" {...register("Enter you email here", {required: true})} />
      <input type="password" placeholder="Enter your password" {...register("Enter your password", {required: true, max: 8, min: 256})} />
      <input type="submit" />
    </form>
  );
}