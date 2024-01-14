
import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';
import styles from '../../styles/EpisodeDetail.module.css';

const EpisodeDetail = ({ episode, characters }) => {
  const { name, air_date, episode: episodeCode, url, created } = episode;

  return (
    <div className={styles.container}>
      <main >
        <motion.div

          color='#0a87ee'
          fontWeight="bold"
          whileHover={{
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(to right, #4928a3, #dcc31d)',
            color: 'white',
            scale: [1, 1.2, 1.1],
            rotate: [0, 10, -10, 0],
            filter: [
              'hue-rotate(0) contrast(100%)',
              'hue-rotate(360deg) contrast(200%)',
              'hue-rotate(45deg) contrast(300%)',
              'hue-rotate(0) contrast(100%)',
            ],

            transition: {
              duration: 0.2,
            },
          }}
          style={{
            cursor: 'pointer',
            transition: 'color 0.2s',

            fontSize: '1.5rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}


        >
          <h1 className="title">{name}</h1>
        </motion.div>


        <div className="episode-detail">
          {/* <h1>{name}</h1> */}
          <p>Air Date: {air_date}</p>
          <p>Episode Code: {episodeCode}</p>
          <div>
            <p>Characters:</p>
            <ul>
              {characters.map((character, index) => (

                <motion.li
                  whileHover={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'white',
                    scale: [1, 1.4, 1.2],
                    rotate: [0, 1, -1, 0],
                    filter: [
                      'hue-rotate(0) contrast(100%)',
                      'hue-rotate(100deg) contrast(100%)',
                      'hue-rotate(45deg) contrast(100%)',
                      'hue-rotate(0) contrast(100%)',
                    ],
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  <a href={`/character/${character.id}`}>
                    {character.name}
                  </a>
                </motion.li>

              ))}
            </ul>
          </div>
          <p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Kaynak: {url}
            </a>
          </p>
          <p>Oluşturulma Tarihi: {created}</p>
        </div>
      </main>

      <style jsx>{`

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color:#0a87ee;
          font-weight:bold
               
       
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color:#0a87ee;
          font-weight:bold
               
          
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          color: #0a87ee;
        }

        .episode-detail {
          max-width: 600px;
          margin-top: 2rem;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        p {
          margin: 8px 0;
          font-size: 1.25rem;
        }

        ul.grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .card {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          transition: box-shadow 0.3s ease-in-out;
        }

        .card-inner {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          transition: opacity 0.3s ease-in-out;
          
        }

        .card:hover,
        .card:focus,
        .card:active {
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }

        .card-image {
          border-radius: 10px 10px 0 0;
        }

        h3 {
          margin: 0;
          padding: 1rem;
          font-size: 1.5rem;
          text-align: center;
          background: #fff;
          border-radius: 0 0 10px 10px;
        }
        h1{
          color:#0a87ee;
          font-weight:bold
        }

        a {
          color: #0070f3;
          text-decoration: none;
        }

        a:hover,
        a:focus,
        a:active {
          text-decoration: underline;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
            color:#0a87ee;
           font-weight:bold
         background-image: url('https://wallpapers.com/images/hd/rick-and-morty-unamused-rick-agpuysmhk3lhdl4p.jpg');
          background-position: center;
          background-size: cover;

        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div >
  );
};
export default EpisodeDetail;

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  const episode = await res.json();


  const characters = await Promise.all(
    episode.characters.map(async (characterUrl) => {
      const characterRes = await fetch(characterUrl);
      return characterRes.json();
    })
  );

  return {
    props: {
      episode,
      characters,
    },
  };
}
