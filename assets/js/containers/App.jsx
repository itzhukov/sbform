import React from "react";
import ReactDOM from "react-dom";
import CSSModules from 'react-css-modules';
import Modal from "../components/Modal";
import Form from "../components/Form";
import styles from 'styles';

export default class extends React.Component {
	constructor(props) {
		super(props);
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
			<div className={styles.root}>
				<button className={styles.button__openModal} onClick={this.toggleModal.bind(this)}>
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