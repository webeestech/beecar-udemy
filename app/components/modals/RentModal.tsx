'use client'

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import { categories } from "../navbar/Categories";
import Heading from "../Heading";
import CategoryTile from "../inputs/CategoryTile";
import { FieldValues,SubmitHandler,useForm } from "react-hook-form";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGE = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const { register,handleSubmit,watch,setValue,reset,formState:{errors}} = useForm<FieldValues>({

        defaultValues: {
            category: "",
            location: null,
            passangerCount: 1,
            seatCount: 5,
            doorCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        }
   })

   const category= watch('category');

   const setCustomValue= (id: string, value: any ) => {
    setValue(id,value,{
        shouldValidate:true,
        shouldDirty: true,
        shouldTouch: true
    })
}

    const onBack = () => {
        setStep((value) => value - 1);
    };
    const onNext = () => {
        setStep((value) => value + 1);
    };
    
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }

        return "Next";
    },[step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY){
            return undefined;
        }

        return 'Back'
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                 title="What type of category would like to rent"
                 subtitle="Choose your type"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryTile 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>

        </div>
    )

    return (
        <Modal 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            title="Rent your vehicle!"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    );
}

export default RentModal;