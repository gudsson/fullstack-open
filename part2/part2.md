# Part 2

Currently, JavaScript engines are *single-threaded*, which means that they cannot execute code in parallel. As a result, it is a requirement in practice to use a non-blocking model for executing IO operations. Otherwise, the browser would "freeze" during, for instance, the fetching of data from a server.

---

[state hooks](https://reactjs.org/docs/hooks-state.html) provide state to React components defined as functions - the so-called *functional components*. 

*The Effect Hook lets you perform side effects in function components.* *Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.*

