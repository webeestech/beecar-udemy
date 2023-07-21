'use client'

import axios from "axios";
import {FaUserSecret} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import { useCallback,useState } from "react";
import { FieldValues,SubmitHandler,useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast"
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading] = useState(false);

    const {register,handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register',data)
        .then(() => {
            registerModal.onClose()
        })
        .catch((error) => {
            toast.error('Something went wrong!')
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to BeeCar"
                subtitle="Create an account"
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
                id="name"
                label="Name"
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