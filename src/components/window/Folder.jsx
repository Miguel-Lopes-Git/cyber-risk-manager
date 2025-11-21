import Image from "next/image";

/**
 * Composant IconFolder pour afficher une icône de dossier.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.src - Chemin de l'image.
 * @param {string} props.alt - Texte alternatif de l'image.
 * @param {string} props.text - Texte affiché sous l'icône.
 */
function IconFolder({ src, alt, text }) {
    return (
        <div className="flex flex-col items-center w-46 h-46 p-2 hover:bg-blue-400 hover:border-4 hover:border-blue-600 hover:p-1 cursor-pointer select-none">
            <Image src={src} width={128} height={128} alt={alt} />
            <p className="pt-2 text-3xl">{text}</p>
        </div>
    );
}

/**
 * Composant Folder représentant le contenu d'un dossier (fenêtre).
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.className - Classes CSS supplémentaires.
 */
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
