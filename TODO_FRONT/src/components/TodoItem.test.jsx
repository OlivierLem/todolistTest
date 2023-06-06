import { unmountComponentAtNode } from "react-dom";
import TodoItem from "./TodoItem";
import {screen, findByText, render} from "@testing-library/react"
import App, { GET_TODOS } from "../App";

import { rest } from "msw"; // API mocking
import { setupServer } from "msw/node"


xdescribe('todoItem test todo value', () => {
    
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
    
    // * Créeation d'une todo en dur
    // * render rend dans un conteneur todoItem qui est ajouté à document.body
    // * on await puis on recherche un text dans le body qui correspond à fakeTodo.content
    // * et on verifie qu'il est dans le document 

    it('should be possesses a value without fetch', async () => {
        let fakeTodo = {
            id: 1,
            content:'Learn React with Hooks !',
            edit: false,
            done: false
        }
        render(<TodoItem todo={fakeTodo} />, container)

        let todoContent = await screen.findByText('Learn React with Hooks !')
        expect(todoContent).toBeInTheDocument()
    });

    // * Similaire au test précédent sauf que l'on vérifie si la valeur est faites
    // * la valeur dans findByText posséde ✔️ en plus
    it('should be possesses a done value without fetch', async () => {
        let fakeTodo = {
            id: 2,
            content:'Learn SQL & MCD',
            edit: false,
            done: true
        }
        render(<TodoItem todo={fakeTodo} />, container)

        let todoContentDone = await screen.findByText('Learn SQL & MCD ✔️')
        expect(todoContentDone).toBeInTheDocument()
    });

    // * on simule la route getTodos et on lui met une fausse todo 
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

xdescribe('todoItem test button done content ', () => {
    
    let container = null;
    beforeEach(() => {
        // met en place un élément DOM comme cible de rendu
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    // * on reset le server aprés chaque test 
    afterEach(() => {
        // nettoie en sortie de test
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    // * test avec une fausse todo si fakeTodo.done est faux 
    // * alors on cherche la valeur A faire 
    it('should to be value button is to do ', async () => {
        let fakeTodo = {
            id: 1,
            content:'Learn React with Hooks !',
            edit: false,
            done: false
        }
        render(<TodoItem todo={fakeTodo} />, container)

        let todoContent = await screen.findByText('A faire')
        expect(todoContent).toBeInTheDocument()
    })

    // * test avec une fausse todo si fakeTodo.done est vrai 
    // * alors on cherche la valeur Réalisé

    it('should to be value button is done ', async () => {
        let fakeTodo = {
            id: 2,
            content:'Learn SQL & MCD',
            edit: false,
            done: true
        }
        render(<TodoItem todo={fakeTodo} />, container)

        let todoContent = await screen.findByText('Réalisé')
        expect(todoContent).toBeInTheDocument()
    })
});

