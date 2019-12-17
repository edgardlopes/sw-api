import { buscarFilmesRoute } from './buscar-filmes/buscar-filmes.route';
import { buscarPersonagensRoute } from './buscar-personagens/buscar-personagens.route';
import { getTipoPersistenciaRoute, setTipoPersistenciaRoute } from './tipo-persistencia/tipo-persistencia.route';

export default [
    buscarFilmesRoute, 
    buscarPersonagensRoute, 
    getTipoPersistenciaRoute, 
    setTipoPersistenciaRoute
];
