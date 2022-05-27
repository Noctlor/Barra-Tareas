import { Todo } from "./todo.class";

export class List{
    constructor(){
        //this.todos = [];
        this.cargar();
    }

    nuevoTodo(todo){
        this.todos.push( todo );
        this.guardar();
    }

    eliminar( id ){
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardar();

    }

    marcarCompletado( id ){

        for(const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado; 
                this.guardar();
                break;
            }
        }

    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardar();
    }

    guardar(){
        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    cargar(){
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) :  [];

        this.todos = this.todos.map(Todo.fromJson);


    }

}