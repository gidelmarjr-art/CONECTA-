import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import '../css/Mascote.css';

const mensagens = [
  "Beba água! 💧",
  "Você é incrível! ✨",
  "Que dia lindo para mudar o mundo! 🌍",
  "Precisa de ajuda? Estou aqui! 💙",
  "Já registrou suas horas hoje? 🚀",
  "Sou o melhor mascote! 😎",
  "Me leva pra passear! 🎈",
  "Cuidado com o café no teclado! ☕",
  "Eu sou o Tico! Será um prazer ajudar!✨ ",
  "Meu nome é Conectico, mas pode me chamar de Tico! 😎",

];

const Mascote = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });
  const [mensagemAtual, setMensagemAtual] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Novo estado para o efeito gelatina no clique
  const [isClicked, setIsClicked] = useState(false);
  
  const nodeRef = useRef(null); 

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleMouseMove = (e) => { setMousePos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const intervaloFala = setInterval(() => {
      if (!isDragging) { // Não fala enquanto é arrastado
        const msgAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
        setMensagemAtual(msgAleatoria);
        setTimeout(() => { setMensagemAtual(null); }, 5000);
      }
    }, 20000); // Aumentei um pouco o tempo entre falas
    return () => clearInterval(intervaloFala);
  }, [isDragging]);

  // Lógica para piscar os olhos aleatoriamente
  useEffect(() => {
    const blinkBody = document.querySelectorAll('.mascote-olho');
    const randomizeBlink = () => {
      const timeout = Math.random() * 5000 + 2000; // Entre 2 e 7 segundos
      setTimeout(() => {
        blinkBody.forEach(olho => olho.classList.add('piscar'));
        setTimeout(() => {
          blinkBody.forEach(olho => olho.classList.remove('piscar'));
          randomizeBlink();
        }, 200); // Tempo da piscada
      }, timeout);
    };
    randomizeBlink();
  }, []);

  const eyeMoveX = (mousePos.x / windowSize.width) * 12 - 6;
  const eyeMoveY = (mousePos.y / windowSize.height) * 12 - 6;

  // Funções para controlar o clique e arrasto
  const handleStart = () => {
    setIsDragging(true);
    setIsClicked(false); // Remove efeito gelatina se virar arrasto
  };

  const handleStop = () => {
    setIsDragging(false);
    // Adiciona uma classe temporária para o balanço final no CSS
    nodeRef.current.classList.add('soltou');
    setTimeout(() => {
      nodeRef.current.classList.remove('soltou');
    }, 1000);
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      bounds="body"
      onStart={handleStart}
      onStop={handleStop}
    >
      <div 
        ref={nodeRef} 
        className={`mascote-wrapper-global ${isDragging ? 'arrastando' : ''} ${isClicked ? 'clicado' : ''}`}
        onMouseDown={() => !isDragging && setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        onMouseLeave={() => setIsClicked(false)} // Garante que saia o efeito se soltar fora
      >
        
        {mensagemAtual && (
          <div className="balao-fala">
            {mensagemAtual}
          </div>
        )}

        <div className="mascote-conecta">
          {/* Gotinha de suor engraçada (só aparece no CSS quando arrasta) */}
          <div className="suor-engracado">💧</div>

          <div className="mascote-corpo">
            <div className="mascote-olho">
              <div 
                className="mascote-pupila" 
                style={{ transform: `translate(${eyeMoveX}px, ${eyeMoveY}px)` }} 
              />
            </div>
            <div className="mascote-olho">
              <div 
                className="mascote-pupila" 
                style={{ transform: `translate(${eyeMoveX}px, ${eyeMoveY}px)` }} 
              />
            </div>
          </div>
          <div className="mascote-sombra"></div>
        </div>

      </div>
    </Draggable>
  );
};

export default Mascote;