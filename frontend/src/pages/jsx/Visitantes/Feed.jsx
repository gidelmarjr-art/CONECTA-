import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import '../../css/Visitantes/Feed.css';

const Feed = () => {
  // TODO: Substituir mocks por dados dinâmicos da API/Backend (ex: GET /api/posts)
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'ONG Vida Animal', handle: '@vidaanimal', avatar: '', tag: 'ONG' },
      content: 'Dia de adoção concluído com sucesso!',
      image: '', 
      likes: 120,
      comments: 45
    },
    {
      id: 2,
      user: { name: 'João Silva', handle: '@joaosilva', avatar: '', tag: 'VOLUNTÁRIO' },
      content: 'Ajudando na reforma da escola comunitária.',
      image: '',
      likes: 89,
      comments: 12
    }
  ]);

  // TODO: Substituir mocks por sugestões reais do backend
  const miniCards = [1, 2, 3];

  return (
    <div className="feed-container">
      {/* ÁREA PRINCIPAL DO FEED */}
      <main className="feed-main">
        
        {/* LISTA DE POSTS */}
        <section className="feed-posts">
          {posts.map((post) => (
            <article key={post.id} className="post-card fade-in">
              
              {/* Cabeçalho do Post */}
              <div className="post-header">
                <div className="post-user">
                  <div className="avatar-placeholder-small">
                    <img src={`https://i.pravatar.cc/150?u=${post.id}`} alt={post.user.name} />
                  </div>
                  <div className="post-user-info">
                    <div className="name-row">
                      <span className="post-name">{post.user.name}</span>
                      <span className="post-tag">{post.user.tag}</span>
                    </div>
                    <span className="post-handle">{post.user.handle}</span>
                  </div>
                </div>
                <button className="btn-icon">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Conteúdo do Post (Texto e Imagem) */}
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              
              <div className="post-image-placeholder">

                <div className="placeholder-text">Imagem do Post</div>
              </div>

              {/* Rodapé do Post  */}
              <div className="post-footer">
                <div className="post-interactions">
                  <button className="interaction-item">
                    <Heart size={20} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="interaction-item">
                    <MessageCircle size={20} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="interaction-item">
                    <Share2 size={20} />
                    <span>Compartilhar</span>
                  </button>
                </div>
                <button className="btn-icon save-btn">
                  <Bookmark size={20} />
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* GRID INFERIOR (Sugestões/Explorar) */}
        <section className="explore-section">
          <h3 className="section-title">Explore</h3>
          <div className="mini-cards-grid">
            {miniCards.map((card) => (
              <div key={card} className="mini-card fade-in-up" style={{animationDelay: `${card * 0.1}s`}}>
                <div className="mini-card-image">
                </div>
                <div className="mini-card-info">
                  <div className="mini-card-header">
                    <span className="mini-name">Projeto Esperança</span>
                    <span className="mini-tag">ONG</span>
                  </div>
                  <span className="mini-handle">@projesperanca</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Feed;