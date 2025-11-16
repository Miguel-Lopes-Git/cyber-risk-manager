export default function Folder({ className }) {
    return (
        <div
            className={
                className + " w-full h-full grid grid-cols-[0.3fr_0.7fr]"
            }
        >
            {/* Arborescence */}
            <div className="col-start-1 bg-amber-400">
                <button className="text-2xl">Acceuil</button>
            </div>

            {/* Contenu */}
            <div className="col-start-2 bg-amber-700"></div>
        </div>
    );
}
