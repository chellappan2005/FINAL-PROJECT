* Include default Roboto font ->

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

* Future -

Store the sabjis received in the redux store and localStorage, then have an API endpoint '/next', that returns the DIFF from last time

Each '/next' call accepts the token, given to a logged in user... hence this performance betterment is only for logged in users as of now

Have a '/getCart' route so that user can see the same cart on another pc by passing the token

* My own Original NavBar had these styles ->

```css
	navbar: {
		width: calc( 100% - 4px - 4vw ),  /*subtract border width from both sides + margins*/
		backgroundColor: 'white',
		borderColor: 'grey',
		borderStyle: 'solid',
		borderWidth: '1px',
		borderRadius: '6px',
		display: 'flex',
		marginTop: '2vh',
		marginBottom: '3vh',
		marginLeft: '2vw',
		marginRight: '2vw',
	},
	logo: {
		fontSize: '1.2em',
		justifyContent: 'center',
		display: 'contents',
	},
	search: {
		textAlign: 'left',
		left: '50%',
		display: 'flex',
		justifyContent: 'center',
		margin: '1.5vh 2vw',
	},
	search_input_type_search: {
		borderRadius: '20px',
		fontSize: '1.3em',
		padding: '1vh 2vw',   /* it is padding: vertical horizontal*/
	},
```