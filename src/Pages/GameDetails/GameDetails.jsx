import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion"; // <-- import Framer Motion

const GameDetails = () => {
    const { user, loading } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [gamesLoading, setGamesLoading] = useState(true);

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login");
            return;
        }

        fetch("/gameData.json")
            .then((res) => res.json())
            .then((data) => {
                const foundGame = data.find((g) => g.id.toString() === id);
                setGame(foundGame);
                setGamesLoading(false);
            })
            .catch((err) => {
                // console.error("Failed to load game data", err);
                setGamesLoading(false);
            });
    }, [user, loading, id, navigate]);

    useEffect(() => {
        if (game) {
            document.title = `${game.title} | Gamehub`;
        } else {
            document.title = "Game Details | Gamehub";
        }
    }, [game]);

    if (loading || gamesLoading) {
        return <div className="text-white text-center mt-10 text-xl">Loading...</div>;
    }

    if (!game) {
        return <div className="text-white text-center mt-10 text-xl">Game not found!</div>;
    }

    return (
        <motion.div
            className="max-w-4xl mx-auto px-6 py-10 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.h1
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {game.title}
            </motion.h1>

            <motion.img
                src={game.coverPhoto}
                alt={game.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            />

            <p className="text-yellow-400 text-lg font-medium mb-3">
                ⭐ Ratings: {game.ratings}
            </p>

            <motion.div
                className="bg-gray-900 p-5 rounded-lg mb-6 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <p className="text-gray-300 mb-3">
                    <span className="font-semibold text-white">Category:</span> {game.category}
                </p>
                <p className="text-gray-300 mb-3">
                    <span className="font-semibold text-white">Developer:</span> {game.developer}
                </p>
                <p className="text-gray-300 mb-3">
                    <span className="font-semibold text-white">Description:</span> {game.description}
                </p>
            </motion.div>

            <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <motion.a
                    href={game.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Download Now
                </motion.a>

                <motion.button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg text-white font-semibold shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Return Home
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default GameDetails;
