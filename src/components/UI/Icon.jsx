import Image from "next/image";

/**
 * Composant Icon pour afficher une icône cliquable sur le bureau.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.className - Classes CSS supplémentaires.
 * @param {string} props.imagePath - Chemin de l'image de l'icône.
 * @param {string} props.text - Texte affiché sous l'icône.
 * @param {Function} props.onClick - Fonction appelée lors du clic.
 */
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
