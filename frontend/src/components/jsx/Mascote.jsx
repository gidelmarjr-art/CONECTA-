import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import '../css/Mascote.css';

const mensagensInativasNormal = [
  "Beba água! 💧",
  "Você é incrível! ✨",
  "Que dia lindo para mudar o mundo! 🌍",
  "Precisa de ajuda? Estou aqui! 💙",
  "Já registrou as suas horas hoje? 🚀",
  "Cuidado com o café no teclado! ☕",
  "O meu nome é Conectico, mas pode me chamar de Tico! 😎",
];

const mensagensCocegasNormal = [
  "Hahaha! Cócegas não! 😂",
  "Ai! Isso faz cócegas! 😆",
  "Pára com isso! Hihihi 🤭",
];

const mensagensInativasCopa = [
  "Rumo ao Hexa! 🇧🇷⭐",
  "O Japão tentou usar o poder da amizade, mas no futebol não funciona! 🇯🇵🍣😂",
  "Projeto Blue Lock foi adiado para 2030... Sayonara! 🎌👋",
  "Alguém avisa o Japão que a Copa não é um anime shounen! ⚽📺",
  "Estou mais nervoso que adepto em disputa de penáltis! 🥵",
  "Vuvuzela ativada! PRÓÓÓÓÓÓ! 🎺",
  "Onde está o Galvão para narrar a minha vida? 🎙️",
  "Beba água, porque haja coração, amigo! 💧💙"
];

const mensagensCocegasCopa = [
  "Falta, juiz!! Isso é falta!! 🟨",
  "VAR! Chama o VAR que isso foi cócegas! 📺😂",
  "Cartão vermelho para ti! 🟥 hihihi",
  "Eu não fiz simulação, juro! 😆 Neymar feelings!"
];

