//import TodoItem from "./TodoItem";
import {screen, findByText, render} from "@testing-library/react"
import App, { GET_TODOS } from "../App";

import { rest } from "msw"; // API mocking
import { setupServer } from "msw/node"
import TodoItem from "./TodoItem.js";


describe('todoItem test todo value', () => {
    
    // * on écoute le server avant le début des test (pour tester un todo avec une requête)
    beforeAll(() => server.listen())

    // * on reset le server aprés chaque test 
    afterEach(() => {
        server.resetHandlers();
    });

    // * on ferme le server à la fin des test
    afterAll(() => server.close());
    
    // * on simule la route getTodos avec msw et on lui met une fausse todo
    // * si on retire la todo et return res 
    // * on peut tester directement sur la todo du back
    const todoResponse = rest.get(GET_TODOS, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: 1,
                    content:'Learn React with Hooks !',
                    edit: false,
                    done: false
                }, 
                {
                    id: 2,
                    content:'Learn SQL & MCD',
                    edit: false,
                    done: true
                }
            ])
        )
    })

    // * Fonction qui configure un couche d'interception de requête 
    // * dans un environnement Node.js
    // * on met les différentes requêtes dans le setupServer
    const server = setupServer(todoResponse);

    // * similaire au 2 test précedent 
    // * sauf qu'on test avec une requête getTodo d'un faux server
    // * et qu'on utilise le composant App 
    it('should be possesses a value with fetch', async () => {
        render(<App />);
        const todoItem = await screen.findByText('Learn React with Hooks !');
        expect(todoItem).toBeVisible();
    });

    it('should be possesses a done value with fetch', async () => {
        render(<App />);
        const todoItem = await screen.findByText('Learn SQL & MCD ✔️');
        expect(todoItem).toBeVisible();
    });
    
});

describe('todoItem test button done content', () => {
    
   
    // * test avec une fausse todo si fakeTodo.done est faux 
    // * alors on cherche la valeur A faire 
    it('should to be value button is to do', async () => {
        let fakeTodo = {
            id: 1,
            content:'Learn React with Hooks !',
            edit: false,
            done: false
        }
        render(<TodoItem todo={fakeTodo} />)

        let todoContent = await screen.findByText('A faire')
        expect(todoContent).toBeInTheDocument()
    })

    // * test avec une fausse todo si fakeTodo.done est vrai 
    // * alors on cherche la valeur Réalisé

    it('should to be value button is done', async () => {
        let fakeTodo = {
            id: 2,
            content:'Learn SQL & MCD',
            edit: false,
            done: true
        }
        render(<TodoItem todo={fakeTodo} />)

        let todoContent = await screen.findByText('Réalisé')
        expect(todoContent).toBeInTheDocument()
    })
});

