'use client'

import axios from "axios";
import {FaUserSecret} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import { useCallback,useState } from "react";
import { signIn} from "next-auth/react";
import { useRouter} from "next/navigation";
import { FieldValues,SubmitHandler,useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast"
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading] = useState(false);

    const {register,handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

       signIn('credentials',{
        ...data,
        redirect: false
       })
       .then((callback) => {
        setIsLoading(false);

        if(callback?.ok){
            toast.success('You are logged in');
            router.refresh();
            loginModal.onClose();
        }

        if (callback?.error){
            toast.error(callback.error);
        }
       })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome back to BeeCar"
                subtitle="Login to your account"
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label="Register with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button 
                outline
                label="Stay as Guest"
                icon={FaUserSecret}
                onClick={registerModal.onClose}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={registerModal.onClose}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal