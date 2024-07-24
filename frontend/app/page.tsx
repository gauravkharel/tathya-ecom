import Link from "next/link";
import MainLogo from '/public/logo.svg'
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex justify-center align-middle font-sans">
      <div className="mt-10">
        <div className=" visible sm:visible ">
          <Image
            priority
            src={MainLogo}
            alt='logo'
            width={100}
            height={100}
          />
        </div>
        <p className="text-6xl mt-10 font-medium ">
          Welcome to <span className="text-blue-500">Tathya</span>
        </p>
        <p className="text-2xl font-thin">
          Please <Link href={'login'} className="font-bold  text-blue-500"> login here </Link>to continue
        </p>
      </div>
    </div>
  );
}
