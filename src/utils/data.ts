import { AiFillShopping } from "react-icons/ai";
import { BiSolidDollarCircle } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";

export const cardData = [
  {
    id: 1,
    title: "Total Customers",
    description: "Customer count",
    value: "567,899",
    change: "+2.5%", 
    icon: MdPeopleAlt

  },
  {
    id: 2,
    title: "Total Revenue",
    description: "Overall revenue growth",
    value: "$3,465 M",
    change: "+0.5%",
    icon: BiSolidDollarCircle,
  },
  {
    id: 3,
    title: "Total Orders",
    description: "Order count",
    value: "1,136 M",
    change: "-0.2%",
    icon: AiFillShopping,
  },
  {
    id: 4,
    title: "Total Returns",
    description: "Returns count",
    value: "1,789 M",
    change: "0.12%",
    icon: AiFillShopping,

  }
]

 export const users = [
  {
    "user_id": 1,
    "user_name": "user name",
    "role": "Admin Manager",
    "photo": ""
  }
 ]
 export const barCharthData = {
  barLabels : ['1 Jan', '2 Feb', '3 Mar', '4 Apr', '5 May', '6 Jun', '7 Jul', '8 Aug','9 Sep', '10 Oct', '9 Nov', '12 Dec'],
  barData1 : [10000, 15000, 20000, 25000, 30000, 20000, 10000, 10000, 15000, 20000, 25000, 30000, 20000],
  barData2 : [15000, 10000, 25000, 20000, 35000, 30000, 15000, 15000, 10000, 25000, 20000, 35000, 10000]
 }

//  export const cityData = [
//   { name: 'Riyadh', lat: 24.7136, lng: 46.6753, orderPercentage: 80 },
//   { name: 'Dubai', lat: 25.276987, lng: 55.296249, orderPercentage: 50 },
//   { name: 'Tehran', lat: 35.6892, lng: 51.389, orderPercentage: 30 },
//   { name: 'Baghdad', lat: 33.3152, lng: 44.3661, orderPercentage: 10 },
//   { name: 'Cairo', lat: 30.0444, lng: 31.2357, orderPercentage: 60 },
//   { name: 'Istanbul', lat: 41.0082, lng: 28.9784, orderPercentage: 20 },
//   { name: 'Amman', lat: 31.9539, lng: 35.9106, orderPercentage: 90 }
// ];