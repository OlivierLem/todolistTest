import { unmountComponentAtNode } from "react-dom";
import TodoList from "./TodoList";
import {screen, findByText, findByPlaceholderText, render} from "@testing-library/react"
import user from "@testing-library/user-event";
import TodoItem, { DELETE_TODO, MODIFY_TODO } from "./TodoItem";
import App, { GET_TODOS } from "../App";

import { rest } from "msw"; // API mocking
import { setupServer } from "msw/node"

describe('test Edit Todo', () => {

    let container = null

    // * on écoute le server avant le début des test (pour tester un todo avec une requête)
    beforeAll(() => server.listen())

    beforeEach(() => {
        // met en place un élément DOM comme cible de rendu
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    // * on reset le server aprés chaque test 
    afterEach(() => {
        server.resetHandlers();
        // nettoie en sortie de test
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    // * on ferme le server à la fin des test
    afterAll(() => server.close());

    let todo = {
        id: 1,
        content:'Learn React with Hooks !',
        edit: false,
        done: false
    } 
    // * on simule la route getTodos et on lui met une fausse todo 
    // * si on retire la todo et return res 
    // * on peut tester directement sur la todo du back
    const todoResponse = rest.get(GET_TODOS, (req, res, ctx) => {
        return res(
            ctx.json([
                todo
            ])
        )
    })
    const todoResponseEdit = rest.post(MODIFY_TODO, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    ...todo,
                    edit: !todo.edit
                } 
            ])
        )
    })

    const handlers = [todoResponse, todoResponseEdit]

    // * Fonction qui configure un couche d'interception de requête 
    // * dans un environnement Node.js
    // * on met les différentes requêtes dans le setupServer
    const server = setupServer(...handlers);
    it('should to be edit Todo', async () => {
        
        render(<App />)
        /* const todoEditButton = await screen.findByText('Modifier');
        user.click(todoEditButton)
        const todoInputEdit = await screen.findByPlaceholderText('Add a todo') */
    })
});