import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import '../Styles/Main.css';

const githubApiUrl = 'https://api.github.com/users/euandrelucas';
const placeholderImage = '/icon.webp';
const placeholderName = "André Lucas";
const placeholderDesc = "Backend Developer"

const links = [
  { label: "Início", href: "#home" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "mailto:contato@andrepaiva.dev" },
];

const placeholderSlider = [
  { id: 1, name: "Projeto 1", description: "Descrição do projeto 1", html_url: "https://github.com" },
  { id: 2, name: "Projeto 2", description: "Descrição do projeto 2", html_url: "https://github.com" },
  { id: 3, name: "Projeto 3", description: "Descrição do projeto 3", html_url: "https://github.com" },
  { id: 4, name: "Projeto 4", description: "Descrição do projeto 4", html_url: "https://github.com" },
  { id: 5, name: "Projeto 5", description: "Descrição do projeto 5", html_url: "https://github.com" },
  { id: 6, name: "Projeto 6", description: "Descrição do projeto 6", html_url: "https://github.com" },
  { id: 7, name: "Projeto 7", description: "Descrição do projeto 7", html_url: "https://github.com" },
  { id: 8, name: "Projeto 8", description: "Descrição do projeto 8", html_url: "https://github.com" },
  { id: 9, name: "Projeto 9", description: "Descrição do projeto 9", html_url: "https://github.com" },
  { id: 10, name: "Projeto 10", description: "Descrição do projeto 10", html_url: "https://github.com" },
]

const ProfileSection = ({ profilePhoto, userName, userDesc }) => (
  <section className="portTitle" id="home">
    {profilePhoto && <img className="profile-img" src={profilePhoto} alt={`${userName}'s GitHub profile`} />}
    <section className="info">
      <h1>{userName.toUpperCase()}</h1>
      <hr />
      <p>{userDesc}</p>
      <div className="linksContainer">
        {links.map((link, index) => (
          <a key={index} className="linkStyle" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </section>
  </section>
);

const truncateDescription = (description) => (
  description && description.length > 100 ? `${description.slice(0, 100)}...` : description
);

const Home = () => {
  const [profilePhoto, setProfilePhoto] = useState('');
  const [userDesc, setUserDesc] = useState('');
  const [userName, setUserName] = useState('');
  const [repos, setRepos] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const mainContentRef = useRef(null);

  useEffect(() => {
    setProfilePhoto(placeholderImage);
    setUserName(placeholderName);
    setUserDesc(placeholderDesc);
    setRepos(placeholderSlider);

    const fetchData = async () => {
      try {
        // Tentar recuperar dados do cache
        const cachedData = JSON.parse(localStorage.getItem('githubUserDatas'));

        if (cachedData && Date.now() - cachedData.timestamp < 600000) {
          setProfilePhoto(cachedData.profilePhoto);
          setUserDesc(cachedData.userDesc);
          setUserName(cachedData.userName);
          setRepos(cachedData.repos);
          setTechnologies(cachedData.technologies);
        } else {
          // Fazer chamadas à API se os dados em cache estiverem desatualizados
          const profileResponse = await fetch(githubApiUrl);
          const reposResponse = await fetch(`${githubApiUrl}/repos`);
        
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setProfilePhoto(profileData.avatar_url);
            setUserDesc(profileData.bio);
            setUserName(profileData.name);
            const timestamp = Date.now();
            await localStorage.setItem('githubUserDatas', JSON.stringify({
              profilePhoto: profileData.avatar_url,
              userDesc: profileData.bio,
              userName: profileData.name,
              repos: [],
              technologies: [],
              timestamp
            }));
          } else {
            console.error('Failed to fetch GitHub profile');
          }
        
          if (reposResponse.ok) {
            const reposData = await reposResponse.json();
            setRepos(reposData);
        
            const techSet = new Set();
            reposData.forEach((repo) => {
              repo.language && techSet.add(repo.language);
            });
            setTechnologies(Array.from(techSet));
            const cachedData = JSON.parse(localStorage.getItem('githubUserDatas'));
            await localStorage.setItem('githubUserDatas', JSON.stringify({
              profilePhoto: cachedData.profilePhoto,
              userDesc: cachedData.userDesc,
              userName: cachedData.userName,
              repos: reposData,
              technologies: Array.from(techSet),
              timestamp: Date.now()
            }));
          } else {
            console.error('Failed to fetch GitHub repositories');
          }
        }
        
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: false,
    pauseOnHover: false,
    dots: false,
    cssEase: 'linear',
    beforeChange: (current, next) => {
      const slides = document.querySelectorAll('.slick-slide');
      slides.forEach((slide, index) => {
        if (index === next) {
          slide.style.transition = 'transform 0.5s ease';
          slide.style.transform = 'translateX(0)';
        } else {
          slide.style.transition = 'transform 0s ease';
          slide.style.transform = 'translateX(-100%)';
        }
      });
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="App">
            <header id="home">
        {(profilePhoto || userName || userDesc) && (
          <ProfileSection profilePhoto={profilePhoto} userName={userName} userDesc={userDesc} />
        )}
      </header>
      <div className="hero">
        <main id="about">
          <section className="mainSection">
            <h2 className="title">Sobre mim</h2>
            <p className="text">Olá, meu nome é André Paiva, sou desenvolvedor backend, estudante de Jogos Digitais. Atualmente, estou focado em desenvolvimento de softares, na parte de backend. Tenho experiência com as tecnologias listadas abaixo e estou sempre disposto a aprender mais.</p>
            <div className="technologies-container">
              {technologies.map((tech, index) => (
                <div key={index} className="technology-item">
                  <img
                    src={`https://img.shields.io/badge/${tech.replace(/\s+/g, '-')}-%23323330.svg?style=for-the-badge&logo=${tech.toLowerCase()}&logoColor=%23007acc`}
                    alt={tech}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className="mainSection">
            <h2 className="title">Destaques</h2>
            <p className="text">Eu já atuei em vários projetos, sendo os principais:<br/>- <a className="bioLink" target="_blank" rel="noopener noreferrer" href="https://dreamteam.futbol">DreamTeam</a>, um simulador de futebol brasileiro!<br/>
            - <a className="bioLink" target="_blank" rel="noopener noreferrer" href="https://etheris.arkanus.app/">Etheris Studios</a>, transformando seus sonhos em realidade com um pequeno toque da magia dos jogos!<br/>
            </p>
          </section>
        </main>
        <main id="projects" ref={mainContentRef}>
          <section>
            <h2 className="title">Github</h2>
            <p className="textgh">O GitHub é uma plataforma de hospedagem e colaboração para desenvolvimento de software, lá eu hospedo códigos de alguns projetos meus, incluindo, você pode encontrar o código fonte deste website lá! Confira alguns projetos aqui embaixo:</p>
            <Slider {...settings}>
  {repos.map((repo) => (
    <div key={repo.id} className="project-card">
      <h3>{repo.name}</h3>
      <p>{truncateDescription(repo.description) ?? "Repositório sem descrição, mas recomendo você dar uma olhada :)"}</p>
      <div className="link-container" aria-hidden="true">
        <a className="linkStyle" href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="sm" /> Ver no GitHub
        </a>
      </div>
    </div>
  ))}
</Slider>
          </section>
        </main>
      </div>
      <footer id="footer">
        <section>
          <h2>Contato</h2>
          <p>Entre em contato comigo:</p>
          <p style={{ textAlign: 'center' }}>Email: <a target="_blank" rel="noopener noreferrer" href="mailto:contato@andrepaiva.dev">contato@andrepaiva.dev</a></p>
        </section>
      </footer>
    </div>
  );
}

export default Home;

