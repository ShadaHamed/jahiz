import {iconsCollection} from "@/utils/icons"
import { IconType } from "react-icons";

interface cardProps {
    id: number;
    title: string;
    description: string;
    value: string;
    change: string;
    icon: IconType;
}



const Card = ({ id, title, value, change, icon: TitleIcon }: cardProps) => {

const TrendUp = iconsCollection.TrendUp;
const TrendDown = iconsCollection.TrendDown;

const getChangeColor = (change: string) => {
    return change.startsWith("-") ? "text-red-400" : "text-green-400"
}
const getChangeTrend = (change: string) => {
    return change.startsWith("-") ? TrendDown : TrendUp
  }

const TrendIcon = getChangeTrend(change);

  return (
    <div key={id} className="bg-white border rounded-lg p-4 text-sm shadow-sm flex flex-col w-full items-center">
      <div className="flex items-center justify-between gap-2">
        <TitleIcon className="text-primaryColor" size={20} />
        <h2 className="text-base font-semibold text-gray-600">{title}</h2>
      </div>
      <div className="flex justify-between items-center mt-3 w-full">
          <p className="text-2xlfont-bold">{value}</p>
          <p className={`flex items-center text-sm ${getChangeColor(change)}`}><TrendIcon className="mr-1"/>{change}</p>
      </div>
    </div>
  )
}

export default Card