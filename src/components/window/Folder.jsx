import Image from "next/image";

function IconFolder({ src, alt, text }) {
    return (
        <div className="flex flex-col items-center w-46 h-46 p-2 hover:bg-blue-400 hover:border-4 hover:border-blue-600 hover:p-1 cursor-pointer select-none">
            <Image src={src} width={128} height={128} alt={alt} />
            <p className="pt-2 text-3xl">{text}</p>
        </div>
    );
}

export default function Folder({ className }) {
    return (
        <div
            className={
                className +
                " w-full h-full flex justify-start items-start p-10 flex-wrap gap-6 overflow-auto"
            }
        >
            <IconFolder
                src={"/images/icons/folder.webp"}
                alt="Bureau"
                text="Bureau"
            />

            <IconFolder
                src={"/images/icons/folder.webp"}
                alt="Documents"
                text="Documents"
            />

            <IconFolder
                src={"/images/icons/folder.webp"}
                alt="Photos"
                text="Photos"
            />

            <IconFolder
                src={"/images/icons/folder.webp"}
                alt="Vidéos"
                text="Vidéos"
            />
        </div>
    );
}
