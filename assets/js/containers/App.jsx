import React from "react"
import ReactDOM from "react-dom"
import Modal from "../components/Modal"
import Form from "../components/Form"

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isVisible: false
		}
	}

	toggleModal(){
		this.setState({
			isVisible: !this.state.isVisible
		});
	}

	render (){
		return (
			<div className="App">
				<button className="App-button App-button--green App-button-openModal" onClick={this.toggleModal.bind(this)}>
					Открыть модальное окно
				</button>

				<Modal
					isVisible={this.state.isVisible}
					toggleModal={this.toggleModal.bind(this)}
					header="Подтверждение личности">
					<Form />
				</Modal>
			</div>
		);
	}
}