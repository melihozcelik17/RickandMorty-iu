import { motion } from 'framer-motion';
import { Link as LucideLink, LucideProps } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CharacterCard = ({ character }) => {
    const {
        name,
        status,
        species,
        type,
        gender,
        origin,
        location,
        image,
        episode,
        url,
        created,
    } = character;

    interface MyLinkProps extends LucideProps {
        rel?: string;

    }




    return (
        <div className="character-detail">
            <main>


                <h1>{name}</h1>


                <p>Status: {status}</p>
                <p>Species: {species}</p>
                {type && <p>Type: (available): {type}</p>}
                <p>Gender: {gender}</p>
                <p>Origin: {origin.name}</p>
                <p>Location: {location.name}</p>
                <img src={image} alt={name} />
                <div>
                    <p>Episode:</p>
                    <ul>


                        {character.episode.map((ep: any, index: React.Key | null | undefined) => (
                            <li key={index}>
                                <a href={`${ep}`}>
                                    <p>Episode: {` ${ep}`}</p>
                                </a>
                            </li>
                        ))}

                    </ul>
                </div>

                <a href={url} target="_blank" rel="noopener noreferrer">
                    Kaynak : {url}
                </a>

                <p>Oluşturulma Tarihi: {created}</p>
            </main >

            <style jsx>{`
                .character-detail {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;
                    color:#0a87ee;
                    font-weight:bold
                    
                    
                }
                
                h1 {
                    color:#0a87ee;
                    margin: 0;
                    font-size: 2rem;
                }
                
                p {
                    margin: 8px 0;
                    font-size: 1.2rem;
                }
                
                a {
                    color: #0070f3;
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }

                ul {
                    list-style-type: none;
                    padding: 0;
                }

                li {
                    margin-bottom: 12px;
                }

                img {
                    max-width: 100%;
                    height: auto;
                    margin-top: 16px;
                    border-radius: 8px;
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
    );
};

export default CharacterCard;
