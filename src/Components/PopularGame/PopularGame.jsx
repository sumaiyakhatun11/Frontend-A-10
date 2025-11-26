import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const PopularGame = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    const [games, setGames] = useState([]);
    const [gamesLoading, setGamesLoading] = useState(true);

    useEffect(() => {
        fetch("/gameData.json")
            .then((res) => res.json())
            .then((data) => {
                const sortedGames = data.sort(
                    (a, b) => parseFloat(b.ratings) - parseFloat(a.ratings)
                );
                setGames(sortedGames);
                setGamesLoading(false);
            })
            .catch((err) => {
                // console.error("Failed to load game data", err);
                setGamesLoading(false);
            });
    }, []);

    const handleCardClick = (id) => {
        if (user) {
            navigate(`/games/${id}`);
        } else {
            navigate("/login");
        }
    };

    if (loading || gamesLoading) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    return (
        <div className="px-6 py-10 text-white">
            <h2 className="text-2xl font-bold mb-6">Popular Games</h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {games.map((game) => (
                    <div
                        key={game.id}
                        onClick={() => handleCardClick(game.id)}
                        className="bg-gray-100 rounded-xl p-4 hover:bg-gray-500 transform hover:-translate-y-1 shadow-lg cursor-pointer transition-transform duration-200 ease-in-out"
                    >
                        <img
                            src={game.coverPhoto}
                            alt={game.title}
                            className="w-full h-44 object-cover rounded-lg mb-3"
                        />
                        <h3 className="text-lg text-black font-semibold">{game.title}</h3>
                        <p className="text-yellow-400 text-sm">⭐ {game.ratings}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularGame;
