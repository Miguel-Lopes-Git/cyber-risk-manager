import Image from "next/image";

export default function Icon({ className, imagePath, text, onClick }) {
    return (
        <div
            className={
                className +
                " flex flex-col items-center justify-center hover:bg-blue-400 hover:border-4 hover:border-blue-600 hover:p-4 select-none p-5 cursor-pointer"
            }
            onClick={onClick}
        >
            <Image src={imagePath} alt={text} width={120} height={120} />
            <p className="text-white text-3xl">{text}</p>
        </div>
    );
}
