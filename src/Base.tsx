
import { useEffect, useState } from "react";
function Compteur() {
  const [compteur, setCompteur] = useState(0);

  return (
    <button onClick={() => setCompteur(compteur + 1)}>
      Cliquez {compteur} fois
    </button>
  );
}   


function TitrePage() {
  useEffect(() => {
    document.title = "Ma page";
  }, []);  // ← s'exécute UNE SEULE fois au chargement

  return <h1>Titre</h1>;
}   