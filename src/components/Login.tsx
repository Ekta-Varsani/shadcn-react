import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });


   const handleSubmit = (e: any) => {
    e.preventDefault();
    if(values.email) {
      localStorage.setItem('user', values.email);
      navigate("/dashboard")
    }
  };

   const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
  <div className="bg-black/70 flex p-12 justify-center flex-col">
      <h2 className="text-3xl font-semibold mb-8 text-white">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex-col flex">
        <div className="relative">
            <input required type="email" name="email" onChange={onChange} id="email" className="block min-w-80 rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-white/70 bg-[#161616b3] border-2 border-neutral-500/70 appearance-none focus:outline-none focus:ring-1 focus:ring-white peer" placeholder=" " />
            <label htmlFor="email" className="absolute text-sm text-white/70 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white/7 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
        </div>
        <div className="relative mt-4">
            <input required type="text" name="password" onChange={onChange} id="password" className="block min-w-80 rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-white/70 bg-[#161616b3] border-2 border-neutral-500/70 appearance-none focus:outline-none focus:ring-1 focus:ring-white peer" placeholder=" " />
            <label htmlFor="password" className="absolute text-sm text-white/70 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white/7 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
        </div>
        <Button type="submit" className="red mt-4">
          Sign In
        </Button>
      </form>
      If you don't have an account
      <span className="blue-text ">Sign Up here</span>
    </div>)
};

export default Login;
