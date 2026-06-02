import Image from "next/image";

export default function Jalajcomp() {
  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="md:hidden">
        <Image
          src="/jalumobile.png"
          alt="Mobile Banner"
          width={768}
          height={500}
          className="w-full h-auto"
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <Image
          src="/jaludekstop.png"
          alt="Desktop Banner"
          width={1440}
          height={200}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}