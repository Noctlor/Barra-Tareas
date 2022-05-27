import  {Todo} from '../classes';
import {TL} from '../index';

const divT = document.querySelector('.todo-list');
const txt = document.querySelector('.new-todo');  
const clean = document.querySelector('.clear-completed');
const ulF = document.querySelector('.filters');
const sf  = document.querySelectorAll('.filtro');

export const crearH = (todo) => {
    const H = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${( todo.completado) ? 'checked' :  ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = H;
    divT.append(div.firstElementChild);
    return div.firstElementChild;
}

txt.addEventListener('keyup', (event) => {

    if(event.keyCode === 13 && txt.value.length > 0){
        console.log(txt.value);
        const nuevoTodo = new Todo ( txt.value);
        TL.nuevoTodo(nuevoTodo);

        crearH(nuevoTodo);
        txt.value = '';
    }    


});

divT.addEventListener('click', (event) =>{
    
    const ne  = event.target.localName;
    const te = event.target.parentElement.parentElement;
    const toid = te.getAttribute('data-id');
    
    if( ne.includes('input')){
        TL.marcarCompletado(toid);
        te.classList.toggle('completed');
    }else if(ne.includes('button')){
        TL.eliminar(toid);
        divT.removeChild(te);
    }

})

clean.addEventListener('click', () => {
    TL.eliminarCompletados();
    for(let i =divT.children.length-1; i>= 0; i--){
        const element = divT.children[i];
        if(element.classList.contains('completed')){
            divT.removeChild(element);
        }

    }
});

ulF.addEventListener('click', (event)=>{
    const fl = event.target.text;
    if(!fl){return;}
    sf.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const element of divT.children){
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch(fl){
            case 'Pendientes':
                if(completado){
                element.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado){
                    element.classList.add('hidden');    

                }
            break;
        }
    }

});