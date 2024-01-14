import CharacterCard from "../../components/CharacterCard ";

const CharacterDetailPage = ({ character }) => {
    return (
        <CharacterCard character={character} />
    );
};

export async function getServerSideProps({ query }) {
    const { id } = query;
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const character = await res.json();

    return {
        props: {
            character,
        },
    };
}

export default CharacterDetailPage;
