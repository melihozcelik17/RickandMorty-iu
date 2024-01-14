import { useState, useEffect } from 'react';
import { color, motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import { FiGithub } from 'react-icons/fi';
import { Weight } from 'lucide-react';



interface Episode {
  id: number;
  name: string;
  image: string;
}

interface EpisodeData {
  info: {
    next: number;
    prev: number;
  };
  results: Episode[];
}

interface HomeProps {
  data: EpisodeData;
}

const defaultEndpoint = `https://rickandmortyapi.com/api/episode`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data: EpisodeData = await res.json();
  return {
    props: {
      data,
    },
  };
}



const Home: React.FC<HomeProps> = ({ data }) => {
  const { info, results: defaultResults = [] } = data;

  const [results, updateResults] = useState<Episode[]>(defaultResults);

  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint,
  });
  const { current } = page;



  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      const nextData: EpisodeData = await res.json();

      updatePage({
        current,
        ...nextData.info,
      });

      if (!nextData.info?.prev) {
        updateResults(nextData.results);
        return;
      }

      updateResults((prev) => [...prev, ...nextData.results]);
    }

    request();
  }, [current]);

  function handleLoadMore() {
    updatePage((prev) => ({
      current: String(page?.next),
      next: page?.next!,
      prev: page?.prev!,
    }));
  }



  function handleOnSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fieldQuery = (currentTarget as HTMLFormElement).elements.namedItem('query') as HTMLInputElement;

    const value = fieldQuery?.value || '';
    const endpoint = `https://rickandmortyapi.com/api/episode/?name=${value}`;

    updatePage((prev) => ({
      ...prev,
      current: endpoint,
    }));
  }




  return (
    <div className="container">
      <Head>
        <title> Rick and Morty</title>

      </Head>

      <main>
        <motion.div

          className="card"
          whileHover={{
            position: 'relative',
            zIndex: 1,
            background: [28, 134, 238],
            scale: [1, 1.4, 1.2],
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
        >
          <h1 className="title">Rick & Morty Cartoons</h1>
        </motion.div>

        <p className="description"></p>

        <form className="search" onSubmit={handleOnSubmitSearch}>
          <input name="query" type="search" />
          <button
            style={{
              backgroundColor: '#0070f3',
              color: '#ffffff',
              padding: '0.5em 1em',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginRight: '0.5em',
            }}>
            Search
          </button>
        </form>




        <ul className="grid">
          {results.map((result) => {
            const { id, name } = result;
            return (
              <motion.div
                key={id}
                className="card"
                whileHover={{
                  position: 'relative',
                  zIndex: 1,
                  background: [28, 134, 238],
                  scale: [1, 1.4, 1.2],
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
              >

                <Link className='' href={`/episode/${id}`}>
                  <motion.div
                    key={id}
                    whileHover={{
                      position: 'relative',
                      zIndex: 1,
                      background: 'white',
                      scale: [1, 1.4, 1.2],
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
                  >
                    {name}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </ul>

        <p>
          <button style={{
            backgroundColor: '#0070f3',
            color: '#ffffff',
            padding: '0.5em 1em',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginRight: '0.5em',
          }} onClick={handleLoadMore}>Load More</button>
        </p>
      </main >

      <footer>
        <h3  >
          <motion.div
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
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              transition: {
                duration: 0.2,
              },
            }}
            style={{
              cursor: 'pointer',
              transition: 'color 0.2s',
              color: '#8A2BE2',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
            }}
          >

            <a href={'https://github.com/melihozcelik17'} target="_blank" rel="noopener noreferrer">
              by Melih Özçelik

              <FiGithub style={{ marginLeft: '8px' }} />
            </a>
          </motion.div>
        </h3>

      </footer>

      <style>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
         color:#0a87ee;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
          margin: 0;
          font-size: 1.5rem; 
          text-align: center;
          font-weight: bold;
         
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 2.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        .search {
          display: flex;
          align-items: center;
        }
        
        .search input {
          margin-right: 0.5em;
          margin:1.5em
          width: 100%;
          height:2.0rem
        }
        
        .search button {
          width: 40%;
          font-size: 1.5em;
        }
        
        @media (max-width: 600px) {
          .search {
            flex-direction: column;
          }
        
          .search input,
          .search button {
            width: 100%;
            margin-right: 0;
            margin-bottom: 0.5em;
          }
        }
          
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
            background-image: url('https://wallpapers.com/images/hd/rick-and-morty-unamused-rick-agpuysmhk3lhdl4p.jpg');
  
 
  background-position: center;
  background-size: cover;

        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div >
  )
}



export default Home;

