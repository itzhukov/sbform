import ReactDOM from "react-dom"
import React from "react"
import styles from 'modal';

export default class Modal extends React.Component {
	constructor() {
		super();
	}

	render (){
		return (
			<div className={ (this.props.isVisible == true) ? styles.root__open : styles.root }>
				<div className={styles.bg} onClick={this.props.toggleModal.bind(this)} />

				<div className={styles.container}>
					<div className={styles.inner}>
					<div className={styles.header}>
						<span>{this.props.header}</span>
						<div className={styles.close} onClick={this.props.toggleModal.bind(this)} />
					</div>

					<div className={styles.body} >
						{this.props.children}
					</div>
					</div>
				</div>

			</div>
		);
	}
}