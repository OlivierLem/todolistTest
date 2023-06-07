import {screen, findByText, findByPlaceholderText, findAllByText, findAllByRole, render, fireEvent, waitFor} from "@testing-library/react"
import user from "@testing-library/user-event";
import App, { GET_TODOS } from "../App";
import { rest } from "msw";
import { setupServer } from "msw/lib/node/index.js";

describe('test Edit Todo', () => {

    // * on écoute le server avant le début des test (pour tester un todo avec une requête)
    beforeAll(() => server.listen())

    // * on reset le server aprés chaque test 
    afterEach(() => {
        server.resetHandlers();
    });

    // * on ferme le server à la fin des test
    afterAll(() => server.close());
    
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
                    content:`Learn SQL & MCD`,
                    edit: false,
                    done: true
                }
            ])
        )
    })
    const addTodo = rest.post('http://localhost:8000/addTodo', (req, res, ctx) => {
        const newTodo = req.body;
        return res(ctx.json({id:3 ,...newTodo}))
    })
    // * Fonction qui configure un couche d'interception de requête 
    // * dans un environnement Node.js
    // * on met les différentes requêtes dans le setupServer
    const server = setupServer(...[todoResponse, addTodo]);

    it('should to be edit Todo', async () => {
        const { debug } = render(<App />)
        const inputAddTodo = await screen.findByPlaceholderText(/Add a todo/)
        const buttonAddTodo = await screen.findByRole('button', {name : 'Add'})
        fireEvent.change(inputAddTodo, {target : { value : 'Learn Test with Jest'}})
        fireEvent.click(buttonAddTodo)

        const lastItem = await screen.findByText(/Learn Test with Jest/)
        expect(lastItem).toBeInTheDocument()
        //debug()
    })
});

