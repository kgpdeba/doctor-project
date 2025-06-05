import React from 'react'
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import formSchema from '../validators/formValidator';

const Form = () => {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(formSchema),
    });


    const onSubmit = async (data) => {
        console.log("hellohgjkhkjh")

        try {
            console.log("tyy......")
            const res = await axios.post("http://localhost:8001", data);
            if (res) {
                toast.success("Logged In successfully");

                navigate("/home");
            }
            else {
                toast.error(res.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unauthorized access detected, verify your credentials"
            );
            console.log(error)
        }
        reset();
    };


    return (
        <div className=''>
            <div className="flex items-start justify-between  ">
                <h2 className="text-3xl font-semibold">Details</h2>

            </div>
            <div className="py-6 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">

                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-cyan-600 focus:border-cyan-600 block w-full min-w-[300px] p-2.5"
                                placeholder="First Name"
                                required=""
                                {...register("firstName")}
                            />
                            <p className="text-xs text-red-600 font-semibold h-6">
                                {formState.errors.firstName?.message}
                            </p>
                        </div>
                        <div className="col-span-6 sm:col-span-3">

                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Last Name"
                                required=""
                                {...register("lastName")}
                            />
                             <p className="text-xs text-red-600 font-semibold h-6 ">
                                {formState.errors.lastName?.message}
                            </p>
                        </div>
                        <div className="col-span-6 sm:col-span-3">

                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Email"
                                required=""
                                {...register("email")}
                            />
                             <p className="text-xs text-red-600 font-semibold h-6">
                                {formState.errors.email?.message}
                            </p>
                        </div>
                        <div className="col-span-6 sm:col-span-3">

                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Phone"
                                required=""
                                {...register("phone")}

                            />
                             <p className="text-xs text-red-600 font-semibold h-6">
                                {formState.errors.phone?.message}
                            </p>
                        </div>

                    </div>

                    <button
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium  text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Submit
                </button>
                </form>
            </div>
        </div>

    )
}

export default Form