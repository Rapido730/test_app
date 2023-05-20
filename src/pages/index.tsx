import Image from "next/image";
import { Poppins } from "next/font/google";

import axios from "axios";
import { UserType } from "@/database/models/user.model";
import Body from "@/components/body";
const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300"],
});
export default function Home() {
  return (
    <div className={"tw-px-4 " + poppins.className}>
      <Body />
    </div>
  );
}
