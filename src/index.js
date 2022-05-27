import './styles.css';
import { Todo , List } from './classes'
import { crearH } from './js/componentes.js'


export const TL = new List();

TL.todos.forEach(crearH);


