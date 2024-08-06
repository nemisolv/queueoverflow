import { useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface InputPasswordProps {
    label: string;
    field: any;
}

export default function InputPassword({ label, field}: InputPasswordProps) {
    const [showPassword,setShowPassword] = useState(false)
    return <FormItem>
            <FormLabel className=" paragraph-medium ">{label}</FormLabel>
            <FormControl >
                <div className="relative">
                    <Input  {...field} type={showPassword ? 'text' : 'password'} className="no-focus paragraph-regular placeholder:body-regular    min-h-[46px] light-border-2 border  text-dark200_light700  transition-all transform pr-[40px]" />
                    <img src={`/assets/icons/${showPassword ? 'eye' : 'eye-close'}.svg`} alt="" className="absolute top-2/4 right-[10px] -translate-y-2/4 transition-all transform" onClick={() => setShowPassword(!showPassword)} />
                </div>
            </FormControl>

            <FormMessage className="text-red-500" />
        </FormItem>
}