const Mascote = () => {
  const [mensagemAtual, setMensagemAtual] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [posicaoBalao, setPosicaoBalao] = useState('posicao-topo'); 
  
  const [isOverheating, setIsOverheating] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  
  const [isModoCopa, setIsModoCopa] = useState(() => Math.random() > 0.5);
  const primeiraRenderizacao = useRef(true);
  
  const nodeRef = useRef(null); 
  const pupilaEsqRef = useRef(null);
  const pupilaDirRef = useRef(null);
  const antenaRef = useRef(null);
  
  const falaTimeout = useRef(null);
  const blinkTimeout = useRef(null);
  const pressTimer = useRef(null);
  const heatTimer = useRef(null);
  const resetClickTimer = useRef(null);
  const clickCount = useRef(0);

  useEffect(() => {
    const modoTimer = setInterval(() => {
      if (Math.random() > 0.7 && !isExploded && !isDragging) {
        setIsModoCopa(prev => !prev);
      }
    }, 60000);
    return () => clearInterval(modoTimer);
  }, [isExploded, isDragging]);

  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return; 
    }
    
    if (isModoCopa) {
      falar("MODO COPA: ATIVADO! Rumo ao Hexa! Japão já foi! 🇯🇵🍣👋", 4000);
    } else {
      falar("Fim de jogo. Voltemos ao trabalho sério! 💼", 3500);
    }
  }, [isModoCopa]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isExploded) return;
      
      if (nodeRef.current && pupilaEsqRef.current && pupilaDirRef.current && antenaRef.current) {
        const rect = nodeRef.current.getBoundingClientRect();
        const mascoteCenterX = rect.left + rect.width / 2;
        const mascoteCenterY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - mascoteCenterX;
        const deltaY = e.clientY - mascoteCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2) / 15, 5); 
        
        const eyeX = Math.cos(angle) * distance;
        const eyeY = Math.sin(angle) * distance;
        
        pupilaEsqRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
        pupilaDirRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
        antenaRef.current.style.transform = `translateX(-50%) rotate(${eyeX * 2}deg)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isExploded]);

  useEffect(() => {
    const randomizeBlink = () => {
      const timeout = Math.random() * 4000 + 2000;
      blinkTimeout.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          if(!isExploded) randomizeBlink();
        }, 150);
      }, timeout);
    };
    randomizeBlink();
    return () => clearTimeout(blinkTimeout.current);
  }, [isExploded]);

  useEffect(() => {
    const intervaloFala = setInterval(() => {
      if (!isDragging && !isHovered && !isExploded && !isOverheating) {
        const arrayMensagens = isModoCopa ? mensagensInativasCopa : mensagensInativasNormal;
        const msgAleatoria = arrayMensagens[Math.floor(Math.random() * arrayMensagens.length)];
        falar(msgAleatoria, 4000);
      }
    }, 20000); 
    return () => clearInterval(intervaloFala);
  }, [isDragging, isHovered, isExploded, isOverheating, isModoCopa]);

  const atualizarPosicaoBalao = () => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      
      if (rect.top < 80) setPosicaoBalao('posicao-baixo');
      else if (rect.left < 100) setPosicaoBalao('posicao-direita');
      else if (windowWidth - rect.right < 100) setPosicaoBalao('posicao-esquerda');
      else setPosicaoBalao('posicao-topo');
    }
  };

  useEffect(() => {
    if (mensagemAtual) atualizarPosicaoBalao();
  }, [mensagemAtual]);

  const falar = (mensagem, tempo = 3000) => {
    setMensagemAtual(mensagem);
    clearTimeout(falaTimeout.current);
    falaTimeout.current = setTimeout(() => { setMensagemAtual(null); }, tempo);
  };

  const triggerExplosion = () => {
    clearTimeout(heatTimer.current);
    clearTimeout(pressTimer.current);
    clearTimeout(resetClickTimer.current);
    clickCount.current = 0;
    
    setIsOverheating(false);
    setIsDragging(false);
    setIsExploded(true);
    
    const msgExplosao = isModoCopa ? "KABOOOOM!!! 💥 (Pelo menos não foi 7x1!)" : "KABOOOOM!!! 💥";
    falar(msgExplosao, 2500);
    
    setTimeout(() => {
      setIsRecovering(true);
      const msgRecuperacao = isModoCopa ? "Ai... fui eliminado mais rápido que o Japão. 🤕" : "Ai... por favor, não faça mais isso. 🤕";
      falar(msgRecuperacao, 4000);
      
      setTimeout(() => {
        setIsExploded(false);
        setIsRecovering(false);
      }, 5000); 
    }, 1500); 
  };

  const handleStart = (e, data) => {
    if (isExploded) return false;
    
    setIsDragging(true);
    setIsClicked(true);
    setMensagemAtual(null);

    clickCount.current += 1;
    clearTimeout(resetClickTimer.current);
    resetClickTimer.current = setTimeout(() => { 
      clickCount.current = 0; 
      setIsOverheating(false); 
    }, 1500);

    if (clickCount.current === 4) {
      setIsOverheating(true);
      const aviso = isModoCopa ? "Para! Vou de arrasta igual aos japoneses! 🚨" : "Para de me apertar! Vou estourar! 🚨";
      falar(aviso, 2000);
    }
    if (clickCount.current >= 7) {
      triggerExplosion();
      return;
    }

    clearTimeout(heatTimer.current);
    clearTimeout(pressTimer.current);

    heatTimer.current = setTimeout(() => {
      if(!isExploded) {
        setIsOverheating(true);
        const avisoQuente = isModoCopa ? "JUUIIIZ ISSO É PENALTI 😱" : "😱";
        falar(avisoQuente, 3000);
      }
    }, 3000);

    pressTimer.current = setTimeout(() => {
      if(!isExploded) triggerExplosion();
    }, 5500);
  };

  const handleDrag = () => {
    if (mensagemAtual) atualizarPosicaoBalao();
  };

  const handleStop = (e, data) => {
    if (isExploded) return;
    
    setIsDragging(false);
    setIsClicked(false);

    clearTimeout(heatTimer.current);
    clearTimeout(pressTimer.current);
    
    if (clickCount.current < 4 && isOverheating) {
      setIsOverheating(false);
      const alivio = isModoCopa ? "Ufa... o VAR salvou da expulsão. 😮‍💨" : "Ufa... quase explodi. 😮‍💨";
      falar(alivio, 2000);
    }

    if (Math.abs(data.deltaX) < 2 && Math.abs(data.deltaY) < 2 && !isOverheating) {
      const arrayCocegas = isModoCopa ? mensagensCocegasCopa : mensagensCocegasNormal;
      const msgCocegas = arrayCocegas[Math.floor(Math.random() * arrayCocegas.length)];
      falar(msgCocegas, 2000);
    } 
    else if (!isOverheating) {
      if (nodeRef.current) {
        nodeRef.current.classList.add('soltou');
        const aterragem = isModoCopa ? "Golaçooo de aterrissagem! ⚽" : "🪂";
        falar(aterragem, 2000);
        setTimeout(() => { if(nodeRef.current) nodeRef.current.classList.remove('soltou'); }, 1000);
      }
    }
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      bounds="body"
      onStart={handleStart}
      onDrag={handleDrag} 
      onStop={handleStop}
      disabled={isExploded}
    >
      <div 
        ref={nodeRef} 
        className={`mascote-wrapper-global 
          ${isModoCopa ? 'modo-copa' : ''}
          ${isDragging ? 'arrastando' : ''} 
          ${isClicked ? 'clicado' : ''} 
          ${isHovered && !isOverheating ? 'hovered' : ''} 
          ${isOverheating ? 'sobreaquecendo' : ''}
          ${isExploded ? 'explodido' : ''}
          ${isRecovering ? 'tonto' : ''}
        `}
        onMouseEnter={() => { 
          setIsHovered(true); 
          if(!isDragging && !mensagemAtual && !isExploded && !isRecovering) {
            falar(isModoCopa ? "Toca a bola! ⚽👋" : "Oii! 👋", 2000);
          }
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {mensagemAtual && <div className={`balao-fala ${posicaoBalao}`}>{mensagemAtual}</div>}

        {isExploded && !isRecovering ? (
          <div className="explosao-container">
            <div className="nuvem-explosao">💥</div>
            <div className="fumaca-morta">💨</div>
          </div>
        ) : (
          <div className="mascote-conecta">
            <div className="suor-engracado">{isOverheating ? '🔥' : '💧'}</div>
            
            {/* EFEITOS DO MODO COPA */}
            {isModoCopa && (
              <>
                <div className="mascote-aura-copa"></div>
                {/* EXPLOSÃO DE CONFETES VERDES E AMARELOS */}
                <div className="mascote-chuva-confetes">
                  <div className="confete c-verde c-1"></div>
                  <div className="confete c-amarelo c-2"></div>
                  <div className="confete c-verde c-3"></div>
                  <div className="confete c-amarelo c-4"></div>
                  <div className="confete c-verde c-5"></div>
                  <div className="confete c-amarelo c-6"></div>
                  <div className="confete c-verde c-7"></div>
                  <div className="confete c-amarelo c-8"></div>
                </div>
              </>
            )}

            <div className="mascote-corpo">
              {/* REMOVIDO BOLA E BANDEIRA. MANTIDA APENAS A FAIXINHA */}
              {isModoCopa && <div className="faixa-copa"></div>}

              <div ref={antenaRef} className="mascote-antena-haste">
                <div className="mascote-antena-luz"></div>
              </div>
              <div className="mascote-olhos-container">
                <div className={`mascote-olho ${isBlinking ? 'piscar' : ''}`}>
                  {isRecovering ? <span className="olho-tonto">X</span> : <div ref={pupilaEsqRef} className="mascote-pupila" />}
                </div>
                <div className={`mascote-olho ${isBlinking ? 'piscar' : ''}`}>
                  {isRecovering ? <span className="olho-tonto">X</span> : <div ref={pupilaDirRef} className="mascote-pupila" />}
                </div>
              </div>
              <div className="mascote-bochecha esquerda"></div>
              <div className="mascote-bochecha direita"></div>
              <div className="mascote-boca"></div>
            </div>
            <div className="mascote-sombra"></div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Mascote;