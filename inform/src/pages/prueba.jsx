
import { useStoreInformes } from "../store/useStoreInforms";
function Prueba() {
const { informes } = useStoreInformes();

const mirar = () => {
    console.log(informes);
    
}

mirar()
  return (
    <div className="h-screen bg-[#fefcfc]"> 
    <h1>no entiendo</h1>
      </div>
  );
}

export default Prueba;
