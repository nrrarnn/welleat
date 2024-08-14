import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa"; // Menggunakan react-icons untuk ikon WhatsApp

function ChatWa() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  
  const message =
    "Halo, saya tertarik untuk mendapatkan informasi lebih lanjut!";

  
  const encodedMessage = encodeURIComponent(message);

  return (
    <div className="relative">
     
      <button
        onClick={togglePopup}
        className="fixed bottom-4 right-4 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp size={30} />
      </button>

     
      {isOpen && (
        <div className="fixed bottom-16 right-4 p-4 bg-white border rounded shadow-lg">
          <h2 className="text-lg font-semibold">Mari saling sharing!</h2>
          <p className="mt-2">.</p>
          <a
            href={`https://wa.me/81479123851?text=${encodedMessage}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Chat Now
          </a>
        </div>
      )}
    </div>
  );
}

export default ChatWa;
