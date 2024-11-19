import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [dbzImage, setDbzImage] = useState("");    // URL de la imagen que vamos a mostrar
  const [dbzNameInputDebounce, setdbzNameInputDebounce] = useState(""); // Para almacenar el valor debounced

  // Usamos useRef para guardar el timeout
  const timeoutRef = useRef(null);

  const fetchImage = async () => {
    try {
      const response = await fetch(`https://dragonball-api.com/api/characters?name=${dbzNameInputDebounce}`);
      const data = await response.json();
      console.log(data);
      if (data.length !== 0) {
        setDbzImage(data[0].image);
      } else {
        setDbzImage("");  
      }

    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (dbzNameInputDebounce !== "") {
      fetchImage();
    } else {
      setDbzImage("");  // Si el campo está vacío, ocultamos la imagen
    }
  }, [dbzNameInputDebounce]);

  const handleSearchChange = (event) => {
    const value = event.target.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setdbzNameInputDebounce(value);
    }, 1000);
  };

  return (
    <div className="App">
      <h3>Ingresa el nombre de un personaje de DBZ</h3>
      <input
        type="text"
        onChange={handleSearchChange}
        placeholder="Escribe para buscar"
      />

      {dbzImage && <img src={dbzImage} alt="PERSONAJE DE DBZ" />}
    </div>
  );
};

export default App;
