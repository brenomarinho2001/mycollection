// src/App.js
import React from 'react';
import Header from '../Header';
import Body from '../Body';
import Footer from '../Footer';


const Home = () => {
    
    const games = [
        // DS Games
        { id: 1, title: 'Chrono Trigger', console: 'DS', description: 'An RPG game.', image: 'https://www.ubuy.com.br/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxaVRoR2ptdktMLmpwZw.jpg', rating: 5 },
        { id: 2, title: 'Mario 64', console: 'DS', description: 'A platform game by Nintendo.', image: 'https://upload.wikimedia.org/wikipedia/pt/1/12/Super_Mario_64_DS_Coverart.png', rating: 5 },
        { id: 3, title: 'Disgaea', console: 'DS', description: 'A tactical RPG game.', image: 'https://m.media-amazon.com/images/I/61PJLUiideL._SL1082_.jpg', rating: null },
        { id: 4, title: 'Zelda Phantom', console: 'DS', description: 'An action-adventure game.', image: 'https://upload.wikimedia.org/wikipedia/pt/archive/8/81/20171115000406%21The_Legend_of_Zelda_Phantom_Hourglass_capa.png', rating: null },
        { id: 5, title: 'Castlevania Order', console: 'DS', description: 'An action-adventure game.', image: 'https://www.retroplace.com/pics/ds/packshots/168817--castlevania-order-of-ecclesia.png', rating: 5 },
        { id: 6, title: 'Pokemon White 1', console: 'DS', description: 'A Pokemon game.', image: 'https://notadogame.com/uploads/game/cover/250x/5bfdc43ecb58f.jpg', rating: 5 },
        { id: 7, title: 'Pokemon White 2', console: 'DS', description: 'A Pokemon game.', image: 'https://cdn.mobygames.com/covers/2059584-pokemon-white-version-2-nintendo-ds-manual.jpg', rating: 5 },
        { id: 8, title: 'Pokemon Soul Silver', console: 'DS', description: 'A Pokemon game.', image: 'https://notadogame.com/uploads/game/cover/250x/5bfdc3d636750.jpg', rating: 5 },
        { id: 9, title: 'GTA Chinatown', console: 'DS', description: 'An action-adventure game.', image: 'https://m.media-amazon.com/images/I/818SjSPLrES._AC_UF1000,1000_QL80_.jpg', rating: null },
    
        // 3DS Games
        { id: 10, title: 'Mario 3D Land', console: '3DS', description: 'A 3D platform game by Nintendo.', image: 'https://m.media-amazon.com/images/I/81J+Jx1NiaL.jpg', rating: 5 },
        { id: 11, title: 'Donkey Kong Country', console: '3DS', description: 'A platform game by Nintendo.', image: 'https://m.media-amazon.com/images/I/81RYG5cWuML._AC_UF1000,1000_QL80_.jpg', rating: 5 },
        { id: 12, title: 'Zelda Ocarina', console: '3DS', description: 'An action-adventure game.', image: 'https://m.media-amazon.com/images/I/71mDmFhe7SL._AC_UF1000,1000_QL80_.jpg', rating: 5 },
        { id: 13, title: 'Zelda Majoras', console: '3DS', description: 'An action-adventure game.', image: 'https://m.media-amazon.com/images/I/91MEVIjA-UL.jpg', rating: null },
        { id: 14, title: 'Zelda Between Worlds', console: '3DS', description: 'An action-adventure game.', image: 'https://m.media-amazon.com/images/I/61CWbZ0MwFL._AC_UF350,350_QL80_.jpg', rating: 5 },
        { id: 15, title: 'Mario Kart 7', console: '3DS', description: 'A racing game by Nintendo.', image: 'https://m.media-amazon.com/images/I/61S36kL210L._AC_UF1000,1000_QL80_.jpg', rating: 5 },
        { id: 16, title: 'Super Smash Bros', console: '3DS', description: 'A fighting game by Nintendo.', image: 'https://m.media-amazon.com/images/I/91-A4JXfqlL.jpg', rating: 4},
        { id: 17, title: 'Super Mario Bros', console: '3DS', description: 'A platform game by Nintendo.', image: 'https://m.media-amazon.com/images/I/6149c7BzXFL._AC_UF1000,1000_QL80_.jpg', rating: 3 },
        { id: 18, title: 'Mario e Luigi Dream Team', console: '3DS', description: 'An RPG game by Nintendo.', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2kwnotLRZAzEXIdtC6hlYjL_ueF36qw3DVU6jShBKrulV4xU2WbNueBPccc6LlLZ0cPtvoPtaWe2-DWgbwHeGUQSRKVinGuBXHDTZFi4gwoUfwUGyWmOCD-DTAli8AwyF-09ItV_mSeA/s320/mario-and-luigi-dream-team-box-art.jpg', rating: null },
        { id: 19, title: 'Pokemon Y', console: '3DS', description: 'A Pokemon game.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJkI4UasuKLO6X7ll1WZUX4-xLKZpGogjaeQ&s', rating: 3 },
        { id: 20, title: 'Pokemon Sun', console: '3DS', description: 'A Pokemon game.', image: 'https://m.media-amazon.com/images/I/81lxGEeY-FL.jpg', rating: 3 },
        { id: 21, title: 'Pokemon Alpha Sapphire', console: '3DS', description: 'A Pokemon game.', image: 'https://m.media-amazon.com/images/I/81xzzhEGYOL.jpg', rating: 5 },
        { id: 22, title: 'Kid Icarus', console: '3DS', description: 'An action-adventure game.', image: 'https://m.media-amazon.com/images/I/61BOaqZQgWL._SL500_.jpg', rating: null },
    
        // Wii Games
        { id: 23, title: 'Zelda Twilight', console: 'Wii', description: 'An action-adventure game.', image: 'https://bdjogos.com.br/capas/3778-the-legend-of-zelda-twilight-princess-wii-capa-1.jpg', rating: null }
    ];
    

    return (
        <div className="App">
            <Header/>
            <div className="content">
                <Body games={games} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;