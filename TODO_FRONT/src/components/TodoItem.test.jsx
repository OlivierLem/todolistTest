import { unmountComponentAtNode } from "react-dom";
import TodoItem from "./TodoItem";
import {screen, findByText, render} from "@testing-library/react"
import TodoList from "./TodoList";
import App from "../App";

import { rest } from "msw";
import { setupServer } from "msw/node"

const todoResponse = rest.get("http://localhost:8000/getTodos", (req, res, ctx) => {
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

const server = setupServer(todoResponse);

describe('todoItem test todo value', () => {
    
    let container = null
    beforeAll(() => server.listen())
    beforeEach(() => {
        // met en place un élément DOM comme cible de rendu
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        server.resetHandlers();
        // nettoie en sortie de test
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    afterAll(() => server.close());

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

    it('should be possesses a value without fetch', async () => {
        render(<App />);
        const todoItem = await screen.findByText('Learn React with Hooks !');
        expect(todoItem).toBeVisible();
    });
    it('should be possesses a done value without fetch', async () => {
        render(<App />);
        const todoItem = await screen.findByText('Learn SQL & MCD ✔️');
        expect(todoItem).toBeVisible();
    });
    
});

/* describe.only('todoItem test button done content ', () => {
    let todo = {
        id: 2,
        content:'Learn SQL & MCD',
        edit: false,
        done: true
    }
    render(<TodoItem todo={todo} />, container)
    
}); */