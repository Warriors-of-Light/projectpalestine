/*
    Icon common component
    To Add New Icons -> https://react-icons.github.io/
*/

import {
  FiSlash,
  FiMenu,
  FiSearch,
  FiStar,
  FiTrash,
  FiX,
  FiInfo,
  FiAlertTriangle,
  FiClock,
  FiHeart,
} from "react-icons/fi";
import {
  BiDonateHeart,
  BiDownload,
  BiSolidContact,
  BiSolidHeartCircle,
} from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { AiFillGithub, AiOutlineCheckCircle } from "react-icons/ai";
import { GrReturn } from "react-icons/gr";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

import React from "react";

const Icon = (props: {
  type?: string;
  style?: string;
  size?: 20 | 30 | 35 | 40 | 50;
}) => {
  const type: string = props.type ? props.type : "";
  const style: string = props.style ? props.style : "stroke-app-dark";
  const size: number = props.size ? props.size : 20;

  switch (type) {
    case "heart":
      return <BiSolidHeartCircle className={style} size={size} />;
    case "clock":
      return <FiClock className={style} size={size} />;
    case "return":
      return <GrReturn className={style} size={size} />;
    case "submit":
      return <RiSendPlaneFill className={style} size={size} />;
    case "alert":
      return <FiAlertTriangle className={style} size={size} />;
    case "check":
      return <AiOutlineCheckCircle className={style} size={size} />;
    case "menu":
      return <FiMenu className={style} size={size} />;
    case "search":
      return <FiSearch className={style} size={size} />;
    case "star":
      return <FiStar className={style} size={size} />;
    case "trash":
      return <FiTrash className={style} size={size} />;
    case "close":
      return <FiX className={style} size={size} />;
    case "download":
      return <BiDownload className={style} size={size} />;
    case "about":
      return <FiInfo className={style} size={size} />;
    case "contact":
      return <BiSolidContact className={style} size={size} />;
    case "donate":
      return <BiDonateHeart className={style} size={size} />;
    case "login":
      return <BiLogIn className={style} size={size} />;
    case "logout":
      return <BiLogOut className={style} size={size} />;
    case "github":
      return <AiFillGithub className={style} size={size} />;
    case "moon":
      return <BsFillMoonFill className={style} size={size} />;
    case "sun":
      return <BsFillSunFill className={style} size={size} />;
    case "appstore":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="30px"
          height="30px"
        >
          <linearGradient
            id="OpwYZ9nhL01h2sErtedzua"
            x1="24"
            x2="24"
            y1="4.617"
            y2="40.096"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#33bef0" />
            <stop offset="1" stopColor="#0a85d9" />
          </linearGradient>
          <path
            fill="url(#OpwYZ9nhL01h2sErtedzua)"
            d="M33.9,6H14.1C9.626,6,6,9.626,6,14.1v19.8c0,4.473,3.626,8.1,8.1,8.1h19.8 c4.474,0,8.1-3.627,8.1-8.1V14.1C42,9.626,38.374,6,33.9,6z"
          />
          <path
            d="M12.3,30.977c-1.378,0-2.5-1.114-2.5-2.484c0-1.37,1.122-2.484,2.5-2.484h3.798l4.869-8.309 l-1.423-2.429c-0.338-0.578-0.431-1.251-0.262-1.897c0.169-0.646,0.58-1.188,1.156-1.524c0.384-0.224,0.82-0.342,1.262-0.342 c0.885,0,1.712,0.474,2.158,1.237l0.007,0.012l0.006-0.011c0.445-0.763,1.272-1.237,2.158-1.237c0.443,0,0.879,0.119,1.263,0.343 c1.19,0.698,1.59,2.233,0.892,3.422l-6.291,10.736h3.328l0.293,0.295c0.222,0.223,0.425,0.476,0.623,0.774l0.197,0.33 c0.489,0.911,0.598,1.918,0.319,2.854l-0.211,0.714H12.3z"
            opacity=".05"
          />
          <path
            d="M12.3,30.477c-1.103,0-2-0.89-2-1.984c0-1.094,0.897-1.984,2-1.984h4.084l5.162-8.809l-1.572-2.682 c-0.27-0.461-0.345-1-0.209-1.518c0.135-0.517,0.463-0.95,0.924-1.219c0.307-0.179,0.656-0.274,1.01-0.274 c0.708,0,1.37,0.379,1.727,0.989l0.438,0.749l0.438-0.748c0.356-0.61,1.018-0.989,1.726-0.989c0.354,0,0.703,0.095,1.01,0.274 c0.952,0.559,1.271,1.787,0.713,2.738L21.02,26.509h3.992l0.146,0.147c0.198,0.199,0.381,0.427,0.56,0.698l0.185,0.31 c0.418,0.781,0.511,1.646,0.27,2.456l-0.106,0.357H12.3z"
            opacity=".07"
          />
          <path
            fill="#fff"
            d="M25.302,27.63c-0.148-0.224-0.312-0.434-0.498-0.621h-4.656l7.173-12.242 c0.419-0.715,0.179-1.634-0.535-2.053c-0.716-0.419-1.635-0.179-2.052,0.536l-0.87,1.484l-0.87-1.485 c-0.418-0.715-1.337-0.954-2.052-0.536c-0.715,0.418-0.955,1.337-0.536,2.052l1.72,2.935l-5.455,9.309H12.3 c-0.829,0-1.5,0.665-1.5,1.484c0,0.819,0.671,1.484,1.5,1.484h13.394c0.194-0.653,0.141-1.382-0.221-2.058L25.302,27.63z"
          />
          <path
            d="M14.5,36.179c-0.443,0-0.879-0.119-1.263-0.344c-0.576-0.338-0.986-0.88-1.155-1.526 c-0.168-0.646-0.075-1.32,0.263-1.896l0.713-1.218l0.44-0.088C13.859,31.036,14.196,31,14.528,31l0.118,0.001 c1.081,0.032,2.06,0.494,2.766,1.3l0.476,0.542l-1.229,2.1C16.211,35.706,15.385,36.179,14.5,36.179z"
            opacity=".05"
          />
          <path
            d="M14.5,35.679c-0.354,0-0.704-0.095-1.01-0.275c-0.46-0.27-0.789-0.704-0.924-1.221 s-0.061-1.056,0.21-1.517l0.6-1.024l0.22-0.044c0.329-0.066,0.634-0.098,0.932-0.098l0.112,0.001 c0.933,0.028,1.783,0.429,2.396,1.129l0.238,0.271l-1.047,1.789C15.87,35.3,15.208,35.679,14.5,35.679z"
            opacity=".07"
          />
          <path
            fill="#fff"
            d="M14.626,32.002c-0.317-0.009-0.628,0.026-0.932,0.087l-0.487,0.831 c-0.419,0.715-0.179,1.634,0.536,2.053c0.238,0.14,0.5,0.206,0.757,0.206c0.515,0,1.017-0.266,1.295-0.741l0.865-1.477 c-0.487-0.556-1.19-0.934-2.03-0.959H14.626z"
          />
          <path
            d="M33.229,36.179c-0.885,0-1.712-0.474-2.158-1.236l-6.027-10.285l-0.017-0.052 c-0.417-1.289-0.335-2.618,0.214-3.793l1.669-2.858l4.72,8.055h4.07c1.378,0,2.5,1.114,2.5,2.484c0,1.37-1.122,2.484-2.5,2.484 h-1.159l0.842,1.437c0.338,0.576,0.431,1.249,0.263,1.896s-0.579,1.188-1.155,1.526C34.109,36.06,33.673,36.179,33.229,36.179z"
            opacity=".05"
          />
          <path
            d="M33.229,35.679c-0.708,0-1.37-0.378-1.727-0.988l-6-10.238l-0.017-0.052 c-0.361-1.118-0.288-2.317,0.208-3.376l1.216-2.081l4.433,7.565H35.7c1.103,0,2,0.89,2,1.984c0,1.094-0.897,1.984-2,1.984h-2.031 l1.283,2.19c0.271,0.461,0.345,1,0.21,1.517s-0.463,0.951-0.924,1.221C33.933,35.584,33.584,35.679,33.229,35.679z"
            opacity=".07"
          />
          <path
            fill="#fff"
            d="M35.7,27.009h-4.643l-4.147-7.076l-0.763,1.303c-0.444,0.95-0.504,2.024-0.185,3.011l5.972,10.191 c0.279,0.476,0.78,0.741,1.295,0.741c0.257,0,0.519-0.066,0.757-0.206c0.715-0.419,0.954-1.338,0.535-2.053l-1.725-2.943H35.7 c0.829,0,1.5-0.665,1.5-1.484C37.2,27.674,36.529,27.009,35.7,27.009z"
          />
        </svg>
      );
    case "googleplay":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="30px"
          height="30px"
          clip-rule="evenodd"
          baseProfile="basic"
        >
          <linearGradient
            id="jFdG-76_seIEvf-hbjSsaa"
            x1="1688.489"
            x2="1685.469"
            y1="-883.003"
            y2="-881.443"
            gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#047ed6" />
            <stop offset="1" stopColor="#50e6ff" />
          </linearGradient>
          <path
            fill="url(#jFdG-76_seIEvf-hbjSsaa)"
            fill-rule="evenodd"
            d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194 v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z"
            clip-rule="evenodd"
          />
          <linearGradient
            id="jFdG-76_seIEvf-hbjSsab"
            x1="1645.286"
            x2="1642.929"
            y1="-897.055"
            y2="-897.055"
            gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffda1c" />
            <stop offset="1" stopColor="#feb705" />
          </linearGradient>
          <path
            fill="url(#jFdG-76_seIEvf-hbjSsab)"
            fill-rule="evenodd"
            d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428 l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z"
            clip-rule="evenodd"
          />
          <linearGradient
            id="jFdG-76_seIEvf-hbjSsac"
            x1="1722.978"
            x2="1720.622"
            y1="-889.412"
            y2="-886.355"
            gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#d9414f" />
            <stop offset="1" stopColor="#8c193f" />
          </linearGradient>
          <path
            fill="url(#jFdG-76_seIEvf-hbjSsac)"
            fill-rule="evenodd"
            d="M33.762,30.561l-6.565-6.567L7.809,43.382 c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561"
            clip-rule="evenodd"
          />
          <linearGradient
            id="jFdG-76_seIEvf-hbjSsad"
            x1="1721.163"
            x2="1722.215"
            y1="-891.39"
            y2="-890.024"
            gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#33c481" />
            <stop offset="1" stopColor="#61e3a7" />
          </linearGradient>
          <path
            fill="url(#jFdG-76_seIEvf-hbjSsad)"
            fill-rule="evenodd"
            d="M33.762,17.429L11.041,4.522 c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z"
            clip-rule="evenodd"
          />
        </svg>
      );
  }

  return <FiSlash size={size} className={style} />;
};

export default Icon;
