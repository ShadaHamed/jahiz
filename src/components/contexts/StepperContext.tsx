import { UserWithoutId } from "@/app/users/create/page";
import {createContext} from "react";

export const StepperContext = createContext<UserWithoutId |null>(null)