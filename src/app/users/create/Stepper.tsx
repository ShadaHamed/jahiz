'use client'
import React, { useEffect, useState, useRef } from 'react'

type Step = {
    description: string;
    completed: boolean;
    highlighted: boolean;
    selected: boolean;
};

type StepperProps = {
    steps: string[]; // Array of step descriptions
    currentStep: number;
};

const Stepper = ({ steps, currentStep }: StepperProps) => {
    const [newStep, setNewStep] = useState<Step[]>([]);
    const stepRef = useRef<Step[] | null>(null);

    const updateStep = (stepNumber: number, steps: Step[]) => {
        const newSteps = [...steps];
        let count = 0;

        while (count < newSteps.length) {
            //current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                }
                count++;
            }
            //step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                }
                count++;
            }
            //step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                }
                count++;
            }
        }
        return newSteps;
    };

    useEffect(() => {
        //create object
        const stepState: Step[] = steps.map((step, index) =>
            Object.assign(
                {},
                {
                    description: step,
                    completed: false,
                    highlighted: index === 0 ? true : false,
                    selected: index === 0 ? true : false,
                }
            ))
        stepRef.current = stepState;
        if (stepRef.current) {
            const current = updateStep(currentStep - 1, stepRef.current);
            setNewStep(current);
        }
    }, [steps, currentStep]);

    const displaySteps = newStep.map((step, index) => {
        return (
            <div
            key={index}
            className={index !== newStep.length - 1 ? 'w-full flex items-center' : 'flex items-center'}>
            <div className='relative flex flex-col items-center text-secondaryColor'>
                <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-200 h-8 w-8 flex items-center justify-center py-3 ${step.selected ? "bg-primaryColor text-white font-bold border border-primaryColor" : ""}`}>
                    {/*display number*/}
                    {step.completed ? (
                        <span className='text-white font-bold text-xl'>&#10003;</span>
                    ) : (
                        index + 1
                    )}
                </div>
                <div className={`absolute top-0 text-center mt-8 w-30 text-[10px] font-bold uppercase ${step.highlighted ? "text-primaryColor" : "text-drakColor"}`}>
                    {/*display description*/}
                    {step.description}
                </div>
            </div>
            <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? "border-primaryColor" : "border-drakColor"}`}>
                {/*display line*/}
            </div>
        </div>
        )
    })

    return (
        <div className='mx-4 p-4 flex justify-between items-center'>
            {displaySteps}
        </div>
    )
}

export default Stepper