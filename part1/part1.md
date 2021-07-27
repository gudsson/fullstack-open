JSX is "[XML](https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction)-like", which means that every tag needs to be closed. For example:

```html
<br />
```

### props: passing data to components

It is possible to pass data to components using so called [props](https://reactjs.org/docs/components-and-props.html).

```jsx
const Hello = (props) => {  return (
    <div>
      <p>Hello {props.name}</p>
	</div>
  )
}
```

The props are defined as follows:

```jsx
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" />
    </div>
  )
}
```

If the value of the prop is achieved using JavaScript it must be wrapped with curly braces.

```jsx
const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
    </div>
  )
}
```

Note that the content of a React component (usually) needs to contain **one root element**.

```jsx
...
return (
	<div>
    	...
    </div>
)
...
```

Using a root element is not the only working option. An *array* of components is also a valid solution:

```js
const App = () => {
  return [
    <h1>Greetings</h1>,
    <Hello name="Maya" age={26 + 10} />,
    <Footer />
  ]
}
```

However, when defining the root component of the application this is not a particularly wise thing to do, and it makes the code look a bit ugly.

Extra div elements from the root element can be avoided by using [fragments](https://reactjs.org/docs/fragments.html#short-syntax), i.e. by wrapping the elements to be returned by the component with an empty element:

```jsx
...
  return (
    <>
		...
    </>
  )
...
```

